
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { DeductionOfAmountToAnEmployeeOfTheFund } from 'app/shared/models/deduction-of-amount-to-an-employee-of-the-fund';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { DeductionOfAmountToAnEmployeeOfTheFundService } from '../shared/deduction-of-amount-to-an-employee-of-the-fund.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-deduction-of-amount-to-an-employee-of-the-fund-view',
  templateUrl: './deduction-of-amount-to-an-employee-of-the-fund-view.component.html',
  styleUrls: ['./deduction-of-amount-to-an-employee-of-the-fund-view.component.scss'],
  providers: []
})

export class DeductionOfAmountToAnEmployeeOfTheFundViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedDeductionOfAmountToAnEmployeeOfTheFund: DeductionOfAmountToAnEmployeeOfTheFund;
  deductionOfAmountToAnEmployeeOfTheFundForm: FormGroup;

  private boxCodesService: LookupService;
private departmentsSectionsService: LookupService;
private employeeStatusesService: LookupService;
private bankCodesService: LookupService;

  
boxCodeSelectOptions: MaterialSelectOptions;
administrationCodeSelectOptions: MaterialSelectOptions;
employeeStatusSelectOptions: MaterialSelectOptions;
bankCodeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedDeductionOfAmountToAnEmployeeOfTheFundDialog: any,
    @Optional() public dialogRef: MatDialogRef<DeductionOfAmountToAnEmployeeOfTheFundViewComponent>,
    public deductionOfAmountToAnEmployeeOfTheFundService: DeductionOfAmountToAnEmployeeOfTheFundService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDeductionOfAmountToAnEmployeeOfTheFund = this.selectedDeductionOfAmountToAnEmployeeOfTheFundDialog.data || this.selectedDeductionOfAmountToAnEmployeeOfTheFund;

    
	this.boxCodeSelectOptions = new MaterialSelectOptions({
	 data: this.boxCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الصندوق',
	});

	this.administrationCodeSelectOptions = new MaterialSelectOptions({
	 data: this.departmentsSectionsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الادارة',
	});

	this.employeeStatusSelectOptions = new MaterialSelectOptions({
	 data: this.employeeStatusesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حاله الموظف',
	});

	this.bankCodeSelectOptions = new MaterialSelectOptions({
	 data: this.bankCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود البنك  ',
	});


    this.deductionOfAmountToAnEmployeeOfTheFundForm = this.formBuilder.group({
      
  employeeCode : [this.selectedDeductionOfAmountToAnEmployeeOfTheFund.employeeCode],
  subscriptionStatus : [this.selectedDeductionOfAmountToAnEmployeeOfTheFund.subscriptionStatus],
  membershipCode : [this.selectedDeductionOfAmountToAnEmployeeOfTheFund.membershipCode],
  basicSalary : [this.selectedDeductionOfAmountToAnEmployeeOfTheFund.basicSalary],
  subscriptionAmounts : [this.selectedDeductionOfAmountToAnEmployeeOfTheFund.subscriptionAmounts],
  deductingAmountReason : [this.selectedDeductionOfAmountToAnEmployeeOfTheFund.deductingAmountReason],
  beneficiaryCode : [this.selectedDeductionOfAmountToAnEmployeeOfTheFund.beneficiaryCode],
  beneficiaryName : [this.selectedDeductionOfAmountToAnEmployeeOfTheFund.beneficiaryName],
  checkAmount : [this.selectedDeductionOfAmountToAnEmployeeOfTheFund.checkAmount],
  bankStatement : [this.selectedDeductionOfAmountToAnEmployeeOfTheFund.bankStatement],
  checkNumber : [this.selectedDeductionOfAmountToAnEmployeeOfTheFund.checkNumber],
  checkDate : [this.selectedDeductionOfAmountToAnEmployeeOfTheFund.checkDate],
  boxCode : [this.selectedDeductionOfAmountToAnEmployeeOfTheFund.boxCode],
  administrationCode : [this.selectedDeductionOfAmountToAnEmployeeOfTheFund.administrationCode],
  employeeStatus : [this.selectedDeductionOfAmountToAnEmployeeOfTheFund.employeeStatus],
  bankCode : [this.selectedDeductionOfAmountToAnEmployeeOfTheFund.bankCode]
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
    return this.deductionOfAmountToAnEmployeeOfTheFundForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.deductionOfAmountToAnEmployeeOfTheFundForm.controls)) {
      this.deductionOfAmountToAnEmployeeOfTheFundForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.boxCodesService = new LookupService('boxcodes', this.http);
this.departmentsSectionsService = new LookupService('departmentssections', this.http);
this.employeeStatusesService = new LookupService('employeestatuses', this.http);
this.bankCodesService = new LookupService('bankcodes', this.http);
  }
}

