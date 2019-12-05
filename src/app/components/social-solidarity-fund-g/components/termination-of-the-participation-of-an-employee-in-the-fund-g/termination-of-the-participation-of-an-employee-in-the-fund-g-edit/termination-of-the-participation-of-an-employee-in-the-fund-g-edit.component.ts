
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { TerminationOfTheParticipationOfAnEmployeeInTheFundG } from 'app/shared/models/termination-of-the-participation-of-an-employee-in-the-fund-g';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { TerminationOfTheParticipationOfAnEmployeeInTheFundGService } from '../shared/termination-of-the-participation-of-an-employee-in-the-fund-g.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-termination-of-the-participation-of-an-employee-in-the-fund-g-edit',
  templateUrl: './termination-of-the-participation-of-an-employee-in-the-fund-g-edit.component.html',
  styleUrls: ['./termination-of-the-participation-of-an-employee-in-the-fund-g-edit.component.scss'],
  providers: []
})

export class TerminationOfTheParticipationOfAnEmployeeInTheFundGEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedTerminationOfTheParticipationOfAnEmployeeInTheFundG: TerminationOfTheParticipationOfAnEmployeeInTheFundG;
  terminationOfTheParticipationOfAnEmployeeInTheFundGForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private terminationTypesService: LookupService;
private subscriptionStatusService: LookupService;
private relationshipTypesService: LookupService;
private departmentsSectionsService: LookupService;
private bankCodesService: LookupService;
private employeeStatusesService: LookupService;

  
terminationTypeSelectOptions: MaterialSelectOptions;
subscriptionStatusSelectOptions: MaterialSelectOptions;
beneficiaryCodeSelectOptions: MaterialSelectOptions;
administrationCodeSelectOptions: MaterialSelectOptions;
bankCodeSelectOptions: MaterialSelectOptions;
employeeStatusSelectOptions: MaterialSelectOptions;

  
	@ViewChild('terminationType', { static: true }) TerminationTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('subscriptionStatus', { static: true }) SubscriptionStatusSelectComponent: MaterialSelectComponent;
	@ViewChild('beneficiaryCode', { static: true }) BeneficiaryCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('administrationCode', { static: true }) AdministrationCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('bankCode', { static: true }) BankCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('employeeStatus', { static: true }) EmployeeStatusSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedTerminationOfTheParticipationOfAnEmployeeInTheFundGDialog: any,
    @Optional() public dialogRef: MatDialogRef<TerminationOfTheParticipationOfAnEmployeeInTheFundGEditComponent>,
    public terminationOfTheParticipationOfAnEmployeeInTheFundGService: TerminationOfTheParticipationOfAnEmployeeInTheFundGService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundG = new TerminationOfTheParticipationOfAnEmployeeInTheFundG();
    this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundG = this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundGDialog.data || this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundG;

    
	this.terminationTypeSelectOptions = new MaterialSelectOptions({
	 data: this.terminationTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الانهاء',
	});

	this.subscriptionStatusSelectOptions = new MaterialSelectOptions({
	 data: this.subscriptionStatusService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حاله الاشتراك',
	});

	this.beneficiaryCodeSelectOptions = new MaterialSelectOptions({
	 data: this.relationshipTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المستفيد',
	});

	this.administrationCodeSelectOptions = new MaterialSelectOptions({
	 data: this.departmentsSectionsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الاداره',
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


    this.terminationOfTheParticipationOfAnEmployeeInTheFundGForm = this.formBuilder.group({
      
  id : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundG.id],
  subscriptionAmounts : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundG.subscriptionAmounts, [ Validators.required ]],
  subscriptionFeeInsteadSalary : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundG.subscriptionFeeInsteadSalary, [ ]],
  deductedAmountsWithFeature : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundG.deductedAmountsWithFeature, [ ]],
  bankStatement : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundG.bankStatement, [ ]],
  endDate : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundG.endDate, [ Validators.required ]],
  checkAmount : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundG.checkAmount, [ ]],
  beneficiaryName : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundG.beneficiaryName, [ Validators.required ]],
  employeeCode : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundG.employeeCode, [ Validators.required ]],
  checkNumber : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundG.checkNumber, [ Validators.required ]],
  membershipCode : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundG.membershipCode, [ Validators.required ]],
  employeeDeservedAmount : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundG.employeeDeservedAmount, [ Validators.required ]],
  checkDate : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundG.checkDate, [ ]],
  deductionReason : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundG.deductionReason, [ ]],
  terminationType : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundG.terminationType, [ Validators.required ]],
  subscriptionStatus : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundG.subscriptionStatus, [ ]],
  beneficiaryCode : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundG.beneficiaryCode, [ Validators.required ]],
  administrationCode : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundG.administrationCode, [ ]],
  bankCode : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundG.bankCode, [ Validators.required ]],
  employeeStatus : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundG.employeeStatus, [ ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.terminationOfTheParticipationOfAnEmployeeInTheFundGService.update(this.terminationOfTheParticipationOfAnEmployeeInTheFundGForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.terminationOfTheParticipationOfAnEmployeeInTheFundGService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.terminationOfTheParticipationOfAnEmployeeInTheFundGForm.get(name);
  }

  initializeLookupServices() {
    this.terminationTypesService = new LookupService('terminationtypes', this.http);
this.subscriptionStatusService = new LookupService('subscriptionstatuses', this.http);
this.relationshipTypesService = new LookupService('relationshiptypes', this.http);
this.departmentsSectionsService = new LookupService('departmentssections', this.http);
this.bankCodesService = new LookupService('bankcodes', this.http);
this.employeeStatusesService = new LookupService('employeestatuses', this.http);
  }
}
