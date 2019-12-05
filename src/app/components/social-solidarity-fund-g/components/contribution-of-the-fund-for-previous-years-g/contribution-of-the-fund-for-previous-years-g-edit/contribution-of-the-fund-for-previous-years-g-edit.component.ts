
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { ContributionOfTheFundForPreviousYearsG } from 'app/shared/models/contribution-of-the-fund-for-previous-years-g';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { ContributionOfTheFundForPreviousYearsGService } from '../shared/contribution-of-the-fund-for-previous-years-g.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-contribution-of-the-fund-for-previous-years-g-edit',
  templateUrl: './contribution-of-the-fund-for-previous-years-g-edit.component.html',
  styleUrls: ['./contribution-of-the-fund-for-previous-years-g-edit.component.scss'],
  providers: []
})

export class ContributionOfTheFundForPreviousYearsGEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedContributionOfTheFundForPreviousYearsG: ContributionOfTheFundForPreviousYearsG;
  contributionOfTheFundForPreviousYearsGForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedContributionOfTheFundForPreviousYearsGDialog: any,
    @Optional() public dialogRef: MatDialogRef<ContributionOfTheFundForPreviousYearsGEditComponent>,
    public contributionOfTheFundForPreviousYearsGService: ContributionOfTheFundForPreviousYearsGService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedContributionOfTheFundForPreviousYearsG = new ContributionOfTheFundForPreviousYearsG();
    this.selectedContributionOfTheFundForPreviousYearsG = this.selectedContributionOfTheFundForPreviousYearsGDialog.data || this.selectedContributionOfTheFundForPreviousYearsG;

    

    this.contributionOfTheFundForPreviousYearsGForm = this.formBuilder.group({
      
  id : [this.selectedContributionOfTheFundForPreviousYearsG.id],
  joinDate : [this.selectedContributionOfTheFundForPreviousYearsG.joinDate, [ ]],
  subscriptionYear : [this.selectedContributionOfTheFundForPreviousYearsG.subscriptionYear, [ Validators.required ]],
  registrationPrice : [this.selectedContributionOfTheFundForPreviousYearsG.registrationPrice, [ Validators.required ]],
  subscriptionStatus : [this.selectedContributionOfTheFundForPreviousYearsG.subscriptionStatus, [ ]],
  employeeCode : [this.selectedContributionOfTheFundForPreviousYearsG.employeeCode, [ Validators.required ]],
  membershipNumber : [this.selectedContributionOfTheFundForPreviousYearsG.membershipNumber, [ ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.contributionOfTheFundForPreviousYearsGService.update(this.contributionOfTheFundForPreviousYearsGForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.contributionOfTheFundForPreviousYearsGService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.contributionOfTheFundForPreviousYearsGForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
