
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { DataOfEducationalStudy } from 'app/shared/models/data-of-educational-study';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { DataOfEducationalStudyService } from '../shared/data-of-educational-study.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-data-of-educational-study-view',
  templateUrl: './data-of-educational-study-view.component.html',
  styleUrls: ['./data-of-educational-study-view.component.scss'],
  providers: []
})

export class DataOfEducationalStudyViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedDataOfEducationalStudy: DataOfEducationalStudy;
  dataOfEducationalStudyForm: FormGroup;

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

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedDataOfEducationalStudyDialog: any,
    @Optional() public dialogRef: MatDialogRef<DataOfEducationalStudyViewComponent>,
    public dataOfEducationalStudyService: DataOfEducationalStudyService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDataOfEducationalStudy = this.selectedDataOfEducationalStudyDialog.data || this.selectedDataOfEducationalStudy;

    
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
      
  buildingCode : [this.selectedDataOfEducationalStudy.buildingCode],
  schoolName : [this.selectedDataOfEducationalStudy.schoolName],
  totalArea : [this.selectedDataOfEducationalStudy.totalArea],
  registrationNumber : [this.selectedDataOfEducationalStudy.registrationNumber],
  registrationDate : [this.selectedDataOfEducationalStudy.registrationDate],
  registrationTiming : [this.selectedDataOfEducationalStudy.registrationTiming],
  userName : [this.selectedDataOfEducationalStudy.userName],
  studyHistory : [this.selectedDataOfEducationalStudy.studyHistory],
  pupilsScheduledNumber : [this.selectedDataOfEducationalStudy.pupilsScheduledNumber],
  chaptersNumber : [this.selectedDataOfEducationalStudy.chaptersNumber],
  localizationCircleRadius : [this.selectedDataOfEducationalStudy.localizationCircleRadius],
  nearestCommunityDistance : [this.selectedDataOfEducationalStudy.nearestCommunityDistance],
  studyReason : [this.selectedDataOfEducationalStudy.studyReason],
  department : [this.selectedDataOfEducationalStudy.department],
  village : [this.selectedDataOfEducationalStudy.village],
  continuedVillage : [this.selectedDataOfEducationalStudy.continuedVillage],
  originalLandOwner : [this.selectedDataOfEducationalStudy.originalLandOwner],
  educationalAdministration : [this.selectedDataOfEducationalStudy.educationalAdministration],
  regionPopulationDensity : [this.selectedDataOfEducationalStudy.regionPopulationDensity],
  regionAdministrativeClassification : [this.selectedDataOfEducationalStudy.regionAdministrativeClassification],
  aducationalNeedAttitude : [this.selectedDataOfEducationalStudy.aducationalNeedAttitude],
  educationalLevel : [this.selectedDataOfEducationalStudy.educationalLevel],
  educationQuality : [this.selectedDataOfEducationalStudy.educationQuality],
  pupilsType : [this.selectedDataOfEducationalStudy.pupilsType],
  influencingSurroundingSchools : [this.selectedDataOfEducationalStudy.influencingSurroundingSchools],
  needPositionArea : [this.selectedDataOfEducationalStudy.needPositionArea],
  localizationDepartmentSecondPeriod : [this.selectedDataOfEducationalStudy.localizationDepartmentSecondPeriod]
      });

    this.disableControls();
  }

  onConfirm() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  getErrorMessage = (formCtrl: AbstractControl) => {
    const errorMessages: FormControlError[] = [
          
        ];
    return ValidatorFunctions.getErrorMessage(formCtrl, errorMessages);
   }

  getControls(name: string) {
    return this.dataOfEducationalStudyForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.dataOfEducationalStudyForm.controls)) {
      this.dataOfEducationalStudyForm.controls[control].disable();
    }
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

