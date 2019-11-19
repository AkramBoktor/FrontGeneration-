
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MonthlyCompletionOfConsultantContractPeriod } from 'app/shared/models/monthly-completion-of-consultant-contract-period';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { MonthlyCompletionOfConsultantContractPeriodService } from '../shared/monthly-completion-of-consultant-contract-period.service';

@Component({
  selector: 'app-monthly-completion-of-consultant-contract-period-view',
  templateUrl: './monthly-completion-of-consultant-contract-period-view.component.html',
  styleUrls: ['./monthly-completion-of-consultant-contract-period-view.component.scss'],
  providers: []
})

export class MonthlyCompletionOfConsultantContractPeriodViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedMonthlyCompletionOfConsultantContractPeriod: MonthlyCompletionOfConsultantContractPeriod;
  monthlyCompletionOfConsultantContractPeriodForm: FormGroup;

  private centralDepartmentsService: LookupService;
private subDepartmentsService: LookupService;
private jobTypesService: LookupService;

  
centralAdministrationSelectOptions: MaterialSelectOptions;
subAdministrationSelectOptions: MaterialSelectOptions;
jobTitleSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedMonthlyCompletionOfConsultantContractPeriodDialog: any,
    @Optional() public dialogRef: MatDialogRef<MonthlyCompletionOfConsultantContractPeriodViewComponent>,
    public monthlyCompletionOfConsultantContractPeriodService: MonthlyCompletionOfConsultantContractPeriodService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedMonthlyCompletionOfConsultantContractPeriod = this.selectedMonthlyCompletionOfConsultantContractPeriodDialog.data || this.selectedMonthlyCompletionOfConsultantContractPeriod;

    
	this.centralAdministrationSelectOptions = new MaterialSelectOptions({
	 data: this.centralDepartmentsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الاداره المركزيه',
	});

	this.subAdministrationSelectOptions = new MaterialSelectOptions({
	 data: this.subDepartmentsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الاداره الفرعيه',
	});

	this.jobTitleSelectOptions = new MaterialSelectOptions({
	 data: this.jobTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الوظيفه',
	});


    this.monthlyCompletionOfConsultantContractPeriodForm = this.formBuilder.group({
      
  employeeCode : [this.selectedMonthlyCompletionOfConsultantContractPeriod.employeeCode],
  attendeesNumber : [this.selectedMonthlyCompletionOfConsultantContractPeriod.attendeesNumber],
  periodNumber : [this.selectedMonthlyCompletionOfConsultantContractPeriod.periodNumber],
  startDate : [this.selectedMonthlyCompletionOfConsultantContractPeriod.startDate],
  contractAmount : [this.selectedMonthlyCompletionOfConsultantContractPeriod.contractAmount],
  endDate : [this.selectedMonthlyCompletionOfConsultantContractPeriod.endDate],
  period : [this.selectedMonthlyCompletionOfConsultantContractPeriod.period],
  centralAdministration : [this.selectedMonthlyCompletionOfConsultantContractPeriod.centralAdministration],
  subAdministration : [this.selectedMonthlyCompletionOfConsultantContractPeriod.subAdministration],
  jobTitle : [this.selectedMonthlyCompletionOfConsultantContractPeriod.jobTitle]
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
    return this.monthlyCompletionOfConsultantContractPeriodForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.monthlyCompletionOfConsultantContractPeriodForm.controls)) {
      this.monthlyCompletionOfConsultantContractPeriodForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.centralDepartmentsService = new LookupService('centraldepartments', this.http);
this.subDepartmentsService = new LookupService('subdepartments', this.http);
this.jobTypesService = new LookupService('jobtypes', this.http);
  }
}

