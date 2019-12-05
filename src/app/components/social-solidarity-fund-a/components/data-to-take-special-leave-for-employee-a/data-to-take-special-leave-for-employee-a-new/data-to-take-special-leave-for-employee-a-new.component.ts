
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { DataToTakeSpecialLeaveForEmployeeA } from 'app/shared/models/data-to-take-special-leave-for-employee-a';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { DataToTakeSpecialLeaveForEmployeeAService } from '../shared/data-to-take-special-leave-for-employee-a.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-data-to-take-special-leave-for-employee-a-new',
  templateUrl: './data-to-take-special-leave-for-employee-a-new.component.html',
  styleUrls: ['./data-to-take-special-leave-for-employee-a-new.component.scss'],
  providers: [
    ]
})

export class DataToTakeSpecialLeaveForEmployeeANewComponent extends AppBaseComponent implements OnInit {
  dataToTakeSpecialLeaveForEmployeeAForm: FormGroup;
  @Input() selectedDataToTakeSpecialLeaveForEmployeeA: DataToTakeSpecialLeaveForEmployeeA;
  errorMessages: FormControlError[] = [
        
	{
	 errorName: 'Less',
	 errorMessage: ''
	},
	{
	 errorName: 'Greater',
	 errorMessage: ''
	}
  ];

  private employeeStatusesService: LookupService;
private departmentsSectionsService: LookupService;
private subscriptionStatusService: LookupService;
private vacationTypesService: LookupService;

  
employeeStatusSelectOptions: MaterialSelectOptions;
administrationCodeSelectOptions: MaterialSelectOptions;
subscriptionStatusSelectOptions: MaterialSelectOptions;
vacationTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('employeeStatus', { static: true }) EmployeeStatusSelectComponent: MaterialSelectComponent;
	@ViewChild('administrationCode', { static: true }) AdministrationCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('subscriptionStatus', { static: true }) SubscriptionStatusSelectComponent: MaterialSelectComponent;
	@ViewChild('vacationType', { static: true }) VacationTypeSelectComponent: MaterialSelectComponent;

  
benefitsAmountIsVisible: boolean;

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<DataToTakeSpecialLeaveForEmployeeANewComponent>,
    public dataToTakeSpecialLeaveForEmployeeAService: DataToTakeSpecialLeaveForEmployeeAService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDataToTakeSpecialLeaveForEmployeeA = new DataToTakeSpecialLeaveForEmployeeA();

    
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

	this.subscriptionStatusSelectOptions = new MaterialSelectOptions({
	 data: this.subscriptionStatusService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حالة الاشتراك',
	});

	this.vacationTypeSelectOptions = new MaterialSelectOptions({
	 data: this.vacationTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الاجازة',
	});


