
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { SubscriptionAmountUnderChecksB } from 'app/shared/models/subscription-amount-under-checks-b';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { SubscriptionAmountUnderChecksBService } from '../shared/subscription-amount-under-checks-b.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-subscription-amount-under-checks-b-view',
  templateUrl: './subscription-amount-under-checks-b-view.component.html',
  styleUrls: ['./subscription-amount-under-checks-b-view.component.scss'],
  providers: []
})

export class SubscriptionAmountUnderChecksBViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedSubscriptionAmountUnderChecksB: SubscriptionAmountUnderChecksB;
  subscriptionAmountUnderChecksBForm: FormGroup;

  private departmentsSectionsService: LookupService;
private employeeStatusesService: LookupService;
private bankCodesService: LookupService;

  
administrationCodeSelectOptions: MaterialSelectOptions;
employeeStatusSelectOptions: MaterialSelectOptions;
issuerSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedSubscriptionAmountUnderChecksBDialog: any,
    @Optional() public dialogRef: MatDialogRef<SubscriptionAmountUnderChecksBViewComponent>,
    public subscriptionAmountUnderChecksBService: SubscriptionAmountUnderChecksBService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSubscriptionAmountUnderChecksB = this.selectedSubscriptionAmountUnderChecksBDialog.data || this.selectedSubscriptionAmountUnderChecksB;

    
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


    this.subscriptionAmountUnderChecksBForm = this.formBuilder.group({
      
  employeeCode : [this.selectedSubscriptionAmountUnderChecksB.employeeCode],
  membershipNumber : [this.selectedSubscriptionAmountUnderChecksB.membershipNumber],
  periodStartDate : [this.selectedSubscriptionAmountUnderChecksB.periodStartDate],
  amountValue : [this.selectedSubscriptionAmountUnderChecksB.amountValue],
  checkDate : [this.selectedSubscriptionAmountUnderChecksB.checkDate],
  checkNumber : [this.selectedSubscriptionAmountUnderChecksB.checkNumber],
  periodEndDate : [this.selectedSubscriptionAmountUnderChecksB.periodEndDate],
  membershipDate : [this.selectedSubscriptionAmountUnderChecksB.membershipDate],
  administrationCode : [this.selectedSubscriptionAmountUnderChecksB.administrationCode],
  employeeStatus : [this.selectedSubscriptionAmountUnderChecksB.employeeStatus],
  issuer : [this.selectedSubscriptionAmountUnderChecksB.issuer]
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
    return this.subscriptionAmountUnderChecksBForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.subscriptionAmountUnderChecksBForm.controls)) {
      this.subscriptionAmountUnderChecksBForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.departmentsSectionsService = new LookupService('departmentssections', this.http);
this.employeeStatusesService = new LookupService('employeestatuses', this.http);
this.bankCodesService = new LookupService('bankcodes', this.http);
  }
}

