
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { TerminationOfTheParticipationOfAnEmployeeInTheFundG } from 'app/shared/models/termination-of-the-participation-of-an-employee-in-the-fund-g';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { TerminationOfTheParticipationOfAnEmployeeInTheFundGService } from '../shared/termination-of-the-participation-of-an-employee-in-the-fund-g.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-termination-of-the-participation-of-an-employee-in-the-fund-g-view',
  templateUrl: './termination-of-the-participation-of-an-employee-in-the-fund-g-view.component.html',
  styleUrls: ['./termination-of-the-participation-of-an-employee-in-the-fund-g-view.component.scss'],
  providers: []
})

export class TerminationOfTheParticipationOfAnEmployeeInTheFundGViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedTerminationOfTheParticipationOfAnEmployeeInTheFundG: TerminationOfTheParticipationOfAnEmployeeInTheFundG;
  terminationOfTheParticipationOfAnEmployeeInTheFundGForm: FormGroup;

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

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedTerminationOfTheParticipationOfAnEmployeeInTheFundGDialog: any,
    @Optional() public dialogRef: MatDialogRef<TerminationOfTheParticipationOfAnEmployeeInTheFundGViewComponent>,
    public terminationOfTheParticipationOfAnEmployeeInTheFundGService: TerminationOfTheParticipationOfAnEmployeeInTheFundGService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundG = this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundGDialog.data || this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundG;

    
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
      
  checkAmount : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundG.checkAmount],
  membershipCode : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundG.membershipCode],
  bankStatement : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundG.bankStatement],
  checkNumber : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundG.checkNumber],
  employeeCode : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundG.employeeCode],
  checkDate : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundG.checkDate],
  deductedAmountsWithFeature : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundG.deductedAmountsWithFeature],
  endDate : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundG.endDate],
  subscriptionFeeInsteadSalary : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundG.subscriptionFeeInsteadSalary],
  subscriptionAmounts : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundG.subscriptionAmounts],
  employeeDeservedAmount : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundG.employeeDeservedAmount],
  beneficiaryName : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundG.beneficiaryName],
  terminationType : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundG.terminationType],
  deductionReason : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundG.deductionReason],
  beneficiaryCode : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundG.beneficiaryCode],
  bankCode : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundG.bankCode],
  employeeStatus : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundG.employeeStatus],
  subscriptionStatus : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundG.subscriptionStatus],
  administrationCode : [this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundG.administrationCode]
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
    return this.terminationOfTheParticipationOfAnEmployeeInTheFundGForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.terminationOfTheParticipationOfAnEmployeeInTheFundGForm.controls)) {
      this.terminationOfTheParticipationOfAnEmployeeInTheFundGForm.controls[control].disable();
    }
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

