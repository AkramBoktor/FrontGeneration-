
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AssayLists } from 'app/shared/models/assay-lists';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { AssayListsService } from '../shared/assay-lists.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-assay-lists-edit',
  templateUrl: './assay-lists-edit.component.html',
  styleUrls: ['./assay-lists-edit.component.scss'],
  providers: []
})

export class AssayListsEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedAssayLists: AssayLists;
  assayListsForm: FormGroup;
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
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedAssayListsDialog: any,
    @Optional() public dialogRef: MatDialogRef<AssayListsEditComponent>,
    public assayListsService: AssayListsService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAssayLists = new AssayLists();
    this.selectedAssayLists = this.selectedAssayListsDialog.data || this.selectedAssayLists;

    
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


    this.assayListsForm = this.formBuilder.group({
      
  id : [this.selectedAssayLists.id],
  assayNumber : [this.selectedAssayLists.assayNumber, [ ]],
  listNumber : [this.selectedAssayLists.listNumber, [ ]],
  listName : [this.selectedAssayLists.listName, [ ]],
  estimatedValue : [this.selectedAssayLists.estimatedValue, [ ]],
  processingType : [this.selectedAssayLists.processingType, [ ]],
  offeringMethod : [this.selectedAssayLists.offeringMethod, [ ]],
  requiredQuantity : [this.selectedAssayLists.requiredQuantity, [ ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.assayListsService.update(this.assayListsForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.assayListsService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.assayListsForm.get(name);
  }

  initializeLookupServices() {
    this.processingTypesService = new LookupService('processingtypes', this.http);
this.offeringMethodsService = new LookupService('offeringmethods', this.http);
this.requiredQuantitiesService = new LookupService('requiredquantities', this.http);
  }
}
