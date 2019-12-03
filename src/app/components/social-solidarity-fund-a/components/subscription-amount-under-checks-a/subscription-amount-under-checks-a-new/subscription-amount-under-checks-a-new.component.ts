
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { SubscriptionAmountUnderChecksA } from 'app/shared/models/subscription-amount-under-checks-a';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { SubscriptionAmountUnderChecksAService } from '../shared/subscription-amount-under-checks-a.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-subscription-amount-under-checks-a-new',
  templateUrl: './subscription-amount-under-checks-a-new.component.html',
  styleUrls: ['./subscription-amount-under-checks-a-new.component.scss'],
  providers: [
    ]
})

export class SubscriptionAmountUnderChecksANewComponent extends AppBaseComponent implements OnInit {
  subscriptionAmountUnderChecksAForm: FormGroup;
  @Input() selectedSubscriptionAmountUnderChecksA: SubscriptionAmountUnderChecksA;
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
    @Optional() public dialogRef: MatDialogRef<SubscriptionAmountUnderChecksANewComponent>,
    public subscriptionAmountUnderChecksAService: SubscriptionAmountUnderChecksAService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSubscriptionAmountUnderChecksA = new SubscriptionAmountUnderChecksA();

    
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


    this.subscriptionAmountUnderChecksAForm = this.formBuilder.group({
     
  id : [0],
  employeeCode : [this.selectedSubscriptionAmountUnderChecksA.employeeCode, [ Validators.required ]],
  membershipNumber : [this.selectedSubscriptionAmountUnderChecksA.membershipNumber, [ ]],
  membershipDate : [this.selectedSubscriptionAmountUnderChecksA.membershipDate, [ ]],
  periodStartDate : [this.selectedSubscriptionAmountUnderChecksA.periodStartDate, [ Validators.required ]],
  periodEndDate : [this.selectedSubscriptionAmountUnderChecksA.periodEndDate, [ Validators.required ]],
  checkNumber : [this.selectedSubscriptionAmountUnderChecksA.checkNumber, [ Validators.required ]],
  checkDate : [this.selectedSubscriptionAmountUnderChecksA.checkDate, [ Validators.required ]],
  amountValue : [this.selectedSubscriptionAmountUnderChecksA.amountValue, [ Validators.required ]],
  administrationCode : [this.selectedSubscriptionAmountUnderChecksA.administrationCode, [ ]],
  employeeStatus : [this.selectedSubscriptionAmountUnderChecksA.employeeStatus, [ ]],
  issuer : [this.selectedSubscriptionAmountUnderChecksA.issuer, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.subscriptionAmountUnderChecksAService.create(this.subscriptionAmountUnderChecksAForm.value)
        .pipe(switchMap(x => {
			return this.subscriptionAmountUnderChecksAService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.subscriptionAmountUnderChecksAForm.get(name);
    }

  initializeLookupServices() {
    this.departmentsSectionsService = new LookupService('departmentssections', this.http);
this.employeeStatusesService = new LookupService('employeestatuses', this.http);
this.bankCodesService = new LookupService('bankcodes', this.http);
  }
 }
