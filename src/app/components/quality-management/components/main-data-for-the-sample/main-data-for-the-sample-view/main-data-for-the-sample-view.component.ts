
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MainDataForTheSample } from 'app/shared/models/main-data-for-the-sample';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MainDataForTheSampleService } from '../shared/main-data-for-the-sample.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-main-data-for-the-sample-view',
  templateUrl: './main-data-for-the-sample-view.component.html',
  styleUrls: ['./main-data-for-the-sample-view.component.scss'],
  providers: []
})

export class MainDataForTheSampleViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedMainDataForTheSample: MainDataForTheSample;
  mainDataForTheSampleForm: FormGroup;

  private calibrationsService: LookupService;
private measurementUnitsService: LookupService;
private standardValuesService: LookupService;

  
calibrationSelectOptions: MaterialSelectOptions;
unitSelectOptions: MaterialSelectOptions;
standardValueSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedMainDataForTheSampleDialog: any,
    @Optional() public dialogRef: MatDialogRef<MainDataForTheSampleViewComponent>,
    public mainDataForTheSampleService: MainDataForTheSampleService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
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
      
  sampleSpecificationCode : [this.selectedMainDataForTheSample.sampleSpecificationCode],
  basicMaterial : [this.selectedMainDataForTheSample.basicMaterial],
  subMaterial : [this.selectedMainDataForTheSample.subMaterial],
  testCode : [this.selectedMainDataForTheSample.testCode],
  samplesMinimumNumber : [this.selectedMainDataForTheSample.samplesMinimumNumber],
  calibration : [this.selectedMainDataForTheSample.calibration],
  unit : [this.selectedMainDataForTheSample.unit],
  standardValue : [this.selectedMainDataForTheSample.standardValue]
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
    return this.mainDataForTheSampleForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.mainDataForTheSampleForm.controls)) {
      this.mainDataForTheSampleForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.calibrationsService = new LookupService('calibrations', this.http);
this.measurementUnitsService = new LookupService('measurementunits', this.http);
this.standardValuesService = new LookupService('standardvalues', this.http);
  }
}

