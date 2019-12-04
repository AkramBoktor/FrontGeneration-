
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { StatementsOfSensors } from 'app/shared/models/statements-of-sensors';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { StatementsOfSensorsService } from '../shared/statements-of-sensors.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-statements-of-sensors-edit',
  templateUrl: './statements-of-sensors-edit.component.html',
  styleUrls: ['./statements-of-sensors-edit.component.scss'],
  providers: []
})

export class StatementsOfSensorsEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedStatementsOfSensors: StatementsOfSensors;
  statementsOfSensorsForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedStatementsOfSensorsDialog: any,
    @Optional() public dialogRef: MatDialogRef<StatementsOfSensorsEditComponent>,
    public statementsOfSensorsService: StatementsOfSensorsService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedStatementsOfSensors = new StatementsOfSensors();
    this.selectedStatementsOfSensors = this.selectedStatementsOfSensorsDialog.data || this.selectedStatementsOfSensors;

    

    this.statementsOfSensorsForm = this.formBuilder.group({
      
  id : [this.selectedStatementsOfSensors.id],
  schoolNumber : [this.selectedStatementsOfSensors.schoolNumber, [ Validators.required ]],
  recordDate : [this.selectedStatementsOfSensors.recordDate, [ Validators.required ]],
  administrator : [this.selectedStatementsOfSensors.administrator, [ Validators.required ]],
  alternativeNumber : [this.selectedStatementsOfSensors.alternativeNumber, [ Validators.required ]],
  floorsNumbers : [this.selectedStatementsOfSensors.floorsNumbers, [ Validators.required ]],
  backfill : [this.selectedStatementsOfSensors.backfill, [ Validators.required ]],
  drillingDepth : [this.selectedStatementsOfSensors.drillingDepth, [ Validators.required ]],
  flutterDrill : [this.selectedStatementsOfSensors.flutterDrill, [ Validators.required ]],
  qualitySubstitution : [this.selectedStatementsOfSensors.qualitySubstitution, [ Validators.required ]],
  substitutionDepth : [this.selectedStatementsOfSensors.substitutionDepth, [ Validators.required ]],
  qualityFoundations : [this.selectedStatementsOfSensors.qualityFoundations, [ Validators.required ]],
  soilEffort : [this.selectedStatementsOfSensors.soilEffort, [ Validators.required ]],
  qualityCement : [this.selectedStatementsOfSensors.qualityCement, [ Validators.required ]],
  notes : [this.selectedStatementsOfSensors.notes, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.statementsOfSensorsService.update(this.statementsOfSensorsForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.statementsOfSensorsService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.statementsOfSensorsForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
