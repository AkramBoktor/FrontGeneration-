
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { DeductionOfAnAmountToAnEmployeeOfTheFundA } from 'app/shared/models/deduction-of-an-amount-to-an-employee-of-the-fund-a';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { DeductionOfAnAmountToAnEmployeeOfTheFundAService } from '../shared/deduction-of-an-amount-to-an-employee-of-the-fund-a.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-deduction-of-an-amount-to-an-employee-of-the-fund-a-edit',
  templateUrl: './deduction-of-an-amount-to-an-employee-of-the-fund-a-edit.component.html',
  styleUrls: ['./deduction-of-an-amount-to-an-employee-of-the-fund-a-edit.component.scss'],
  providers: []
})

export class DeductionOfAnAmountToAnEmployeeOfTheFundAEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedDeductionOfAnAmountToAnEmployeeOfTheFundA: DeductionOfAnAmountToAnEmployeeOfTheFundA;
  deductionOfAnAmountToAnEmployeeOfTheFundAForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private boxCodesService: LookupService;
private departmentsSectionsService: LookupService;
private employeeStatusesService: LookupService;
private subscriptionStatusService: LookupService;
private bankCodesService: LookupService;

  
boxCodeSelectOptions: MaterialSelectOptions;
administrationCodeSelectOptions: MaterialSelectOptions;
employeeStatusSelectOptions: MaterialSelectOptions;
subscriptionStatusSelectOptions: MaterialSelectOptions;
bankCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('boxCode', { static: true }) BoxCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('administrationCode', { static: true }) AdministrationCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('employeeStatus', { static: true }) EmployeeStatusSelectComponent: MaterialSelectComponent;
	@ViewChild('subscriptionStatus', { static: true }) SubscriptionStatusSelectComponent: MaterialSelectComponent;
	@ViewChild('bankCode', { static: true }) BankCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedDeductionOfAnAmountToAnEmployeeOfTheFundADialog: any,
    @Optional() public dialogRef: MatDialogRef<DeductionOfAnAmountToAnEmployeeOfTheFundAEditComponent>,
    public deductionOfAnAmountToAnEmployeeOfTheFundAService: DeductionOfAnAmountToAnEmployeeOfTheFundAService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundA = new DeductionOfAnAmountToAnEmployeeOfTheFundA();
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

	this.bankCodeSelectOptions = new MaterialSelectOptions({
	 data: this.bankCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود البنك',
	});


    this.deductionOfAnAmountToAnEmployeeOfTheFundAForm = this.formBuilder.group({
      
  id : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundA.id],
  employeeCode : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundA.employeeCode, [ Validators.required ]],
  membershipCode : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundA.membershipCode, [ ]],
  basicSalary : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundA.basicSalary, [ ]],
  subscriptionAmounts : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundA.subscriptionAmounts, [ ]],
  amountDeductingReason : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundA.amountDeductingReason, [ Validators.required ]],
  beneficiaryCode : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundA.beneficiaryCode, [ Validators.required ]],
  beneficiaryName : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundA.beneficiaryName, [ Validators.required ]],
  checkAmount : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundA.checkAmount, [ Validators.required ]],
  bankStatement : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundA.bankStatement, [ ]],
  checkNumber : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundA.checkNumber, [ Validators.required ]],
  checkDate : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundA.checkDate, [ Validators.required ]],
  boxCode : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundA.boxCode, [ Validators.required ]],
  administrationCode : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundA.administrationCode, [ ]],
  employeeStatus : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundA.employeeStatus, [ ]],
  subscriptionStatus : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundA.subscriptionStatus, [ ]],
  bankCode : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundA.bankCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.deductionOfAnAmountToAnEmployeeOfTheFundAService.update(this.deductionOfAnAmountToAnEmployeeOfTheFundAForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.deductionOfAnAmountToAnEmployeeOfTheFundAService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
	    }))
    .subscribe(
      (result) => {
          if (this.dialogRef)
          {
              this.dialogRef.close(true);
          }
    });
  }

  getControls(name: string) {
    return this.deductionOfAnAmountToAnEmployeeOfTheFundAForm.get(name);
  }

  initializeLookupServices() {
    this.boxCodesService = new LookupService('boxcodes', this.http);
this.departmentsSectionsService = new LookupService('departmentssections', this.http);
this.employeeStatusesService = new LookupService('employeestatuses', this.http);
this.subscriptionStatusService = new LookupService('subscriptionstatuses', this.http);
this.bankCodesService = new LookupService('bankcodes', this.http);
  }
}
