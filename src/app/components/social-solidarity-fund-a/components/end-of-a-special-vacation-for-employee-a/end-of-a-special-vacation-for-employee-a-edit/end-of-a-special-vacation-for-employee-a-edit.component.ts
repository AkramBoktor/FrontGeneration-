
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { EndOfASpecialVacationForEmployeeA } from 'app/shared/models/end-of-a-special-vacation-for-employee-a';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { EndOfASpecialVacationForEmployeeAService } from '../shared/end-of-a-special-vacation-for-employee-a.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-end-of-a-special-vacation-for-employee-a-edit',
  templateUrl: './end-of-a-special-vacation-for-employee-a-edit.component.html',
  styleUrls: ['./end-of-a-special-vacation-for-employee-a-edit.component.scss'],
  providers: []
})

export class EndOfASpecialVacationForEmployeeAEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedEndOfASpecialVacationForEmployeeA: EndOfASpecialVacationForEmployeeA;
  endOfASpecialVacationForEmployeeAForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private employeeStatusesService: LookupService;
private departmentsSectionsService: LookupService;
private terminationTypesService: LookupService;
private paymentTypesService: LookupService;

  
employeeStatusSelectOptions: MaterialSelectOptions;
administrationCodeSelectOptions: MaterialSelectOptions;
terminationTypeSelectOptions: MaterialSelectOptions;
paymentTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('employeeStatus', { static: true }) EmployeeStatusSelectComponent: MaterialSelectComponent;
	@ViewChild('administrationCode', { static: true }) AdministrationCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('terminationType', { static: true }) TerminationTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('paymentType', { static: true }) PaymentTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedEndOfASpecialVacationForEmployeeADialog: any,
    @Optional() public dialogRef: MatDialogRef<EndOfASpecialVacationForEmployeeAEditComponent>,
    public endOfASpecialVacationForEmployeeAService: EndOfASpecialVacationForEmployeeAService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedEndOfASpecialVacationForEmployeeA = new EndOfASpecialVacationForEmployeeA();
    this.selectedEndOfASpecialVacationForEmployeeA = this.selectedEndOfASpecialVacationForEmployeeADialog.data || this.selectedEndOfASpecialVacationForEmployeeA;

    
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
      
  id : [this.selectedEndOfASpecialVacationForEmployeeA.id],
  employeeCode : [this.selectedEndOfASpecialVacationForEmployeeA.employeeCode, [ Validators.required ]],
  membershipCode : [this.selectedEndOfASpecialVacationForEmployeeA.membershipCode, [ Validators.required ]],
  subscriptionStatus : [this.selectedEndOfASpecialVacationForEmployeeA.subscriptionStatus, [ ]],
  subscriptionDate : [this.selectedEndOfASpecialVacationForEmployeeA.subscriptionDate, [ ]],
  vacationBeginning : [this.selectedEndOfASpecialVacationForEmployeeA.vacationBeginning, [ Validators.required ]],
  vacationEnd : [this.selectedEndOfASpecialVacationForEmployeeA.vacationEnd, [ ]],
  vacationSubscriptionAmount : [this.selectedEndOfASpecialVacationForEmployeeA.vacationSubscriptionAmount, [ ]],
  endDate : [this.selectedEndOfASpecialVacationForEmployeeA.endDate, [ Validators.required ]],
  receiptNumber : [this.selectedEndOfASpecialVacationForEmployeeA.receiptNumber, [ Validators.required ]],
  paymentNumber : [this.selectedEndOfASpecialVacationForEmployeeA.paymentNumber, [ Validators.required ]],
  valueAmount : [this.selectedEndOfASpecialVacationForEmployeeA.valueAmount, [ ]],
  employeeStatus : [this.selectedEndOfASpecialVacationForEmployeeA.employeeStatus, [ ]],
  administrationCode : [this.selectedEndOfASpecialVacationForEmployeeA.administrationCode, [ ]],
  terminationType : [this.selectedEndOfASpecialVacationForEmployeeA.terminationType, [ Validators.required ]],
  paymentType : [this.selectedEndOfASpecialVacationForEmployeeA.paymentType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.endOfASpecialVacationForEmployeeAService.update(this.endOfASpecialVacationForEmployeeAForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.endOfASpecialVacationForEmployeeAService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.endOfASpecialVacationForEmployeeAForm.get(name);
  }

  initializeLookupServices() {
    this.employeeStatusesService = new LookupService('employeestatuses', this.http);
this.departmentsSectionsService = new LookupService('departmentssections', this.http);
this.terminationTypesService = new LookupService('terminationtypes', this.http);
this.paymentTypesService = new LookupService('paymenttypes', this.http);
  }
}
