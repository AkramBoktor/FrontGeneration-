
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { BidPartsData } from 'app/shared/models/bid-parts-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { BidPartsDataService } from '../shared/bid-parts-data.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-bid-parts-data-edit',
  templateUrl: './bid-parts-data-edit.component.html',
  styleUrls: ['./bid-parts-data-edit.component.scss'],
  providers: []
})

export class BidPartsDataEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedBidPartsData: BidPartsData;
  bidPartsDataForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private buildingTypesService: LookupService;
private constructionTypesService: LookupService;
private offeringTypesService: LookupService;
private maintenanceStatusesService: LookupService;
private governoratesService: LookupService;

  
buildingTypeSelectOptions: MaterialSelectOptions;
constructionTypeSelectOptions: MaterialSelectOptions;
offeringTypeSelectOptions: MaterialSelectOptions;
maintenanceStatusSelectOptions: MaterialSelectOptions;
governorateSelectOptions: MaterialSelectOptions;

  
	@ViewChild('buildingType', { static: true }) BuildingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('maintenanceStatus', { static: true }) MaintenanceStatusSelectComponent: MaterialSelectComponent;
	@ViewChild('governorate', { static: true }) GovernorateSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedBidPartsDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<BidPartsDataEditComponent>,
    public bidPartsDataService: BidPartsDataService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedBidPartsData = new BidPartsData();
    this.selectedBidPartsData = this.selectedBidPartsDataDialog.data || this.selectedBidPartsData;

    
	this.buildingTypeSelectOptions = new MaterialSelectOptions({
	 data: this.buildingTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع المبنى',
	});

	this.constructionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.constructionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الانشاء',
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

	this.governorateSelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المحافظة',
	});


    this.bidPartsDataForm = this.formBuilder.group({
      
  id : [this.selectedBidPartsData.id],
  primaryReceipDate : [this.selectedBidPartsData.primaryReceipDate, [ ]],
  projectState : [this.selectedBidPartsData.projectState, [ ]],
  finalInsurance : [this.selectedBidPartsData.finalInsurance, [ ]],
  paymentMethod : [this.selectedBidPartsData.paymentMethod, [ ]],
  outgoingPayment : [this.selectedBidPartsData.outgoingPayment, [ ]],
  awardBonus : [this.selectedBidPartsData.awardBonus, [ ]],
  contractualValue : [this.selectedBidPartsData.contractualValue, [ ]],
  assayValue : [this.selectedBidPartsData.assayValue, [ Validators.required ]],
  taxDescription : [this.selectedBidPartsData.taxDescription, [ ]],
  finalReceiptDate : [this.selectedBidPartsData.finalReceiptDate, [ ]],
  bidRequirementsValue : [this.selectedBidPartsData.bidRequirementsValue, [ Validators.required ]],
  implementationDurationOrSupply : [this.selectedBidPartsData.implementationDurationOrSupply, [ Validators.required ]],
  supplierNumber : [this.selectedBidPartsData.supplierNumber, [ ]],
  siteDeliveryDate : [this.selectedBidPartsData.siteDeliveryDate, [ ]],
  openingEnvelopesDate : [this.selectedBidPartsData.openingEnvelopesDate, [ ]],
  referenceDate : [this.selectedBidPartsData.referenceDate, [ ]],
  examinationCommitteeDate : [this.selectedBidPartsData.examinationCommitteeDate, [ ]],
  projectName : [this.selectedBidPartsData.projectName, [ ]],
  project : [this.selectedBidPartsData.project, [ Validators.required ]],
  bidNumber : [this.selectedBidPartsData.bidNumber, [ Validators.required ]],
  buildingType : [this.selectedBidPartsData.buildingType, [ Validators.required ]],
  constructionType : [this.selectedBidPartsData.constructionType, [ Validators.required ]],
  offeringType : [this.selectedBidPartsData.offeringType, [ Validators.required ]],
  maintenanceStatus : [this.selectedBidPartsData.maintenanceStatus, [ Validators.required ]],
  governorate : [this.selectedBidPartsData.governorate, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.bidPartsDataService.update(this.bidPartsDataForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.bidPartsDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.bidPartsDataForm.get(name);
  }

  initializeLookupServices() {
    this.buildingTypesService = new LookupService('buildingtypes', this.http);
this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.maintenanceStatusesService = new LookupService('maintenancestatuses', this.http);
this.governoratesService = new LookupService('governorates', this.http);
  }
}
