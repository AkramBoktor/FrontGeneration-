
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { EducationalBuildingData } from 'app/shared/models/educational-building-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { EducationalBuildingDataService } from '../shared/educational-building-data.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-educational-building-data-view',
  templateUrl: './educational-building-data-view.component.html',
  styleUrls: ['./educational-building-data-view.component.scss'],
  providers: []
})

export class EducationalBuildingDataViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedEducationalBuildingData: EducationalBuildingData;
  educationalBuildingDataForm: FormGroup;

  private regionalCenterCodesService: LookupService;
private branchCodesService: LookupService;
private purposeOfConstructionsService: LookupService;
private useBuildingPositionsService: LookupService;
private areasService: LookupService;
private sectionsOrCentersService: LookupService;
private villagesService: LookupService;
private governoratesService: LookupService;
private landOwnershipsService: LookupService;
private buildingOwnershipsService: LookupService;

  
regionalCenterCodeSelectOptions: MaterialSelectOptions;
branchCodeSelectOptions: MaterialSelectOptions;
purposeOfConstructionSelectOptions: MaterialSelectOptions;
useBuildingPositionSelectOptions: MaterialSelectOptions;
educationalAdministrationSelectOptions: MaterialSelectOptions;
sectionCenterSelectOptions: MaterialSelectOptions;
villageSelectOptions: MaterialSelectOptions;
citySelectOptions: MaterialSelectOptions;
continuedToVillageSelectOptions: MaterialSelectOptions;
landOwnershipCodeSelectOptions: MaterialSelectOptions;
buildingOwnershipCodeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedEducationalBuildingDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<EducationalBuildingDataViewComponent>,
    public educationalBuildingDataService: EducationalBuildingDataService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedEducationalBuildingData = this.selectedEducationalBuildingDataDialog.data || this.selectedEducationalBuildingData;

    
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

	this.purposeOfConstructionSelectOptions = new MaterialSelectOptions({
	 data: this.purposeOfConstructionsService.getAll(),
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

	this.continuedToVillageSelectOptions = new MaterialSelectOptions({
	 data: this.villagesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'تابع لقرية',
	});

	this.landOwnershipCodeSelectOptions = new MaterialSelectOptions({
	 data: this.landOwnershipsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود ملكية الارض',
	});

	this.buildingOwnershipCodeSelectOptions = new MaterialSelectOptions({
	 data: this.buildingOwnershipsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود ملكية المبنى',
	});


    this.educationalBuildingDataForm = this.formBuilder.group({
      
  buildingCode : [this.selectedEducationalBuildingData.buildingCode],
  schoolName : [this.selectedEducationalBuildingData.schoolName],
  prevSchoolName : [this.selectedEducationalBuildingData.prevSchoolName],
  educationalBuildingStreetName : [this.selectedEducationalBuildingData.educationalBuildingStreetName],
  streetNumber : [this.selectedEducationalBuildingData.streetNumber],
  educationalBuildingPhoneNumber : [this.selectedEducationalBuildingData.educationalBuildingPhoneNumber],
  buildingConstructionCost : [this.selectedEducationalBuildingData.buildingConstructionCost],
  regionalCenterCode : [this.selectedEducationalBuildingData.regionalCenterCode],
  branchCode : [this.selectedEducationalBuildingData.branchCode],
  purposeOfConstruction : [this.selectedEducationalBuildingData.purposeOfConstruction],
  useBuildingPosition : [this.selectedEducationalBuildingData.useBuildingPosition],
  educationalAdministration : [this.selectedEducationalBuildingData.educationalAdministration],
  sectionCenter : [this.selectedEducationalBuildingData.sectionCenter],
  village : [this.selectedEducationalBuildingData.village],
  city : [this.selectedEducationalBuildingData.city],
  continuedToVillage : [this.selectedEducationalBuildingData.continuedToVillage],
  landOwnershipCode : [this.selectedEducationalBuildingData.landOwnershipCode],
  buildingOwnershipCode : [this.selectedEducationalBuildingData.buildingOwnershipCode]
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
    return this.educationalBuildingDataForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.educationalBuildingDataForm.controls)) {
      this.educationalBuildingDataForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.regionalCenterCodesService = new LookupService('regionalcentercodes', this.http);
this.branchCodesService = new LookupService('branchcodes', this.http);
this.purposeOfConstructionsService = new LookupService('purposeofconstructions', this.http);
this.useBuildingPositionsService = new LookupService('usebuildingpositions', this.http);
this.areasService = new LookupService('areas', this.http);
this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
this.villagesService = new LookupService('villages', this.http);
this.governoratesService = new LookupService('governorates', this.http);
this.landOwnershipsService = new LookupService('landownerships', this.http);
this.buildingOwnershipsService = new LookupService('buildingownerships', this.http);
  }
}

