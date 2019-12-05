
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { EtisalatBillingAccount } from 'app/shared/models/etisalat-billing-account';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { EtisalatBillingAccountService } from '../shared/etisalat-billing-account.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-etisalat-billing-account-edit',
  templateUrl: './etisalat-billing-account-edit.component.html',
  styleUrls: ['./etisalat-billing-account-edit.component.scss'],
  providers: []
})

export class EtisalatBillingAccountEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedEtisalatBillingAccount: EtisalatBillingAccount;
  etisalatBillingAccountForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedEtisalatBillingAccountDialog: any,
    @Optional() public dialogRef: MatDialogRef<EtisalatBillingAccountEditComponent>,
    public etisalatBillingAccountService: EtisalatBillingAccountService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedEtisalatBillingAccount = new EtisalatBillingAccount();
    this.selectedEtisalatBillingAccount = this.selectedEtisalatBillingAccountDialog.data || this.selectedEtisalatBillingAccount;

    

    this.etisalatBillingAccountForm = this.formBuilder.group({
      
  id : [this.selectedEtisalatBillingAccount.id],
  monthDebt : [this.selectedEtisalatBillingAccount.monthDebt, [ Validators.required ]],
  periodOf : [this.selectedEtisalatBillingAccount.periodOf, [ Validators.required ]],
  periodTo : [this.selectedEtisalatBillingAccount.periodTo, [ Validators.required ]],
  employeeCode : [this.selectedEtisalatBillingAccount.employeeCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.etisalatBillingAccountService.update(this.etisalatBillingAccountForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.etisalatBillingAccountService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.etisalatBillingAccountForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
