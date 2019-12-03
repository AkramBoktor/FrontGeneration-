
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { SubscriberDataInFundG } from 'app/shared/models/subscriber-data-in-fund-g';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { SubscriberDataInFundGService } from '../shared/subscriber-data-in-fund-g.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-subscriber-data-in-fund-g-view',
  templateUrl: './subscriber-data-in-fund-g-view.component.html',
  styleUrls: ['./subscriber-data-in-fund-g-view.component.scss'],
  providers: []
})

export class SubscriberDataInFundGViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedSubscriberDataInFundG: SubscriberDataInFundG;
  subscriberDataInFundGForm: FormGroup;

  private departmentsSectionsService: LookupService;
private relationshipTypesService: LookupService;
private employeeStatusesService: LookupService;

  
administrationCodeSelectOptions: MaterialSelectOptions;
beneficiaryCodeSelectOptions: MaterialSelectOptions;
employeeStatusSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedSubscriberDataInFundGDialog: any,
    @Optional() public dialogRef: MatDialogRef<SubscriberDataInFundGViewComponent>,
    public subscriberDataInFundGService: SubscriberDataInFundGService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSubscriberDataInFundG = this.selectedSubscriberDataInFundGDialog.data || this.selectedSubscriberDataInFundG;

    
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
      
  subscriptionDate : [this.selectedSubscriberDataInFundG.subscriptionDate],
  subscriptionAmount : [this.selectedSubscriberDataInFundG.subscriptionAmount],
  membershipNumber : [this.selectedSubscriberDataInFundG.membershipNumber],
  beneficiaryData : [this.selectedSubscriberDataInFundG.beneficiaryData],
  benefitRate : [this.selectedSubscriberDataInFundG.benefitRate],
  employeeCode : [this.selectedSubscriberDataInFundG.employeeCode],
  beneficiaryStatement : [this.selectedSubscriberDataInFundG.beneficiaryStatement],
  hiringDate : [this.selectedSubscriberDataInFundG.hiringDate],
  birthDate : [this.selectedSubscriberDataInFundG.birthDate],
  pensionDate : [this.selectedSubscriberDataInFundG.pensionDate],
  administrationCode : [this.selectedSubscriberDataInFundG.administrationCode],
  beneficiaryCode : [this.selectedSubscriberDataInFundG.beneficiaryCode],
  employeeStatus : [this.selectedSubscriberDataInFundG.employeeStatus]
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
    return this.subscriberDataInFundGForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.subscriberDataInFundGForm.controls)) {
      this.subscriberDataInFundGForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.departmentsSectionsService = new LookupService('departmentssections', this.http);
this.relationshipTypesService = new LookupService('relationshiptypes', this.http);
this.employeeStatusesService = new LookupService('employeestatuses', this.http);
  }
}

