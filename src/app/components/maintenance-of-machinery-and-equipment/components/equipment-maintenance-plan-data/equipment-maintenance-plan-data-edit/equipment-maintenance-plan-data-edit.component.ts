
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { EquipmentMaintenancePlanData } from 'app/shared/models/equipment-maintenance-plan-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { EquipmentMaintenancePlanDataService } from '../shared/equipment-maintenance-plan-data.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-equipment-maintenance-plan-data-edit',
  templateUrl: './equipment-maintenance-plan-data-edit.component.html',
  styleUrls: ['./equipment-maintenance-plan-data-edit.component.scss'],
  providers: []
})

export class EquipmentMaintenancePlanDataEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedEquipmentMaintenancePlanData: EquipmentMaintenancePlanData;
  equipmentMaintenancePlanDataForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private buildingTypesService: LookupService;
private equipmentGroupsService: LookupService;
private equipmentTypesService: LookupService;

  
buildingTypeSelectOptions: MaterialSelectOptions;
equipmentGroupSelectOptions: MaterialSelectOptions;
equipmentTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('buildingType', { static: true }) BuildingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('equipmentGroup', { static: true }) EquipmentGroupSelectComponent: MaterialSelectComponent;
	@ViewChild('equipmentType', { static: true }) EquipmentTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedEquipmentMaintenancePlanDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<EquipmentMaintenancePlanDataEditComponent>,
    public equipmentMaintenancePlanDataService: EquipmentMaintenancePlanDataService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedEquipmentMaintenancePlanData = new EquipmentMaintenancePlanData();
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
      
  id : [this.selectedEquipmentMaintenancePlanData.id],
  equipmentNumber : [this.selectedEquipmentMaintenancePlanData.equipmentNumber, [ Validators.required ]],
  mainMaintenanceItem : [this.selectedEquipmentMaintenancePlanData.mainMaintenanceItem, [ Validators.required ]],
  equipmentMaintenancePlanSerial : [this.selectedEquipmentMaintenancePlanData.equipmentMaintenancePlanSerial, [ Validators.required ]],
  plannedMaintenanceDate : [this.selectedEquipmentMaintenancePlanData.plannedMaintenanceDate, [ Validators.required ]],
  actualMaintenanceDate : [this.selectedEquipmentMaintenancePlanData.actualMaintenanceDate, [ Validators.required ]],
  maintenanceIndividual : [this.selectedEquipmentMaintenancePlanData.maintenanceIndividual, [ Validators.required ]],
  maintenanceIndividualNumber : [this.selectedEquipmentMaintenancePlanData.maintenanceIndividualNumber, [ Validators.required ]],
  buildingType : [this.selectedEquipmentMaintenancePlanData.buildingType, [ Validators.required ]],
  equipmentGroup : [this.selectedEquipmentMaintenancePlanData.equipmentGroup, [ Validators.required ]],
  equipmentType : [this.selectedEquipmentMaintenancePlanData.equipmentType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.equipmentMaintenancePlanDataService.update(this.equipmentMaintenancePlanDataForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.equipmentMaintenancePlanDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.equipmentMaintenancePlanDataForm.get(name);
  }

  initializeLookupServices() {
    this.buildingTypesService = new LookupService('buildingtypes', this.http);
this.equipmentGroupsService = new LookupService('equipmentgroups', this.http);
this.equipmentTypesService = new LookupService('equipmenttypes', this.http);
  }
}
