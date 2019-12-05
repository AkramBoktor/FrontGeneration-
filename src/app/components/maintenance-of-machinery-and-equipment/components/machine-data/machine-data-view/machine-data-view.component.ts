
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MachineData } from 'app/shared/models/machine-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MachineDataService } from '../shared/machine-data.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-machine-data-view',
  templateUrl: './machine-data-view.component.html',
  styleUrls: ['./machine-data-view.component.scss'],
  providers: []
})

export class MachineDataViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedMachineData: MachineData;
  machineDataForm: FormGroup;

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

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedMachineDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<MachineDataViewComponent>,
    public machineDataService: MachineDataService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedMachineData = this.selectedMachineDataDialog.data || this.selectedMachineData;

    
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
      
  equipmentNumber : [this.selectedMachineData.equipmentNumber],
  equipmentModel : [this.selectedMachineData.equipmentModel],
  operationBeganingdate : [this.selectedMachineData.operationBeganingdate],
  warrantyPeriodInYears : [this.selectedMachineData.warrantyPeriodInYears],
  vendor : [this.selectedMachineData.vendor],
  buildingCode : [this.selectedMachineData.buildingCode],
  extensionSerial : [this.selectedMachineData.extensionSerial],
  floorNumber : [this.selectedMachineData.floorNumber],
  vendingDate : [this.selectedMachineData.vendingDate],
  buildingType : [this.selectedMachineData.buildingType],
  primaryGroup : [this.selectedMachineData.primaryGroup],
  equipmentGroup : [this.selectedMachineData.equipmentGroup],
  equipmentType : [this.selectedMachineData.equipmentType],
  manufacturer : [this.selectedMachineData.manufacturer],
  territoryCenter : [this.selectedMachineData.territoryCenter],
  region : [this.selectedMachineData.region],
  workshopType : [this.selectedMachineData.workshopType]
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
    return this.machineDataForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.machineDataForm.controls)) {
      this.machineDataForm.controls[control].disable();
    }
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

