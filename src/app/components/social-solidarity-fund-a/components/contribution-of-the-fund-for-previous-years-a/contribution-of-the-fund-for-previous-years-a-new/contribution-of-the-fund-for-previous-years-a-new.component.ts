
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { ContributionOfTheFundForPreviousYearsA } from 'app/shared/models/contribution-of-the-fund-for-previous-years-a';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ContributionOfTheFundForPreviousYearsAService } from '../shared/contribution-of-the-fund-for-previous-years-a.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-contribution-of-the-fund-for-previous-years-a-new',
  templateUrl: './contribution-of-the-fund-for-previous-years-a-new.component.html',
  styleUrls: ['./contribution-of-the-fund-for-previous-years-a-new.component.scss'],
  providers: [
    ]
})

export class ContributionOfTheFundForPreviousYearsANewComponent extends AppBaseComponent implements OnInit {
  contributionOfTheFundForPreviousYearsAForm: FormGroup;
  @Input() selectedContributionOfTheFundForPreviousYearsA: ContributionOfTheFundForPreviousYearsA;
  errorMessages: FormControlError[] = [
        
  ];

  private subscriptionStatusService: LookupService;

  
subscriptionStatusSelectOptions: MaterialSelectOptions;

  
	@ViewChild('subscriptionStatus', { static: true }) SubscriptionStatusSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<ContributionOfTheFundForPreviousYearsANewComponent>,
    public contributionOfTheFundForPreviousYearsAService: ContributionOfTheFundForPreviousYearsAService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedContributionOfTheFundForPreviousYearsA = new ContributionOfTheFundForPreviousYearsA();

    
	this.subscriptionStatusSelectOptions = new MaterialSelectOptions({
	 data: this.subscriptionStatusService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حالة الاشتراك',
	});


    this.contributionOfTheFundForPreviousYearsAForm = this.formBuilder.group({
     
  id : [0],
  employeeCode : [this.selectedContributionOfTheFundForPreviousYearsA.employeeCode, [ Validators.required ]],
  joinDate : [this.selectedContributionOfTheFundForPreviousYearsA.joinDate, [ ]],
  membershipNumber : [this.selectedContributionOfTheFundForPreviousYearsA.membershipNumber, [ Validators.required ]],
  subscriptionYear : [this.selectedContributionOfTheFundForPreviousYearsA.subscriptionYear, [ Validators.required ]],
  registrationPrice : [this.selectedContributionOfTheFundForPreviousYearsA.registrationPrice, [ Validators.required ]],
  subscriptionStatus : [this.selectedContributionOfTheFundForPreviousYearsA.subscriptionStatus, [ ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.contributionOfTheFundForPreviousYearsAService.create(this.contributionOfTheFundForPreviousYearsAForm.value)
        .pipe(switchMap(x => {
			return this.contributionOfTheFundForPreviousYearsAService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.contributionOfTheFundForPreviousYearsAForm.get(name);
    }

  initializeLookupServices() {
    this.subscriptionStatusService = new LookupService('subscriptionstatuses', this.http);
  }
 }
