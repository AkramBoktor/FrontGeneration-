
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { EndOfASpecialVacationForEmployeeA } from 'app/shared/models/end-of-a-special-vacation-for-employee-a';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { EndOfASpecialVacationForEmployeeAService } from '../shared/end-of-a-special-vacation-for-employee-a.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-end-of-a-special-vacation-for-employee-a-view',
  templateUrl: './end-of-a-special-vacation-for-employee-a-view.component.html',
  styleUrls: ['./end-of-a-special-vacation-for-employee-a-view.component.scss'],
  providers: []
})

export class EndOfASpecialVacationForEmployeeAViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedEndOfASpecialVacationForEmployeeA: EndOfASpecialVacationForEmployeeA;
  endOfASpecialVacationForEmployeeAForm: FormGroup;

  private employeeStatusesService: LookupService;
private subscriptionStatusService: LookupService;
private departmentsSectionsService: LookupService;
private terminationTypesService: LookupService;
private paymentTypesService: LookupService;

  
employeeStatusSelectOptions: MaterialSelectOptions;
subscriptionStatusSelectOptions: MaterialSelectOptions;
administrationCodeSelectOptions: MaterialSelectOptions;
terminationTypeSelectOptions: MaterialSelectOptions;
paymentTypeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedEndOfASpecialVacationForEmployeeADialog: any,
    @Optional() public dialogRef: MatDialogRef<EndOfASpecialVacationForEmployeeAViewComponent>,
    public endOfASpecialVacationForEmployeeAService: EndOfASpecialVacationForEmployeeAService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedEndOfASpecialVacationForEmployeeA = this.selectedEndOfASpecialVacationForEmployeeADialog.data || this.selectedEndOfASpecialVacationForEmployeeA;

    
	this.employeeStatusSelectOptions = new MaterialSelectOptions({
	 data: this.employeeStatusesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حاله الموظف',
	});

	this.subscriptionStatusSelectOptions = new MaterialSelectOptions({
	 data: this.subscriptionStatusService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حاله الاشتراك',
	});

	this.administrationCodeSelectOptions = new MaterialSelectOptions({
	 data: this.departmentsSectionsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الاداره',
	});

	this.terminationTypeSelectOptions = new MaterialSelectOptions({
	 data: this.terminationTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الانهاء',
	});

	this.paymentTypeSelectOptions = new MaterialSelectOptions({
	 data: this.paymentTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع السداد',
	});


    this.endOfASpecialVacationForEmployeeAForm = this.formBuilder.group({
      
  employeeCode : [this.selectedEndOfASpecialVacationForEmployeeA.employeeCode],
  membershipCode : [this.selectedEndOfASpecialVacationForEmployeeA.membershipCode],
  subscriptionDate : [this.selectedEndOfASpecialVacationForEmployeeA.subscriptionDate],
  vacationBeginning : [this.selectedEndOfASpecialVacationForEmployeeA.vacationBeginning],
  vacationEnd : [this.selectedEndOfASpecialVacationForEmployeeA.vacationEnd],
  vacationSubscriptionAmount : [this.selectedEndOfASpecialVacationForEmployeeA.vacationSubscriptionAmount],
  endDate : [this.selectedEndOfASpecialVacationForEmployeeA.endDate],
  receiptNumber : [this.selectedEndOfASpecialVacationForEmployeeA.receiptNumber],
  paymentNumber : [this.selectedEndOfASpecialVacationForEmployeeA.paymentNumber],
  valueAmount : [this.selectedEndOfASpecialVacationForEmployeeA.valueAmount],
  employeeStatus : [this.selectedEndOfASpecialVacationForEmployeeA.employeeStatus],
  subscriptionStatus : [this.selectedEndOfASpecialVacationForEmployeeA.subscriptionStatus],
  administrationCode : [this.selectedEndOfASpecialVacationForEmployeeA.administrationCode],
  terminationType : [this.selectedEndOfASpecialVacationForEmployeeA.terminationType],
  paymentType : [this.selectedEndOfASpecialVacationForEmployeeA.paymentType]
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
    return this.endOfASpecialVacationForEmployeeAForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.endOfASpecialVacationForEmployeeAForm.controls)) {
      this.endOfASpecialVacationForEmployeeAForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.employeeStatusesService = new LookupService('employeestatuses', this.http);
this.subscriptionStatusService = new LookupService('subscriptionstatuses', this.http);
this.departmentsSectionsService = new LookupService('departmentssections', this.http);
this.terminationTypesService = new LookupService('terminationtypes', this.http);
this.paymentTypesService = new LookupService('paymenttypes', this.http);
  }
}

