
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { TerminationOfTheParticipationOfAnEmployeeInTheFundA } from 'app/shared/models/termination-of-the-participation-of-an-employee-in-the-fund-a';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { TerminationOfTheParticipationOfAnEmployeeInTheFundAService } from '../shared/termination-of-the-participation-of-an-employee-in-the-fund-a.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-termination-of-the-participation-of-an-employee-in-the-fund-a-edit',
  templateUrl: './termination-of-the-participation-of-an-employee-in-the-fund-a-edit.component.html',
  styleUrls: ['./termination-of-the-participation-of-an-employee-in-the-fund-a-edit.component.scss'],
  providers: []
})

export class TerminationOfTheParticipationOfAnEmployeeInTheFundAEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedTerminationOfTheParticipationOfAnEmployeeInTheFundA: TerminationOfTheParticipationOfAnEmployeeInTheFundA;
  terminationOfTheParticipationOfAnEmployeeInTheFundAForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private bankCodesService: LookupService;
private relationshipTypesService: LookupService;
private terminationTypesService: LookupService;
private departmentsSectionsService: LookupService;
private subscriptionStatusService: LookupService;
private employeeStatusesService: LookupService;

  
bankCodeSelectOptions: MaterialSelectOptions;
beneficiaryCodeSelectOptions: MaterialSelectOptions;
terminationTypeSelectOptions: MaterialSelectOptions;
administrationCodeSelectOptions: MaterialSelectOptions;
subscriptionStatusSelectOptions: MaterialSelectOptions;
employeeStatusSelectOptions: MaterialSelectOptions;

  
	@ViewChild('bankCode', { static: true }) BankCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('beneficiaryCode', { static: true }) BeneficiaryCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('terminationType', { static: true }) TerminationTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('administrationCode', { static: true }) AdministrationCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('subscriptionStatus', { static: true }) SubscriptionStatusSelectComponent: MaterialSelectComponent;
	@ViewChild('employeeStatus', { static: true }) EmployeeStatusSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedTerminationOfTheParticipationOfAnEmployeeInTheFundADialog: any,
    @Optional() public dialogRef: MatDialogRef<TerminationOfTheParticipationOfAnEmployeeInTheFundAEditComponent>,
    public terminationOfTheParticipationOfAnEmployeeInTheFundAService: TerminationOfTheParticipationOfAnEmployeeInTheFundAService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundA = new TerminationOfTheParticipationOfAnEmployeeInTheFundA();
    this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundA = this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundADialog.data || this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundA;

    
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

	this.employeeStatusSelectOptions = new MaterialSelectOptions({
	 data: this.employeeStatusesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حاله الموظف',
	});


    this.terminationOfTheParticipationOfAnEmployeeInTheFundAForm = this.formBuilder.group({
      
  id : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundA.id],
  employeeCode : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundA.employeeCode, [ Validators.required ]],
  bankStatement : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundA.bankStatement, [ ]],
  checkAmount : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundA.checkAmount, [ ]],
  beneficiaryName : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundA.beneficiaryName, [ Validators.required ]],
  endDate : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundA.endDate, [ Validators.required ]],
  deductionReason : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundA.deductionReason, [ ]],
  checkNumber : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundA.checkNumber, [ Validators.required ]],
  deductedAmountsWithFeature : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundA.deductedAmountsWithFeature, [ ]],
  subscriptionAmounts : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundA.subscriptionAmounts, [ Validators.required ]],
  subscriptionFeeInsteadSalary : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundA.subscriptionFeeInsteadSalary, [ ]],
  membershipCode : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundA.membershipCode, [ Validators.required ]],
  employeeDeservedAmount : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundA.employeeDeservedAmount, [ Validators.required ]],
  checkDate : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundA.checkDate, [ ]],
  bankCode : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundA.bankCode, [ Validators.required ]],
  beneficiaryCode : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundA.beneficiaryCode, [ Validators.required ]],
  terminationType : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundA.terminationType, [ Validators.required ]],
  administrationCode : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundA.administrationCode, [ ]],
  subscriptionStatus : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundA.subscriptionStatus, [ ]],
  employeeStatus : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundA.employeeStatus, [ ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.terminationOfTheParticipationOfAnEmployeeInTheFundAService.update(this.terminationOfTheParticipationOfAnEmployeeInTheFundAForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.terminationOfTheParticipationOfAnEmployeeInTheFundAService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.terminationOfTheParticipationOfAnEmployeeInTheFundAForm.get(name);
  }

  initializeLookupServices() {
    this.bankCodesService = new LookupService('bankcodes', this.http);
this.relationshipTypesService = new LookupService('relationshiptypes', this.http);
this.terminationTypesService = new LookupService('terminationtypes', this.http);
this.departmentsSectionsService = new LookupService('departmentssections', this.http);
this.subscriptionStatusService = new LookupService('subscriptionstatuses', this.http);
this.employeeStatusesService = new LookupService('employeestatuses', this.http);
  }
}
