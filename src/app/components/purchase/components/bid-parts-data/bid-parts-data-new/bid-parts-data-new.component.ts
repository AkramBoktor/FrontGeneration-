
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { BidPartsData } from 'app/shared/models/bid-parts-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { BidPartsDataService } from '../shared/bid-parts-data.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-bid-parts-data-new',
  templateUrl: './bid-parts-data-new.component.html',
  styleUrls: ['./bid-parts-data-new.component.scss'],
  providers: [
    ]
})

export class BidPartsDataNewComponent extends AppBaseComponent implements OnInit {
  bidPartsDataForm: FormGroup;
  @Input() selectedBidPartsData: BidPartsData;
  errorMessages: FormControlError[] = [
        
  ];

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

  
	@ViewChild('buildingType', { static: true }) BuildingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('maintenanceStatus', { static: true }) MaintenanceStatusSelectComponent: MaterialSelectComponent;
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('paymentMethod', { static: true }) PaymentMethodSelectComponent: MaterialSelectComponent;
	@ViewChild('governorate', { static: true }) GovernorateSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<BidPartsDataNewComponent>,
    public bidPartsDataService: BidPartsDataService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedBidPartsData = new BidPartsData();

    
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
     
  id : [0],
  bidNumber : [this.selectedBidPartsData.bidNumber, [ Validators.required ]],
  project : [this.selectedBidPartsData.project, [ Validators.required ]],
  projectName : [this.selectedBidPartsData.projectName, [ ]],
  examinationCommitteeDate : [this.selectedBidPartsData.examinationCommitteeDate, [ ]],
  referenceDate : [this.selectedBidPartsData.referenceDate, [ ]],
  openingEnvelopesDate : [this.selectedBidPartsData.openingEnvelopesDate, [ ]],
  siteDeliveryDate : [this.selectedBidPartsData.siteDeliveryDate, [ ]],
  supplierNumber : [this.selectedBidPartsData.supplierNumber, [ ]],
  implementationDurationOrSupply : [this.selectedBidPartsData.implementationDurationOrSupply, [ Validators.required ]],
  bidRequirementsValue : [this.selectedBidPartsData.bidRequirementsValue, [ Validators.required ]],
  taxDescription : [this.selectedBidPartsData.taxDescription, [ ]],
  assayValue : [this.selectedBidPartsData.assayValue, [ Validators.required ]],
  contractualValue : [this.selectedBidPartsData.contractualValue, [ ]],
  awardBonus : [this.selectedBidPartsData.awardBonus, [ ]],
  outgoingPayment : [this.selectedBidPartsData.outgoingPayment, [ ]],
  finalInsurance : [this.selectedBidPartsData.finalInsurance, [ ]],
  projectState : [this.selectedBidPartsData.projectState, [ ]],
  primaryReceipDate : [this.selectedBidPartsData.primaryReceipDate, [ ]],
  finalReceiptDate : [this.selectedBidPartsData.finalReceiptDate, [ ]],
  buildingType : [this.selectedBidPartsData.buildingType, [ Validators.required ]],
  offeringType : [this.selectedBidPartsData.offeringType, [ Validators.required ]],
  maintenanceStatus : [this.selectedBidPartsData.maintenanceStatus, [ Validators.required ]],
  constructionType : [this.selectedBidPartsData.constructionType, [ Validators.required ]],
  paymentMethod : [this.selectedBidPartsData.paymentMethod, [ ]],
  governorate : [this.selectedBidPartsData.governorate, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.bidPartsDataService.create(this.bidPartsDataForm.value)
        .pipe(switchMap(x => {
			return this.bidPartsDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.bidPartsDataForm.get(name);
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
