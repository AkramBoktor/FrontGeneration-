
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { AssayLists } from 'app/shared/models/assay-lists';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { AssayListsService } from '../shared/assay-lists.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-assay-lists-view',
  templateUrl: './assay-lists-view.component.html',
  styleUrls: ['./assay-lists-view.component.scss'],
  providers: []
})

export class AssayListsViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedAssayLists: AssayLists;
  assayListsForm: FormGroup;

  private processingTypesService: LookupService;
private offeringMethodsService: LookupService;
private requiredQuantitiesService: LookupService;

  
processingTypeSelectOptions: MaterialSelectOptions;
offeringMethodSelectOptions: MaterialSelectOptions;
requiredQuantitySelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedAssayListsDialog: any,
    @Optional() public dialogRef: MatDialogRef<AssayListsViewComponent>,
    public assayListsService: AssayListsService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
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
      
  assayNumber : [this.selectedAssayLists.assayNumber],
  listNumber : [this.selectedAssayLists.listNumber],
  listName : [this.selectedAssayLists.listName],
  estimatedValue : [this.selectedAssayLists.estimatedValue],
  processingType : [this.selectedAssayLists.processingType],
  offeringMethod : [this.selectedAssayLists.offeringMethod],
  requiredQuantity : [this.selectedAssayLists.requiredQuantity]
      });

    this.disableControls();
  }

  onConfirm() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  getErrorMessage = (formCtrl: AbstractControl) => {
    const errorMessages: FormControlError[] = [
          
        ];
    return ValidatorFunctions.getErrorMessage(formCtrl, errorMessages);
   }

  getControls(name: string) {
    return this.assayListsForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.assayListsForm.controls)) {
      this.assayListsForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.processingTypesService = new LookupService('processingtypes', this.http);
this.offeringMethodsService = new LookupService('offeringmethods', this.http);
this.requiredQuantitiesService = new LookupService('requiredquantities', this.http);
  }
}

