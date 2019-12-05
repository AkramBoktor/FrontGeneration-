
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { DraftAnnualPlan } from 'app/shared/models/draft-annual-plan';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { DraftAnnualPlanService } from '../shared/draft-annual-plan.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-draft-annual-plan-edit',
  templateUrl: './draft-annual-plan-edit.component.html',
  styleUrls: ['./draft-annual-plan-edit.component.scss'],
  providers: []
})

export class DraftAnnualPlanEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedDraftAnnualPlan: DraftAnnualPlan;
  draftAnnualPlanForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedDraftAnnualPlanDialog: any,
    @Optional() public dialogRef: MatDialogRef<DraftAnnualPlanEditComponent>,
    public draftAnnualPlanService: DraftAnnualPlanService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDraftAnnualPlan = new DraftAnnualPlan();
    this.selectedDraftAnnualPlan = this.selectedDraftAnnualPlanDialog.data || this.selectedDraftAnnualPlan;

    

    this.draftAnnualPlanForm = this.formBuilder.group({
      
  id : [this.selectedDraftAnnualPlan.id],
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
    this.draftAnnualPlanService.update(this.draftAnnualPlanForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.draftAnnualPlanService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.draftAnnualPlanForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
