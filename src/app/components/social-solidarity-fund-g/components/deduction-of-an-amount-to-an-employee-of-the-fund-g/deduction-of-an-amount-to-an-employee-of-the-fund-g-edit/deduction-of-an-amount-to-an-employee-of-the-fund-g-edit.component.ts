
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { DeductionOfAnAmountToAnEmployeeOfTheFundG } from 'app/shared/models/deduction-of-an-amount-to-an-employee-of-the-fund-g';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { DeductionOfAnAmountToAnEmployeeOfTheFundGService } from '../shared/deduction-of-an-amount-to-an-employee-of-the-fund-g.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-deduction-of-an-amount-to-an-employee-of-the-fund-g-edit',
  templateUrl: './deduction-of-an-amount-to-an-employee-of-the-fund-g-edit.component.html',
  styleUrls: ['./deduction-of-an-amount-to-an-employee-of-the-fund-g-edit.component.scss'],
  providers: []
})

export class DeductionOfAnAmountToAnEmployeeOfTheFundGEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedDeductionOfAnAmountToAnEmployeeOfTheFundG: DeductionOfAnAmountToAnEmployeeOfTheFundG;
  deductionOfAnAmountToAnEmployeeOfTheFundGForm: FormGroup;
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
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedDeductionOfAnAmountToAnEmployeeOfTheFundGDialog: any,
    @Optional() public dialogRef: MatDialogRef<DeductionOfAnAmountToAnEmployeeOfTheFundGEditComponent>,
    public deductionOfAnAmountToAnEmployeeOfTheFundGService: DeductionOfAnAmountToAnEmployeeOfTheFundGService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundG = new DeductionOfAnAmountToAnEmployeeOfTheFundG();
    this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundG = this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundGDialog.data || this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundG;

    
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


    this.deductionOfAnAmountToAnEmployeeOfTheFundGForm = this.formBuilder.group({
      
  id : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundG.id],
  amountDeductingReason : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundG.amountDeductingReason, [ Validators.required ]],
  employeeCode : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundG.employeeCode, [ Validators.required ]],
  membershipCode : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundG.membershipCode, [ ]],
  basicSalary : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundG.basicSalary, [ ]],
  subscriptionAmounts : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundG.subscriptionAmounts, [ ]],
  beneficiaryCode : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundG.beneficiaryCode, [ Validators.required ]],
  beneficiaryName : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundG.beneficiaryName, [ Validators.required ]],
  bankStatement : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundG.bankStatement, [ ]],
  checkNumber : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundG.checkNumber, [ Validators.required ]],
  checkDate : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundG.checkDate, [ Validators.required ]],
  checkAmount : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundG.checkAmount, [ Validators.required ]],
  boxCode : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundG.boxCode, [ Validators.required ]],
  administrationCode : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundG.administrationCode, [ ]],
  employeeStatus : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundG.employeeStatus, [ ]],
  subscriptionStatus : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundG.subscriptionStatus, [ ]],
  bankCode : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundG.bankCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.deductionOfAnAmountToAnEmployeeOfTheFundGService.update(this.deductionOfAnAmountToAnEmployeeOfTheFundGForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.deductionOfAnAmountToAnEmployeeOfTheFundGService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.deductionOfAnAmountToAnEmployeeOfTheFundGForm.get(name);
  }

  initializeLookupServices() {
    this.boxCodesService = new LookupService('boxcodes', this.http);
this.departmentsSectionsService = new LookupService('departmentssections', this.http);
this.employeeStatusesService = new LookupService('employeestatuses', this.http);
this.subscriptionStatusService = new LookupService('subscriptionstatuses', this.http);
this.bankCodesService = new LookupService('bankcodes', this.http);
  }
}
