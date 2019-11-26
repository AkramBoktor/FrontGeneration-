
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { StatementsOfSensors } from 'app/shared/models/statements-of-sensors';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { StatementsOfSensorsService } from '../shared/statements-of-sensors.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-statements-of-sensors-new',
  templateUrl: './statements-of-sensors-new.component.html',
  styleUrls: ['./statements-of-sensors-new.component.scss'],
  providers: [
    ]
})

export class StatementsOfSensorsNewComponent extends AppBaseComponent implements OnInit {
  statementsOfSensorsForm: FormGroup;
  @Input() selectedStatementsOfSensors: StatementsOfSensors;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<StatementsOfSensorsNewComponent>,
    public statementsOfSensorsService: StatementsOfSensorsService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedStatementsOfSensors = new StatementsOfSensors();

    

    this.statementsOfSensorsForm = this.formBuilder.group({
     
  id : [0],
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
    this.statementsOfSensorsService.create(this.statementsOfSensorsForm.value)
        .pipe(switchMap(x => {
			return this.statementsOfSensorsService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.statementsOfSensorsForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
