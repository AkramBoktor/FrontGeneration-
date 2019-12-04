
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { ContributionOfTheFundForPreviousYearsA } from 'app/shared/models/contribution-of-the-fund-for-previous-years-a';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { ContributionOfTheFundForPreviousYearsAService } from '../shared/contribution-of-the-fund-for-previous-years-a.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-contribution-of-the-fund-for-previous-years-a-view',
  templateUrl: './contribution-of-the-fund-for-previous-years-a-view.component.html',
  styleUrls: ['./contribution-of-the-fund-for-previous-years-a-view.component.scss'],
  providers: []
})

export class ContributionOfTheFundForPreviousYearsAViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedContributionOfTheFundForPreviousYearsA: ContributionOfTheFundForPreviousYearsA;
  contributionOfTheFundForPreviousYearsAForm: FormGroup;

  private subscriptionStatusService: LookupService;

  
subscriptionStatusSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedContributionOfTheFundForPreviousYearsADialog: any,
    @Optional() public dialogRef: MatDialogRef<ContributionOfTheFundForPreviousYearsAViewComponent>,
    public contributionOfTheFundForPreviousYearsAService: ContributionOfTheFundForPreviousYearsAService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedContributionOfTheFundForPreviousYearsA = this.selectedContributionOfTheFundForPreviousYearsADialog.data || this.selectedContributionOfTheFundForPreviousYearsA;

    
	this.subscriptionStatusSelectOptions = new MaterialSelectOptions({
	 data: this.subscriptionStatusService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حالة الاشتراك',
	});


    this.contributionOfTheFundForPreviousYearsAForm = this.formBuilder.group({
      
  employeeCode : [this.selectedContributionOfTheFundForPreviousYearsA.employeeCode],
  joinDate : [this.selectedContributionOfTheFundForPreviousYearsA.joinDate],
  membershipNumber : [this.selectedContributionOfTheFundForPreviousYearsA.membershipNumber],
  subscriptionYear : [this.selectedContributionOfTheFundForPreviousYearsA.subscriptionYear],
  registrationPrice : [this.selectedContributionOfTheFundForPreviousYearsA.registrationPrice],
  subscriptionStatus : [this.selectedContributionOfTheFundForPreviousYearsA.subscriptionStatus]
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
    return this.contributionOfTheFundForPreviousYearsAForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.contributionOfTheFundForPreviousYearsAForm.controls)) {
      this.contributionOfTheFundForPreviousYearsAForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.subscriptionStatusService = new LookupService('subscriptionstatuses', this.http);
  }
}

