
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { RenewalOfContractPeriodForApprovedCompanغ } from 'app/shared/models/renewal-of-contract-period-for-approved-companغ';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { RenewalOfContractPeriodForApprovedCompanغService } from '../shared/renewal-of-contract-period-for-approved-companغ.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-renewal-of-contract-period-for-approved-companغ-edit',
  templateUrl: './renewal-of-contract-period-for-approved-companغ-edit.component.html',
  styleUrls: ['./renewal-of-contract-period-for-approved-companغ-edit.component.scss'],
  providers: []
})

export class RenewalOfContractPeriodForApprovedCompanغEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedRenewalOfContractPeriodForApprovedCompanغ: RenewalOfContractPeriodForApprovedCompanغ;
  renewalOfContractPeriodForApprovedCompanغForm: FormGroup;
  errorMessages: FormControlError[] = [
          
	{
	 errorName: 'Less',
	 errorMessage: ''
	}
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedRenewalOfContractPeriodForApprovedCompanغDialog: any,
    @Optional() public dialogRef: MatDialogRef<RenewalOfContractPeriodForApprovedCompanغEditComponent>,
    public renewalOfContractPeriodForApprovedCompanغService: RenewalOfContractPeriodForApprovedCompanغService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedRenewalOfContractPeriodForApprovedCompanغ = new RenewalOfContractPeriodForApprovedCompanغ();
    this.selectedRenewalOfContractPeriodForApprovedCompanغ = this.selectedRenewalOfContractPeriodForApprovedCompanغDialog.data || this.selectedRenewalOfContractPeriodForApprovedCompanغ;

    

    this.renewalOfContractPeriodForApprovedCompanغForm = this.formBuilder.group({
      
  id : [this.selectedRenewalOfContractPeriodForApprovedCompanغ.id],
  companyCode : [this.selectedRenewalOfContractPeriodForApprovedCompanغ.companyCode, [ Validators.required ]],
  contractStartingDate : [this.selectedRenewalOfContractPeriodForApprovedCompanغ.contractStartingDate, [ Validators.required ]],
  contractEndDate : [this.selectedRenewalOfContractPeriodForApprovedCompanغ.contractEndDate, [ Validators.required ]]
   }, {
	  validators: [ 
	   ValidatorFunctions.validateLess("ContractEndDate","ContractStartingDate") ]
      });

    

  }

  onSubmit() {
    this.renewalOfContractPeriodForApprovedCompanغService.update(this.renewalOfContractPeriodForApprovedCompanغForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.renewalOfContractPeriodForApprovedCompanغService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.renewalOfContractPeriodForApprovedCompanغForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
