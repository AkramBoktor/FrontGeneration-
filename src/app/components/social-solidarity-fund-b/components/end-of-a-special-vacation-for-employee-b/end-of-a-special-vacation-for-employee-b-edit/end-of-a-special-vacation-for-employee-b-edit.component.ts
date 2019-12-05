
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { EndOfASpecialVacationForEmployeeB } from 'app/shared/models/end-of-a-special-vacation-for-employee-b';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { EndOfASpecialVacationForEmployeeBService } from '../shared/end-of-a-special-vacation-for-employee-b.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-end-of-a-special-vacation-for-employee-b-edit',
  templateUrl: './end-of-a-special-vacation-for-employee-b-edit.component.html',
  styleUrls: ['./end-of-a-special-vacation-for-employee-b-edit.component.scss'],
  providers: []
})

export class EndOfASpecialVacationForEmployeeBEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedEndOfASpecialVacationForEmployeeB: EndOfASpecialVacationForEmployeeB;
  endOfASpecialVacationForEmployeeBForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private paymentTypesService: LookupService;
private terminationTypesService: LookupService;
private departmentsSectionsService: LookupService;
private employeeStatusesService: LookupService;

  
paymentTypeSelectOptions: MaterialSelectOptions;
terminationTypeSelectOptions: MaterialSelectOptions;
administrationCodeSelectOptions: MaterialSelectOptions;
employeeStatusSelectOptions: MaterialSelectOptions;

  
	@ViewChild('paymentType', { static: true }) PaymentTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('terminationType', { static: true }) TerminationTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('administrationCode', { static: true }) AdministrationCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('employeeStatus', { static: true }) EmployeeStatusSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedEndOfASpecialVacationForEmployeeBDialog: any,
    @Optional() public dialogRef: MatDialogRef<EndOfASpecialVacationForEmployeeBEditComponent>,
    public endOfASpecialVacationForEmployeeBService: EndOfASpecialVacationForEmployeeBService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedEndOfASpecialVacationForEmployeeB = new EndOfASpecialVacationForEmployeeB();
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

	this.employeeStatusSelectOptions = new MaterialSelectOptions({
	 data: this.employeeStatusesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حاله الموظف',
	});


    this.endOfASpecialVacationForEmployeeBForm = this.formBuilder.group({
      
  id : [this.selectedEndOfASpecialVacationForEmployeeB.id],
  valueAmount : [this.selectedEndOfASpecialVacationForEmployeeB.valueAmount, [ ]],
  paymentNumber : [this.selectedEndOfASpecialVacationForEmployeeB.paymentNumber, [ Validators.required ]],
  receiptNumber : [this.selectedEndOfASpecialVacationForEmployeeB.receiptNumber, [ Validators.required ]],
  endDate : [this.selectedEndOfASpecialVacationForEmployeeB.endDate, [ Validators.required ]],
  vacationSubscriptionAmount : [this.selectedEndOfASpecialVacationForEmployeeB.vacationSubscriptionAmount, [ ]],
  vacationEnd : [this.selectedEndOfASpecialVacationForEmployeeB.vacationEnd, [ ]],
  vacationBeginning : [this.selectedEndOfASpecialVacationForEmployeeB.vacationBeginning, [ Validators.required ]],
  subscriptionDate : [this.selectedEndOfASpecialVacationForEmployeeB.subscriptionDate, [ ]],
  subscriptionStatus : [this.selectedEndOfASpecialVacationForEmployeeB.subscriptionStatus, [ ]],
  membershipCode : [this.selectedEndOfASpecialVacationForEmployeeB.membershipCode, [ Validators.required ]],
  employeeCode : [this.selectedEndOfASpecialVacationForEmployeeB.employeeCode, [ Validators.required ]],
  paymentType : [this.selectedEndOfASpecialVacationForEmployeeB.paymentType, [ Validators.required ]],
  terminationType : [this.selectedEndOfASpecialVacationForEmployeeB.terminationType, [ Validators.required ]],
  administrationCode : [this.selectedEndOfASpecialVacationForEmployeeB.administrationCode, [ ]],
  employeeStatus : [this.selectedEndOfASpecialVacationForEmployeeB.employeeStatus, [ ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.endOfASpecialVacationForEmployeeBService.update(this.endOfASpecialVacationForEmployeeBForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.endOfASpecialVacationForEmployeeBService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.endOfASpecialVacationForEmployeeBForm.get(name);
  }

  initializeLookupServices() {
    this.paymentTypesService = new LookupService('paymenttypes', this.http);
this.terminationTypesService = new LookupService('terminationtypes', this.http);
this.departmentsSectionsService = new LookupService('departmentssections', this.http);
this.employeeStatusesService = new LookupService('employeestatuses', this.http);
  }
}
