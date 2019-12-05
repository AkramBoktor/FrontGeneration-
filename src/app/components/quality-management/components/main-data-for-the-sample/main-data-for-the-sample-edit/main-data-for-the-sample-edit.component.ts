
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MainDataForTheSample } from 'app/shared/models/main-data-for-the-sample';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { MainDataForTheSampleService } from '../shared/main-data-for-the-sample.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-main-data-for-the-sample-edit',
  templateUrl: './main-data-for-the-sample-edit.component.html',
  styleUrls: ['./main-data-for-the-sample-edit.component.scss'],
  providers: []
})

export class MainDataForTheSampleEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedMainDataForTheSample: MainDataForTheSample;
  mainDataForTheSampleForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private calibrationsService: LookupService;
private measurementUnitsService: LookupService;
private standardValuesService: LookupService;

  
calibrationSelectOptions: MaterialSelectOptions;
unitSelectOptions: MaterialSelectOptions;
standardValueSelectOptions: MaterialSelectOptions;

  
	@ViewChild('calibration', { static: true }) CalibrationSelectComponent: MaterialSelectComponent;
	@ViewChild('unit', { static: true }) UnitSelectComponent: MaterialSelectComponent;
	@ViewChild('standardValue', { static: true }) StandardValueSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedMainDataForTheSampleDialog: any,
    @Optional() public dialogRef: MatDialogRef<MainDataForTheSampleEditComponent>,
    public mainDataForTheSampleService: MainDataForTheSampleService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedMainDataForTheSample = new MainDataForTheSample();
    this.selectedMainDataForTheSample = this.selectedMainDataForTheSampleDialog.data || this.selectedMainDataForTheSample;

    
	this.calibrationSelectOptions = new MaterialSelectOptions({
	 data: this.calibrationsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المعايرة',
	});

	this.unitSelectOptions = new MaterialSelectOptions({
	 data: this.measurementUnitsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الوحده',
	});

	this.standardValueSelectOptions = new MaterialSelectOptions({
	 data: this.standardValuesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'القيمة العيارية',
	});


    this.mainDataForTheSampleForm = this.formBuilder.group({
      
  id : [this.selectedMainDataForTheSample.id],
  sampleSpecificationCode : [this.selectedMainDataForTheSample.sampleSpecificationCode, [ ]],
  basicMaterial : [this.selectedMainDataForTheSample.basicMaterial, [ Validators.required ]],
  subMaterial : [this.selectedMainDataForTheSample.subMaterial, [ Validators.required ]],
  testCode : [this.selectedMainDataForTheSample.testCode, [ Validators.required ]],
  samplesMinimumNumber : [this.selectedMainDataForTheSample.samplesMinimumNumber, [ Validators.required ]],
  calibration : [this.selectedMainDataForTheSample.calibration, [ Validators.required ]],
  unit : [this.selectedMainDataForTheSample.unit, [ Validators.required ]],
  standardValue : [this.selectedMainDataForTheSample.standardValue, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.mainDataForTheSampleService.update(this.mainDataForTheSampleForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.mainDataForTheSampleService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.mainDataForTheSampleForm.get(name);
  }

  initializeLookupServices() {
    this.calibrationsService = new LookupService('calibrations', this.http);
this.measurementUnitsService = new LookupService('measurementunits', this.http);
this.standardValuesService = new LookupService('standardvalues', this.http);
  }
}
