
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { SocialWelfareForTheHeirsOfAnEmployee } from 'app/shared/models/social-welfare-for-the-heirs-of-an-employee';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { SocialWelfareForTheHeirsOfAnEmployeeService } from '../shared/social-welfare-for-the-heirs-of-an-employee.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-social-welfare-for-the-heirs-of-an-employee-view',
  templateUrl: './social-welfare-for-the-heirs-of-an-employee-view.component.html',
  styleUrls: ['./social-welfare-for-the-heirs-of-an-employee-view.component.scss'],
  providers: []
})

export class SocialWelfareForTheHeirsOfAnEmployeeViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedSocialWelfareForTheHeirsOfAnEmployee: SocialWelfareForTheHeirsOfAnEmployee;
  socialWelfareForTheHeirsOfAnEmployeeForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedSocialWelfareForTheHeirsOfAnEmployeeDialog: any,
    @Optional() public dialogRef: MatDialogRef<SocialWelfareForTheHeirsOfAnEmployeeViewComponent>,
    public socialWelfareForTheHeirsOfAnEmployeeService: SocialWelfareForTheHeirsOfAnEmployeeService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSocialWelfareForTheHeirsOfAnEmployee = this.selectedSocialWelfareForTheHeirsOfAnEmployeeDialog.data || this.selectedSocialWelfareForTheHeirsOfAnEmployee;

    

    this.socialWelfareForTheHeirsOfAnEmployeeForm = this.formBuilder.group({
      
  checkNumber : [this.selectedSocialWelfareForTheHeirsOfAnEmployee.checkNumber],
  checkDate : [this.selectedSocialWelfareForTheHeirsOfAnEmployee.checkDate],
  checkAmount : [this.selectedSocialWelfareForTheHeirsOfAnEmployee.checkAmount],
  employeeCode : [this.selectedSocialWelfareForTheHeirsOfAnEmployee.employeeCode],
  heirCheckNo : [this.selectedSocialWelfareForTheHeirsOfAnEmployee.heirCheckNo],
  heirCheckDate : [this.selectedSocialWelfareForTheHeirsOfAnEmployee.heirCheckDate],
  heirName : [this.selectedSocialWelfareForTheHeirsOfAnEmployee.heirName],
  amount : [this.selectedSocialWelfareForTheHeirsOfAnEmployee.amount]
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
    return this.socialWelfareForTheHeirsOfAnEmployeeForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.socialWelfareForTheHeirsOfAnEmployeeForm.controls)) {
      this.socialWelfareForTheHeirsOfAnEmployeeForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

