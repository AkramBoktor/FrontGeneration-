
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { AssayItemsPrice } from 'app/shared/models/assay-items-price';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { AssayItemsPriceEditComponent } from '../assay-items-price-edit/assay-items-price-edit.component';
import { AssayItemsPriceNewComponent } from '../assay-items-price-new/assay-items-price-new.component';
import { AssayItemsPriceViewComponent } from '../assay-items-price-view/assay-items-price-view.component';
import { AssayItemsPriceService } from '../shared/assay-items-price.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-assay-items-price-list',
  templateUrl: './assay-items-price-list.component.html',
  styleUrls: ['./assay-items-price-list.component.scss'],
  providers: []
})

export class AssayItemsPriceListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private workTypesService: LookupService;

  
workTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('workType', { static: true }) WorkTypeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedAssayItemsPrice: AssayItemsPrice;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود البند', field: 'itemCode' }),
	new GridColumnOptions({ headerName: 'اسم البند', field: 'itemName' }),
	new GridColumnOptions({ headerName: 'سعر الوحدة', field: 'unitPrice' }),
	new GridColumnOptions({ headerName: 'الوحدة', field: 'unitCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: AssayItemsPriceViewComponent,
    editDialogClassType: AssayItemsPriceEditComponent,
    newDialogClassType: AssayItemsPriceNewComponent,
  });
    constructor(
        injector: Injector,
        public assayItemsPriceService: AssayItemsPriceService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedAssayItemsPrice = new AssayItemsPrice();

    
	this.workTypeSelectOptions = new MaterialSelectOptions({
	 data: this.workTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع العمل',
	});


    this.searchForm = this.formBuilder.group({
     	activityType : [],
	pricingYear : [],
	itemCode : [],
	workType : []
    });

     
  }

  getAssayItemsPricesPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<AssayItemsPrice[]> => {
    return this.assayItemsPriceService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.assayItemsPriceService.delete(param.data.id)
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
    this.workTypesService = new LookupService('worktypes', this.http);
  }
}

