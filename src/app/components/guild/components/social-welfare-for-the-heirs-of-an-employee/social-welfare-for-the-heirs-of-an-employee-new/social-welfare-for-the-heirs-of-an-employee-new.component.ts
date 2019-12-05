
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { SocialWelfareForTheHeirsOfAnEmployee } from 'app/shared/models/social-welfare-for-the-heirs-of-an-employee';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { SocialWelfareForTheHeirsOfAnEmployeeService } from '../shared/social-welfare-for-the-heirs-of-an-employee.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-social-welfare-for-the-heirs-of-an-employee-new',
  templateUrl: './social-welfare-for-the-heirs-of-an-employee-new.component.html',
  styleUrls: ['./social-welfare-for-the-heirs-of-an-employee-new.component.scss'],
  providers: [
    ]
})

export class SocialWelfareForTheHeirsOfAnEmployeeNewComponent extends AppBaseComponent implements OnInit {
  socialWelfareForTheHeirsOfAnEmployeeForm: FormGroup;
  @Input() selectedSocialWelfareForTheHeirsOfAnEmployee: SocialWelfareForTheHeirsOfAnEmployee;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<SocialWelfareForTheHeirsOfAnEmployeeNewComponent>,
    public socialWelfareForTheHeirsOfAnEmployeeService: SocialWelfareForTheHeirsOfAnEmployeeService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSocialWelfareForTheHeirsOfAnEmployee = new SocialWelfareForTheHeirsOfAnEmployee();

    

    this.socialWelfareForTheHeirsOfAnEmployeeForm = this.formBuilder.group({
     
  id : [0],
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
    this.socialWelfareForTheHeirsOfAnEmployeeService.create(this.socialWelfareForTheHeirsOfAnEmployeeForm.value)
        .pipe(switchMap(x => {
			return this.socialWelfareForTheHeirsOfAnEmployeeService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.socialWelfareForTheHeirsOfAnEmployeeForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
