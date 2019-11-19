
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { TotalFunctionalCourse } from 'app/shared/models/total-functional-course';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { TotalFunctionalCourseEditComponent } from '../total-functional-course-edit/total-functional-course-edit.component';
import { TotalFunctionalCourseNewComponent } from '../total-functional-course-new/total-functional-course-new.component';
import { TotalFunctionalCourseViewComponent } from '../total-functional-course-view/total-functional-course-view.component';
import { TotalFunctionalCourseService } from '../shared/total-functional-course.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-total-functional-course-list',
  templateUrl: './total-functional-course-list.component.html',
  styleUrls: ['./total-functional-course-list.component.scss'],
  providers: []
})

export class TotalFunctionalCourseListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private branchCodesService: LookupService;
private jobTypesService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;
jobCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('jobCode', { static: true }) JobCodeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedTotalFunctionalCourse: TotalFunctionalCourse;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'الاجمالى', field: 'total' }),
	new GridColumnOptions({ headerName: 'الثابت', field: 'fixed' }),
	new GridColumnOptions({ headerName: 'المتغير', field: 'variable' }),
	new GridColumnOptions({ headerName: 'كود الفرع', field: 'branchCode' }),
	new GridColumnOptions({ headerName: 'كود الوظيفه', field: 'jobCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: TotalFunctionalCourseViewComponent,
    editDialogClassType: TotalFunctionalCourseEditComponent,
    newDialogClassType: TotalFunctionalCourseNewComponent,
  });
    constructor(
        injector: Injector,
        public totalFunctionalCourseService: TotalFunctionalCourseService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedTotalFunctionalCourse = new TotalFunctionalCourse();

    
	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الفرع',
	});

	this.jobCodeSelectOptions = new MaterialSelectOptions({
	 data: this.jobTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الوظيفه',
	});


    this.searchForm = this.formBuilder.group({
     	branchCode : [],
	jobCode : []
    });

     
  }

  getTotalFunctionalCoursesPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<TotalFunctionalCourse[]> => {
    return this.totalFunctionalCourseService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.totalFunctionalCourseService.delete(param.data.id)
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
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.jobTypesService = new LookupService('jobtypes', this.http);
  }
}

