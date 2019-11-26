
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { SchoolData } from 'app/shared/models/school-data';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { SchoolDataEditComponent } from '../school-data-edit/school-data-edit.component';
import { SchoolDataNewComponent } from '../school-data-new/school-data-new.component';
import { SchoolDataViewComponent } from '../school-data-view/school-data-view.component';
import { SchoolDataService } from '../shared/school-data.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-school-data-list',
  templateUrl: './school-data-list.component.html',
  styleUrls: ['./school-data-list.component.scss'],
  providers: []
})

export class SchoolDataListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private regionalCenterCodesService: LookupService;
private branchCodesService: LookupService;
private dependencyCodesService: LookupService;
private educationalLevelsService: LookupService;
private educationTypesService: LookupService;
private usagePeriodNumbersService: LookupService;

  
regionalCenterCodeSelectOptions: MaterialSelectOptions;
branchCodeSelectOptions: MaterialSelectOptions;
dependencyCodeSelectOptions: MaterialSelectOptions;
phaseCodeSelectOptions: MaterialSelectOptions;
educationQualityCodeSelectOptions: MaterialSelectOptions;
periodsOfUseNumberSelectOptions: MaterialSelectOptions;

  
	@ViewChild('regionalCenterCode', { static: true }) RegionalCenterCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('dependencyCode', { static: true }) DependencyCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('phaseCode', { static: true }) PhaseCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('educationQualityCode', { static: true }) EducationQualityCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('periodsOfUseNumber', { static: true }) PeriodsOfUseNumberSelectComponent: MaterialSelectComponent;

  
  @Input() selectedSchoolData: SchoolData;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود المبنى', field: 'buildingCode' }),
	new GridColumnOptions({ headerName: 'كود المركز الاقليمي', field: 'regionalCenterCode' }),
	new GridColumnOptions({ headerName: 'كود الفرع', field: 'branchCode' }),
	new GridColumnOptions({ headerName: 'كود التبعية', field: 'dependencyCode' }),
	new GridColumnOptions({ headerName: 'كود المرحلة', field: 'phaseCode' }),
	new GridColumnOptions({ headerName: 'كود نوعية التعليم', field: 'educationQualityCode' }),
	new GridColumnOptions({ headerName: 'عدد فترات الاستخدام', field: 'periodsOfUseNumber' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: SchoolDataViewComponent,
    editDialogClassType: SchoolDataEditComponent,
    newDialogClassType: SchoolDataNewComponent,
  });
    constructor(
        injector: Injector,
        public schoolDataService: SchoolDataService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedSchoolData = new SchoolData();

    
	this.regionalCenterCodeSelectOptions = new MaterialSelectOptions({
	 data: this.regionalCenterCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المركز الاقليمي',
	});

	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الفرع',
	});

	this.dependencyCodeSelectOptions = new MaterialSelectOptions({
	 data: this.dependencyCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود التبعية',
	});

	this.phaseCodeSelectOptions = new MaterialSelectOptions({
	 data: this.educationalLevelsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المرحلة',
	});

	this.educationQualityCodeSelectOptions = new MaterialSelectOptions({
	 data: this.educationTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود نوعية التعليم',
	});

	this.periodsOfUseNumberSelectOptions = new MaterialSelectOptions({
	 data: this.usagePeriodNumbersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'عدد فترات الاستخدام',
	});


    this.searchForm = this.formBuilder.group({
     	buildingCode : [],
	regionalCenterCode : [],
	branchCode : [],
	dependencyCode : [],
	phaseCode : [],
	educationQualityCode : [],
	periodsOfUseNumber : []
    });

     
  }

  getSchoolsDataPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<SchoolData[]> => {
    return this.schoolDataService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.schoolDataService.delete(param.data.id)
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
    this.regionalCenterCodesService = new LookupService('regionalcentercodes', this.http);
this.branchCodesService = new LookupService('branchcodes', this.http);
this.dependencyCodesService = new LookupService('dependencycodes', this.http);
this.educationalLevelsService = new LookupService('educationallevels', this.http);
this.educationTypesService = new LookupService('educationtypes', this.http);
this.usagePeriodNumbersService = new LookupService('usageperiodnumbers', this.http);
  }
}

