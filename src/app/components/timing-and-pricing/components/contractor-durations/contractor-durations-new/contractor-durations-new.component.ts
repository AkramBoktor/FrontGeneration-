
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { ContractorDurations } from 'app/shared/models/contractor-durations';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ContractorDurationsService } from '../shared/contractor-durations.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-contractor-durations-new',
  templateUrl: './contractor-durations-new.component.html',
  styleUrls: ['./contractor-durations-new.component.scss'],
  providers: [
    ]
})

export class ContractorDurationsNewComponent extends AppBaseComponent implements OnInit {
  contractorDurationsForm: FormGroup;
  @Input() selectedContractorDurations: ContractorDurations;
  errorMessages: FormControlError[] = [
        
  ];

  private offeringTypesService: LookupService;
private contractorTideReasonsService: LookupService;
private governoratesService: LookupService;

  
offeringTypeSelectOptions: MaterialSelectOptions;
reasonCodeSelectOptions: MaterialSelectOptions;
governorateNameSelectOptions: MaterialSelectOptions;

  
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('reasonCode', { static: true }) ReasonCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('governorateName', { static: true }) GovernorateNameSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<ContractorDurationsNewComponent>,
    public contractorDurationsService: ContractorDurationsService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedContractorDurations = new ContractorDurations();

    
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

	this.governorateNameSelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'اسم المحافظه',
	});


    this.contractorDurationsForm = this.formBuilder.group({
     
  id : [0],
  buildingNumber : [this.selectedContractorDurations.buildingNumber, [ Validators.required ]],
  periodFrom : [this.selectedContractorDurations.periodFrom, [ Validators.required ]],
  periodTo : [this.selectedContractorDurations.periodTo, [ Validators.required ]],
  extension : [this.selectedContractorDurations.extension, [ Validators.required ]],
  bidNumber : [this.selectedContractorDurations.bidNumber, [ Validators.required ]],
  contractorCode : [this.selectedContractorDurations.contractorCode, [ Validators.required ]],
  contractorName : [this.selectedContractorDurations.contractorName, [ ]],
  engineerName : [this.selectedContractorDurations.engineerName, [ Validators.required ]],
  executionDuration : [this.selectedContractorDurations.executionDuration, [ ]],
  referencesName : [this.selectedContractorDurations.referencesName, [ ]],
  engineerCode : [this.selectedContractorDurations.engineerCode, [ Validators.required ]],
  siteDeliveryDate : [this.selectedContractorDurations.siteDeliveryDate, [ Validators.required ]],
  referenceCode : [this.selectedContractorDurations.referenceCode, [ Validators.required ]],
  offeringType : [this.selectedContractorDurations.offeringType, [ Validators.required ]],
  reasonCode : [this.selectedContractorDurations.reasonCode, [ Validators.required ]],
  governorateName : [this.selectedContractorDurations.governorateName, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.contractorDurationsService.create(this.contractorDurationsForm.value)
        .pipe(switchMap(x => {
			return this.contractorDurationsService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.contractorDurationsForm.get(name);
    }

  initializeLookupServices() {
    this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.contractorTideReasonsService = new LookupService('contractortidereasons', this.http);
this.governoratesService = new LookupService('governorates', this.http);
  }
 }
