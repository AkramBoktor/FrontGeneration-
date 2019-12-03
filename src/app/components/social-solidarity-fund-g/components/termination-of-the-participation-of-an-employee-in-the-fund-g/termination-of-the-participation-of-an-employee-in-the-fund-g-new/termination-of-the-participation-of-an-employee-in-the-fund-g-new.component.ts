
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { TerminationOfTheParticipationOfAnEmployeeInTheFundG } from 'app/shared/models/termination-of-the-participation-of-an-employee-in-the-fund-g';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { TerminationOfTheParticipationOfAnEmployeeInTheFundGService } from '../shared/termination-of-the-participation-of-an-employee-in-the-fund-g.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-termination-of-the-participation-of-an-employee-in-the-fund-g-new',
  templateUrl: './termination-of-the-participation-of-an-employee-in-the-fund-g-new.component.html',
  styleUrls: ['./termination-of-the-participation-of-an-employee-in-the-fund-g-new.component.scss'],
  providers: [
    ]
})

export class TerminationOfTheParticipationOfAnEmployeeInTheFundGNewComponent extends AppBaseComponent implements OnInit {
  terminationOfTheParticipationOfAnEmployeeInTheFundGForm: FormGroup;
  @Input() selectedTerminationOfTheParticipationOfAnEmployeeInTheFundG: TerminationOfTheParticipationOfAnEmployeeInTheFundG;
  errorMessages: FormControlError[] = [
        
  ];

  private terminationTypesService: LookupService;
private deductionReasonsService: LookupService;
private relationshipTypesService: LookupService;
private bankCodesService: LookupService;
private employeeStatusesService: LookupService;
private subscriptionStatusService: LookupService;
private departmentsSectionsService: LookupService;

  
terminationTypeSelectOptions: MaterialSelectOptions;
deductionReasonSelectOptions: MaterialSelectOptions;
beneficiaryCodeSelectOptions: MaterialSelectOptions;
bankCodeSelectOptions: MaterialSelectOptions;
employeeStatusSelectOptions: MaterialSelectOptions;
subscriptionStatusSelectOptions: MaterialSelectOptions;
administrationCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('terminationType', { static: true }) TerminationTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('deductionReason', { static: true }) DeductionReasonSelectComponent: MaterialSelectComponent;
	@ViewChild('beneficiaryCode', { static: true }) BeneficiaryCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('bankCode', { static: true }) BankCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('employeeStatus', { static: true }) EmployeeStatusSelectComponent: MaterialSelectComponent;
	@ViewChild('subscriptionStatus', { static: true }) SubscriptionStatusSelectComponent: MaterialSelectComponent;
	@ViewChild('administrationCode', { static: true }) AdministrationCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<TerminationOfTheParticipationOfAnEmployeeInTheFundGNewComponent>,
    public terminationOfTheParticipationOfAnEmployeeInTheFundGService: TerminationOfTheParticipationOfAnEmployeeInTheFundGService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundG = new TerminationOfTheParticipationOfAnEmployeeInTheFundG();

    
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


    this.terminationOfTheParticipationOfAnEmployeeInTheFundGForm = this.formBuilder.group({
     
  id : [0],
  checkAmount : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundG.checkAmount, [ ]],
  membershipCode : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundG.membershipCode, [ Validators.required ]],
  bankStatement : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundG.bankStatement, [ ]],
  checkNumber : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundG.checkNumber, [ Validators.required ]],
  employeeCode : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundG.employeeCode, [ Validators.required ]],
  checkDate : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundG.checkDate, [ ]],
  deductedAmountsWithFeature : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundG.deductedAmountsWithFeature, [ ]],
  endDate : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundG.endDate, [ Validators.required ]],
  subscriptionFeeInsteadSalary : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundG.subscriptionFeeInsteadSalary, [ ]],
  subscriptionAmounts : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundG.subscriptionAmounts, [ Validators.required ]],
  employeeDeservedAmount : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundG.employeeDeservedAmount, [ Validators.required ]],
  beneficiaryName : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundG.beneficiaryName, [ Validators.required ]],
  terminationType : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundG.terminationType, [ Validators.required ]],
  deductionReason : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundG.deductionReason, [ ]],
  beneficiaryCode : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundG.beneficiaryCode, [ Validators.required ]],
  bankCode : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundG.bankCode, [ Validators.required ]],
  employeeStatus : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundG.employeeStatus, [ ]],
  subscriptionStatus : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundG.subscriptionStatus, [ ]],
  administrationCode : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundG.administrationCode, [ ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.terminationOfTheParticipationOfAnEmployeeInTheFundGService.create(this.terminationOfTheParticipationOfAnEmployeeInTheFundGForm.value)
        .pipe(switchMap(x => {
			return this.terminationOfTheParticipationOfAnEmployeeInTheFundGService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.terminationOfTheParticipationOfAnEmployeeInTheFundGForm.get(name);
    }

  initializeLookupServices() {
    this.terminationTypesService = new LookupService('terminationtypes', this.http);
this.deductionReasonsService = new LookupService('deductionreasons', this.http);
this.relationshipTypesService = new LookupService('relationshiptypes', this.http);
this.bankCodesService = new LookupService('bankcodes', this.http);
this.employeeStatusesService = new LookupService('employeestatuses', this.http);
this.subscriptionStatusService = new LookupService('subscriptionstatuses', this.http);
this.departmentsSectionsService = new LookupService('departmentssections', this.http);
  }
 }
