
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { ItemsOfAssayLists } from 'app/shared/models/items-of-assay-lists';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { ItemsOfAssayListsService } from '../shared/items-of-assay-lists.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-items-of-assay-lists-view',
  templateUrl: './items-of-assay-lists-view.component.html',
  styleUrls: ['./items-of-assay-lists-view.component.scss'],
  providers: []
})

export class ItemsOfAssayListsViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedItemsOfAssayLists: ItemsOfAssayLists;
  itemsOfAssayListsForm: FormGroup;

  private processingTypesService: LookupService;
private offeringMethodsService: LookupService;

  
processingTypeSelectOptions: MaterialSelectOptions;
offeringMethodSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedItemsOfAssayListsDialog: any,
    @Optional() public dialogRef: MatDialogRef<ItemsOfAssayListsViewComponent>,
    public itemsOfAssayListsService: ItemsOfAssayListsService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedItemsOfAssayLists = this.selectedItemsOfAssayListsDialog.data || this.selectedItemsOfAssayLists;

    
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


    this.itemsOfAssayListsForm = this.formBuilder.group({
      
  assayNumber : [this.selectedItemsOfAssayLists.assayNumber],
  listNumber : [this.selectedItemsOfAssayLists.listNumber],
  itemNo : [this.selectedItemsOfAssayLists.itemNo],
  itemQuantity : [this.selectedItemsOfAssayLists.itemQuantity],
  estimatedValue : [this.selectedItemsOfAssayLists.estimatedValue],
  processingType : [this.selectedItemsOfAssayLists.processingType],
  offeringMethod : [this.selectedItemsOfAssayLists.offeringMethod]
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
    return this.itemsOfAssayListsForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.itemsOfAssayListsForm.controls)) {
      this.itemsOfAssayListsForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.processingTypesService = new LookupService('processingtypes', this.http);
this.offeringMethodsService = new LookupService('offeringmethods', this.http);
  }
}

