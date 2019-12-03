
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { SubscriberDataInFundB } from 'app/shared/models/subscriber-data-in-fund-b';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { SubscriberDataInFundBService } from '../shared/subscriber-data-in-fund-b.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-subscriber-data-in-fund-b-view',
  templateUrl: './subscriber-data-in-fund-b-view.component.html',
  styleUrls: ['./subscriber-data-in-fund-b-view.component.scss'],
  providers: []
})

export class SubscriberDataInFundBViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedSubscriberDataInFundB: SubscriberDataInFundB;
  subscriberDataInFundBForm: FormGroup;

  private relationshipTypesService: LookupService;
private employeeStatusesService: LookupService;
private departmentsSectionsService: LookupService;

  
beneficiaryCodeSelectOptions: MaterialSelectOptions;
employeeStatusSelectOptions: MaterialSelectOptions;
administrationCodeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedSubscriberDataInFundBDialog: any,
    @Optional() public dialogRef: MatDialogRef<SubscriberDataInFundBViewComponent>,
    public subscriberDataInFundBService: SubscriberDataInFundBService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSubscriberDataInFundB = this.selectedSubscriberDataInFundBDialog.data || this.selectedSubscriberDataInFundB;

    
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
      
  birthDate : [this.selectedSubscriberDataInFundB.birthDate],
  pensionDate : [this.selectedSubscriberDataInFundB.pensionDate],
  hiringDate : [this.selectedSubscriberDataInFundB.hiringDate],
  subscriptionDate : [this.selectedSubscriberDataInFundB.subscriptionDate],
  subscriptionAmount : [this.selectedSubscriberDataInFundB.subscriptionAmount],
  membershipNumber : [this.selectedSubscriberDataInFundB.membershipNumber],
  beneficiaryStatement : [this.selectedSubscriberDataInFundB.beneficiaryStatement],
  beneficiaryData : [this.selectedSubscriberDataInFundB.beneficiaryData],
  benefitRate : [this.selectedSubscriberDataInFundB.benefitRate],
  employeeCode : [this.selectedSubscriberDataInFundB.employeeCode],
  beneficiaryCode : [this.selectedSubscriberDataInFundB.beneficiaryCode],
  employeeStatus : [this.selectedSubscriberDataInFundB.employeeStatus],
  administrationCode : [this.selectedSubscriberDataInFundB.administrationCode]
      });

    this.disableControls();
  }

  onConfirm() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  getErrorMessage = (formCtrl: AbstractControl) => {
    const errorMessages: FormControlError[] = [
          
	{
	 errorName: 'max',
	 errorMessage: 'يجب ان تكون القيمة 100'
	},
	{
	 errorName: 'min',
	 errorMessage: 'يجب ان تكون القيمة 100'
	}
        ];
    return ValidatorFunctions.getErrorMessage(formCtrl, errorMessages);
   }

  getControls(name: string) {
    return this.subscriberDataInFundBForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.subscriberDataInFundBForm.controls)) {
      this.subscriberDataInFundBForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.relationshipTypesService = new LookupService('relationshiptypes', this.http);
this.employeeStatusesService = new LookupService('employeestatuses', this.http);
this.departmentsSectionsService = new LookupService('departmentssections', this.http);
  }
}

