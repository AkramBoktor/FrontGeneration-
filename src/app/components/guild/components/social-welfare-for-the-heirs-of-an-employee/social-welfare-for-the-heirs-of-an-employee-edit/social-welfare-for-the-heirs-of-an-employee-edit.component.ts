
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { SocialWelfareForTheHeirsOfAnEmployee } from 'app/shared/models/social-welfare-for-the-heirs-of-an-employee';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { SocialWelfareForTheHeirsOfAnEmployeeService } from '../shared/social-welfare-for-the-heirs-of-an-employee.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-social-welfare-for-the-heirs-of-an-employee-edit',
  templateUrl: './social-welfare-for-the-heirs-of-an-employee-edit.component.html',
  styleUrls: ['./social-welfare-for-the-heirs-of-an-employee-edit.component.scss'],
  providers: []
})

export class SocialWelfareForTheHeirsOfAnEmployeeEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedSocialWelfareForTheHeirsOfAnEmployee: SocialWelfareForTheHeirsOfAnEmployee;
  socialWelfareForTheHeirsOfAnEmployeeForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedSocialWelfareForTheHeirsOfAnEmployeeDialog: any,
    @Optional() public dialogRef: MatDialogRef<SocialWelfareForTheHeirsOfAnEmployeeEditComponent>,
    public socialWelfareForTheHeirsOfAnEmployeeService: SocialWelfareForTheHeirsOfAnEmployeeService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSocialWelfareForTheHeirsOfAnEmployee = new SocialWelfareForTheHeirsOfAnEmployee();
    this.selectedSocialWelfareForTheHeirsOfAnEmployee = this.selectedSocialWelfareForTheHeirsOfAnEmployeeDialog.data || this.selectedSocialWelfareForTheHeirsOfAnEmployee;

    

    this.socialWelfareForTheHeirsOfAnEmployeeForm = this.formBuilder.group({
      
  id : [this.selectedSocialWelfareForTheHeirsOfAnEmployee.id],
  checkNumber : [this.selectedSocialWelfareForTheHeirsOfAnEmployee.checkNumber, [ Validators.required ]],
  checkDate : [this.selectedSocialWelfareForTheHeirsOfAnEmployee.checkDate, [ Validators.required ]],
  checkAmount : [this.selectedSocialWelfareForTheHeirsOfAnEmployee.checkAmount, [ Validators.required ]],
  employeeCode : [this.selectedSocialWelfareForTheHeirsOfAnEmployee.employeeCode, [ Validators.required ]],
  heirCheckNo : [this.selectedSocialWelfareForTheHeirsOfAnEmployee.heirCheckNo, [ Validators.required ]],
  heirCheckDate : [this.selectedSocialWelfareForTheHeirsOfAnEmployee.heirCheckDate, [ Validators.required ]],
  heirName : [this.selectedSocialWelfareForTheHeirsOfAnEmployee.heirName, [ Validators.required ]],
  amount : [this.selectedSocialWelfareForTheHeirsOfAnEmployee.amount, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.socialWelfareForTheHeirsOfAnEmployeeService.update(this.socialWelfareForTheHeirsOfAnEmployeeForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.socialWelfareForTheHeirsOfAnEmployeeService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.socialWelfareForTheHeirsOfAnEmployeeForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
