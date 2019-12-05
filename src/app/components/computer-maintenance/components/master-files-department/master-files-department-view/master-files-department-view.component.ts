
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MasterFilesDepartment } from 'app/shared/models/master-files-department';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MasterFilesDepartmentService } from '../shared/master-files-department.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-master-files-department-view',
  templateUrl: './master-files-department-view.component.html',
  styleUrls: ['./master-files-department-view.component.scss'],
  providers: []
})

export class MasterFilesDepartmentViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedMasterFilesDepartment: MasterFilesDepartment;
  masterFilesDepartmentForm: FormGroup;

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

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedMasterFilesDepartmentDialog: any,
    @Optional() public dialogRef: MatDialogRef<MasterFilesDepartmentViewComponent>,
    public masterFilesDepartmentService: MasterFilesDepartmentService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
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
      
  roomPhoneNumber : [this.selectedMasterFilesDepartment.roomPhoneNumber],
  deviceNumber : [this.selectedMasterFilesDepartment.deviceNumber],
  manufacturer : [this.selectedMasterFilesDepartment.manufacturer],
  startDate : [this.selectedMasterFilesDepartment.startDate],
  supplierCompany : [this.selectedMasterFilesDepartment.supplierCompany],
  branchCodeorAdministration : [this.selectedMasterFilesDepartment.branchCodeorAdministration],
  areaCode : [this.selectedMasterFilesDepartment.areaCode],
  equimentType : [this.selectedMasterFilesDepartment.equimentType],
  deviceType : [this.selectedMasterFilesDepartment.deviceType],
  warrantyperiod : [this.selectedMasterFilesDepartment.warrantyperiod]
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
    return this.masterFilesDepartmentForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.masterFilesDepartmentForm.controls)) {
      this.masterFilesDepartmentForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.areasService = new LookupService('areas', this.http);
this.equipmentCodesService = new LookupService('equipmentcodes', this.http);
this.deviceTypesService = new LookupService('devicetypes', this.http);
this.warrantyConditionsService = new LookupService('warrantyconditions', this.http);
  }
}

