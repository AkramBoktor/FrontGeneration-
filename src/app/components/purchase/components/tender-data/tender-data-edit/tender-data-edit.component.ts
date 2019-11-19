
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { TenderData } from 'app/shared/models/tender-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { TenderDataService } from '../shared/tender-data.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-tender-data-edit',
  templateUrl: './tender-data-edit.component.html',
  styleUrls: ['./tender-data-edit.component.scss'],
  providers: []
})

export class TenderDataEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedTenderData: TenderData;
  tenderDataForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private offeringTypesService: LookupService;
private gearStatusesService: LookupService;
private taxDescriptionsService: LookupService;
private paymentMethodsService: LookupService;

  
offeringTypeSelectOptions: MaterialSelectOptions;
gearStatusSelectOptions: MaterialSelectOptions;
taxDescriptionSelectOptions: MaterialSelectOptions;
paymentMethodSelectOptions: MaterialSelectOptions;

  
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('gearStatus', { static: true }) GearStatusSelectComponent: MaterialSelectComponent;
	@ViewChild('taxDescription', { static: true }) TaxDescriptionSelectComponent: MaterialSelectComponent;
	@ViewChild('paymentMethod', { static: true }) PaymentMethodSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedTenderDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<TenderDataEditComponent>,
    public tenderDataService: TenderDataService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTenderData = new TenderData();
    this.selectedTenderData = this.selectedTenderDataDialog.data || this.selectedTenderData;

    
	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});

	this.gearStatusSelectOptions = new MaterialSelectOptions({
	 data: this.gearStatusesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حالة الترسية',
	});

	this.taxDescriptionSelectOptions = new MaterialSelectOptions({
	 data: this.taxDescriptionsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'توصيف الضريبة',
	});

	this.paymentMethodSelectOptions = new MaterialSelectOptions({
	 data: this.paymentMethodsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'طريقة السداد',
	});


    this.tenderDataForm = this.formBuilder.group({
      
  id : [this.selectedTenderData.id],
  highestPriceValue : [this.selectedTenderData.highestPriceValue, [ Validators.required ]],
  valueAfterPractice : [this.selectedTenderData.valueAfterPractice, [ Validators.required ]],
  bounsRate : [this.selectedTenderData.bounsRate, [ Validators.required ]],
  tenderNumber : [this.selectedTenderData.tenderNumber, [ Validators.required ]],
  batchRatio : [this.selectedTenderData.batchRatio, [ Validators.required ]],
  awardValue : [this.selectedTenderData.awardValue, [ Validators.required ]],
  tenderDate : [this.selectedTenderData.tenderDate, [ ]],
  tenderDurationinMonths : [this.selectedTenderData.tenderDurationinMonths, [ Validators.required ]],
  tenderTotalValue : [this.selectedTenderData.tenderTotalValue, [ Validators.required ]],
  assayValue : [this.selectedTenderData.assayValue, [ Validators.required ]],
  insuranceNumber : [this.selectedTenderData.insuranceNumber, [ Validators.required ]],
  insuranceValue : [this.selectedTenderData.insuranceValue, [ Validators.required ]],
  company : [this.selectedTenderData.company, [ Validators.required ]],
  project : [this.selectedTenderData.project, [ Validators.required ]],
  bidNumber : [this.selectedTenderData.bidNumber, [ Validators.required ]],
  lowestPriceValue : [this.selectedTenderData.lowestPriceValue, [ Validators.required ]],
  assumptions : [this.selectedTenderData.assumptions, [ Validators.required ]],
  offeringType : [this.selectedTenderData.offeringType, [ Validators.required ]],
  gearStatus : [this.selectedTenderData.gearStatus, [ Validators.required ]],
  taxDescription : [this.selectedTenderData.taxDescription, [ Validators.required ]],
  paymentMethod : [this.selectedTenderData.paymentMethod, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.tenderDataService.update(this.tenderDataForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.tenderDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.tenderDataForm.get(name);
  }

  initializeLookupServices() {
    this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.gearStatusesService = new LookupService('gearstatuses', this.http);
this.taxDescriptionsService = new LookupService('taxdescriptions', this.http);
this.paymentMethodsService = new LookupService('paymentmethods', this.http);
  }
}
