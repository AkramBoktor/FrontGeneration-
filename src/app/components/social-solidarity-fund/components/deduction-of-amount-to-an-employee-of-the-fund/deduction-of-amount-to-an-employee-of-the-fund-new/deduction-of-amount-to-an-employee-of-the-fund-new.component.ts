
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { DeductionOfAmountToAnEmployeeOfTheFund } from 'app/shared/models/deduction-of-amount-to-an-employee-of-the-fund';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { DeductionOfAmountToAnEmployeeOfTheFundService } from '../shared/deduction-of-amount-to-an-employee-of-the-fund.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-deduction-of-amount-to-an-employee-of-the-fund-new',
  templateUrl: './deduction-of-amount-to-an-employee-of-the-fund-new.component.html',
  styleUrls: ['./deduction-of-amount-to-an-employee-of-the-fund-new.component.scss'],
  providers: [
    ]
})

export class DeductionOfAmountToAnEmployeeOfTheFundNewComponent extends AppBaseComponent implements OnInit {
  deductionOfAmountToAnEmployeeOfTheFundForm: FormGroup;
  @Input() selectedDeductionOfAmountToAnEmployeeOfTheFund: DeductionOfAmountToAnEmployeeOfTheFund;
  errorMessages: FormControlError[] = [
        
  ];

  private boxCodesService: LookupService;
private departmentsSectionsService: LookupService;
private employeeStatusesService: LookupService;
private bankCodesService: LookupService;

  
boxCodeSelectOptions: MaterialSelectOptions;
administrationCodeSelectOptions: MaterialSelectOptions;
employeeStatusSelectOptions: MaterialSelectOptions;
bankCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('boxCode', { static: true }) BoxCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('administrationCode', { static: true }) AdministrationCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('employeeStatus', { static: true }) EmployeeStatusSelectComponent: MaterialSelectComponent;
	@ViewChild('bankCode', { static: true }) BankCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<DeductionOfAmountToAnEmployeeOfTheFundNewComponent>,
    public deductionOfAmountToAnEmployeeOfTheFundService: DeductionOfAmountToAnEmployeeOfTheFundService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDeductionOfAmountToAnEmployeeOfTheFund = new DeductionOfAmountToAnEmployeeOfTheFund();

    
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
     
  id : [0],
  employeeCode : [this.selectedDeductionOfAmountToAnEmployeeOfTheFund.employeeCode, [ Validators.required ]],
  subscriptionStatus : [this.selectedDeductionOfAmountToAnEmployeeOfTheFund.subscriptionStatus, [ ]],
  membershipCode : [this.selectedDeductionOfAmountToAnEmployeeOfTheFund.membershipCode, [ ]],
  basicSalary : [this.selectedDeductionOfAmountToAnEmployeeOfTheFund.basicSalary, [ ]],
  subscriptionAmounts : [this.selectedDeductionOfAmountToAnEmployeeOfTheFund.subscriptionAmounts, [ ]],
  deductingAmountReason : [this.selectedDeductionOfAmountToAnEmployeeOfTheFund.deductingAmountReason, [ ]],
  beneficiaryCode : [this.selectedDeductionOfAmountToAnEmployeeOfTheFund.beneficiaryCode, [ Validators.required ]],
  beneficiaryName : [this.selectedDeductionOfAmountToAnEmployeeOfTheFund.beneficiaryName, [ Validators.required ]],
  checkAmount : [this.selectedDeductionOfAmountToAnEmployeeOfTheFund.checkAmount, [ Validators.required ]],
  bankStatement : [this.selectedDeductionOfAmountToAnEmployeeOfTheFund.bankStatement, [ Validators.required ]],
  checkNumber : [this.selectedDeductionOfAmountToAnEmployeeOfTheFund.checkNumber, [ ]],
  checkDate : [this.selectedDeductionOfAmountToAnEmployeeOfTheFund.checkDate, [ Validators.required ]],
  boxCode : [this.selectedDeductionOfAmountToAnEmployeeOfTheFund.boxCode, [ Validators.required ]],
  administrationCode : [this.selectedDeductionOfAmountToAnEmployeeOfTheFund.administrationCode, [ ]],
  employeeStatus : [this.selectedDeductionOfAmountToAnEmployeeOfTheFund.employeeStatus, [ ]],
  bankCode : [this.selectedDeductionOfAmountToAnEmployeeOfTheFund.bankCode, [ ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.deductionOfAmountToAnEmployeeOfTheFundService.create(this.deductionOfAmountToAnEmployeeOfTheFundForm.value)
        .pipe(switchMap(x => {
			return this.deductionOfAmountToAnEmployeeOfTheFundService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.deductionOfAmountToAnEmployeeOfTheFundForm.get(name);
    }

  initializeLookupServices() {
    this.boxCodesService = new LookupService('boxcodes', this.http);
this.departmentsSectionsService = new LookupService('departmentssections', this.http);
this.employeeStatusesService = new LookupService('employeestatuses', this.http);
this.bankCodesService = new LookupService('bankcodes', this.http);
  }
 }
