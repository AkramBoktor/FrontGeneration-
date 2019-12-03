
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { ContractorPricesBuildingAssay } from 'app/shared/models/contractor-prices-building-assay';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { ContractorPricesBuildingAssayService } from '../shared/contractor-prices-building-assay.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-contractor-prices-building-assay-edit',
  templateUrl: './contractor-prices-building-assay-edit.component.html',
  styleUrls: ['./contractor-prices-building-assay-edit.component.scss'],
  providers: []
})

export class ContractorPricesBuildingAssayEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedContractorPricesBuildingAssay: ContractorPricesBuildingAssay;
  contractorPricesBuildingAssayForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private itemCodesService: LookupService;
private constructionTypesService: LookupService;

  
itemCodeSelectOptions: MaterialSelectOptions;
constructionTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('itemCode', { static: true }) ItemCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedContractorPricesBuildingAssayDialog: any,
    @Optional() public dialogRef: MatDialogRef<ContractorPricesBuildingAssayEditComponent>,
    public contractorPricesBuildingAssayService: ContractorPricesBuildingAssayService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedContractorPricesBuildingAssay = new ContractorPricesBuildingAssay();
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
      
  id : [this.selectedContractorPricesBuildingAssay.id],
  itemName : [this.selectedContractorPricesBuildingAssay.itemName, [ Validators.required ]],
  amount : [this.selectedContractorPricesBuildingAssay.amount, [ Validators.required ]],
  price : [this.selectedContractorPricesBuildingAssay.price, [ Validators.required ]],
  buildingCode : [this.selectedContractorPricesBuildingAssay.buildingCode, [ Validators.required ]],
  extensionCode : [this.selectedContractorPricesBuildingAssay.extensionCode, [ Validators.required ]],
  modelCode : [this.selectedContractorPricesBuildingAssay.modelCode, [ ]],
  pLanYear : [this.selectedContractorPricesBuildingAssay.pLanYear, [ Validators.required ]],
  priceYear : [this.selectedContractorPricesBuildingAssay.priceYear, [ Validators.required ]],
  itemCode : [this.selectedContractorPricesBuildingAssay.itemCode, [ Validators.required ]],
  constructionType : [this.selectedContractorPricesBuildingAssay.constructionType, [ ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.contractorPricesBuildingAssayService.update(this.contractorPricesBuildingAssayForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.contractorPricesBuildingAssayService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.contractorPricesBuildingAssayForm.get(name);
  }

  initializeLookupServices() {
    this.itemCodesService = new LookupService('itemcodes', this.http);
this.constructionTypesService = new LookupService('constructiontypes', this.http);
  }
}
