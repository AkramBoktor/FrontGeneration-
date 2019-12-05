
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { DataToTakeSpecialLeaveForEmployeeG } from 'app/shared/models/data-to-take-special-leave-for-employee-g';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { DataToTakeSpecialLeaveForEmployeeGService } from '../shared/data-to-take-special-leave-for-employee-g.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-data-to-take-special-leave-for-employee-g-edit',
  templateUrl: './data-to-take-special-leave-for-employee-g-edit.component.html',
  styleUrls: ['./data-to-take-special-leave-for-employee-g-edit.component.scss'],
  providers: []
})

export class DataToTakeSpecialLeaveForEmployeeGEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedDataToTakeSpecialLeaveForEmployeeG: DataToTakeSpecialLeaveForEmployeeG;
  dataToTakeSpecialLeaveForEmployeeGForm: FormGroup;
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
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedDataToTakeSpecialLeaveForEmployeeGDialog: any,
    @Optional() public dialogRef: MatDialogRef<DataToTakeSpecialLeaveForEmployeeGEditComponent>,
    public dataToTakeSpecialLeaveForEmployeeGService: DataToTakeSpecialLeaveForEmployeeGService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDataToTakeSpecialLeaveForEmployeeG = new DataToTakeSpecialLeaveForEmployeeG();
    this.selectedDataToTakeSpecialLeaveForEmployeeG = this.selectedDataToTakeSpecialLeaveForEmployeeGDialog.data || this.selectedDataToTakeSpecialLeaveForEmployeeG;

    
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


    this.dataToTakeSpecialLeaveForEmployeeGForm = this.formBuilder.group({
      
  id : [this.selectedDataToTakeSpecialLeaveForEmployeeG.id],
  receiptNumber : [this.selectedDataToTakeSpecialLeaveForEmployeeG.receiptNumber, [ Validators.required ]],
  salary : [this.selectedDataToTakeSpecialLeaveForEmployeeG.salary, [ ]],
  durationTo : [this.selectedDataToTakeSpecialLeaveForEmployeeG.durationTo, [ Validators.required ]],
  durationFrom : [this.selectedDataToTakeSpecialLeaveForEmployeeG.durationFrom, [ Validators.required ]],
  totalAmount : [this.selectedDataToTakeSpecialLeaveForEmployeeG.totalAmount, [ ]],
  delayPenalty : [this.selectedDataToTakeSpecialLeaveForEmployeeG.delayPenalty, [ Validators.required ]],
  receiptDate : [this.selectedDataToTakeSpecialLeaveForEmployeeG.receiptDate, [ Validators.required ]],
  executiveOrderDate : [this.selectedDataToTakeSpecialLeaveForEmployeeG.executiveOrderDate, [ Validators.required ]],
  bonuses : [this.selectedDataToTakeSpecialLeaveForEmployeeG.bonuses, [ ]],
  executiveOrderNumber : [this.selectedDataToTakeSpecialLeaveForEmployeeG.executiveOrderNumber, [ Validators.required ]],
  expenseAmount : [this.selectedDataToTakeSpecialLeaveForEmployeeG.expenseAmount, [ Validators.required ]],
  benefitsAmount : [this.selectedDataToTakeSpecialLeaveForEmployeeG.benefitsAmount, [ Validators.required ]],
  employeeCode : [this.selectedDataToTakeSpecialLeaveForEmployeeG.employeeCode, [ Validators.required ]],
  vacationEndDate : [this.selectedDataToTakeSpecialLeaveForEmployeeG.vacationEndDate, [ Validators.required ]],
  membershipNumber : [this.selectedDataToTakeSpecialLeaveForEmployeeG.membershipNumber, [ ]],
  subscriptionDate : [this.selectedDataToTakeSpecialLeaveForEmployeeG.subscriptionDate, [ ]],
  subscriptionStatus : [this.selectedDataToTakeSpecialLeaveForEmployeeG.subscriptionStatus, [ ]],
  requiredAmount : [this.selectedDataToTakeSpecialLeaveForEmployeeG.requiredAmount, [ Validators.required ]],
  vacationStartDate : [this.selectedDataToTakeSpecialLeaveForEmployeeG.vacationStartDate, [ Validators.required ]],
  vacationType : [this.selectedDataToTakeSpecialLeaveForEmployeeG.vacationType, [ Validators.required ]],
  administrationCode : [this.selectedDataToTakeSpecialLeaveForEmployeeG.administrationCode, [ ]],
  employeeStatus : [this.selectedDataToTakeSpecialLeaveForEmployeeG.employeeStatus, [ ]]
   }, {
	  validators: [ 
	   ValidatorFunctions.validateLess("VacationEndDate","VacationStartDate"),
	   ValidatorFunctions.validateGreater("DurationTo","DurationFrom") ]
      });

    

  }

  onSubmit() {
    this.dataToTakeSpecialLeaveForEmployeeGService.update(this.dataToTakeSpecialLeaveForEmployeeGForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.dataToTakeSpecialLeaveForEmployeeGService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.dataToTakeSpecialLeaveForEmployeeGForm.get(name);
  }

  initializeLookupServices() {
    this.vacationTypesService = new LookupService('vacationtypes', this.http);
this.departmentsSectionsService = new LookupService('departmentssections', this.http);
this.employeeStatusesService = new LookupService('employeestatuses', this.http);
  }
}
