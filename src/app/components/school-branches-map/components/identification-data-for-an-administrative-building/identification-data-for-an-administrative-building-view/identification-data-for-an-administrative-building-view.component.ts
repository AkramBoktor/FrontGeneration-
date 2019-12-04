
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { IdentificationDataForAnAdministrativeBuilding } from 'app/shared/models/identification-data-for-an-administrative-building';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { IdentificationDataForAnAdministrativeBuildingService } from '../shared/identification-data-for-an-administrative-building.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-identification-data-for-an-administrative-building-view',
  templateUrl: './identification-data-for-an-administrative-building-view.component.html',
  styleUrls: ['./identification-data-for-an-administrative-building-view.component.scss'],
  providers: []
})

export class IdentificationDataForAnAdministrativeBuildingViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedIdentificationDataForAnAdministrativeBuilding: IdentificationDataForAnAdministrativeBuilding;
  identificationDataForAnAdministrativeBuildingForm: FormGroup;

  private regionalCenterCodesService: LookupService;
private branchCodesService: LookupService;
private purposeOfConstructionsService: LookupService;
private regionAdministrativeClassificationsService: LookupService;
private useBuildingPositionsService: LookupService;
private areasService: LookupService;
private sectionsOrCentersService: LookupService;
private villagesService: LookupService;
private governoratesService: LookupService;
private landOwnershipsService: LookupService;
private buildingOwnershipsService: LookupService;

  
regionalCenterCodeSelectOptions: MaterialSelectOptions;
branchCodeSelectOptions: MaterialSelectOptions;
theBasicPurposeOfBuildingTheBuildingSelectOptions: MaterialSelectOptions;
classificationCodeSelectOptions: MaterialSelectOptions;
useBuildingPositionSelectOptions: MaterialSelectOptions;
educationalAdministrationSelectOptions: MaterialSelectOptions;
codeSectionCenterSelectOptions: MaterialSelectOptions;
codeNeighborhoodVillageSelectOptions: MaterialSelectOptions;
cityCodeSelectOptions: MaterialSelectOptions;
landOwnershipCodeSelectOptions: MaterialSelectOptions;
buildingOwnershipCodeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedIdentificationDataForAnAdministrativeBuildingDialog: any,
    @Optional() public dialogRef: MatDialogRef<IdentificationDataForAnAdministrativeBuildingViewComponent>,
    public identificationDataForAnAdministrativeBuildingService: IdentificationDataForAnAdministrativeBuildingService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedIdentificationDataForAnAdministrativeBuilding = this.selectedIdentificationDataForAnAdministrativeBuildingDialog.data || this.selectedIdentificationDataForAnAdministrativeBuilding;

    
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

	this.theBasicPurposeOfBuildingTheBuildingSelectOptions = new MaterialSelectOptions({
	 data: this.purposeOfConstructionsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الغرض الاساسي لانشاء المبني',
	});

	this.classificationCodeSelectOptions = new MaterialSelectOptions({
	 data: this.regionAdministrativeClassificationsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود التصنيف',
	});

	this.useBuildingPositionSelectOptions = new MaterialSelectOptions({
	 data: this.useBuildingPositionsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'موقف استخدام المبني',
	});

	this.educationalAdministrationSelectOptions = new MaterialSelectOptions({
	 data: this.areasService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الادارة التعليمية',
	});

	this.codeSectionCenterSelectOptions = new MaterialSelectOptions({
	 data: this.sectionsOrCentersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود قسم / مركز',
	});

	this.codeNeighborhoodVillageSelectOptions = new MaterialSelectOptions({
	 data: this.villagesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود حي / قرية',
	});

	this.cityCodeSelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود مدينة',
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


    this.identificationDataForAnAdministrativeBuildingForm = this.formBuilder.group({
      
  buildingCode : [this.selectedIdentificationDataForAnAdministrativeBuilding.buildingCode],
  nameOfTheBuildingOwner : [this.selectedIdentificationDataForAnAdministrativeBuilding.nameOfTheBuildingOwner],
  previousUseOfTheBuilding : [this.selectedIdentificationDataForAnAdministrativeBuilding.previousUseOfTheBuilding],
  villageContinued : [this.selectedIdentificationDataForAnAdministrativeBuilding.villageContinued],
  streetNameOfTheAdministrativeBuilding : [this.selectedIdentificationDataForAnAdministrativeBuilding.streetNameOfTheAdministrativeBuilding],
  streetNumber : [this.selectedIdentificationDataForAnAdministrativeBuilding.streetNumber],
  administrativeBuildingPhoneNumber : [this.selectedIdentificationDataForAnAdministrativeBuilding.administrativeBuildingPhoneNumber],
  regionalCenterCode : [this.selectedIdentificationDataForAnAdministrativeBuilding.regionalCenterCode],
  branchCode : [this.selectedIdentificationDataForAnAdministrativeBuilding.branchCode],
  theBasicPurposeOfBuildingTheBuilding : [this.selectedIdentificationDataForAnAdministrativeBuilding.theBasicPurposeOfBuildingTheBuilding],
  classificationCode : [this.selectedIdentificationDataForAnAdministrativeBuilding.classificationCode],
  useBuildingPosition : [this.selectedIdentificationDataForAnAdministrativeBuilding.useBuildingPosition],
  educationalAdministration : [this.selectedIdentificationDataForAnAdministrativeBuilding.educationalAdministration],
  codeSectionCenter : [this.selectedIdentificationDataForAnAdministrativeBuilding.codeSectionCenter],
  codeNeighborhoodVillage : [this.selectedIdentificationDataForAnAdministrativeBuilding.codeNeighborhoodVillage],
  cityCode : [this.selectedIdentificationDataForAnAdministrativeBuilding.cityCode],
  landOwnershipCode : [this.selectedIdentificationDataForAnAdministrativeBuilding.landOwnershipCode],
  buildingOwnershipCode : [this.selectedIdentificationDataForAnAdministrativeBuilding.buildingOwnershipCode]
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
    return this.identificationDataForAnAdministrativeBuildingForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.identificationDataForAnAdministrativeBuildingForm.controls)) {
      this.identificationDataForAnAdministrativeBuildingForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.regionalCenterCodesService = new LookupService('regionalcentercodes', this.http);
this.branchCodesService = new LookupService('branchcodes', this.http);
this.purposeOfConstructionsService = new LookupService('purposeofconstructions', this.http);
this.regionAdministrativeClassificationsService = new LookupService('regionadministrativeclassifications', this.http);
this.useBuildingPositionsService = new LookupService('usebuildingpositions', this.http);
this.areasService = new LookupService('areas', this.http);
this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
this.villagesService = new LookupService('villages', this.http);
this.governoratesService = new LookupService('governorates', this.http);
this.landOwnershipsService = new LookupService('landownerships', this.http);
this.buildingOwnershipsService = new LookupService('buildingownerships', this.http);
  }
}

