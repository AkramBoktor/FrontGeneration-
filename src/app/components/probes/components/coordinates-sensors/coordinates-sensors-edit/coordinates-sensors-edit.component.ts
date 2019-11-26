
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { CoordinatesSensors } from 'app/shared/models/coordinates-sensors';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { CoordinatesSensorsService } from '../shared/coordinates-sensors.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-coordinates-sensors-edit',
  templateUrl: './coordinates-sensors-edit.component.html',
  styleUrls: ['./coordinates-sensors-edit.component.scss'],
  providers: []
})

export class CoordinatesSensorsEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedCoordinatesSensors: CoordinatesSensors;
  coordinatesSensorsForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedCoordinatesSensorsDialog: any,
    @Optional() public dialogRef: MatDialogRef<CoordinatesSensorsEditComponent>,
    public coordinatesSensorsService: CoordinatesSensorsService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedCoordinatesSensors = new CoordinatesSensors();
    this.selectedCoordinatesSensors = this.selectedCoordinatesSensorsDialog.data || this.selectedCoordinatesSensors;

    

    this.coordinatesSensorsForm = this.formBuilder.group({
      
  id : [this.selectedCoordinatesSensors.id],
  buildingCode : [this.selectedCoordinatesSensors.buildingCode, [ Validators.required ]],
  sensorNumber : [this.selectedCoordinatesSensors.sensorNumber, [ Validators.required ]],
  coordinatesX : [this.selectedCoordinatesSensors.coordinatesX, [ Validators.required ]],
  coordinatesY : [this.selectedCoordinatesSensors.coordinatesY, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.coordinatesSensorsService.update(this.coordinatesSensorsForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.coordinatesSensorsService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.coordinatesSensorsForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
