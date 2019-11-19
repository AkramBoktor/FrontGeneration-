
import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AddCashToAStore } from 'app/shared/models/add-cash-to-a-store';
import { GridColumnOptions, GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { FormControlError, GridPaginatedSortedFiltered } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AddCashToAStoreEditComponent } from '../add-cash-to-a-store-edit/add-cash-to-a-store-edit.component';
import { AddCashToAStoreNewComponent } from '../add-cash-to-a-store-new/add-cash-to-a-store-new.component';
import { AddCashToAStoreViewComponent } from '../add-cash-to-a-store-view/add-cash-to-a-store-view.component';
import { AddCashToAStoreService } from '../shared/add-cash-to-a-store.service';

@Component({
  selector: 'app-add-cash-to-a-store-list',
  templateUrl: './add-cash-to-a-store-list.component.html',
  styleUrls: ['./add-cash-to-a-store-list.component.scss'],
  providers: []
})

export class AddCashToAStoreListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private gendersService: LookupService;
private itemStatusesService: LookupService;

  
typeSelectOptions: MaterialSelectOptions;
conditionSelectOptions: MaterialSelectOptions;

  
	@ViewChild('type', { static: true }) TypeSelectComponent: MaterialSelectComponent;
	@ViewChild('condition', { static: true }) ConditionSelectComponent: MaterialSelectComponent;

  
  @Input() selectedAddCashToAStore: AddCashToAStore;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود الموظف', field: 'employeeCode' }),
	new GridColumnOptions({ headerName: 'رقم الايصال', field: 'receiptNumber' }),
	new GridColumnOptions({ headerName: 'رقم الصنف ', field: 'itemNo' }),
	new GridColumnOptions({ headerName: 'اسم الصنف', field: 'productName' }),
	new GridColumnOptions({ headerName: '(...-الكمية ( 1- 2 – 3 ', field: 'quantity' }),
	new GridColumnOptions({ headerName: 'السعر', field: 'price' }),
	new GridColumnOptions({ headerName: '(القيمة ( السعر * الكمية ', field: 'value' }),
	new GridColumnOptions({ headerName: 'تاريخ الايصال ', field: 'receiptDate' }),
	new GridColumnOptions({ headerName: 'الكمية المفقودة ', field: 'missingQuantity' }),
	new GridColumnOptions({ headerName: '(نوع ( مستديم – مستهلك ', field: 'type' }),
	new GridColumnOptions({ headerName: '(حالة ( جديد – مستعمل – كهنة – للاصلاح ', field: 'condition' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: AddCashToAStoreViewComponent,
    editDialogClassType: AddCashToAStoreEditComponent,
    newDialogClassType: AddCashToAStoreNewComponent,
  });
    constructor(
        injector: Injector,
        public addCashToAStoreService: AddCashToAStoreService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedAddCashToAStore = new AddCashToAStore();

    
	this.typeSelectOptions = new MaterialSelectOptions({
	 data: this.gendersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: '(نوع ( مستديم – مستهلك ',
	});

	this.conditionSelectOptions = new MaterialSelectOptions({
	 data: this.itemStatusesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: '(حالة ( جديد – مستعمل – كهنة – للاصلاح ',
	});


    this.searchForm = this.formBuilder.group({
     	employeeCode : [],
	receiptNumber : [],
	itemNo : [],
	productName : [],
	receiptDate : [],
	type : [],
	condition : []
    });

     
  }

  getAddCashToAStorePaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<AddCashToAStore[]> => {
    return this.addCashToAStoreService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.addCashToAStoreService.delete(param.data.id)
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
    this.gendersService = new LookupService('genders', this.http);
this.itemStatusesService = new LookupService('itemstatuses', this.http);
  }
}

