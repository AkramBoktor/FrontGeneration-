
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { SubscriptionAmountUnderChecksB } from 'app/shared/models/subscription-amount-under-checks-b';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { SubscriptionAmountUnderChecksBService } from '../shared/subscription-amount-under-checks-b.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-subscription-amount-under-checks-b-new',
  templateUrl: './subscription-amount-under-checks-b-new.component.html',
  styleUrls: ['./subscription-amount-under-checks-b-new.component.scss'],
  providers: [
    ]
})

export class SubscriptionAmountUnderChecksBNewComponent extends AppBaseComponent implements OnInit {
  subscriptionAmountUnderChecksBForm: FormGroup;
  @Input() selectedSubscriptionAmountUnderChecksB: SubscriptionAmountUnderChecksB;
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
    @Optional() public dialogRef: MatDialogRef<SubscriptionAmountUnderChecksBNewComponent>,
    public subscriptionAmountUnderChecksBService: SubscriptionAmountUnderChecksBService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSubscriptionAmountUnderChecksB = new SubscriptionAmountUnderChecksB();

    
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
     
  id : [0],
  employeeCode : [this.selectedSubscriptionAmountUnderChecksB.employeeCode, [ Validators.required ]],
  membershipNumber : [this.selectedSubscriptionAmountUnderChecksB.membershipNumber, [ ]],
  periodStartDate : [this.selectedSubscriptionAmountUnderChecksB.periodStartDate, [ Validators.required ]],
  amountValue : [this.selectedSubscriptionAmountUnderChecksB.amountValue, [ Validators.required ]],
  checkDate : [this.selectedSubscriptionAmountUnderChecksB.checkDate, [ Validators.required ]],
  checkNumber : [this.selectedSubscriptionAmountUnderChecksB.checkNumber, [ Validators.required ]],
  periodEndDate : [this.selectedSubscriptionAmountUnderChecksB.periodEndDate, [ Validators.required ]],
  membershipDate : [this.selectedSubscriptionAmountUnderChecksB.membershipDate, [ ]],
  administrationCode : [this.selectedSubscriptionAmountUnderChecksB.administrationCode, [ ]],
  employeeStatus : [this.selectedSubscriptionAmountUnderChecksB.employeeStatus, [ ]],
  issuer : [this.selectedSubscriptionAmountUnderChecksB.issuer, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.subscriptionAmountUnderChecksBService.create(this.subscriptionAmountUnderChecksBForm.value)
        .pipe(switchMap(x => {
			return this.subscriptionAmountUnderChecksBService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.subscriptionAmountUnderChecksBForm.get(name);
    }

  initializeLookupServices() {
    this.departmentsSectionsService = new LookupService('departmentssections', this.http);
this.employeeStatusesService = new LookupService('employeestatuses', this.http);
this.bankCodesService = new LookupService('bankcodes', this.http);
  }
 }
