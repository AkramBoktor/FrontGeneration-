
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { RenewalOfContractPeriodForApprovedCompanغ } from 'app/shared/models/renewal-of-contract-period-for-approved-companغ';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { RenewalOfContractPeriodForApprovedCompanغService } from '../shared/renewal-of-contract-period-for-approved-companغ.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-renewal-of-contract-period-for-approved-companغ-view',
  templateUrl: './renewal-of-contract-period-for-approved-companغ-view.component.html',
  styleUrls: ['./renewal-of-contract-period-for-approved-companغ-view.component.scss'],
  providers: []
})

export class RenewalOfContractPeriodForApprovedCompanغViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedRenewalOfContractPeriodForApprovedCompanغ: RenewalOfContractPeriodForApprovedCompanغ;
  renewalOfContractPeriodForApprovedCompanغForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedRenewalOfContractPeriodForApprovedCompanغDialog: any,
    @Optional() public dialogRef: MatDialogRef<RenewalOfContractPeriodForApprovedCompanغViewComponent>,
    public renewalOfContractPeriodForApprovedCompanغService: RenewalOfContractPeriodForApprovedCompanغService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedRenewalOfContractPeriodForApprovedCompanغ = this.selectedRenewalOfContractPeriodForApprovedCompanغDialog.data || this.selectedRenewalOfContractPeriodForApprovedCompanغ;

    

    this.renewalOfContractPeriodForApprovedCompanغForm = this.formBuilder.group({
      
  companyCode : [this.selectedRenewalOfContractPeriodForApprovedCompanغ.companyCode],
  contractStartingDate : [this.selectedRenewalOfContractPeriodForApprovedCompanغ.contractStartingDate],
  contractEndDate : [this.selectedRenewalOfContractPeriodForApprovedCompanغ.contractEndDate]
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
          
	{
	 errorName: 'Less',
	 errorMessage: ''
	}
        ];
    return ValidatorFunctions.getErrorMessage(formCtrl, errorMessages);
   }

  getControls(name: string) {
    return this.renewalOfContractPeriodForApprovedCompanغForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.renewalOfContractPeriodForApprovedCompanغForm.controls)) {
      this.renewalOfContractPeriodForApprovedCompanغForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

