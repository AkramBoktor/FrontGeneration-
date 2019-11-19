
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { ContractorDurations } from 'app/shared/models/contractor-durations';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { ContractorDurationsService } from '../shared/contractor-durations.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-contractor-durations-edit',
  templateUrl: './contractor-durations-edit.component.html',
  styleUrls: ['./contractor-durations-edit.component.scss'],
  providers: []
})

export class ContractorDurationsEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedContractorDurations: ContractorDurations;
  contractorDurationsForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private offeringTypesService: LookupService;
private contractorTideReasonsService: LookupService;

  
offeringTypeSelectOptions: MaterialSelectOptions;
reasonCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('reasonCode', { static: true }) ReasonCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedContractorDurationsDialog: any,
    @Optional() public dialogRef: MatDialogRef<ContractorDurationsEditComponent>,
    public contractorDurationsService: ContractorDurationsService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedContractorDurations = new ContractorDurations();
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
      
  id : [this.selectedContractorDurations.id],
  buildingNumber : [this.selectedContractorDurations.buildingNumber, [ Validators.required ]],
  periodFrom : [this.selectedContractorDurations.periodFrom, [ Validators.required ]],
  periodTo : [this.selectedContractorDurations.periodTo, [ Validators.required ]],
  extension : [this.selectedContractorDurations.extension, [ Validators.required ]],
  bidNumber : [this.selectedContractorDurations.bidNumber, [ Validators.required ]],
  contractorCode : [this.selectedContractorDurations.contractorCode, [ Validators.required ]],
  contractorName : [this.selectedContractorDurations.contractorName, [ ]],
  engineerName : [this.selectedContractorDurations.engineerName, [ ]],
  executionDuration : [this.selectedContractorDurations.executionDuration, [ ]],
  referencesName : [this.selectedContractorDurations.referencesName, [ Validators.required ]],
  supervisorEngineerCode : [this.selectedContractorDurations.supervisorEngineerCode, [ Validators.required ]],
  siteDeliveryDate : [this.selectedContractorDurations.siteDeliveryDate, [ Validators.required ]],
  referenceCode : [this.selectedContractorDurations.referenceCode, [ Validators.required ]],
  governorateName : [this.selectedContractorDurations.governorateName, [ ]],
  offeringType : [this.selectedContractorDurations.offeringType, [ Validators.required ]],
  reasonCode : [this.selectedContractorDurations.reasonCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.contractorDurationsService.update(this.contractorDurationsForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.contractorDurationsService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.contractorDurationsForm.get(name);
  }

  initializeLookupServices() {
    this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.contractorTideReasonsService = new LookupService('contractortidereasons', this.http);
  }
}
