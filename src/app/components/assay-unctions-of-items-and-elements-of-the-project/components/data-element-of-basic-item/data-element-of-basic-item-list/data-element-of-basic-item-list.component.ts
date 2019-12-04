
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { DataElementOfBasicItem } from 'app/shared/models/data-element-of-basic-item';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { DataElementOfBasicItemEditComponent } from '../data-element-of-basic-item-edit/data-element-of-basic-item-edit.component';
import { DataElementOfBasicItemNewComponent } from '../data-element-of-basic-item-new/data-element-of-basic-item-new.component';
import { DataElementOfBasicItemViewComponent } from '../data-element-of-basic-item-view/data-element-of-basic-item-view.component';
import { DataElementOfBasicItemService } from '../shared/data-element-of-basic-item.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-data-element-of-basic-item-list',
  templateUrl: './data-element-of-basic-item-list.component.html',
  styleUrls: ['./data-element-of-basic-item-list.component.scss'],
  providers: []
})

export class DataElementOfBasicItemListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private groupCodesService: LookupService;
private pricingTypesService: LookupService;
private measurementUnitsService: LookupService;

  
groupCodeSelectOptions: MaterialSelectOptions;
pricingTypeSelectOptions: MaterialSelectOptions;
measuringUnitSelectOptions: MaterialSelectOptions;

  
	@ViewChild('groupCode', { static: true }) GroupCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('pricingType', { static: true }) PricingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('measuringUnit', { static: true }) MeasuringUnitSelectComponent: MaterialSelectComponent;

  
  @Input() selectedDataElementOfBasicItem: DataElementOfBasicItem;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'بيان العنصر', field: 'itemStatment' }),
	new GridColumnOptions({ headerName: 'سنه التسعير', field: 'pricingYear' }),
	new GridColumnOptions({ headerName: 'اول سعر', field: 'firstPrice' }),
	new GridColumnOptions({ headerName: 'كود المجموعه ', field: 'groupCode' }),
	new GridColumnOptions({ headerName: 'نوع التسعير', field: 'pricingType' }),
	new GridColumnOptions({ headerName: 'وحده قياس', field: 'measuringUnit' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: DataElementOfBasicItemViewComponent,
    editDialogClassType: DataElementOfBasicItemEditComponent,
    newDialogClassType: DataElementOfBasicItemNewComponent,
  });
    constructor(
        injector: Injector,
        public dataElementOfBasicItemService: DataElementOfBasicItemService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedDataElementOfBasicItem = new DataElementOfBasicItem();

    
	this.groupCodeSelectOptions = new MaterialSelectOptions({
	 data: this.groupCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المجموعه ',
	});

	this.pricingTypeSelectOptions = new MaterialSelectOptions({
	 data: this.pricingTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع التسعير',
	});

	this.measuringUnitSelectOptions = new MaterialSelectOptions({
	 data: this.measurementUnitsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'وحده قياس',
	});


    this.searchForm = this.formBuilder.group({
     	itemStatment : [],
	pricingYear : [],
	firstPrice : [],
	groupCode : [],
	pricingType : [],
	measuringUnit : []
    });

     
  }

  getDataElementsOfBasicItemsPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<DataElementOfBasicItem[]> => {
    return this.dataElementOfBasicItemService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.dataElementOfBasicItemService.delete(param.data.id)
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
    this.groupCodesService = new LookupService('groupcodes', this.http);
this.pricingTypesService = new LookupService('pricingtypes', this.http);
this.measurementUnitsService = new LookupService('measurementunits', this.http);
  }
}

