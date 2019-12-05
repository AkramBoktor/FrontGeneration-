
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { EndOfASpecialVacationForEmployeeG } from 'app/shared/models/end-of-a-special-vacation-for-employee-g';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { EndOfASpecialVacationForEmployeeGService } from '../shared/end-of-a-special-vacation-for-employee-g.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-end-of-a-special-vacation-for-employee-g-new',
  templateUrl: './end-of-a-special-vacation-for-employee-g-new.component.html',
  styleUrls: ['./end-of-a-special-vacation-for-employee-g-new.component.scss'],
  providers: [
    ]
})

export class EndOfASpecialVacationForEmployeeGNewComponent extends AppBaseComponent implements OnInit {
  endOfASpecialVacationForEmployeeGForm: FormGroup;
  @Input() selectedEndOfASpecialVacationForEmployeeG: EndOfASpecialVacationForEmployeeG;
  errorMessages: FormControlError[] = [
        
  ];

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

  
	@ViewChild('terminationType', { static: true }) TerminationTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('paymentType', { static: true }) PaymentTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('administrationCode', { static: true }) AdministrationCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('subscriptionStatus', { static: true }) SubscriptionStatusSelectComponent: MaterialSelectComponent;
	@ViewChild('employeeStatus', { static: true }) EmployeeStatusSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<EndOfASpecialVacationForEmployeeGNewComponent>,
    public endOfASpecialVacationForEmployeeGService: EndOfASpecialVacationForEmployeeGService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedEndOfASpecialVacationForEmployeeG = new EndOfASpecialVacationForEmployeeG();

    
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
     
  id : [0],
  vacationBeginning : [this.selectedEndOfASpecialVacationForEmployeeG.vacationBeginning, [ Validators.required ]],
  vacationEnd : [this.selectedEndOfASpecialVacationForEmployeeG.vacationEnd, [ ]],
  vacationSubscriptionAmount : [this.selectedEndOfASpecialVacationForEmployeeG.vacationSubscriptionAmount, [ ]],
  endDate : [this.selectedEndOfASpecialVacationForEmployeeG.endDate, [ Validators.required ]],
  receiptNumber : [this.selectedEndOfASpecialVacationForEmployeeG.receiptNumber, [ Validators.required ]],
  paymentNumber : [this.selectedEndOfASpecialVacationForEmployeeG.paymentNumber, [ Validators.required ]],
  valueAmount : [this.selectedEndOfASpecialVacationForEmployeeG.valueAmount, [ ]],
  membershipCode : [this.selectedEndOfASpecialVacationForEmployeeG.membershipCode, [ Validators.required ]],
  employeeCode : [this.selectedEndOfASpecialVacationForEmployeeG.employeeCode, [ Validators.required ]],
  subscriptionDate : [this.selectedEndOfASpecialVacationForEmployeeG.subscriptionDate, [ ]],
  terminationType : [this.selectedEndOfASpecialVacationForEmployeeG.terminationType, [ Validators.required ]],
  paymentType : [this.selectedEndOfASpecialVacationForEmployeeG.paymentType, [ Validators.required ]],
  administrationCode : [this.selectedEndOfASpecialVacationForEmployeeG.administrationCode, [ ]],
  subscriptionStatus : [this.selectedEndOfASpecialVacationForEmployeeG.subscriptionStatus, [ ]],
  employeeStatus : [this.selectedEndOfASpecialVacationForEmployeeG.employeeStatus, [ ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.endOfASpecialVacationForEmployeeGService.create(this.endOfASpecialVacationForEmployeeGForm.value)
        .pipe(switchMap(x => {
			return this.endOfASpecialVacationForEmployeeGService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.endOfASpecialVacationForEmployeeGForm.get(name);
    }

  initializeLookupServices() {
    this.terminationTypesService = new LookupService('terminationtypes', this.http);
this.paymentTypesService = new LookupService('paymenttypes', this.http);
this.departmentsSectionsService = new LookupService('departmentssections', this.http);
this.subscriptionStatusService = new LookupService('subscriptionstatuses', this.http);
this.employeeStatusesService = new LookupService('employeestatuses', this.http);
  }
 }
