
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { DraftAnnualPlan } from 'app/shared/models/draft-annual-plan';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { DraftAnnualPlanService } from '../shared/draft-annual-plan.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-draft-annual-plan-new',
  templateUrl: './draft-annual-plan-new.component.html',
  styleUrls: ['./draft-annual-plan-new.component.scss'],
  providers: [
    ]
})

export class DraftAnnualPlanNewComponent extends AppBaseComponent implements OnInit {
  draftAnnualPlanForm: FormGroup;
  @Input() selectedDraftAnnualPlan: DraftAnnualPlan;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<DraftAnnualPlanNewComponent>,
    public draftAnnualPlanService: DraftAnnualPlanService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDraftAnnualPlan = new DraftAnnualPlan();

    

    this.draftAnnualPlanForm = this.formBuilder.group({
     
  id : [0],
  suggestedValue : [this.selectedDraftAnnualPlan.suggestedValue, [ Validators.required ]],
  creditValue : [this.selectedDraftAnnualPlan.creditValue, [ Validators.required ]],
  classesNumber : [this.selectedDraftAnnualPlan.classesNumber, [ Validators.required ]],
  schoolsNumber : [this.selectedDraftAnnualPlan.schoolsNumber, [ Validators.required ]],
  yearPlan : [this.selectedDraftAnnualPlan.yearPlan, [ Validators.required ]],
  annualProjectPlanCode : [this.selectedDraftAnnualPlan.annualProjectPlanCode, [ Validators.required ]],
  fivePlanProjectCode : [this.selectedDraftAnnualPlan.fivePlanProjectCode, [ Validators.required ]],
  accreditationAfterAmendment : [this.selectedDraftAnnualPlan.accreditationAfterAmendment, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.draftAnnualPlanService.create(this.draftAnnualPlanForm.value)
        .pipe(switchMap(x => {
			return this.draftAnnualPlanService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.draftAnnualPlanForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
