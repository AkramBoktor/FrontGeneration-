
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { ScheduleImplementationDataAssayProject } from 'app/shared/models/schedule-implementation-data-assay-project';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ScheduleImplementationDataAssayProjectEditComponent } from '../schedule-implementation-data-assay-project-edit/schedule-implementation-data-assay-project-edit.component';
import { ScheduleImplementationDataAssayProjectNewComponent } from '../schedule-implementation-data-assay-project-new/schedule-implementation-data-assay-project-new.component';
import { ScheduleImplementationDataAssayProjectViewComponent } from '../schedule-implementation-data-assay-project-view/schedule-implementation-data-assay-project-view.component';
import { ScheduleImplementationDataAssayProjectService } from '../shared/schedule-implementation-data-assay-project.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-schedule-implementation-data-assay-project-list',
  templateUrl: './schedule-implementation-data-assay-project-list.component.html',
  styleUrls: ['./schedule-implementation-data-assay-project-list.component.scss'],
  providers: []
})

export class ScheduleImplementationDataAssayProjectListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private constructionTypesService: LookupService;
private foundationTypesService: LookupService;

  
constructionTypeSelectOptions: MaterialSelectOptions;
baseTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('baseType', { static: true }) BaseTypeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedScheduleImplementationDataAssayProject: ScheduleImplementationDataAssayProject;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود المبنى', field: 'buildingCode' }),
	new GridColumnOptions({ headerName: 'كود الملحق', field: 'extensionCode' }),
	new GridColumnOptions({ headerName: 'سنة الخطة', field: 'planYear' }),
	new GridColumnOptions({ headerName: 'كود النموذج', field: 'modelCode' }),
	new GridColumnOptions({ headerName: 'سنة التسعير', field: 'pricingYear' }),
	new GridColumnOptions({ headerName: 'كود جدول زمني', field: 'scheduleCode' }),
	new GridColumnOptions({ headerName: 'مدة التنفيذ', field: 'executionDuration' }),
	new GridColumnOptions({ headerName: 'عدد الأدوار', field: 'floorNumber' }),
	new GridColumnOptions({ headerName: 'نوع الإنشاء', field: 'constructionType' }),
	new GridColumnOptions({ headerName: 'نوع الأساسات', field: 'baseType' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: ScheduleImplementationDataAssayProjectViewComponent,
    editDialogClassType: ScheduleImplementationDataAssayProjectEditComponent,
    newDialogClassType: ScheduleImplementationDataAssayProjectNewComponent,
  });
    constructor(
        injector: Injector,
        public scheduleImplementationDataAssayProjectService: ScheduleImplementationDataAssayProjectService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedScheduleImplementationDataAssayProject = new ScheduleImplementationDataAssayProject();

    
	this.constructionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.constructionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الإنشاء',
	});

	this.baseTypeSelectOptions = new MaterialSelectOptions({
	 data: this.foundationTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الأساسات',
	});


    this.searchForm = this.formBuilder.group({
     	buildingCode : [],
	extensionCode : [],
	planYear : [],
	modelCode : [],
	pricingYear : [],
	scheduleCode : [],
	executionDuration : [],
	floorNumber : [],
	constructionType : [],
	baseType : []
    });

     
  }

  getScheduleImplementationDataAssayProjectPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<ScheduleImplementationDataAssayProject[]> => {
    return this.scheduleImplementationDataAssayProjectService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.scheduleImplementationDataAssayProjectService.delete(param.data.id)
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
    this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.foundationTypesService = new LookupService('foundationtypes', this.http);
  }
}

