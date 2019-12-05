
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { MachineData } from 'app/shared/models/machine-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { MachineDataService } from '../shared/machine-data.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-machine-data-new',
  templateUrl: './machine-data-new.component.html',
  styleUrls: ['./machine-data-new.component.scss'],
  providers: [
    ]
})

export class MachineDataNewComponent extends AppBaseComponent implements OnInit {
  machineDataForm: FormGroup;
  @Input() selectedMachineData: MachineData;
  errorMessages: FormControlError[] = [
        
  ];

  private buildingTypesService: LookupService;
private primaryGroupsService: LookupService;
private equipmentGroupsService: LookupService;
private equipmentTypesService: LookupService;
private manufacturersService: LookupService;
private regionalCenterCodesService: LookupService;
private areasService: LookupService;
private workshopNumbersService: LookupService;

  
buildingTypeSelectOptions: MaterialSelectOptions;
primaryGroupSelectOptions: MaterialSelectOptions;
equipmentGroupSelectOptions: MaterialSelectOptions;
equipmentTypeSelectOptions: MaterialSelectOptions;
manufacturerSelectOptions: MaterialSelectOptions;
territoryCenterSelectOptions: MaterialSelectOptions;
regionSelectOptions: MaterialSelectOptions;
workshopTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('buildingType', { static: true }) BuildingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('primaryGroup', { static: true }) PrimaryGroupSelectComponent: MaterialSelectComponent;
	@ViewChild('equipmentGroup', { static: true }) EquipmentGroupSelectComponent: MaterialSelectComponent;
	@ViewChild('equipmentType', { static: true }) EquipmentTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('manufacturer', { static: true }) ManufacturerSelectComponent: MaterialSelectComponent;
	@ViewChild('territoryCenter', { static: true }) TerritoryCenterSelectComponent: MaterialSelectComponent;
	@ViewChild('region', { static: true }) RegionSelectComponent: MaterialSelectComponent;
	@ViewChild('workshopType', { static: true }) WorkshopTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<MachineDataNewComponent>,
    public machineDataService: MachineDataService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedMachineData = new MachineData();

    
	this.buildingTypeSelectOptions = new MaterialSelectOptions({
	 data: this.buildingTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع المبنى',
	});

	this.primaryGroupSelectOptions = new MaterialSelectOptions({
	 data: this.primaryGroupsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المجموعة الرأيسية',
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

	this.manufacturerSelectOptions = new MaterialSelectOptions({
	 data: this.manufacturersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'جهة الصنع',
	});

	this.territoryCenterSelectOptions = new MaterialSelectOptions({
	 data: this.regionalCenterCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المركز الاقليمي',
	});

	this.regionSelectOptions = new MaterialSelectOptions({
	 data: this.areasService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المنطقة',
	});

	this.workshopTypeSelectOptions = new MaterialSelectOptions({
	 data: this.workshopNumbersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الورشة',
	});


    this.machineDataForm = this.formBuilder.group({
     
  id : [0],
  equipmentNumber : [this.selectedMachineData.equipmentNumber, [ Validators.required ]],
  equipmentModel : [this.selectedMachineData.equipmentModel, [ Validators.required ]],
  operationBeganingdate : [this.selectedMachineData.operationBeganingdate, [ Validators.required ]],
  warrantyPeriodInYears : [this.selectedMachineData.warrantyPeriodInYears, [ Validators.required ]],
  vendor : [this.selectedMachineData.vendor, [ Validators.required ]],
  buildingCode : [this.selectedMachineData.buildingCode, [ Validators.required ]],
  extensionSerial : [this.selectedMachineData.extensionSerial, [ Validators.required ]],
  floorNumber : [this.selectedMachineData.floorNumber, [ Validators.required ]],
  vendingDate : [this.selectedMachineData.vendingDate, [ Validators.required ]],
  buildingType : [this.selectedMachineData.buildingType, [ Validators.required ]],
  primaryGroup : [this.selectedMachineData.primaryGroup, [ Validators.required ]],
  equipmentGroup : [this.selectedMachineData.equipmentGroup, [ Validators.required ]],
  equipmentType : [this.selectedMachineData.equipmentType, [ Validators.required ]],
  manufacturer : [this.selectedMachineData.manufacturer, [ Validators.required ]],
  territoryCenter : [this.selectedMachineData.territoryCenter, [ Validators.required ]],
  region : [this.selectedMachineData.region, [ Validators.required ]],
  workshopType : [this.selectedMachineData.workshopType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.machineDataService.create(this.machineDataForm.value)
        .pipe(switchMap(x => {
			return this.machineDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.machineDataForm.get(name);
    }

  initializeLookupServices() {
    this.buildingTypesService = new LookupService('buildingtypes', this.http);
this.primaryGroupsService = new LookupService('primarygroups', this.http);
this.equipmentGroupsService = new LookupService('equipmentgroups', this.http);
this.equipmentTypesService = new LookupService('equipmenttypes', this.http);
this.manufacturersService = new LookupService('manufacturers', this.http);
this.regionalCenterCodesService = new LookupService('regionalcentercodes', this.http);
this.areasService = new LookupService('areas', this.http);
this.workshopNumbersService = new LookupService('workshopnumbers', this.http);
  }
 }
