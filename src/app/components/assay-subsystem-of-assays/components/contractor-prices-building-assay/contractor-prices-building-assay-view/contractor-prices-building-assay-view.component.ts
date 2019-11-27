
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { ContractorPricesBuildingAssay } from 'app/shared/models/contractor-prices-building-assay';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { ContractorPricesBuildingAssayService } from '../shared/contractor-prices-building-assay.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-contractor-prices-building-assay-view',
  templateUrl: './contractor-prices-building-assay-view.component.html',
  styleUrls: ['./contractor-prices-building-assay-view.component.scss'],
  providers: []
})

export class ContractorPricesBuildingAssayViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedContractorPricesBuildingAssay: ContractorPricesBuildingAssay;
  contractorPricesBuildingAssayForm: FormGroup;

  private itemCodesService: LookupService;
private constructionTypesService: LookupService;

  
itemCodeSelectOptions: MaterialSelectOptions;
constructionTypeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedContractorPricesBuildingAssayDialog: any,
    @Optional() public dialogRef: MatDialogRef<ContractorPricesBuildingAssayViewComponent>,
    public contractorPricesBuildingAssayService: ContractorPricesBuildingAssayService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedContractorPricesBuildingAssay = this.selectedContractorPricesBuildingAssayDialog.data || this.selectedContractorPricesBuildingAssay;

    
	this.itemCodeSelectOptions = new MaterialSelectOptions({
	 data: this.itemCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود البند',
	});

	this.constructionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.constructionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الانشاء',
	});


    this.contractorPricesBuildingAssayForm = this.formBuilder.group({
      
  itemName : [this.selectedContractorPricesBuildingAssay.itemName],
  amount : [this.selectedContractorPricesBuildingAssay.amount],
  price : [this.selectedContractorPricesBuildingAssay.price],
  buildingCode : [this.selectedContractorPricesBuildingAssay.buildingCode],
  extensionCode : [this.selectedContractorPricesBuildingAssay.extensionCode],
  modelCode : [this.selectedContractorPricesBuildingAssay.modelCode],
  pLanYear : [this.selectedContractorPricesBuildingAssay.pLanYear],
  priceYear : [this.selectedContractorPricesBuildingAssay.priceYear],
  itemCode : [this.selectedContractorPricesBuildingAssay.itemCode],
  constructionType : [this.selectedContractorPricesBuildingAssay.constructionType]
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
    return this.contractorPricesBuildingAssayForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.contractorPricesBuildingAssayForm.controls)) {
      this.contractorPricesBuildingAssayForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.itemCodesService = new LookupService('itemcodes', this.http);
this.constructionTypesService = new LookupService('constructiontypes', this.http);
  }
}

