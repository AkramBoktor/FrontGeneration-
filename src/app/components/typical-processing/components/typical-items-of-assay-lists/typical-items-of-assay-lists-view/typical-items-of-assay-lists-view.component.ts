
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { TypicalItemsOfAssayLists } from 'app/shared/models/typical-items-of-assay-lists';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { TypicalItemsOfAssayListsService } from '../shared/typical-items-of-assay-lists.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-typical-items-of-assay-lists-view',
  templateUrl: './typical-items-of-assay-lists-view.component.html',
  styleUrls: ['./typical-items-of-assay-lists-view.component.scss'],
  providers: []
})

export class TypicalItemsOfAssayListsViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedTypicalItemsOfAssayLists: TypicalItemsOfAssayLists;
  typicalItemsOfAssayListsForm: FormGroup;

  private offeringMethodsService: LookupService;
private processingTypesService: LookupService;

  
offeringMethodSelectOptions: MaterialSelectOptions;
processingTypeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedTypicalItemsOfAssayListsDialog: any,
    @Optional() public dialogRef: MatDialogRef<TypicalItemsOfAssayListsViewComponent>,
    public typicalItemsOfAssayListsService: TypicalItemsOfAssayListsService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
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
      
  estimatedValue : [this.selectedTypicalItemsOfAssayLists.estimatedValue],
  itemQuantity : [this.selectedTypicalItemsOfAssayLists.itemQuantity],
  listNumber : [this.selectedTypicalItemsOfAssayLists.listNumber],
  assayNumber : [this.selectedTypicalItemsOfAssayLists.assayNumber],
  itemNo : [this.selectedTypicalItemsOfAssayLists.itemNo],
  offeringMethod : [this.selectedTypicalItemsOfAssayLists.offeringMethod],
  processingType : [this.selectedTypicalItemsOfAssayLists.processingType]
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
    return this.typicalItemsOfAssayListsForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.typicalItemsOfAssayListsForm.controls)) {
      this.typicalItemsOfAssayListsForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.offeringMethodsService = new LookupService('offeringmethods', this.http);
this.processingTypesService = new LookupService('processingtypes', this.http);
  }
}

