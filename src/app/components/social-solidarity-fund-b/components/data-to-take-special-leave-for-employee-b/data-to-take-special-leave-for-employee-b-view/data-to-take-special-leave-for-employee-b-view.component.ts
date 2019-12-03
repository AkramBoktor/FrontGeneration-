
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { DataToTakeSpecialLeaveForEmployeeB } from 'app/shared/models/data-to-take-special-leave-for-employee-b';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { DataToTakeSpecialLeaveForEmployeeBService } from '../shared/data-to-take-special-leave-for-employee-b.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-data-to-take-special-leave-for-employee-b-view',
  templateUrl: './data-to-take-special-leave-for-employee-b-view.component.html',
  styleUrls: ['./data-to-take-special-leave-for-employee-b-view.component.scss'],
  providers: []
})

export class DataToTakeSpecialLeaveForEmployeeBViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedDataToTakeSpecialLeaveForEmployeeB: DataToTakeSpecialLeaveForEmployeeB;
  dataToTakeSpecialLeaveForEmployeeBForm: FormGroup;

  private vacationTypesService: LookupService;
private subscriptionStatusService: LookupService;
private departmentsSectionsService: LookupService;
private employeeStatusesService: LookupService;

  
vacationTypeSelectOptions: MaterialSelectOptions;
subscriptionStatusSelectOptions: MaterialSelectOptions;
administrationCodeSelectOptions: MaterialSelectOptions;
employeeStatusSelectOptions: MaterialSelectOptions;

  
benefitsAmountIsVisible: boolean;

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedDataToTakeSpecialLeaveForEmployeeBDialog: any,
    @Optional() public dialogRef: MatDialogRef<DataToTakeSpecialLeaveForEmployeeBViewComponent>,
    public dataToTakeSpecialLeaveForEmployeeBService: DataToTakeSpecialLeaveForEmployeeBService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDataToTakeSpecialLeaveForEmployeeB = this.selectedDataToTakeSpecialLeaveForEmployeeBDialog.data || this.selectedDataToTakeSpecialLeaveForEmployeeB;

    
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
      
  receiptDate : [this.selectedDataToTakeSpecialLeaveForEmployeeB.receiptDate],
  receiptNumber : [this.selectedDataToTakeSpecialLeaveForEmployeeB.receiptNumber],
  executiveOrderDate : [this.selectedDataToTakeSpecialLeaveForEmployeeB.executiveOrderDate],
  executiveOrderNumber : [this.selectedDataToTakeSpecialLeaveForEmployeeB.executiveOrderNumber],
  expenseAmount : [this.selectedDataToTakeSpecialLeaveForEmployeeB.expenseAmount],
  benefitsAmount : [this.selectedDataToTakeSpecialLeaveForEmployeeB.benefitsAmount],
  vacationEndDate : [this.selectedDataToTakeSpecialLeaveForEmployeeB.vacationEndDate],
  vacationStartDate : [this.selectedDataToTakeSpecialLeaveForEmployeeB.vacationStartDate],
  membershipNumber : [this.selectedDataToTakeSpecialLeaveForEmployeeB.membershipNumber],
  subscriptionDate : [this.selectedDataToTakeSpecialLeaveForEmployeeB.subscriptionDate],
  employeeCode : [this.selectedDataToTakeSpecialLeaveForEmployeeB.employeeCode],
  delayPenalty : [this.selectedDataToTakeSpecialLeaveForEmployeeB.delayPenalty],
  totalAmount : [this.selectedDataToTakeSpecialLeaveForEmployeeB.totalAmount],
  durationFrom : [this.selectedDataToTakeSpecialLeaveForEmployeeB.durationFrom],
  durationTo : [this.selectedDataToTakeSpecialLeaveForEmployeeB.durationTo],
  requiredAmount : [this.selectedDataToTakeSpecialLeaveForEmployeeB.requiredAmount],
  bonuses : [this.selectedDataToTakeSpecialLeaveForEmployeeB.bonuses],
  salary : [this.selectedDataToTakeSpecialLeaveForEmployeeB.salary],
  vacationType : [this.selectedDataToTakeSpecialLeaveForEmployeeB.vacationType],
  subscriptionStatus : [this.selectedDataToTakeSpecialLeaveForEmployeeB.subscriptionStatus],
  administrationCode : [this.selectedDataToTakeSpecialLeaveForEmployeeB.administrationCode],
  employeeStatus : [this.selectedDataToTakeSpecialLeaveForEmployeeB.employeeStatus]
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
    return this.dataToTakeSpecialLeaveForEmployeeBForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.dataToTakeSpecialLeaveForEmployeeBForm.controls)) {
      this.dataToTakeSpecialLeaveForEmployeeBForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.vacationTypesService = new LookupService('vacationtypes', this.http);
this.subscriptionStatusService = new LookupService('subscriptionstatuses', this.http);
this.departmentsSectionsService = new LookupService('departmentssections', this.http);
this.employeeStatusesService = new LookupService('employeestatuses', this.http);
  }
}

