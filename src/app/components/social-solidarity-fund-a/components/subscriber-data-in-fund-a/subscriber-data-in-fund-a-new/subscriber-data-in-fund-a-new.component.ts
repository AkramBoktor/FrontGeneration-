
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { SubscriberDataInFundA } from 'app/shared/models/subscriber-data-in-fund-a';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { SubscriberDataInFundAService } from '../shared/subscriber-data-in-fund-a.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-subscriber-data-in-fund-a-new',
  templateUrl: './subscriber-data-in-fund-a-new.component.html',
  styleUrls: ['./subscriber-data-in-fund-a-new.component.scss'],
  providers: [
    ]
})

export class SubscriberDataInFundANewComponent extends AppBaseComponent implements OnInit {
  subscriberDataInFundAForm: FormGroup;
  @Input() selectedSubscriberDataInFundA: SubscriberDataInFundA;
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

  private employeeStatusesService: LookupService;
private departmentsSectionsService: LookupService;
private relationshipTypesService: LookupService;

  
employeeStatusSelectOptions: MaterialSelectOptions;
administrationCodeSelectOptions: MaterialSelectOptions;
beneficiaryCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('employeeStatus', { static: true }) EmployeeStatusSelectComponent: MaterialSelectComponent;
	@ViewChild('administrationCode', { static: true }) AdministrationCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('beneficiaryCode', { static: true }) BeneficiaryCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<SubscriberDataInFundANewComponent>,
    public subscriberDataInFundAService: SubscriberDataInFundAService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSubscriberDataInFundA = new SubscriberDataInFundA();

    
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

	this.beneficiaryCodeSelectOptions = new MaterialSelectOptions({
	 data: this.relationshipTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود مستفيد',
	});


    this.subscriberDataInFundAForm = this.formBuilder.group({
     
  id : [0],
  employeeCode : [this.selectedSubscriberDataInFundA.employeeCode, [ Validators.required ]],
  birthDate : [this.selectedSubscriberDataInFundA.birthDate, [ ]],
  pensionDate : [this.selectedSubscriberDataInFundA.pensionDate, [ ]],
  hiringDate : [this.selectedSubscriberDataInFundA.hiringDate, [ ]],
  subscriptionDate : [this.selectedSubscriberDataInFundA.subscriptionDate, [ Validators.required ]],
  subscriptionAmount : [this.selectedSubscriberDataInFundA.subscriptionAmount, [ Validators.required ]],
  membershipNumber : [this.selectedSubscriberDataInFundA.membershipNumber, [ Validators.required ]],
  beneficiaryStatement : [this.selectedSubscriberDataInFundA.beneficiaryStatement, [ Validators.required ]],
  beneficiaryData : [this.selectedSubscriberDataInFundA.beneficiaryData, [ Validators.required ]],
  benefitRate : [this.selectedSubscriberDataInFundA.benefitRate, [ Validators.max(100),Validators.min(100) ]],
  employeeStatus : [this.selectedSubscriberDataInFundA.employeeStatus, [ ]],
  administrationCode : [this.selectedSubscriberDataInFundA.administrationCode, [ ]],
  beneficiaryCode : [this.selectedSubscriberDataInFundA.beneficiaryCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.subscriberDataInFundAService.create(this.subscriberDataInFundAForm.value)
        .pipe(switchMap(x => {
			return this.subscriberDataInFundAService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.subscriberDataInFundAForm.get(name);
    }

  initializeLookupServices() {
    this.employeeStatusesService = new LookupService('employeestatuses', this.http);
this.departmentsSectionsService = new LookupService('departmentssections', this.http);
this.relationshipTypesService = new LookupService('relationshiptypes', this.http);
  }
 }
