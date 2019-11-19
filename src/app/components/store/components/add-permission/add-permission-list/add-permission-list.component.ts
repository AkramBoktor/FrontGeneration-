
import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AddPermission } from 'app/shared/models/add-permission';
import { GridColumnOptions, GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { FormControlError, GridPaginatedSortedFiltered } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AddPermissionEditComponent } from '../add-permission-edit/add-permission-edit.component';
import { AddPermissionNewComponent } from '../add-permission-new/add-permission-new.component';
import { AddPermissionViewComponent } from '../add-permission-view/add-permission-view.component';
import { AddPermissionService } from '../shared/add-permission.service';

@Component({
  selector: 'app-add-permission-list',
  templateUrl: './add-permission-list.component.html',
  styleUrls: ['./add-permission-list.component.scss'],
  providers: []
})

export class AddPermissionListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private bondCodesService: LookupService;
private bondNumbersService: LookupService;
private gendersService: LookupService;
private itemStatusesService: LookupService;

  
bondCodeSelectOptions: MaterialSelectOptions;
bondNoSelectOptions: MaterialSelectOptions;
typeSelectOptions: MaterialSelectOptions;
conditionSelectOptions: MaterialSelectOptions;

  
	@ViewChild('bondCode', { static: true }) BondCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('bondNo', { static: true }) BondNoSelectComponent: MaterialSelectComponent;
	@ViewChild('type', { static: true }) TypeSelectComponent: MaterialSelectComponent;
	@ViewChild('condition', { static: true }) ConditionSelectComponent: MaterialSelectComponent;

  
  @Input() selectedAddPermission: AddPermission;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم المخزن المستلم', field: 'recipientStoreNumber' }),
	new GridColumnOptions({ headerName: 'رقم الفاتورة', field: 'billNumber' }),
	new GridColumnOptions({ headerName: 'رقم اذن الاضافة', field: 'addPermissionNumber' }),
	new GridColumnOptions({ headerName: 'تاريخ التوريد ', field: 'dateOfSupply' }),
	new GridColumnOptions({ headerName: 'رقم الصنف ', field: 'itemNo' }),
	new GridColumnOptions({ headerName: 'اسم الصنف', field: 'productName' }),
	new GridColumnOptions({ headerName: 'الكمية ( 1- 2 – 3 - ... ) رصيد', field: 'quantityBalance' }),
	new GridColumnOptions({ headerName: 'السعر ', field: 'price' }),
	new GridColumnOptions({ headerName: '(القيمة ( السعر * الكمية', field: 'value' }),
	new GridColumnOptions({ headerName: 'كود السند', field: 'bondCode' }),
	new GridColumnOptions({ headerName: ' رقم السند  ', field: 'bondNo' }),
	new GridColumnOptions({ headerName: '(نوع ( مستديم – مستهلك ', field: 'type' }),
	new GridColumnOptions({ headerName: '  (حالة ( جديد – مستعمل – كهنة – للاصلاح', field: 'condition' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: AddPermissionViewComponent,
    editDialogClassType: AddPermissionEditComponent,
    newDialogClassType: AddPermissionNewComponent,
  });
    constructor(
        injector: Injector,
        public addPermissionService: AddPermissionService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedAddPermission = new AddPermission();

    
	this.bondCodeSelectOptions = new MaterialSelectOptions({
	 data: this.bondCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود السند',
	});

	this.bondNoSelectOptions = new MaterialSelectOptions({
	 data: this.bondNumbersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' رقم السند  ',
	});

	this.typeSelectOptions = new MaterialSelectOptions({
	 data: this.gendersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: '(نوع ( مستديم – مستهلك ',
	});

	this.conditionSelectOptions = new MaterialSelectOptions({
	 data: this.itemStatusesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: '  (حالة ( جديد – مستعمل – كهنة – للاصلاح',
	});


    this.searchForm = this.formBuilder.group({
     	recipientStoreNumber : [],
	billNumber : [],
	addPermissionNumber : [],
	dateOfSupply : [],
	itemNo : [],
	productName : [],
	quantityBalance : [],
	price : [],
	value : [],
	bondCode : [],
	bondNo : [],
	type : [],
	condition : []
    });

     
  }

  getAddPermissionPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<AddPermission[]> => {
    return this.addPermissionService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.addPermissionService.delete(param.data.id)
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
    this.bondCodesService = new LookupService('bondcodes', this.http);
this.bondNumbersService = new LookupService('bondnumbers', this.http);
this.gendersService = new LookupService('genders', this.http);
this.itemStatusesService = new LookupService('itemstatuses', this.http);
  }
}

