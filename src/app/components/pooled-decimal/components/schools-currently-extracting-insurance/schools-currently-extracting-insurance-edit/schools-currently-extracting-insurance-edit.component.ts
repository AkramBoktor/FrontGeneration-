
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { SchoolsCurrentlyExtractingInsurance} from 'app/shared/models/schools-currently-extracting-insurance';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { SchoolsCurrentlyExtractingInsuranceService } from '../shared/schools-currently-extracting-insurance.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-schools-currently-extracting-insurance-edit',
  templateUrl: './schools-currently-extracting-insurance-edit.component.html',
  styleUrls: ['./schools-currently-extracting-insurance-edit.component.scss'],
  providers: []
})

export class SchoolsCurrentlyExtractingInsuranceEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedSchoolsCurrentlyExtractingInsurance: SchoolsCurrentlyExtractingInsurance;
  schoolsCurrentlyExtractingInsuranceForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedSchoolsCurrentlyExtractingInsuranceDialog: any,
    @Optional() public dialogRef: MatDialogRef<SchoolsCurrentlyExtractingInsuranceEditComponent>,
    public schoolsCurrentlyExtractingInsuranceService: SchoolsCurrentlyExtractingInsuranceService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSchoolsCurrentlyExtractingInsurance = new SchoolsCurrentlyExtractingInsurance();
    this.selectedSchoolsCurrentlyExtractingInsurance = this.selectedSchoolsCurrentlyExtractingInsuranceDialog.data || this.selectedSchoolsCurrentlyExtractingInsurance;

    

    this.schoolsCurrentlyExtractingInsuranceForm = this.formBuilder.group({
      
  id : [this.selectedSchoolsCurrentlyExtractingInsurance.id],
  insuranceCompanyCode : [this.selectedSchoolsCurrentlyExtractingInsurance.insuranceCompanyCode, [ Validators.required ]],
  insuranceCompanyName : [this.selectedSchoolsCurrentlyExtractingInsurance.insuranceCompanyName, [ ]],
  schoolCode : [this.selectedSchoolsCurrentlyExtractingInsurance.schoolCode, [ Validators.required ]],
  schoolName : [this.selectedSchoolsCurrentlyExtractingInsurance.schoolName, [ ]],
  extensionNumber : [this.selectedSchoolsCurrentlyExtractingInsurance.extensionNumber, [ Validators.required ]],
  modelCode : [this.selectedSchoolsCurrentlyExtractingInsurance.modelCode, [ Validators.required ]],
  floorsNumber : [this.selectedSchoolsCurrentlyExtractingInsurance.floorsNumber, [ Validators.required ]],
  classroomNumber : [this.selectedSchoolsCurrentlyExtractingInsurance.classroomNumber, [ Validators.required ]],
  schoolNumber : [this.selectedSchoolsCurrentlyExtractingInsurance.schoolNumber, [ Validators.required ]],
  deliveryDate : [this.selectedSchoolsCurrentlyExtractingInsurance.deliveryDate, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.schoolsCurrentlyExtractingInsuranceService.update(this.schoolsCurrentlyExtractingInsuranceForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.schoolsCurrentlyExtractingInsuranceService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.schoolsCurrentlyExtractingInsuranceForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
