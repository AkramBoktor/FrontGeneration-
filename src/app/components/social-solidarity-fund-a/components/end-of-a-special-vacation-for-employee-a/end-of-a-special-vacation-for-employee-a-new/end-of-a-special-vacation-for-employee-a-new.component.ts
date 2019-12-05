
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { EndOfASpecialVacationForEmployeeA } from 'app/shared/models/end-of-a-special-vacation-for-employee-a';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { EndOfASpecialVacationForEmployeeAService } from '../shared/end-of-a-special-vacation-for-employee-a.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-end-of-a-special-vacation-for-employee-a-new',
  templateUrl: './end-of-a-special-vacation-for-employee-a-new.component.html',
  styleUrls: ['./end-of-a-special-vacation-for-employee-a-new.component.scss'],
  providers: [
    ]
})

export class EndOfASpecialVacationForEmployeeANewComponent extends AppBaseComponent implements OnInit {
  endOfASpecialVacationForEmployeeAForm: FormGroup;
  @Input() selectedEndOfASpecialVacationForEmployeeA: EndOfASpecialVacationForEmployeeA;
  errorMessages: FormControlError[] = [
        
  ];

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

  
	@ViewChild('employeeStatus', { static: true }) EmployeeStatusSelectComponent: MaterialSelectComponent;
	@ViewChild('subscriptionStatus', { static: true }) SubscriptionStatusSelectComponent: MaterialSelectComponent;
	@ViewChild('administrationCode', { static: true }) AdministrationCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('terminationType', { static: true }) TerminationTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('paymentType', { static: true }) PaymentTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<EndOfASpecialVacationForEmployeeANewComponent>,
    public endOfASpecialVacationForEmployeeAService: EndOfASpecialVacationForEmployeeAService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedEndOfASpecialVacationForEmployeeA = new EndOfASpecialVacationForEmployeeA();

    
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
     
  id : [0],
  employeeCode : [this.selectedEndOfASpecialVacationForEmployeeA.employeeCode, [ Validators.required ]],
  membershipCode : [this.selectedEndOfASpecialVacationForEmployeeA.membershipCode, [ Validators.required ]],
  subscriptionDate : [this.selectedEndOfASpecialVacationForEmployeeA.subscriptionDate, [ ]],
  vacationBeginning : [this.selectedEndOfASpecialVacationForEmployeeA.vacationBeginning, [ Validators.required ]],
  vacationEnd : [this.selectedEndOfASpecialVacationForEmployeeA.vacationEnd, [ ]],
  vacationSubscriptionAmount : [this.selectedEndOfASpecialVacationForEmployeeA.vacationSubscriptionAmount, [ ]],
  endDate : [this.selectedEndOfASpecialVacationForEmployeeA.endDate, [ Validators.required ]],
  receiptNumber : [this.selectedEndOfASpecialVacationForEmployeeA.receiptNumber, [ Validators.required ]],
  paymentNumber : [this.selectedEndOfASpecialVacationForEmployeeA.paymentNumber, [ Validators.required ]],
  valueAmount : [this.selectedEndOfASpecialVacationForEmployeeA.valueAmount, [ ]],
  employeeStatus : [this.selectedEndOfASpecialVacationForEmployeeA.employeeStatus, [ ]],
  subscriptionStatus : [this.selectedEndOfASpecialVacationForEmployeeA.subscriptionStatus, [ ]],
  administrationCode : [this.selectedEndOfASpecialVacationForEmployeeA.administrationCode, [ ]],
  terminationType : [this.selectedEndOfASpecialVacationForEmployeeA.terminationType, [ Validators.required ]],
  paymentType : [this.selectedEndOfASpecialVacationForEmployeeA.paymentType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.endOfASpecialVacationForEmployeeAService.create(this.endOfASpecialVacationForEmployeeAForm.value)
        .pipe(switchMap(x => {
			return this.endOfASpecialVacationForEmployeeAService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.endOfASpecialVacationForEmployeeAForm.get(name);
    }

  initializeLookupServices() {
    this.employeeStatusesService = new LookupService('employeestatuses', this.http);
this.subscriptionStatusService = new LookupService('subscriptionstatuses', this.http);
this.departmentsSectionsService = new LookupService('departmentssections', this.http);
this.terminationTypesService = new LookupService('terminationtypes', this.http);
this.paymentTypesService = new LookupService('paymenttypes', this.http);
  }
 }
