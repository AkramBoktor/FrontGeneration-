
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { ContributionOfTheFundForPreviousYearsB } from 'app/shared/models/contribution-of-the-fund-for-previous-years-b';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { ContributionOfTheFundForPreviousYearsBService } from '../shared/contribution-of-the-fund-for-previous-years-b.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-contribution-of-the-fund-for-previous-years-b-view',
  templateUrl: './contribution-of-the-fund-for-previous-years-b-view.component.html',
  styleUrls: ['./contribution-of-the-fund-for-previous-years-b-view.component.scss'],
  providers: []
})

export class ContributionOfTheFundForPreviousYearsBViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedContributionOfTheFundForPreviousYearsB: ContributionOfTheFundForPreviousYearsB;
  contributionOfTheFundForPreviousYearsBForm: FormGroup;

  private subscriptionStatusService: LookupService;

  
subscriptionStatusSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedContributionOfTheFundForPreviousYearsBDialog: any,
    @Optional() public dialogRef: MatDialogRef<ContributionOfTheFundForPreviousYearsBViewComponent>,
    public contributionOfTheFundForPreviousYearsBService: ContributionOfTheFundForPreviousYearsBService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedContributionOfTheFundForPreviousYearsB = this.selectedContributionOfTheFundForPreviousYearsBDialog.data || this.selectedContributionOfTheFundForPreviousYearsB;

    
	this.subscriptionStatusSelectOptions = new MaterialSelectOptions({
	 data: this.subscriptionStatusService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حالة الاشتراك',
	});


    this.contributionOfTheFundForPreviousYearsBForm = this.formBuilder.group({
      
  registrationPrice : [this.selectedContributionOfTheFundForPreviousYearsB.registrationPrice],
  subscriptionYear : [this.selectedContributionOfTheFundForPreviousYearsB.subscriptionYear],
  membershipNumber : [this.selectedContributionOfTheFundForPreviousYearsB.membershipNumber],
  joinDate : [this.selectedContributionOfTheFundForPreviousYearsB.joinDate],
  employeeCode : [this.selectedContributionOfTheFundForPreviousYearsB.employeeCode],
  subscriptionStatus : [this.selectedContributionOfTheFundForPreviousYearsB.subscriptionStatus]
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
    return this.contributionOfTheFundForPreviousYearsBForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.contributionOfTheFundForPreviousYearsBForm.controls)) {
      this.contributionOfTheFundForPreviousYearsBForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.subscriptionStatusService = new LookupService('subscriptionstatuses', this.http);
  }
}

