
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MeasurementUnit } from 'app/shared/models/measurement-unit';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { MeasurementUnitService } from '../shared/measurement-unit.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-measurement-unit-edit',
  templateUrl: './measurement-unit-edit.component.html',
  styleUrls: ['./measurement-unit-edit.component.scss'],
  providers: []
})

export class MeasurementUnitEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedMeasurementUnit: MeasurementUnit;
  measurementUnitForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedMeasurementUnitDialog: any,
    @Optional() public dialogRef: MatDialogRef<MeasurementUnitEditComponent>,
    public measurementUnitService: MeasurementUnitService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedMeasurementUnit = new MeasurementUnit();
    this.selectedMeasurementUnit = this.selectedMeasurementUnitDialog.data || this.selectedMeasurementUnit;

    

    this.measurementUnitForm = this.formBuilder.group({
      
  id : [this.selectedMeasurementUnit.id],
  code : [this.selectedMeasurementUnit.code, [ Validators.required ]],
  name : [this.selectedMeasurementUnit.name, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.measurementUnitService.update(this.measurementUnitForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.measurementUnitService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.measurementUnitForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
