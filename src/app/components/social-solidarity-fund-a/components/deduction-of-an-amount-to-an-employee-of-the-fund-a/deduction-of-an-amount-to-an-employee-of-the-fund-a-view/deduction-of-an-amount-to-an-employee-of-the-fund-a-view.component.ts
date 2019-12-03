
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { DeductionOfAnAmountToAnEmployeeOfTheFundA } from 'app/shared/models/deduction-of-an-amount-to-an-employee-of-the-fund-a';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { DeductionOfAnAmountToAnEmployeeOfTheFundAService } from '../shared/deduction-of-an-amount-to-an-employee-of-the-fund-a.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-deduction-of-an-amount-to-an-employee-of-the-fund-a-view',
  templateUrl: './deduction-of-an-amount-to-an-employee-of-the-fund-a-view.component.html',
  styleUrls: ['./deduction-of-an-amount-to-an-employee-of-the-fund-a-view.component.scss'],
  providers: []
})

export class DeductionOfAnAmountToAnEmployeeOfTheFundAViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedDeductionOfAnAmountToAnEmployeeOfTheFundA: DeductionOfAnAmountToAnEmployeeOfTheFundA;
  deductionOfAnAmountToAnEmployeeOfTheFundAForm: FormGroup;

  private boxCodesService: LookupService;
private departmentsSectionsService: LookupService;
private employeeStatusesService: LookupService;
private subscriptionStatusService: LookupService;
private relationshipTypesService: LookupService;
private bankCodesService: LookupService;

  
boxCodeSelectOptions: MaterialSelectOptions;
administrationCodeSelectOptions: MaterialSelectOptions;
employeeStatusSelectOptions: MaterialSelectOptions;
subscriptionStatusSelectOptions: MaterialSelectOptions;
beneficiaryCodeSelectOptions: MaterialSelectOptions;
bankCodeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedDeductionOfAnAmountToAnEmployeeOfTheFundADialog: any,
    @Optional() public dialogRef: MatDialogRef<DeductionOfAnAmountToAnEmployeeOfTheFundAViewComponent>,
    public deductionOfAnAmountToAnEmployeeOfTheFundAService: DeductionOfAnAmountToAnEmployeeOfTheFundAService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundA = this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundADialog.data || this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundA;

    
	this.boxCodeSelectOptions = new MaterialSelectOptions({
	 data: this.boxCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الصندوق',
	});

	this.administrationCodeSelectOptions = new MaterialSelectOptions({
	 data: this.departmentsSectionsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الاداره',
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


    this.deductionOfAnAmountToAnEmployeeOfTheFundAForm = this.formBuilder.group({
      
  employeeCode : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundA.employeeCode],
  membershipCode : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundA.membershipCode],
  basicSalary : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundA.basicSalary],
  subscriptionAmounts : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundA.subscriptionAmounts],
  amountDeductingReason : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundA.amountDeductingReason],
  beneficiaryName : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundA.beneficiaryName],
  checkAmount : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundA.checkAmount],
  bankStatement : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundA.bankStatement],
  checkNumber : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundA.checkNumber],
  checkDate : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundA.checkDate],
  boxCode : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundA.boxCode],
  administrationCode : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundA.administrationCode],
  employeeStatus : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundA.employeeStatus],
  subscriptionStatus : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundA.subscriptionStatus],
  beneficiaryCode : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundA.beneficiaryCode],
  bankCode : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundA.bankCode]
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
    return this.deductionOfAnAmountToAnEmployeeOfTheFundAForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.deductionOfAnAmountToAnEmployeeOfTheFundAForm.controls)) {
      this.deductionOfAnAmountToAnEmployeeOfTheFundAForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.boxCodesService = new LookupService('boxcodes', this.http);
this.departmentsSectionsService = new LookupService('departmentssections', this.http);
this.employeeStatusesService = new LookupService('employeestatuses', this.http);
this.subscriptionStatusService = new LookupService('subscriptionstatuses', this.http);
this.relationshipTypesService = new LookupService('relationshiptypes', this.http);
this.bankCodesService = new LookupService('bankcodes', this.http);
  }
}

