
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LinkThePlanSourceToTheBudgetSource } from 'app/shared/models/link-the-plan-source-to-the-budget-source';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { LinkThePlanSourceToTheBudgetSourceService } from '../shared/link-the-plan-source-to-the-budget-source.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-link-the-plan-source-to-the-budget-source-new',
  templateUrl: './link-the-plan-source-to-the-budget-source-new.component.html',
  styleUrls: ['./link-the-plan-source-to-the-budget-source-new.component.scss'],
  providers: [
    ]
})

export class LinkThePlanSourceToTheBudgetSourceNewComponent extends AppBaseComponent implements OnInit {
  linkThePlanSourceToTheBudgetSourceForm: FormGroup;
  @Input() selectedLinkThePlanSourceToTheBudgetSource: LinkThePlanSourceToTheBudgetSource;
  errorMessages: FormControlError[] = [
        
  ];

  private planFundingSourceCodesService: LookupService;
private budgetFundingSourceCodesService: LookupService;

  
fundingSourceCodeSelectOptions: MaterialSelectOptions;
budgetSourceCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('fundingSourceCode', { static: true }) FundingSourceCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('budgetSourceCode', { static: true }) BudgetSourceCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<LinkThePlanSourceToTheBudgetSourceNewComponent>,
    public linkThePlanSourceToTheBudgetSourceService: LinkThePlanSourceToTheBudgetSourceService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedLinkThePlanSourceToTheBudgetSource = new LinkThePlanSourceToTheBudgetSource();

    
	this.fundingSourceCodeSelectOptions = new MaterialSelectOptions({
	 data: this.planFundingSourceCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' رمز مصدر التمويل',
	});

	this.budgetSourceCodeSelectOptions = new MaterialSelectOptions({
	 data: this.budgetFundingSourceCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' رمز مصدر الموازنة',
	});


    this.linkThePlanSourceToTheBudgetSourceForm = this.formBuilder.group({
     
  id : [0],
  yearPlan : [this.selectedLinkThePlanSourceToTheBudgetSource.yearPlan, [ Validators.required ]],
  fundingSourceCode : [this.selectedLinkThePlanSourceToTheBudgetSource.fundingSourceCode, [ Validators.required ]],
  budgetSourceCode : [this.selectedLinkThePlanSourceToTheBudgetSource.budgetSourceCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.linkThePlanSourceToTheBudgetSourceService.create(this.linkThePlanSourceToTheBudgetSourceForm.value)
        .pipe(switchMap(x => {
			return this.linkThePlanSourceToTheBudgetSourceService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.linkThePlanSourceToTheBudgetSourceForm.get(name);
    }

  initializeLookupServices() {
    this.planFundingSourceCodesService = new LookupService('planfundingsourcecodes', this.http);
this.budgetFundingSourceCodesService = new LookupService('budgetfundingsourcecodes', this.http);
  }
 }
