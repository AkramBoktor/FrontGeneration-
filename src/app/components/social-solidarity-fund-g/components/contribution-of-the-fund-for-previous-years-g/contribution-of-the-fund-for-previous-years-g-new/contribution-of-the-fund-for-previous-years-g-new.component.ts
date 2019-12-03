
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { ContributionOfTheFundForPreviousYearsG } from 'app/shared/models/contribution-of-the-fund-for-previous-years-g';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ContributionOfTheFundForPreviousYearsGService } from '../shared/contribution-of-the-fund-for-previous-years-g.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-contribution-of-the-fund-for-previous-years-g-new',
  templateUrl: './contribution-of-the-fund-for-previous-years-g-new.component.html',
  styleUrls: ['./contribution-of-the-fund-for-previous-years-g-new.component.scss'],
  providers: [
    ]
})

export class ContributionOfTheFundForPreviousYearsGNewComponent extends AppBaseComponent implements OnInit {
  contributionOfTheFundForPreviousYearsGForm: FormGroup;
  @Input() selectedContributionOfTheFundForPreviousYearsG: ContributionOfTheFundForPreviousYearsG;
  errorMessages: FormControlError[] = [
        
  ];

  private subscriptionStatusService: LookupService;

  
subscriptionStatusSelectOptions: MaterialSelectOptions;

  
	@ViewChild('subscriptionStatus', { static: true }) SubscriptionStatusSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<ContributionOfTheFundForPreviousYearsGNewComponent>,
    public contributionOfTheFundForPreviousYearsGService: ContributionOfTheFundForPreviousYearsGService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedContributionOfTheFundForPreviousYearsG = new ContributionOfTheFundForPreviousYearsG();

    
	this.subscriptionStatusSelectOptions = new MaterialSelectOptions({
	 data: this.subscriptionStatusService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حالة الاشتراك',
	});


    this.contributionOfTheFundForPreviousYearsGForm = this.formBuilder.group({
     
  id : [0],
  employeeCode : [this.selectedContributionOfTheFundForPreviousYearsG.employeeCode, [ Validators.required ]],
  joinDate : [this.selectedContributionOfTheFundForPreviousYearsG.joinDate, [ ]],
  membershipNumber : [this.selectedContributionOfTheFundForPreviousYearsG.membershipNumber, [ ]],
  subscriptionYear : [this.selectedContributionOfTheFundForPreviousYearsG.subscriptionYear, [ Validators.required ]],
  registrationPrice : [this.selectedContributionOfTheFundForPreviousYearsG.registrationPrice, [ Validators.required ]],
  subscriptionStatus : [this.selectedContributionOfTheFundForPreviousYearsG.subscriptionStatus, [ ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.contributionOfTheFundForPreviousYearsGService.create(this.contributionOfTheFundForPreviousYearsGForm.value)
        .pipe(switchMap(x => {
			return this.contributionOfTheFundForPreviousYearsGService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.contributionOfTheFundForPreviousYearsGForm.get(name);
    }

  initializeLookupServices() {
    this.subscriptionStatusService = new LookupService('subscriptionstatuses', this.http);
  }
 }
