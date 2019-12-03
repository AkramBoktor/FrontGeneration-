
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { DeductionOfAnAmountToAnEmployeeOfTheFundB } from 'app/shared/models/deduction-of-an-amount-to-an-employee-of-the-fund-b';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { DeductionOfAnAmountToAnEmployeeOfTheFundBService } from '../shared/deduction-of-an-amount-to-an-employee-of-the-fund-b.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-deduction-of-an-amount-to-an-employee-of-the-fund-b-edit',
  templateUrl: './deduction-of-an-amount-to-an-employee-of-the-fund-b-edit.component.html',
  styleUrls: ['./deduction-of-an-amount-to-an-employee-of-the-fund-b-edit.component.scss'],
  providers: []
})

export class DeductionOfAnAmountToAnEmployeeOfTheFundBEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedDeductionOfAnAmountToAnEmployeeOfTheFundB: DeductionOfAnAmountToAnEmployeeOfTheFundB;
  deductionOfAnAmountToAnEmployeeOfTheFundBForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private bankCodesService: LookupService;
private subscriptionStatusService: LookupService;
private employeeStatusesService: LookupService;
private departmentsSectionsService: LookupService;
private boxCodesService: LookupService;

  
bankCodeSelectOptions: MaterialSelectOptions;
subscriptionStatusSelectOptions: MaterialSelectOptions;
employeeStatusSelectOptions: MaterialSelectOptions;
administrationCodeSelectOptions: MaterialSelectOptions;
boxCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('bankCode', { static: true }) BankCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('subscriptionStatus', { static: true }) SubscriptionStatusSelectComponent: MaterialSelectComponent;
	@ViewChild('employeeStatus', { static: true }) EmployeeStatusSelectComponent: MaterialSelectComponent;
	@ViewChild('administrationCode', { static: true }) AdministrationCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('boxCode', { static: true }) BoxCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedDeductionOfAnAmountToAnEmployeeOfTheFundBDialog: any,
    @Optional() public dialogRef: MatDialogRef<DeductionOfAnAmountToAnEmployeeOfTheFundBEditComponent>,
    public deductionOfAnAmountToAnEmployeeOfTheFundBService: DeductionOfAnAmountToAnEmployeeOfTheFundBService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundB = new DeductionOfAnAmountToAnEmployeeOfTheFundB();
    this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundB = this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundBDialog.data || this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundB;

    
	this.bankCodeSelectOptions = new MaterialSelectOptions({
	 data: this.bankCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود البنك',
	});

	this.subscriptionStatusSelectOptions = new MaterialSelectOptions({
	 data: this.subscriptionStatusService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حاله الاشتراك',
	});

	this.employeeStatusSelectOptions = new MaterialSelectOptions({
	 data: this.employeeStatusesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حاله الموظف',
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


    this.deductionOfAnAmountToAnEmployeeOfTheFundBForm = this.formBuilder.group({
      
  id : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundB.id],
  checkDate : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundB.checkDate, [ Validators.required ]],
  checkNumber : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundB.checkNumber, [ Validators.required ]],
  bankStatement : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundB.bankStatement, [ ]],
  checkAmount : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundB.checkAmount, [ Validators.required ]],
  beneficiaryName : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundB.beneficiaryName, [ Validators.required ]],
  beneficiaryCode : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundB.beneficiaryCode, [ Validators.required ]],
  subscriptionAmounts : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundB.subscriptionAmounts, [ ]],
  basicSalary : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundB.basicSalary, [ ]],
  membershipCode : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundB.membershipCode, [ ]],
  employeeCode : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundB.employeeCode, [ Validators.required ]],
  amountDeductingReason : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundB.amountDeductingReason, [ Validators.required ]],
  bankCode : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundB.bankCode, [ Validators.required ]],
  subscriptionStatus : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundB.subscriptionStatus, [ ]],
  employeeStatus : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundB.employeeStatus, [ ]],
  administrationCode : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundB.administrationCode, [ ]],
  boxCode : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundB.boxCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.deductionOfAnAmountToAnEmployeeOfTheFundBService.update(this.deductionOfAnAmountToAnEmployeeOfTheFundBForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.deductionOfAnAmountToAnEmployeeOfTheFundBService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.deductionOfAnAmountToAnEmployeeOfTheFundBForm.get(name);
  }

  initializeLookupServices() {
    this.bankCodesService = new LookupService('bankcodes', this.http);
this.subscriptionStatusService = new LookupService('subscriptionstatuses', this.http);
this.employeeStatusesService = new LookupService('employeestatuses', this.http);
this.departmentsSectionsService = new LookupService('departmentssections', this.http);
this.boxCodesService = new LookupService('boxcodes', this.http);
  }
}
