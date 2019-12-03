
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { SubscriptionAmountUnderChecksG } from 'app/shared/models/subscription-amount-under-checks-g';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { SubscriptionAmountUnderChecksGService } from '../shared/subscription-amount-under-checks-g.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-subscription-amount-under-checks-g-new',
  templateUrl: './subscription-amount-under-checks-g-new.component.html',
  styleUrls: ['./subscription-amount-under-checks-g-new.component.scss'],
  providers: [
    ]
})

export class SubscriptionAmountUnderChecksGNewComponent extends AppBaseComponent implements OnInit {
  subscriptionAmountUnderChecksGForm: FormGroup;
  @Input() selectedSubscriptionAmountUnderChecksG: SubscriptionAmountUnderChecksG;
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
    @Optional() public dialogRef: MatDialogRef<SubscriptionAmountUnderChecksGNewComponent>,
    public subscriptionAmountUnderChecksGService: SubscriptionAmountUnderChecksGService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSubscriptionAmountUnderChecksG = new SubscriptionAmountUnderChecksG();

    
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
     
  id : [0],
  employeeCode : [this.selectedSubscriptionAmountUnderChecksG.employeeCode, [ Validators.required ]],
  membershipNumber : [this.selectedSubscriptionAmountUnderChecksG.membershipNumber, [ ]],
  periodStartDate : [this.selectedSubscriptionAmountUnderChecksG.periodStartDate, [ Validators.required ]],
  membershipDate : [this.selectedSubscriptionAmountUnderChecksG.membershipDate, [ ]],
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
    this.subscriptionAmountUnderChecksGService.create(this.subscriptionAmountUnderChecksGForm.value)
        .pipe(switchMap(x => {
			return this.subscriptionAmountUnderChecksGService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
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
