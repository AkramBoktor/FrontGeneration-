
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { ContractorPricesBuildingAssay } from 'app/shared/models/contractor-prices-building-assay';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ContractorPricesBuildingAssayEditComponent } from '../contractor-prices-building-assay-edit/contractor-prices-building-assay-edit.component';
import { ContractorPricesBuildingAssayNewComponent } from '../contractor-prices-building-assay-new/contractor-prices-building-assay-new.component';
import { ContractorPricesBuildingAssayViewComponent } from '../contractor-prices-building-assay-view/contractor-prices-building-assay-view.component';
import { ContractorPricesBuildingAssayService } from '../shared/contractor-prices-building-assay.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-contractor-prices-building-assay-list',
  templateUrl: './contractor-prices-building-assay-list.component.html',
  styleUrls: ['./contractor-prices-building-assay-list.component.scss'],
  providers: []
})

export class ContractorPricesBuildingAssayListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private itemCodesService: LookupService;
private constructionTypesService: LookupService;

  
itemCodeSelectOptions: MaterialSelectOptions;
constructionTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('itemCode', { static: true }) ItemCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedContractorPricesBuildingAssay: ContractorPricesBuildingAssay;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'اسم البند', field: 'itemName' }),
	new GridColumnOptions({ headerName: 'الكمية', field: 'amount' }),
	new GridColumnOptions({ headerName: 'السعر', field: 'price' }),
	new GridColumnOptions({ headerName: 'كود المبني', field: 'buildingCode' }),
	new GridColumnOptions({ headerName: 'كود الملحق', field: 'extensionCode' }),
	new GridColumnOptions({ headerName: 'كود النموذج', field: 'modelCode' }),
	new GridColumnOptions({ headerName: 'سنه الخطه', field: 'pLanYear' }),
	new GridColumnOptions({ headerName: 'سنه التسعير', field: 'priceYear' }),
	new GridColumnOptions({ headerName: 'كود البند', field: 'itemCode' }),
	new GridColumnOptions({ headerName: 'نوع الانشاء', field: 'constructionType' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: ContractorPricesBuildingAssayViewComponent,
    editDialogClassType: ContractorPricesBuildingAssayEditComponent,
    newDialogClassType: ContractorPricesBuildingAssayNewComponent,
  });
    constructor(
        injector: Injector,
        public contractorPricesBuildingAssayService: ContractorPricesBuildingAssayService) { 
        super(injector);
    }

  ngOnInit(): void {
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


    this.searchForm = this.formBuilder.group({
     	itemName : [],
	amount : [],
	price : [],
	buildingCode : [],
	extensionCode : [],
	modelCode : [],
	pLanYear : [],
	priceYear : [],
	itemCode : [],
	constructionType : []
    });

     
  }

  getContractorPricesBuildingAssayPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<ContractorPricesBuildingAssay[]> => {
    return this.contractorPricesBuildingAssayService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.contractorPricesBuildingAssayService.delete(param.data.id)
      .pipe(take(1))
      .subscribe(() => this.grid.refreshData());
  }

  onBeginSearch(): void {
    this.grid.beginSearch(this.searchForm.value);
  }

  onCreate(): void {
    this.router.navigate(['new'], {relativeTo: this.activatedRoute});
  }

  getControls(name: string) {
    return this.searchForm.get(name);
  }

  initializeLookupServices() {
    this.itemCodesService = new LookupService('itemcodes', this.http);
this.constructionTypesService = new LookupService('constructiontypes', this.http);
  }
}

