
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { EducationalStudies } from 'app/shared/models/educational-studies';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { EducationalStudiesService } from '../shared/educational-studies.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-educational-studies-view',
  templateUrl: './educational-studies-view.component.html',
  styleUrls: ['./educational-studies-view.component.scss'],
  providers: []
})

export class EducationalStudiesViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedEducationalStudies: EducationalStudies;
  educationalStudiesForm: FormGroup;

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

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedEducationalStudiesDialog: any,
    @Optional() public dialogRef: MatDialogRef<EducationalStudiesViewComponent>,
    public educationalStudiesService: EducationalStudiesService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedEducationalStudies = this.selectedEducationalStudiesDialog.data || this.selectedEducationalStudies;

    
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
      
  buildingCode : [this.selectedEducationalStudies.buildingCode],
  schoolName : [this.selectedEducationalStudies.schoolName],
  totalArea : [this.selectedEducationalStudies.totalArea],
  registrationNumber : [this.selectedEducationalStudies.registrationNumber],
  registrationDate : [this.selectedEducationalStudies.registrationDate],
  registrationTiming : [this.selectedEducationalStudies.registrationTiming],
  userName : [this.selectedEducationalStudies.userName],
  studyHistory : [this.selectedEducationalStudies.studyHistory],
  pupilsScheduledNumber : [this.selectedEducationalStudies.pupilsScheduledNumber],
  classesNumber : [this.selectedEducationalStudies.classesNumber],
  localizationCircleRadius : [this.selectedEducationalStudies.localizationCircleRadius],
  nearestCommunityDistance : [this.selectedEducationalStudies.nearestCommunityDistance],
  studyReason : [this.selectedEducationalStudies.studyReason],
  department : [this.selectedEducationalStudies.department],
  village : [this.selectedEducationalStudies.village],
  attachedVillage : [this.selectedEducationalStudies.attachedVillage],
  originalLandOwner : [this.selectedEducationalStudies.originalLandOwner],
  educationalAdministration : [this.selectedEducationalStudies.educationalAdministration],
  regionPopulationDensity : [this.selectedEducationalStudies.regionPopulationDensity],
  regionAdministrativeClassification : [this.selectedEducationalStudies.regionAdministrativeClassification],
  educationalNeedStance : [this.selectedEducationalStudies.educationalNeedStance],
  educationalLevel : [this.selectedEducationalStudies.educationalLevel],
  pupilsType : [this.selectedEducationalStudies.pupilsType],
  influencingSurroundingSchools : [this.selectedEducationalStudies.influencingSurroundingSchools],
  localizationDepartmentSecondPeriod : [this.selectedEducationalStudies.localizationDepartmentSecondPeriod],
  needAreaStance : [this.selectedEducationalStudies.needAreaStance]
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
    return this.educationalStudiesForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.educationalStudiesForm.controls)) {
      this.educationalStudiesForm.controls[control].disable();
    }
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

