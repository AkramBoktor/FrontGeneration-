
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { DataUnitOfMeasurement } from 'app/shared/models/data-unit-of-measurement';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { DataUnitOfMeasurementService } from '../shared/data-unit-of-measurement.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-data-unit-of-measurement-view',
  templateUrl: './data-unit-of-measurement-view.component.html',
  styleUrls: ['./data-unit-of-measurement-view.component.scss'],
  providers: []
})

export class DataUnitOfMeasurementViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedDataUnitOfMeasurement: DataUnitOfMeasurement;
  dataUnitOfMeasurementForm: FormGroup;

  private calibrationsService: LookupService;
private measurementUnitsService: LookupService;

  
calibrationUnitCodeSelectOptions: MaterialSelectOptions;
measurementCodeUnitSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedDataUnitOfMeasurementDialog: any,
    @Optional() public dialogRef: MatDialogRef<DataUnitOfMeasurementViewComponent>,
    public dataUnitOfMeasurementService: DataUnitOfMeasurementService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDataUnitOfMeasurement = this.selectedDataUnitOfMeasurementDialog.data || this.selectedDataUnitOfMeasurement;

    
	this.calibrationUnitCodeSelectOptions = new MaterialSelectOptions({
	 data: this.calibrationsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود وحدة المعايرة',
	});

	this.measurementCodeUnitSelectOptions = new MaterialSelectOptions({
	 data: this.measurementUnitsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود وحدة القياس',
	});


    this.dataUnitOfMeasurementForm = this.formBuilder.group({
      
  measurementNameUnit : [this.selectedDataUnitOfMeasurement.measurementNameUnit],
  calibrationUnitCode : [this.selectedDataUnitOfMeasurement.calibrationUnitCode],
  measurementCodeUnit : [this.selectedDataUnitOfMeasurement.measurementCodeUnit]
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
    return this.dataUnitOfMeasurementForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.dataUnitOfMeasurementForm.controls)) {
      this.dataUnitOfMeasurementForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.calibrationsService = new LookupService('calibrations', this.http);
this.measurementUnitsService = new LookupService('measurementunits', this.http);
  }
}

