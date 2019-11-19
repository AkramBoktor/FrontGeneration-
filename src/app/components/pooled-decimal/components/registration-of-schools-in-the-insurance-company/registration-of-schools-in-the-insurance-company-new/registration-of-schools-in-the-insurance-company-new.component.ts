
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { RegistrationOfSchoolsInTheInsuranceCompany } from 'app/shared/models/registration-of-schools-in-the-insurance-company';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { RegistrationOfSchoolsInTheInsuranceCompanyService } from '../shared/registration-of-schools-in-the-insurance-company.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-registration-of-schools-in-the-insurance-company-new',
  templateUrl: './registration-of-schools-in-the-insurance-company-new.component.html',
  styleUrls: ['./registration-of-schools-in-the-insurance-company-new.component.scss'],
  providers: [
    ]
})

export class RegistrationOfSchoolsInTheInsuranceCompanyNewComponent extends AppBaseComponent implements OnInit {
  registrationOfSchoolsInTheInsuranceCompanyForm: FormGroup;
  @Input() selectedRegistrationOfSchoolsInTheInsuranceCompany: RegistrationOfSchoolsInTheInsuranceCompany;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<RegistrationOfSchoolsInTheInsuranceCompanyNewComponent>,
    public registrationOfSchoolsInTheInsuranceCompanyService: RegistrationOfSchoolsInTheInsuranceCompanyService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedRegistrationOfSchoolsInTheInsuranceCompany = new RegistrationOfSchoolsInTheInsuranceCompany();

    

    this.registrationOfSchoolsInTheInsuranceCompanyForm = this.formBuilder.group({
     
  id : [0],
  companyCode : [this.selectedRegistrationOfSchoolsInTheInsuranceCompany.companyCode, [ Validators.required ]],
  companyname : [this.selectedRegistrationOfSchoolsInTheInsuranceCompany.companyname, [ ]],
  dateOfRegistration : [this.selectedRegistrationOfSchoolsInTheInsuranceCompany.dateOfRegistration, [ Validators.required ]],
  amountOfInsurance : [this.selectedRegistrationOfSchoolsInTheInsuranceCompany.amountOfInsurance, [ Validators.required ]],
  buildingNumber : [this.selectedRegistrationOfSchoolsInTheInsuranceCompany.buildingNumber, [ Validators.required ]],
  annexNumber : [this.selectedRegistrationOfSchoolsInTheInsuranceCompany.annexNumber, [ Validators.required ]],
  numberOfFloors : [this.selectedRegistrationOfSchoolsInTheInsuranceCompany.numberOfFloors, [ Validators.required ]],
  modelCode : [this.selectedRegistrationOfSchoolsInTheInsuranceCompany.modelCode, [ Validators.required ]],
  classroomNumber : [this.selectedRegistrationOfSchoolsInTheInsuranceCompany.classroomNumber, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.registrationOfSchoolsInTheInsuranceCompanyService.create(this.registrationOfSchoolsInTheInsuranceCompanyForm.value)
        .pipe(switchMap(x => {
			return this.registrationOfSchoolsInTheInsuranceCompanyService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.registrationOfSchoolsInTheInsuranceCompanyForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
