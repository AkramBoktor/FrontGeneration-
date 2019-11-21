
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { EducationalBuildingData } from 'app/shared/models/educational-building-data';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { EducationalBuildingDataEditComponent } from '../educational-building-data-edit/educational-building-data-edit.component';
import { EducationalBuildingDataNewComponent } from '../educational-building-data-new/educational-building-data-new.component';
import { EducationalBuildingDataViewComponent } from '../educational-building-data-view/educational-building-data-view.component';
import { EducationalBuildingDataService } from '../shared/educational-building-data.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-educational-building-data-list',
  templateUrl: './educational-building-data-list.component.html',
  styleUrls: ['./educational-building-data-list.component.scss'],
  providers: []
})

export class EducationalBuildingDataListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private branchCodesService: LookupService;
private constructionTypesService: LookupService;
private useBuildingPositionsService: LookupService;
private areasService: LookupService;
private sectionsOrCentersService: LookupService;
private villagesService: LookupService;
private governoratesService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;
purposeOfConstructionSelectOptions: MaterialSelectOptions;
useBuildingPositionSelectOptions: MaterialSelectOptions;
educationalAdministrationSelectOptions: MaterialSelectOptions;
sectionCenterSelectOptions: MaterialSelectOptions;
villageSelectOptions: MaterialSelectOptions;
citySelectOptions: MaterialSelectOptions;

  
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('purposeOfConstruction', { static: true }) PurposeOfConstructionSelectComponent: MaterialSelectComponent;
	@ViewChild('useBuildingPosition', { static: true }) UseBuildingPositionSelectComponent: MaterialSelectComponent;
	@ViewChild('educationalAdministration', { static: true }) EducationalAdministrationSelectComponent: MaterialSelectComponent;
	@ViewChild('sectionCenter', { static: true }) SectionCenterSelectComponent: MaterialSelectComponent;
	@ViewChild('village', { static: true }) VillageSelectComponent: MaterialSelectComponent;
	@ViewChild('city', { static: true }) CitySelectComponent: MaterialSelectComponent;

  
  @Input() selectedEducationalBuildingData: EducationalBuildingData;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود المبنى', field: 'buildingCode' }),
	new GridColumnOptions({ headerName: 'اسم المدرسة', field: 'schoolName' }),
	new GridColumnOptions({ headerName: 'اسم المدرسة السابق', field: 'prevSchoolName' }),
	new GridColumnOptions({ headerName: 'اسم شارع المبنى التعليمي', field: 'educationalBuildingStreetName' }),
	new GridColumnOptions({ headerName: 'رقم الشارع', field: 'streetNumber' }),
	new GridColumnOptions({ headerName: 'رقم تليفون المبنى التعليمي', field: 'educationalBuildingPhoneNumber' }),
	new GridColumnOptions({ headerName: 'تكلفة انشاء المبنى', field: 'buildingConstructionCost' }),
	new GridColumnOptions({ headerName: 'كود المركز الاقليمي', field: 'regionalCenterCode' }),
	new GridColumnOptions({ headerName: 'كود الفرع', field: 'branchCode' }),
	new GridColumnOptions({ headerName: 'الغرض الأساسي لانشاء المبنى', field: 'purposeOfConstruction' }),
	new GridColumnOptions({ headerName: 'موقف استخدام المبنى', field: 'useBuildingPosition' }),
	new GridColumnOptions({ headerName: 'الإدارة التعليمية', field: 'educationalAdministration' }),
	new GridColumnOptions({ headerName: 'قسم/مركز', field: 'sectionCenter' }),
	new GridColumnOptions({ headerName: 'حي/قرية', field: 'village' }),
	new GridColumnOptions({ headerName: 'مدينة', field: 'city' }),
	new GridColumnOptions({ headerName: 'تابع لقرية', field: 'continuedToVillage' }),
	new GridColumnOptions({ headerName: 'كود ملكية الارض', field: 'landOwnershipCode' }),
	new GridColumnOptions({ headerName: 'كود ملكية المبنى', field: 'buildingOwnershipCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: EducationalBuildingDataViewComponent,
    editDialogClassType: EducationalBuildingDataEditComponent,
    newDialogClassType: EducationalBuildingDataNewComponent,
  });
    constructor(
        injector: Injector,
        public educationalBuildingDataService: EducationalBuildingDataService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedEducationalBuildingData = new EducationalBuildingData();

    
	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الفرع',
	});

	this.purposeOfConstructionSelectOptions = new MaterialSelectOptions({
	 data: this.constructionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الغرض الأساسي لانشاء المبنى',
	});

	this.useBuildingPositionSelectOptions = new MaterialSelectOptions({
	 data: this.useBuildingPositionsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'موقف استخدام المبنى',
	});

	this.educationalAdministrationSelectOptions = new MaterialSelectOptions({
	 data: this.areasService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الإدارة التعليمية',
	});

	this.sectionCenterSelectOptions = new MaterialSelectOptions({
	 data: this.sectionsOrCentersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'قسم/مركز',
	});

	this.villageSelectOptions = new MaterialSelectOptions({
	 data: this.villagesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حي/قرية',
	});

	this.citySelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'مدينة',
	});


    this.searchForm = this.formBuilder.group({
     	buildingCode : [],
	regionalCenterCode : [],
	schoolName : [],
	educationalBuildingPhoneNumber : [],
	branchCode : [],
	purposeOfConstruction : [],
	useBuildingPosition : [],
	educationalAdministration : [],
	sectionCenter : [],
	village : [],
	city : []
    });

     
  }

  getEducationalBuildingsDataPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<EducationalBuildingData[]> => {
    return this.educationalBuildingDataService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.educationalBuildingDataService.delete(param.data.id)
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
this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.useBuildingPositionsService = new LookupService('usebuildingpositions', this.http);
this.areasService = new LookupService('areas', this.http);
this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
this.villagesService = new LookupService('villages', this.http);
this.governoratesService = new LookupService('governorates', this.http);
  }
}

