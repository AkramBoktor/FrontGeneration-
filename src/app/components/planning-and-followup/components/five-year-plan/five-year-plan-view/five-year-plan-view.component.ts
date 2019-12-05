
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FiveYearPlan } from 'app/shared/models/five-year-plan';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { FiveYearPlanService } from '../shared/five-year-plan.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-five-year-plan-view',
  templateUrl: './five-year-plan-view.component.html',
  styleUrls: ['./five-year-plan-view.component.scss'],
  providers: []
})

export class FiveYearPlanViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedFiveYearPlan: FiveYearPlan;
  fiveYearPlanForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedFiveYearPlanDialog: any,
    @Optional() public dialogRef: MatDialogRef<FiveYearPlanViewComponent>,
    public fiveYearPlanService: FiveYearPlanService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedFiveYearPlan = this.selectedFiveYearPlanDialog.data || this.selectedFiveYearPlan;

    

    this.fiveYearPlanForm = this.formBuilder.group({
      
  fiveYearplan : [this.selectedFiveYearPlan.fiveYearplan],
  startYear : [this.selectedFiveYearPlan.startYear],
  endYear : [this.selectedFiveYearPlan.endYear],
  projectsNumber : [this.selectedFiveYearPlan.projectsNumber],
  actualProjectsNumber : [this.selectedFiveYearPlan.actualProjectsNumber],
  suggestedValue : [this.selectedFiveYearPlan.suggestedValue],
  creditValue : [this.selectedFiveYearPlan.creditValue]
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
    return this.fiveYearPlanForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.fiveYearPlanForm.controls)) {
      this.fiveYearPlanForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

