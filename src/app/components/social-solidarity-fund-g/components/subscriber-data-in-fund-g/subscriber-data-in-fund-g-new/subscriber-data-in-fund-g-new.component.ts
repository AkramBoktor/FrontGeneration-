
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { SubscriberDataInFundG } from 'app/shared/models/subscriber-data-in-fund-g';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { SubscriberDataInFundGService } from '../shared/subscriber-data-in-fund-g.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-subscriber-data-in-fund-g-new',
  templateUrl: './subscriber-data-in-fund-g-new.component.html',
  styleUrls: ['./subscriber-data-in-fund-g-new.component.scss'],
  providers: [
    ]
})

export class SubscriberDataInFundGNewComponent extends AppBaseComponent implements OnInit {
  subscriberDataInFundGForm: FormGroup;
  @Input() selectedSubscriberDataInFundG: SubscriberDataInFundG;
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

  private departmentsSectionsService: LookupService;
private relationshipTypesService: LookupService;
private employeeStatusesService: LookupService;

  
administrationCodeSelectOptions: MaterialSelectOptions;
beneficiaryCodeSelectOptions: MaterialSelectOptions;
employeeStatusSelectOptions: MaterialSelectOptions;

  
	@ViewChild('administrationCode', { static: true }) AdministrationCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('beneficiaryCode', { static: true }) BeneficiaryCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('employeeStatus', { static: true }) EmployeeStatusSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<SubscriberDataInFundGNewComponent>,
    public subscriberDataInFundGService: SubscriberDataInFundGService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSubscriberDataInFundG = new SubscriberDataInFundG();

    
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

	this.employeeStatusSelectOptions = new MaterialSelectOptions({
	 data: this.employeeStatusesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حاله الموظف',
	});


    this.subscriberDataInFundGForm = this.formBuilder.group({
     
  id : [0],
  subscriptionDate : [this.selectedSubscriberDataInFundG.subscriptionDate, [ Validators.required ]],
  subscriptionAmount : [this.selectedSubscriberDataInFundG.subscriptionAmount, [ Validators.required ]],
  membershipNumber : [this.selectedSubscriberDataInFundG.membershipNumber, [ ]],
  beneficiaryData : [this.selectedSubscriberDataInFundG.beneficiaryData, [ Validators.required ]],
  benefitRate : [this.selectedSubscriberDataInFundG.benefitRate, [ Validators.max(100),Validators.min(100) ]],
  employeeCode : [this.selectedSubscriberDataInFundG.employeeCode, [ Validators.required ]],
  beneficiaryStatement : [this.selectedSubscriberDataInFundG.beneficiaryStatement, [ Validators.required ]],
  hiringDate : [this.selectedSubscriberDataInFundG.hiringDate, [ ]],
  birthDate : [this.selectedSubscriberDataInFundG.birthDate, [ ]],
  pensionDate : [this.selectedSubscriberDataInFundG.pensionDate, [ ]],
  administrationCode : [this.selectedSubscriberDataInFundG.administrationCode, [ ]],
  beneficiaryCode : [this.selectedSubscriberDataInFundG.beneficiaryCode, [ Validators.required ]],
  employeeStatus : [this.selectedSubscriberDataInFundG.employeeStatus, [ ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.subscriberDataInFundGService.create(this.subscriberDataInFundGForm.value)
        .pipe(switchMap(x => {
			return this.subscriberDataInFundGService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.subscriberDataInFundGForm.get(name);
    }

  initializeLookupServices() {
    this.departmentsSectionsService = new LookupService('departmentssections', this.http);
this.relationshipTypesService = new LookupService('relationshiptypes', this.http);
this.employeeStatusesService = new LookupService('employeestatuses', this.http);
  }
 }
