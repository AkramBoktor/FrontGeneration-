
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { TerminationOfTheParticipationOfAnEmployeeInTheFundB } from 'app/shared/models/termination-of-the-participation-of-an-employee-in-the-fund-b';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { TerminationOfTheParticipationOfAnEmployeeInTheFundBService } from '../shared/termination-of-the-participation-of-an-employee-in-the-fund-b.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-termination-of-the-participation-of-an-employee-in-the-fund-b-edit',
  templateUrl: './termination-of-the-participation-of-an-employee-in-the-fund-b-edit.component.html',
  styleUrls: ['./termination-of-the-participation-of-an-employee-in-the-fund-b-edit.component.scss'],
  providers: []
})

export class TerminationOfTheParticipationOfAnEmployeeInTheFundBEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedTerminationOfTheParticipationOfAnEmployeeInTheFundB: TerminationOfTheParticipationOfAnEmployeeInTheFundB;
  terminationOfTheParticipationOfAnEmployeeInTheFundBForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private bankCodesService: LookupService;
private relationshipTypesService: LookupService;
private employeeStatusesService: LookupService;
private subscriptionStatusService: LookupService;
private departmentsSectionsService: LookupService;
private terminationTypesService: LookupService;

  
bankCodeSelectOptions: MaterialSelectOptions;
beneficiaryCodeSelectOptions: MaterialSelectOptions;
employeeStatusSelectOptions: MaterialSelectOptions;
subscriptionStatusSelectOptions: MaterialSelectOptions;
administrationCodeSelectOptions: MaterialSelectOptions;
terminationTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('bankCode', { static: true }) BankCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('beneficiaryCode', { static: true }) BeneficiaryCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('employeeStatus', { static: true }) EmployeeStatusSelectComponent: MaterialSelectComponent;
	@ViewChild('subscriptionStatus', { static: true }) SubscriptionStatusSelectComponent: MaterialSelectComponent;
	@ViewChild('administrationCode', { static: true }) AdministrationCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('terminationType', { static: true }) TerminationTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedTerminationOfTheParticipationOfAnEmployeeInTheFundBDialog: any,
    @Optional() public dialogRef: MatDialogRef<TerminationOfTheParticipationOfAnEmployeeInTheFundBEditComponent>,
    public terminationOfTheParticipationOfAnEmployeeInTheFundBService: TerminationOfTheParticipationOfAnEmployeeInTheFundBService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundB = new TerminationOfTheParticipationOfAnEmployeeInTheFundB();
    this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundB = this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundBDialog.data || this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundB;

    
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


    this.terminationOfTheParticipationOfAnEmployeeInTheFundBForm = this.formBuilder.group({
      
  id : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundB.id],
  beneficiaryName : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundB.beneficiaryName, [ Validators.required ]],
  checkAmount : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundB.checkAmount, [ ]],
  bankStatement : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundB.bankStatement, [ ]],
  employeeCode : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundB.employeeCode, [ Validators.required ]],
  endDate : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundB.endDate, [ Validators.required ]],
  checkNumber : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundB.checkNumber, [ Validators.required ]],
  deductionReason : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundB.deductionReason, [ ]],
  checkDate : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundB.checkDate, [ ]],
  employeeDeservedAmount : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundB.employeeDeservedAmount, [ Validators.required ]],
  membershipCode : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundB.membershipCode, [ Validators.required ]],
  subscriptionFeeInsteadSalary : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundB.subscriptionFeeInsteadSalary, [ ]],
  subscriptionAmounts : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundB.subscriptionAmounts, [ Validators.required ]],
  deductedAmountsWithFeature : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundB.deductedAmountsWithFeature, [ ]],
  bankCode : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundB.bankCode, [ Validators.required ]],
  beneficiaryCode : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundB.beneficiaryCode, [ Validators.required ]],
  employeeStatus : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundB.employeeStatus, [ ]],
  subscriptionStatus : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundB.subscriptionStatus, [ ]],
  administrationCode : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundB.administrationCode, [ ]],
  terminationType : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundB.terminationType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.terminationOfTheParticipationOfAnEmployeeInTheFundBService.update(this.terminationOfTheParticipationOfAnEmployeeInTheFundBForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.terminationOfTheParticipationOfAnEmployeeInTheFundBService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.terminationOfTheParticipationOfAnEmployeeInTheFundBForm.get(name);
  }

  initializeLookupServices() {
    this.bankCodesService = new LookupService('bankcodes', this.http);
this.relationshipTypesService = new LookupService('relationshiptypes', this.http);
this.employeeStatusesService = new LookupService('employeestatuses', this.http);
this.subscriptionStatusService = new LookupService('subscriptionstatuses', this.http);
this.departmentsSectionsService = new LookupService('departmentssections', this.http);
this.terminationTypesService = new LookupService('terminationtypes', this.http);
  }
}
