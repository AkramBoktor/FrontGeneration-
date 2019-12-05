
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { EndOfASpecialVacationForEmployeeG } from 'app/shared/models/end-of-a-special-vacation-for-employee-g';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { EndOfASpecialVacationForEmployeeGService } from '../shared/end-of-a-special-vacation-for-employee-g.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-end-of-a-special-vacation-for-employee-g-edit',
  templateUrl: './end-of-a-special-vacation-for-employee-g-edit.component.html',
  styleUrls: ['./end-of-a-special-vacation-for-employee-g-edit.component.scss'],
  providers: []
})

export class EndOfASpecialVacationForEmployeeGEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedEndOfASpecialVacationForEmployeeG: EndOfASpecialVacationForEmployeeG;
  endOfASpecialVacationForEmployeeGForm: FormGroup;
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
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedEndOfASpecialVacationForEmployeeGDialog: any,
    @Optional() public dialogRef: MatDialogRef<EndOfASpecialVacationForEmployeeGEditComponent>,
    public endOfASpecialVacationForEmployeeGService: EndOfASpecialVacationForEmployeeGService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedEndOfASpecialVacationForEmployeeG = new EndOfASpecialVacationForEmployeeG();
    this.selectedEndOfASpecialVacationForEmployeeG = this.selectedEndOfASpecialVacationForEmployeeGDialog.data || this.selectedEndOfASpecialVacationForEmployeeG;

    
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


    this.endOfASpecialVacationForEmployeeGForm = this.formBuilder.group({
      
  id : [this.selectedEndOfASpecialVacationForEmployeeG.id],
  employeeCode : [this.selectedEndOfASpecialVacationForEmployeeG.employeeCode, [ Validators.required ]],
  membershipCode : [this.selectedEndOfASpecialVacationForEmployeeG.membershipCode, [ Validators.required ]],
  subscriptionStatus : [this.selectedEndOfASpecialVacationForEmployeeG.subscriptionStatus, [ ]],
  subscriptionDate : [this.selectedEndOfASpecialVacationForEmployeeG.subscriptionDate, [ ]],
  vacationBeginning : [this.selectedEndOfASpecialVacationForEmployeeG.vacationBeginning, [ Validators.required ]],
  vacationEnd : [this.selectedEndOfASpecialVacationForEmployeeG.vacationEnd, [ ]],
  vacationSubscriptionAmount : [this.selectedEndOfASpecialVacationForEmployeeG.vacationSubscriptionAmount, [ ]],
  receiptNumber : [this.selectedEndOfASpecialVacationForEmployeeG.receiptNumber, [ Validators.required ]],
  paymentNumber : [this.selectedEndOfASpecialVacationForEmployeeG.paymentNumber, [ Validators.required ]],
  valueAmount : [this.selectedEndOfASpecialVacationForEmployeeG.valueAmount, [ ]],
  endDate : [this.selectedEndOfASpecialVacationForEmployeeG.endDate, [ Validators.required ]],
  employeeStatus : [this.selectedEndOfASpecialVacationForEmployeeG.employeeStatus, [ ]],
  administrationCode : [this.selectedEndOfASpecialVacationForEmployeeG.administrationCode, [ ]],
  terminationType : [this.selectedEndOfASpecialVacationForEmployeeG.terminationType, [ Validators.required ]],
  paymentType : [this.selectedEndOfASpecialVacationForEmployeeG.paymentType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.endOfASpecialVacationForEmployeeGService.update(this.endOfASpecialVacationForEmployeeGForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.endOfASpecialVacationForEmployeeGService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.endOfASpecialVacationForEmployeeGForm.get(name);
  }

  initializeLookupServices() {
    this.employeeStatusesService = new LookupService('employeestatuses', this.http);
this.departmentsSectionsService = new LookupService('departmentssections', this.http);
this.terminationTypesService = new LookupService('terminationtypes', this.http);
this.paymentTypesService = new LookupService('paymenttypes', this.http);
  }
}
