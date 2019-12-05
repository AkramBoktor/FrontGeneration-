
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { DeductionOfAnAmountToAnEmployeeOfTheFundB } from 'app/shared/models/deduction-of-an-amount-to-an-employee-of-the-fund-b';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { DeductionOfAnAmountToAnEmployeeOfTheFundBService } from '../shared/deduction-of-an-amount-to-an-employee-of-the-fund-b.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-deduction-of-an-amount-to-an-employee-of-the-fund-b-view',
  templateUrl: './deduction-of-an-amount-to-an-employee-of-the-fund-b-view.component.html',
  styleUrls: ['./deduction-of-an-amount-to-an-employee-of-the-fund-b-view.component.scss'],
  providers: []
})

export class DeductionOfAnAmountToAnEmployeeOfTheFundBViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedDeductionOfAnAmountToAnEmployeeOfTheFundB: DeductionOfAnAmountToAnEmployeeOfTheFundB;
  deductionOfAnAmountToAnEmployeeOfTheFundBForm: FormGroup;

  private employeeStatusesService: LookupService;
private relationshipTypesService: LookupService;
private subscriptionStatusService: LookupService;
private departmentsSectionsService: LookupService;
private boxCodesService: LookupService;
private bankCodesService: LookupService;

  
employeeStatusSelectOptions: MaterialSelectOptions;
beneficiaryCodeSelectOptions: MaterialSelectOptions;
subscriptionStatusSelectOptions: MaterialSelectOptions;
administrationCodeSelectOptions: MaterialSelectOptions;
boxCodeSelectOptions: MaterialSelectOptions;
bankCodeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedDeductionOfAnAmountToAnEmployeeOfTheFundBDialog: any,
    @Optional() public dialogRef: MatDialogRef<DeductionOfAnAmountToAnEmployeeOfTheFundBViewComponent>,
    public deductionOfAnAmountToAnEmployeeOfTheFundBService: DeductionOfAnAmountToAnEmployeeOfTheFundBService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundB = this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundBDialog.data || this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundB;

    
	this.employeeStatusSelectOptions = new MaterialSelectOptions({
	 data: this.employeeStatusesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حاله الموظف',
	});

	this.beneficiaryCodeSelectOptions = new MaterialSelectOptions({
	 data: this.relationshipTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المستفيد',
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

	this.boxCodeSelectOptions = new MaterialSelectOptions({
	 data: this.boxCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الصندوق',
	});

	this.bankCodeSelectOptions = new MaterialSelectOptions({
	 data: this.bankCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود البنك',
	});


    this.deductionOfAnAmountToAnEmployeeOfTheFundBForm = this.formBuilder.group({
      
  amountDeductingReason : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundB.amountDeductingReason],
  subscriptionAmounts : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundB.subscriptionAmounts],
  basicSalary : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundB.basicSalary],
  membershipCode : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundB.membershipCode],
  employeeCode : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundB.employeeCode],
  beneficiaryName : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundB.beneficiaryName],
  checkAmount : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundB.checkAmount],
  bankStatement : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundB.bankStatement],
  checkDate : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundB.checkDate],
  checkNumber : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundB.checkNumber],
  employeeStatus : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundB.employeeStatus],
  beneficiaryCode : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundB.beneficiaryCode],
  subscriptionStatus : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundB.subscriptionStatus],
  administrationCode : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundB.administrationCode],
  boxCode : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundB.boxCode],
  bankCode : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundB.bankCode]
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
    return this.deductionOfAnAmountToAnEmployeeOfTheFundBForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.deductionOfAnAmountToAnEmployeeOfTheFundBForm.controls)) {
      this.deductionOfAnAmountToAnEmployeeOfTheFundBForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.employeeStatusesService = new LookupService('employeestatuses', this.http);
this.relationshipTypesService = new LookupService('relationshiptypes', this.http);
this.subscriptionStatusService = new LookupService('subscriptionstatuses', this.http);
this.departmentsSectionsService = new LookupService('departmentssections', this.http);
this.boxCodesService = new LookupService('boxcodes', this.http);
this.bankCodesService = new LookupService('bankcodes', this.http);
  }
}

