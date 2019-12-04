
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { DataOfEducationalStudy } from 'app/shared/models/data-of-educational-study';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { DataOfEducationalStudyService } from '../shared/data-of-educational-study.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-data-of-educational-study-edit',
  templateUrl: './data-of-educational-study-edit.component.html',
  styleUrls: ['./data-of-educational-study-edit.component.scss'],
  providers: []
})

export class DataOfEducationalStudyEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedDataOfEducationalStudy: DataOfEducationalStudy;
  dataOfEducationalStudyForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private schoolSurroundingImpactsService: LookupService;
private pupilsTypesService: LookupService;
private educationTypesService: LookupService;
private educationalLevelsService: LookupService;
private positionAreaNeedsService: LookupService;
private regionAdministrativeClassificationsService: LookupService;
private regionPopulationDensitiesService: LookupService;
private areasService: LookupService;
private landOwnershipsService: LookupService;
private villagesService: LookupService;
private sectionsOrCentersService: LookupService;
private studyReasonsService: LookupService;
private educationalNeedAttitudesService: LookupService;
private secondPeriodDepartmentLocalizationsService: LookupService;

  
influencingSurroundingSchoolsSelectOptions: MaterialSelectOptions;
pupilsTypeSelectOptions: MaterialSelectOptions;
educationQualitySelectOptions: MaterialSelectOptions;
educationalLevelSelectOptions: MaterialSelectOptions;
needPositionAreaSelectOptions: MaterialSelectOptions;
regionAdministrativeClassificationSelectOptions: MaterialSelectOptions;
regionPopulationDensitySelectOptions: MaterialSelectOptions;
educationalAdministrationSelectOptions: MaterialSelectOptions;
originalLandOwnerSelectOptions: MaterialSelectOptions;
continuedVillageSelectOptions: MaterialSelectOptions;
villageSelectOptions: MaterialSelectOptions;
departmentSelectOptions: MaterialSelectOptions;
studyReasonSelectOptions: MaterialSelectOptions;
aducationalNeedAttitudeSelectOptions: MaterialSelectOptions;
localizationDepartmentSecondPeriodSelectOptions: MaterialSelectOptions;

  
	@ViewChild('influencingSurroundingSchools', { static: true }) InfluencingSurroundingSchoolsSelectComponent: MaterialSelectComponent;
	@ViewChild('pupilsType', { static: true }) PupilsTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('educationQuality', { static: true }) EducationQualitySelectComponent: MaterialSelectComponent;
	@ViewChild('educationalLevel', { static: true }) EducationalLevelSelectComponent: MaterialSelectComponent;
	@ViewChild('needPositionArea', { static: true }) NeedPositionAreaSelectComponent: MaterialSelectComponent;
	@ViewChild('regionAdministrativeClassification', { static: true }) RegionAdministrativeClassificationSelectComponent: MaterialSelectComponent;
	@ViewChild('regionPopulationDensity', { static: true }) RegionPopulationDensitySelectComponent: MaterialSelectComponent;
	@ViewChild('educationalAdministration', { static: true }) EducationalAdministrationSelectComponent: MaterialSelectComponent;
	@ViewChild('originalLandOwner', { static: true }) OriginalLandOwnerSelectComponent: MaterialSelectComponent;
	@ViewChild('continuedVillage', { static: true }) ContinuedVillageSelectComponent: MaterialSelectComponent;
	@ViewChild('village', { static: true }) VillageSelectComponent: MaterialSelectComponent;
	@ViewChild('department', { static: true }) DepartmentSelectComponent: MaterialSelectComponent;
	@ViewChild('studyReason', { static: true }) StudyReasonSelectComponent: MaterialSelectComponent;
	@ViewChild('aducationalNeedAttitude', { static: true }) AducationalNeedAttitudeSelectComponent: MaterialSelectComponent;
	@ViewChild('localizationDepartmentSecondPeriod', { static: true }) LocalizationDepartmentSecondPeriodSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedDataOfEducationalStudyDialog: any,
    @Optional() public dialogRef: MatDialogRef<DataOfEducationalStudyEditComponent>,
    public dataOfEducationalStudyService: DataOfEducationalStudyService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDataOfEducationalStudy = new DataOfEducationalStudy();
    this.selectedDataOfEducationalStudy = this.selectedDataOfEducationalStudyDialog.data || this.selectedDataOfEducationalStudy;

    
	this.influencingSurroundingSchoolsSelectOptions = new MaterialSelectOptions({
	 data: this.schoolSurroundingImpactsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'التاثير علي المدارس المحيطة ',
	});

	this.pupilsTypeSelectOptions = new MaterialSelectOptions({
	 data: this.pupilsTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع التلاميذ',
	});

	this.educationQualitySelectOptions = new MaterialSelectOptions({
	 data: this.educationTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوعية التعليم',
	});

	this.educationalLevelSelectOptions = new MaterialSelectOptions({
	 data: this.educationalLevelsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المرحلة التعليمية',
	});

	this.needPositionAreaSelectOptions = new MaterialSelectOptions({
	 data: this.positionAreaNeedsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'موقف منطقة الاحتياج',
	});

	this.regionAdministrativeClassificationSelectOptions = new MaterialSelectOptions({
	 data: this.regionAdministrativeClassificationsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'التصنيف الإداري للمنطقة',
	});

	this.regionPopulationDensitySelectOptions = new MaterialSelectOptions({
	 data: this.regionPopulationDensitiesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الكثافة السكانية للمنطقه',
	});

	this.educationalAdministrationSelectOptions = new MaterialSelectOptions({
	 data: this.areasService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الإدارة التعليمية',
	});

	this.originalLandOwnerSelectOptions = new MaterialSelectOptions({
	 data: this.landOwnershipsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'مالك الأرض الأصلي',
	});

	this.continuedVillageSelectOptions = new MaterialSelectOptions({
	 data: this.villagesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'تابع لقرية',
	});

	this.villageSelectOptions = new MaterialSelectOptions({
	 data: this.villagesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حي/قرية',
	});

	this.departmentSelectOptions = new MaterialSelectOptions({
	 data: this.sectionsOrCentersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'قسم/مركز',
	});

	this.studyReasonSelectOptions = new MaterialSelectOptions({
	 data: this.studyReasonsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'سبب الدراسة',
	});

	this.aducationalNeedAttitudeSelectOptions = new MaterialSelectOptions({
	 data: this.educationalNeedAttitudesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'موقف الاحتياج التربوي',
	});

	this.localizationDepartmentSecondPeriodSelectOptions = new MaterialSelectOptions({
	 data: this.secondPeriodDepartmentLocalizationsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الفترة الثانية لدائرة التوطين',
	});


    this.dataOfEducationalStudyForm = this.formBuilder.group({
      
  id : [this.selectedDataOfEducationalStudy.id],
  buildingCode : [this.selectedDataOfEducationalStudy.buildingCode, [ Validators.required ]],
  nearestCommunityDistance : [this.selectedDataOfEducationalStudy.nearestCommunityDistance, [ Validators.required ]],
  localizationCircleRadius : [this.selectedDataOfEducationalStudy.localizationCircleRadius, [ Validators.required ]],
  chaptersNumber : [this.selectedDataOfEducationalStudy.chaptersNumber, [ Validators.required ]],
  pupilsScheduledNumber : [this.selectedDataOfEducationalStudy.pupilsScheduledNumber, [ Validators.required ]],
  studyHistory : [this.selectedDataOfEducationalStudy.studyHistory, [ Validators.required ]],
  userName : [this.selectedDataOfEducationalStudy.userName, [ ]],
  registrationTiming : [this.selectedDataOfEducationalStudy.registrationTiming, [ ]],
  registrationDate : [this.selectedDataOfEducationalStudy.registrationDate, [ ]],
  registrationNumber : [this.selectedDataOfEducationalStudy.registrationNumber, [ Validators.required ]],
  totalArea : [this.selectedDataOfEducationalStudy.totalArea, [ Validators.required ]],
  schoolName : [this.selectedDataOfEducationalStudy.schoolName, [ ]],
  influencingSurroundingSchools : [this.selectedDataOfEducationalStudy.influencingSurroundingSchools, [ Validators.required ]],
  pupilsType : [this.selectedDataOfEducationalStudy.pupilsType, [ Validators.required ]],
  educationQuality : [this.selectedDataOfEducationalStudy.educationQuality, [ Validators.required ]],
  educationalLevel : [this.selectedDataOfEducationalStudy.educationalLevel, [ Validators.required ]],
  needPositionArea : [this.selectedDataOfEducationalStudy.needPositionArea, [ Validators.required ]],
  regionAdministrativeClassification : [this.selectedDataOfEducationalStudy.regionAdministrativeClassification, [ Validators.required ]],
  regionPopulationDensity : [this.selectedDataOfEducationalStudy.regionPopulationDensity, [ Validators.required ]],
  educationalAdministration : [this.selectedDataOfEducationalStudy.educationalAdministration, [ Validators.required ]],
  originalLandOwner : [this.selectedDataOfEducationalStudy.originalLandOwner, [ Validators.required ]],
  continuedVillage : [this.selectedDataOfEducationalStudy.continuedVillage, [ Validators.required ]],
  village : [this.selectedDataOfEducationalStudy.village, [ Validators.required ]],
  department : [this.selectedDataOfEducationalStudy.department, [ Validators.required ]],
  studyReason : [this.selectedDataOfEducationalStudy.studyReason, [ Validators.required ]],
  aducationalNeedAttitude : [this.selectedDataOfEducationalStudy.aducationalNeedAttitude, [ Validators.required ]],
  localizationDepartmentSecondPeriod : [this.selectedDataOfEducationalStudy.localizationDepartmentSecondPeriod, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.dataOfEducationalStudyService.update(this.dataOfEducationalStudyForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.dataOfEducationalStudyService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
	    }))
    .subscribe(
      (result) => {
          if (this.dialogRef)
          {
              this.dialogRef.close(true);
          }
    });
  }

  getControls(name: string) {
    return this.dataOfEducationalStudyForm.get(name);
  }

  initializeLookupServices() {
    this.schoolSurroundingImpactsService = new LookupService('schoolsurroundingimpacts', this.http);
this.pupilsTypesService = new LookupService('pupilstypes', this.http);
this.educationTypesService = new LookupService('educationtypes', this.http);
this.educationalLevelsService = new LookupService('educationallevels', this.http);
this.positionAreaNeedsService = new LookupService('positionareaneeds', this.http);
this.regionAdministrativeClassificationsService = new LookupService('regionadministrativeclassifications', this.http);
this.regionPopulationDensitiesService = new LookupService('regionpopulationdensities', this.http);
this.areasService = new LookupService('areas', this.http);
this.landOwnershipsService = new LookupService('landownerships', this.http);
this.villagesService = new LookupService('villages', this.http);
this.villagesService = new LookupService('villages', this.http);
this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
this.studyReasonsService = new LookupService('studyreasons', this.http);
this.educationalNeedAttitudesService = new LookupService('educationalneedattitudes', this.http);
this.secondPeriodDepartmentLocalizationsService = new LookupService('secondperioddepartmentlocalizations', this.http);
  }
}
