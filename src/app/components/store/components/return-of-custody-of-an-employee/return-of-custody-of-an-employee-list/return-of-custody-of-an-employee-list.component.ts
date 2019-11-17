
import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { GridColumnOptions, GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { FormControlError, GridPaginatedSortedFiltered } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { ReturnOfCustodyOfAnEmployee } from 'app/shared/models/return-of-custody-of-an-employee';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ReturnOfCustodyOfAnEmployeeEditComponent } from '../return-of-custody-of-an-employee-edit/return-of-custody-of-an-employee-edit.component';
import { ReturnOfCustodyOfAnEmployeeNewComponent } from '../return-of-custody-of-an-employee-new/return-of-custody-of-an-employee-new.component';
import { ReturnOfCustodyOfAnEmployeeViewComponent } from '../return-of-custody-of-an-employee-view/return-of-custody-of-an-employee-view.component';
import { ReturnOfCustodyOfAnEmployeeService } from '../shared/return-of-custody-of-an-employee.service';

@Component({
  selector: 'app-return-of-custody-of-an-employee-list',
  templateUrl: './return-of-custody-of-an-employee-list.component.html',
  styleUrls: ['./return-of-custody-of-an-employee-list.component.scss'],
  providers: []
})

export class ReturnOfCustodyOfAnEmployeeListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private itemStatusesService: LookupService;

  
itemConditionSelectOptions: MaterialSelectOptions;

  
	@ViewChild('itemCondition', { static: true }) ItemConditionSelectComponent: MaterialSelectComponent;

  
  @Input() selectedReturnOfCustodyOfAnEmployee: ReturnOfCustodyOfAnEmployee;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم المخزن ', field: 'storeNumber' }),
	new GridColumnOptions({ headerName: 'كود الموظف', field: 'employeeCode' }),
	new GridColumnOptions({ headerName: 'رقم الصنف ', field: 'itemNo' }),
	new GridColumnOptions({ headerName: 'حاله الصنف ', field: 'itemCondition' }),
	new GridColumnOptions({ headerName: 'رقم اذن الصرف ', field: 'authorizationNumber' }),
	new GridColumnOptions({ headerName: 'تاريخ الصرف', field: 'exchangeDate' }),
	new GridColumnOptions({ headerName: 'الكمية الصرف  ', field: 'quantityExchange' }),
	new GridColumnOptions({ headerName: 'تاريخ الارتجاع  ', field: 'returnDate' }),
	new GridColumnOptions({ headerName: 'رقم اذن الاضافة   ', field: 'addPermissionNumber' }),
	new GridColumnOptions({ headerName: 'الكمية الارتجاع ', field: 'returnQuantity' }),
	new GridColumnOptions({ headerName: 'كود الصنف  ', field: 'itemCode' }),
	new GridColumnOptions({ headerName: 'اسم الصنف', field: 'productName' }),
	new GridColumnOptions({ headerName: ' الكمية ', field: 'quantity' }),
	new GridColumnOptions({ headerName: 'السعر', field: 'price' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: ReturnOfCustodyOfAnEmployeeViewComponent,
    editDialogClassType: ReturnOfCustodyOfAnEmployeeEditComponent,
    newDialogClassType: ReturnOfCustodyOfAnEmployeeNewComponent,
  });
    constructor(
        injector: Injector,
        public returnOfCustodyOfAnEmployeeService: ReturnOfCustodyOfAnEmployeeService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedReturnOfCustodyOfAnEmployee = new ReturnOfCustodyOfAnEmployee();

    
	this.itemConditionSelectOptions = new MaterialSelectOptions({
	 data: this.itemStatusesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حاله الصنف ',
	});


    this.searchForm = this.formBuilder.group({
     	storeNumber : [],
	employeeCode : [],
	itemNo : [],
	itemCondition : [],
	authorizationNumber : [],
	exchangeDate : [],
	quantityExchange : [],
	returnDate : [],
	addPermissionNumber : [],
	itemCode : [],
	productName : [],
    });

     
  }

  getReturnOfCustodyOfAnEmployeePaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<ReturnOfCustodyOfAnEmployee[]> => {
    return this.returnOfCustodyOfAnEmployeeService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.returnOfCustodyOfAnEmployeeService.delete(param.data.id)
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
    this.itemStatusesService = new LookupService('itemstatuses', this.http);
  }
}

