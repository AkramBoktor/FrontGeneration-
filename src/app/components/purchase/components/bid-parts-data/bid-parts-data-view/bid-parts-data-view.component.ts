
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { BidPartsData } from 'app/shared/models/bid-parts-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { BidPartsDataService } from '../shared/bid-parts-data.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-bid-parts-data-view',
  templateUrl: './bid-parts-data-view.component.html',
  styleUrls: ['./bid-parts-data-view.component.scss'],
  providers: []
})

export class BidPartsDataViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedBidPartsData: BidPartsData;
  bidPartsDataForm: FormGroup;

  private buildingTypesService: LookupService;
private offeringTypesService: LookupService;
private maintenanceStatusesService: LookupService;
private constructionTypesService: LookupService;
private paymentMethodsService: LookupService;
private governoratesService: LookupService;

  
buildingTypeSelectOptions: MaterialSelectOptions;
offeringTypeSelectOptions: MaterialSelectOptions;
maintenanceStatusSelectOptions: MaterialSelectOptions;
constructionTypeSelectOptions: MaterialSelectOptions;
paymentMethodSelectOptions: MaterialSelectOptions;
governorateSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedBidPartsDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<BidPartsDataViewComponent>,
    public bidPartsDataService: BidPartsDataService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedBidPartsData = this.selectedBidPartsDataDialog.data || this.selectedBidPartsData;

    
	this.buildingTypeSelectOptions = new MaterialSelectOptions({
	 data: this.buildingTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع المبنى',
	});

	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});

	this.maintenanceStatusSelectOptions = new MaterialSelectOptions({
	 data: this.maintenanceStatusesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حالة الصيانة',
	});

	this.constructionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.constructionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الانشاء',
	});

	this.paymentMethodSelectOptions = new MaterialSelectOptions({
	 data: this.paymentMethodsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'طريقة السداد',
	});

	this.governorateSelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المحافظة',
	});


    this.bidPartsDataForm = this.formBuilder.group({
      
  bidNumber : [this.selectedBidPartsData.bidNumber],
  project : [this.selectedBidPartsData.project],
  projectName : [this.selectedBidPartsData.projectName],
  examinationCommitteeDate : [this.selectedBidPartsData.examinationCommitteeDate],
  referenceDate : [this.selectedBidPartsData.referenceDate],
  openingEnvelopesDate : [this.selectedBidPartsData.openingEnvelopesDate],
  siteDeliveryDate : [this.selectedBidPartsData.siteDeliveryDate],
  supplierNumber : [this.selectedBidPartsData.supplierNumber],
  implementationDurationOrSupply : [this.selectedBidPartsData.implementationDurationOrSupply],
  bidRequirementsValue : [this.selectedBidPartsData.bidRequirementsValue],
  taxDescription : [this.selectedBidPartsData.taxDescription],
  assayValue : [this.selectedBidPartsData.assayValue],
  contractualValue : [this.selectedBidPartsData.contractualValue],
  awardBonus : [this.selectedBidPartsData.awardBonus],
  outgoingPayment : [this.selectedBidPartsData.outgoingPayment],
  finalInsurance : [this.selectedBidPartsData.finalInsurance],
  projectState : [this.selectedBidPartsData.projectState],
  primaryReceipDate : [this.selectedBidPartsData.primaryReceipDate],
  finalReceiptDate : [this.selectedBidPartsData.finalReceiptDate],
  buildingType : [this.selectedBidPartsData.buildingType],
  offeringType : [this.selectedBidPartsData.offeringType],
  maintenanceStatus : [this.selectedBidPartsData.maintenanceStatus],
  constructionType : [this.selectedBidPartsData.constructionType],
  paymentMethod : [this.selectedBidPartsData.paymentMethod],
  governorate : [this.selectedBidPartsData.governorate]
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
    return this.bidPartsDataForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.bidPartsDataForm.controls)) {
      this.bidPartsDataForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.buildingTypesService = new LookupService('buildingtypes', this.http);
this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.maintenanceStatusesService = new LookupService('maintenancestatuses', this.http);
this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.paymentMethodsService = new LookupService('paymentmethods', this.http);
this.governoratesService = new LookupService('governorates', this.http);
  }
}

