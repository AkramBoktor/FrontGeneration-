
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { EducationalStudies } from 'app/shared/models/educational-studies';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { EducationalStudiesService } from '../shared/educational-studies.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-educational-studies-edit',
  templateUrl: './educational-studies-edit.component.html',
  styleUrls: ['./educational-studies-edit.component.scss'],
  providers: []
})

export class EducationalStudiesEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedEducationalStudies: EducationalStudies;
  educationalStudiesForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private schoolSurroundingImpactsService: LookupService;
private pupilsTypesService: LookupService;
private educationalLevelsService: LookupService;
private educationalNeedAttitudesService: LookupService;
private regionAdministrativeClassificationsService: LookupService;
private regionPopulationDensitiesService: LookupService;
private areasService: LookupService;
private landOwnershipsService: LookupService;
private villagesService: LookupService;
private sectionsOrCentersService: LookupService;
private studyReasonsService: LookupService;
private secondPeriodDepartmentLocalizationsService: LookupService;
private positionAreaNeedsService: LookupService;
private educationTypesService: LookupService;

  
influencingSurroundingSchoolsSelectOptions: MaterialSelectOptions;
pupilsTypeSelectOptions: MaterialSelectOptions;
educationalLevelSelectOptions: MaterialSelectOptions;
educationalNeedStanceSelectOptions: MaterialSelectOptions;
regionAdministrativeClassificationSelectOptions: MaterialSelectOptions;
regionPopulationDensitySelectOptions: MaterialSelectOptions;
educationalAdministrationSelectOptions: MaterialSelectOptions;
originalLandOwnerSelectOptions: MaterialSelectOptions;
attachedVillageSelectOptions: MaterialSelectOptions;
villageSelectOptions: MaterialSelectOptions;
departmentSelectOptions: MaterialSelectOptions;
studyReasonSelectOptions: MaterialSelectOptions;
localizationDepartmentSecondPeriodSelectOptions: MaterialSelectOptions;
needAreaStanceSelectOptions: MaterialSelectOptions;
educationQualitySelectOptions: MaterialSelectOptions;

  
	@ViewChild('influencingSurroundingSchools', { static: true }) InfluencingSurroundingSchoolsSelectComponent: MaterialSelectComponent;
	@ViewChild('pupilsType', { static: true }) PupilsTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('educationalLevel', { static: true }) EducationalLevelSelectComponent: MaterialSelectComponent;
	@ViewChild('educationalNeedStance', { static: true }) EducationalNeedStanceSelectComponent: MaterialSelectComponent;
	@ViewChild('regionAdministrativeClassification', { static: true }) RegionAdministrativeClassificationSelectComponent: MaterialSelectComponent;
	@ViewChild('regionPopulationDensity', { static: true }) RegionPopulationDensitySelectComponent: MaterialSelectComponent;
	@ViewChild('educationalAdministration', { static: true }) EducationalAdministrationSelectComponent: MaterialSelectComponent;
	@ViewChild('originalLandOwner', { static: true }) OriginalLandOwnerSelectComponent: MaterialSelectComponent;
	@ViewChild('attachedVillage', { static: true }) AttachedVillageSelectComponent: MaterialSelectComponent;
	@ViewChild('village', { static: true }) VillageSelectComponent: MaterialSelectComponent;
	@ViewChild('department', { static: true }) DepartmentSelectComponent: MaterialSelectComponent;
	@ViewChild('studyReason', { static: true }) StudyReasonSelectComponent: MaterialSelectComponent;
	@ViewChild('localizationDepartmentSecondPeriod', { static: true }) LocalizationDepartmentSecondPeriodSelectComponent: MaterialSelectComponent;
	@ViewChild('needAreaStance', { static: true }) NeedAreaStanceSelectComponent: MaterialSelectComponent;
	@ViewChild('educationQuality', { static: true }) EducationQualitySelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedEducationalStudiesDialog: any,
    @Optional() public dialogRef: MatDialogRef<EducationalStudiesEditComponent>,
    public educationalStudiesService: EducationalStudiesService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedEducationalStudies = new EducationalStudies();
    this.selectedEducationalStudies = this.selectedEducationalStudiesDialog.data || this.selectedEducationalStudies;

    
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

	this.educationalLevelSelectOptions = new MaterialSelectOptions({
	 data: this.educationalLevelsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المرحلة التعليمية',
	});

	this.educationalNeedStanceSelectOptions = new MaterialSelectOptions({
	 data: this.educationalNeedAttitudesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'موقف الاحتياج التربوي',
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

	this.attachedVillageSelectOptions = new MaterialSelectOptions({
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

	this.localizationDepartmentSecondPeriodSelectOptions = new MaterialSelectOptions({
	 data: this.secondPeriodDepartmentLocalizationsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الفترة الثانية لدائرة التوطين',
	});

	this.needAreaStanceSelectOptions = new MaterialSelectOptions({
	 data: this.positionAreaNeedsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'موقف منطقة الاحتياج',
	});

	this.educationQualitySelectOptions = new MaterialSelectOptions({
	 data: this.educationTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوعية التعليم',
	});


    this.educationalStudiesForm = this.formBuilder.group({
      
  id : [this.selectedEducationalStudies.id],
  buildingCode : [this.selectedEducationalStudies.buildingCode, [ Validators.required ]],
  nearestCommunityDistance : [this.selectedEducationalStudies.nearestCommunityDistance, [ Validators.required ]],
  localizationCircleRadius : [this.selectedEducationalStudies.localizationCircleRadius, [ Validators.required ]],
  classesNumber : [this.selectedEducationalStudies.classesNumber, [ Validators.required ]],
  pupilsScheduledNumber : [this.selectedEducationalStudies.pupilsScheduledNumber, [ ]],
  studyHistory : [this.selectedEducationalStudies.studyHistory, [ Validators.required ]],
  userName : [this.selectedEducationalStudies.userName, [ ]],
  registrationTiming : [this.selectedEducationalStudies.registrationTiming, [ ]],
  registrationDate : [this.selectedEducationalStudies.registrationDate, [ ]],
  registrationNumber : [this.selectedEducationalStudies.registrationNumber, [ Validators.required ]],
  totalArea : [this.selectedEducationalStudies.totalArea, [ Validators.required ]],
  schoolName : [this.selectedEducationalStudies.schoolName, [ ]],
  influencingSurroundingSchools : [this.selectedEducationalStudies.influencingSurroundingSchools, [ Validators.required ]],
  pupilsType : [this.selectedEducationalStudies.pupilsType, [ Validators.required ]],
  educationalLevel : [this.selectedEducationalStudies.educationalLevel, [ Validators.required ]],
  educationalNeedStance : [this.selectedEducationalStudies.educationalNeedStance, [ Validators.required ]],
  regionAdministrativeClassification : [this.selectedEducationalStudies.regionAdministrativeClassification, [ Validators.required ]],
  regionPopulationDensity : [this.selectedEducationalStudies.regionPopulationDensity, [ Validators.required ]],
  educationalAdministration : [this.selectedEducationalStudies.educationalAdministration, [ Validators.required ]],
  originalLandOwner : [this.selectedEducationalStudies.originalLandOwner, [ Validators.required ]],
  attachedVillage : [this.selectedEducationalStudies.attachedVillage, [ Validators.required ]],
  village : [this.selectedEducationalStudies.village, [ Validators.required ]],
  department : [this.selectedEducationalStudies.department, [ Validators.required ]],
  studyReason : [this.selectedEducationalStudies.studyReason, [ Validators.required ]],
  localizationDepartmentSecondPeriod : [this.selectedEducationalStudies.localizationDepartmentSecondPeriod, [ Validators.required ]],
  needAreaStance : [this.selectedEducationalStudies.needAreaStance, [ Validators.required ]],
  educationQuality : [this.selectedEducationalStudies.educationQuality, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.educationalStudiesService.update(this.educationalStudiesForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.educationalStudiesService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.educationalStudiesForm.get(name);
  }

  initializeLookupServices() {
    this.schoolSurroundingImpactsService = new LookupService('schoolsurroundingimpacts', this.http);
this.pupilsTypesService = new LookupService('pupilstypes', this.http);
this.educationalLevelsService = new LookupService('educationallevels', this.http);
this.educationalNeedAttitudesService = new LookupService('educationalneedattitudes', this.http);
this.regionAdministrativeClassificationsService = new LookupService('regionadministrativeclassifications', this.http);
this.regionPopulationDensitiesService = new LookupService('regionpopulationdensities', this.http);
this.areasService = new LookupService('areas', this.http);
this.landOwnershipsService = new LookupService('landownerships', this.http);
this.villagesService = new LookupService('villages', this.http);
this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
this.studyReasonsService = new LookupService('studyreasons', this.http);
this.secondPeriodDepartmentLocalizationsService = new LookupService('secondperioddepartmentlocalizations', this.http);
this.positionAreaNeedsService = new LookupService('positionareaneeds', this.http);
this.educationTypesService = new LookupService('educationtypes', this.http);
  }
}
