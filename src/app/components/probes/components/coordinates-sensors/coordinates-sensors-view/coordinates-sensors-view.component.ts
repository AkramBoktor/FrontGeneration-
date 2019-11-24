
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { CoordinatesSensors } from 'app/shared/models/coordinates-sensors';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { CoordinatesSensorsService } from '../shared/coordinates-sensors.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-coordinates-sensors-view',
  templateUrl: './coordinates-sensors-view.component.html',
  styleUrls: ['./coordinates-sensors-view.component.scss'],
  providers: []
})

export class CoordinatesSensorsViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedCoordinatesSensors: CoordinatesSensors;
  coordinatesSensorsForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedCoordinatesSensorsDialog: any,
    @Optional() public dialogRef: MatDialogRef<CoordinatesSensorsViewComponent>,
    public coordinatesSensorsService: CoordinatesSensorsService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedCoordinatesSensors = this.selectedCoordinatesSensorsDialog.data || this.selectedCoordinatesSensors;

    

    this.coordinatesSensorsForm = this.formBuilder.group({
      
  buildingCode : [this.selectedCoordinatesSensors.buildingCode],
  sensorNumber : [this.selectedCoordinatesSensors.sensorNumber],
  coordinatesX : [this.selectedCoordinatesSensors.coordinatesX],
  coordinatesY : [this.selectedCoordinatesSensors.coordinatesY]
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
    return this.coordinatesSensorsForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.coordinatesSensorsForm.controls)) {
      this.coordinatesSensorsForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

