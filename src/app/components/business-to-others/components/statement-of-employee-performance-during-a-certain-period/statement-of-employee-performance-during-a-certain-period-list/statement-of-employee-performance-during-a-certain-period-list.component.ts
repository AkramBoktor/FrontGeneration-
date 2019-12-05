
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { StatementOfEmployeePerformanceDuringACertainPeriod } from 'app/shared/models/statement-of-employee-performance-during-a-certain-period';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { StatementOfEmployeePerformanceDuringACertainPeriodEditComponent } from '../statement-of-employee-performance-during-a-certain-period-edit/statement-of-employee-performance-during-a-certain-period-edit.component';
import { StatementOfEmployeePerformanceDuringACertainPeriodNewComponent } from '../statement-of-employee-performance-during-a-certain-period-new/statement-of-employee-performance-during-a-certain-period-new.component';
import { StatementOfEmployeePerformanceDuringACertainPeriodViewComponent } from '../statement-of-employee-performance-during-a-certain-period-view/statement-of-employee-performance-during-a-certain-period-view.component';
import { StatementOfEmployeePerformanceDuringACertainPeriodService } from '../shared/statement-of-employee-performance-during-a-certain-period.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-statement-of-employee-performance-during-a-certain-period-list',
  templateUrl: './statement-of-employee-performance-during-a-certain-period-list.component.html',
  styleUrls: ['./statement-of-employee-performance-during-a-certain-period-list.component.scss'],
  providers: []
})

export class StatementOfEmployeePerformanceDuringACertainPeriodListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedStatementOfEmployeePerformanceDuringACertainPeriod: StatementOfEmployeePerformanceDuringACertainPeriod;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم المدير المباشر', field: 'directManagerCode' }),
	new GridColumnOptions({ headerName: 'رقم المدير الاعلي', field: 'seniorManagerCode' }),
	new GridColumnOptions({ headerName: 'كود الموظف', field: 'employeeCode' }),
	new GridColumnOptions({ headerName: 'سنة التقدير', field: 'estimationYear' }),
	new GridColumnOptions({ headerName: 'فترة التقدير من', field: 'estimatePeriodFrom' }),
	new GridColumnOptions({ headerName: 'فترة التقدير الي', field: 'estimatePeriodTo' }),
	new GridColumnOptions({ headerName: 'توصيف الاداء', field: 'performanceCharacterization' }),
	new GridColumnOptions({ headerName: 'نوع الاداء', field: 'performanceType' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: StatementOfEmployeePerformanceDuringACertainPeriodViewComponent,
    editDialogClassType: StatementOfEmployeePerformanceDuringACertainPeriodEditComponent,
    newDialogClassType: StatementOfEmployeePerformanceDuringACertainPeriodNewComponent,
  });
    constructor(
        injector: Injector,
        public statementOfEmployeePerformanceDuringACertainPeriodService: StatementOfEmployeePerformanceDuringACertainPeriodService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedStatementOfEmployeePerformanceDuringACertainPeriod = new StatementOfEmployeePerformanceDuringACertainPeriod();

    

    this.searchForm = this.formBuilder.group({
     	directManagerCode : [],
	seniorManagerCode : [],
	employeeCode : []
    });

     
  }

  getStatementOfEmployeePerformanceDuringACertainPeriodPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<StatementOfEmployeePerformanceDuringACertainPeriod[]> => {
    return this.statementOfEmployeePerformanceDuringACertainPeriodService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.statementOfEmployeePerformanceDuringACertainPeriodService.delete(param.data.id)
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

