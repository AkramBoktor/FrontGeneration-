
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { BankSalary } from 'app/shared/models/bank-salary';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { BankSalaryEditComponent } from '../bank-salary-edit/bank-salary-edit.component';
import { BankSalaryNewComponent } from '../bank-salary-new/bank-salary-new.component';
import { BankSalaryViewComponent } from '../bank-salary-view/bank-salary-view.component';
import { BankSalaryService } from '../shared/bank-salary.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-bank-salary-list',
  templateUrl: './bank-salary-list.component.html',
  styleUrls: ['./bank-salary-list.component.scss'],
  providers: []
})

export class BankSalaryListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedBankSalary: BankSalary;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود الموظف', field: 'employeeCode' }),
	new GridColumnOptions({ headerName: 'البنك', field: 'bank' }),
	new GridColumnOptions({ headerName: 'رقم الحساب', field: 'accountNumber' }),
	new GridColumnOptions({ headerName: 'الاختيار', field: 'select' }),
	new GridColumnOptions({ headerName: 'كود البنك', field: 'bankCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: BankSalaryViewComponent,
    editDialogClassType: BankSalaryEditComponent,
    newDialogClassType: BankSalaryNewComponent,
  });
    constructor(
        injector: Injector,
        public bankSalaryService: BankSalaryService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedBankSalary = new BankSalary();

    

    this.searchForm = this.formBuilder.group({
     	employeeCode : [],
         allowancesType : []
    });

     
  }

  getBankSalariesPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<BankSalary[]> => {
    return this.bankSalaryService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.bankSalaryService.delete(param.data.id)
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

