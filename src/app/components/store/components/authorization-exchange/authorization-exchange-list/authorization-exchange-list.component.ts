
import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AuthorizationExchange } from 'app/shared/models/authorization-exchange';
import { GridColumnOptions, GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { FormControlError, GridPaginatedSortedFiltered } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthorizationExchangeEditComponent } from '../authorization-exchange-edit/authorization-exchange-edit.component';
import { AuthorizationExchangeNewComponent } from '../authorization-exchange-new/authorization-exchange-new.component';
import { AuthorizationExchangeViewComponent } from '../authorization-exchange-view/authorization-exchange-view.component';
import { AuthorizationExchangeService } from '../shared/authorization-exchange.service';

@Component({
  selector: 'app-authorization-exchange-list',
  templateUrl: './authorization-exchange-list.component.html',
  styleUrls: ['./authorization-exchange-list.component.scss'],
  providers: []
})

export class AuthorizationExchangeListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private bondCodesService: LookupService;
private subDepartmentsService: LookupService;
private gendersService: LookupService;
private itemStatusesService: LookupService;

  
exchangeCodeSelectOptions: MaterialSelectOptions;
exchangeNumberSelectOptions: MaterialSelectOptions;
typeSelectOptions: MaterialSelectOptions;
statusSelectOptions: MaterialSelectOptions;

  
	@ViewChild('exchangeCode', { static: true }) ExchangeCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('exchangeNumber', { static: true }) ExchangeNumberSelectComponent: MaterialSelectComponent;
	@ViewChild('type', { static: true }) TypeSelectComponent: MaterialSelectComponent;
	@ViewChild('status', { static: true }) StatusSelectComponent: MaterialSelectComponent;

  
  @Input() selectedAuthorizationExchange: AuthorizationExchange;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم المخزن الصارف ', field: 'exchangeStoreNumber' }),
	new GridColumnOptions({ headerName: 'تاريخ الصرف ', field: 'exchangeDate' }),
	new GridColumnOptions({ headerName: 'رقم الصنف', field: 'itemNo' }),
	new GridColumnOptions({ headerName: ' اسم الصنف', field: 'productName' }),
	new GridColumnOptions({ headerName: ' الكمية', field: 'quantity' }),
	new GridColumnOptions({ headerName: 'السعر', field: 'price' }),
	new GridColumnOptions({ headerName: 'رقم اذن الصرف', field: 'exchangeAuthorizationNumber' }),
	new GridColumnOptions({ headerName: 'كود السند الصرف ', field: 'exchangeCode' }),
	new GridColumnOptions({ headerName: 'رقم جهة الصرف', field: 'exchangeNumber' }),
	new GridColumnOptions({ headerName: 'نوع  ', field: 'type' }),
	new GridColumnOptions({ headerName: 'حالة ', field: 'status' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: AuthorizationExchangeViewComponent,
    editDialogClassType: AuthorizationExchangeEditComponent,
    newDialogClassType: AuthorizationExchangeNewComponent,
  });
    constructor(
        injector: Injector,
        public authorizationExchangeService: AuthorizationExchangeService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedAuthorizationExchange = new AuthorizationExchange();

    
	this.exchangeCodeSelectOptions = new MaterialSelectOptions({
	 data: this.bondCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود السند الصرف ',
	});

	this.exchangeNumberSelectOptions = new MaterialSelectOptions({
	 data: this.subDepartmentsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'رقم جهة الصرف',
	});

	this.typeSelectOptions = new MaterialSelectOptions({
	 data: this.gendersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع  ',
	});

	this.statusSelectOptions = new MaterialSelectOptions({
	 data: this.itemStatusesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حالة ',
	});


    this.searchForm = this.formBuilder.group({
     	exchangeStoreNumber : [],
	exchangeDate : [],
	itemNo : [],
	productName : [],
	quantity : [],
	price : [],
	exchangeAuthorizationNumber : [],
	exchangeCode : [],
	exchangeNumber : [],
	type : [],
	status : []
    });

     
  }

  getAuthorizationExchangePaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<AuthorizationExchange[]> => {
    return this.authorizationExchangeService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.authorizationExchangeService.delete(param.data.id)
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
this.subDepartmentsService = new LookupService('subdepartments', this.http);
this.gendersService = new LookupService('genders', this.http);
this.itemStatusesService = new LookupService('itemstatuses', this.http);
  }
}

