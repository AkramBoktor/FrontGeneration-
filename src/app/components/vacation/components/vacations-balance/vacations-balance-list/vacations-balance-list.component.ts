
import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions, GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { FormControlError, GridPaginatedSortedFiltered } from 'app/shared/models/controls/interfaces';
import { VacationsBalance } from 'app/shared/models/vacations-balance';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { VacationsBalanceService } from '../shared/vacations-balance.service';
import { VacationsBalanceEditComponent } from '../vacations-balance-edit/vacations-balance-edit.component';
import { VacationsBalanceNewComponent } from '../vacations-balance-new/vacations-balance-new.component';
import { VacationsBalanceViewComponent } from '../vacations-balance-view/vacations-balance-view.component';

@Component({
  selector: 'app-vacations-balance-list',
  templateUrl: './vacations-balance-list.component.html',
  styleUrls: ['./vacations-balance-list.component.scss'],
  providers: []
})

export class VacationsBalanceListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedVacationsBalance: VacationsBalance;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود الموظف', field: 'employeeCode' }),
	new GridColumnOptions({ headerName: 'رصيد الموظف', field: 'employeeBalance' }),
	new GridColumnOptions({ headerName: 'من تاريخ', field: 'fromDate' }),
	new GridColumnOptions({ headerName: 'الي تاريخ', field: 'toDate' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: VacationsBalanceViewComponent,
    editDialogClassType: VacationsBalanceEditComponent,
    newDialogClassType: VacationsBalanceNewComponent,
  });
    constructor(
        injector: Injector,
        public vacationsBalanceService: VacationsBalanceService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedVacationsBalance = new VacationsBalance();

    

    this.searchForm = this.formBuilder.group({
     	employeeCode : [],
	employeeBalance : [],
	fromDate : [],
	toDate : []
    });

     
  }

  getVacationsBalancePaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<VacationsBalance[]> => {
    return this.vacationsBalanceService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.vacationsBalanceService.delete(param.data.id)
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

