
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { EndOfASpecialVacationForEmployeeG } from 'app/shared/models/end-of-a-special-vacation-for-employee-g';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { EndOfASpecialVacationForEmployeeGService } from '../shared/end-of-a-special-vacation-for-employee-g.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-end-of-a-special-vacation-for-employee-g-view',
  templateUrl: './end-of-a-special-vacation-for-employee-g-view.component.html',
  styleUrls: ['./end-of-a-special-vacation-for-employee-g-view.component.scss'],
  providers: []
})

export class EndOfASpecialVacationForEmployeeGViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedEndOfASpecialVacationForEmployeeG: EndOfASpecialVacationForEmployeeG;
  endOfASpecialVacationForEmployeeGForm: FormGroup;

  private terminationTypesService: LookupService;
private paymentTypesService: LookupService;
private departmentsSectionsService: LookupService;
private subscriptionStatusService: LookupService;
private employeeStatusesService: LookupService;

  
terminationTypeSelectOptions: MaterialSelectOptions;
paymentTypeSelectOptions: MaterialSelectOptions;
administrationCodeSelectOptions: MaterialSelectOptions;
subscriptionStatusSelectOptions: MaterialSelectOptions;
employeeStatusSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedEndOfASpecialVacationForEmployeeGDialog: any,
    @Optional() public dialogRef: MatDialogRef<EndOfASpecialVacationForEmployeeGViewComponent>,
    public endOfASpecialVacationForEmployeeGService: EndOfASpecialVacationForEmployeeGService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedEndOfASpecialVacationForEmployeeG = this.selectedEndOfASpecialVacationForEmployeeGDialog.data || this.selectedEndOfASpecialVacationForEmployeeG;

    
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


    this.endOfASpecialVacationForEmployeeGForm = this.formBuilder.group({
      
  vacationBeginning : [this.selectedEndOfASpecialVacationForEmployeeG.vacationBeginning],
  vacationEnd : [this.selectedEndOfASpecialVacationForEmployeeG.vacationEnd],
  vacationSubscriptionAmount : [this.selectedEndOfASpecialVacationForEmployeeG.vacationSubscriptionAmount],
  endDate : [this.selectedEndOfASpecialVacationForEmployeeG.endDate],
  receiptNumber : [this.selectedEndOfASpecialVacationForEmployeeG.receiptNumber],
  paymentNumber : [this.selectedEndOfASpecialVacationForEmployeeG.paymentNumber],
  valueAmount : [this.selectedEndOfASpecialVacationForEmployeeG.valueAmount],
  membershipCode : [this.selectedEndOfASpecialVacationForEmployeeG.membershipCode],
  employeeCode : [this.selectedEndOfASpecialVacationForEmployeeG.employeeCode],
  subscriptionDate : [this.selectedEndOfASpecialVacationForEmployeeG.subscriptionDate],
  terminationType : [this.selectedEndOfASpecialVacationForEmployeeG.terminationType],
  paymentType : [this.selectedEndOfASpecialVacationForEmployeeG.paymentType],
  administrationCode : [this.selectedEndOfASpecialVacationForEmployeeG.administrationCode],
  subscriptionStatus : [this.selectedEndOfASpecialVacationForEmployeeG.subscriptionStatus],
  employeeStatus : [this.selectedEndOfASpecialVacationForEmployeeG.employeeStatus]
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
    return this.endOfASpecialVacationForEmployeeGForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.endOfASpecialVacationForEmployeeGForm.controls)) {
      this.endOfASpecialVacationForEmployeeGForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.terminationTypesService = new LookupService('terminationtypes', this.http);
this.paymentTypesService = new LookupService('paymenttypes', this.http);
this.departmentsSectionsService = new LookupService('departmentssections', this.http);
this.subscriptionStatusService = new LookupService('subscriptionstatuses', this.http);
this.employeeStatusesService = new LookupService('employeestatuses', this.http);
  }
}

