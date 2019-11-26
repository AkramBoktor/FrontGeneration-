
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { ContractorPricesBuildingAssay } from 'app/shared/models/contractor-prices-building-assay';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ContractorPricesBuildingAssayService } from '../shared/contractor-prices-building-assay.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-contractor-prices-building-assay-new',
  templateUrl: './contractor-prices-building-assay-new.component.html',
  styleUrls: ['./contractor-prices-building-assay-new.component.scss'],
  providers: [
    ]
})

export class ContractorPricesBuildingAssayNewComponent extends AppBaseComponent implements OnInit {
  contractorPricesBuildingAssayForm: FormGroup;
  @Input() selectedContractorPricesBuildingAssay: ContractorPricesBuildingAssay;
  errorMessages: FormControlError[] = [
        
  ];

  private itemCodesService: LookupService;
private constructionTypesService: LookupService;

  
itemCodeSelectOptions: MaterialSelectOptions;
constructionTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('itemCode', { static: true }) ItemCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<ContractorPricesBuildingAssayNewComponent>,
    public contractorPricesBuildingAssayService: ContractorPricesBuildingAssayService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedContractorPricesBuildingAssay = new ContractorPricesBuildingAssay();

    
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
     
  id : [0],
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
    this.contractorPricesBuildingAssayService.create(this.contractorPricesBuildingAssayForm.value)
        .pipe(switchMap(x => {
			return this.contractorPricesBuildingAssayService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.contractorPricesBuildingAssayForm.get(name);
    }

  initializeLookupServices() {
    this.itemCodesService = new LookupService('itemcodes', this.http);
this.constructionTypesService = new LookupService('constructiontypes', this.http);
  }
 }
