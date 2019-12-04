
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { ContributionOfTheFundForPreviousYearsB } from 'app/shared/models/contribution-of-the-fund-for-previous-years-b';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { ContributionOfTheFundForPreviousYearsBService } from '../shared/contribution-of-the-fund-for-previous-years-b.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-contribution-of-the-fund-for-previous-years-b-edit',
  templateUrl: './contribution-of-the-fund-for-previous-years-b-edit.component.html',
  styleUrls: ['./contribution-of-the-fund-for-previous-years-b-edit.component.scss'],
  providers: []
})

export class ContributionOfTheFundForPreviousYearsBEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedContributionOfTheFundForPreviousYearsB: ContributionOfTheFundForPreviousYearsB;
  contributionOfTheFundForPreviousYearsBForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedContributionOfTheFundForPreviousYearsBDialog: any,
    @Optional() public dialogRef: MatDialogRef<ContributionOfTheFundForPreviousYearsBEditComponent>,
    public contributionOfTheFundForPreviousYearsBService: ContributionOfTheFundForPreviousYearsBService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedContributionOfTheFundForPreviousYearsB = new ContributionOfTheFundForPreviousYearsB();
    this.selectedContributionOfTheFundForPreviousYearsB = this.selectedContributionOfTheFundForPreviousYearsBDialog.data || this.selectedContributionOfTheFundForPreviousYearsB;

    

    this.contributionOfTheFundForPreviousYearsBForm = this.formBuilder.group({
      
  id : [this.selectedContributionOfTheFundForPreviousYearsB.id],
  registrationPrice : [this.selectedContributionOfTheFundForPreviousYearsB.registrationPrice, [ Validators.required ]],
  subscriptionYear : [this.selectedContributionOfTheFundForPreviousYearsB.subscriptionYear, [ Validators.required ]],
  joinDate : [this.selectedContributionOfTheFundForPreviousYearsB.joinDate, [ ]],
  subscriptionStatus : [this.selectedContributionOfTheFundForPreviousYearsB.subscriptionStatus, [ ]],
  employeeCode : [this.selectedContributionOfTheFundForPreviousYearsB.employeeCode, [ Validators.required ]],
  membershipNumber : [this.selectedContributionOfTheFundForPreviousYearsB.membershipNumber, [ ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.contributionOfTheFundForPreviousYearsBService.update(this.contributionOfTheFundForPreviousYearsBForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.contributionOfTheFundForPreviousYearsBService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.contributionOfTheFundForPreviousYearsBForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
