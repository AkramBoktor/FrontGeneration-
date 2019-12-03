
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { ContributionOfTheFundForPreviousYearsG } from 'app/shared/models/contribution-of-the-fund-for-previous-years-g';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { ContributionOfTheFundForPreviousYearsGService } from '../shared/contribution-of-the-fund-for-previous-years-g.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-contribution-of-the-fund-for-previous-years-g-view',
  templateUrl: './contribution-of-the-fund-for-previous-years-g-view.component.html',
  styleUrls: ['./contribution-of-the-fund-for-previous-years-g-view.component.scss'],
  providers: []
})

export class ContributionOfTheFundForPreviousYearsGViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedContributionOfTheFundForPreviousYearsG: ContributionOfTheFundForPreviousYearsG;
  contributionOfTheFundForPreviousYearsGForm: FormGroup;

  private subscriptionStatusService: LookupService;

  
subscriptionStatusSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedContributionOfTheFundForPreviousYearsGDialog: any,
    @Optional() public dialogRef: MatDialogRef<ContributionOfTheFundForPreviousYearsGViewComponent>,
    public contributionOfTheFundForPreviousYearsGService: ContributionOfTheFundForPreviousYearsGService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedContributionOfTheFundForPreviousYearsG = this.selectedContributionOfTheFundForPreviousYearsGDialog.data || this.selectedContributionOfTheFundForPreviousYearsG;

    
	this.subscriptionStatusSelectOptions = new MaterialSelectOptions({
	 data: this.subscriptionStatusService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حالة الاشتراك',
	});


    this.contributionOfTheFundForPreviousYearsGForm = this.formBuilder.group({
      
  employeeCode : [this.selectedContributionOfTheFundForPreviousYearsG.employeeCode],
  joinDate : [this.selectedContributionOfTheFundForPreviousYearsG.joinDate],
  membershipNumber : [this.selectedContributionOfTheFundForPreviousYearsG.membershipNumber],
  subscriptionYear : [this.selectedContributionOfTheFundForPreviousYearsG.subscriptionYear],
  registrationPrice : [this.selectedContributionOfTheFundForPreviousYearsG.registrationPrice],
  subscriptionStatus : [this.selectedContributionOfTheFundForPreviousYearsG.subscriptionStatus]
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
    return this.contributionOfTheFundForPreviousYearsGForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.contributionOfTheFundForPreviousYearsGForm.controls)) {
      this.contributionOfTheFundForPreviousYearsGForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.subscriptionStatusService = new LookupService('subscriptionstatuses', this.http);
  }
}

