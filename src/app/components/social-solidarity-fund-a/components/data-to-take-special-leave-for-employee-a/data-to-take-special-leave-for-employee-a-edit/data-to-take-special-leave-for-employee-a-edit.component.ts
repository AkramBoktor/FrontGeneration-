
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { DataToTakeSpecialLeaveForEmployeeA } from 'app/shared/models/data-to-take-special-leave-for-employee-a';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { DataToTakeSpecialLeaveForEmployeeAService } from '../shared/data-to-take-special-leave-for-employee-a.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-data-to-take-special-leave-for-employee-a-edit',
  templateUrl: './data-to-take-special-leave-for-employee-a-edit.component.html',
  styleUrls: ['./data-to-take-special-leave-for-employee-a-edit.component.scss'],
  providers: []
})

export class DataToTakeSpecialLeaveForEmployeeAEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedDataToTakeSpecialLeaveForEmployeeA: DataToTakeSpecialLeaveForEmployeeA;
  dataToTakeSpecialLeaveForEmployeeAForm: FormGroup;
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
private departmentsSectionsService: LookupService;
private employeeStatusesService: LookupService;

  
vacationTypeSelectOptions: MaterialSelectOptions;
administrationCodeSelectOptions: MaterialSelectOptions;
employeeStatusSelectOptions: MaterialSelectOptions;

  
	@ViewChild('vacationType', { static: true }) VacationTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('administrationCode', { static: true }) AdministrationCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('employeeStatus', { static: true }) EmployeeStatusSelectComponent: MaterialSelectComponent;

  
benefitsAmountIsVisible: boolean;

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedDataToTakeSpecialLeaveForEmployeeADialog: any,
    @Optional() public dialogRef: MatDialogRef<DataToTakeSpecialLeaveForEmployeeAEditComponent>,
    public dataToTakeSpecialLeaveForEmployeeAService: DataToTakeSpecialLeaveForEmployeeAService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDataToTakeSpecialLeaveForEmployeeA = new DataToTakeSpecialLeaveForEmployeeA();
    this.selectedDataToTakeSpecialLeaveForEmployeeA = this.selectedDataToTakeSpecialLeaveForEmployeeADialog.data || this.selectedDataToTakeSpecialLeaveForEmployeeA;

    
	this.vacationTypeSelectOptions = new MaterialSelectOptions({
	 data: this.vacationTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الاجازة',
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


    this.dataToTakeSpecialLeaveForEmployeeAForm = this.formBuilder.group({
      
  id : [this.selectedDataToTakeSpecialLeaveForEmployeeA.id],
  employeeCode : [this.selectedDataToTakeSpecialLeaveForEmployeeA.employeeCode, [ Validators.required ]],
  salary : [this.selectedDataToTakeSpecialLeaveForEmployeeA.salary, [ ]],
  durationTo : [this.selectedDataToTakeSpecialLeaveForEmployeeA.durationTo, [ Validators.required ]],
  durationFrom : [this.selectedDataToTakeSpecialLeaveForEmployeeA.durationFrom, [ Validators.required ]],
  totalAmount : [this.selectedDataToTakeSpecialLeaveForEmployeeA.totalAmount, [ ]],
  delayPenalty : [this.selectedDataToTakeSpecialLeaveForEmployeeA.delayPenalty, [ Validators.required ]],
  receiptDate : [this.selectedDataToTakeSpecialLeaveForEmployeeA.receiptDate, [ Validators.required ]],
  receiptNumber : [this.selectedDataToTakeSpecialLeaveForEmployeeA.receiptNumber, [ Validators.required ]],
  executiveOrderDate : [this.selectedDataToTakeSpecialLeaveForEmployeeA.executiveOrderDate, [ Validators.required ]],
  executiveOrderNumber : [this.selectedDataToTakeSpecialLeaveForEmployeeA.executiveOrderNumber, [ Validators.required ]],
  expenseAmount : [this.selectedDataToTakeSpecialLeaveForEmployeeA.expenseAmount, [ Validators.required ]],
  benefitsAmount : [this.selectedDataToTakeSpecialLeaveForEmployeeA.benefitsAmount, [ Validators.required ]],
  vacationEndDate : [this.selectedDataToTakeSpecialLeaveForEmployeeA.vacationEndDate, [ Validators.required ]],
  vacationStartDate : [this.selectedDataToTakeSpecialLeaveForEmployeeA.vacationStartDate, [ Validators.required ]],
  membershipNumber : [this.selectedDataToTakeSpecialLeaveForEmployeeA.membershipNumber, [ ]],
  subscriptionDate : [this.selectedDataToTakeSpecialLeaveForEmployeeA.subscriptionDate, [ ]],
  subscriptionStatus : [this.selectedDataToTakeSpecialLeaveForEmployeeA.subscriptionStatus, [ ]],
  bonuses : [this.selectedDataToTakeSpecialLeaveForEmployeeA.bonuses, [ ]],
  requiredAmount : [this.selectedDataToTakeSpecialLeaveForEmployeeA.requiredAmount, [ Validators.required ]],
  vacationType : [this.selectedDataToTakeSpecialLeaveForEmployeeA.vacationType, [ Validators.required ]],
  administrationCode : [this.selectedDataToTakeSpecialLeaveForEmployeeA.administrationCode, [ ]],
  employeeStatus : [this.selectedDataToTakeSpecialLeaveForEmployeeA.employeeStatus, [ ]]
   }, {
	  validators: [ 
	   ValidatorFunctions.validateLess("VacationEndDate","VacationStartDate"),
	   ValidatorFunctions.validateGreater("DurationTo","DurationFrom") ]
      });

    

  }

  onSubmit() {
    this.dataToTakeSpecialLeaveForEmployeeAService.update(this.dataToTakeSpecialLeaveForEmployeeAForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.dataToTakeSpecialLeaveForEmployeeAService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.dataToTakeSpecialLeaveForEmployeeAForm.get(name);
  }

  initializeLookupServices() {
    this.vacationTypesService = new LookupService('vacationtypes', this.http);
this.departmentsSectionsService = new LookupService('departmentssections', this.http);
this.employeeStatusesService = new LookupService('employeestatuses', this.http);
  }
}
