
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { MasterFile } from 'app/shared/models/master-file';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { MasterFileService } from '../shared/master-file.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-master-file-new',
  templateUrl: './master-file-new.component.html',
  styleUrls: ['./master-file-new.component.scss'],
  providers: [
    ]
})

export class MasterFileNewComponent extends AppBaseComponent implements OnInit {
  masterFileForm: FormGroup;
  @Input() selectedMasterFile: MasterFile;
  errorMessages: FormControlError[] = [
        
  ];

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

  
	@ViewChild('buildingType', { static: true }) BuildingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('areaCode', { static: true }) AreaCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('laboratoryType', { static: true }) LaboratoryTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('equipmentType', { static: true }) EquipmentTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('deviceType', { static: true }) DeviceTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('warrantyCondition', { static: true }) WarrantyConditionSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<MasterFileNewComponent>,
    public masterFileService: MasterFileService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedMasterFile = new MasterFile();

    
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
     
  id : [0],
  buildingCode : [this.selectedMasterFile.buildingCode, [ Validators.required ]],
  buildingDescription : [this.selectedMasterFile.buildingDescription, [ ]],
  laboratoryNumber : [this.selectedMasterFile.laboratoryNumber, [ Validators.required ]],
  devicesNumber : [this.selectedMasterFile.devicesNumber, [ Validators.required ]],
  deviceNumberFrom : [this.selectedMasterFile.deviceNumberFrom, [ Validators.required ]],
  deviceNumberTo : [this.selectedMasterFile.deviceNumberTo, [ Validators.required ]],
  style : [this.selectedMasterFile.style, [ Validators.required ]],
  manufactured : [this.selectedMasterFile.manufactured, [ Validators.required ]],
  startDate : [this.selectedMasterFile.startDate, [ Validators.required ]],
  warrantyPeriod : [this.selectedMasterFile.warrantyPeriod, [ Validators.required ]],
  supplyingCompany : [this.selectedMasterFile.supplyingCompany, [ Validators.required ]],
  buildingType : [this.selectedMasterFile.buildingType, [ Validators.required ]],
  areaCode : [this.selectedMasterFile.areaCode, [ ]],
  laboratoryType : [this.selectedMasterFile.laboratoryType, [ Validators.required ]],
  equipmentType : [this.selectedMasterFile.equipmentType, [ Validators.required ]],
  deviceType : [this.selectedMasterFile.deviceType, [ Validators.required ]],
  warrantyCondition : [this.selectedMasterFile.warrantyCondition, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.masterFileService.create(this.masterFileForm.value)
        .pipe(switchMap(x => {
			return this.masterFileService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.masterFileForm.get(name);
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
