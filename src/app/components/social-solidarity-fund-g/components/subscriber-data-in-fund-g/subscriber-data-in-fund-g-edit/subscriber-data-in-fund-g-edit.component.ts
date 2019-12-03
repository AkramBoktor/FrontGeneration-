
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { SubscriberDataInFundG } from 'app/shared/models/subscriber-data-in-fund-g';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { SubscriberDataInFundGService } from '../shared/subscriber-data-in-fund-g.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-subscriber-data-in-fund-g-edit',
  templateUrl: './subscriber-data-in-fund-g-edit.component.html',
  styleUrls: ['./subscriber-data-in-fund-g-edit.component.scss'],
  providers: []
})

export class SubscriberDataInFundGEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedSubscriberDataInFundG: SubscriberDataInFundG;
  subscriberDataInFundGForm: FormGroup;
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
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedSubscriberDataInFundGDialog: any,
    @Optional() public dialogRef: MatDialogRef<SubscriberDataInFundGEditComponent>,
    public subscriberDataInFundGService: SubscriberDataInFundGService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSubscriberDataInFundG = new SubscriberDataInFundG();
    this.selectedSubscriberDataInFundG = this.selectedSubscriberDataInFundGDialog.data || this.selectedSubscriberDataInFundG;

    
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


    this.subscriberDataInFundGForm = this.formBuilder.group({
      
  id : [this.selectedSubscriberDataInFundG.id],
  subscriptionDate : [this.selectedSubscriberDataInFundG.subscriptionDate, [ Validators.required ]],
  beneficiaryData : [this.selectedSubscriberDataInFundG.beneficiaryData, [ Validators.required ]],
  subscriptionAmount : [this.selectedSubscriberDataInFundG.subscriptionAmount, [ Validators.required ]],
  membershipNumber : [this.selectedSubscriberDataInFundG.membershipNumber, [ ]],
  benefitRate : [this.selectedSubscriberDataInFundG.benefitRate, [ Validators.max(100),Validators.min(100) ]],
  birthDate : [this.selectedSubscriberDataInFundG.birthDate, [ ]],
  pensionDate : [this.selectedSubscriberDataInFundG.pensionDate, [ ]],
  hiringDate : [this.selectedSubscriberDataInFundG.hiringDate, [ ]],
  employeeCode : [this.selectedSubscriberDataInFundG.employeeCode, [ Validators.required ]],
  beneficiaryStatement : [this.selectedSubscriberDataInFundG.beneficiaryStatement, [ Validators.required ]],
  employeeStatus : [this.selectedSubscriberDataInFundG.employeeStatus, [ ]],
  administrationCode : [this.selectedSubscriberDataInFundG.administrationCode, [ ]],
  beneficiaryCode : [this.selectedSubscriberDataInFundG.beneficiaryCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.subscriberDataInFundGService.update(this.subscriberDataInFundGForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.subscriberDataInFundGService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.subscriberDataInFundGForm.get(name);
  }

  initializeLookupServices() {
    this.employeeStatusesService = new LookupService('employeestatuses', this.http);
this.departmentsSectionsService = new LookupService('departmentssections', this.http);
this.relationshipTypesService = new LookupService('relationshiptypes', this.http);
  }
}
