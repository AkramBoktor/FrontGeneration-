
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { ContractorData } from 'app/shared/models/contractor-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { ContractorDataService } from '../shared/contractor-data.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-contractor-data-edit',
  templateUrl: './contractor-data-edit.component.html',
  styleUrls: ['./contractor-data-edit.component.scss'],
  providers: []
})

export class ContractorDataEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedContractorData: ContractorData;
  contractorDataForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private supplierRecordTypesService: LookupService;
private sectionsOrCentersService: LookupService;

private supplierTypesService: LookupService;
private supplierClassificationsService: LookupService;

  
recordTypeSelectOptions: MaterialSelectOptions;
issuerOfTaxCardSelectOptions: MaterialSelectOptions;
issuerSelectOptions: MaterialSelectOptions;
resourceTypeSelectOptions: MaterialSelectOptions;
categorySelectOptions: MaterialSelectOptions;

  
	@ViewChild('recordType', { static: true }) RecordTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('issuerOfTaxCard', { static: true }) IssuerOfTaxCardSelectComponent: MaterialSelectComponent;
	@ViewChild('issuer', { static: true }) IssuerSelectComponent: MaterialSelectComponent;
	@ViewChild('resourceType', { static: true }) ResourceTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('category', { static: true }) CategorySelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedContractorDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<ContractorDataEditComponent>,
    public contractorDataService: ContractorDataService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedContractorData = new ContractorData();
    this.selectedContractorData = this.selectedContractorDataDialog.data || this.selectedContractorData;

    
	this.recordTypeSelectOptions = new MaterialSelectOptions({
	 data: this.supplierRecordTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع السجل',
	});

	this.issuerOfTaxCardSelectOptions = new MaterialSelectOptions({
	 data: this.sectionsOrCentersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'جهة اصدار البطاقة الضريبية',
	});

	this.issuerSelectOptions = new MaterialSelectOptions({
	 data: this.sectionsOrCentersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'جهة الاصدار',
	});

	this.resourceTypeSelectOptions = new MaterialSelectOptions({
	 data: this.supplierTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع المورد',
	});

	this.categorySelectOptions = new MaterialSelectOptions({
	 data: this.supplierClassificationsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'التصنيف',
	});


    this.contractorDataForm = this.formBuilder.group({
      
  id : [this.selectedContractorData.id],
  supplierCode : [this.selectedContractorData.supplierCode, [ Validators.required ]],
  constraintNumber : [this.selectedContractorData.constraintNumber, [ Validators.required ]],
  taxCardNumber : [this.selectedContractorData.taxCardNumber, [ Validators.required ]],
  managerCardCode : [this.selectedContractorData.managerCardCode, [ Validators.required ]],
  statement : [this.selectedContractorData.statement, [ Validators.required ]],
  phoneNumber : [this.selectedContractorData.phoneNumber, [ Validators.required ]],
  resourceAddress : [this.selectedContractorData.resourceAddress, [ Validators.required ]],
  administratorName : [this.selectedContractorData.administratorName, [ Validators.required ]],
  ownerName : [this.selectedContractorData.ownerName, [ Validators.required ]],
  companyName : [this.selectedContractorData.companyName, [ Validators.required ]],
  region : [this.selectedContractorData.region, [ Validators.required ]],
  blackList : [this.selectedContractorData.blackList, [ Validators.required ]],
  recordType : [this.selectedContractorData.recordType, [ Validators.required ]],
  issuerOfTaxCard : [this.selectedContractorData.issuerOfTaxCard, [ Validators.required ]],
  issuer : [this.selectedContractorData.issuer, [ Validators.required ]],
  resourceType : [this.selectedContractorData.resourceType, [ Validators.required ]],
  category : [this.selectedContractorData.category, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.contractorDataService.update(this.contractorDataForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.contractorDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.contractorDataForm.get(name);
  }

  initializeLookupServices() {
    this.supplierRecordTypesService = new LookupService('supplierrecordtypes', this.http);
this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
this.supplierTypesService = new LookupService('suppliertypes', this.http);
this.supplierClassificationsService = new LookupService('supplierclassifications', this.http);
  }
}
