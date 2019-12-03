
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { TerminationOfTheParticipationOfAnEmployeeInTheFundB } from 'app/shared/models/termination-of-the-participation-of-an-employee-in-the-fund-b';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { TerminationOfTheParticipationOfAnEmployeeInTheFundBService } from '../shared/termination-of-the-participation-of-an-employee-in-the-fund-b.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-termination-of-the-participation-of-an-employee-in-the-fund-b-new',
  templateUrl: './termination-of-the-participation-of-an-employee-in-the-fund-b-new.component.html',
  styleUrls: ['./termination-of-the-participation-of-an-employee-in-the-fund-b-new.component.scss'],
  providers: [
    ]
})

export class TerminationOfTheParticipationOfAnEmployeeInTheFundBNewComponent extends AppBaseComponent implements OnInit {
  terminationOfTheParticipationOfAnEmployeeInTheFundBForm: FormGroup;
  @Input() selectedTerminationOfTheParticipationOfAnEmployeeInTheFundB: TerminationOfTheParticipationOfAnEmployeeInTheFundB;
  errorMessages: FormControlError[] = [
        
  ];

  private employeeStatusesService: LookupService;
private bankCodesService: LookupService;
private relationshipTypesService: LookupService;
private deductionReasonsService: LookupService;
private terminationTypesService: LookupService;
private departmentsSectionsService: LookupService;
private subscriptionStatusService: LookupService;

  
employeeStatusSelectOptions: MaterialSelectOptions;
bankCodeSelectOptions: MaterialSelectOptions;
beneficiaryCodeSelectOptions: MaterialSelectOptions;
deductionReasonSelectOptions: MaterialSelectOptions;
terminationTypeSelectOptions: MaterialSelectOptions;
administrationCodeSelectOptions: MaterialSelectOptions;
subscriptionStatusSelectOptions: MaterialSelectOptions;

  
	@ViewChild('employeeStatus', { static: true }) EmployeeStatusSelectComponent: MaterialSelectComponent;
	@ViewChild('bankCode', { static: true }) BankCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('beneficiaryCode', { static: true }) BeneficiaryCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('deductionReason', { static: true }) DeductionReasonSelectComponent: MaterialSelectComponent;
	@ViewChild('terminationType', { static: true }) TerminationTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('administrationCode', { static: true }) AdministrationCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('subscriptionStatus', { static: true }) SubscriptionStatusSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<TerminationOfTheParticipationOfAnEmployeeInTheFundBNewComponent>,
    public terminationOfTheParticipationOfAnEmployeeInTheFundBService: TerminationOfTheParticipationOfAnEmployeeInTheFundBService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundB = new TerminationOfTheParticipationOfAnEmployeeInTheFundB();

    
	this.employeeStatusSelectOptions = new MaterialSelectOptions({
	 data: this.employeeStatusesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حاله الموظف',
	});

	this.bankCodeSelectOptions = new MaterialSelectOptions({
	 data: this.bankCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود البنك',
	});

	this.beneficiaryCodeSelectOptions = new MaterialSelectOptions({
	 data: this.relationshipTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المستفيد',
	});

	this.deductionReasonSelectOptions = new MaterialSelectOptions({
	 data: this.deductionReasonsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'سبب الخصم',
	});

	this.terminationTypeSelectOptions = new MaterialSelectOptions({
	 data: this.terminationTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الانهاء',
	});

	this.administrationCodeSelectOptions = new MaterialSelectOptions({
	 data: this.departmentsSectionsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الاداره',
	});

	this.subscriptionStatusSelectOptions = new MaterialSelectOptions({
	 data: this.subscriptionStatusService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حاله الاشتراك',
	});


    this.terminationOfTheParticipationOfAnEmployeeInTheFundBForm = this.formBuilder.group({
     
  id : [0],
  employeeCode : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundB.employeeCode, [ Validators.required ]],
  checkDate : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundB.checkDate, [ ]],
  checkNumber : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundB.checkNumber, [ Validators.required ]],
  bankStatement : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundB.bankStatement, [ ]],
  membershipCode : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundB.membershipCode, [ Validators.required ]],
  checkAmount : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundB.checkAmount, [ ]],
  deductedAmountsWithFeature : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundB.deductedAmountsWithFeature, [ ]],
  employeeDeservedAmount : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundB.employeeDeservedAmount, [ Validators.required ]],
  subscriptionAmounts : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundB.subscriptionAmounts, [ Validators.required ]],
  subscriptionFeeInsteadSalary : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundB.subscriptionFeeInsteadSalary, [ ]],
  beneficiaryName : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundB.beneficiaryName, [ Validators.required ]],
  endDate : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundB.endDate, [ Validators.required ]],
  employeeStatus : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundB.employeeStatus, [ ]],
  bankCode : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundB.bankCode, [ Validators.required ]],
  beneficiaryCode : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundB.beneficiaryCode, [ Validators.required ]],
  deductionReason : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundB.deductionReason, [ ]],
  terminationType : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundB.terminationType, [ Validators.required ]],
  administrationCode : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundB.administrationCode, [ ]],
  subscriptionStatus : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundB.subscriptionStatus, [ ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.terminationOfTheParticipationOfAnEmployeeInTheFundBService.create(this.terminationOfTheParticipationOfAnEmployeeInTheFundBForm.value)
        .pipe(switchMap(x => {
			return this.terminationOfTheParticipationOfAnEmployeeInTheFundBService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.terminationOfTheParticipationOfAnEmployeeInTheFundBForm.get(name);
    }

  initializeLookupServices() {
    this.employeeStatusesService = new LookupService('employeestatuses', this.http);
this.bankCodesService = new LookupService('bankcodes', this.http);
this.relationshipTypesService = new LookupService('relationshiptypes', this.http);
this.deductionReasonsService = new LookupService('deductionreasons', this.http);
this.terminationTypesService = new LookupService('terminationtypes', this.http);
this.departmentsSectionsService = new LookupService('departmentssections', this.http);
this.subscriptionStatusService = new LookupService('subscriptionstatuses', this.http);
  }
 }
