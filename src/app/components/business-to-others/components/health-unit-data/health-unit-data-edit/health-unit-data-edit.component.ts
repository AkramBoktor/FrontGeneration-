
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { HealthUnitData } from 'app/shared/models/health-unit-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { HealthUnitDataService } from '../shared/health-unit-data.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-health-unit-data-edit',
  templateUrl: './health-unit-data-edit.component.html',
  styleUrls: ['./health-unit-data-edit.component.scss'],
  providers: []
})

export class HealthUnitDataEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedHealthUnitData: HealthUnitData;
  healthUnitDataForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

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

  
	@ViewChild('governorateCode', { static: true }) GovernorateCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('department', { static: true }) DepartmentSelectComponent: MaterialSelectComponent;
	@ViewChild('village', { static: true }) VillageSelectComponent: MaterialSelectComponent;
	@ViewChild('follower', { static: true }) FollowerSelectComponent: MaterialSelectComponent;
	@ViewChild('healthDirectorate', { static: true }) HealthDirectorateSelectComponent: MaterialSelectComponent;
	@ViewChild('healthManagement', { static: true }) HealthManagementSelectComponent: MaterialSelectComponent;
	@ViewChild('mainUnitType', { static: true }) MainUnitTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('projectType', { static: true }) ProjectTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedHealthUnitDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<HealthUnitDataEditComponent>,
    public healthUnitDataService: HealthUnitDataService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedHealthUnitData = new HealthUnitData();
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
      
  id : [this.selectedHealthUnitData.id],
  subUnitType : [this.selectedHealthUnitData.subUnitType, [ Validators.required ]],
  unitCode : [this.selectedHealthUnitData.unitCode, [ Validators.required ]],
  unitName : [this.selectedHealthUnitData.unitName, [ Validators.required ]],
  unitAddress : [this.selectedHealthUnitData.unitAddress, [ Validators.required ]],
  unitPhone : [this.selectedHealthUnitData.unitPhone, [ Validators.required ]],
  property : [this.selectedHealthUnitData.property, [ Validators.required ]],
  familyNumber : [this.selectedHealthUnitData.familyNumber, [ Validators.required ]],
  governorateCode : [this.selectedHealthUnitData.governorateCode, [ Validators.required ]],
  department : [this.selectedHealthUnitData.department, [ Validators.required ]],
  village : [this.selectedHealthUnitData.village, [ Validators.required ]],
  follower : [this.selectedHealthUnitData.follower, [ Validators.required ]],
  healthDirectorate : [this.selectedHealthUnitData.healthDirectorate, [ Validators.required ]],
  healthManagement : [this.selectedHealthUnitData.healthManagement, [ Validators.required ]],
  mainUnitType : [this.selectedHealthUnitData.mainUnitType, [ Validators.required ]],
  projectType : [this.selectedHealthUnitData.projectType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.healthUnitDataService.update(this.healthUnitDataForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.healthUnitDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.healthUnitDataForm.get(name);
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
