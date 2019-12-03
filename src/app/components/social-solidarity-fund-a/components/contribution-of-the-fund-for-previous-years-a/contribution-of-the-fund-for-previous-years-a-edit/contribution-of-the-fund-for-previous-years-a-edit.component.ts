
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { ContributionOfTheFundForPreviousYearsA } from 'app/shared/models/contribution-of-the-fund-for-previous-years-a';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { ContributionOfTheFundForPreviousYearsAService } from '../shared/contribution-of-the-fund-for-previous-years-a.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-contribution-of-the-fund-for-previous-years-a-edit',
  templateUrl: './contribution-of-the-fund-for-previous-years-a-edit.component.html',
  styleUrls: ['./contribution-of-the-fund-for-previous-years-a-edit.component.scss'],
  providers: []
})

export class ContributionOfTheFundForPreviousYearsAEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedContributionOfTheFundForPreviousYearsA: ContributionOfTheFundForPreviousYearsA;
  contributionOfTheFundForPreviousYearsAForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedContributionOfTheFundForPreviousYearsADialog: any,
    @Optional() public dialogRef: MatDialogRef<ContributionOfTheFundForPreviousYearsAEditComponent>,
    public contributionOfTheFundForPreviousYearsAService: ContributionOfTheFundForPreviousYearsAService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedContributionOfTheFundForPreviousYearsA = new ContributionOfTheFundForPreviousYearsA();
    this.selectedContributionOfTheFundForPreviousYearsA = this.selectedContributionOfTheFundForPreviousYearsADialog.data || this.selectedContributionOfTheFundForPreviousYearsA;

    

    this.contributionOfTheFundForPreviousYearsAForm = this.formBuilder.group({
      
  id : [this.selectedContributionOfTheFundForPreviousYearsA.id],
  employeeCode : [this.selectedContributionOfTheFundForPreviousYearsA.employeeCode, [ Validators.required ]],
  subscriptionStatus : [this.selectedContributionOfTheFundForPreviousYearsA.subscriptionStatus, [ ]],
  joinDate : [this.selectedContributionOfTheFundForPreviousYearsA.joinDate, [ ]],
  membershipNumber : [this.selectedContributionOfTheFundForPreviousYearsA.membershipNumber, [ Validators.required ]],
  subscriptionYear : [this.selectedContributionOfTheFundForPreviousYearsA.subscriptionYear, [ Validators.required ]],
  registrationPrice : [this.selectedContributionOfTheFundForPreviousYearsA.registrationPrice, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.contributionOfTheFundForPreviousYearsAService.update(this.contributionOfTheFundForPreviousYearsAForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.contributionOfTheFundForPreviousYearsAService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.contributionOfTheFundForPreviousYearsAForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
