
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { EmployeeBenefitsAfterCashingACheck } from 'app/shared/models/employee-benefits-after-cashing-a-check';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { EmployeeBenefitsAfterCashingACheckService } from '../shared/employee-benefits-after-cashing-a-check.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-employee-benefits-after-cashing-a-check-view',
  templateUrl: './employee-benefits-after-cashing-a-check-view.component.html',
  styleUrls: ['./employee-benefits-after-cashing-a-check-view.component.scss'],
  providers: []
})

export class EmployeeBenefitsAfterCashingACheckViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedEmployeeBenefitsAfterCashingACheck: EmployeeBenefitsAfterCashingACheck;
  employeeBenefitsAfterCashingACheckForm: FormGroup;

  private subsidyTypesService: LookupService;

  
subsidyTypeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedEmployeeBenefitsAfterCashingACheckDialog: any,
    @Optional() public dialogRef: MatDialogRef<EmployeeBenefitsAfterCashingACheckViewComponent>,
    public employeeBenefitsAfterCashingACheckService: EmployeeBenefitsAfterCashingACheckService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedEmployeeBenefitsAfterCashingACheck = this.selectedEmployeeBenefitsAfterCashingACheckDialog.data || this.selectedEmployeeBenefitsAfterCashingACheck;

    
	this.subsidyTypeSelectOptions = new MaterialSelectOptions({
	 data: this.subsidyTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' نوع الاعانة',
	});


    this.employeeBenefitsAfterCashingACheckForm = this.formBuilder.group({
      
  checkNumber : [this.selectedEmployeeBenefitsAfterCashingACheck.checkNumber],
  checkDate : [this.selectedEmployeeBenefitsAfterCashingACheck.checkDate],
  checkAmount : [this.selectedEmployeeBenefitsAfterCashingACheck.checkAmount],
  employeeCode : [this.selectedEmployeeBenefitsAfterCashingACheck.employeeCode],
  subsidyAmount : [this.selectedEmployeeBenefitsAfterCashingACheck.subsidyAmount],
  exchangeDate : [this.selectedEmployeeBenefitsAfterCashingACheck.exchangeDate],
  subsidyType : [this.selectedEmployeeBenefitsAfterCashingACheck.subsidyType]
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
    return this.employeeBenefitsAfterCashingACheckForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.employeeBenefitsAfterCashingACheckForm.controls)) {
      this.employeeBenefitsAfterCashingACheckForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.subsidyTypesService = new LookupService('subsidytypes', this.http);
  }
}

