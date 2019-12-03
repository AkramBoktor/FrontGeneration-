
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { LastMaintenanceDate } from 'app/shared/models/last-maintenance-date';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { LastMaintenanceDateService } from '../shared/last-maintenance-date.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-last-maintenance-date-view',
  templateUrl: './last-maintenance-date-view.component.html',
  styleUrls: ['./last-maintenance-date-view.component.scss'],
  providers: []
})

export class LastMaintenanceDateViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedLastMaintenanceDate: LastMaintenanceDate;
  lastMaintenanceDateForm: FormGroup;

  private buildingTypesService: LookupService;
private equipmentGroupsService: LookupService;
private equipmentTypesService: LookupService;

  
buildingTypeSelectOptions: MaterialSelectOptions;
equipmentGroupSelectOptions: MaterialSelectOptions;
equipmentTypeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedLastMaintenanceDateDialog: any,
    @Optional() public dialogRef: MatDialogRef<LastMaintenanceDateViewComponent>,
    public lastMaintenanceDateService: LastMaintenanceDateService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedLastMaintenanceDate = this.selectedLastMaintenanceDateDialog.data || this.selectedLastMaintenanceDate;

    
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


    this.lastMaintenanceDateForm = this.formBuilder.group({
      
  equipmentNumber : [this.selectedLastMaintenanceDate.equipmentNumber],
  mainMaintenanceItem : [this.selectedLastMaintenanceDate.mainMaintenanceItem],
  lastDateMaintenance : [this.selectedLastMaintenanceDate.lastDateMaintenance],
  buildingType : [this.selectedLastMaintenanceDate.buildingType],
  equipmentGroup : [this.selectedLastMaintenanceDate.equipmentGroup],
  equipmentType : [this.selectedLastMaintenanceDate.equipmentType]
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
    return this.lastMaintenanceDateForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.lastMaintenanceDateForm.controls)) {
      this.lastMaintenanceDateForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.buildingTypesService = new LookupService('buildingtypes', this.http);
this.equipmentGroupsService = new LookupService('equipmentgroups', this.http);
this.equipmentTypesService = new LookupService('equipmenttypes', this.http);
  }
}

