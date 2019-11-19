
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { RegistrationOfSchoolsInTheInsuranceCompany } from 'app/shared/models/registration-of-schools-in-the-insurance-company';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { RegistrationOfSchoolsInTheInsuranceCompanyService } from '../shared/registration-of-schools-in-the-insurance-company.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-registration-of-schools-in-the-insurance-company-edit',
  templateUrl: './registration-of-schools-in-the-insurance-company-edit.component.html',
  styleUrls: ['./registration-of-schools-in-the-insurance-company-edit.component.scss'],
  providers: []
})

export class RegistrationOfSchoolsInTheInsuranceCompanyEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedRegistrationOfSchoolsInTheInsuranceCompany: RegistrationOfSchoolsInTheInsuranceCompany;
  registrationOfSchoolsInTheInsuranceCompanyForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedRegistrationOfSchoolsInTheInsuranceCompanyDialog: any,
    @Optional() public dialogRef: MatDialogRef<RegistrationOfSchoolsInTheInsuranceCompanyEditComponent>,
    public registrationOfSchoolsInTheInsuranceCompanyService: RegistrationOfSchoolsInTheInsuranceCompanyService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedRegistrationOfSchoolsInTheInsuranceCompany = new RegistrationOfSchoolsInTheInsuranceCompany();
    this.selectedRegistrationOfSchoolsInTheInsuranceCompany = this.selectedRegistrationOfSchoolsInTheInsuranceCompanyDialog.data || this.selectedRegistrationOfSchoolsInTheInsuranceCompany;

    

    this.registrationOfSchoolsInTheInsuranceCompanyForm = this.formBuilder.group({
      
  id : [this.selectedRegistrationOfSchoolsInTheInsuranceCompany.id],
  companyCode : [this.selectedRegistrationOfSchoolsInTheInsuranceCompany.companyCode, [ Validators.required ]],
  companyname : [this.selectedRegistrationOfSchoolsInTheInsuranceCompany.companyname, [ Validators.required ]],
  dateOfRegistration : [this.selectedRegistrationOfSchoolsInTheInsuranceCompany.dateOfRegistration, [ Validators.required ]],
  amountOfInsurance : [this.selectedRegistrationOfSchoolsInTheInsuranceCompany.amountOfInsurance, [ Validators.required ]],
  buildingNumber : [this.selectedRegistrationOfSchoolsInTheInsuranceCompany.buildingNumber, [ Validators.required ]],
  annexNumber : [this.selectedRegistrationOfSchoolsInTheInsuranceCompany.annexNumber, [ Validators.required ]],
  numberOfFloors : [this.selectedRegistrationOfSchoolsInTheInsuranceCompany.numberOfFloors, [ Validators.required ]],
  modelCode : [this.selectedRegistrationOfSchoolsInTheInsuranceCompany.modelCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.registrationOfSchoolsInTheInsuranceCompanyService.update(this.registrationOfSchoolsInTheInsuranceCompanyForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.registrationOfSchoolsInTheInsuranceCompanyService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.registrationOfSchoolsInTheInsuranceCompanyForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
