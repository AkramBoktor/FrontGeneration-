
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { DraftAnnualPlan } from 'app/shared/models/draft-annual-plan';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { DraftAnnualPlanService } from '../shared/draft-annual-plan.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-draft-annual-plan-view',
  templateUrl: './draft-annual-plan-view.component.html',
  styleUrls: ['./draft-annual-plan-view.component.scss'],
  providers: []
})

export class DraftAnnualPlanViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedDraftAnnualPlan: DraftAnnualPlan;
  draftAnnualPlanForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedDraftAnnualPlanDialog: any,
    @Optional() public dialogRef: MatDialogRef<DraftAnnualPlanViewComponent>,
    public draftAnnualPlanService: DraftAnnualPlanService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDraftAnnualPlan = this.selectedDraftAnnualPlanDialog.data || this.selectedDraftAnnualPlan;

    

    this.draftAnnualPlanForm = this.formBuilder.group({
      
  suggestedValue : [this.selectedDraftAnnualPlan.suggestedValue],
  creditValue : [this.selectedDraftAnnualPlan.creditValue],
  classesNumber : [this.selectedDraftAnnualPlan.classesNumber],
  schoolsNumber : [this.selectedDraftAnnualPlan.schoolsNumber],
  yearPlan : [this.selectedDraftAnnualPlan.yearPlan],
  annualProjectPlanCode : [this.selectedDraftAnnualPlan.annualProjectPlanCode],
  fivePlanProjectCode : [this.selectedDraftAnnualPlan.fivePlanProjectCode],
  accreditationAfterAmendment : [this.selectedDraftAnnualPlan.accreditationAfterAmendment]
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
    return this.draftAnnualPlanForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.draftAnnualPlanForm.controls)) {
      this.draftAnnualPlanForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

