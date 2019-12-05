
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MachineData } from 'app/shared/models/machine-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { MachineDataService } from '../shared/machine-data.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-machine-data-edit',
  templateUrl: './machine-data-edit.component.html',
  styleUrls: ['./machine-data-edit.component.scss'],
  providers: []
})

export class MachineDataEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedMachineData: MachineData;
  machineDataForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private buildingTypesService: LookupService;
private areasService: LookupService;
private regionalCenterCodesService: LookupService;
private workshopNumbersService: LookupService;
private manufacturersService: LookupService;
private equipmentTypesService: LookupService;
private equipmentGroupsService: LookupService;
private primaryGroupsService: LookupService;

  
buildingTypeSelectOptions: MaterialSelectOptions;
regionSelectOptions: MaterialSelectOptions;
territoryCenterSelectOptions: MaterialSelectOptions;
workshopTypeSelectOptions: MaterialSelectOptions;
manufacturerSelectOptions: MaterialSelectOptions;
equipmentTypeSelectOptions: MaterialSelectOptions;
equipmentGroupSelectOptions: MaterialSelectOptions;
primaryGroupSelectOptions: MaterialSelectOptions;

  
	@ViewChild('buildingType', { static: true }) BuildingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('region', { static: true }) RegionSelectComponent: MaterialSelectComponent;
	@ViewChild('territoryCenter', { static: true }) TerritoryCenterSelectComponent: MaterialSelectComponent;
	@ViewChild('workshopType', { static: true }) WorkshopTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('manufacturer', { static: true }) ManufacturerSelectComponent: MaterialSelectComponent;
	@ViewChild('equipmentType', { static: true }) EquipmentTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('equipmentGroup', { static: true }) EquipmentGroupSelectComponent: MaterialSelectComponent;
	@ViewChild('primaryGroup', { static: true }) PrimaryGroupSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedMachineDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<MachineDataEditComponent>,
    public machineDataService: MachineDataService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedMachineData = new MachineData();
    this.selectedMachineData = this.selectedMachineDataDialog.data || this.selectedMachineData;

    
	this.buildingTypeSelectOptions = new MaterialSelectOptions({
	 data: this.buildingTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع المبنى',
	});

	this.regionSelectOptions = new MaterialSelectOptions({
	 data: this.areasService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المنطقة',
	});

	this.territoryCenterSelectOptions = new MaterialSelectOptions({
	 data: this.regionalCenterCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المركز الاقليمي',
	});

	this.workshopTypeSelectOptions = new MaterialSelectOptions({
	 data: this.workshopNumbersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الورشة',
	});

	this.manufacturerSelectOptions = new MaterialSelectOptions({
	 data: this.manufacturersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'جهة الصنع',
	});

	this.equipmentTypeSelectOptions = new MaterialSelectOptions({
	 data: this.equipmentTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع المعدة',
	});

	this.equipmentGroupSelectOptions = new MaterialSelectOptions({
	 data: this.equipmentGroupsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'مجموعة المعدات',
	});

	this.primaryGroupSelectOptions = new MaterialSelectOptions({
	 data: this.primaryGroupsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المجموعة الرأيسية',
	});


    this.machineDataForm = this.formBuilder.group({
      
  id : [this.selectedMachineData.id],
  floorNumber : [this.selectedMachineData.floorNumber, [ Validators.required ]],
  extensionSerial : [this.selectedMachineData.extensionSerial, [ Validators.required ]],
  buildingCode : [this.selectedMachineData.buildingCode, [ Validators.required ]],
  vendor : [this.selectedMachineData.vendor, [ Validators.required ]],
  warrantyPeriodInYears : [this.selectedMachineData.warrantyPeriodInYears, [ Validators.required ]],
  equipmentModel : [this.selectedMachineData.equipmentModel, [ Validators.required ]],
  equipmentNumber : [this.selectedMachineData.equipmentNumber, [ Validators.required ]],
  operationBeganingdate : [this.selectedMachineData.operationBeganingdate, [ Validators.required ]],
  vendingDate : [this.selectedMachineData.vendingDate, [ Validators.required ]],
  buildingType : [this.selectedMachineData.buildingType, [ Validators.required ]],
  region : [this.selectedMachineData.region, [ Validators.required ]],
  territoryCenter : [this.selectedMachineData.territoryCenter, [ Validators.required ]],
  workshopType : [this.selectedMachineData.workshopType, [ Validators.required ]],
  manufacturer : [this.selectedMachineData.manufacturer, [ Validators.required ]],
  equipmentType : [this.selectedMachineData.equipmentType, [ Validators.required ]],
  equipmentGroup : [this.selectedMachineData.equipmentGroup, [ Validators.required ]],
  primaryGroup : [this.selectedMachineData.primaryGroup, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.machineDataService.update(this.machineDataForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.machineDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.machineDataForm.get(name);
  }

  initializeLookupServices() {
    this.buildingTypesService = new LookupService('buildingtypes', this.http);
this.areasService = new LookupService('areas', this.http);
this.regionalCenterCodesService = new LookupService('regionalcentercodes', this.http);
this.workshopNumbersService = new LookupService('workshopnumbers', this.http);
this.manufacturersService = new LookupService('manufacturers', this.http);
this.equipmentTypesService = new LookupService('equipmenttypes', this.http);
this.equipmentGroupsService = new LookupService('equipmentgroups', this.http);
this.primaryGroupsService = new LookupService('primarygroups', this.http);
  }
}
