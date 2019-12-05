
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { DataUnitOfMeasurement } from 'app/shared/models/data-unit-of-measurement';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { DataUnitOfMeasurementService } from '../shared/data-unit-of-measurement.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-data-unit-of-measurement-edit',
  templateUrl: './data-unit-of-measurement-edit.component.html',
  styleUrls: ['./data-unit-of-measurement-edit.component.scss'],
  providers: []
})

export class DataUnitOfMeasurementEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedDataUnitOfMeasurement: DataUnitOfMeasurement;
  dataUnitOfMeasurementForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private calibrationsService: LookupService;
private measurementUnitsService: LookupService;

  
calibrationUnitCodeSelectOptions: MaterialSelectOptions;
measurementCodeUnitSelectOptions: MaterialSelectOptions;

  
	@ViewChild('calibrationUnitCode', { static: true }) CalibrationUnitCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('measurementCodeUnit', { static: true }) MeasurementCodeUnitSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedDataUnitOfMeasurementDialog: any,
    @Optional() public dialogRef: MatDialogRef<DataUnitOfMeasurementEditComponent>,
    public dataUnitOfMeasurementService: DataUnitOfMeasurementService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDataUnitOfMeasurement = new DataUnitOfMeasurement();
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
      
  id : [this.selectedDataUnitOfMeasurement.id],
  measurementNameUnit : [this.selectedDataUnitOfMeasurement.measurementNameUnit, [ Validators.required ]],
  calibrationUnitCode : [this.selectedDataUnitOfMeasurement.calibrationUnitCode, [ Validators.required ]],
  measurementCodeUnit : [this.selectedDataUnitOfMeasurement.measurementCodeUnit, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.dataUnitOfMeasurementService.update(this.dataUnitOfMeasurementForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.dataUnitOfMeasurementService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.dataUnitOfMeasurementForm.get(name);
  }

  initializeLookupServices() {
    this.calibrationsService = new LookupService('calibrations', this.http);
this.measurementUnitsService = new LookupService('measurementunits', this.http);
  }
}
