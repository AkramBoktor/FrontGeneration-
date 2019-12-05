
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MasterFile } from 'app/shared/models/master-file';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MasterFileService } from '../shared/master-file.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-master-file-view',
  templateUrl: './master-file-view.component.html',
  styleUrls: ['./master-file-view.component.scss'],
  providers: []
})

export class MasterFileViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedMasterFile: MasterFile;
  masterFileForm: FormGroup;

  private buildingTypesService: LookupService;
private areasService: LookupService;
private laboratoryTypesService: LookupService;
private equipmentTypesService: LookupService;
private deviceTypesService: LookupService;
private warrantyConditionsService: LookupService;

  
buildingTypeSelectOptions: MaterialSelectOptions;
areaCodeSelectOptions: MaterialSelectOptions;
laboratoryTypeSelectOptions: MaterialSelectOptions;
equipmentTypeSelectOptions: MaterialSelectOptions;
deviceTypeSelectOptions: MaterialSelectOptions;
warrantyConditionSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedMasterFileDialog: any,
    @Optional() public dialogRef: MatDialogRef<MasterFileViewComponent>,
    public masterFileService: MasterFileService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedMasterFile = this.selectedMasterFileDialog.data || this.selectedMasterFile;

    
	this.buildingTypeSelectOptions = new MaterialSelectOptions({
	 data: this.buildingTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع المبني',
	});

	this.areaCodeSelectOptions = new MaterialSelectOptions({
	 data: this.areasService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المنطقة',
	});

	this.laboratoryTypeSelectOptions = new MaterialSelectOptions({
	 data: this.laboratoryTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع المعمل',
	});

	this.equipmentTypeSelectOptions = new MaterialSelectOptions({
	 data: this.equipmentTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع  المعدة',
	});

	this.deviceTypeSelectOptions = new MaterialSelectOptions({
	 data: this.deviceTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الجهاز',
	});

	this.warrantyConditionSelectOptions = new MaterialSelectOptions({
	 data: this.warrantyConditionsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حالة الضمان',
	});


    this.masterFileForm = this.formBuilder.group({
      
  buildingCode : [this.selectedMasterFile.buildingCode],
  buildingDescription : [this.selectedMasterFile.buildingDescription],
  laboratoryNumber : [this.selectedMasterFile.laboratoryNumber],
  devicesNumber : [this.selectedMasterFile.devicesNumber],
  deviceNumberFrom : [this.selectedMasterFile.deviceNumberFrom],
  deviceNumberTo : [this.selectedMasterFile.deviceNumberTo],
  style : [this.selectedMasterFile.style],
  manufactured : [this.selectedMasterFile.manufactured],
  startDate : [this.selectedMasterFile.startDate],
  warrantyPeriod : [this.selectedMasterFile.warrantyPeriod],
  supplyingCompany : [this.selectedMasterFile.supplyingCompany],
  buildingType : [this.selectedMasterFile.buildingType],
  areaCode : [this.selectedMasterFile.areaCode],
  laboratoryType : [this.selectedMasterFile.laboratoryType],
  equipmentType : [this.selectedMasterFile.equipmentType],
  deviceType : [this.selectedMasterFile.deviceType],
  warrantyCondition : [this.selectedMasterFile.warrantyCondition]
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
    return this.masterFileForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.masterFileForm.controls)) {
      this.masterFileForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.buildingTypesService = new LookupService('buildingtypes', this.http);
this.areasService = new LookupService('areas', this.http);
this.laboratoryTypesService = new LookupService('laboratorytypes', this.http);
this.equipmentTypesService = new LookupService('equipmenttypes', this.http);
this.deviceTypesService = new LookupService('devicetypes', this.http);
this.warrantyConditionsService = new LookupService('warrantyconditions', this.http);
  }
}

