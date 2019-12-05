
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { DeductionOfAnAmountToAnEmployeeOfTheFundA } from 'app/shared/models/deduction-of-an-amount-to-an-employee-of-the-fund-a';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { DeductionOfAnAmountToAnEmployeeOfTheFundAService } from '../shared/deduction-of-an-amount-to-an-employee-of-the-fund-a.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-deduction-of-an-amount-to-an-employee-of-the-fund-a-new',
  templateUrl: './deduction-of-an-amount-to-an-employee-of-the-fund-a-new.component.html',
  styleUrls: ['./deduction-of-an-amount-to-an-employee-of-the-fund-a-new.component.scss'],
  providers: [
    ]
})

export class DeductionOfAnAmountToAnEmployeeOfTheFundANewComponent extends AppBaseComponent implements OnInit {
  deductionOfAnAmountToAnEmployeeOfTheFundAForm: FormGroup;
  @Input() selectedDeductionOfAnAmountToAnEmployeeOfTheFundA: DeductionOfAnAmountToAnEmployeeOfTheFundA;
  errorMessages: FormControlError[] = [
        
  ];

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

  
	@ViewChild('boxCode', { static: true }) BoxCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('administrationCode', { static: true }) AdministrationCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('employeeStatus', { static: true }) EmployeeStatusSelectComponent: MaterialSelectComponent;
	@ViewChild('subscriptionStatus', { static: true }) SubscriptionStatusSelectComponent: MaterialSelectComponent;
	@ViewChild('beneficiaryCode', { static: true }) BeneficiaryCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('bankCode', { static: true }) BankCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<DeductionOfAnAmountToAnEmployeeOfTheFundANewComponent>,
    public deductionOfAnAmountToAnEmployeeOfTheFundAService: DeductionOfAnAmountToAnEmployeeOfTheFundAService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundA = new DeductionOfAnAmountToAnEmployeeOfTheFundA();

    
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
     
  id : [0],
  employeeCode : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundA.employeeCode, [ Validators.required ]],
  membershipCode : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundA.membershipCode, [ ]],
  basicSalary : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundA.basicSalary, [ ]],
  subscriptionAmounts : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundA.subscriptionAmounts, [ ]],
  amountDeductingReason : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundA.amountDeductingReason, [ Validators.required ]],
  beneficiaryName : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundA.beneficiaryName, [ Validators.required ]],
  checkAmount : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundA.checkAmount, [ Validators.required ]],
  bankStatement : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundA.bankStatement, [ ]],
  checkNumber : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundA.checkNumber, [ Validators.required ]],
  checkDate : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundA.checkDate, [ Validators.required ]],
  boxCode : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundA.boxCode, [ Validators.required ]],
  administrationCode : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundA.administrationCode, [ ]],
  employeeStatus : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundA.employeeStatus, [ ]],
  subscriptionStatus : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundA.subscriptionStatus, [ ]],
  beneficiaryCode : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundA.beneficiaryCode, [ Validators.required ]],
  bankCode : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundA.bankCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.deductionOfAnAmountToAnEmployeeOfTheFundAService.create(this.deductionOfAnAmountToAnEmployeeOfTheFundAForm.value)
        .pipe(switchMap(x => {
			return this.deductionOfAnAmountToAnEmployeeOfTheFundAService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.deductionOfAnAmountToAnEmployeeOfTheFundAForm.get(name);
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
