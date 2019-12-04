
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MasterFile } from 'app/shared/models/master-file';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { MasterFileService } from '../shared/master-file.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-master-file-edit',
  templateUrl: './master-file-edit.component.html',
  styleUrls: ['./master-file-edit.component.scss'],
  providers: []
})

export class MasterFileEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedMasterFile: MasterFile;
  masterFileForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private warrantyConditionsService: LookupService;
private equipmentTypesService: LookupService;
private deviceTypesService: LookupService;

  
warrantyConditionSelectOptions: MaterialSelectOptions;
equipmentTypeSelectOptions: MaterialSelectOptions;
deviceTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('warrantyCondition', { static: true }) WarrantyConditionSelectComponent: MaterialSelectComponent;
	@ViewChild('equipmentType', { static: true }) EquipmentTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('deviceType', { static: true }) DeviceTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedMasterFileDialog: any,
    @Optional() public dialogRef: MatDialogRef<MasterFileEditComponent>,
    public masterFileService: MasterFileService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedMasterFile = new MasterFile();
    this.selectedMasterFile = this.selectedMasterFileDialog.data || this.selectedMasterFile;

    
	this.warrantyConditionSelectOptions = new MaterialSelectOptions({
	 data: this.warrantyConditionsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حالة الضمان',
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


    this.masterFileForm = this.formBuilder.group({
      
  id : [this.selectedMasterFile.id],
  manufactured : [this.selectedMasterFile.manufactured, [ Validators.required ]],
  style : [this.selectedMasterFile.style, [ Validators.required ]],
  buildingDescription : [this.selectedMasterFile.buildingDescription, [ ]],
  supplyingCompany : [this.selectedMasterFile.supplyingCompany, [ Validators.required ]],
  warrantyCondition : [this.selectedMasterFile.warrantyCondition, [ Validators.required ]],
  equipmentType : [this.selectedMasterFile.equipmentType, [ Validators.required ]],
  deviceType : [this.selectedMasterFile.deviceType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.masterFileService.update(this.masterFileForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.masterFileService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.masterFileForm.get(name);
  }

  initializeLookupServices() {
    this.warrantyConditionsService = new LookupService('warrantyconditions', this.http);
this.equipmentTypesService = new LookupService('equipmenttypes', this.http);
this.deviceTypesService = new LookupService('devicetypes', this.http);
  }
}
