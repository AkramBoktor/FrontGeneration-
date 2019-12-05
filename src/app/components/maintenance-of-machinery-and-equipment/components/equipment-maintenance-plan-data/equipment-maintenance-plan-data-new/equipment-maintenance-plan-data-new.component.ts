
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { EquipmentMaintenancePlanData } from 'app/shared/models/equipment-maintenance-plan-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { EquipmentMaintenancePlanDataService } from '../shared/equipment-maintenance-plan-data.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-equipment-maintenance-plan-data-new',
  templateUrl: './equipment-maintenance-plan-data-new.component.html',
  styleUrls: ['./equipment-maintenance-plan-data-new.component.scss'],
  providers: [
    ]
})

export class EquipmentMaintenancePlanDataNewComponent extends AppBaseComponent implements OnInit {
  equipmentMaintenancePlanDataForm: FormGroup;
  @Input() selectedEquipmentMaintenancePlanData: EquipmentMaintenancePlanData;
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
    @Optional() public dialogRef: MatDialogRef<EquipmentMaintenancePlanDataNewComponent>,
    public equipmentMaintenancePlanDataService: EquipmentMaintenancePlanDataService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedEquipmentMaintenancePlanData = new EquipmentMaintenancePlanData();

    
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
     
  id : [0],
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
    this.equipmentMaintenancePlanDataService.create(this.equipmentMaintenancePlanDataForm.value)
        .pipe(switchMap(x => {
			return this.equipmentMaintenancePlanDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
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
