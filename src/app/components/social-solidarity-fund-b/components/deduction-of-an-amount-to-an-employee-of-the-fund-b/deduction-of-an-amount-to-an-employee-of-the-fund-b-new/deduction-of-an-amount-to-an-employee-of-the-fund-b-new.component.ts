
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { DeductionOfAnAmountToAnEmployeeOfTheFundB } from 'app/shared/models/deduction-of-an-amount-to-an-employee-of-the-fund-b';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { DeductionOfAnAmountToAnEmployeeOfTheFundBService } from '../shared/deduction-of-an-amount-to-an-employee-of-the-fund-b.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-deduction-of-an-amount-to-an-employee-of-the-fund-b-new',
  templateUrl: './deduction-of-an-amount-to-an-employee-of-the-fund-b-new.component.html',
  styleUrls: ['./deduction-of-an-amount-to-an-employee-of-the-fund-b-new.component.scss'],
  providers: [
    ]
})

export class DeductionOfAnAmountToAnEmployeeOfTheFundBNewComponent extends AppBaseComponent implements OnInit {
  deductionOfAnAmountToAnEmployeeOfTheFundBForm: FormGroup;
  @Input() selectedDeductionOfAnAmountToAnEmployeeOfTheFundB: DeductionOfAnAmountToAnEmployeeOfTheFundB;
  errorMessages: FormControlError[] = [
        
  ];

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

  
	@ViewChild('employeeStatus', { static: true }) EmployeeStatusSelectComponent: MaterialSelectComponent;
	@ViewChild('beneficiaryCode', { static: true }) BeneficiaryCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('subscriptionStatus', { static: true }) SubscriptionStatusSelectComponent: MaterialSelectComponent;
	@ViewChild('administrationCode', { static: true }) AdministrationCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('boxCode', { static: true }) BoxCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('bankCode', { static: true }) BankCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<DeductionOfAnAmountToAnEmployeeOfTheFundBNewComponent>,
    public deductionOfAnAmountToAnEmployeeOfTheFundBService: DeductionOfAnAmountToAnEmployeeOfTheFundBService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundB = new DeductionOfAnAmountToAnEmployeeOfTheFundB();

    
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
     
  id : [0],
  amountDeductingReason : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundB.amountDeductingReason, [ Validators.required ]],
  subscriptionAmounts : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundB.subscriptionAmounts, [ ]],
  basicSalary : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundB.basicSalary, [ ]],
  membershipCode : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundB.membershipCode, [ ]],
  employeeCode : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundB.employeeCode, [ Validators.required ]],
  beneficiaryName : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundB.beneficiaryName, [ Validators.required ]],
  checkAmount : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundB.checkAmount, [ Validators.required ]],
  bankStatement : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundB.bankStatement, [ ]],
  checkDate : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundB.checkDate, [ Validators.required ]],
  checkNumber : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundB.checkNumber, [ Validators.required ]],
  employeeStatus : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundB.employeeStatus, [ ]],
  beneficiaryCode : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundB.beneficiaryCode, [ Validators.required ]],
  subscriptionStatus : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundB.subscriptionStatus, [ ]],
  administrationCode : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundB.administrationCode, [ ]],
  boxCode : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundB.boxCode, [ Validators.required ]],
  bankCode : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundB.bankCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.deductionOfAnAmountToAnEmployeeOfTheFundBService.create(this.deductionOfAnAmountToAnEmployeeOfTheFundBForm.value)
        .pipe(switchMap(x => {
			return this.deductionOfAnAmountToAnEmployeeOfTheFundBService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.deductionOfAnAmountToAnEmployeeOfTheFundBForm.get(name);
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
