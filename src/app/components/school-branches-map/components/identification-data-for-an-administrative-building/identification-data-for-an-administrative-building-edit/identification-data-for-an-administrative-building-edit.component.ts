
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { IdentificationDataForAnAdministrativeBuilding } from 'app/shared/models/identification-data-for-an-administrative-building';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { IdentificationDataForAnAdministrativeBuildingService } from '../shared/identification-data-for-an-administrative-building.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-identification-data-for-an-administrative-building-edit',
  templateUrl: './identification-data-for-an-administrative-building-edit.component.html',
  styleUrls: ['./identification-data-for-an-administrative-building-edit.component.scss'],
  providers: []
})

export class IdentificationDataForAnAdministrativeBuildingEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedIdentificationDataForAnAdministrativeBuilding: IdentificationDataForAnAdministrativeBuilding;
  identificationDataForAnAdministrativeBuildingForm: FormGroup;
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

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedIdentificationDataForAnAdministrativeBuildingDialog: any,
    @Optional() public dialogRef: MatDialogRef<IdentificationDataForAnAdministrativeBuildingEditComponent>,
    public identificationDataForAnAdministrativeBuildingService: IdentificationDataForAnAdministrativeBuildingService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedIdentificationDataForAnAdministrativeBuilding = new IdentificationDataForAnAdministrativeBuilding();
    this.selectedIdentificationDataForAnAdministrativeBuilding = this.selectedIdentificationDataForAnAdministrativeBuildingDialog.data || this.selectedIdentificationDataForAnAdministrativeBuilding;

    
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


    this.identificationDataForAnAdministrativeBuildingForm = this.formBuilder.group({
      
  id : [this.selectedIdentificationDataForAnAdministrativeBuilding.id],
  administrativeBuildingPhoneNumber : [this.selectedIdentificationDataForAnAdministrativeBuilding.administrativeBuildingPhoneNumber, [ Validators.required ]],
  streetNumber : [this.selectedIdentificationDataForAnAdministrativeBuilding.streetNumber, [ Validators.required ]],
  streetNameOfTheAdministrativeBuilding : [this.selectedIdentificationDataForAnAdministrativeBuilding.streetNameOfTheAdministrativeBuilding, [ Validators.required ]],
  villageContinued : [this.selectedIdentificationDataForAnAdministrativeBuilding.villageContinued, [ Validators.required ]],
  previousUseOfTheBuilding : [this.selectedIdentificationDataForAnAdministrativeBuilding.previousUseOfTheBuilding, [ Validators.required ]],
  nameOfTheBuildingOwner : [this.selectedIdentificationDataForAnAdministrativeBuilding.nameOfTheBuildingOwner, [ Validators.required ]],
  buildingCode : [this.selectedIdentificationDataForAnAdministrativeBuilding.buildingCode, [ Validators.required ]],
  regionalCenterCode : [this.selectedIdentificationDataForAnAdministrativeBuilding.regionalCenterCode, [ Validators.required ]],
  cityCode : [this.selectedIdentificationDataForAnAdministrativeBuilding.cityCode, [ Validators.required ]],
  codeNeighborhoodVillage : [this.selectedIdentificationDataForAnAdministrativeBuilding.codeNeighborhoodVillage, [ Validators.required ]],
  codeSectionCenter : [this.selectedIdentificationDataForAnAdministrativeBuilding.codeSectionCenter, [ Validators.required ]],
  educationalAdministration : [this.selectedIdentificationDataForAnAdministrativeBuilding.educationalAdministration, [ Validators.required ]],
  useBuildingPosition : [this.selectedIdentificationDataForAnAdministrativeBuilding.useBuildingPosition, [ Validators.required ]],
  classificationCode : [this.selectedIdentificationDataForAnAdministrativeBuilding.classificationCode, [ Validators.required ]],
  theBasicPurposeOfBuildingTheBuilding : [this.selectedIdentificationDataForAnAdministrativeBuilding.theBasicPurposeOfBuildingTheBuilding, [ Validators.required ]],
  branchCode : [this.selectedIdentificationDataForAnAdministrativeBuilding.branchCode, [ Validators.required ]],
  landOwnershipCode : [this.selectedIdentificationDataForAnAdministrativeBuilding.landOwnershipCode, [ Validators.required ]],
  buildingOwnershipCode : [this.selectedIdentificationDataForAnAdministrativeBuilding.buildingOwnershipCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.identificationDataForAnAdministrativeBuildingService.update(this.identificationDataForAnAdministrativeBuildingForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.identificationDataForAnAdministrativeBuildingService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.identificationDataForAnAdministrativeBuildingForm.get(name);
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
