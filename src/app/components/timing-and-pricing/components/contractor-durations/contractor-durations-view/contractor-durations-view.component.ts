
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { ContractorDurations } from 'app/shared/models/contractor-durations';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { ContractorDurationsService } from '../shared/contractor-durations.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-contractor-durations-view',
  templateUrl: './contractor-durations-view.component.html',
  styleUrls: ['./contractor-durations-view.component.scss'],
  providers: []
})

export class ContractorDurationsViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedContractorDurations: ContractorDurations;
  contractorDurationsForm: FormGroup;

  private offeringTypesService: LookupService;
private contractorTideReasonsService: LookupService;

  
offeringTypeSelectOptions: MaterialSelectOptions;
reasonCodeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedContractorDurationsDialog: any,
    @Optional() public dialogRef: MatDialogRef<ContractorDurationsViewComponent>,
    public contractorDurationsService: ContractorDurationsService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedContractorDurations = this.selectedContractorDurationsDialog.data || this.selectedContractorDurations;

    
	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});

	this.reasonCodeSelectOptions = new MaterialSelectOptions({
	 data: this.contractorTideReasonsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود السبب',
	});


    this.contractorDurationsForm = this.formBuilder.group({
      
  buildingNumber : [this.selectedContractorDurations.buildingNumber],
  periodFrom : [this.selectedContractorDurations.periodFrom],
  periodTo : [this.selectedContractorDurations.periodTo],
  extension : [this.selectedContractorDurations.extension],
  bidNumber : [this.selectedContractorDurations.bidNumber],
  contractorCode : [this.selectedContractorDurations.contractorCode],
  contractorName : [this.selectedContractorDurations.contractorName],
  engineerName : [this.selectedContractorDurations.engineerName],
  executionDuration : [this.selectedContractorDurations.executionDuration],
  referencesName : [this.selectedContractorDurations.referencesName],
  engineerCode : [this.selectedContractorDurations.engineerCode],
  siteDeliveryDate : [this.selectedContractorDurations.siteDeliveryDate],
  referenceCode : [this.selectedContractorDurations.referenceCode],
  governorateName : [this.selectedContractorDurations.governorateName],
  offeringType : [this.selectedContractorDurations.offeringType],
  reasonCode : [this.selectedContractorDurations.reasonCode]
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
          
        ];
    return ValidatorFunctions.getErrorMessage(formCtrl, errorMessages);
   }

  getControls(name: string) {
    return this.contractorDurationsForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.contractorDurationsForm.controls)) {
      this.contractorDurationsForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.contractorTideReasonsService = new LookupService('contractortidereasons', this.http);
  }
}

