
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { InsertNewExpensesForRegionalFinancialPortfolios } from 'app/shared/models/insert-new-expenses-for-regional-financial-portfolios';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { InsertNewExpensesForRegionalFinancialPortfoliosEditComponent } from '../insert-new-expenses-for-regional-financial-portfolios-edit/insert-new-expenses-for-regional-financial-portfolios-edit.component';
import { InsertNewExpensesForRegionalFinancialPortfoliosNewComponent } from '../insert-new-expenses-for-regional-financial-portfolios-new/insert-new-expenses-for-regional-financial-portfolios-new.component';
import { InsertNewExpensesForRegionalFinancialPortfoliosViewComponent } from '../insert-new-expenses-for-regional-financial-portfolios-view/insert-new-expenses-for-regional-financial-portfolios-view.component';
import { InsertNewExpensesForRegionalFinancialPortfoliosService } from '../shared/insert-new-expenses-for-regional-financial-portfolios.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-insert-new-expenses-for-regional-financial-portfolios-list',
  templateUrl: './insert-new-expenses-for-regional-financial-portfolios-list.component.html',
  styleUrls: ['./insert-new-expenses-for-regional-financial-portfolios-list.component.scss'],
  providers: []
})

export class InsertNewExpensesForRegionalFinancialPortfoliosListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
	{
	 errorName: 'minLength',
	 errorMessage: ''
	}
      ];
  

  

  

  
  @Input() selectedInsertNewExpensesForRegionalFinancialPortfolios: InsertNewExpensesForRegionalFinancialPortfolios;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود  المنطقة', field: 'areaCode' }),
	new GridColumnOptions({ headerName: 'اسم المنطقة', field: 'areaName' }),
	new GridColumnOptions({ headerName: 'سنة الموازنة', field: 'budgetYear' }),
	new GridColumnOptions({ headerName: 'مصدر التمويل رقم', field: 'fundingSourceNumber' }),
	new GridColumnOptions({ headerName: 'مصدر التمويل اسم', field: 'fundingSourceName' }),
	new GridColumnOptions({ headerName: 'مسلسل الحافظة الاصلية', field: 'originalClipboardSerial' }),
	new GridColumnOptions({ headerName: 'مسلسل حافظة المنطقة', field: 'serialClipboardArea' }),
	new GridColumnOptions({ headerName: 'تاريخ حافظة التمويل', field: 'financingClipboardDate' }),
	new GridColumnOptions({ headerName: 'رصيد المحافظة', field: 'balanceProvince' }),
	new GridColumnOptions({ headerName: 'مبلغ الحافظة القديم', field: 'oldClipboardAmount' }),
	new GridColumnOptions({ headerName: 'مبلغ الحافظة الجديد', field: 'newClipboardAmount' }),
	new GridColumnOptions({ headerName: 'مبلغ التسوية', field: 'settlementAmount' }),
	new GridColumnOptions({ headerName: 'متبقي من اعتماد سابق', field: 'remainingFromPreviousSubmission' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: InsertNewExpensesForRegionalFinancialPortfoliosViewComponent,
    editDialogClassType: InsertNewExpensesForRegionalFinancialPortfoliosEditComponent,
    newDialogClassType: InsertNewExpensesForRegionalFinancialPortfoliosNewComponent,
  });
    constructor(
        injector: Injector,
        public insertNewExpensesForRegionalFinancialPortfoliosService: InsertNewExpensesForRegionalFinancialPortfoliosService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedInsertNewExpensesForRegionalFinancialPortfolios = new InsertNewExpensesForRegionalFinancialPortfolios();

    

    this.searchForm = this.formBuilder.group({
     	areaCode : [],
	areaName : [],
	budgetYear : [],
	fundingSourceNumber : [],
	fundingSourceName : [],
	originalClipboardSerial : [],
	serialClipboardArea : [],
	financingClipboardDate : [],
	balanceProvince : [],
	oldClipboardAmount : [],
	newClipboardAmount : [],
	settlementAmount : [],
	remainingFromPreviousSubmission : []
    });

     
  }

  getInsertNewExpensesForRegionalFinancialPortfoliosPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<InsertNewExpensesForRegionalFinancialPortfolios[]> => {
    return this.insertNewExpensesForRegionalFinancialPortfoliosService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.insertNewExpensesForRegionalFinancialPortfoliosService.delete(param.data.id)
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
    
  }
}

