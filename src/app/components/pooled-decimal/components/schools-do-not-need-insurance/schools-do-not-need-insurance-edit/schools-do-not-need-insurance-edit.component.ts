
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { SchoolsDoNotNeedInsurance } from 'app/shared/models/schools-do-not-need-insurance';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { SchoolsDoNotNeedInsuranceService } from '../shared/schools-do-not-need-insurance.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-schools-do-not-need-insurance-edit',
  templateUrl: './schools-do-not-need-insurance-edit.component.html',
  styleUrls: ['./schools-do-not-need-insurance-edit.component.scss'],
  providers: []
})

export class SchoolsDoNotNeedInsuranceEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedSchoolsDoNotNeedInsurance: SchoolsDoNotNeedInsurance;
  schoolsDoNotNeedInsuranceForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedSchoolsDoNotNeedInsuranceDialog: any,
    @Optional() public dialogRef: MatDialogRef<SchoolsDoNotNeedInsuranceEditComponent>,
    public schoolsDoNotNeedInsuranceService: SchoolsDoNotNeedInsuranceService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSchoolsDoNotNeedInsurance = new SchoolsDoNotNeedInsurance();
    this.selectedSchoolsDoNotNeedInsurance = this.selectedSchoolsDoNotNeedInsuranceDialog.data || this.selectedSchoolsDoNotNeedInsurance;

    

    this.schoolsDoNotNeedInsuranceForm = this.formBuilder.group({
      
  id : [this.selectedSchoolsDoNotNeedInsurance.id],
  theNumberOfTheLetter : [this.selectedSchoolsDoNotNeedInsurance.theNumberOfTheLetter, [ Validators.required ]],
  schoolNumber : [this.selectedSchoolsDoNotNeedInsurance.schoolNumber, [ Validators.required ]],
  annexNumber : [this.selectedSchoolsDoNotNeedInsurance.annexNumber, [ Validators.required ]],
  modelNumber : [this.selectedSchoolsDoNotNeedInsurance.modelNumber, [ Validators.required ]],
  numberOfFloors : [this.selectedSchoolsDoNotNeedInsurance.numberOfFloors, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.schoolsDoNotNeedInsuranceService.update(this.schoolsDoNotNeedInsuranceForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.schoolsDoNotNeedInsuranceService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.schoolsDoNotNeedInsuranceForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
