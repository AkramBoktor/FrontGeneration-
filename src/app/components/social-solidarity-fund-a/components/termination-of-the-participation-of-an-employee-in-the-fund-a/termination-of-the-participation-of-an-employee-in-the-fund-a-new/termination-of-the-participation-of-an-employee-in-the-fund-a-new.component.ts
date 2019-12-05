
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { TerminationOfTheParticipationOfAnEmployeeInTheFundA } from 'app/shared/models/termination-of-the-participation-of-an-employee-in-the-fund-a';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { TerminationOfTheParticipationOfAnEmployeeInTheFundAService } from '../shared/termination-of-the-participation-of-an-employee-in-the-fund-a.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-termination-of-the-participation-of-an-employee-in-the-fund-a-new',
  templateUrl: './termination-of-the-participation-of-an-employee-in-the-fund-a-new.component.html',
  styleUrls: ['./termination-of-the-participation-of-an-employee-in-the-fund-a-new.component.scss'],
  providers: [
    ]
})

export class TerminationOfTheParticipationOfAnEmployeeInTheFundANewComponent extends AppBaseComponent implements OnInit {
  terminationOfTheParticipationOfAnEmployeeInTheFundAForm: FormGroup;
  @Input() selectedTerminationOfTheParticipationOfAnEmployeeInTheFundA: TerminationOfTheParticipationOfAnEmployeeInTheFundA;
  errorMessages: FormControlError[] = [
        
  ];

  private employeeStatusesService: LookupService;
private subscriptionStatusService: LookupService;
private departmentsSectionsService: LookupService;
private terminationTypesService: LookupService;
private deductionReasonsService: LookupService;
private relationshipTypesService: LookupService;
private bankCodesService: LookupService;

  
employeeStatusSelectOptions: MaterialSelectOptions;
subscriptionStatusSelectOptions: MaterialSelectOptions;
administrationCodeSelectOptions: MaterialSelectOptions;
terminationTypeSelectOptions: MaterialSelectOptions;
deductionReasonSelectOptions: MaterialSelectOptions;
beneficiaryCodeSelectOptions: MaterialSelectOptions;
bankCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('employeeStatus', { static: true }) EmployeeStatusSelectComponent: MaterialSelectComponent;
	@ViewChild('subscriptionStatus', { static: true }) SubscriptionStatusSelectComponent: MaterialSelectComponent;
	@ViewChild('administrationCode', { static: true }) AdministrationCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('terminationType', { static: true }) TerminationTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('deductionReason', { static: true }) DeductionReasonSelectComponent: MaterialSelectComponent;
	@ViewChild('beneficiaryCode', { static: true }) BeneficiaryCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('bankCode', { static: true }) BankCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<TerminationOfTheParticipationOfAnEmployeeInTheFundANewComponent>,
    public terminationOfTheParticipationOfAnEmployeeInTheFundAService: TerminationOfTheParticipationOfAnEmployeeInTheFundAService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundA = new TerminationOfTheParticipationOfAnEmployeeInTheFundA();

    
	this.employeeStatusSelectOptions = new MaterialSelectOptions({
	 data: this.employeeStatusesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حاله الموظف',
	});

	this.subscriptionStatusSelectOptions = new MaterialSelectOptions({
	 data: this.subscriptionStatusService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حاله الاشتراك',
	});

	this.administrationCodeSelectOptions = new MaterialSelectOptions({
	 data: this.departmentsSectionsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الاداره',
	});

	this.terminationTypeSelectOptions = new MaterialSelectOptions({
	 data: this.terminationTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الانهاء',
	});

	this.deductionReasonSelectOptions = new MaterialSelectOptions({
	 data: this.deductionReasonsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'سبب الخصم',
	});

	this.beneficiaryCodeSelectOptions = new MaterialSelectOptions({
	 data: this.relationshipTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المستفيد',
	});

	this.bankCodeSelectOptions = new MaterialSelectOptions({
	 data: this.bankCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود البنك',
	});


    this.terminationOfTheParticipationOfAnEmployeeInTheFundAForm = this.formBuilder.group({
     
  id : [0],
  employeeCode : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundA.employeeCode, [ Validators.required ]],
  membershipCode : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundA.membershipCode, [ Validators.required ]],
  subscriptionFeeInsteadSalary : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundA.subscriptionFeeInsteadSalary, [ ]],
  subscriptionAmounts : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundA.subscriptionAmounts, [ Validators.required ]],
  employeeDeservedAmount : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundA.employeeDeservedAmount, [ Validators.required ]],
  deductedAmountsWithFeature : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundA.deductedAmountsWithFeature, [ ]],
  endDate : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundA.endDate, [ Validators.required ]],
  beneficiaryName : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundA.beneficiaryName, [ Validators.required ]],
  checkAmount : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundA.checkAmount, [ ]],
  bankStatement : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundA.bankStatement, [ ]],
  checkNumber : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundA.checkNumber, [ Validators.required ]],
  checkDate : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundA.checkDate, [ ]],
  employeeStatus : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundA.employeeStatus, [ ]],
  subscriptionStatus : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundA.subscriptionStatus, [ ]],
  administrationCode : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundA.administrationCode, [ ]],
  terminationType : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundA.terminationType, [ Validators.required ]],
  deductionReason : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundA.deductionReason, [ ]],
  beneficiaryCode : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundA.beneficiaryCode, [ Validators.required ]],
  bankCode : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundA.bankCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.terminationOfTheParticipationOfAnEmployeeInTheFundAService.create(this.terminationOfTheParticipationOfAnEmployeeInTheFundAForm.value)
        .pipe(switchMap(x => {
			return this.terminationOfTheParticipationOfAnEmployeeInTheFundAService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.terminationOfTheParticipationOfAnEmployeeInTheFundAForm.get(name);
    }

  initializeLookupServices() {
    this.employeeStatusesService = new LookupService('employeestatuses', this.http);
this.subscriptionStatusService = new LookupService('subscriptionstatuses', this.http);
this.departmentsSectionsService = new LookupService('departmentssections', this.http);
this.terminationTypesService = new LookupService('terminationtypes', this.http);
this.deductionReasonsService = new LookupService('deductionreasons', this.http);
this.relationshipTypesService = new LookupService('relationshiptypes', this.http);
this.bankCodesService = new LookupService('bankcodes', this.http);
  }
 }
