
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { TheSourceOfFundingForAnAnnualPlanProjectComponent } from 'app/shared/models/the-source-of-funding-for-an-annual-plan-project-component';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { TheSourceOfFundingForAnAnnualPlanProjectComponentService } from '../shared/the-source-of-funding-for-an-annual-plan-project-component.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-the-source-of-funding-for-an-annual-plan-project-component-new',
  templateUrl: './the-source-of-funding-for-an-annual-plan-project-component-new.component.html',
  styleUrls: ['./the-source-of-funding-for-an-annual-plan-project-component-new.component.scss'],
  providers: [
    ]
})

export class TheSourceOfFundingForAnAnnualPlanProjectComponentNewComponent extends AppBaseComponent implements OnInit {
  theSourceOfFundingForAnAnnualPlanProjectComponentForm: FormGroup;
  @Input() selectedTheSourceOfFundingForAnAnnualPlanProjectComponent: TheSourceOfFundingForAnAnnualPlanProjectComponent;
  errorMessages: FormControlError[] = [
        
  ];

  private componentCodesService: LookupService;

  
componentCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('componentCode', { static: true }) ComponentCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<TheSourceOfFundingForAnAnnualPlanProjectComponentNewComponent>,
    public theSourceOfFundingForAnAnnualPlanProjectComponentService: TheSourceOfFundingForAnAnnualPlanProjectComponentService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTheSourceOfFundingForAnAnnualPlanProjectComponent = new TheSourceOfFundingForAnAnnualPlanProjectComponent();

    
	this.componentCodeSelectOptions = new MaterialSelectOptions({
	 data: this.componentCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' رمز المكون',
	});


    this.theSourceOfFundingForAnAnnualPlanProjectComponentForm = this.formBuilder.group({
     
  id : [0],
  suggesteValue : [this.selectedTheSourceOfFundingForAnAnnualPlanProjectComponent.suggesteValue, [ Validators.required ]],
  sourceCode : [this.selectedTheSourceOfFundingForAnAnnualPlanProjectComponent.sourceCode, [ Validators.required ]],
  yearPlan : [this.selectedTheSourceOfFundingForAnAnnualPlanProjectComponent.yearPlan, [ Validators.required ]],
  projectPlanCode : [this.selectedTheSourceOfFundingForAnAnnualPlanProjectComponent.projectPlanCode, [ Validators.required ]],
  accreditationAfterAmendment : [this.selectedTheSourceOfFundingForAnAnnualPlanProjectComponent.accreditationAfterAmendment, [ Validators.required ]],
  creditValue : [this.selectedTheSourceOfFundingForAnAnnualPlanProjectComponent.creditValue, [ Validators.required ]],
  componentCode : [this.selectedTheSourceOfFundingForAnAnnualPlanProjectComponent.componentCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.theSourceOfFundingForAnAnnualPlanProjectComponentService.create(this.theSourceOfFundingForAnAnnualPlanProjectComponentForm.value)
        .pipe(switchMap(x => {
			return this.theSourceOfFundingForAnAnnualPlanProjectComponentService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.theSourceOfFundingForAnAnnualPlanProjectComponentForm.get(name);
    }

  initializeLookupServices() {
    this.componentCodesService = new LookupService('componentcodes', this.http);
  }
 }
