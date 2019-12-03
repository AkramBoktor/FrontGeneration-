
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { ContributionOfTheFundForPreviousYearsB } from 'app/shared/models/contribution-of-the-fund-for-previous-years-b';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ContributionOfTheFundForPreviousYearsBService } from '../shared/contribution-of-the-fund-for-previous-years-b.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-contribution-of-the-fund-for-previous-years-b-new',
  templateUrl: './contribution-of-the-fund-for-previous-years-b-new.component.html',
  styleUrls: ['./contribution-of-the-fund-for-previous-years-b-new.component.scss'],
  providers: [
    ]
})

export class ContributionOfTheFundForPreviousYearsBNewComponent extends AppBaseComponent implements OnInit {
  contributionOfTheFundForPreviousYearsBForm: FormGroup;
  @Input() selectedContributionOfTheFundForPreviousYearsB: ContributionOfTheFundForPreviousYearsB;
  errorMessages: FormControlError[] = [
        
  ];

  private subscriptionStatusService: LookupService;

  
subscriptionStatusSelectOptions: MaterialSelectOptions;

  
	@ViewChild('subscriptionStatus', { static: true }) SubscriptionStatusSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<ContributionOfTheFundForPreviousYearsBNewComponent>,
    public contributionOfTheFundForPreviousYearsBService: ContributionOfTheFundForPreviousYearsBService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedContributionOfTheFundForPreviousYearsB = new ContributionOfTheFundForPreviousYearsB();

    
	this.subscriptionStatusSelectOptions = new MaterialSelectOptions({
	 data: this.subscriptionStatusService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حالة الاشتراك',
	});


    this.contributionOfTheFundForPreviousYearsBForm = this.formBuilder.group({
     
  id : [0],
  registrationPrice : [this.selectedContributionOfTheFundForPreviousYearsB.registrationPrice, [ Validators.required ]],
  subscriptionYear : [this.selectedContributionOfTheFundForPreviousYearsB.subscriptionYear, [ Validators.required ]],
  membershipNumber : [this.selectedContributionOfTheFundForPreviousYearsB.membershipNumber, [ ]],
  joinDate : [this.selectedContributionOfTheFundForPreviousYearsB.joinDate, [ ]],
  employeeCode : [this.selectedContributionOfTheFundForPreviousYearsB.employeeCode, [ Validators.required ]],
  subscriptionStatus : [this.selectedContributionOfTheFundForPreviousYearsB.subscriptionStatus, [ ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.contributionOfTheFundForPreviousYearsBService.create(this.contributionOfTheFundForPreviousYearsBForm.value)
        .pipe(switchMap(x => {
			return this.contributionOfTheFundForPreviousYearsBService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.contributionOfTheFundForPreviousYearsBForm.get(name);
    }

  initializeLookupServices() {
    this.subscriptionStatusService = new LookupService('subscriptionstatuses', this.http);
  }
 }
