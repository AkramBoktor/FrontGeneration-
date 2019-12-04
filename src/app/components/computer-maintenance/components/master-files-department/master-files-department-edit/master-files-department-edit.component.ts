
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MasterFilesDepartment } from 'app/shared/models/master-files-department';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { MasterFilesDepartmentService } from '../shared/master-files-department.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-master-files-department-edit',
  templateUrl: './master-files-department-edit.component.html',
  styleUrls: ['./master-files-department-edit.component.scss'],
  providers: []
})

export class MasterFilesDepartmentEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedMasterFilesDepartment: MasterFilesDepartment;
  masterFilesDepartmentForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private branchCodesService: LookupService;
private areasService: LookupService;
private equipmentCodesService: LookupService;
private deviceTypesService: LookupService;
private warrantyConditionsService: LookupService;

  
branchCodeorAdministrationSelectOptions: MaterialSelectOptions;
areaCodeSelectOptions: MaterialSelectOptions;
equimentTypeSelectOptions: MaterialSelectOptions;
deviceTypeSelectOptions: MaterialSelectOptions;
warrantyperiodSelectOptions: MaterialSelectOptions;

  
	@ViewChild('branchCodeorAdministration', { static: true }) BranchCodeorAdministrationSelectComponent: MaterialSelectComponent;
	@ViewChild('areaCode', { static: true }) AreaCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('equimentType', { static: true }) EquimentTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('deviceType', { static: true }) DeviceTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('warrantyperiod', { static: true }) WarrantyperiodSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedMasterFilesDepartmentDialog: any,
    @Optional() public dialogRef: MatDialogRef<MasterFilesDepartmentEditComponent>,
    public masterFilesDepartmentService: MasterFilesDepartmentService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedMasterFilesDepartment = new MasterFilesDepartment();
    this.selectedMasterFilesDepartment = this.selectedMasterFilesDepartmentDialog.data || this.selectedMasterFilesDepartment;

    
	this.branchCodeorAdministrationSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الفرع او الاداره',
	});

	this.areaCodeSelectOptions = new MaterialSelectOptions({
	 data: this.areasService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المنطقه',
	});

	this.equimentTypeSelectOptions = new MaterialSelectOptions({
	 data: this.equipmentCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع المعده',
	});

	this.deviceTypeSelectOptions = new MaterialSelectOptions({
	 data: this.deviceTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الجهاز',
	});

	this.warrantyperiodSelectOptions = new MaterialSelectOptions({
	 data: this.warrantyConditionsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'فتره الضمان',
	});


    this.masterFilesDepartmentForm = this.formBuilder.group({
      
  id : [this.selectedMasterFilesDepartment.id],
  roomPhoneNumber : [this.selectedMasterFilesDepartment.roomPhoneNumber, [ Validators.required ]],
  deviceNumber : [this.selectedMasterFilesDepartment.deviceNumber, [ Validators.required ]],
  manufacturer : [this.selectedMasterFilesDepartment.manufacturer, [ Validators.required ]],
  startDate : [this.selectedMasterFilesDepartment.startDate, [ Validators.required ]],
  supplierCompany : [this.selectedMasterFilesDepartment.supplierCompany, [ Validators.required ]],
  branchCodeorAdministration : [this.selectedMasterFilesDepartment.branchCodeorAdministration, [ Validators.required ]],
  areaCode : [this.selectedMasterFilesDepartment.areaCode, [ Validators.required ]],
  equimentType : [this.selectedMasterFilesDepartment.equimentType, [ Validators.required ]],
  deviceType : [this.selectedMasterFilesDepartment.deviceType, [ Validators.required ]],
  warrantyperiod : [this.selectedMasterFilesDepartment.warrantyperiod, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.masterFilesDepartmentService.update(this.masterFilesDepartmentForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.masterFilesDepartmentService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.masterFilesDepartmentForm.get(name);
  }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.areasService = new LookupService('areas', this.http);
this.equipmentCodesService = new LookupService('equipmentcodes', this.http);
this.deviceTypesService = new LookupService('devicetypes', this.http);
this.warrantyConditionsService = new LookupService('warrantyconditions', this.http);
  }
}
