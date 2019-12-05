
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { EquipmentMaintenancePlanData } from 'app/shared/models/equipment-maintenance-plan-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { EquipmentMaintenancePlanDataService } from '../shared/equipment-maintenance-plan-data.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-equipment-maintenance-plan-data-view',
  templateUrl: './equipment-maintenance-plan-data-view.component.html',
  styleUrls: ['./equipment-maintenance-plan-data-view.component.scss'],
  providers: []
})

export class EquipmentMaintenancePlanDataViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedEquipmentMaintenancePlanData: EquipmentMaintenancePlanData;
  equipmentMaintenancePlanDataForm: FormGroup;

  private buildingTypesService: LookupService;
private equipmentGroupsService: LookupService;
private equipmentTypesService: LookupService;

  
buildingTypeSelectOptions: MaterialSelectOptions;
equipmentGroupSelectOptions: MaterialSelectOptions;
equipmentTypeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedEquipmentMaintenancePlanDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<EquipmentMaintenancePlanDataViewComponent>,
    public equipmentMaintenancePlanDataService: EquipmentMaintenancePlanDataService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedEquipmentMaintenancePlanData = this.selectedEquipmentMaintenancePlanDataDialog.data || this.selectedEquipmentMaintenancePlanData;

    
	this.buildingTypeSelectOptions = new MaterialSelectOptions({
	 data: this.buildingTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع المبنى',
	});

	this.equipmentGroupSelectOptions = new MaterialSelectOptions({
	 data: this.equipmentGroupsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'مجموعة المعدات',
	});

	this.equipmentTypeSelectOptions = new MaterialSelectOptions({
	 data: this.equipmentTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع المعدة',
	});


    this.equipmentMaintenancePlanDataForm = this.formBuilder.group({
      
  equipmentNumber : [this.selectedEquipmentMaintenancePlanData.equipmentNumber],
  mainMaintenanceItem : [this.selectedEquipmentMaintenancePlanData.mainMaintenanceItem],
  equipmentMaintenancePlanSerial : [this.selectedEquipmentMaintenancePlanData.equipmentMaintenancePlanSerial],
  plannedMaintenanceDate : [this.selectedEquipmentMaintenancePlanData.plannedMaintenanceDate],
  actualMaintenanceDate : [this.selectedEquipmentMaintenancePlanData.actualMaintenanceDate],
  maintenanceIndividual : [this.selectedEquipmentMaintenancePlanData.maintenanceIndividual],
  maintenanceIndividualNumber : [this.selectedEquipmentMaintenancePlanData.maintenanceIndividualNumber],
  buildingType : [this.selectedEquipmentMaintenancePlanData.buildingType],
  equipmentGroup : [this.selectedEquipmentMaintenancePlanData.equipmentGroup],
  equipmentType : [this.selectedEquipmentMaintenancePlanData.equipmentType]
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
    return this.equipmentMaintenancePlanDataForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.equipmentMaintenancePlanDataForm.controls)) {
      this.equipmentMaintenancePlanDataForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.buildingTypesService = new LookupService('buildingtypes', this.http);
this.equipmentGroupsService = new LookupService('equipmentgroups', this.http);
this.equipmentTypesService = new LookupService('equipmenttypes', this.http);
  }
}

