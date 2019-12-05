
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { ContractorData } from 'app/shared/models/contractor-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ContractorDataService } from '../shared/contractor-data.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-contractor-data-new',
  templateUrl: './contractor-data-new.component.html',
  styleUrls: ['./contractor-data-new.component.scss'],
  providers: [
    ]
})

export class ContractorDataNewComponent extends AppBaseComponent implements OnInit {
  contractorDataForm: FormGroup;
  @Input() selectedContractorData: ContractorData;
  errorMessages: FormControlError[] = [
        
  ];

  private supplierClassificationsService: LookupService;
private supplierTypesService: LookupService;
private sectionsOrCentersService: LookupService;

private supplierRecordTypesService: LookupService;

  
categorySelectOptions: MaterialSelectOptions;
resourceTypeSelectOptions: MaterialSelectOptions;
issuerSelectOptions: MaterialSelectOptions;
issuerOfTaxCardSelectOptions: MaterialSelectOptions;
recordTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('category', { static: true }) CategorySelectComponent: MaterialSelectComponent;
	@ViewChild('resourceType', { static: true }) ResourceTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('issuer', { static: true }) IssuerSelectComponent: MaterialSelectComponent;
	@ViewChild('issuerOfTaxCard', { static: true }) IssuerOfTaxCardSelectComponent: MaterialSelectComponent;
	@ViewChild('recordType', { static: true }) RecordTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<ContractorDataNewComponent>,
    public contractorDataService: ContractorDataService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedContractorData = new ContractorData();

    
	this.categorySelectOptions = new MaterialSelectOptions({
	 data: this.supplierClassificationsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'التصنيف',
	});

	this.resourceTypeSelectOptions = new MaterialSelectOptions({
	 data: this.supplierTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع المورد',
	});

	this.issuerSelectOptions = new MaterialSelectOptions({
	 data: this.sectionsOrCentersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'جهة الاصدار',
	});

	this.issuerOfTaxCardSelectOptions = new MaterialSelectOptions({
	 data: this.sectionsOrCentersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'جهة اصدار البطاقة الضريبية',
	});

	this.recordTypeSelectOptions = new MaterialSelectOptions({
	 data: this.supplierRecordTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع السجل',
	});


    this.contractorDataForm = this.formBuilder.group({
     
  id : [0],
  supplierCode : [this.selectedContractorData.supplierCode, [ Validators.required ]],
  companyName : [this.selectedContractorData.companyName, [ Validators.required ]],
  ownerName : [this.selectedContractorData.ownerName, [ Validators.required ]],
  administratorName : [this.selectedContractorData.administratorName, [ Validators.required ]],
  resourceAddress : [this.selectedContractorData.resourceAddress, [ Validators.required ]],
  region : [this.selectedContractorData.region, [ Validators.required ]],
  phoneNumber : [this.selectedContractorData.phoneNumber, [ Validators.required ]],
  managerCardCode : [this.selectedContractorData.managerCardCode, [ Validators.required ]],
  taxCardNumber : [this.selectedContractorData.taxCardNumber, [ Validators.required ]],
  constraintNumber : [this.selectedContractorData.constraintNumber, [ Validators.required ]],
  statement : [this.selectedContractorData.statement, [ Validators.required ]],
  blackList : [this.selectedContractorData.blackList, [ Validators.required ]],
  category : [this.selectedContractorData.category, [ Validators.required ]],
  resourceType : [this.selectedContractorData.resourceType, [ Validators.required ]],
  issuer : [this.selectedContractorData.issuer, [ Validators.required ]],
  issuerOfTaxCard : [this.selectedContractorData.issuerOfTaxCard, [ Validators.required ]],
  recordType : [this.selectedContractorData.recordType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.contractorDataService.create(this.contractorDataForm.value)
        .pipe(switchMap(x => {
			return this.contractorDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.contractorDataForm.get(name);
    }

  initializeLookupServices() {
    this.supplierClassificationsService = new LookupService('supplierclassifications', this.http);
this.supplierTypesService = new LookupService('suppliertypes', this.http);
this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
this.supplierRecordTypesService = new LookupService('supplierrecordtypes', this.http);
  }
 }
