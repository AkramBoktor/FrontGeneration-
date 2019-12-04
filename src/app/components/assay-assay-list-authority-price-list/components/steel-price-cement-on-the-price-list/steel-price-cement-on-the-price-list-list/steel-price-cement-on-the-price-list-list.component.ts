
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { SteelPriceCementOnThePriceList } from 'app/shared/models/steel-price-cement-on-the-price-list';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { SteelPriceCementOnThePriceListEditComponent } from '../steel-price-cement-on-the-price-list-edit/steel-price-cement-on-the-price-list-edit.component';
import { SteelPriceCementOnThePriceListNewComponent } from '../steel-price-cement-on-the-price-list-new/steel-price-cement-on-the-price-list-new.component';
import { SteelPriceCementOnThePriceListViewComponent } from '../steel-price-cement-on-the-price-list-view/steel-price-cement-on-the-price-list-view.component';
import { SteelPriceCementOnThePriceListService } from '../shared/steel-price-cement-on-the-price-list.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-steel-price-cement-on-the-price-list-list',
  templateUrl: './steel-price-cement-on-the-price-list-list.component.html',
  styleUrls: ['./steel-price-cement-on-the-price-list-list.component.scss'],
  providers: []
})

export class SteelPriceCementOnThePriceListListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private materialTypesService: LookupService;

  
materialTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('materialType', { static: true }) MaterialTypeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedSteelPriceCementOnThePriceList: SteelPriceCementOnThePriceList;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'سنة التسعير', field: 'pricingYear' }),
	new GridColumnOptions({ headerName: 'السعر', field: 'price' }),
	new GridColumnOptions({ headerName: 'نوع المادة', field: 'materialType' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: SteelPriceCementOnThePriceListViewComponent,
    editDialogClassType: SteelPriceCementOnThePriceListEditComponent,
    newDialogClassType: SteelPriceCementOnThePriceListNewComponent,
  });
    constructor(
        injector: Injector,
        public steelPriceCementOnThePriceListService: SteelPriceCementOnThePriceListService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedSteelPriceCementOnThePriceList = new SteelPriceCementOnThePriceList();

    
	this.materialTypeSelectOptions = new MaterialSelectOptions({
	 data: this.materialTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع المادة',
	});


    this.searchForm = this.formBuilder.group({
     	pricingYear : [],
	price : [],
	materialType : []
    });

     
  }

  getSteelPricesCementOnThePriceListPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<SteelPriceCementOnThePriceList[]> => {
    return this.steelPriceCementOnThePriceListService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.steelPriceCementOnThePriceListService.delete(param.data.id)
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
    this.materialTypesService = new LookupService('materialtypes', this.http);
  }
}

