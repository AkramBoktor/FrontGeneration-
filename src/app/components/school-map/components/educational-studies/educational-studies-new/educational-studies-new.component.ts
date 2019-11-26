
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { EducationalStudies } from 'app/shared/models/educational-studies';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { EducationalStudiesService } from '../shared/educational-studies.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-educational-studies-new',
  templateUrl: './educational-studies-new.component.html',
  styleUrls: ['./educational-studies-new.component.scss'],
  providers: [
    ]
})

export class EducationalStudiesNewComponent extends AppBaseComponent implements OnInit {
  educationalStudiesForm: FormGroup;
  @Input() selectedEducationalStudies: EducationalStudies;
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
private pupilsTypesService: LookupService;
private schoolSurroundingImpactsService: LookupService;
private secondPeriodDepartmentLocalizationsService: LookupService;
private positionAreaNeedsService: LookupService;

  
studyReasonSelectOptions: MaterialSelectOptions;
departmentSelectOptions: MaterialSelectOptions;
villageSelectOptions: MaterialSelectOptions;
attachedVillageSelectOptions: MaterialSelectOptions;
originalLandOwnerSelectOptions: MaterialSelectOptions;
educationalAdministrationSelectOptions: MaterialSelectOptions;
regionPopulationDensitySelectOptions: MaterialSelectOptions;
regionAdministrativeClassificationSelectOptions: MaterialSelectOptions;
educationalNeedStanceSelectOptions: MaterialSelectOptions;
educationalLevelSelectOptions: MaterialSelectOptions;
pupilsTypeSelectOptions: MaterialSelectOptions;
influencingSurroundingSchoolsSelectOptions: MaterialSelectOptions;
localizationDepartmentSecondPeriodSelectOptions: MaterialSelectOptions;
needAreaStanceSelectOptions: MaterialSelectOptions;

  
	@ViewChild('studyReason', { static: true }) StudyReasonSelectComponent: MaterialSelectComponent;
	@ViewChild('department', { static: true }) DepartmentSelectComponent: MaterialSelectComponent;
	@ViewChild('village', { static: true }) VillageSelectComponent: MaterialSelectComponent;
	@ViewChild('attachedVillage', { static: true }) AttachedVillageSelectComponent: MaterialSelectComponent;
	@ViewChild('originalLandOwner', { static: true }) OriginalLandOwnerSelectComponent: MaterialSelectComponent;
	@ViewChild('educationalAdministration', { static: true }) EducationalAdministrationSelectComponent: MaterialSelectComponent;
	@ViewChild('regionPopulationDensity', { static: true }) RegionPopulationDensitySelectComponent: MaterialSelectComponent;
	@ViewChild('regionAdministrativeClassification', { static: true }) RegionAdministrativeClassificationSelectComponent: MaterialSelectComponent;
	@ViewChild('educationalNeedStance', { static: true }) EducationalNeedStanceSelectComponent: MaterialSelectComponent;
	@ViewChild('educationalLevel', { static: true }) EducationalLevelSelectComponent: MaterialSelectComponent;
	@ViewChild('pupilsType', { static: true }) PupilsTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('influencingSurroundingSchools', { static: true }) InfluencingSurroundingSchoolsSelectComponent: MaterialSelectComponent;
	@ViewChild('localizationDepartmentSecondPeriod', { static: true }) LocalizationDepartmentSecondPeriodSelectComponent: MaterialSelectComponent;
	@ViewChild('needAreaStance', { static: true }) NeedAreaStanceSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<EducationalStudiesNewComponent>,
    public educationalStudiesService: EducationalStudiesService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedEducationalStudies = new EducationalStudies();

    
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

