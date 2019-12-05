
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { TypicalAssayLists } from 'app/shared/models/typical-assay-lists';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { TypicalAssayListsService } from '../shared/typical-assay-lists.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-typical-assay-lists-view',
  templateUrl: './typical-assay-lists-view.component.html',
  styleUrls: ['./typical-assay-lists-view.component.scss'],
  providers: []
})

export class TypicalAssayListsViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedTypicalAssayLists: TypicalAssayLists;
  typicalAssayListsForm: FormGroup;

  private requiredQuantitiesService: LookupService;
private offeringMethodsService: LookupService;
private processingTypesService: LookupService;

  
requiredQuantitySelectOptions: MaterialSelectOptions;
offeringMethodSelectOptions: MaterialSelectOptions;
processingTypeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedTypicalAssayListsDialog: any,
    @Optional() public dialogRef: MatDialogRef<TypicalAssayListsViewComponent>,
    public typicalAssayListsService: TypicalAssayListsService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTypicalAssayLists = this.selectedTypicalAssayListsDialog.data || this.selectedTypicalAssayLists;

    
	this.requiredQuantitySelectOptions = new MaterialSelectOptions({
	 data: this.requiredQuantitiesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الكمية المطلوبة',
	});

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


    this.typicalAssayListsForm = this.formBuilder.group({
      
  estimatedValue : [this.selectedTypicalAssayLists.estimatedValue],
  listName : [this.selectedTypicalAssayLists.listName],
  listNumber : [this.selectedTypicalAssayLists.listNumber],
  assayNumber : [this.selectedTypicalAssayLists.assayNumber],
  requiredQuantity : [this.selectedTypicalAssayLists.requiredQuantity],
  offeringMethod : [this.selectedTypicalAssayLists.offeringMethod],
  processingType : [this.selectedTypicalAssayLists.processingType]
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
    return this.typicalAssayListsForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.typicalAssayListsForm.controls)) {
      this.typicalAssayListsForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.requiredQuantitiesService = new LookupService('requiredquantities', this.http);
this.offeringMethodsService = new LookupService('offeringmethods', this.http);
this.processingTypesService = new LookupService('processingtypes', this.http);
  }
}

