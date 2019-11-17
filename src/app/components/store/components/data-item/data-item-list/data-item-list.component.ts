
import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { GridColumnOptions, GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { FormControlError, GridPaginatedSortedFiltered } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { DataItem } from 'app/shared/models/data-item';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { DataItemEditComponent } from '../data-item-edit/data-item-edit.component';
import { DataItemNewComponent } from '../data-item-new/data-item-new.component';
import { DataItemViewComponent } from '../data-item-view/data-item-view.component';
import { DataItemService } from '../shared/data-item.service';

@Component({
  selector: 'app-data-item-list',
  templateUrl: './data-item-list.component.html',
  styleUrls: ['./data-item-list.component.scss'],
  providers: []
})

export class DataItemListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private numberTypesService: LookupService;
private itemTypesService: LookupService;
private itemStatusesService: LookupService;
private measurementUnitsService: LookupService;

  
numberTypeSelectOptions: MaterialSelectOptions;
productTypeSelectOptions: MaterialSelectOptions;
itemConditionSelectOptions: MaterialSelectOptions;
unitSelectOptions: MaterialSelectOptions;

  
	@ViewChild('numberType', { static: true }) NumberTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('productType', { static: true }) ProductTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('itemCondition', { static: true }) ItemConditionSelectComponent: MaterialSelectComponent;
	@ViewChild('unit', { static: true }) UnitSelectComponent: MaterialSelectComponent;

  
  @Input() selectedDataItem: DataItem;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم الصنف', field: 'itemNumber' }),
	new GridColumnOptions({ headerName: 'اسم الصنف', field: 'productName' }),
	new GridColumnOptions({ headerName: 'سعر الوحده', field: 'unitpPrice' }),
	new GridColumnOptions({ headerName: 'حدد الطلب', field: 'selectOrder' }),
	new GridColumnOptions({ headerName: '  الحد الادني', field: 'minimum' }),
	new GridColumnOptions({ headerName: 'العمر الافتراض للصنف المستديم', field: 'assumedLifetime' }),
	new GridColumnOptions({ headerName: '(نوع الرقم (هيئة – معمول ب   ', field: 'numberType' }),
	new GridColumnOptions({ headerName: 'نوع الصنف ', field: 'productType' }),
	new GridColumnOptions({ headerName: 'حاله الصنف ', field: 'itemCondition' }),
	new GridColumnOptions({ headerName: 'الوحدة ', field: 'unit' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: DataItemViewComponent,
    editDialogClassType: DataItemEditComponent,
    newDialogClassType: DataItemNewComponent,
  });
    constructor(
        injector: Injector,
        public dataItemService: DataItemService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedDataItem = new DataItem();

    
	this.numberTypeSelectOptions = new MaterialSelectOptions({
	 data: this.numberTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: '(نوع الرقم (هيئة – معمول ب   ',
	});

	this.productTypeSelectOptions = new MaterialSelectOptions({
	 data: this.itemTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الصنف ',
	});

	this.itemConditionSelectOptions = new MaterialSelectOptions({
	 data: this.itemStatusesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حاله الصنف ',
	});

	this.unitSelectOptions = new MaterialSelectOptions({
	 data: this.measurementUnitsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الوحدة ',
	});


    this.searchForm = this.formBuilder.group({
     	itemNumber : [],
	productName : [],
	unitpPrice : [],
	selectOrder : [],
	minimum : [],
	assumedLifetime : [],
	numberType : [],
	productType : [],
	itemCondition : [],
	unit : []
    });

     
  }

  getDataItemPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<DataItem[]> => {
    return this.dataItemService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.dataItemService.delete(param.data.id)
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
    this.numberTypesService = new LookupService('numbertypes', this.http);
this.itemTypesService = new LookupService('itemtypes', this.http);
this.itemStatusesService = new LookupService('itemstatuses', this.http);
this.measurementUnitsService = new LookupService('measurementunits', this.http);
  }
}

