
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { DataOfEducationalStudy } from 'app/shared/models/data-of-educational-study';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { DataOfEducationalStudyService } from '../shared/data-of-educational-study.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-data-of-educational-study-new',
  templateUrl: './data-of-educational-study-new.component.html',
  styleUrls: ['./data-of-educational-study-new.component.scss'],
  providers: [
    ]
})

export class DataOfEducationalStudyNewComponent extends AppBaseComponent implements OnInit {
  dataOfEducationalStudyForm: FormGroup;
  @Input() selectedDataOfEducationalStudy: DataOfEducationalStudy;
  errorMessages: FormControlError[] = [
        
  ];

  private studyReasonsService: LookupService;
private sectionsOrCentersService: LookupService;
private villagesService: LookupService;
private landOwnershipsService: LookupService;
private areasService: LookupService;
private regionPopulationDensitiesService: LookupService;
private regionAdministrativeClassificationsService: LookupService;
private educationalNeedAttitudesService: LookupService;
private educationalLevelsService: LookupService;
private educationTypesService: LookupService;
private pupilsTypesService: LookupService;
private schoolSurroundingImpactsService: LookupService;
private positionAreaNeedsService: LookupService;
private secondPeriodDepartmentLocalizationsService: LookupService;

  
studyReasonSelectOptions: MaterialSelectOptions;
departmentSelectOptions: MaterialSelectOptions;
villageSelectOptions: MaterialSelectOptions;
continuedVillageSelectOptions: MaterialSelectOptions;
originalLandOwnerSelectOptions: MaterialSelectOptions;
educationalAdministrationSelectOptions: MaterialSelectOptions;
regionPopulationDensitySelectOptions: MaterialSelectOptions;
regionAdministrativeClassificationSelectOptions: MaterialSelectOptions;
aducationalNeedAttitudeSelectOptions: MaterialSelectOptions;
educationalLevelSelectOptions: MaterialSelectOptions;
educationQualitySelectOptions: MaterialSelectOptions;
pupilsTypeSelectOptions: MaterialSelectOptions;
influencingSurroundingSchoolsSelectOptions: MaterialSelectOptions;
needPositionAreaSelectOptions: MaterialSelectOptions;
localizationDepartmentSecondPeriodSelectOptions: MaterialSelectOptions;

  
	@ViewChild('studyReason', { static: true }) StudyReasonSelectComponent: MaterialSelectComponent;
	@ViewChild('department', { static: true }) DepartmentSelectComponent: MaterialSelectComponent;
	@ViewChild('village', { static: true }) VillageSelectComponent: MaterialSelectComponent;
	@ViewChild('continuedVillage', { static: true }) ContinuedVillageSelectComponent: MaterialSelectComponent;
	@ViewChild('originalLandOwner', { static: true }) OriginalLandOwnerSelectComponent: MaterialSelectComponent;
	@ViewChild('educationalAdministration', { static: true }) EducationalAdministrationSelectComponent: MaterialSelectComponent;
	@ViewChild('regionPopulationDensity', { static: true }) RegionPopulationDensitySelectComponent: MaterialSelectComponent;
	@ViewChild('regionAdministrativeClassification', { static: true }) RegionAdministrativeClassificationSelectComponent: MaterialSelectComponent;
	@ViewChild('aducationalNeedAttitude', { static: true }) AducationalNeedAttitudeSelectComponent: MaterialSelectComponent;
	@ViewChild('educationalLevel', { static: true }) EducationalLevelSelectComponent: MaterialSelectComponent;
	@ViewChild('educationQuality', { static: true }) EducationQualitySelectComponent: MaterialSelectComponent;
	@ViewChild('pupilsType', { static: true }) PupilsTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('influencingSurroundingSchools', { static: true }) InfluencingSurroundingSchoolsSelectComponent: MaterialSelectComponent;
	@ViewChild('needPositionArea', { static: true }) NeedPositionAreaSelectComponent: MaterialSelectComponent;
	@ViewChild('localizationDepartmentSecondPeriod', { static: true }) LocalizationDepartmentSecondPeriodSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<DataOfEducationalStudyNewComponent>,
    public dataOfEducationalStudyService: DataOfEducationalStudyService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDataOfEducationalStudy = new DataOfEducationalStudy();

    
	this.studyReasonSelectOptions = new MaterialSelectOptions({
	 data: this.studyReasonsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'سبب الدراسة',
	});

	this.departmentSelectOptions = new MaterialSelectOptions({
	 data: this.sectionsOrCentersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'قسم/مركز',
	});

	this.villageSelectOptions = new MaterialSelectOptions({
	 data: this.villagesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حي/قرية',
	});

	this.continuedVillageSelectOptions = new MaterialSelectOptions({
	 data: this.villagesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'تابع لقرية',
	});

