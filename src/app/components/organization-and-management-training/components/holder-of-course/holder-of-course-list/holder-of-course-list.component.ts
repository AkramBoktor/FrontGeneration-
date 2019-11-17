
import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { GridColumnOptions, GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { FormControlError, GridPaginatedSortedFiltered } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { HolderOfCourse } from 'app/shared/models/holder-of-course';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { HolderOfCourseEditComponent } from '../holder-of-course-edit/holder-of-course-edit.component';
import { HolderOfCourseNewComponent } from '../holder-of-course-new/holder-of-course-new.component';
import { HolderOfCourseViewComponent } from '../holder-of-course-view/holder-of-course-view.component';
import { HolderOfCourseService } from '../shared/holder-of-course.service';

@Component({
  selector: 'app-holder-of-course-list',
  templateUrl: './holder-of-course-list.component.html',
  styleUrls: ['./holder-of-course-list.component.scss'],
  providers: []
})

export class HolderOfCourseListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private departmentsSectionsService: LookupService;
private majorClassificationsService: LookupService;
private subClassificationsService: LookupService;
private sessionDestinationCodesService: LookupService;
private unitDurationSessionsService: LookupService;

  
managementCodeSelectOptions: MaterialSelectOptions;
majorClassificationSelectOptions: MaterialSelectOptions;
subcategorySelectOptions: MaterialSelectOptions;
courseDestinationCodeSelectOptions: MaterialSelectOptions;
courseUnitDurationSelectOptions: MaterialSelectOptions;

  
	@ViewChild('managementCode', { static: true }) ManagementCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('majorClassification', { static: true }) MajorClassificationSelectComponent: MaterialSelectComponent;
	@ViewChild('subcategory', { static: true }) SubcategorySelectComponent: MaterialSelectComponent;
	@ViewChild('courseDestinationCode', { static: true }) CourseDestinationCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('courseUnitDuration', { static: true }) CourseUnitDurationSelectComponent: MaterialSelectComponent;

  
  @Input() selectedHolderOfCourse: HolderOfCourse;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود الموظف', field: 'employeeCode' }),
	new GridColumnOptions({ headerName: 'السنه التدريبيه', field: 'trainingYear' }),
	new GridColumnOptions({ headerName: 'مده الدوره', field: 'courseDuration' }),
	new GridColumnOptions({ headerName: 'تاريخ بدايه الدوره', field: 'beginningSessionDate' }),
	new GridColumnOptions({ headerName: 'تكلفه الدوره', field: 'courseCost' }),
	new GridColumnOptions({ headerName: 'كود الاداره', field: 'managementCode' }),
	new GridColumnOptions({ headerName: 'تصنيف رئيسى', field: 'majorClassification' }),
	new GridColumnOptions({ headerName: 'تصنيف فرعى', field: 'subcategory' }),
	new GridColumnOptions({ headerName: 'كود الدوره', field: 'courseCode' }),
	new GridColumnOptions({ headerName: 'كود جهه الدوره', field: 'courseDestinationCode' }),
	new GridColumnOptions({ headerName: 'مسلسل الدوره', field: 'serialSession' }),
	new GridColumnOptions({ headerName: 'وحده مده الدوره', field: 'courseUnitDuration' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: HolderOfCourseViewComponent,
    editDialogClassType: HolderOfCourseEditComponent,
    newDialogClassType: HolderOfCourseNewComponent,
  });
    constructor(
        injector: Injector,
        public holderOfCourseService: HolderOfCourseService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedHolderOfCourse = new HolderOfCourse();

    
	this.managementCodeSelectOptions = new MaterialSelectOptions({
	 data: this.departmentsSectionsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الاداره',
	});

	this.majorClassificationSelectOptions = new MaterialSelectOptions({
	 data: this.majorClassificationsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'تصنيف رئيسى',
	});

	this.subcategorySelectOptions = new MaterialSelectOptions({
	 data: this.subClassificationsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'تصنيف فرعى',
	});

	this.courseDestinationCodeSelectOptions = new MaterialSelectOptions({
	 data: this.sessionDestinationCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود جهه الدوره',
	});

	this.courseUnitDurationSelectOptions = new MaterialSelectOptions({
	 data: this.unitDurationSessionsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'وحده مده الدوره',
	});


    this.searchForm = this.formBuilder.group({
     	employeeCode : [],
	trainingYear : [],
	courseCode : [],
	serialSession : [],
	courseDuration : [],
	beginningSessionDate : [],
	courseCost : [],
	managementCode : [],
	majorClassification : [],
	subcategory : [],
	courseDestinationCode : [],
	courseUnitDuration : []
    });

     
  }

  getHoldersOfCoursesPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<HolderOfCourse[]> => {
    return this.holderOfCourseService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.holderOfCourseService.delete(param.data.id)
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
    this.departmentsSectionsService = new LookupService('departmentssections', this.http);
this.majorClassificationsService = new LookupService('majorclassifications', this.http);
this.subClassificationsService = new LookupService('subclassifications', this.http);
this.sessionDestinationCodesService = new LookupService('sessiondestinationcodes', this.http);
this.unitDurationSessionsService = new LookupService('unitdurationsessions', this.http);
  }
}

