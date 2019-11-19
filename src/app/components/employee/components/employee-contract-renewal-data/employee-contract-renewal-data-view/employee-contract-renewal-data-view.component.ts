
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { EmployeeContractRenewalData } from 'app/shared/models/employee-contract-renewal-data';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { EmployeeContractRenewalDataService } from '../shared/employee-contract-renewal-data.service';

@Component({
  selector: 'app-employee-contract-renewal-data-view',
  templateUrl: './employee-contract-renewal-data-view.component.html',
  styleUrls: ['./employee-contract-renewal-data-view.component.scss'],
  providers: []
})

export class EmployeeContractRenewalDataViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedEmployeeContractRenewalData: EmployeeContractRenewalData;
  employeeContractRenewalDataForm: FormGroup;

  private centralDepartmentsService: LookupService;
private subDepartmentsService: LookupService;
private jobTypesService: LookupService;
private financialDegreesService: LookupService;
private renewalTypesService: LookupService;

  
centralAdministrationSelectOptions: MaterialSelectOptions;
subAdministrationSelectOptions: MaterialSelectOptions;
jobTitleSelectOptions: MaterialSelectOptions;
financialDegreeSelectOptions: MaterialSelectOptions;
renewalTypeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedEmployeeContractRenewalDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<EmployeeContractRenewalDataViewComponent>,
    public employeeContractRenewalDataService: EmployeeContractRenewalDataService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedEmployeeContractRenewalData = this.selectedEmployeeContractRenewalDataDialog.data || this.selectedEmployeeContractRenewalData;

    
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

	this.financialDegreeSelectOptions = new MaterialSelectOptions({
	 data: this.financialDegreesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الدرجه الماليه',
	});

	this.renewalTypeSelectOptions = new MaterialSelectOptions({
	 data: this.renewalTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع التجديد',
	});


    this.employeeContractRenewalDataForm = this.formBuilder.group({
      
  employeeCode : [this.selectedEmployeeContractRenewalData.employeeCode],
  receiptDate : [this.selectedEmployeeContractRenewalData.receiptDate],
  startRenewalDate : [this.selectedEmployeeContractRenewalData.startRenewalDate],
  renewalPeriod : [this.selectedEmployeeContractRenewalData.renewalPeriod],
  prePeriodNumber : [this.selectedEmployeeContractRenewalData.prePeriodNumber],
  prePeriodStartingDate : [this.selectedEmployeeContractRenewalData.prePeriodStartingDate],
  prePeriodEndDate : [this.selectedEmployeeContractRenewalData.prePeriodEndDate],
  durationPeriod : [this.selectedEmployeeContractRenewalData.durationPeriod],
  newPeriodNumber : [this.selectedEmployeeContractRenewalData.newPeriodNumber],
  periodEndDate : [this.selectedEmployeeContractRenewalData.periodEndDate],
  contractAmount : [this.selectedEmployeeContractRenewalData.contractAmount],
  centralAdministration : [this.selectedEmployeeContractRenewalData.centralAdministration],
  subAdministration : [this.selectedEmployeeContractRenewalData.subAdministration],
  jobTitle : [this.selectedEmployeeContractRenewalData.jobTitle],
  financialDegree : [this.selectedEmployeeContractRenewalData.financialDegree],
  renewalType : [this.selectedEmployeeContractRenewalData.renewalType]
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
    return this.employeeContractRenewalDataForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.employeeContractRenewalDataForm.controls)) {
      this.employeeContractRenewalDataForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.centralDepartmentsService = new LookupService('centraldepartments', this.http);
this.subDepartmentsService = new LookupService('subdepartments', this.http);
this.jobTypesService = new LookupService('jobtypes', this.http);
this.financialDegreesService = new LookupService('financialdegrees', this.http);
this.renewalTypesService = new LookupService('renewaltypes', this.http);
  }
}

