
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { TenderData } from 'app/shared/models/tender-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { TenderDataService } from '../shared/tender-data.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-tender-data-new',
  templateUrl: './tender-data-new.component.html',
  styleUrls: ['./tender-data-new.component.scss'],
  providers: [
    ]
})

export class TenderDataNewComponent extends AppBaseComponent implements OnInit {
  tenderDataForm: FormGroup;
  @Input() selectedTenderData: TenderData;
  errorMessages: FormControlError[] = [
        
  ];

  private offeringTypesService: LookupService;
private paymentMethodsService: LookupService;
private taxDescriptionsService: LookupService;
private gearStatusesService: LookupService;

  
offeringTypeSelectOptions: MaterialSelectOptions;
paymentMethodSelectOptions: MaterialSelectOptions;
taxDescriptionSelectOptions: MaterialSelectOptions;
gearStatusSelectOptions: MaterialSelectOptions;

  
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('paymentMethod', { static: true }) PaymentMethodSelectComponent: MaterialSelectComponent;
	@ViewChild('taxDescription', { static: true }) TaxDescriptionSelectComponent: MaterialSelectComponent;
	@ViewChild('gearStatus', { static: true }) GearStatusSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<TenderDataNewComponent>,
    public tenderDataService: TenderDataService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTenderData = new TenderData();

    
	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});

	this.paymentMethodSelectOptions = new MaterialSelectOptions({
	 data: this.paymentMethodsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'طريقة السداد',
	});

	this.taxDescriptionSelectOptions = new MaterialSelectOptions({
	 data: this.taxDescriptionsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'توصيف الضريبة',
	});

	this.gearStatusSelectOptions = new MaterialSelectOptions({
	 data: this.gearStatusesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حالة الترسية',
	});


    this.tenderDataForm = this.formBuilder.group({
     
  id : [0],
  bidNumber : [this.selectedTenderData.bidNumber, [ Validators.required ]],
  project : [this.selectedTenderData.project, [ Validators.required ]],
  company : [this.selectedTenderData.company, [ Validators.required ]],
  insuranceValue : [this.selectedTenderData.insuranceValue, [ Validators.required ]],
  insuranceNumber : [this.selectedTenderData.insuranceNumber, [ Validators.required ]],
  assayValue : [this.selectedTenderData.assayValue, [ Validators.required ]],
  tenderTotalValue : [this.selectedTenderData.tenderTotalValue, [ Validators.required ]],
  tenderDurationinMonths : [this.selectedTenderData.tenderDurationinMonths, [ Validators.required ]],
  tenderDate : [this.selectedTenderData.tenderDate, [ ]],
  awardValue : [this.selectedTenderData.awardValue, [ Validators.required ]],
  batchRatio : [this.selectedTenderData.batchRatio, [ Validators.required ]],
  tenderNumber : [this.selectedTenderData.tenderNumber, [ Validators.required ]],
  bounsRate : [this.selectedTenderData.bounsRate, [ Validators.required ]],
  valueAfterPractice : [this.selectedTenderData.valueAfterPractice, [ Validators.required ]],
  highestPriceValue : [this.selectedTenderData.highestPriceValue, [ Validators.required ]],
  lowestPriceValue : [this.selectedTenderData.lowestPriceValue, [ Validators.required ]],
  assumptions : [this.selectedTenderData.assumptions, [ Validators.required ]],
  offeringType : [this.selectedTenderData.offeringType, [ Validators.required ]],
  paymentMethod : [this.selectedTenderData.paymentMethod, [ Validators.required ]],
  taxDescription : [this.selectedTenderData.taxDescription, [ Validators.required ]],
  gearStatus : [this.selectedTenderData.gearStatus, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.tenderDataService.create(this.tenderDataForm.value)
        .pipe(switchMap(x => {
			return this.tenderDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.tenderDataForm.get(name);
    }

  initializeLookupServices() {
    this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.paymentMethodsService = new LookupService('paymentmethods', this.http);
this.taxDescriptionsService = new LookupService('taxdescriptions', this.http);
this.gearStatusesService = new LookupService('gearstatuses', this.http);
  }
 }
