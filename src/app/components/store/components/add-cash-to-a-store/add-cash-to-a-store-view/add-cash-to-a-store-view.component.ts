
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { AddCashToAStore } from 'app/shared/models/add-cash-to-a-store';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { AddCashToAStoreService } from '../shared/add-cash-to-a-store.service';

@Component({
  selector: 'app-add-cash-to-a-store-view',
  templateUrl: './add-cash-to-a-store-view.component.html',
  styleUrls: ['./add-cash-to-a-store-view.component.scss'],
  providers: []
})

export class AddCashToAStoreViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedAddCashToAStore: AddCashToAStore;
  addCashToAStoreForm: FormGroup;

  private gendersService: LookupService;
private itemStatusesService: LookupService;

  
typeSelectOptions: MaterialSelectOptions;
conditionSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedAddCashToAStoreDialog: any,
    @Optional() public dialogRef: MatDialogRef<AddCashToAStoreViewComponent>,
    public addCashToAStoreService: AddCashToAStoreService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAddCashToAStore = this.selectedAddCashToAStoreDialog.data || this.selectedAddCashToAStore;

    
	this.typeSelectOptions = new MaterialSelectOptions({
	 data: this.gendersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: '(نوع ( مستديم – مستهلك ',
	});

	this.conditionSelectOptions = new MaterialSelectOptions({
	 data: this.itemStatusesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: '(حالة ( جديد – مستعمل – كهنة – للاصلاح ',
	});


    this.addCashToAStoreForm = this.formBuilder.group({
      
  employeeCode : [this.selectedAddCashToAStore.employeeCode],
  receiptNumber : [this.selectedAddCashToAStore.receiptNumber],
  itemNo : [this.selectedAddCashToAStore.itemNo],
  productName : [this.selectedAddCashToAStore.productName],
  quantity : [this.selectedAddCashToAStore.quantity],
  price : [this.selectedAddCashToAStore.price],
  value : [this.selectedAddCashToAStore.value],
  receiptDate : [this.selectedAddCashToAStore.receiptDate],
  missingQuantity : [this.selectedAddCashToAStore.missingQuantity],
  type : [this.selectedAddCashToAStore.type],
  condition : [this.selectedAddCashToAStore.condition]
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
    return this.addCashToAStoreForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.addCashToAStoreForm.controls)) {
      this.addCashToAStoreForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.gendersService = new LookupService('genders', this.http);
this.itemStatusesService = new LookupService('itemstatuses', this.http);
  }
}

