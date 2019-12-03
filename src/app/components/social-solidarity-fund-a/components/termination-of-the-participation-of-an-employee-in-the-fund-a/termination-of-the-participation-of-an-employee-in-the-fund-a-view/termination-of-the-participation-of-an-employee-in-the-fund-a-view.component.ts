
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { TerminationOfTheParticipationOfAnEmployeeInTheFundA } from 'app/shared/models/termination-of-the-participation-of-an-employee-in-the-fund-a';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { TerminationOfTheParticipationOfAnEmployeeInTheFundAService } from '../shared/termination-of-the-participation-of-an-employee-in-the-fund-a.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-termination-of-the-participation-of-an-employee-in-the-fund-a-view',
  templateUrl: './termination-of-the-participation-of-an-employee-in-the-fund-a-view.component.html',
  styleUrls: ['./termination-of-the-participation-of-an-employee-in-the-fund-a-view.component.scss'],
  providers: []
})

export class TerminationOfTheParticipationOfAnEmployeeInTheFundAViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedTerminationOfTheParticipationOfAnEmployeeInTheFundA: TerminationOfTheParticipationOfAnEmployeeInTheFundA;
  terminationOfTheParticipationOfAnEmployeeInTheFundAForm: FormGroup;

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

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedTerminationOfTheParticipationOfAnEmployeeInTheFundADialog: any,
    @Optional() public dialogRef: MatDialogRef<TerminationOfTheParticipationOfAnEmployeeInTheFundAViewComponent>,
    public terminationOfTheParticipationOfAnEmployeeInTheFundAService: TerminationOfTheParticipationOfAnEmployeeInTheFundAService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundA = this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundADialog.data || this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundA;

    
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
      
  employeeCode : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundA.employeeCode],
  membershipCode : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundA.membershipCode],
  subscriptionFeeInsteadSalary : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundA.subscriptionFeeInsteadSalary],
  subscriptionAmounts : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundA.subscriptionAmounts],
  employeeDeservedAmount : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundA.employeeDeservedAmount],
  deductedAmountsWithFeature : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundA.deductedAmountsWithFeature],
  endDate : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundA.endDate],
  beneficiaryName : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundA.beneficiaryName],
  checkAmount : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundA.checkAmount],
  bankStatement : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundA.bankStatement],
  checkNumber : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundA.checkNumber],
  checkDate : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundA.checkDate],
  employeeStatus : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundA.employeeStatus],
  subscriptionStatus : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundA.subscriptionStatus],
  administrationCode : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundA.administrationCode],
  terminationType : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundA.terminationType],
  deductionReason : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundA.deductionReason],
  beneficiaryCode : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundA.beneficiaryCode],
  bankCode : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundA.bankCode]
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
    return this.terminationOfTheParticipationOfAnEmployeeInTheFundAForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.terminationOfTheParticipationOfAnEmployeeInTheFundAForm.controls)) {
      this.terminationOfTheParticipationOfAnEmployeeInTheFundAForm.controls[control].disable();
    }
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

