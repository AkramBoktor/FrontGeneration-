
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { PriceForNewItem } from 'app/shared/models/price-for-new-item';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { PriceForNewItemEditComponent } from '../price-for-new-item-edit/price-for-new-item-edit.component';
import { PriceForNewItemNewComponent } from '../price-for-new-item-new/price-for-new-item-new.component';
import { PriceForNewItemViewComponent } from '../price-for-new-item-view/price-for-new-item-view.component';
import { PriceForNewItemService } from '../shared/price-for-new-item.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-price-for-new-item-list',
  templateUrl: './price-for-new-item-list.component.html',
  styleUrls: ['./price-for-new-item-list.component.scss'],
  providers: []
})

export class PriceForNewItemListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private constructionTypesService: LookupService;
private offeringTypesService: LookupService;
private workTypesService: LookupService;

  
constructionTypeSelectOptions: MaterialSelectOptions;
offeringTypeSelectOptions: MaterialSelectOptions;
workTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('workType', { static: true }) WorkTypeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedPriceForNewItem: PriceForNewItem;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'اسم البند', field: 'itemName' }),
	new GridColumnOptions({ headerName: 'السعر', field: 'price' }),
	new GridColumnOptions({ headerName: 'كود البند', field: 'itemCode' }),
	new GridColumnOptions({ headerName: 'الوحدة', field: 'unit' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: PriceForNewItemViewComponent,
    editDialogClassType: PriceForNewItemEditComponent,
    newDialogClassType: PriceForNewItemNewComponent,
  });
    constructor(
        injector: Injector,
        public priceForNewItemService: PriceForNewItemService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedPriceForNewItem = new PriceForNewItem();

    
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

	this.workTypeSelectOptions = new MaterialSelectOptions({
	 data: this.workTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع العمل',
	});


    this.searchForm = this.formBuilder.group({
     	buildingCode : [],
	requestSerial : [],
	planYear : [],
	bidNumber : [],
	activityType : [],
	subActivity : [],
	constructionType : [],
	offeringType : [],
	workType : []
    });

     
  }

  getPricesForNewItemsPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<PriceForNewItem[]> => {
    return this.priceForNewItemService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.priceForNewItemService.delete(param.data.id)
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
    this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.workTypesService = new LookupService('worktypes', this.http);
  }
}

