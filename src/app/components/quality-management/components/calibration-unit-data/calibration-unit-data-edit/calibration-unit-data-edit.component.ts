
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { CalibrationUnitData } from 'app/shared/models/calibration-unit-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { CalibrationUnitDataService } from '../shared/calibration-unit-data.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-calibration-unit-data-edit',
  templateUrl: './calibration-unit-data-edit.component.html',
  styleUrls: ['./calibration-unit-data-edit.component.scss'],
  providers: []
})

export class CalibrationUnitDataEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedCalibrationUnitData: CalibrationUnitData;
  calibrationUnitDataForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedCalibrationUnitDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<CalibrationUnitDataEditComponent>,
    public calibrationUnitDataService: CalibrationUnitDataService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedCalibrationUnitData = new CalibrationUnitData();
    this.selectedCalibrationUnitData = this.selectedCalibrationUnitDataDialog.data || this.selectedCalibrationUnitData;

    

    this.calibrationUnitDataForm = this.formBuilder.group({
      
  id : [this.selectedCalibrationUnitData.id],
  calibrationUnitCode : [this.selectedCalibrationUnitData.calibrationUnitCode, [ Validators.required ]],
  calibrationUnitName : [this.selectedCalibrationUnitData.calibrationUnitName, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.calibrationUnitDataService.update(this.calibrationUnitDataForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.calibrationUnitDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.calibrationUnitDataForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
