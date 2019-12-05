
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { DataToTakeSpecialLeaveForEmployeeG } from 'app/shared/models/data-to-take-special-leave-for-employee-g';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { DataToTakeSpecialLeaveForEmployeeGService } from '../shared/data-to-take-special-leave-for-employee-g.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-data-to-take-special-leave-for-employee-g-new',
  templateUrl: './data-to-take-special-leave-for-employee-g-new.component.html',
  styleUrls: ['./data-to-take-special-leave-for-employee-g-new.component.scss'],
  providers: [
    ]
})

export class DataToTakeSpecialLeaveForEmployeeGNewComponent extends AppBaseComponent implements OnInit {
  dataToTakeSpecialLeaveForEmployeeGForm: FormGroup;
  @Input() selectedDataToTakeSpecialLeaveForEmployeeG: DataToTakeSpecialLeaveForEmployeeG;
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
    @Optional() public dialogRef: MatDialogRef<DataToTakeSpecialLeaveForEmployeeGNewComponent>,
    public dataToTakeSpecialLeaveForEmployeeGService: DataToTakeSpecialLeaveForEmployeeGService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDataToTakeSpecialLeaveForEmployeeG = new DataToTakeSpecialLeaveForEmployeeG();

    
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


    this.dataToTakeSpecialLeaveForEmployeeGForm = this.formBuilder.group({
     
  id : [0],
  salary : [this.selectedDataToTakeSpecialLeaveForEmployeeG.salary, [ ]],
  bonuses : [this.selectedDataToTakeSpecialLeaveForEmployeeG.bonuses, [ ]],
  requiredAmount : [this.selectedDataToTakeSpecialLeaveForEmployeeG.requiredAmount, [ Validators.required ]],
  durationTo : [this.selectedDataToTakeSpecialLeaveForEmployeeG.durationTo, [ Validators.required ]],
  durationFrom : [this.selectedDataToTakeSpecialLeaveForEmployeeG.durationFrom, [ Validators.required ]],
  totalAmount : [this.selectedDataToTakeSpecialLeaveForEmployeeG.totalAmount, [ ]],
  delayPenalty : [this.selectedDataToTakeSpecialLeaveForEmployeeG.delayPenalty, [ Validators.required ]],
  employeeCode : [this.selectedDataToTakeSpecialLeaveForEmployeeG.employeeCode, [ Validators.required ]],
  subscriptionDate : [this.selectedDataToTakeSpecialLeaveForEmployeeG.subscriptionDate, [ ]],
  membershipNumber : [this.selectedDataToTakeSpecialLeaveForEmployeeG.membershipNumber, [ ]],
  vacationStartDate : [this.selectedDataToTakeSpecialLeaveForEmployeeG.vacationStartDate, [ Validators.required ]],
  vacationEndDate : [this.selectedDataToTakeSpecialLeaveForEmployeeG.vacationEndDate, [ Validators.required ]],
  benefitsAmount : [this.selectedDataToTakeSpecialLeaveForEmployeeG.benefitsAmount, [ Validators.required ]],
  expenseAmount : [this.selectedDataToTakeSpecialLeaveForEmployeeG.expenseAmount, [ Validators.required ]],
  executiveOrderNumber : [this.selectedDataToTakeSpecialLeaveForEmployeeG.executiveOrderNumber, [ Validators.required ]],
  executiveOrderDate : [this.selectedDataToTakeSpecialLeaveForEmployeeG.executiveOrderDate, [ Validators.required ]],
  receiptNumber : [this.selectedDataToTakeSpecialLeaveForEmployeeG.receiptNumber, [ Validators.required ]],
  receiptDate : [this.selectedDataToTakeSpecialLeaveForEmployeeG.receiptDate, [ Validators.required ]],
  employeeStatus : [this.selectedDataToTakeSpecialLeaveForEmployeeG.employeeStatus, [ ]],
  administrationCode : [this.selectedDataToTakeSpecialLeaveForEmployeeG.administrationCode, [ ]],
  subscriptionStatus : [this.selectedDataToTakeSpecialLeaveForEmployeeG.subscriptionStatus, [ ]],
  vacationType : [this.selectedDataToTakeSpecialLeaveForEmployeeG.vacationType, [ Validators.required ]]
   }, {
	  validators: [ 
	   ValidatorFunctions.validateLess("VacationEndDate","VacationStartDate"),
	   ValidatorFunctions.validateGreater("DurationTo","DurationFrom") ]
      });

        

  }
  onSubmit() {
    this.dataToTakeSpecialLeaveForEmployeeGService.create(this.dataToTakeSpecialLeaveForEmployeeGForm.value)
        .pipe(switchMap(x => {
			return this.dataToTakeSpecialLeaveForEmployeeGService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.dataToTakeSpecialLeaveForEmployeeGForm.get(name);
    }

  initializeLookupServices() {
    this.employeeStatusesService = new LookupService('employeestatuses', this.http);
this.departmentsSectionsService = new LookupService('departmentssections', this.http);
this.subscriptionStatusService = new LookupService('subscriptionstatuses', this.http);
this.vacationTypesService = new LookupService('vacationtypes', this.http);
  }
 }
