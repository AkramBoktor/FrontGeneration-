
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { DataUnitOfMeasurement } from 'app/shared/models/data-unit-of-measurement';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { DataUnitOfMeasurementService } from '../shared/data-unit-of-measurement.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-data-unit-of-measurement-new',
  templateUrl: './data-unit-of-measurement-new.component.html',
  styleUrls: ['./data-unit-of-measurement-new.component.scss'],
  providers: [
    ]
})

export class DataUnitOfMeasurementNewComponent extends AppBaseComponent implements OnInit {
  dataUnitOfMeasurementForm: FormGroup;
  @Input() selectedDataUnitOfMeasurement: DataUnitOfMeasurement;
  errorMessages: FormControlError[] = [
        
  ];

  private calibrationsService: LookupService;
private measurementUnitsService: LookupService;

  
calibrationUnitCodeSelectOptions: MaterialSelectOptions;
measurementCodeUnitSelectOptions: MaterialSelectOptions;

  
	@ViewChild('calibrationUnitCode', { static: true }) CalibrationUnitCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('measurementCodeUnit', { static: true }) MeasurementCodeUnitSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<DataUnitOfMeasurementNewComponent>,
    public dataUnitOfMeasurementService: DataUnitOfMeasurementService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDataUnitOfMeasurement = new DataUnitOfMeasurement();

    
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
     
  id : [0],
  measurementNameUnit : [this.selectedDataUnitOfMeasurement.measurementNameUnit, [ Validators.required ]],
  calibrationUnitCode : [this.selectedDataUnitOfMeasurement.calibrationUnitCode, [ Validators.required ]],
  measurementCodeUnit : [this.selectedDataUnitOfMeasurement.measurementCodeUnit, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.dataUnitOfMeasurementService.create(this.dataUnitOfMeasurementForm.value)
        .pipe(switchMap(x => {
			return this.dataUnitOfMeasurementService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.dataUnitOfMeasurementForm.get(name);
    }

  initializeLookupServices() {
    this.calibrationsService = new LookupService('calibrations', this.http);
this.measurementUnitsService = new LookupService('measurementunits', this.http);
  }
 }
