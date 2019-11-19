
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { EmployeePerformanceEvaluation } from 'app/shared/models/employee-performance-evaluation';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { EmployeePerformanceEvaluationEditComponent } from '../employee-performance-evaluation-edit/employee-performance-evaluation-edit.component';
import { EmployeePerformanceEvaluationNewComponent } from '../employee-performance-evaluation-new/employee-performance-evaluation-new.component';
import { EmployeePerformanceEvaluationViewComponent } from '../employee-performance-evaluation-view/employee-performance-evaluation-view.component';
import { EmployeePerformanceEvaluationService } from '../shared/employee-performance-evaluation.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-employee-performance-evaluation-list',
  templateUrl: './employee-performance-evaluation-list.component.html',
  styleUrls: ['./employee-performance-evaluation-list.component.scss'],
  providers: []
})

export class EmployeePerformanceEvaluationListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedEmployeePerformanceEvaluation: EmployeePerformanceEvaluation;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم المدير المباشر', field: 'directManagerNumber' }),
	new GridColumnOptions({ headerName: 'رقم المدير الاعلي', field: 'seniorManagerNumber' }),
	new GridColumnOptions({ headerName: 'كود الموظف', field: 'employeeCode' }),
	new GridColumnOptions({ headerName: 'سنة التقرير', field: 'yearOfReport' }),
	new GridColumnOptions({ headerName: 'فترة التقرير', field: 'reportPeriod' }),
	new GridColumnOptions({ headerName: 'من', field: 'from' }),
	new GridColumnOptions({ headerName: 'الي', field: 'to' }),
	new GridColumnOptions({ headerName: 'نوع الاداء', field: 'performanceType' }),
	new GridColumnOptions({ headerName: 'وصف', field: 'description' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: EmployeePerformanceEvaluationViewComponent,
    editDialogClassType: EmployeePerformanceEvaluationEditComponent,
    newDialogClassType: EmployeePerformanceEvaluationNewComponent,
  });
    constructor(
        injector: Injector,
        public employeePerformanceEvaluationService: EmployeePerformanceEvaluationService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedEmployeePerformanceEvaluation = new EmployeePerformanceEvaluation();

    

    this.searchForm = this.formBuilder.group({
     	directManagerNumber : [],
	seniorManagerNumber : [],
	employeeCode : [],
	yearOfReport : [],
	reportPeriod : [],
	from : [],
	to : [],
	performanceType : [],
	description : []
    });

     
  }

  getEmployeePerformanceEvaluationPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<EmployeePerformanceEvaluation[]> => {
    return this.employeePerformanceEvaluationService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.employeePerformanceEvaluationService.delete(param.data.id)
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

