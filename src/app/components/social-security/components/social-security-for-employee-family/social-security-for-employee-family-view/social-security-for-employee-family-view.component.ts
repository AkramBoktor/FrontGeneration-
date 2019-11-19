
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { SocialSecurityForEmployeeFamily } from 'app/shared/models/social-security-for-employee-family';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { SocialSecurityForEmployeeFamilyService } from '../shared/social-security-for-employee-family.service';

@Component({
  selector: 'app-social-security-for-employee-family-view',
  templateUrl: './social-security-for-employee-family-view.component.html',
  styleUrls: ['./social-security-for-employee-family-view.component.scss'],
  providers: []
})

export class SocialSecurityForEmployeeFamilyViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedSocialSecurityForEmployeeFamily: SocialSecurityForEmployeeFamily;
  socialSecurityForEmployeeFamilyForm: FormGroup;

  private relationshipTypesService: LookupService;

  
relationshipSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedSocialSecurityForEmployeeFamilyDialog: any,
    @Optional() public dialogRef: MatDialogRef<SocialSecurityForEmployeeFamilyViewComponent>,
    public socialSecurityForEmployeeFamilyService: SocialSecurityForEmployeeFamilyService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSocialSecurityForEmployeeFamily = this.selectedSocialSecurityForEmployeeFamilyDialog.data || this.selectedSocialSecurityForEmployeeFamily;

    
	this.relationshipSelectOptions = new MaterialSelectOptions({
	 data: this.relationshipTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الصفة',
	});


    this.socialSecurityForEmployeeFamilyForm = this.formBuilder.group({
      
  individualSerial : [this.selectedSocialSecurityForEmployeeFamily.individualSerial],
  employeeName : [this.selectedSocialSecurityForEmployeeFamily.employeeName],
  employeeCode : [this.selectedSocialSecurityForEmployeeFamily.employeeCode],
  insuranceNumber : [this.selectedSocialSecurityForEmployeeFamily.insuranceNumber],
  relationship : [this.selectedSocialSecurityForEmployeeFamily.relationship]
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
          
	{
	 errorName: 'min',
	 errorMessage: 'لا يوجد مسلسل صفر'
	},
	{
	 errorName: 'minLength',
	 errorMessage: 'لا يوجد مسلسل يساوي صفر'
	},
	{
	 errorName: 'minLength',
	 errorMessage: 'لا يوجد مسلسل يساوي صفر'
	}
        ];
    return ValidatorFunctions.getErrorMessage(formCtrl, errorMessages);
   }

  getControls(name: string) {
    return this.socialSecurityForEmployeeFamilyForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.socialSecurityForEmployeeFamilyForm.controls)) {
      this.socialSecurityForEmployeeFamilyForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.relationshipTypesService = new LookupService('relationshiptypes', this.http);
  }
}

