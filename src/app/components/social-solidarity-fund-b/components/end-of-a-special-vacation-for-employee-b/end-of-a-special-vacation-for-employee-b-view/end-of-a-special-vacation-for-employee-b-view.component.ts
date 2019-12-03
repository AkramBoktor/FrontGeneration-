
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { EndOfASpecialVacationForEmployeeB } from 'app/shared/models/end-of-a-special-vacation-for-employee-b';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { EndOfASpecialVacationForEmployeeBService } from '../shared/end-of-a-special-vacation-for-employee-b.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-end-of-a-special-vacation-for-employee-b-view',
  templateUrl: './end-of-a-special-vacation-for-employee-b-view.component.html',
  styleUrls: ['./end-of-a-special-vacation-for-employee-b-view.component.scss'],
  providers: []
})

export class EndOfASpecialVacationForEmployeeBViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedEndOfASpecialVacationForEmployeeB: EndOfASpecialVacationForEmployeeB;
  endOfASpecialVacationForEmployeeBForm: FormGroup;

  private paymentTypesService: LookupService;
private terminationTypesService: LookupService;
private departmentsSectionsService: LookupService;
private subscriptionStatusService: LookupService;
private employeeStatusesService: LookupService;

  
paymentTypeSelectOptions: MaterialSelectOptions;
terminationTypeSelectOptions: MaterialSelectOptions;
administrationCodeSelectOptions: MaterialSelectOptions;
subscriptionStatusSelectOptions: MaterialSelectOptions;
employeeStatusSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedEndOfASpecialVacationForEmployeeBDialog: any,
    @Optional() public dialogRef: MatDialogRef<EndOfASpecialVacationForEmployeeBViewComponent>,
    public endOfASpecialVacationForEmployeeBService: EndOfASpecialVacationForEmployeeBService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedEndOfASpecialVacationForEmployeeB = this.selectedEndOfASpecialVacationForEmployeeBDialog.data || this.selectedEndOfASpecialVacationForEmployeeB;

    
	this.paymentTypeSelectOptions = new MaterialSelectOptions({
	 data: this.paymentTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع السداد',
	});

	this.terminationTypeSelectOptions = new MaterialSelectOptions({
	 data: this.terminationTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الانهاء',
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

	this.employeeStatusSelectOptions = new MaterialSelectOptions({
	 data: this.employeeStatusesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حاله الموظف',
	});


    this.endOfASpecialVacationForEmployeeBForm = this.formBuilder.group({
      
  employeeCode : [this.selectedEndOfASpecialVacationForEmployeeB.employeeCode],
  membershipCode : [this.selectedEndOfASpecialVacationForEmployeeB.membershipCode],
  valueAmount : [this.selectedEndOfASpecialVacationForEmployeeB.valueAmount],
  paymentNumber : [this.selectedEndOfASpecialVacationForEmployeeB.paymentNumber],
  receiptNumber : [this.selectedEndOfASpecialVacationForEmployeeB.receiptNumber],
  endDate : [this.selectedEndOfASpecialVacationForEmployeeB.endDate],
  vacationSubscriptionAmount : [this.selectedEndOfASpecialVacationForEmployeeB.vacationSubscriptionAmount],
  vacationEnd : [this.selectedEndOfASpecialVacationForEmployeeB.vacationEnd],
  vacationBeginning : [this.selectedEndOfASpecialVacationForEmployeeB.vacationBeginning],
  subscriptionDate : [this.selectedEndOfASpecialVacationForEmployeeB.subscriptionDate],
  paymentType : [this.selectedEndOfASpecialVacationForEmployeeB.paymentType],
  terminationType : [this.selectedEndOfASpecialVacationForEmployeeB.terminationType],
  administrationCode : [this.selectedEndOfASpecialVacationForEmployeeB.administrationCode],
  subscriptionStatus : [this.selectedEndOfASpecialVacationForEmployeeB.subscriptionStatus],
  employeeStatus : [this.selectedEndOfASpecialVacationForEmployeeB.employeeStatus]
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
          
        ];
    return ValidatorFunctions.getErrorMessage(formCtrl, errorMessages);
   }

  getControls(name: string) {
    return this.endOfASpecialVacationForEmployeeBForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.endOfASpecialVacationForEmployeeBForm.controls)) {
      this.endOfASpecialVacationForEmployeeBForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.paymentTypesService = new LookupService('paymenttypes', this.http);
this.terminationTypesService = new LookupService('terminationtypes', this.http);
this.departmentsSectionsService = new LookupService('departmentssections', this.http);
this.subscriptionStatusService = new LookupService('subscriptionstatuses', this.http);
this.employeeStatusesService = new LookupService('employeestatuses', this.http);
  }
}

