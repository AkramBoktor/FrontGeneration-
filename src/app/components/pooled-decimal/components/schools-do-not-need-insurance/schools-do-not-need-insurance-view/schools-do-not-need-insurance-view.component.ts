
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { SchoolsDoNotNeedInsurance } from 'app/shared/models/schools-do-not-need-insurance';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { SchoolsDoNotNeedInsuranceService } from '../shared/schools-do-not-need-insurance.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-schools-do-not-need-insurance-view',
  templateUrl: './schools-do-not-need-insurance-view.component.html',
  styleUrls: ['./schools-do-not-need-insurance-view.component.scss'],
  providers: []
})

export class SchoolsDoNotNeedInsuranceViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedSchoolsDoNotNeedInsurance: SchoolsDoNotNeedInsurance;
  schoolsDoNotNeedInsuranceForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedSchoolsDoNotNeedInsuranceDialog: any,
    @Optional() public dialogRef: MatDialogRef<SchoolsDoNotNeedInsuranceViewComponent>,
    public schoolsDoNotNeedInsuranceService: SchoolsDoNotNeedInsuranceService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSchoolsDoNotNeedInsurance = this.selectedSchoolsDoNotNeedInsuranceDialog.data || this.selectedSchoolsDoNotNeedInsurance;

    

    this.schoolsDoNotNeedInsuranceForm = this.formBuilder.group({
      
  theNumberOfTheLetter : [this.selectedSchoolsDoNotNeedInsurance.theNumberOfTheLetter],
  schoolNumber : [this.selectedSchoolsDoNotNeedInsurance.schoolNumber],
  annexNumber : [this.selectedSchoolsDoNotNeedInsurance.annexNumber],
  modelNumber : [this.selectedSchoolsDoNotNeedInsurance.modelNumber],
  numberOfFloors : [this.selectedSchoolsDoNotNeedInsurance.numberOfFloors]
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
    return this.schoolsDoNotNeedInsuranceForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.schoolsDoNotNeedInsuranceForm.controls)) {
      this.schoolsDoNotNeedInsuranceForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

