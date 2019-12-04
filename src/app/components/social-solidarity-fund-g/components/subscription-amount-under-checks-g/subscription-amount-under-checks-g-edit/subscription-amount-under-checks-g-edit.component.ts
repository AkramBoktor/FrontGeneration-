
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { SubscriptionAmountUnderChecksG } from 'app/shared/models/subscription-amount-under-checks-g';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { SubscriptionAmountUnderChecksGService } from '../shared/subscription-amount-under-checks-g.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-subscription-amount-under-checks-g-edit',
  templateUrl: './subscription-amount-under-checks-g-edit.component.html',
  styleUrls: ['./subscription-amount-under-checks-g-edit.component.scss'],
  providers: []
})

export class SubscriptionAmountUnderChecksGEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedSubscriptionAmountUnderChecksG: SubscriptionAmountUnderChecksG;
  subscriptionAmountUnderChecksGForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private departmentsSectionsService: LookupService;
private employeeStatusesService: LookupService;
private bankCodesService: LookupService;

  
administrationCodeSelectOptions: MaterialSelectOptions;
employeeStatusSelectOptions: MaterialSelectOptions;
issuerSelectOptions: MaterialSelectOptions;

  
	@ViewChild('administrationCode', { static: true }) AdministrationCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('employeeStatus', { static: true }) EmployeeStatusSelectComponent: MaterialSelectComponent;
	@ViewChild('issuer', { static: true }) IssuerSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedSubscriptionAmountUnderChecksGDialog: any,
    @Optional() public dialogRef: MatDialogRef<SubscriptionAmountUnderChecksGEditComponent>,
    public subscriptionAmountUnderChecksGService: SubscriptionAmountUnderChecksGService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSubscriptionAmountUnderChecksG = new SubscriptionAmountUnderChecksG();
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
      
  id : [this.selectedSubscriptionAmountUnderChecksG.id],
  employeeCode : [this.selectedSubscriptionAmountUnderChecksG.employeeCode, [ Validators.required ]],
  membershipNumber : [this.selectedSubscriptionAmountUnderChecksG.membershipNumber, [ ]],
  membershipDate : [this.selectedSubscriptionAmountUnderChecksG.membershipDate, [ ]],
  periodStartDate : [this.selectedSubscriptionAmountUnderChecksG.periodStartDate, [ Validators.required ]],
  periodEndDate : [this.selectedSubscriptionAmountUnderChecksG.periodEndDate, [ Validators.required ]],
  checkNumber : [this.selectedSubscriptionAmountUnderChecksG.checkNumber, [ Validators.required ]],
  checkDate : [this.selectedSubscriptionAmountUnderChecksG.checkDate, [ Validators.required ]],
  amountValue : [this.selectedSubscriptionAmountUnderChecksG.amountValue, [ Validators.required ]],
  administrationCode : [this.selectedSubscriptionAmountUnderChecksG.administrationCode, [ ]],
  employeeStatus : [this.selectedSubscriptionAmountUnderChecksG.employeeStatus, [ ]],
  issuer : [this.selectedSubscriptionAmountUnderChecksG.issuer, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.subscriptionAmountUnderChecksGService.update(this.subscriptionAmountUnderChecksGForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.subscriptionAmountUnderChecksGService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.subscriptionAmountUnderChecksGForm.get(name);
  }

  initializeLookupServices() {
    this.departmentsSectionsService = new LookupService('departmentssections', this.http);
this.employeeStatusesService = new LookupService('employeestatuses', this.http);
this.bankCodesService = new LookupService('bankcodes', this.http);
  }
}