    this.dataToTakeSpecialLeaveForEmployeeAForm = this.formBuilder.group({
     
  id : [0],
  employeeCode : [this.selectedDataToTakeSpecialLeaveForEmployeeA.employeeCode, [ Validators.required ]],
  subscriptionDate : [this.selectedDataToTakeSpecialLeaveForEmployeeA.subscriptionDate, [ ]],
  membershipNumber : [this.selectedDataToTakeSpecialLeaveForEmployeeA.membershipNumber, [ ]],
  vacationStartDate : [this.selectedDataToTakeSpecialLeaveForEmployeeA.vacationStartDate, [ Validators.required ]],
  vacationEndDate : [this.selectedDataToTakeSpecialLeaveForEmployeeA.vacationEndDate, [ Validators.required ]],
  benefitsAmount : [this.selectedDataToTakeSpecialLeaveForEmployeeA.benefitsAmount, [ Validators.required ]],
  expenseAmount : [this.selectedDataToTakeSpecialLeaveForEmployeeA.expenseAmount, [ Validators.required ]],
  executiveOrderNumber : [this.selectedDataToTakeSpecialLeaveForEmployeeA.executiveOrderNumber, [ Validators.required ]],
  executiveOrderDate : [this.selectedDataToTakeSpecialLeaveForEmployeeA.executiveOrderDate, [ Validators.required ]],
  receiptNumber : [this.selectedDataToTakeSpecialLeaveForEmployeeA.receiptNumber, [ Validators.required ]],
  receiptDate : [this.selectedDataToTakeSpecialLeaveForEmployeeA.receiptDate, [ Validators.required ]],
  delayPenalty : [this.selectedDataToTakeSpecialLeaveForEmployeeA.delayPenalty, [ Validators.required ]],
  totalAmount : [this.selectedDataToTakeSpecialLeaveForEmployeeA.totalAmount, [ ]],
  durationFrom : [this.selectedDataToTakeSpecialLeaveForEmployeeA.durationFrom, [ Validators.required ]],
  durationTo : [this.selectedDataToTakeSpecialLeaveForEmployeeA.durationTo, [ Validators.required ]],
  salary : [this.selectedDataToTakeSpecialLeaveForEmployeeA.salary, [ ]],
  bonuses : [this.selectedDataToTakeSpecialLeaveForEmployeeA.bonuses, [ ]],
  requiredAmount : [this.selectedDataToTakeSpecialLeaveForEmployeeA.requiredAmount, [ Validators.required ]],
  employeeStatus : [this.selectedDataToTakeSpecialLeaveForEmployeeA.employeeStatus, [ ]],
  administrationCode : [this.selectedDataToTakeSpecialLeaveForEmployeeA.administrationCode, [ ]],
  subscriptionStatus : [this.selectedDataToTakeSpecialLeaveForEmployeeA.subscriptionStatus, [ ]],
  vacationType : [this.selectedDataToTakeSpecialLeaveForEmployeeA.vacationType, [ Validators.required ]]
   }, {
	  validators: [ 
	   ValidatorFunctions.validateLess("VacationEndDate","VacationStartDate"),
	   ValidatorFunctions.validateGreater("DurationTo","DurationFrom") ]
      });

    
	this.dataToTakeSpecialLeaveForEmployeeAForm.get('vacationType').valueChanges
	.subscribe(val => {
	if (val === 'اعادة عضوية') {
	  this.dataToTakeSpecialLeaveForEmployeeAForm.get('benefitsAmount').setValidators([]);
	  this.benefitsAmountIsVisible = true;
	  this.dataToTakeSpecialLeaveForEmployeeAForm.get('benefitsAmount').setValidators([]);
	  this.benefitsAmountIsVisible = true;
	  this.dataToTakeSpecialLeaveForEmployeeAForm.get('benefitsAmount').setValidators([]);
	  this.benefitsAmountIsVisible = true;
	  this.dataToTakeSpecialLeaveForEmployeeAForm.get('benefitsAmount').setValidators([]);
	  this.benefitsAmountIsVisible = true;
	  this.dataToTakeSpecialLeaveForEmployeeAForm.get('benefitsAmount').setValidators([]);
	  this.benefitsAmountIsVisible = true;
	  this.dataToTakeSpecialLeaveForEmployeeAForm.get('benefitsAmount').setValidators([]);
	  this.benefitsAmountIsVisible = true;
	  this.dataToTakeSpecialLeaveForEmployeeAForm.get('benefitsAmount').setValidators([]);
	  this.benefitsAmountIsVisible = true;
	  this.dataToTakeSpecialLeaveForEmployeeAForm.get('benefitsAmount').setValidators([]);
	  this.benefitsAmountIsVisible = true;
	  this.dataToTakeSpecialLeaveForEmployeeAForm.get('benefitsAmount').setValidators([]);
	  this.benefitsAmountIsVisible = true;
	  this.dataToTakeSpecialLeaveForEmployeeAForm.get('benefitsAmount').setValidators([]);
	  this.benefitsAmountIsVisible = true;
	  this.dataToTakeSpecialLeaveForEmployeeAForm.get('benefitsAmount').setValidators([]);
	  this.benefitsAmountIsVisible = true;
	  this.dataToTakeSpecialLeaveForEmployeeAForm.get('benefitsAmount').setValidators([]);
	  this.benefitsAmountIsVisible = true;
	}else {
	  this.dataToTakeSpecialLeaveForEmployeeAForm.get('benefitsAmount').clearValidators();
	  this.benefitsAmountIsVisible = false;

	  this.dataToTakeSpecialLeaveForEmployeeAForm.get('benefitsAmount').clearValidators();
	  this.benefitsAmountIsVisible = false;

	  this.dataToTakeSpecialLeaveForEmployeeAForm.get('benefitsAmount').clearValidators();
	  this.benefitsAmountIsVisible = false;

	  this.dataToTakeSpecialLeaveForEmployeeAForm.get('benefitsAmount').clearValidators();
	  this.benefitsAmountIsVisible = false;

	  this.dataToTakeSpecialLeaveForEmployeeAForm.get('benefitsAmount').clearValidators();
	  this.benefitsAmountIsVisible = false;

	  this.dataToTakeSpecialLeaveForEmployeeAForm.get('benefitsAmount').clearValidators();
	  this.benefitsAmountIsVisible = false;

	  this.dataToTakeSpecialLeaveForEmployeeAForm.get('benefitsAmount').clearValidators();
	  this.benefitsAmountIsVisible = false;

	  this.dataToTakeSpecialLeaveForEmployeeAForm.get('benefitsAmount').clearValidators();
	  this.benefitsAmountIsVisible = false;

	  this.dataToTakeSpecialLeaveForEmployeeAForm.get('benefitsAmount').clearValidators();
	  this.benefitsAmountIsVisible = false;

	  this.dataToTakeSpecialLeaveForEmployeeAForm.get('benefitsAmount').clearValidators();
	  this.benefitsAmountIsVisible = false;

	  this.dataToTakeSpecialLeaveForEmployeeAForm.get('benefitsAmount').clearValidators();
	  this.benefitsAmountIsVisible = false;

	  this.dataToTakeSpecialLeaveForEmployeeAForm.get('benefitsAmount').clearValidators();
	  this.benefitsAmountIsVisible = false;

	}
	this.dataToTakeSpecialLeaveForEmployeeAForm.get('benefitsAmount').updateValueAndValidity();
	this.dataToTakeSpecialLeaveForEmployeeAForm.get('benefitsAmount').updateValueAndValidity();
	this.dataToTakeSpecialLeaveForEmployeeAForm.get('benefitsAmount').updateValueAndValidity();
	this.dataToTakeSpecialLeaveForEmployeeAForm.get('benefitsAmount').updateValueAndValidity();
	this.dataToTakeSpecialLeaveForEmployeeAForm.get('benefitsAmount').updateValueAndValidity();
	this.dataToTakeSpecialLeaveForEmployeeAForm.get('benefitsAmount').updateValueAndValidity();
	this.dataToTakeSpecialLeaveForEmployeeAForm.get('benefitsAmount').updateValueAndValidity();
	this.dataToTakeSpecialLeaveForEmployeeAForm.get('benefitsAmount').updateValueAndValidity();
	this.dataToTakeSpecialLeaveForEmployeeAForm.get('benefitsAmount').updateValueAndValidity();
	this.dataToTakeSpecialLeaveForEmployeeAForm.get('benefitsAmount').updateValueAndValidity();
	this.dataToTakeSpecialLeaveForEmployeeAForm.get('benefitsAmount').updateValueAndValidity();
	this.dataToTakeSpecialLeaveForEmployeeAForm.get('benefitsAmount').updateValueAndValidity();
	});    

  }
  onSubmit() {
    this.dataToTakeSpecialLeaveForEmployeeAService.create(this.dataToTakeSpecialLeaveForEmployeeAForm.value)
        .pipe(switchMap(x => {
			return this.dataToTakeSpecialLeaveForEmployeeAService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.dataToTakeSpecialLeaveForEmployeeAForm.get(name);
    }

  initializeLookupServices() {
    this.employeeStatusesService = new LookupService('employeestatuses', this.http);
this.departmentsSectionsService = new LookupService('departmentssections', this.http);
this.subscriptionStatusService = new LookupService('subscriptionstatuses', this.http);
this.vacationTypesService = new LookupService('vacationtypes', this.http);
  }
 }
