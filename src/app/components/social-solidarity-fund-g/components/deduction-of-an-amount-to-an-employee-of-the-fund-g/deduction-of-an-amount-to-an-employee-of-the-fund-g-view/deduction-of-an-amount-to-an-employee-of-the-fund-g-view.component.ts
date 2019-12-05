
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { DeductionOfAnAmountToAnEmployeeOfTheFundG } from 'app/shared/models/deduction-of-an-amount-to-an-employee-of-the-fund-g';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { DeductionOfAnAmountToAnEmployeeOfTheFundGService } from '../shared/deduction-of-an-amount-to-an-employee-of-the-fund-g.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-deduction-of-an-amount-to-an-employee-of-the-fund-g-view',
  templateUrl: './deduction-of-an-amount-to-an-employee-of-the-fund-g-view.component.html',
  styleUrls: ['./deduction-of-an-amount-to-an-employee-of-the-fund-g-view.component.scss'],
  providers: []
})

export class DeductionOfAnAmountToAnEmployeeOfTheFundGViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedDeductionOfAnAmountToAnEmployeeOfTheFundG: DeductionOfAnAmountToAnEmployeeOfTheFundG;
  deductionOfAnAmountToAnEmployeeOfTheFundGForm: FormGroup;

  private bankCodesService: LookupService;
private boxCodesService: LookupService;
private departmentsSectionsService: LookupService;
private subscriptionStatusService: LookupService;
private relationshipTypesService: LookupService;
private employeeStatusesService: LookupService;

  
bankCodeSelectOptions: MaterialSelectOptions;
boxCodeSelectOptions: MaterialSelectOptions;
administrationCodeSelectOptions: MaterialSelectOptions;
subscriptionStatusSelectOptions: MaterialSelectOptions;
beneficiaryCodeSelectOptions: MaterialSelectOptions;
employeeStatusSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedDeductionOfAnAmountToAnEmployeeOfTheFundGDialog: any,
    @Optional() public dialogRef: MatDialogRef<DeductionOfAnAmountToAnEmployeeOfTheFundGViewComponent>,
    public deductionOfAnAmountToAnEmployeeOfTheFundGService: DeductionOfAnAmountToAnEmployeeOfTheFundGService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundG = this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundGDialog.data || this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundG;

    
	this.bankCodeSelectOptions = new MaterialSelectOptions({
	 data: this.bankCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود البنك',
	});

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

	this.employeeStatusSelectOptions = new MaterialSelectOptions({
	 data: this.employeeStatusesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حاله الموظف',
	});


    this.deductionOfAnAmountToAnEmployeeOfTheFundGForm = this.formBuilder.group({
      
  checkNumber : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundG.checkNumber],
  checkDate : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundG.checkDate],
  bankStatement : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundG.bankStatement],
  checkAmount : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundG.checkAmount],
  beneficiaryName : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundG.beneficiaryName],
  employeeCode : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundG.employeeCode],
  membershipCode : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundG.membershipCode],
  basicSalary : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundG.basicSalary],
  subscriptionAmounts : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundG.subscriptionAmounts],
  amountDeductingReason : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundG.amountDeductingReason],
  bankCode : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundG.bankCode],
  boxCode : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundG.boxCode],
  administrationCode : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundG.administrationCode],
  subscriptionStatus : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundG.subscriptionStatus],
  beneficiaryCode : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundG.beneficiaryCode],
  employeeStatus : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundG.employeeStatus]
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
    return this.deductionOfAnAmountToAnEmployeeOfTheFundGForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.deductionOfAnAmountToAnEmployeeOfTheFundGForm.controls)) {
      this.deductionOfAnAmountToAnEmployeeOfTheFundGForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.bankCodesService = new LookupService('bankcodes', this.http);
this.boxCodesService = new LookupService('boxcodes', this.http);
this.departmentsSectionsService = new LookupService('departmentssections', this.http);
this.subscriptionStatusService = new LookupService('subscriptionstatuses', this.http);
this.relationshipTypesService = new LookupService('relationshiptypes', this.http);
this.employeeStatusesService = new LookupService('employeestatuses', this.http);
  }
}

