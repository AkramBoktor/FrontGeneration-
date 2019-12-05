
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { TerminationOfTheParticipationOfAnEmployeeInTheFundB } from 'app/shared/models/termination-of-the-participation-of-an-employee-in-the-fund-b';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { TerminationOfTheParticipationOfAnEmployeeInTheFundBService } from '../shared/termination-of-the-participation-of-an-employee-in-the-fund-b.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-termination-of-the-participation-of-an-employee-in-the-fund-b-view',
  templateUrl: './termination-of-the-participation-of-an-employee-in-the-fund-b-view.component.html',
  styleUrls: ['./termination-of-the-participation-of-an-employee-in-the-fund-b-view.component.scss'],
  providers: []
})

export class TerminationOfTheParticipationOfAnEmployeeInTheFundBViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedTerminationOfTheParticipationOfAnEmployeeInTheFundB: TerminationOfTheParticipationOfAnEmployeeInTheFundB;
  terminationOfTheParticipationOfAnEmployeeInTheFundBForm: FormGroup;

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

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedTerminationOfTheParticipationOfAnEmployeeInTheFundBDialog: any,
    @Optional() public dialogRef: MatDialogRef<TerminationOfTheParticipationOfAnEmployeeInTheFundBViewComponent>,
    public terminationOfTheParticipationOfAnEmployeeInTheFundBService: TerminationOfTheParticipationOfAnEmployeeInTheFundBService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundB = this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundBDialog.data || this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundB;

    
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
      
  employeeCode : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundB.employeeCode],
  checkDate : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundB.checkDate],
  checkNumber : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundB.checkNumber],
  bankStatement : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundB.bankStatement],
  membershipCode : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundB.membershipCode],
  checkAmount : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundB.checkAmount],
  deductedAmountsWithFeature : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundB.deductedAmountsWithFeature],
  employeeDeservedAmount : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundB.employeeDeservedAmount],
  subscriptionAmounts : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundB.subscriptionAmounts],
  subscriptionFeeInsteadSalary : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundB.subscriptionFeeInsteadSalary],
  beneficiaryName : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundB.beneficiaryName],
  endDate : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundB.endDate],
  employeeStatus : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundB.employeeStatus],
  bankCode : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundB.bankCode],
  beneficiaryCode : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundB.beneficiaryCode],
  deductionReason : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundB.deductionReason],
  terminationType : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundB.terminationType],
  administrationCode : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundB.administrationCode],
  subscriptionStatus : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundB.subscriptionStatus]
      });

    this.disableControls();
  }

  onConfirm() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  getErrorMessage = (formCtrl: AbstractControl) => {
    const errorMessages: FormControlError[] = [
          
        ];
    return ValidatorFunctions.getErrorMessage(formCtrl, errorMessages);
   }

  getControls(name: string) {
    return this.terminationOfTheParticipationOfAnEmployeeInTheFundBForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.terminationOfTheParticipationOfAnEmployeeInTheFundBForm.controls)) {
      this.terminationOfTheParticipationOfAnEmployeeInTheFundBForm.controls[control].disable();
    }
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

