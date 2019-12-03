
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { DataToTakeSpecialLeaveForEmployeeB } from 'app/shared/models/data-to-take-special-leave-for-employee-b';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { DataToTakeSpecialLeaveForEmployeeBService } from '../shared/data-to-take-special-leave-for-employee-b.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-data-to-take-special-leave-for-employee-b-edit',
  templateUrl: './data-to-take-special-leave-for-employee-b-edit.component.html',
  styleUrls: ['./data-to-take-special-leave-for-employee-b-edit.component.scss'],
  providers: []
})

export class DataToTakeSpecialLeaveForEmployeeBEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedDataToTakeSpecialLeaveForEmployeeB: DataToTakeSpecialLeaveForEmployeeB;
  dataToTakeSpecialLeaveForEmployeeBForm: FormGroup;
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
private vacationTypesService: LookupService;

  
employeeStatusSelectOptions: MaterialSelectOptions;
administrationCodeSelectOptions: MaterialSelectOptions;
vacationTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('employeeStatus', { static: true }) EmployeeStatusSelectComponent: MaterialSelectComponent;
	@ViewChild('administrationCode', { static: true }) AdministrationCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('vacationType', { static: true }) VacationTypeSelectComponent: MaterialSelectComponent;

  
benefitsAmountIsVisible: boolean;

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedDataToTakeSpecialLeaveForEmployeeBDialog: any,
    @Optional() public dialogRef: MatDialogRef<DataToTakeSpecialLeaveForEmployeeBEditComponent>,
    public dataToTakeSpecialLeaveForEmployeeBService: DataToTakeSpecialLeaveForEmployeeBService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDataToTakeSpecialLeaveForEmployeeB = new DataToTakeSpecialLeaveForEmployeeB();
    this.selectedDataToTakeSpecialLeaveForEmployeeB = this.selectedDataToTakeSpecialLeaveForEmployeeBDialog.data || this.selectedDataToTakeSpecialLeaveForEmployeeB;

    
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

	this.vacationTypeSelectOptions = new MaterialSelectOptions({
	 data: this.vacationTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الاجازة',
	});


    this.dataToTakeSpecialLeaveForEmployeeBForm = this.formBuilder.group({
      
  id : [this.selectedDataToTakeSpecialLeaveForEmployeeB.id],
  requiredAmount : [this.selectedDataToTakeSpecialLeaveForEmployeeB.requiredAmount, [ Validators.required ]],
  subscriptionStatus : [this.selectedDataToTakeSpecialLeaveForEmployeeB.subscriptionStatus, [ ]],
  subscriptionDate : [this.selectedDataToTakeSpecialLeaveForEmployeeB.subscriptionDate, [ ]],
  membershipNumber : [this.selectedDataToTakeSpecialLeaveForEmployeeB.membershipNumber, [ ]],
  vacationStartDate : [this.selectedDataToTakeSpecialLeaveForEmployeeB.vacationStartDate, [ Validators.required ]],
  vacationEndDate : [this.selectedDataToTakeSpecialLeaveForEmployeeB.vacationEndDate, [ Validators.required ]],
  benefitsAmount : [this.selectedDataToTakeSpecialLeaveForEmployeeB.benefitsAmount, [ Validators.required ]],
  expenseAmount : [this.selectedDataToTakeSpecialLeaveForEmployeeB.expenseAmount, [ Validators.required ]],
  executiveOrderNumber : [this.selectedDataToTakeSpecialLeaveForEmployeeB.executiveOrderNumber, [ Validators.required ]],
  bonuses : [this.selectedDataToTakeSpecialLeaveForEmployeeB.bonuses, [ ]],
  executiveOrderDate : [this.selectedDataToTakeSpecialLeaveForEmployeeB.executiveOrderDate, [ Validators.required ]],
  receiptDate : [this.selectedDataToTakeSpecialLeaveForEmployeeB.receiptDate, [ Validators.required ]],
  delayPenalty : [this.selectedDataToTakeSpecialLeaveForEmployeeB.delayPenalty, [ Validators.required ]],
  totalAmount : [this.selectedDataToTakeSpecialLeaveForEmployeeB.totalAmount, [ ]],
  durationFrom : [this.selectedDataToTakeSpecialLeaveForEmployeeB.durationFrom, [ Validators.required ]],
  durationTo : [this.selectedDataToTakeSpecialLeaveForEmployeeB.durationTo, [ Validators.required ]],
  salary : [this.selectedDataToTakeSpecialLeaveForEmployeeB.salary, [ ]],
  employeeCode : [this.selectedDataToTakeSpecialLeaveForEmployeeB.employeeCode, [ Validators.required ]],
  receiptNumber : [this.selectedDataToTakeSpecialLeaveForEmployeeB.receiptNumber, [ Validators.required ]],
  employeeStatus : [this.selectedDataToTakeSpecialLeaveForEmployeeB.employeeStatus, [ ]],
  administrationCode : [this.selectedDataToTakeSpecialLeaveForEmployeeB.administrationCode, [ ]],
  vacationType : [this.selectedDataToTakeSpecialLeaveForEmployeeB.vacationType, [ Validators.required ]]
   }, {
	  validators: [ 
	   ValidatorFunctions.validateLess("VacationEndDate","VacationStartDate"),
	   ValidatorFunctions.validateGreater("DurationTo","DurationFrom") ]
      });

    

  }

  onSubmit() {
    this.dataToTakeSpecialLeaveForEmployeeBService.update(this.dataToTakeSpecialLeaveForEmployeeBForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.dataToTakeSpecialLeaveForEmployeeBService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.dataToTakeSpecialLeaveForEmployeeBForm.get(name);
  }

  initializeLookupServices() {
    this.employeeStatusesService = new LookupService('employeestatuses', this.http);
this.departmentsSectionsService = new LookupService('departmentssections', this.http);
this.vacationTypesService = new LookupService('vacationtypes', this.http);
  }
}
