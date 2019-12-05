
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { TypicalAssayLists } from 'app/shared/models/typical-assay-lists';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { TypicalAssayListsService } from '../shared/typical-assay-lists.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-typical-assay-lists-edit',
  templateUrl: './typical-assay-lists-edit.component.html',
  styleUrls: ['./typical-assay-lists-edit.component.scss'],
  providers: []
})

export class TypicalAssayListsEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedTypicalAssayLists: TypicalAssayLists;
  typicalAssayListsForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private processingTypesService: LookupService;
private offeringMethodsService: LookupService;
private requiredQuantitiesService: LookupService;

  
processingTypeSelectOptions: MaterialSelectOptions;
offeringMethodSelectOptions: MaterialSelectOptions;
requiredQuantitySelectOptions: MaterialSelectOptions;

  
	@ViewChild('processingType', { static: true }) ProcessingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('offeringMethod', { static: true }) OfferingMethodSelectComponent: MaterialSelectComponent;
	@ViewChild('requiredQuantity', { static: true }) RequiredQuantitySelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedTypicalAssayListsDialog: any,
    @Optional() public dialogRef: MatDialogRef<TypicalAssayListsEditComponent>,
    public typicalAssayListsService: TypicalAssayListsService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTypicalAssayLists = new TypicalAssayLists();
    this.selectedTypicalAssayLists = this.selectedTypicalAssayListsDialog.data || this.selectedTypicalAssayLists;

    
	this.processingTypeSelectOptions = new MaterialSelectOptions({
	 data: this.processingTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع التجهيز',
	});

	this.offeringMethodSelectOptions = new MaterialSelectOptions({
	 data: this.offeringMethodsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'طريقة الطرح',
	});

	this.requiredQuantitySelectOptions = new MaterialSelectOptions({
	 data: this.requiredQuantitiesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الكمية المطلوبة',
	});


    this.typicalAssayListsForm = this.formBuilder.group({
      
  id : [this.selectedTypicalAssayLists.id],
  assayNumber : [this.selectedTypicalAssayLists.assayNumber, [ Validators.required ]],
  listNumber : [this.selectedTypicalAssayLists.listNumber, [ ]],
  listName : [this.selectedTypicalAssayLists.listName, [ ]],
  estimatedValue : [this.selectedTypicalAssayLists.estimatedValue, [ ]],
  processingType : [this.selectedTypicalAssayLists.processingType, [ ]],
  offeringMethod : [this.selectedTypicalAssayLists.offeringMethod, [ ]],
  requiredQuantity : [this.selectedTypicalAssayLists.requiredQuantity, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.typicalAssayListsService.update(this.typicalAssayListsForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.typicalAssayListsService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.typicalAssayListsForm.get(name);
  }

  initializeLookupServices() {
    this.processingTypesService = new LookupService('processingtypes', this.http);
this.offeringMethodsService = new LookupService('offeringmethods', this.http);
this.requiredQuantitiesService = new LookupService('requiredquantities', this.http);
  }
}
