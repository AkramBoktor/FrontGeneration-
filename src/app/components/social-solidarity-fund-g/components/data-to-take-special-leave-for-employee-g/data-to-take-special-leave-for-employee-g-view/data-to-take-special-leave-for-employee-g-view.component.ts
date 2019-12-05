
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { DataToTakeSpecialLeaveForEmployeeG } from 'app/shared/models/data-to-take-special-leave-for-employee-g';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { DataToTakeSpecialLeaveForEmployeeGService } from '../shared/data-to-take-special-leave-for-employee-g.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-data-to-take-special-leave-for-employee-g-view',
  templateUrl: './data-to-take-special-leave-for-employee-g-view.component.html',
  styleUrls: ['./data-to-take-special-leave-for-employee-g-view.component.scss'],
  providers: []
})

export class DataToTakeSpecialLeaveForEmployeeGViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedDataToTakeSpecialLeaveForEmployeeG: DataToTakeSpecialLeaveForEmployeeG;
  dataToTakeSpecialLeaveForEmployeeGForm: FormGroup;

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
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedDataToTakeSpecialLeaveForEmployeeGDialog: any,
    @Optional() public dialogRef: MatDialogRef<DataToTakeSpecialLeaveForEmployeeGViewComponent>,
    public dataToTakeSpecialLeaveForEmployeeGService: DataToTakeSpecialLeaveForEmployeeGService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDataToTakeSpecialLeaveForEmployeeG = this.selectedDataToTakeSpecialLeaveForEmployeeGDialog.data || this.selectedDataToTakeSpecialLeaveForEmployeeG;

    
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
      
  salary : [this.selectedDataToTakeSpecialLeaveForEmployeeG.salary],
  bonuses : [this.selectedDataToTakeSpecialLeaveForEmployeeG.bonuses],
  requiredAmount : [this.selectedDataToTakeSpecialLeaveForEmployeeG.requiredAmount],
  durationTo : [this.selectedDataToTakeSpecialLeaveForEmployeeG.durationTo],
  durationFrom : [this.selectedDataToTakeSpecialLeaveForEmployeeG.durationFrom],
  totalAmount : [this.selectedDataToTakeSpecialLeaveForEmployeeG.totalAmount],
  delayPenalty : [this.selectedDataToTakeSpecialLeaveForEmployeeG.delayPenalty],
  employeeCode : [this.selectedDataToTakeSpecialLeaveForEmployeeG.employeeCode],
  subscriptionDate : [this.selectedDataToTakeSpecialLeaveForEmployeeG.subscriptionDate],
  membershipNumber : [this.selectedDataToTakeSpecialLeaveForEmployeeG.membershipNumber],
  vacationStartDate : [this.selectedDataToTakeSpecialLeaveForEmployeeG.vacationStartDate],
  vacationEndDate : [this.selectedDataToTakeSpecialLeaveForEmployeeG.vacationEndDate],
  benefitsAmount : [this.selectedDataToTakeSpecialLeaveForEmployeeG.benefitsAmount],
  expenseAmount : [this.selectedDataToTakeSpecialLeaveForEmployeeG.expenseAmount],
  executiveOrderNumber : [this.selectedDataToTakeSpecialLeaveForEmployeeG.executiveOrderNumber],
  executiveOrderDate : [this.selectedDataToTakeSpecialLeaveForEmployeeG.executiveOrderDate],
  receiptNumber : [this.selectedDataToTakeSpecialLeaveForEmployeeG.receiptNumber],
  receiptDate : [this.selectedDataToTakeSpecialLeaveForEmployeeG.receiptDate],
  employeeStatus : [this.selectedDataToTakeSpecialLeaveForEmployeeG.employeeStatus],
  administrationCode : [this.selectedDataToTakeSpecialLeaveForEmployeeG.administrationCode],
  subscriptionStatus : [this.selectedDataToTakeSpecialLeaveForEmployeeG.subscriptionStatus],
  vacationType : [this.selectedDataToTakeSpecialLeaveForEmployeeG.vacationType]
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
    return this.dataToTakeSpecialLeaveForEmployeeGForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.dataToTakeSpecialLeaveForEmployeeGForm.controls)) {
      this.dataToTakeSpecialLeaveForEmployeeGForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.employeeStatusesService = new LookupService('employeestatuses', this.http);
this.departmentsSectionsService = new LookupService('departmentssections', this.http);
this.subscriptionStatusService = new LookupService('subscriptionstatuses', this.http);
this.vacationTypesService = new LookupService('vacationtypes', this.http);
  }
}

