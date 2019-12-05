
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { EnteringWithdrawalAndDepositAmounts } from 'app/shared/models/entering-withdrawal-and-deposit-amounts';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { EnteringWithdrawalAndDepositAmountsService } from '../shared/entering-withdrawal-and-deposit-amounts.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-entering-withdrawal-and-deposit-amounts-view',
  templateUrl: './entering-withdrawal-and-deposit-amounts-view.component.html',
  styleUrls: ['./entering-withdrawal-and-deposit-amounts-view.component.scss'],
  providers: []
})

export class EnteringWithdrawalAndDepositAmountsViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedEnteringWithdrawalAndDepositAmounts: EnteringWithdrawalAndDepositAmounts;
  enteringWithdrawalAndDepositAmountsForm: FormGroup;

  private entityCodesService: LookupService;
private processTypesService: LookupService;

  
entityCodeSelectOptions: MaterialSelectOptions;
operationTypeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedEnteringWithdrawalAndDepositAmountsDialog: any,
    @Optional() public dialogRef: MatDialogRef<EnteringWithdrawalAndDepositAmountsViewComponent>,
    public enteringWithdrawalAndDepositAmountsService: EnteringWithdrawalAndDepositAmountsService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedEnteringWithdrawalAndDepositAmounts = this.selectedEnteringWithdrawalAndDepositAmountsDialog.data || this.selectedEnteringWithdrawalAndDepositAmounts;

    
	this.entityCodeSelectOptions = new MaterialSelectOptions({
	 data: this.entityCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' كود الجهة ',
	});

	this.operationTypeSelectOptions = new MaterialSelectOptions({
	 data: this.processTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: '  نوع العملية',
	});


    this.enteringWithdrawalAndDepositAmountsForm = this.formBuilder.group({
      
  checkNumber : [this.selectedEnteringWithdrawalAndDepositAmounts.checkNumber],
  checkDate : [this.selectedEnteringWithdrawalAndDepositAmounts.checkDate],
  checkAmount : [this.selectedEnteringWithdrawalAndDepositAmounts.checkAmount],
  operationDate : [this.selectedEnteringWithdrawalAndDepositAmounts.operationDate],
  statement : [this.selectedEnteringWithdrawalAndDepositAmounts.statement],
  entityCode : [this.selectedEnteringWithdrawalAndDepositAmounts.entityCode],
  operationType : [this.selectedEnteringWithdrawalAndDepositAmounts.operationType]
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
    return this.enteringWithdrawalAndDepositAmountsForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.enteringWithdrawalAndDepositAmountsForm.controls)) {
      this.enteringWithdrawalAndDepositAmountsForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.entityCodesService = new LookupService('entitycodes', this.http);
this.processTypesService = new LookupService('processtypes', this.http);
  }
}

