
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { CalibrationUnitData } from 'app/shared/models/calibration-unit-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { CalibrationUnitDataService } from '../shared/calibration-unit-data.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-calibration-unit-data-new',
  templateUrl: './calibration-unit-data-new.component.html',
  styleUrls: ['./calibration-unit-data-new.component.scss'],
  providers: [
    ]
})

export class CalibrationUnitDataNewComponent extends AppBaseComponent implements OnInit {
  calibrationUnitDataForm: FormGroup;
  @Input() selectedCalibrationUnitData: CalibrationUnitData;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<CalibrationUnitDataNewComponent>,
    public calibrationUnitDataService: CalibrationUnitDataService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedCalibrationUnitData = new CalibrationUnitData();

    

    this.calibrationUnitDataForm = this.formBuilder.group({
     
  id : [0],
  calibrationUnitCode : [this.selectedCalibrationUnitData.calibrationUnitCode, [ Validators.required ]],
  calibrationUnitName : [this.selectedCalibrationUnitData.calibrationUnitName, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.calibrationUnitDataService.create(this.calibrationUnitDataForm.value)
        .pipe(switchMap(x => {
			return this.calibrationUnitDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.calibrationUnitDataForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
