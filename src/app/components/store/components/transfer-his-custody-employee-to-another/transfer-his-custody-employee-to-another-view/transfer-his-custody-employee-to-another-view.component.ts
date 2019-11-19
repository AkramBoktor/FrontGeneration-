
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { TransferHisCustodyEmployeeToAnother } from 'app/shared/models/transfer-his-custody-employee-to-another';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { TransferHisCustodyEmployeeToAnotherService } from '../shared/transfer-his-custody-employee-to-another.service';

@Component({
  selector: 'app-transfer-his-custody-employee-to-another-view',
  templateUrl: './transfer-his-custody-employee-to-another-view.component.html',
  styleUrls: ['./transfer-his-custody-employee-to-another-view.component.scss'],
  providers: []
})

export class TransferHisCustodyEmployeeToAnotherViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedTransferHisCustodyEmployeeToAnother: TransferHisCustodyEmployeeToAnother;
  transferHisCustodyEmployeeToAnotherForm: FormGroup;

  private itemStatusesService: LookupService;

  
itemConditionSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedTransferHisCustodyEmployeeToAnotherDialog: any,
    @Optional() public dialogRef: MatDialogRef<TransferHisCustodyEmployeeToAnotherViewComponent>,
    public transferHisCustodyEmployeeToAnotherService: TransferHisCustodyEmployeeToAnotherService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTransferHisCustodyEmployeeToAnother = this.selectedTransferHisCustodyEmployeeToAnotherDialog.data || this.selectedTransferHisCustodyEmployeeToAnother;

    
	this.itemConditionSelectOptions = new MaterialSelectOptions({
	 data: this.itemStatusesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حاله الصنف',
	});


    this.transferHisCustodyEmployeeToAnotherForm = this.formBuilder.group({
      
  carrierEmployeeNumber : [this.selectedTransferHisCustodyEmployeeToAnother.carrierEmployeeNumber],
  recipientEmployeeNumber : [this.selectedTransferHisCustodyEmployeeToAnother.recipientEmployeeNumber],
  itemNo : [this.selectedTransferHisCustodyEmployeeToAnother.itemNo],
  lastPrice : [this.selectedTransferHisCustodyEmployeeToAnother.lastPrice],
  storeNumber : [this.selectedTransferHisCustodyEmployeeToAnother.storeNumber],
  exchangeAuthorizationNumber : [this.selectedTransferHisCustodyEmployeeToAnother.exchangeAuthorizationNumber],
  exchangeDate : [this.selectedTransferHisCustodyEmployeeToAnother.exchangeDate],
  quantity : [this.selectedTransferHisCustodyEmployeeToAnother.quantity],
  transferDate : [this.selectedTransferHisCustodyEmployeeToAnother.transferDate],
  quantityTransferred : [this.selectedTransferHisCustodyEmployeeToAnother.quantityTransferred],
  itemCondition : [this.selectedTransferHisCustodyEmployeeToAnother.itemCondition]
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
    return this.transferHisCustodyEmployeeToAnotherForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.transferHisCustodyEmployeeToAnotherForm.controls)) {
      this.transferHisCustodyEmployeeToAnotherForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.itemStatusesService = new LookupService('itemstatuses', this.http);
  }
}

