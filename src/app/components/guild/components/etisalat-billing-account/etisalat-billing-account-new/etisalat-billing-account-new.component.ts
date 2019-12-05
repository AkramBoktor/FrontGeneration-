
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { EtisalatBillingAccount } from 'app/shared/models/etisalat-billing-account';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { EtisalatBillingAccountService } from '../shared/etisalat-billing-account.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-etisalat-billing-account-new',
  templateUrl: './etisalat-billing-account-new.component.html',
  styleUrls: ['./etisalat-billing-account-new.component.scss'],
  providers: [
    ]
})

export class EtisalatBillingAccountNewComponent extends AppBaseComponent implements OnInit {
  etisalatBillingAccountForm: FormGroup;
  @Input() selectedEtisalatBillingAccount: EtisalatBillingAccount;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<EtisalatBillingAccountNewComponent>,
    public etisalatBillingAccountService: EtisalatBillingAccountService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedEtisalatBillingAccount = new EtisalatBillingAccount();

    

    this.etisalatBillingAccountForm = this.formBuilder.group({
     
  id : [0],
  monthDebt : [this.selectedEtisalatBillingAccount.monthDebt, [ Validators.required ]],
  periodOf : [this.selectedEtisalatBillingAccount.periodOf, [ Validators.required ]],
  periodTo : [this.selectedEtisalatBillingAccount.periodTo, [ Validators.required ]],
  employeeCode : [this.selectedEtisalatBillingAccount.employeeCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.etisalatBillingAccountService.create(this.etisalatBillingAccountForm.value)
        .pipe(switchMap(x => {
			return this.etisalatBillingAccountService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.etisalatBillingAccountForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
