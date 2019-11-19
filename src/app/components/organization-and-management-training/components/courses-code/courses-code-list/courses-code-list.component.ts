
import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { GridColumnOptions, GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { FormControlError, GridPaginatedSortedFiltered } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { CoursesCode } from 'app/shared/models/courses-code';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { CoursesCodeEditComponent } from '../courses-code-edit/courses-code-edit.component';
import { CoursesCodeNewComponent } from '../courses-code-new/courses-code-new.component';
import { CoursesCodeViewComponent } from '../courses-code-view/courses-code-view.component';
import { CoursesCodeService } from '../shared/courses-code.service';

@Component({
  selector: 'app-courses-code-list',
  templateUrl: './courses-code-list.component.html',
  styleUrls: ['./courses-code-list.component.scss'],
  providers: []
})

export class CoursesCodeListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private majorClassificationsService: LookupService;
private subClassificationsService: LookupService;

  
majorClassificationSelectOptions: MaterialSelectOptions;
subcategorySelectOptions: MaterialSelectOptions;

  
	@ViewChild('majorClassification', { static: true }) MajorClassificationSelectComponent: MaterialSelectComponent;
	@ViewChild('subcategory', { static: true }) SubcategorySelectComponent: MaterialSelectComponent;

  
  @Input() selectedCoursesCode: CoursesCode;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم الدوره', field: 'courseCode' }),
	new GridColumnOptions({ headerName: 'اسم الدوره', field: 'courseName' }),
	new GridColumnOptions({ headerName: 'تصنيف رئيسى', field: 'majorClassification' }),
	new GridColumnOptions({ headerName: 'تصنيف فرعى', field: 'subcategory' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: CoursesCodeViewComponent,
    editDialogClassType: CoursesCodeEditComponent,
    newDialogClassType: CoursesCodeNewComponent,
  });
    constructor(
        injector: Injector,
        public coursesCodeService: CoursesCodeService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedCoursesCode = new CoursesCode();

    
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


    this.searchForm = this.formBuilder.group({
     	courseCode : [],
	courseName : [],
	majorClassification : [],
	subcategory : []
    });

     
  }

  getCoursesCodesPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<CoursesCode[]> => {
    return this.coursesCodeService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.coursesCodeService.delete(param.data.id)
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
    this.majorClassificationsService = new LookupService('majorclassifications', this.http);
this.subClassificationsService = new LookupService('subclassifications', this.http);
  }
}