	this.attachedVillageSelectOptions = new MaterialSelectOptions({
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

	this.educationalNeedStanceSelectOptions = new MaterialSelectOptions({
	 data: this.educationalNeedAttitudesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'موقف الاحتياج التربوي',
	});

	this.educationalLevelSelectOptions = new MaterialSelectOptions({
	 data: this.educationalLevelsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المرحلة التعليمية',
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


    this.educationalStudiesForm = this.formBuilder.group({
     
  id : [0],
  buildingCode : [this.selectedEducationalStudies.buildingCode, [ Validators.required ]],
  schoolName : [this.selectedEducationalStudies.schoolName, [ ]],
  totalArea : [this.selectedEducationalStudies.totalArea, [ Validators.required ]],
  registrationNumber : [this.selectedEducationalStudies.registrationNumber, [ Validators.required ]],
  registrationDate : [this.selectedEducationalStudies.registrationDate, [ ]],
  registrationTiming : [this.selectedEducationalStudies.registrationTiming, [ ]],
  userName : [this.selectedEducationalStudies.userName, [ ]],
  studyHistory : [this.selectedEducationalStudies.studyHistory, [ Validators.required ]],
  pupilsScheduledNumber : [this.selectedEducationalStudies.pupilsScheduledNumber, [ ]],
  classesNumber : [this.selectedEducationalStudies.classesNumber, [ Validators.required ]],
  localizationCircleRadius : [this.selectedEducationalStudies.localizationCircleRadius, [ Validators.required ]],
  nearestCommunityDistance : [this.selectedEducationalStudies.nearestCommunityDistance, [ Validators.required ]],
  studyReason : [this.selectedEducationalStudies.studyReason, [ Validators.required ]],
  department : [this.selectedEducationalStudies.department, [ Validators.required ]],
  village : [this.selectedEducationalStudies.village, [ Validators.required ]],
  attachedVillage : [this.selectedEducationalStudies.attachedVillage, [ Validators.required ]],
  originalLandOwner : [this.selectedEducationalStudies.originalLandOwner, [ Validators.required ]],
  educationalAdministration : [this.selectedEducationalStudies.educationalAdministration, [ Validators.required ]],
  regionPopulationDensity : [this.selectedEducationalStudies.regionPopulationDensity, [ Validators.required ]],
  regionAdministrativeClassification : [this.selectedEducationalStudies.regionAdministrativeClassification, [ Validators.required ]],
  educationalNeedStance : [this.selectedEducationalStudies.educationalNeedStance, [ Validators.required ]],
  educationalLevel : [this.selectedEducationalStudies.educationalLevel, [ Validators.required ]],
  pupilsType : [this.selectedEducationalStudies.pupilsType, [ Validators.required ]],
  influencingSurroundingSchools : [this.selectedEducationalStudies.influencingSurroundingSchools, [ Validators.required ]],
  localizationDepartmentSecondPeriod : [this.selectedEducationalStudies.localizationDepartmentSecondPeriod, [ Validators.required ]],
  needAreaStance : [this.selectedEducationalStudies.needAreaStance, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.educationalStudiesService.create(this.educationalStudiesForm.value)
        .pipe(switchMap(x => {
			return this.educationalStudiesService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.educationalStudiesForm.get(name);
    }

  initializeLookupServices() {
    this.studyReasonsService = new LookupService('studyreasons', this.http);
this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
this.villagesService = new LookupService('villages', this.http);
this.landOwnershipsService = new LookupService('landownerships', this.http);
this.areasService = new LookupService('areas', this.http);
this.regionPopulationDensitiesService = new LookupService('regionpopulationdensities', this.http);
this.regionAdministrativeClassificationsService = new LookupService('regionadministrativeclassifications', this.http);
this.educationalNeedAttitudesService = new LookupService('educationalneedattitudes', this.http);
this.educationalLevelsService = new LookupService('educationallevels', this.http);
this.pupilsTypesService = new LookupService('pupilstypes', this.http);
this.schoolSurroundingImpactsService = new LookupService('schoolsurroundingimpacts', this.http);
this.secondPeriodDepartmentLocalizationsService = new LookupService('secondperioddepartmentlocalizations', this.http);
this.positionAreaNeedsService = new LookupService('positionareaneeds', this.http);
  }
 }
