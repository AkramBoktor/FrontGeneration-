
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { AddTheImplementationOfAirConditioningMaintenance } from 'app/shared/models/add-the-implementation-of-air-conditioning-maintenance';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { AddTheImplementationOfAirConditioningMaintenanceService } from '../shared/add-the-implementation-of-air-conditioning-maintenance.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-add-the-implementation-of-air-conditioning-maintenance-view',
  templateUrl: './add-the-implementation-of-air-conditioning-maintenance-view.component.html',
  styleUrls: ['./add-the-implementation-of-air-conditioning-maintenance-view.component.scss'],
  providers: []
})

export class AddTheImplementationOfAirConditioningMaintenanceViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedAddTheImplementationOfAirConditioningMaintenance: AddTheImplementationOfAirConditioningMaintenance;
  addTheImplementationOfAirConditioningMaintenanceForm: FormGroup;

  private areasService: LookupService;
private laboratoryTypesService: LookupService;

  
regionSelectOptions: MaterialSelectOptions;
laboratoryTypeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedAddTheImplementationOfAirConditioningMaintenanceDialog: any,
    @Optional() public dialogRef: MatDialogRef<AddTheImplementationOfAirConditioningMaintenanceViewComponent>,
    public addTheImplementationOfAirConditioningMaintenanceService: AddTheImplementationOfAirConditioningMaintenanceService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAddTheImplementationOfAirConditioningMaintenance = this.selectedAddTheImplementationOfAirConditioningMaintenanceDialog.data || this.selectedAddTheImplementationOfAirConditioningMaintenance;

    
	this.regionSelectOptions = new MaterialSelectOptions({
	 data: this.areasService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المنطقه',
	});

	this.laboratoryTypeSelectOptions = new MaterialSelectOptions({
	 data: this.laboratoryTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع المعمل',
	});


    this.addTheImplementationOfAirConditioningMaintenanceForm = this.formBuilder.group({
      
  period : [this.selectedAddTheImplementationOfAirConditioningMaintenance.period],
  maintainer : [this.selectedAddTheImplementationOfAirConditioningMaintenance.maintainer],
  building : [this.selectedAddTheImplementationOfAirConditioningMaintenance.building],
  code : [this.selectedAddTheImplementationOfAirConditioningMaintenance.code],
  plannedDate : [this.selectedAddTheImplementationOfAirConditioningMaintenance.plannedDate],
  actualDate : [this.selectedAddTheImplementationOfAirConditioningMaintenance.actualDate],
  region : [this.selectedAddTheImplementationOfAirConditioningMaintenance.region],
  laboratoryType : [this.selectedAddTheImplementationOfAirConditioningMaintenance.laboratoryType]
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
    return this.addTheImplementationOfAirConditioningMaintenanceForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.addTheImplementationOfAirConditioningMaintenanceForm.controls)) {
      this.addTheImplementationOfAirConditioningMaintenanceForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.areasService = new LookupService('areas', this.http);
this.laboratoryTypesService = new LookupService('laboratorytypes', this.http);
  }
}

