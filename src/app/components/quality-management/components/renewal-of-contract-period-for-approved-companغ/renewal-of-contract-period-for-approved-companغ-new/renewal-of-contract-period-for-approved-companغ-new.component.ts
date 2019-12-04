
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { RenewalOfContractPeriodForApprovedCompanغ } from 'app/shared/models/renewal-of-contract-period-for-approved-companغ';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { RenewalOfContractPeriodForApprovedCompanغService } from '../shared/renewal-of-contract-period-for-approved-companغ.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-renewal-of-contract-period-for-approved-companغ-new',
  templateUrl: './renewal-of-contract-period-for-approved-companغ-new.component.html',
  styleUrls: ['./renewal-of-contract-period-for-approved-companغ-new.component.scss'],
  providers: [
    ]
})

export class RenewalOfContractPeriodForApprovedCompanغNewComponent extends AppBaseComponent implements OnInit {
  renewalOfContractPeriodForApprovedCompanغForm: FormGroup;
  @Input() selectedRenewalOfContractPeriodForApprovedCompanغ: RenewalOfContractPeriodForApprovedCompanغ;
  errorMessages: FormControlError[] = [
        
	{
	 errorName: 'Less',
	 errorMessage: ''
	}
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<RenewalOfContractPeriodForApprovedCompanغNewComponent>,
    public renewalOfContractPeriodForApprovedCompanغService: RenewalOfContractPeriodForApprovedCompanغService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedRenewalOfContractPeriodForApprovedCompanغ = new RenewalOfContractPeriodForApprovedCompanغ();

    

    this.renewalOfContractPeriodForApprovedCompanغForm = this.formBuilder.group({
     
  id : [0],
  companyCode : [this.selectedRenewalOfContractPeriodForApprovedCompanغ.companyCode, [ Validators.required ]],
  contractStartingDate : [this.selectedRenewalOfContractPeriodForApprovedCompanغ.contractStartingDate, [ Validators.required ]],
  contractEndDate : [this.selectedRenewalOfContractPeriodForApprovedCompanغ.contractEndDate, [ Validators.required ]]
   }, {
	  validators: [ 
	   ValidatorFunctions.validateLess("ContractEndDate","ContractStartingDate") ]
      });

        

  }
  onSubmit() {
    this.renewalOfContractPeriodForApprovedCompanغService.create(this.renewalOfContractPeriodForApprovedCompanغForm.value)
        .pipe(switchMap(x => {
			return this.renewalOfContractPeriodForApprovedCompanغService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.renewalOfContractPeriodForApprovedCompanغForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
