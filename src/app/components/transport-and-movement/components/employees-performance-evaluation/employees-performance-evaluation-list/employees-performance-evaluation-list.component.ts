
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { EmployeesPerformanceEvaluation } from 'app/shared/models/employees-performance-evaluation';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { EmployeesPerformanceEvaluationEditComponent } from '../employees-performance-evaluation-edit/employees-performance-evaluation-edit.component';
import { EmployeesPerformanceEvaluationNewComponent } from '../employees-performance-evaluation-new/employees-performance-evaluation-new.component';
import { EmployeesPerformanceEvaluationViewComponent } from '../employees-performance-evaluation-view/employees-performance-evaluation-view.component';
import { EmployeesPerformanceEvaluationService } from '../shared/employees-performance-evaluation.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-employees-performance-evaluation-list',
  templateUrl: './employees-performance-evaluation-list.component.html',
  styleUrls: ['./employees-performance-evaluation-list.component.scss'],
  providers: []
})

export class EmployeesPerformanceEvaluationListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private performanceTypesService: LookupService;

  
performanceTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('performanceType', { static: true }) PerformanceTypeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedEmployeesPerformanceEvaluation: EmployeesPerformanceEvaluation;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم المدير المباشر', field: 'directManagerNumber' }),
	new GridColumnOptions({ headerName: 'رقم المدير الاعلي ', field: 'seniorManagerNumber' }),
	new GridColumnOptions({ headerName: 'كود الموظف', field: 'employeeCode' }),
	new GridColumnOptions({ headerName: 'سنة التقرير', field: 'yearOfReport' }),
	new GridColumnOptions({ headerName: 'فترة التقرير', field: 'reportPeriod' }),
	new GridColumnOptions({ headerName: 'من', field: 'from' }),
	new GridColumnOptions({ headerName: 'الي', field: 'to' }),
	new GridColumnOptions({ headerName: 'تفاصيل', field: 'details' }),
	new GridColumnOptions({ headerName: 'نوع الاداء ', field: 'performanceType' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: EmployeesPerformanceEvaluationViewComponent,
    editDialogClassType: EmployeesPerformanceEvaluationEditComponent,
    newDialogClassType: EmployeesPerformanceEvaluationNewComponent,
  });
    constructor(
        injector: Injector,
        public employeesPerformanceEvaluationService: EmployeesPerformanceEvaluationService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedEmployeesPerformanceEvaluation = new EmployeesPerformanceEvaluation();

    
	this.performanceTypeSelectOptions = new MaterialSelectOptions({
	 data: this.performanceTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الاداء ',
	});


    this.searchForm = this.formBuilder.group({
     	directManagerNumber : [],
	seniorManagerNumber : [],
	employeeCode : [],
	yearOfReport : [],
	reportPeriod : [],
	from : [],
	to : [],
	details : [],
	performanceType : []
    });

     
  }

  getEmployeesPerformanceEvaluationPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<EmployeesPerformanceEvaluation[]> => {
    return this.employeesPerformanceEvaluationService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.employeesPerformanceEvaluationService.delete(param.data.id)
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
    this.performanceTypesService = new LookupService('performancetypes', this.http);
  }
}

