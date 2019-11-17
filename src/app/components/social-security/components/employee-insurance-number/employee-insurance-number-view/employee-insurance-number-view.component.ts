
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { EmployeeInsuranceNumber } from 'app/shared/models/employee-insurance-number';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { EmployeeInsuranceNumberService } from '../shared/employee-insurance-number.service';

@Component({
  selector: 'app-employee-insurance-number-view',
  templateUrl: './employee-insurance-number-view.component.html',
  styleUrls: ['./employee-insurance-number-view.component.scss'],
  providers: []
})

export class EmployeeInsuranceNumberViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedEmployeeInsuranceNumber: EmployeeInsuranceNumber;
  employeeInsuranceNumberForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedEmployeeInsuranceNumberDialog: any,
    @Optional() public dialogRef: MatDialogRef<EmployeeInsuranceNumberViewComponent>,
    public employeeInsuranceNumberService: EmployeeInsuranceNumberService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedEmployeeInsuranceNumber = this.selectedEmployeeInsuranceNumberDialog.data || this.selectedEmployeeInsuranceNumber;

    

    this.employeeInsuranceNumberForm = this.formBuilder.group({
      
  employeeCode : [this.selectedEmployeeInsuranceNumber.employeeCode],
  insuranceNumber : [this.selectedEmployeeInsuranceNumber.insuranceNumber]
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
	},
	{
	 errorName: 'max',
	 errorMessage: 'لا يمكن ان يزيد عن 10'
	},
	{
	 errorName: 'min',
	 errorMessage: 'لا يوجد مسلسل يساوي صفر'
	}
        ];
    return ValidatorFunctions.getErrorMessage(formCtrl, errorMessages);
   }

  getControls(name: string) {
    return this.employeeInsuranceNumberForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.employeeInsuranceNumberForm.controls)) {
      this.employeeInsuranceNumberForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

