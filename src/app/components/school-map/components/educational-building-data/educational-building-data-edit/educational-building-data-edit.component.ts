
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { EducationalBuildingData } from 'app/shared/models/educational-building-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { EducationalBuildingDataService } from '../shared/educational-building-data.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-educational-building-data-edit',
  templateUrl: './educational-building-data-edit.component.html',
  styleUrls: ['./educational-building-data-edit.component.scss'],
  providers: []
})

export class EducationalBuildingDataEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedEducationalBuildingData: EducationalBuildingData;
  educationalBuildingDataForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private villagesService: LookupService;
private governoratesService: LookupService;
private sectionsOrCentersService: LookupService;
private areasService: LookupService;
private useBuildingPositionsService: LookupService;
private constructionTypesService: LookupService;
private branchCodesService: LookupService;
private regionalCenterCodesService: LookupService;
private landOwnershipsService: LookupService;
private buildingOwnershipsService: LookupService;

  
continuedToVillageSelectOptions: MaterialSelectOptions;
citySelectOptions: MaterialSelectOptions;
villageSelectOptions: MaterialSelectOptions;
sectionCenterSelectOptions: MaterialSelectOptions;
educationalAdministrationSelectOptions: MaterialSelectOptions;
useBuildingPositionSelectOptions: MaterialSelectOptions;
purposeOfConstructionSelectOptions: MaterialSelectOptions;
branchCodeSelectOptions: MaterialSelectOptions;
regionalCenterCodeSelectOptions: MaterialSelectOptions;
landOwnershipCodeSelectOptions: MaterialSelectOptions;
buildingOwnershipCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('continuedToVillage', { static: true }) ContinuedToVillageSelectComponent: MaterialSelectComponent;
	@ViewChild('city', { static: true }) CitySelectComponent: MaterialSelectComponent;
	@ViewChild('village', { static: true }) VillageSelectComponent: MaterialSelectComponent;
	@ViewChild('sectionCenter', { static: true }) SectionCenterSelectComponent: MaterialSelectComponent;
	@ViewChild('educationalAdministration', { static: true }) EducationalAdministrationSelectComponent: MaterialSelectComponent;
	@ViewChild('useBuildingPosition', { static: true }) UseBuildingPositionSelectComponent: MaterialSelectComponent;
	@ViewChild('purposeOfConstruction', { static: true }) PurposeOfConstructionSelectComponent: MaterialSelectComponent;
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('regionalCenterCode', { static: true }) RegionalCenterCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('landOwnershipCode', { static: true }) LandOwnershipCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('buildingOwnershipCode', { static: true }) BuildingOwnershipCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedEducationalBuildingDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<EducationalBuildingDataEditComponent>,
    public educationalBuildingDataService: EducationalBuildingDataService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedEducationalBuildingData = new EducationalBuildingData();
    this.selectedEducationalBuildingData = this.selectedEducationalBuildingDataDialog.data || this.selectedEducationalBuildingData;

    
	this.continuedToVillageSelectOptions = new MaterialSelectOptions({
	 data: this.villagesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'تابع لقرية',
	});

	this.citySelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'مدينة',
	});

	this.villageSelectOptions = new MaterialSelectOptions({
	 data: this.villagesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حي/قرية',
	});

	this.sectionCenterSelectOptions = new MaterialSelectOptions({
	 data: this.sectionsOrCentersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'قسم/مركز',
	});

	this.educationalAdministrationSelectOptions = new MaterialSelectOptions({
	 data: this.areasService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الإدارة التعليمية',
	});

	this.useBuildingPositionSelectOptions = new MaterialSelectOptions({
	 data: this.useBuildingPositionsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'موقف استخدام المبنى',
	});

	this.purposeOfConstructionSelectOptions = new MaterialSelectOptions({
	 data: this.constructionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الغرض الأساسي لانشاء المبنى',
	});

	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الفرع',
	});

	this.regionalCenterCodeSelectOptions = new MaterialSelectOptions({
	 data: this.regionalCenterCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المركز الاقليمي',
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
      
  id : [this.selectedEducationalBuildingData.id],
  buildingCode : [this.selectedEducationalBuildingData.buildingCode, [ Validators.required ]],
  buildingConstructionCost : [this.selectedEducationalBuildingData.buildingConstructionCost, [ Validators.required ]],
  educationalBuildingPhoneNumber : [this.selectedEducationalBuildingData.educationalBuildingPhoneNumber, [ Validators.required ]],
  streetNumber : [this.selectedEducationalBuildingData.streetNumber, [ Validators.required ]],
  educationalBuildingStreetName : [this.selectedEducationalBuildingData.educationalBuildingStreetName, [ Validators.required ]],
  prevSchoolName : [this.selectedEducationalBuildingData.prevSchoolName, [ Validators.required ]],
  schoolName : [this.selectedEducationalBuildingData.schoolName, [ Validators.required ]],
  continuedToVillage : [this.selectedEducationalBuildingData.continuedToVillage, [ Validators.required ]],
  city : [this.selectedEducationalBuildingData.city, [ Validators.required ]],
  village : [this.selectedEducationalBuildingData.village, [ Validators.required ]],
  sectionCenter : [this.selectedEducationalBuildingData.sectionCenter, [ Validators.required ]],
  educationalAdministration : [this.selectedEducationalBuildingData.educationalAdministration, [ Validators.required ]],
  useBuildingPosition : [this.selectedEducationalBuildingData.useBuildingPosition, [ Validators.required ]],
  purposeOfConstruction : [this.selectedEducationalBuildingData.purposeOfConstruction, [ Validators.required ]],
  branchCode : [this.selectedEducationalBuildingData.branchCode, [ Validators.required ]],
  regionalCenterCode : [this.selectedEducationalBuildingData.regionalCenterCode, [ Validators.required ]],
  landOwnershipCode : [this.selectedEducationalBuildingData.landOwnershipCode, [ Validators.required ]],
  buildingOwnershipCode : [this.selectedEducationalBuildingData.buildingOwnershipCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.educationalBuildingDataService.update(this.educationalBuildingDataForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.educationalBuildingDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.educationalBuildingDataForm.get(name);
  }

  initializeLookupServices() {
    this.villagesService = new LookupService('villages', this.http);
this.governoratesService = new LookupService('governorates', this.http);
this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
this.areasService = new LookupService('areas', this.http);
this.useBuildingPositionsService = new LookupService('usebuildingpositions', this.http);
this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.branchCodesService = new LookupService('branchcodes', this.http);
this.regionalCenterCodesService = new LookupService('regionalcentercodes', this.http);
this.landOwnershipsService = new LookupService('landownerships', this.http);
this.buildingOwnershipsService = new LookupService('buildingownerships', this.http);
  }
}
