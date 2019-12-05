
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { SubscriberDataInFundB } from 'app/shared/models/subscriber-data-in-fund-b';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { SubscriberDataInFundBService } from '../shared/subscriber-data-in-fund-b.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-subscriber-data-in-fund-b-edit',
  templateUrl: './subscriber-data-in-fund-b-edit.component.html',
  styleUrls: ['./subscriber-data-in-fund-b-edit.component.scss'],
  providers: []
})

export class SubscriberDataInFundBEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedSubscriberDataInFundB: SubscriberDataInFundB;
  subscriberDataInFundBForm: FormGroup;
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
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedSubscriberDataInFundBDialog: any,
    @Optional() public dialogRef: MatDialogRef<SubscriberDataInFundBEditComponent>,
    public subscriberDataInFundBService: SubscriberDataInFundBService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSubscriberDataInFundB = new SubscriberDataInFundB();
    this.selectedSubscriberDataInFundB = this.selectedSubscriberDataInFundBDialog.data || this.selectedSubscriberDataInFundB;

    
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


    this.subscriberDataInFundBForm = this.formBuilder.group({
      
  id : [this.selectedSubscriberDataInFundB.id],
  birthDate : [this.selectedSubscriberDataInFundB.birthDate, [ ]],
  pensionDate : [this.selectedSubscriberDataInFundB.pensionDate, [ ]],
  employeeCode : [this.selectedSubscriberDataInFundB.employeeCode, [ Validators.required ]],
  hiringDate : [this.selectedSubscriberDataInFundB.hiringDate, [ ]],
  benefitRate : [this.selectedSubscriberDataInFundB.benefitRate, [ Validators.max(100),Validators.min(100) ]],
  beneficiaryData : [this.selectedSubscriberDataInFundB.beneficiaryData, [ Validators.required ]],
  subscriptionDate : [this.selectedSubscriberDataInFundB.subscriptionDate, [ Validators.required ]],
  subscriptionAmount : [this.selectedSubscriberDataInFundB.subscriptionAmount, [ Validators.required ]],
  membershipNumber : [this.selectedSubscriberDataInFundB.membershipNumber, [ ]],
  beneficiaryStatement : [this.selectedSubscriberDataInFundB.beneficiaryStatement, [ Validators.required ]],
  employeeStatus : [this.selectedSubscriberDataInFundB.employeeStatus, [ ]],
  administrationCode : [this.selectedSubscriberDataInFundB.administrationCode, [ ]],
  beneficiaryCode : [this.selectedSubscriberDataInFundB.beneficiaryCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.subscriberDataInFundBService.update(this.subscriberDataInFundBForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.subscriberDataInFundBService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.subscriberDataInFundBForm.get(name);
  }

  initializeLookupServices() {
    this.employeeStatusesService = new LookupService('employeestatuses', this.http);
this.departmentsSectionsService = new LookupService('departmentssections', this.http);
this.relationshipTypesService = new LookupService('relationshiptypes', this.http);
  }
}
