
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { EducationalStudies } from 'app/shared/models/educational-studies';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { EducationalStudiesEditComponent } from '../educational-studies-edit/educational-studies-edit.component';
import { EducationalStudiesNewComponent } from '../educational-studies-new/educational-studies-new.component';
import { EducationalStudiesViewComponent } from '../educational-studies-view/educational-studies-view.component';
import { EducationalStudiesService } from '../shared/educational-studies.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-educational-studies-list',
  templateUrl: './educational-studies-list.component.html',
  styleUrls: ['./educational-studies-list.component.scss'],
  providers: []
})

export class EducationalStudiesListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private sectionsOrCentersService: LookupService;
private areasService: LookupService;
private regionPopulationDensitiesService: LookupService;
private regionAdministrativeClassificationsService: LookupService;

  
departmentSelectOptions: MaterialSelectOptions;
educationalAdministrationSelectOptions: MaterialSelectOptions;
regionPopulationDensitySelectOptions: MaterialSelectOptions;
regionAdministrativeClassificationSelectOptions: MaterialSelectOptions;

  
	@ViewChild('department', { static: true }) DepartmentSelectComponent: MaterialSelectComponent;
	@ViewChild('educationalAdministration', { static: true }) EducationalAdministrationSelectComponent: MaterialSelectComponent;
	@ViewChild('regionPopulationDensity', { static: true }) RegionPopulationDensitySelectComponent: MaterialSelectComponent;
	@ViewChild('regionAdministrativeClassification', { static: true }) RegionAdministrativeClassificationSelectComponent: MaterialSelectComponent;

  
  @Input() selectedEducationalStudies: EducationalStudies;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود المبنى', field: 'buildingCode' }),
	new GridColumnOptions({ headerName: 'المسافة من اقرب تجمع سكني', field: 'nearestCommunityDistance' }),
	new GridColumnOptions({ headerName: 'نصف قطر دائرة التوطين', field: 'localizationCircleRadius' }),
	new GridColumnOptions({ headerName: 'عدد الفصول', field: 'classesNumber' }),
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
	new GridColumnOptions({ headerName: 'المرحلة التعليمية', field: 'educationalLevel' }),
	new GridColumnOptions({ headerName: 'موقف الاحتياج التربوي', field: 'educationalNeedStance' }),
	new GridColumnOptions({ headerName: 'التصنيف الإداري للمنطقة', field: 'regionAdministrativeClassification' }),
	new GridColumnOptions({ headerName: 'الكثافة السكانية للمنطقه', field: 'regionPopulationDensity' }),
	new GridColumnOptions({ headerName: 'الإدارة التعليمية', field: 'educationalAdministration' }),
	new GridColumnOptions({ headerName: 'مالك الأرض الأصلي', field: 'originalLandOwner' }),
	new GridColumnOptions({ headerName: 'تابع لقرية', field: 'attachedVillage' }),
	new GridColumnOptions({ headerName: 'حي/قرية', field: 'village' }),
	new GridColumnOptions({ headerName: 'قسم/مركز', field: 'department' }),
	new GridColumnOptions({ headerName: 'سبب الدراسة', field: 'studyReason' }),
	new GridColumnOptions({ headerName: 'الفترة الثانية لدائرة التوطين', field: 'localizationDepartmentSecondPeriod' }),
	new GridColumnOptions({ headerName: 'موقف منطقة الاحتياج', field: 'needAreaStance' }),
	new GridColumnOptions({ headerName: 'نوعية التعليم', field: 'educationQuality' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: EducationalStudiesViewComponent,
    editDialogClassType: EducationalStudiesEditComponent,
    newDialogClassType: EducationalStudiesNewComponent,
  });
    constructor(
        injector: Injector,
        public educationalStudiesService: EducationalStudiesService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedEducationalStudies = new EducationalStudies();

    
	this.departmentSelectOptions = new MaterialSelectOptions({
	 data: this.sectionsOrCentersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'قسم/مركز',
	});

	this.educationalAdministrationSelectOptions = new MaterialSelectOptions({
	 data: this.areasService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الإدارة التعليمية',
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
	department : [],
	educationalAdministration : [],
	regionPopulationDensity : [],
	regionAdministrativeClassification : []
    });

     
  }

  getEducationalStudiesPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<EducationalStudies[]> => {
    return this.educationalStudiesService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.educationalStudiesService.delete(param.data.id)
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
    this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
this.areasService = new LookupService('areas', this.http);
this.regionPopulationDensitiesService = new LookupService('regionpopulationdensities', this.http);
this.regionAdministrativeClassificationsService = new LookupService('regionadministrativeclassifications', this.http);
  }
}

