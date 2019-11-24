
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { EducationalBuildingData } from 'app/shared/models/educational-building-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { EducationalBuildingDataService } from '../shared/educational-building-data.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-educational-building-data-new',
  templateUrl: './educational-building-data-new.component.html',
  styleUrls: ['./educational-building-data-new.component.scss'],
  providers: [
    ]
})

export class EducationalBuildingDataNewComponent extends AppBaseComponent implements OnInit {
  educationalBuildingDataForm: FormGroup;
  @Input() selectedEducationalBuildingData: EducationalBuildingData;
  errorMessages: FormControlError[] = [
        
  ];

  private regionalCenterCodesService: LookupService;
private branchCodesService: LookupService;
private purposeOfConstructionsService: LookupService;
private useBuildingPositionsService: LookupService;
private areasService: LookupService;
private sectionsOrCentersService: LookupService;
private governoratesService: LookupService;
private villagesService: LookupService;
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

  
	@ViewChild('regionalCenterCode', { static: true }) RegionalCenterCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('purposeOfConstruction', { static: true }) PurposeOfConstructionSelectComponent: MaterialSelectComponent;
	@ViewChild('useBuildingPosition', { static: true }) UseBuildingPositionSelectComponent: MaterialSelectComponent;
	@ViewChild('educationalAdministration', { static: true }) EducationalAdministrationSelectComponent: MaterialSelectComponent;
	@ViewChild('sectionCenter', { static: true }) SectionCenterSelectComponent: MaterialSelectComponent;
	@ViewChild('village', { static: true }) VillageSelectComponent: MaterialSelectComponent;
	@ViewChild('city', { static: true }) CitySelectComponent: MaterialSelectComponent;
	@ViewChild('continuedToVillage', { static: true }) ContinuedToVillageSelectComponent: MaterialSelectComponent;
	@ViewChild('landOwnershipCode', { static: true }) LandOwnershipCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('buildingOwnershipCode', { static: true }) BuildingOwnershipCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<EducationalBuildingDataNewComponent>,
    public educationalBuildingDataService: EducationalBuildingDataService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedEducationalBuildingData = new EducationalBuildingData();

    
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
     
  id : [0],
  buildingCode : [this.selectedEducationalBuildingData.buildingCode, [ Validators.required ]],
  schoolName : [this.selectedEducationalBuildingData.schoolName, [ Validators.required ]],
  prevSchoolName : [this.selectedEducationalBuildingData.prevSchoolName, [ Validators.required ]],
  educationalBuildingStreetName : [this.selectedEducationalBuildingData.educationalBuildingStreetName, [ Validators.required ]],
  streetNumber : [this.selectedEducationalBuildingData.streetNumber, [ Validators.required ]],
  educationalBuildingPhoneNumber : [this.selectedEducationalBuildingData.educationalBuildingPhoneNumber, [ Validators.required ]],
  buildingConstructionCost : [this.selectedEducationalBuildingData.buildingConstructionCost, [ Validators.required ]],
  regionalCenterCode : [this.selectedEducationalBuildingData.regionalCenterCode, [ Validators.required ]],
  branchCode : [this.selectedEducationalBuildingData.branchCode, [ Validators.required ]],
  purposeOfConstruction : [this.selectedEducationalBuildingData.purposeOfConstruction, [ Validators.required ]],
  useBuildingPosition : [this.selectedEducationalBuildingData.useBuildingPosition, [ Validators.required ]],
  educationalAdministration : [this.selectedEducationalBuildingData.educationalAdministration, [ Validators.required ]],
  sectionCenter : [this.selectedEducationalBuildingData.sectionCenter, [ Validators.required ]],
  village : [this.selectedEducationalBuildingData.village, [ Validators.required ]],
  city : [this.selectedEducationalBuildingData.city, [ Validators.required ]],
  continuedToVillage : [this.selectedEducationalBuildingData.continuedToVillage, [ Validators.required ]],
  landOwnershipCode : [this.selectedEducationalBuildingData.landOwnershipCode, [ Validators.required ]],
  buildingOwnershipCode : [this.selectedEducationalBuildingData.buildingOwnershipCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.educationalBuildingDataService.create(this.educationalBuildingDataForm.value)
        .pipe(switchMap(x => {
			return this.educationalBuildingDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.educationalBuildingDataForm.get(name);
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
