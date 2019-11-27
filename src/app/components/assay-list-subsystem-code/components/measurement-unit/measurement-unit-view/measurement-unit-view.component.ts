
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MeasurementUnit } from 'app/shared/models/measurement-unit';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MeasurementUnitService } from '../shared/measurement-unit.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-measurement-unit-view',
  templateUrl: './measurement-unit-view.component.html',
  styleUrls: ['./measurement-unit-view.component.scss'],
  providers: []
})

export class MeasurementUnitViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedMeasurementUnit: MeasurementUnit;
  measurementUnitForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedMeasurementUnitDialog: any,
    @Optional() public dialogRef: MatDialogRef<MeasurementUnitViewComponent>,
    public measurementUnitService: MeasurementUnitService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedMeasurementUnit = this.selectedMeasurementUnitDialog.data || this.selectedMeasurementUnit;

    

    this.measurementUnitForm = this.formBuilder.group({
      
  code : [this.selectedMeasurementUnit.code],
  name : [this.selectedMeasurementUnit.name]
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
    return this.measurementUnitForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.measurementUnitForm.controls)) {
      this.measurementUnitForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