	this.originalLandOwnerSelectOptions = new MaterialSelectOptions({
	 data: this.landOwnershipsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'مالك الأرض الأصلي',
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

	this.aducationalNeedAttitudeSelectOptions = new MaterialSelectOptions({
	 data: this.educationalNeedAttitudesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'موقف الاحتياج التربوي',
	});

	this.educationalLevelSelectOptions = new MaterialSelectOptions({
	 data: this.educationalLevelsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المرحلة التعليمية',
	});

	this.educationQualitySelectOptions = new MaterialSelectOptions({
	 data: this.educationTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوعية التعليم',
	});

	this.pupilsTypeSelectOptions = new MaterialSelectOptions({
	 data: this.pupilsTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع التلاميذ',
	});

	this.influencingSurroundingSchoolsSelectOptions = new MaterialSelectOptions({
	 data: this.schoolSurroundingImpactsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'التاثير علي المدارس المحيطة ',
	});

	this.needPositionAreaSelectOptions = new MaterialSelectOptions({
	 data: this.positionAreaNeedsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'موقف منطقة الاحتياج',
	});

	this.localizationDepartmentSecondPeriodSelectOptions = new MaterialSelectOptions({
	 data: this.secondPeriodDepartmentLocalizationsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الفترة الثانية لدائرة التوطين',
	});


    this.dataOfEducationalStudyForm = this.formBuilder.group({
     
  id : [0],
  buildingCode : [this.selectedDataOfEducationalStudy.buildingCode, [ Validators.required ]],
  schoolName : [this.selectedDataOfEducationalStudy.schoolName, [ ]],
  totalArea : [this.selectedDataOfEducationalStudy.totalArea, [ Validators.required ]],
  registrationNumber : [this.selectedDataOfEducationalStudy.registrationNumber, [ Validators.required ]],
  registrationDate : [this.selectedDataOfEducationalStudy.registrationDate, [ ]],
  registrationTiming : [this.selectedDataOfEducationalStudy.registrationTiming, [ ]],
  userName : [this.selectedDataOfEducationalStudy.userName, [ ]],
  studyHistory : [this.selectedDataOfEducationalStudy.studyHistory, [ Validators.required ]],
  pupilsScheduledNumber : [this.selectedDataOfEducationalStudy.pupilsScheduledNumber, [ Validators.required ]],
  chaptersNumber : [this.selectedDataOfEducationalStudy.chaptersNumber, [ Validators.required ]],
  localizationCircleRadius : [this.selectedDataOfEducationalStudy.localizationCircleRadius, [ Validators.required ]],
  nearestCommunityDistance : [this.selectedDataOfEducationalStudy.nearestCommunityDistance, [ Validators.required ]],
  studyReason : [this.selectedDataOfEducationalStudy.studyReason, [ Validators.required ]],
  department : [this.selectedDataOfEducationalStudy.department, [ Validators.required ]],
  village : [this.selectedDataOfEducationalStudy.village, [ Validators.required ]],
  continuedVillage : [this.selectedDataOfEducationalStudy.continuedVillage, [ Validators.required ]],
  originalLandOwner : [this.selectedDataOfEducationalStudy.originalLandOwner, [ Validators.required ]],
  educationalAdministration : [this.selectedDataOfEducationalStudy.educationalAdministration, [ Validators.required ]],
  regionPopulationDensity : [this.selectedDataOfEducationalStudy.regionPopulationDensity, [ Validators.required ]],
  regionAdministrativeClassification : [this.selectedDataOfEducationalStudy.regionAdministrativeClassification, [ Validators.required ]],
  aducationalNeedAttitude : [this.selectedDataOfEducationalStudy.aducationalNeedAttitude, [ Validators.required ]],
  educationalLevel : [this.selectedDataOfEducationalStudy.educationalLevel, [ Validators.required ]],
  educationQuality : [this.selectedDataOfEducationalStudy.educationQuality, [ Validators.required ]],
  pupilsType : [this.selectedDataOfEducationalStudy.pupilsType, [ Validators.required ]],
  influencingSurroundingSchools : [this.selectedDataOfEducationalStudy.influencingSurroundingSchools, [ Validators.required ]],
  needPositionArea : [this.selectedDataOfEducationalStudy.needPositionArea, [ Validators.required ]],
  localizationDepartmentSecondPeriod : [this.selectedDataOfEducationalStudy.localizationDepartmentSecondPeriod, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.dataOfEducationalStudyService.create(this.dataOfEducationalStudyForm.value)
        .pipe(switchMap(x => {
			return this.dataOfEducationalStudyService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.dataOfEducationalStudyForm.get(name);
    }

  initializeLookupServices() {
    this.studyReasonsService = new LookupService('studyreasons', this.http);
this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
this.villagesService = new LookupService('villages', this.http);
this.villagesService = new LookupService('villages', this.http);
this.landOwnershipsService = new LookupService('landownerships', this.http);
this.areasService = new LookupService('areas', this.http);
this.regionPopulationDensitiesService = new LookupService('regionpopulationdensities', this.http);
this.regionAdministrativeClassificationsService = new LookupService('regionadministrativeclassifications', this.http);
this.educationalNeedAttitudesService = new LookupService('educationalneedattitudes', this.http);
this.educationalLevelsService = new LookupService('educationallevels', this.http);
this.educationTypesService = new LookupService('educationtypes', this.http);
this.pupilsTypesService = new LookupService('pupilstypes', this.http);
this.schoolSurroundingImpactsService = new LookupService('schoolsurroundingimpacts', this.http);
this.positionAreaNeedsService = new LookupService('positionareaneeds', this.http);
this.secondPeriodDepartmentLocalizationsService = new LookupService('secondperioddepartmentlocalizations', this.http);
  }
 }
