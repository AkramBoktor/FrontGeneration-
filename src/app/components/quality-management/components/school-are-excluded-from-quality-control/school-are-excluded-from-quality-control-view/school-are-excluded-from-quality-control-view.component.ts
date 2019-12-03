
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { SchoolAreExcludedFromQualityControl } from 'app/shared/models/school-are-excluded-from-quality-control';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { SchoolAreExcludedFromQualityControlService } from '../shared/school-are-excluded-from-quality-control.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-school-are-excluded-from-quality-control-view',
  templateUrl: './school-are-excluded-from-quality-control-view.component.html',
  styleUrls: ['./school-are-excluded-from-quality-control-view.component.scss'],
  providers: []
})

export class SchoolAreExcludedFromQualityControlViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedSchoolAreExcludedFromQualityControl: SchoolAreExcludedFromQualityControl;
  schoolAreExcludedFromQualityControlForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedSchoolAreExcludedFromQualityControlDialog: any,
    @Optional() public dialogRef: MatDialogRef<SchoolAreExcludedFromQualityControlViewComponent>,
    public schoolAreExcludedFromQualityControlService: SchoolAreExcludedFromQualityControlService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSchoolAreExcludedFromQualityControl = this.selectedSchoolAreExcludedFromQualityControlDialog.data || this.selectedSchoolAreExcludedFromQualityControl;

    

    this.schoolAreExcludedFromQualityControlForm = this.formBuilder.group({
      
  schoolCode : [this.selectedSchoolAreExcludedFromQualityControl.schoolCode],
  schoolName : [this.selectedSchoolAreExcludedFromQualityControl.schoolName],
  date : [this.selectedSchoolAreExcludedFromQualityControl.date]
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
    return this.schoolAreExcludedFromQualityControlForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.schoolAreExcludedFromQualityControlForm.controls)) {
      this.schoolAreExcludedFromQualityControlForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

