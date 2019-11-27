
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { StatementsOfSensors } from 'app/shared/models/statements-of-sensors';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { StatementsOfSensorsService } from '../shared/statements-of-sensors.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-statements-of-sensors-view',
  templateUrl: './statements-of-sensors-view.component.html',
  styleUrls: ['./statements-of-sensors-view.component.scss'],
  providers: []
})

export class StatementsOfSensorsViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedStatementsOfSensors: StatementsOfSensors;
  statementsOfSensorsForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedStatementsOfSensorsDialog: any,
    @Optional() public dialogRef: MatDialogRef<StatementsOfSensorsViewComponent>,
    public statementsOfSensorsService: StatementsOfSensorsService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedStatementsOfSensors = this.selectedStatementsOfSensorsDialog.data || this.selectedStatementsOfSensors;

    

    this.statementsOfSensorsForm = this.formBuilder.group({
      
  schoolNumber : [this.selectedStatementsOfSensors.schoolNumber],
  recordDate : [this.selectedStatementsOfSensors.recordDate],
  administrator : [this.selectedStatementsOfSensors.administrator],
  alternativeNumber : [this.selectedStatementsOfSensors.alternativeNumber],
  floorsNumbers : [this.selectedStatementsOfSensors.floorsNumbers],
  backfill : [this.selectedStatementsOfSensors.backfill],
  drillingDepth : [this.selectedStatementsOfSensors.drillingDepth],
  flutterDrill : [this.selectedStatementsOfSensors.flutterDrill],
  qualitySubstitution : [this.selectedStatementsOfSensors.qualitySubstitution],
  substitutionDepth : [this.selectedStatementsOfSensors.substitutionDepth],
  qualityFoundations : [this.selectedStatementsOfSensors.qualityFoundations],
  soilEffort : [this.selectedStatementsOfSensors.soilEffort],
  qualityCement : [this.selectedStatementsOfSensors.qualityCement],
  notes : [this.selectedStatementsOfSensors.notes]
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
    return this.statementsOfSensorsForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.statementsOfSensorsForm.controls)) {
      this.statementsOfSensorsForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

