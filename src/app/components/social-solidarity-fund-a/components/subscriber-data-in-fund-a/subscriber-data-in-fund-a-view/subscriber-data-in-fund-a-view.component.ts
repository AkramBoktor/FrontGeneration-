
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { SubscriberDataInFundA } from 'app/shared/models/subscriber-data-in-fund-a';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { SubscriberDataInFundAService } from '../shared/subscriber-data-in-fund-a.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-subscriber-data-in-fund-a-view',
  templateUrl: './subscriber-data-in-fund-a-view.component.html',
  styleUrls: ['./subscriber-data-in-fund-a-view.component.scss'],
  providers: []
})

export class SubscriberDataInFundAViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedSubscriberDataInFundA: SubscriberDataInFundA;
  subscriberDataInFundAForm: FormGroup;

  private employeeStatusesService: LookupService;
private departmentsSectionsService: LookupService;
private relationshipTypesService: LookupService;

  
employeeStatusSelectOptions: MaterialSelectOptions;
administrationCodeSelectOptions: MaterialSelectOptions;
beneficiaryCodeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedSubscriberDataInFundADialog: any,
    @Optional() public dialogRef: MatDialogRef<SubscriberDataInFundAViewComponent>,
    public subscriberDataInFundAService: SubscriberDataInFundAService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSubscriberDataInFundA = this.selectedSubscriberDataInFundADialog.data || this.selectedSubscriberDataInFundA;

    
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
      
  employeeCode : [this.selectedSubscriberDataInFundA.employeeCode],
  birthDate : [this.selectedSubscriberDataInFundA.birthDate],
  pensionDate : [this.selectedSubscriberDataInFundA.pensionDate],
  hiringDate : [this.selectedSubscriberDataInFundA.hiringDate],
  subscriptionDate : [this.selectedSubscriberDataInFundA.subscriptionDate],
  subscriptionAmount : [this.selectedSubscriberDataInFundA.subscriptionAmount],
  membershipNumber : [this.selectedSubscriberDataInFundA.membershipNumber],
  beneficiaryStatement : [this.selectedSubscriberDataInFundA.beneficiaryStatement],
  beneficiaryData : [this.selectedSubscriberDataInFundA.beneficiaryData],
  benefitRate : [this.selectedSubscriberDataInFundA.benefitRate],
  employeeStatus : [this.selectedSubscriberDataInFundA.employeeStatus],
  administrationCode : [this.selectedSubscriberDataInFundA.administrationCode],
  beneficiaryCode : [this.selectedSubscriberDataInFundA.beneficiaryCode]
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
    return this.subscriberDataInFundAForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.subscriberDataInFundAForm.controls)) {
      this.subscriberDataInFundAForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.employeeStatusesService = new LookupService('employeestatuses', this.http);
this.departmentsSectionsService = new LookupService('departmentssections', this.http);
this.relationshipTypesService = new LookupService('relationshiptypes', this.http);
  }
}

