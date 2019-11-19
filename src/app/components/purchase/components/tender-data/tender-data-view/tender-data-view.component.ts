
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { TenderData } from 'app/shared/models/tender-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { TenderDataService } from '../shared/tender-data.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-tender-data-view',
  templateUrl: './tender-data-view.component.html',
  styleUrls: ['./tender-data-view.component.scss'],
  providers: []
})

export class TenderDataViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedTenderData: TenderData;
  tenderDataForm: FormGroup;

  private offeringTypesService: LookupService;
private paymentMethodsService: LookupService;
private taxDescriptionsService: LookupService;
private gearStatusesService: LookupService;

  
offeringTypeSelectOptions: MaterialSelectOptions;
paymentMethodSelectOptions: MaterialSelectOptions;
taxDescriptionSelectOptions: MaterialSelectOptions;
gearStatusSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedTenderDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<TenderDataViewComponent>,
    public tenderDataService: TenderDataService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTenderData = this.selectedTenderDataDialog.data || this.selectedTenderData;

    
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
      
  bidNumber : [this.selectedTenderData.bidNumber],
  project : [this.selectedTenderData.project],
  company : [this.selectedTenderData.company],
  insuranceValue : [this.selectedTenderData.insuranceValue],
  insuranceNumber : [this.selectedTenderData.insuranceNumber],
  assayValue : [this.selectedTenderData.assayValue],
  tenderTotalValue : [this.selectedTenderData.tenderTotalValue],
  tenderDurationinMonths : [this.selectedTenderData.tenderDurationinMonths],
  tenderDate : [this.selectedTenderData.tenderDate],
  awardValue : [this.selectedTenderData.awardValue],
  batchRatio : [this.selectedTenderData.batchRatio],
  tenderNumber : [this.selectedTenderData.tenderNumber],
  bounsRate : [this.selectedTenderData.bounsRate],
  valueAfterPractice : [this.selectedTenderData.valueAfterPractice],
  highestPriceValue : [this.selectedTenderData.highestPriceValue],
  lowestPriceValue : [this.selectedTenderData.lowestPriceValue],
  assumptions : [this.selectedTenderData.assumptions],
  offeringType : [this.selectedTenderData.offeringType],
  paymentMethod : [this.selectedTenderData.paymentMethod],
  taxDescription : [this.selectedTenderData.taxDescription],
  gearStatus : [this.selectedTenderData.gearStatus]
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
    return this.tenderDataForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.tenderDataForm.controls)) {
      this.tenderDataForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.paymentMethodsService = new LookupService('paymentmethods', this.http);
this.taxDescriptionsService = new LookupService('taxdescriptions', this.http);
this.gearStatusesService = new LookupService('gearstatuses', this.http);
  }
}

