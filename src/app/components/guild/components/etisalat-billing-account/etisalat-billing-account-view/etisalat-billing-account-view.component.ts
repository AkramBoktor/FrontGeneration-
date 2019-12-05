
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { EtisalatBillingAccount } from 'app/shared/models/etisalat-billing-account';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { EtisalatBillingAccountService } from '../shared/etisalat-billing-account.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-etisalat-billing-account-view',
  templateUrl: './etisalat-billing-account-view.component.html',
  styleUrls: ['./etisalat-billing-account-view.component.scss'],
  providers: []
})

export class EtisalatBillingAccountViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedEtisalatBillingAccount: EtisalatBillingAccount;
  etisalatBillingAccountForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedEtisalatBillingAccountDialog: any,
    @Optional() public dialogRef: MatDialogRef<EtisalatBillingAccountViewComponent>,
    public etisalatBillingAccountService: EtisalatBillingAccountService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedEtisalatBillingAccount = this.selectedEtisalatBillingAccountDialog.data || this.selectedEtisalatBillingAccount;

    

    this.etisalatBillingAccountForm = this.formBuilder.group({
      
  monthDebt : [this.selectedEtisalatBillingAccount.monthDebt],
  periodOf : [this.selectedEtisalatBillingAccount.periodOf],
  periodTo : [this.selectedEtisalatBillingAccount.periodTo],
  employeeCode : [this.selectedEtisalatBillingAccount.employeeCode]
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
    return this.etisalatBillingAccountForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.etisalatBillingAccountForm.controls)) {
      this.etisalatBillingAccountForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

