
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { DeductionOfAnAmountToAnEmployeeOfTheFundG } from 'app/shared/models/deduction-of-an-amount-to-an-employee-of-the-fund-g';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { DeductionOfAnAmountToAnEmployeeOfTheFundGService } from '../shared/deduction-of-an-amount-to-an-employee-of-the-fund-g.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-deduction-of-an-amount-to-an-employee-of-the-fund-g-new',
  templateUrl: './deduction-of-an-amount-to-an-employee-of-the-fund-g-new.component.html',
  styleUrls: ['./deduction-of-an-amount-to-an-employee-of-the-fund-g-new.component.scss'],
  providers: [
    ]
})

export class DeductionOfAnAmountToAnEmployeeOfTheFundGNewComponent extends AppBaseComponent implements OnInit {
  deductionOfAnAmountToAnEmployeeOfTheFundGForm: FormGroup;
  @Input() selectedDeductionOfAnAmountToAnEmployeeOfTheFundG: DeductionOfAnAmountToAnEmployeeOfTheFundG;
  errorMessages: FormControlError[] = [
        
  ];

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

  
	@ViewChild('bankCode', { static: true }) BankCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('boxCode', { static: true }) BoxCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('administrationCode', { static: true }) AdministrationCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('subscriptionStatus', { static: true }) SubscriptionStatusSelectComponent: MaterialSelectComponent;
	@ViewChild('beneficiaryCode', { static: true }) BeneficiaryCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('employeeStatus', { static: true }) EmployeeStatusSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<DeductionOfAnAmountToAnEmployeeOfTheFundGNewComponent>,
    public deductionOfAnAmountToAnEmployeeOfTheFundGService: DeductionOfAnAmountToAnEmployeeOfTheFundGService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundG = new DeductionOfAnAmountToAnEmployeeOfTheFundG();

    
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
     
  id : [0],
  checkNumber : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundG.checkNumber, [ Validators.required ]],
  checkDate : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundG.checkDate, [ Validators.required ]],
  bankStatement : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundG.bankStatement, [ ]],
  checkAmount : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundG.checkAmount, [ Validators.required ]],
  beneficiaryName : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundG.beneficiaryName, [ Validators.required ]],
  employeeCode : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundG.employeeCode, [ Validators.required ]],
  membershipCode : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundG.membershipCode, [ ]],
  basicSalary : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundG.basicSalary, [ ]],
  subscriptionAmounts : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundG.subscriptionAmounts, [ ]],
  amountDeductingReason : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundG.amountDeductingReason, [ Validators.required ]],
  bankCode : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundG.bankCode, [ Validators.required ]],
  boxCode : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundG.boxCode, [ Validators.required ]],
  administrationCode : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundG.administrationCode, [ ]],
  subscriptionStatus : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundG.subscriptionStatus, [ ]],
  beneficiaryCode : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundG.beneficiaryCode, [ Validators.required ]],
  employeeStatus : [this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundG.employeeStatus, [ ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.deductionOfAnAmountToAnEmployeeOfTheFundGService.create(this.deductionOfAnAmountToAnEmployeeOfTheFundGForm.value)
        .pipe(switchMap(x => {
			return this.deductionOfAnAmountToAnEmployeeOfTheFundGService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.deductionOfAnAmountToAnEmployeeOfTheFundGForm.get(name);
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
