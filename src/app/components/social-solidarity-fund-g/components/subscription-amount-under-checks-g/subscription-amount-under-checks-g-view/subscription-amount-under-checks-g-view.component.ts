
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { SubscriptionAmountUnderChecksG } from 'app/shared/models/subscription-amount-under-checks-g';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { SubscriptionAmountUnderChecksGService } from '../shared/subscription-amount-under-checks-g.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-subscription-amount-under-checks-g-view',
  templateUrl: './subscription-amount-under-checks-g-view.component.html',
  styleUrls: ['./subscription-amount-under-checks-g-view.component.scss'],
  providers: []
})

export class SubscriptionAmountUnderChecksGViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedSubscriptionAmountUnderChecksG: SubscriptionAmountUnderChecksG;
  subscriptionAmountUnderChecksGForm: FormGroup;

  private departmentsSectionsService: LookupService;
private employeeStatusesService: LookupService;
private bankCodesService: LookupService;

  
administrationCodeSelectOptions: MaterialSelectOptions;
employeeStatusSelectOptions: MaterialSelectOptions;
issuerSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedSubscriptionAmountUnderChecksGDialog: any,
    @Optional() public dialogRef: MatDialogRef<SubscriptionAmountUnderChecksGViewComponent>,
    public subscriptionAmountUnderChecksGService: SubscriptionAmountUnderChecksGService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSubscriptionAmountUnderChecksG = this.selectedSubscriptionAmountUnderChecksGDialog.data || this.selectedSubscriptionAmountUnderChecksG;

    
	this.administrationCodeSelectOptions = new MaterialSelectOptions({
	 data: this.departmentsSectionsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الادارة',
	});

	this.employeeStatusSelectOptions = new MaterialSelectOptions({
	 data: this.employeeStatusesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حالة الموظف',
	});

	this.issuerSelectOptions = new MaterialSelectOptions({
	 data: this.bankCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الجهه الصادر منها',
	});


    this.subscriptionAmountUnderChecksGForm = this.formBuilder.group({
      
  employeeCode : [this.selectedSubscriptionAmountUnderChecksG.employeeCode],
  membershipNumber : [this.selectedSubscriptionAmountUnderChecksG.membershipNumber],
  periodStartDate : [this.selectedSubscriptionAmountUnderChecksG.periodStartDate],
  membershipDate : [this.selectedSubscriptionAmountUnderChecksG.membershipDate],
  periodEndDate : [this.selectedSubscriptionAmountUnderChecksG.periodEndDate],
  checkNumber : [this.selectedSubscriptionAmountUnderChecksG.checkNumber],
  checkDate : [this.selectedSubscriptionAmountUnderChecksG.checkDate],
  amountValue : [this.selectedSubscriptionAmountUnderChecksG.amountValue],
  administrationCode : [this.selectedSubscriptionAmountUnderChecksG.administrationCode],
  employeeStatus : [this.selectedSubscriptionAmountUnderChecksG.employeeStatus],
  issuer : [this.selectedSubscriptionAmountUnderChecksG.issuer]
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
    return this.subscriptionAmountUnderChecksGForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.subscriptionAmountUnderChecksGForm.controls)) {
      this.subscriptionAmountUnderChecksGForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.departmentsSectionsService = new LookupService('departmentssections', this.http);
this.employeeStatusesService = new LookupService('employeestatuses', this.http);
this.bankCodesService = new LookupService('bankcodes', this.http);
  }
}

