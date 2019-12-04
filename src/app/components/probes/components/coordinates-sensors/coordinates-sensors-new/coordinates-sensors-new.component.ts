
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { CoordinatesSensors } from 'app/shared/models/coordinates-sensors';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { CoordinatesSensorsService } from '../shared/coordinates-sensors.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-coordinates-sensors-new',
  templateUrl: './coordinates-sensors-new.component.html',
  styleUrls: ['./coordinates-sensors-new.component.scss'],
  providers: [
    ]
})

export class CoordinatesSensorsNewComponent extends AppBaseComponent implements OnInit {
  coordinatesSensorsForm: FormGroup;
  @Input() selectedCoordinatesSensors: CoordinatesSensors;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<CoordinatesSensorsNewComponent>,
    public coordinatesSensorsService: CoordinatesSensorsService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedCoordinatesSensors = new CoordinatesSensors();

    

    this.coordinatesSensorsForm = this.formBuilder.group({
     
  id : [0],
  buildingCode : [this.selectedCoordinatesSensors.buildingCode, [ Validators.required ]],
  sensorNumber : [this.selectedCoordinatesSensors.sensorNumber, [ Validators.required ]],
  coordinatesX : [this.selectedCoordinatesSensors.coordinatesX, [ Validators.required ]],
  coordinatesY : [this.selectedCoordinatesSensors.coordinatesY, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.coordinatesSensorsService.create(this.coordinatesSensorsForm.value)
        .pipe(switchMap(x => {
			return this.coordinatesSensorsService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.coordinatesSensorsForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
