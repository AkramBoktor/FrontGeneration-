
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { SubscriptionAmountUnderChecksB } from 'app/shared/models/subscription-amount-under-checks-b';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { SubscriptionAmountUnderChecksBService } from '../shared/subscription-amount-under-checks-b.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-subscription-amount-under-checks-b-edit',
  templateUrl: './subscription-amount-under-checks-b-edit.component.html',
  styleUrls: ['./subscription-amount-under-checks-b-edit.component.scss'],
  providers: []
})

export class SubscriptionAmountUnderChecksBEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedSubscriptionAmountUnderChecksB: SubscriptionAmountUnderChecksB;
  subscriptionAmountUnderChecksBForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private bankCodesService: LookupService;
private employeeStatusesService: LookupService;
private departmentsSectionsService: LookupService;

  
issuerSelectOptions: MaterialSelectOptions;
employeeStatusSelectOptions: MaterialSelectOptions;
administrationCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('issuer', { static: true }) IssuerSelectComponent: MaterialSelectComponent;
	@ViewChild('employeeStatus', { static: true }) EmployeeStatusSelectComponent: MaterialSelectComponent;
	@ViewChild('administrationCode', { static: true }) AdministrationCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedSubscriptionAmountUnderChecksBDialog: any,
    @Optional() public dialogRef: MatDialogRef<SubscriptionAmountUnderChecksBEditComponent>,
    public subscriptionAmountUnderChecksBService: SubscriptionAmountUnderChecksBService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSubscriptionAmountUnderChecksB = new SubscriptionAmountUnderChecksB();
    this.selectedSubscriptionAmountUnderChecksB = this.selectedSubscriptionAmountUnderChecksBDialog.data || this.selectedSubscriptionAmountUnderChecksB;

    
	this.issuerSelectOptions = new MaterialSelectOptions({
	 data: this.bankCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الجهه الصادر منها',
	});

	this.employeeStatusSelectOptions = new MaterialSelectOptions({
	 data: this.employeeStatusesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حالة الموظف',
	});

	this.administrationCodeSelectOptions = new MaterialSelectOptions({
	 data: this.departmentsSectionsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الادارة',
	});


    this.subscriptionAmountUnderChecksBForm = this.formBuilder.group({
      
  id : [this.selectedSubscriptionAmountUnderChecksB.id],
  amountValue : [this.selectedSubscriptionAmountUnderChecksB.amountValue, [ Validators.required ]],
  checkDate : [this.selectedSubscriptionAmountUnderChecksB.checkDate, [ Validators.required ]],
  checkNumber : [this.selectedSubscriptionAmountUnderChecksB.checkNumber, [ Validators.required ]],
  periodEndDate : [this.selectedSubscriptionAmountUnderChecksB.periodEndDate, [ Validators.required ]],
  periodStartDate : [this.selectedSubscriptionAmountUnderChecksB.periodStartDate, [ Validators.required ]],
  membershipDate : [this.selectedSubscriptionAmountUnderChecksB.membershipDate, [ ]],
  membershipNumber : [this.selectedSubscriptionAmountUnderChecksB.membershipNumber, [ ]],
  employeeCode : [this.selectedSubscriptionAmountUnderChecksB.employeeCode, [ Validators.required ]],
  issuer : [this.selectedSubscriptionAmountUnderChecksB.issuer, [ Validators.required ]],
  employeeStatus : [this.selectedSubscriptionAmountUnderChecksB.employeeStatus, [ ]],
  administrationCode : [this.selectedSubscriptionAmountUnderChecksB.administrationCode, [ ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.subscriptionAmountUnderChecksBService.update(this.subscriptionAmountUnderChecksBForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.subscriptionAmountUnderChecksBService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.subscriptionAmountUnderChecksBForm.get(name);
  }

  initializeLookupServices() {
    this.bankCodesService = new LookupService('bankcodes', this.http);
this.employeeStatusesService = new LookupService('employeestatuses', this.http);
this.departmentsSectionsService = new LookupService('departmentssections', this.http);
  }
}
