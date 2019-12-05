
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { SubscriberDataInFundB } from 'app/shared/models/subscriber-data-in-fund-b';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { SubscriberDataInFundBService } from '../shared/subscriber-data-in-fund-b.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-subscriber-data-in-fund-b-new',
  templateUrl: './subscriber-data-in-fund-b-new.component.html',
  styleUrls: ['./subscriber-data-in-fund-b-new.component.scss'],
  providers: [
    ]
})

export class SubscriberDataInFundBNewComponent extends AppBaseComponent implements OnInit {
  subscriberDataInFundBForm: FormGroup;
  @Input() selectedSubscriberDataInFundB: SubscriberDataInFundB;
  errorMessages: FormControlError[] = [
        
	{
	 errorName: 'max',
	 errorMessage: 'يجب ان تكون القيمة 100'
	},
	{
	 errorName: 'min',
	 errorMessage: 'يجب ان تكون القيمة 100'
	}
  ];

  private relationshipTypesService: LookupService;
private employeeStatusesService: LookupService;
private departmentsSectionsService: LookupService;

  
beneficiaryCodeSelectOptions: MaterialSelectOptions;
employeeStatusSelectOptions: MaterialSelectOptions;
administrationCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('beneficiaryCode', { static: true }) BeneficiaryCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('employeeStatus', { static: true }) EmployeeStatusSelectComponent: MaterialSelectComponent;
	@ViewChild('administrationCode', { static: true }) AdministrationCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<SubscriberDataInFundBNewComponent>,
    public subscriberDataInFundBService: SubscriberDataInFundBService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSubscriberDataInFundB = new SubscriberDataInFundB();

    
	this.beneficiaryCodeSelectOptions = new MaterialSelectOptions({
	 data: this.relationshipTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود مستفيد',
	});

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


    this.subscriberDataInFundBForm = this.formBuilder.group({
     
  id : [0],
  birthDate : [this.selectedSubscriberDataInFundB.birthDate, [ ]],
  pensionDate : [this.selectedSubscriberDataInFundB.pensionDate, [ ]],
  hiringDate : [this.selectedSubscriberDataInFundB.hiringDate, [ ]],
  subscriptionDate : [this.selectedSubscriberDataInFundB.subscriptionDate, [ Validators.required ]],
  subscriptionAmount : [this.selectedSubscriberDataInFundB.subscriptionAmount, [ Validators.required ]],
  membershipNumber : [this.selectedSubscriberDataInFundB.membershipNumber, [ ]],
  beneficiaryStatement : [this.selectedSubscriberDataInFundB.beneficiaryStatement, [ Validators.required ]],
  beneficiaryData : [this.selectedSubscriberDataInFundB.beneficiaryData, [ Validators.required ]],
  benefitRate : [this.selectedSubscriberDataInFundB.benefitRate, [ Validators.max(100),Validators.min(100) ]],
  employeeCode : [this.selectedSubscriberDataInFundB.employeeCode, [ Validators.required ]],
  beneficiaryCode : [this.selectedSubscriberDataInFundB.beneficiaryCode, [ Validators.required ]],
  employeeStatus : [this.selectedSubscriberDataInFundB.employeeStatus, [ ]],
  administrationCode : [this.selectedSubscriberDataInFundB.administrationCode, [ ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.subscriberDataInFundBService.create(this.subscriberDataInFundBForm.value)
        .pipe(switchMap(x => {
			return this.subscriberDataInFundBService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.subscriberDataInFundBForm.get(name);
    }

  initializeLookupServices() {
    this.relationshipTypesService = new LookupService('relationshiptypes', this.http);
this.employeeStatusesService = new LookupService('employeestatuses', this.http);
this.departmentsSectionsService = new LookupService('departmentssections', this.http);
  }
 }
