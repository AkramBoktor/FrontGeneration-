
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { DataToTakeSpecialLeaveForEmployeeB } from 'app/shared/models/data-to-take-special-leave-for-employee-b';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { DataToTakeSpecialLeaveForEmployeeBService } from '../shared/data-to-take-special-leave-for-employee-b.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-data-to-take-special-leave-for-employee-b-new',
  templateUrl: './data-to-take-special-leave-for-employee-b-new.component.html',
  styleUrls: ['./data-to-take-special-leave-for-employee-b-new.component.scss'],
  providers: [
    ]
})

export class DataToTakeSpecialLeaveForEmployeeBNewComponent extends AppBaseComponent implements OnInit {
  dataToTakeSpecialLeaveForEmployeeBForm: FormGroup;
  @Input() selectedDataToTakeSpecialLeaveForEmployeeB: DataToTakeSpecialLeaveForEmployeeB;
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

  private vacationTypesService: LookupService;
private subscriptionStatusService: LookupService;
private departmentsSectionsService: LookupService;
private employeeStatusesService: LookupService;

  
vacationTypeSelectOptions: MaterialSelectOptions;
subscriptionStatusSelectOptions: MaterialSelectOptions;
administrationCodeSelectOptions: MaterialSelectOptions;
employeeStatusSelectOptions: MaterialSelectOptions;

  
	@ViewChild('vacationType', { static: true }) VacationTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('subscriptionStatus', { static: true }) SubscriptionStatusSelectComponent: MaterialSelectComponent;
	@ViewChild('administrationCode', { static: true }) AdministrationCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('employeeStatus', { static: true }) EmployeeStatusSelectComponent: MaterialSelectComponent;

  
benefitsAmountIsVisible: boolean;

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<DataToTakeSpecialLeaveForEmployeeBNewComponent>,
    public dataToTakeSpecialLeaveForEmployeeBService: DataToTakeSpecialLeaveForEmployeeBService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDataToTakeSpecialLeaveForEmployeeB = new DataToTakeSpecialLeaveForEmployeeB();

    
	this.vacationTypeSelectOptions = new MaterialSelectOptions({
	 data: this.vacationTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الاجازة',
	});

	this.subscriptionStatusSelectOptions = new MaterialSelectOptions({
	 data: this.subscriptionStatusService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حالة الاشتراك',
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


    this.dataToTakeSpecialLeaveForEmployeeBForm = this.formBuilder.group({
     
  id : [0],
  receiptDate : [this.selectedDataToTakeSpecialLeaveForEmployeeB.receiptDate, [ Validators.required ]],
  receiptNumber : [this.selectedDataToTakeSpecialLeaveForEmployeeB.receiptNumber, [ Validators.required ]],
  executiveOrderDate : [this.selectedDataToTakeSpecialLeaveForEmployeeB.executiveOrderDate, [ Validators.required ]],
  executiveOrderNumber : [this.selectedDataToTakeSpecialLeaveForEmployeeB.executiveOrderNumber, [ Validators.required ]],
  expenseAmount : [this.selectedDataToTakeSpecialLeaveForEmployeeB.expenseAmount, [ Validators.required ]],
  benefitsAmount : [this.selectedDataToTakeSpecialLeaveForEmployeeB.benefitsAmount, [ Validators.required ]],
  vacationEndDate : [this.selectedDataToTakeSpecialLeaveForEmployeeB.vacationEndDate, [ Validators.required ]],
  vacationStartDate : [this.selectedDataToTakeSpecialLeaveForEmployeeB.vacationStartDate, [ Validators.required ]],
  membershipNumber : [this.selectedDataToTakeSpecialLeaveForEmployeeB.membershipNumber, [ ]],
  subscriptionDate : [this.selectedDataToTakeSpecialLeaveForEmployeeB.subscriptionDate, [ ]],
  employeeCode : [this.selectedDataToTakeSpecialLeaveForEmployeeB.employeeCode, [ Validators.required ]],
  delayPenalty : [this.selectedDataToTakeSpecialLeaveForEmployeeB.delayPenalty, [ Validators.required ]],
  totalAmount : [this.selectedDataToTakeSpecialLeaveForEmployeeB.totalAmount, [ ]],
  durationFrom : [this.selectedDataToTakeSpecialLeaveForEmployeeB.durationFrom, [ Validators.required ]],
  durationTo : [this.selectedDataToTakeSpecialLeaveForEmployeeB.durationTo, [ Validators.required ]],
  requiredAmount : [this.selectedDataToTakeSpecialLeaveForEmployeeB.requiredAmount, [ Validators.required ]],
  bonuses : [this.selectedDataToTakeSpecialLeaveForEmployeeB.bonuses, [ ]],
  salary : [this.selectedDataToTakeSpecialLeaveForEmployeeB.salary, [ ]],
  vacationType : [this.selectedDataToTakeSpecialLeaveForEmployeeB.vacationType, [ Validators.required ]],
  subscriptionStatus : [this.selectedDataToTakeSpecialLeaveForEmployeeB.subscriptionStatus, [ ]],
  administrationCode : [this.selectedDataToTakeSpecialLeaveForEmployeeB.administrationCode, [ ]],
  employeeStatus : [this.selectedDataToTakeSpecialLeaveForEmployeeB.employeeStatus, [ ]]
   }, {
	  validators: [ 
	   ValidatorFunctions.validateLess("VacationEndDate","VacationStartDate"),
	   ValidatorFunctions.validateGreater("DurationTo","DurationFrom") ]
      });

        

  }
  onSubmit() {
    this.dataToTakeSpecialLeaveForEmployeeBService.create(this.dataToTakeSpecialLeaveForEmployeeBForm.value)
        .pipe(switchMap(x => {
			return this.dataToTakeSpecialLeaveForEmployeeBService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.dataToTakeSpecialLeaveForEmployeeBForm.get(name);
    }

  initializeLookupServices() {
    this.vacationTypesService = new LookupService('vacationtypes', this.http);
this.subscriptionStatusService = new LookupService('subscriptionstatuses', this.http);
this.departmentsSectionsService = new LookupService('departmentssections', this.http);
this.employeeStatusesService = new LookupService('employeestatuses', this.http);
  }
 }
