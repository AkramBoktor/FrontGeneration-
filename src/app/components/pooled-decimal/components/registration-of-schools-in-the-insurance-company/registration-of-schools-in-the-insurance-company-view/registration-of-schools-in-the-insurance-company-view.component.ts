
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { RegistrationOfSchoolsInTheInsuranceCompany } from 'app/shared/models/registration-of-schools-in-the-insurance-company';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { RegistrationOfSchoolsInTheInsuranceCompanyService } from '../shared/registration-of-schools-in-the-insurance-company.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-registration-of-schools-in-the-insurance-company-view',
  templateUrl: './registration-of-schools-in-the-insurance-company-view.component.html',
  styleUrls: ['./registration-of-schools-in-the-insurance-company-view.component.scss'],
  providers: []
})

export class RegistrationOfSchoolsInTheInsuranceCompanyViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedRegistrationOfSchoolsInTheInsuranceCompany: RegistrationOfSchoolsInTheInsuranceCompany;
  registrationOfSchoolsInTheInsuranceCompanyForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedRegistrationOfSchoolsInTheInsuranceCompanyDialog: any,
    @Optional() public dialogRef: MatDialogRef<RegistrationOfSchoolsInTheInsuranceCompanyViewComponent>,
    public registrationOfSchoolsInTheInsuranceCompanyService: RegistrationOfSchoolsInTheInsuranceCompanyService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedRegistrationOfSchoolsInTheInsuranceCompany = this.selectedRegistrationOfSchoolsInTheInsuranceCompanyDialog.data || this.selectedRegistrationOfSchoolsInTheInsuranceCompany;

    

    this.registrationOfSchoolsInTheInsuranceCompanyForm = this.formBuilder.group({
      
  companyCode : [this.selectedRegistrationOfSchoolsInTheInsuranceCompany.companyCode],
  companyname : [this.selectedRegistrationOfSchoolsInTheInsuranceCompany.companyname],
  dateOfRegistration : [this.selectedRegistrationOfSchoolsInTheInsuranceCompany.dateOfRegistration],
  amountOfInsurance : [this.selectedRegistrationOfSchoolsInTheInsuranceCompany.amountOfInsurance],
  buildingNumber : [this.selectedRegistrationOfSchoolsInTheInsuranceCompany.buildingNumber],
  annexNumber : [this.selectedRegistrationOfSchoolsInTheInsuranceCompany.annexNumber],
  numberOfFloors : [this.selectedRegistrationOfSchoolsInTheInsuranceCompany.numberOfFloors],
  modelCode : [this.selectedRegistrationOfSchoolsInTheInsuranceCompany.modelCode],
  classroomNumber : [this.selectedRegistrationOfSchoolsInTheInsuranceCompany.classroomNumber]
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
    return this.registrationOfSchoolsInTheInsuranceCompanyForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.registrationOfSchoolsInTheInsuranceCompanyForm.controls)) {
      this.registrationOfSchoolsInTheInsuranceCompanyForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

