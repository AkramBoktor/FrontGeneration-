
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { CalibrationUnitData } from 'app/shared/models/calibration-unit-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { CalibrationUnitDataService } from '../shared/calibration-unit-data.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-calibration-unit-data-view',
  templateUrl: './calibration-unit-data-view.component.html',
  styleUrls: ['./calibration-unit-data-view.component.scss'],
  providers: []
})

export class CalibrationUnitDataViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedCalibrationUnitData: CalibrationUnitData;
  calibrationUnitDataForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedCalibrationUnitDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<CalibrationUnitDataViewComponent>,
    public calibrationUnitDataService: CalibrationUnitDataService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedCalibrationUnitData = this.selectedCalibrationUnitDataDialog.data || this.selectedCalibrationUnitData;

    

    this.calibrationUnitDataForm = this.formBuilder.group({
      
  calibrationUnitCode : [this.selectedCalibrationUnitData.calibrationUnitCode],
  calibrationUnitName : [this.selectedCalibrationUnitData.calibrationUnitName]
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
    return this.calibrationUnitDataForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.calibrationUnitDataForm.controls)) {
      this.calibrationUnitDataForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

