
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { TypicalItemsOfAssayLists } from 'app/shared/models/typical-items-of-assay-lists';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { TypicalItemsOfAssayListsService } from '../shared/typical-items-of-assay-lists.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-typical-items-of-assay-lists-edit',
  templateUrl: './typical-items-of-assay-lists-edit.component.html',
  styleUrls: ['./typical-items-of-assay-lists-edit.component.scss'],
  providers: []
})

export class TypicalItemsOfAssayListsEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedTypicalItemsOfAssayLists: TypicalItemsOfAssayLists;
  typicalItemsOfAssayListsForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private offeringMethodsService: LookupService;
private processingTypesService: LookupService;

  
offeringMethodSelectOptions: MaterialSelectOptions;
processingTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('offeringMethod', { static: true }) OfferingMethodSelectComponent: MaterialSelectComponent;
	@ViewChild('processingType', { static: true }) ProcessingTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedTypicalItemsOfAssayListsDialog: any,
    @Optional() public dialogRef: MatDialogRef<TypicalItemsOfAssayListsEditComponent>,
    public typicalItemsOfAssayListsService: TypicalItemsOfAssayListsService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTypicalItemsOfAssayLists = new TypicalItemsOfAssayLists();
    this.selectedTypicalItemsOfAssayLists = this.selectedTypicalItemsOfAssayListsDialog.data || this.selectedTypicalItemsOfAssayLists;

    
	this.offeringMethodSelectOptions = new MaterialSelectOptions({
	 data: this.offeringMethodsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'طريقة الطرح',
	});

	this.processingTypeSelectOptions = new MaterialSelectOptions({
	 data: this.processingTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع التجهيز',
	});


    this.typicalItemsOfAssayListsForm = this.formBuilder.group({
      
  id : [this.selectedTypicalItemsOfAssayLists.id],
  estimatedValue : [this.selectedTypicalItemsOfAssayLists.estimatedValue, [ Validators.required ]],
  itemQuantity : [this.selectedTypicalItemsOfAssayLists.itemQuantity, [ Validators.required ]],
  listNumber : [this.selectedTypicalItemsOfAssayLists.listNumber, [ Validators.required ]],
  assayNumber : [this.selectedTypicalItemsOfAssayLists.assayNumber, [ Validators.required ]],
  itemNo : [this.selectedTypicalItemsOfAssayLists.itemNo, [ Validators.required ]],
  offeringMethod : [this.selectedTypicalItemsOfAssayLists.offeringMethod, [ ]],
  processingType : [this.selectedTypicalItemsOfAssayLists.processingType, [ ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.typicalItemsOfAssayListsService.update(this.typicalItemsOfAssayListsForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.typicalItemsOfAssayListsService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
	    }))
    .subscribe(
      (result) => {
          if (this.dialogRef)
          {
              this.dialogRef.close(true);
          }
    });
  }

  getControls(name: string) {
    return this.typicalItemsOfAssayListsForm.get(name);
  }

  initializeLookupServices() {
    this.offeringMethodsService = new LookupService('offeringmethods', this.http);
this.processingTypesService = new LookupService('processingtypes', this.http);
  }
}
