
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { EndOfASpecialVacationForEmployeeB } from 'app/shared/models/end-of-a-special-vacation-for-employee-b';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { EndOfASpecialVacationForEmployeeBService } from '../shared/end-of-a-special-vacation-for-employee-b.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-end-of-a-special-vacation-for-employee-b-new',
  templateUrl: './end-of-a-special-vacation-for-employee-b-new.component.html',
  styleUrls: ['./end-of-a-special-vacation-for-employee-b-new.component.scss'],
  providers: [
    ]
})

export class EndOfASpecialVacationForEmployeeBNewComponent extends AppBaseComponent implements OnInit {
  endOfASpecialVacationForEmployeeBForm: FormGroup;
  @Input() selectedEndOfASpecialVacationForEmployeeB: EndOfASpecialVacationForEmployeeB;
  errorMessages: FormControlError[] = [
        
  ];

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

  
	@ViewChild('paymentType', { static: true }) PaymentTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('terminationType', { static: true }) TerminationTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('administrationCode', { static: true }) AdministrationCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('subscriptionStatus', { static: true }) SubscriptionStatusSelectComponent: MaterialSelectComponent;
	@ViewChild('employeeStatus', { static: true }) EmployeeStatusSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<EndOfASpecialVacationForEmployeeBNewComponent>,
    public endOfASpecialVacationForEmployeeBService: EndOfASpecialVacationForEmployeeBService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedEndOfASpecialVacationForEmployeeB = new EndOfASpecialVacationForEmployeeB();

    
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
     
  id : [0],
  employeeCode : [this.selectedEndOfASpecialVacationForEmployeeB.employeeCode, [ Validators.required ]],
  membershipCode : [this.selectedEndOfASpecialVacationForEmployeeB.membershipCode, [ Validators.required ]],
  valueAmount : [this.selectedEndOfASpecialVacationForEmployeeB.valueAmount, [ ]],
  paymentNumber : [this.selectedEndOfASpecialVacationForEmployeeB.paymentNumber, [ Validators.required ]],
  receiptNumber : [this.selectedEndOfASpecialVacationForEmployeeB.receiptNumber, [ Validators.required ]],
  endDate : [this.selectedEndOfASpecialVacationForEmployeeB.endDate, [ Validators.required ]],
  vacationSubscriptionAmount : [this.selectedEndOfASpecialVacationForEmployeeB.vacationSubscriptionAmount, [ ]],
  vacationEnd : [this.selectedEndOfASpecialVacationForEmployeeB.vacationEnd, [ ]],
  vacationBeginning : [this.selectedEndOfASpecialVacationForEmployeeB.vacationBeginning, [ Validators.required ]],
  subscriptionDate : [this.selectedEndOfASpecialVacationForEmployeeB.subscriptionDate, [ ]],
  paymentType : [this.selectedEndOfASpecialVacationForEmployeeB.paymentType, [ Validators.required ]],
  terminationType : [this.selectedEndOfASpecialVacationForEmployeeB.terminationType, [ Validators.required ]],
  administrationCode : [this.selectedEndOfASpecialVacationForEmployeeB.administrationCode, [ ]],
  subscriptionStatus : [this.selectedEndOfASpecialVacationForEmployeeB.subscriptionStatus, [ ]],
  employeeStatus : [this.selectedEndOfASpecialVacationForEmployeeB.employeeStatus, [ ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.endOfASpecialVacationForEmployeeBService.create(this.endOfASpecialVacationForEmployeeBForm.value)
        .pipe(switchMap(x => {
			return this.endOfASpecialVacationForEmployeeBService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.endOfASpecialVacationForEmployeeBForm.get(name);
    }

  initializeLookupServices() {
    this.paymentTypesService = new LookupService('paymenttypes', this.http);
this.terminationTypesService = new LookupService('terminationtypes', this.http);
this.departmentsSectionsService = new LookupService('departmentssections', this.http);
this.subscriptionStatusService = new LookupService('subscriptionstatuses', this.http);
this.employeeStatusesService = new LookupService('employeestatuses', this.http);
  }
 }
