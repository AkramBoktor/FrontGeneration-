
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { IdentificationDataForAnAdministrativeBuilding } from 'app/shared/models/identification-data-for-an-administrative-building';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { IdentificationDataForAnAdministrativeBuildingEditComponent } from '../identification-data-for-an-administrative-building-edit/identification-data-for-an-administrative-building-edit.component';
import { IdentificationDataForAnAdministrativeBuildingNewComponent } from '../identification-data-for-an-administrative-building-new/identification-data-for-an-administrative-building-new.component';
import { IdentificationDataForAnAdministrativeBuildingViewComponent } from '../identification-data-for-an-administrative-building-view/identification-data-for-an-administrative-building-view.component';
import { IdentificationDataForAnAdministrativeBuildingService } from '../shared/identification-data-for-an-administrative-building.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-identification-data-for-an-administrative-building-list',
  templateUrl: './identification-data-for-an-administrative-building-list.component.html',
  styleUrls: ['./identification-data-for-an-administrative-building-list.component.scss'],
  providers: []
})

export class IdentificationDataForAnAdministrativeBuildingListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private regionalCenterCodesService: LookupService;
private governoratesService: LookupService;
private villagesService: LookupService;
private sectionsOrCentersService: LookupService;
private areasService: LookupService;
private useBuildingPositionsService: LookupService;
private regionAdministrativeClassificationsService: LookupService;
private purposeOfConstructionsService: LookupService;
private branchCodesService: LookupService;
private landOwnershipsService: LookupService;
private buildingOwnershipsService: LookupService;

  
regionalCenterCodeSelectOptions: MaterialSelectOptions;
cityCodeSelectOptions: MaterialSelectOptions;
codeNeighborhoodVillageSelectOptions: MaterialSelectOptions;
codeSectionCenterSelectOptions: MaterialSelectOptions;
educationalAdministrationSelectOptions: MaterialSelectOptions;
useBuildingPositionSelectOptions: MaterialSelectOptions;
classificationCodeSelectOptions: MaterialSelectOptions;
theBasicPurposeOfBuildingTheBuildingSelectOptions: MaterialSelectOptions;
branchCodeSelectOptions: MaterialSelectOptions;
landOwnershipCodeSelectOptions: MaterialSelectOptions;
buildingOwnershipCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('regionalCenterCode', { static: true }) RegionalCenterCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('cityCode', { static: true }) CityCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('codeNeighborhoodVillage', { static: true }) CodeNeighborhoodVillageSelectComponent: MaterialSelectComponent;
	@ViewChild('codeSectionCenter', { static: true }) CodeSectionCenterSelectComponent: MaterialSelectComponent;
	@ViewChild('educationalAdministration', { static: true }) EducationalAdministrationSelectComponent: MaterialSelectComponent;
	@ViewChild('useBuildingPosition', { static: true }) UseBuildingPositionSelectComponent: MaterialSelectComponent;
	@ViewChild('classificationCode', { static: true }) ClassificationCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('theBasicPurposeOfBuildingTheBuilding', { static: true }) TheBasicPurposeOfBuildingTheBuildingSelectComponent: MaterialSelectComponent;
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('landOwnershipCode', { static: true }) LandOwnershipCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('buildingOwnershipCode', { static: true }) BuildingOwnershipCodeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedIdentificationDataForAnAdministrativeBuilding: IdentificationDataForAnAdministrativeBuilding;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم تليفون المبني الاداري', field: 'administrativeBuildingPhoneNumber' }),
	new GridColumnOptions({ headerName: 'رقم الشارع', field: 'streetNumber' }),
	new GridColumnOptions({ headerName: 'اسم شارع المبني الاداري', field: 'streetNameOfTheAdministrativeBuilding' }),
	new GridColumnOptions({ headerName: 'تابع قرية', field: 'villageContinued' }),
	new GridColumnOptions({ headerName: 'الاستخدام السابق للمبني', field: 'previousUseOfTheBuilding' }),
	new GridColumnOptions({ headerName: 'اسم الادارة صاحبة المبني', field: 'nameOfTheBuildingOwner' }),
	new GridColumnOptions({ headerName: 'كود المبنى', field: 'buildingCode' }),
	new GridColumnOptions({ headerName: 'كود المركز الاقليمي', field: 'regionalCenterCode' }),
	new GridColumnOptions({ headerName: 'كود مدينة', field: 'cityCode' }),
	new GridColumnOptions({ headerName: 'كود حي / قرية', field: 'codeNeighborhoodVillage' }),
	new GridColumnOptions({ headerName: 'كود قسم / مركز', field: 'codeSectionCenter' }),
	new GridColumnOptions({ headerName: 'الادارة التعليمية', field: 'educationalAdministration' }),
	new GridColumnOptions({ headerName: 'موقف استخدام المبني', field: 'useBuildingPosition' }),
	new GridColumnOptions({ headerName: 'كود التصنيف', field: 'classificationCode' }),
	new GridColumnOptions({ headerName: 'الغرض الاساسي لانشاء المبني', field: 'theBasicPurposeOfBuildingTheBuilding' }),
	new GridColumnOptions({ headerName: 'كود الفرع', field: 'branchCode' }),
	new GridColumnOptions({ headerName: 'كود ملكية الارض', field: 'landOwnershipCode' }),
	new GridColumnOptions({ headerName: 'كود ملكية المبني', field: 'buildingOwnershipCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: IdentificationDataForAnAdministrativeBuildingViewComponent,
    editDialogClassType: IdentificationDataForAnAdministrativeBuildingEditComponent,
    newDialogClassType: IdentificationDataForAnAdministrativeBuildingNewComponent,
  });
    constructor(
        injector: Injector,
        public identificationDataForAnAdministrativeBuildingService: IdentificationDataForAnAdministrativeBuildingService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedIdentificationDataForAnAdministrativeBuilding = new IdentificationDataForAnAdministrativeBuilding();

    
	this.regionalCenterCodeSelectOptions = new MaterialSelectOptions({
	 data: this.regionalCenterCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المركز الاقليمي',
	});

	this.cityCodeSelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود مدينة',
	});

	this.codeNeighborhoodVillageSelectOptions = new MaterialSelectOptions({
	 data: this.villagesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود حي / قرية',
	});

	this.codeSectionCenterSelectOptions = new MaterialSelectOptions({
	 data: this.sectionsOrCentersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود قسم / مركز',
	});

	this.educationalAdministrationSelectOptions = new MaterialSelectOptions({
	 data: this.areasService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الادارة التعليمية',
	});

	this.useBuildingPositionSelectOptions = new MaterialSelectOptions({
	 data: this.useBuildingPositionsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'موقف استخدام المبني',
	});

	this.classificationCodeSelectOptions = new MaterialSelectOptions({
	 data: this.regionAdministrativeClassificationsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود التصنيف',
	});

	this.theBasicPurposeOfBuildingTheBuildingSelectOptions = new MaterialSelectOptions({
	 data: this.purposeOfConstructionsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الغرض الاساسي لانشاء المبني',
	});

	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الفرع',
	});

	this.landOwnershipCodeSelectOptions = new MaterialSelectOptions({
	 data: this.landOwnershipsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود ملكية الارض',
	});

	this.buildingOwnershipCodeSelectOptions = new MaterialSelectOptions({
	 data: this.buildingOwnershipsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود ملكية المبني',
	});


    this.searchForm = this.formBuilder.group({
     	administrativeBuildingPhoneNumber : [],
	streetNumber : [],
	streetNameOfTheAdministrativeBuilding : [],
	villageContinued : [],
	previousUseOfTheBuilding : [],
	nameOfTheBuildingOwner : [],
	buildingCode : [],
	regionalCenterCode : [],
	cityCode : [],
	codeNeighborhoodVillage : [],
	codeSectionCenter : [],
	educationalAdministration : [],
	useBuildingPosition : [],
	classificationCode : [],
	theBasicPurposeOfBuildingTheBuilding : [],
	branchCode : [],
	landOwnershipCode : [],
	buildingOwnershipCode : []
    });

     
  }

  getIdentificationDataForAnAdministrativeBuildingPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<IdentificationDataForAnAdministrativeBuilding[]> => {
    return this.identificationDataForAnAdministrativeBuildingService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.identificationDataForAnAdministrativeBuildingService.delete(param.data.id)
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
this.governoratesService = new LookupService('governorates', this.http);
this.villagesService = new LookupService('villages', this.http);
this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
this.areasService = new LookupService('areas', this.http);
this.useBuildingPositionsService = new LookupService('usebuildingpositions', this.http);
this.regionAdministrativeClassificationsService = new LookupService('regionadministrativeclassifications', this.http);
this.purposeOfConstructionsService = new LookupService('purposeofconstructions', this.http);
this.branchCodesService = new LookupService('branchcodes', this.http);
this.landOwnershipsService = new LookupService('landownerships', this.http);
this.buildingOwnershipsService = new LookupService('buildingownerships', this.http);
  }
}

