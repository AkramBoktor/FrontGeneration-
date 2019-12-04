
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { DataToTakeSpecialLeaveForEmployeeA } from 'app/shared/models/data-to-take-special-leave-for-employee-a';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { DataToTakeSpecialLeaveForEmployeeAService } from '../shared/data-to-take-special-leave-for-employee-a.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-data-to-take-special-leave-for-employee-a-view',
  templateUrl: './data-to-take-special-leave-for-employee-a-view.component.html',
  styleUrls: ['./data-to-take-special-leave-for-employee-a-view.component.scss'],
  providers: []
})

export class DataToTakeSpecialLeaveForEmployeeAViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedDataToTakeSpecialLeaveForEmployeeA: DataToTakeSpecialLeaveForEmployeeA;
  dataToTakeSpecialLeaveForEmployeeAForm: FormGroup;

  private employeeStatusesService: LookupService;
private departmentsSectionsService: LookupService;
private subscriptionStatusService: LookupService;
private vacationTypesService: LookupService;

  
employeeStatusSelectOptions: MaterialSelectOptions;
administrationCodeSelectOptions: MaterialSelectOptions;
subscriptionStatusSelectOptions: MaterialSelectOptions;
vacationTypeSelectOptions: MaterialSelectOptions;

  
benefitsAmountIsVisible: boolean;

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedDataToTakeSpecialLeaveForEmployeeADialog: any,
    @Optional() public dialogRef: MatDialogRef<DataToTakeSpecialLeaveForEmployeeAViewComponent>,
    public dataToTakeSpecialLeaveForEmployeeAService: DataToTakeSpecialLeaveForEmployeeAService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDataToTakeSpecialLeaveForEmployeeA = this.selectedDataToTakeSpecialLeaveForEmployeeADialog.data || this.selectedDataToTakeSpecialLeaveForEmployeeA;

    
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
      
  employeeCode : [this.selectedDataToTakeSpecialLeaveForEmployeeA.employeeCode],
  subscriptionDate : [this.selectedDataToTakeSpecialLeaveForEmployeeA.subscriptionDate],
  membershipNumber : [this.selectedDataToTakeSpecialLeaveForEmployeeA.membershipNumber],
  vacationStartDate : [this.selectedDataToTakeSpecialLeaveForEmployeeA.vacationStartDate],
  vacationEndDate : [this.selectedDataToTakeSpecialLeaveForEmployeeA.vacationEndDate],
  benefitsAmount : [this.selectedDataToTakeSpecialLeaveForEmployeeA.benefitsAmount],
  expenseAmount : [this.selectedDataToTakeSpecialLeaveForEmployeeA.expenseAmount],
  executiveOrderNumber : [this.selectedDataToTakeSpecialLeaveForEmployeeA.executiveOrderNumber],
  executiveOrderDate : [this.selectedDataToTakeSpecialLeaveForEmployeeA.executiveOrderDate],
  receiptNumber : [this.selectedDataToTakeSpecialLeaveForEmployeeA.receiptNumber],
  receiptDate : [this.selectedDataToTakeSpecialLeaveForEmployeeA.receiptDate],
  delayPenalty : [this.selectedDataToTakeSpecialLeaveForEmployeeA.delayPenalty],
  totalAmount : [this.selectedDataToTakeSpecialLeaveForEmployeeA.totalAmount],
  durationFrom : [this.selectedDataToTakeSpecialLeaveForEmployeeA.durationFrom],
  durationTo : [this.selectedDataToTakeSpecialLeaveForEmployeeA.durationTo],
  salary : [this.selectedDataToTakeSpecialLeaveForEmployeeA.salary],
  bonuses : [this.selectedDataToTakeSpecialLeaveForEmployeeA.bonuses],
  requiredAmount : [this.selectedDataToTakeSpecialLeaveForEmployeeA.requiredAmount],
  employeeStatus : [this.selectedDataToTakeSpecialLeaveForEmployeeA.employeeStatus],
  administrationCode : [this.selectedDataToTakeSpecialLeaveForEmployeeA.administrationCode],
  subscriptionStatus : [this.selectedDataToTakeSpecialLeaveForEmployeeA.subscriptionStatus],
  vacationType : [this.selectedDataToTakeSpecialLeaveForEmployeeA.vacationType]
      });

    this.disableControls();
  }

  onConfirm() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  getErrorMessage = (formCtrl: AbstractControl) => {
    const errorMessages: FormControlError[] = [
          
	{
	 errorName: 'Less',
	 errorMessage: ''
	},
	{
	 errorName: 'Greater',
	 errorMessage: ''
	}
        ];
    return ValidatorFunctions.getErrorMessage(formCtrl, errorMessages);
   }

  getControls(name: string) {
    return this.dataToTakeSpecialLeaveForEmployeeAForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.dataToTakeSpecialLeaveForEmployeeAForm.controls)) {
      this.dataToTakeSpecialLeaveForEmployeeAForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.employeeStatusesService = new LookupService('employeestatuses', this.http);
this.departmentsSectionsService = new LookupService('departmentssections', this.http);
this.subscriptionStatusService = new LookupService('subscriptionstatuses', this.http);
this.vacationTypesService = new LookupService('vacationtypes', this.http);
  }
}

