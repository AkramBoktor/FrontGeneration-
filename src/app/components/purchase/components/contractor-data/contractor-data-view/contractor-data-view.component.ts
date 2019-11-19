
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { ContractorData } from 'app/shared/models/contractor-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { ContractorDataService } from '../shared/contractor-data.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-contractor-data-view',
  templateUrl: './contractor-data-view.component.html',
  styleUrls: ['./contractor-data-view.component.scss'],
  providers: []
})

export class ContractorDataViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedContractorData: ContractorData;
  contractorDataForm: FormGroup;

  private supplierClassificationsService: LookupService;
private supplierTypesService: LookupService;
private sectionsOrCentersService: LookupService;
private supplierRecordTypesService: LookupService;

  
categorySelectOptions: MaterialSelectOptions;
resourceTypeSelectOptions: MaterialSelectOptions;
issuerSelectOptions: MaterialSelectOptions;
issuerOfTaxCardSelectOptions: MaterialSelectOptions;
recordTypeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedContractorDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<ContractorDataViewComponent>,
    public contractorDataService: ContractorDataService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedContractorData = this.selectedContractorDataDialog.data || this.selectedContractorData;

    
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
      
  supplierCode : [this.selectedContractorData.supplierCode],
  companyName : [this.selectedContractorData.companyName],
  ownerName : [this.selectedContractorData.ownerName],
  administratorName : [this.selectedContractorData.administratorName],
  resourceAddress : [this.selectedContractorData.resourceAddress],
  region : [this.selectedContractorData.region],
  phoneNumber : [this.selectedContractorData.phoneNumber],
  managerCardCode : [this.selectedContractorData.managerCardCode],
  taxCardNumber : [this.selectedContractorData.taxCardNumber],
  constraintNumber : [this.selectedContractorData.constraintNumber],
  statement : [this.selectedContractorData.statement],
  blackList : [this.selectedContractorData.blackList],
  category : [this.selectedContractorData.category],
  resourceType : [this.selectedContractorData.resourceType],
  issuer : [this.selectedContractorData.issuer],
  issuerOfTaxCard : [this.selectedContractorData.issuerOfTaxCard],
  recordType : [this.selectedContractorData.recordType]
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
    return this.contractorDataForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.contractorDataForm.controls)) {
      this.contractorDataForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.supplierClassificationsService = new LookupService('supplierclassifications', this.http);
this.supplierTypesService = new LookupService('suppliertypes', this.http);
this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
this.supplierRecordTypesService = new LookupService('supplierrecordtypes', this.http);
  }
}

