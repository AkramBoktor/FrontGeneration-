
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { IdentificationDataForAnAdministrativeBuilding } from 'app/shared/models/identification-data-for-an-administrative-building';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { IdentificationDataForAnAdministrativeBuildingService } from '../shared/identification-data-for-an-administrative-building.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-identification-data-for-an-administrative-building-new',
  templateUrl: './identification-data-for-an-administrative-building-new.component.html',
  styleUrls: ['./identification-data-for-an-administrative-building-new.component.scss'],
  providers: [
    ]
})

export class IdentificationDataForAnAdministrativeBuildingNewComponent extends AppBaseComponent implements OnInit {
  identificationDataForAnAdministrativeBuildingForm: FormGroup;
  @Input() selectedIdentificationDataForAnAdministrativeBuilding: IdentificationDataForAnAdministrativeBuilding;
  errorMessages: FormControlError[] = [
        
  ];

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

  
	@ViewChild('regionalCenterCode', { static: true }) RegionalCenterCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('theBasicPurposeOfBuildingTheBuilding', { static: true }) TheBasicPurposeOfBuildingTheBuildingSelectComponent: MaterialSelectComponent;
	@ViewChild('classificationCode', { static: true }) ClassificationCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('useBuildingPosition', { static: true }) UseBuildingPositionSelectComponent: MaterialSelectComponent;
	@ViewChild('educationalAdministration', { static: true }) EducationalAdministrationSelectComponent: MaterialSelectComponent;
	@ViewChild('codeSectionCenter', { static: true }) CodeSectionCenterSelectComponent: MaterialSelectComponent;
	@ViewChild('codeNeighborhoodVillage', { static: true }) CodeNeighborhoodVillageSelectComponent: MaterialSelectComponent;
	@ViewChild('cityCode', { static: true }) CityCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('landOwnershipCode', { static: true }) LandOwnershipCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('buildingOwnershipCode', { static: true }) BuildingOwnershipCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<IdentificationDataForAnAdministrativeBuildingNewComponent>,
    public identificationDataForAnAdministrativeBuildingService: IdentificationDataForAnAdministrativeBuildingService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedIdentificationDataForAnAdministrativeBuilding = new IdentificationDataForAnAdministrativeBuilding();

    
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
     
  id : [0],
  buildingCode : [this.selectedIdentificationDataForAnAdministrativeBuilding.buildingCode, [ Validators.required ]],
  nameOfTheBuildingOwner : [this.selectedIdentificationDataForAnAdministrativeBuilding.nameOfTheBuildingOwner, [ Validators.required ]],
  previousUseOfTheBuilding : [this.selectedIdentificationDataForAnAdministrativeBuilding.previousUseOfTheBuilding, [ Validators.required ]],
  villageContinued : [this.selectedIdentificationDataForAnAdministrativeBuilding.villageContinued, [ Validators.required ]],
  streetNameOfTheAdministrativeBuilding : [this.selectedIdentificationDataForAnAdministrativeBuilding.streetNameOfTheAdministrativeBuilding, [ Validators.required ]],
  streetNumber : [this.selectedIdentificationDataForAnAdministrativeBuilding.streetNumber, [ Validators.required ]],
  administrativeBuildingPhoneNumber : [this.selectedIdentificationDataForAnAdministrativeBuilding.administrativeBuildingPhoneNumber, [ Validators.required ]],
  regionalCenterCode : [this.selectedIdentificationDataForAnAdministrativeBuilding.regionalCenterCode, [ Validators.required ]],
  branchCode : [this.selectedIdentificationDataForAnAdministrativeBuilding.branchCode, [ Validators.required ]],
  theBasicPurposeOfBuildingTheBuilding : [this.selectedIdentificationDataForAnAdministrativeBuilding.theBasicPurposeOfBuildingTheBuilding, [ Validators.required ]],
  classificationCode : [this.selectedIdentificationDataForAnAdministrativeBuilding.classificationCode, [ Validators.required ]],
  useBuildingPosition : [this.selectedIdentificationDataForAnAdministrativeBuilding.useBuildingPosition, [ Validators.required ]],
  educationalAdministration : [this.selectedIdentificationDataForAnAdministrativeBuilding.educationalAdministration, [ Validators.required ]],
  codeSectionCenter : [this.selectedIdentificationDataForAnAdministrativeBuilding.codeSectionCenter, [ Validators.required ]],
  codeNeighborhoodVillage : [this.selectedIdentificationDataForAnAdministrativeBuilding.codeNeighborhoodVillage, [ Validators.required ]],
  cityCode : [this.selectedIdentificationDataForAnAdministrativeBuilding.cityCode, [ Validators.required ]],
  landOwnershipCode : [this.selectedIdentificationDataForAnAdministrativeBuilding.landOwnershipCode, [ Validators.required ]],
  buildingOwnershipCode : [this.selectedIdentificationDataForAnAdministrativeBuilding.buildingOwnershipCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.identificationDataForAnAdministrativeBuildingService.create(this.identificationDataForAnAdministrativeBuildingForm.value)
        .pipe(switchMap(x => {
			return this.identificationDataForAnAdministrativeBuildingService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.identificationDataForAnAdministrativeBuildingForm.get(name);
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
