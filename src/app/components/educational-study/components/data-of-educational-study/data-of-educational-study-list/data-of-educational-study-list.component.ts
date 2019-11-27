
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { DataOfEducationalStudy } from 'app/shared/models/data-of-educational-study';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { DataOfEducationalStudyEditComponent } from '../data-of-educational-study-edit/data-of-educational-study-edit.component';
import { DataOfEducationalStudyNewComponent } from '../data-of-educational-study-new/data-of-educational-study-new.component';
import { DataOfEducationalStudyViewComponent } from '../data-of-educational-study-view/data-of-educational-study-view.component';
import { DataOfEducationalStudyService } from '../shared/data-of-educational-study.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-data-of-educational-study-list',
  templateUrl: './data-of-educational-study-list.component.html',
  styleUrls: ['./data-of-educational-study-list.component.scss'],
  providers: []
})

export class DataOfEducationalStudyListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private areasService: LookupService;
private sectionsOrCentersService: LookupService;
private regionPopulationDensitiesService: LookupService;
private regionAdministrativeClassificationsService: LookupService;

  
educationalAdministrationSelectOptions: MaterialSelectOptions;
departmentSelectOptions: MaterialSelectOptions;
regionPopulationDensitySelectOptions: MaterialSelectOptions;
regionAdministrativeClassificationSelectOptions: MaterialSelectOptions;

  
	@ViewChild('educationalAdministration', { static: true }) EducationalAdministrationSelectComponent: MaterialSelectComponent;
	@ViewChild('department', { static: true }) DepartmentSelectComponent: MaterialSelectComponent;
	@ViewChild('regionPopulationDensity', { static: true }) RegionPopulationDensitySelectComponent: MaterialSelectComponent;
	@ViewChild('regionAdministrativeClassification', { static: true }) RegionAdministrativeClassificationSelectComponent: MaterialSelectComponent;

  
  @Input() selectedDataOfEducationalStudy: DataOfEducationalStudy;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود المبنى', field: 'buildingCode' }),
	new GridColumnOptions({ headerName: 'المسافة من اقرب تجمع سكني', field: 'nearestCommunityDistance' }),
	new GridColumnOptions({ headerName: 'نصف قطر دائرة التوطين', field: 'localizationCircleRadius' }),
	new GridColumnOptions({ headerName: 'عدد الفصول', field: 'chaptersNumber' }),
	new GridColumnOptions({ headerName: 'عدد التلاميذ المقرر', field: 'pupilsScheduledNumber' }),
	new GridColumnOptions({ headerName: 'تاريخ الدراسة', field: 'studyHistory' }),
	new GridColumnOptions({ headerName: 'اسم المستخدم', field: 'userName' }),
	new GridColumnOptions({ headerName: 'توقيت التسجيل', field: 'registrationTiming' }),
	new GridColumnOptions({ headerName: 'تاريخ التسجيل', field: 'registrationDate' }),
	new GridColumnOptions({ headerName: 'رقم التسجيل', field: 'registrationNumber' }),
	new GridColumnOptions({ headerName: 'المساحة الكلية', field: 'totalArea' }),
	new GridColumnOptions({ headerName: 'اسم المدرسة', field: 'schoolName' }),
	new GridColumnOptions({ headerName: 'التاثير علي المدارس المحيطة ', field: 'influencingSurroundingSchools' }),
	new GridColumnOptions({ headerName: 'نوع التلاميذ', field: 'pupilsType' }),
	new GridColumnOptions({ headerName: 'نوعية التعليم', field: 'educationQuality' }),
	new GridColumnOptions({ headerName: 'المرحلة التعليمية', field: 'educationalLevel' }),
	new GridColumnOptions({ headerName: 'موقف منطقة الاحتياج', field: 'needPositionArea' }),
	new GridColumnOptions({ headerName: 'التصنيف الإداري للمنطقة', field: 'regionAdministrativeClassification' }),
	new GridColumnOptions({ headerName: 'الكثافة السكانية للمنطقه', field: 'regionPopulationDensity' }),
	new GridColumnOptions({ headerName: 'الإدارة التعليمية', field: 'educationalAdministration' }),
	new GridColumnOptions({ headerName: 'مالك الأرض الأصلي', field: 'originalLandOwner' }),
	new GridColumnOptions({ headerName: 'تابع لقرية', field: 'continuedVillage' }),
	new GridColumnOptions({ headerName: 'حي/قرية', field: 'village' }),
	new GridColumnOptions({ headerName: 'قسم/مركز', field: 'department' }),
	new GridColumnOptions({ headerName: 'سبب الدراسة', field: 'studyReason' }),
	new GridColumnOptions({ headerName: 'موقف الاحتياج التربوي', field: 'aducationalNeedAttitude' }),
	new GridColumnOptions({ headerName: 'الفترة الثانية لدائرة التوطين', field: 'localizationDepartmentSecondPeriod' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: DataOfEducationalStudyViewComponent,
    editDialogClassType: DataOfEducationalStudyEditComponent,
    newDialogClassType: DataOfEducationalStudyNewComponent,
  });
    constructor(
        injector: Injector,
        public dataOfEducationalStudyService: DataOfEducationalStudyService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedDataOfEducationalStudy = new DataOfEducationalStudy();

    
	this.educationalAdministrationSelectOptions = new MaterialSelectOptions({
	 data: this.areasService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الإدارة التعليمية',
	});

	this.departmentSelectOptions = new MaterialSelectOptions({
	 data: this.sectionsOrCentersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'قسم/مركز',
	});

	this.regionPopulationDensitySelectOptions = new MaterialSelectOptions({
	 data: this.regionPopulationDensitiesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الكثافة السكانية للمنطقه',
	});

	this.regionAdministrativeClassificationSelectOptions = new MaterialSelectOptions({
	 data: this.regionAdministrativeClassificationsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'التصنيف الإداري للمنطقة',
	});


    this.searchForm = this.formBuilder.group({
     	buildingCode : [],
	registrationNumber : [],
	educationalAdministration : [],
	department : [],
	regionPopulationDensity : [],
	regionAdministrativeClassification : []
    });

     
  }

  getDataOfEducationalStudiesPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<DataOfEducationalStudy[]> => {
    return this.dataOfEducationalStudyService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.dataOfEducationalStudyService.delete(param.data.id)
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
    this.areasService = new LookupService('areas', this.http);
this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
this.regionPopulationDensitiesService = new LookupService('regionpopulationdensities', this.http);
this.regionAdministrativeClassificationsService = new LookupService('regionadministrativeclassifications', this.http);
  }
}

