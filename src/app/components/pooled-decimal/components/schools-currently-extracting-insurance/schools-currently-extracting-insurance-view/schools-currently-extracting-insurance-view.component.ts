
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { SchoolsCurrentlyExtractingInsurance} from 'app/shared/models/schools-currently-extracting-insurance';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { SchoolsCurrentlyExtractingInsuranceService } from '../shared/schools-currently-extracting-insurance.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-schools-currently-extracting-insurance-view',
  templateUrl: './schools-currently-extracting-insurance-view.component.html',
  styleUrls: ['./schools-currently-extracting-insurance-view.component.scss'],
  providers: []
})

export class SchoolsCurrentlyExtractingInsuranceViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedSchoolsCurrentlyExtractingInsurance: SchoolsCurrentlyExtractingInsurance;
  schoolsCurrentlyExtractingInsuranceForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedSchoolsCurrentlyExtractingInsuranceDialog: any,
    @Optional() public dialogRef: MatDialogRef<SchoolsCurrentlyExtractingInsuranceViewComponent>,
    public schoolsCurrentlyExtractingInsuranceService: SchoolsCurrentlyExtractingInsuranceService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSchoolsCurrentlyExtractingInsurance = this.selectedSchoolsCurrentlyExtractingInsuranceDialog.data || this.selectedSchoolsCurrentlyExtractingInsurance;

    

    this.schoolsCurrentlyExtractingInsuranceForm = this.formBuilder.group({
      
  insuranceCompanyCode : [this.selectedSchoolsCurrentlyExtractingInsurance.insuranceCompanyCode],
  insuranceCompanyName : [this.selectedSchoolsCurrentlyExtractingInsurance.insuranceCompanyName],
  schoolCode : [this.selectedSchoolsCurrentlyExtractingInsurance.schoolCode],
  schoolName : [this.selectedSchoolsCurrentlyExtractingInsurance.schoolName],
  extensionNumber : [this.selectedSchoolsCurrentlyExtractingInsurance.extensionNumber],
  modelCode : [this.selectedSchoolsCurrentlyExtractingInsurance.modelCode],
  floorsNumber : [this.selectedSchoolsCurrentlyExtractingInsurance.floorsNumber],
  classroomNumber : [this.selectedSchoolsCurrentlyExtractingInsurance.classroomNumber],
  schoolNumber : [this.selectedSchoolsCurrentlyExtractingInsurance.schoolNumber],
  deliveryDate : [this.selectedSchoolsCurrentlyExtractingInsurance.deliveryDate]
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
    return this.schoolsCurrentlyExtractingInsuranceForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.schoolsCurrentlyExtractingInsuranceForm.controls)) {
      this.schoolsCurrentlyExtractingInsuranceForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

