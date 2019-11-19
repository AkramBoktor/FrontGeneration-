
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { EmployeePreviousInsuranceData } from 'app/shared/models/employee-previous-insurance-data';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { EmployeePreviousInsuranceDataService } from '../shared/employee-previous-insurance-data.service';

@Component({
  selector: 'app-employee-previous-insurance-data-view',
  templateUrl: './employee-previous-insurance-data-view.component.html',
  styleUrls: ['./employee-previous-insurance-data-view.component.scss'],
  providers: []
})

export class EmployeePreviousInsuranceDataViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedEmployeePreviousInsuranceData: EmployeePreviousInsuranceData;
  employeePreviousInsuranceDataForm: FormGroup;

  private sectorCodesService: LookupService;

  
sectorSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedEmployeePreviousInsuranceDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<EmployeePreviousInsuranceDataViewComponent>,
    public employeePreviousInsuranceDataService: EmployeePreviousInsuranceDataService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedEmployeePreviousInsuranceData = this.selectedEmployeePreviousInsuranceDataDialog.data || this.selectedEmployeePreviousInsuranceData;

    
	this.sectorSelectOptions = new MaterialSelectOptions({
	 data: this.sectorCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'القطاع',
	});


    this.employeePreviousInsuranceDataForm = this.formBuilder.group({
      
  employeeCode : [this.selectedEmployeePreviousInsuranceData.employeeCode],
  organization : [this.selectedEmployeePreviousInsuranceData.organization],
  fromDate : [this.selectedEmployeePreviousInsuranceData.fromDate],
  toDate : [this.selectedEmployeePreviousInsuranceData.toDate],
  sector : [this.selectedEmployeePreviousInsuranceData.sector]
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
          
	{
	 errorName: 'minLength',
	 errorMessage: 'لا يوجد مسلسل يساوي صفر'
	}
        ];
    return ValidatorFunctions.getErrorMessage(formCtrl, errorMessages);
   }

  getControls(name: string) {
    return this.employeePreviousInsuranceDataForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.employeePreviousInsuranceDataForm.controls)) {
      this.employeePreviousInsuranceDataForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.sectorCodesService = new LookupService('sectorcodes', this.http);
  }
}

