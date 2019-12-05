
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { HealthUnitData } from 'app/shared/models/health-unit-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { HealthUnitDataService } from '../shared/health-unit-data.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-health-unit-data-view',
  templateUrl: './health-unit-data-view.component.html',
  styleUrls: ['./health-unit-data-view.component.scss'],
  providers: []
})

export class HealthUnitDataViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedHealthUnitData: HealthUnitData;
  healthUnitDataForm: FormGroup;

private sectionsOrCentersService: LookupService;
private villagesService: LookupService;
private followersService: LookupService;
private entityNamesService: LookupService;
private governoratesService: LookupService;
private unitTypesService: LookupService;
private projectTypesService: LookupService;

  
governorateCodeSelectOptions: MaterialSelectOptions;
departmentSelectOptions: MaterialSelectOptions;
villageSelectOptions: MaterialSelectOptions;
followerSelectOptions: MaterialSelectOptions;
healthDirectorateSelectOptions: MaterialSelectOptions;
healthManagementSelectOptions: MaterialSelectOptions;
mainUnitTypeSelectOptions: MaterialSelectOptions;
projectTypeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedHealthUnitDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<HealthUnitDataViewComponent>,
    public healthUnitDataService: HealthUnitDataService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedHealthUnitData = this.selectedHealthUnitDataDialog.data || this.selectedHealthUnitData;

    
	this.governorateCodeSelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'رقم المحافظة',
	});

	this.departmentSelectOptions = new MaterialSelectOptions({
	 data: this.sectionsOrCentersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'قسم',
	});

	this.villageSelectOptions = new MaterialSelectOptions({
	 data: this.villagesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'القرية',
	});

	this.followerSelectOptions = new MaterialSelectOptions({
	 data: this.followersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'التابع',
	});

	this.healthDirectorateSelectOptions = new MaterialSelectOptions({
	 data: this.entityNamesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المديرية الصحية',
	});

	this.healthManagementSelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الادارة الصحية',
	});

	this.mainUnitTypeSelectOptions = new MaterialSelectOptions({
	 data: this.unitTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الوحدة رئيسي',
	});

	this.projectTypeSelectOptions = new MaterialSelectOptions({
	 data: this.projectTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع المشروع',
	});


    this.healthUnitDataForm = this.formBuilder.group({
      
  subUnitType : [this.selectedHealthUnitData.subUnitType],
  unitCode : [this.selectedHealthUnitData.unitCode],
  unitName : [this.selectedHealthUnitData.unitName],
  unitAddress : [this.selectedHealthUnitData.unitAddress],
  unitPhone : [this.selectedHealthUnitData.unitPhone],
  property : [this.selectedHealthUnitData.property],
  familyNumber : [this.selectedHealthUnitData.familyNumber],
  governorateCode : [this.selectedHealthUnitData.governorateCode],
  department : [this.selectedHealthUnitData.department],
  village : [this.selectedHealthUnitData.village],
  follower : [this.selectedHealthUnitData.follower],
  healthDirectorate : [this.selectedHealthUnitData.healthDirectorate],
  healthManagement : [this.selectedHealthUnitData.healthManagement],
  mainUnitType : [this.selectedHealthUnitData.mainUnitType],
  projectType : [this.selectedHealthUnitData.projectType]
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
    return this.healthUnitDataForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.healthUnitDataForm.controls)) {
      this.healthUnitDataForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.governoratesService = new LookupService('governorates', this.http);
this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
this.villagesService = new LookupService('villages', this.http);
this.followersService = new LookupService('followers', this.http);
this.entityNamesService = new LookupService('entitynames', this.http);
this.governoratesService = new LookupService('governorates', this.http);
this.unitTypesService = new LookupService('unittypes', this.http);
this.projectTypesService = new LookupService('projecttypes', this.http);
  }
}

