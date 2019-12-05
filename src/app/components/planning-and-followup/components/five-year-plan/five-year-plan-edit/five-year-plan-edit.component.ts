
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { FiveYearPlan } from 'app/shared/models/five-year-plan';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { FiveYearPlanService } from '../shared/five-year-plan.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-five-year-plan-edit',
  templateUrl: './five-year-plan-edit.component.html',
  styleUrls: ['./five-year-plan-edit.component.scss'],
  providers: []
})

export class FiveYearPlanEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedFiveYearPlan: FiveYearPlan;
  fiveYearPlanForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedFiveYearPlanDialog: any,
    @Optional() public dialogRef: MatDialogRef<FiveYearPlanEditComponent>,
    public fiveYearPlanService: FiveYearPlanService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedFiveYearPlan = new FiveYearPlan();
    this.selectedFiveYearPlan = this.selectedFiveYearPlanDialog.data || this.selectedFiveYearPlan;

    

    this.fiveYearPlanForm = this.formBuilder.group({
      
  id : [this.selectedFiveYearPlan.id],
  fiveYearplan : [this.selectedFiveYearPlan.fiveYearplan, [ Validators.required ]],
  startYear : [this.selectedFiveYearPlan.startYear, [ Validators.required ]],
  endYear : [this.selectedFiveYearPlan.endYear, [ Validators.required ]],
  projectsNumber : [this.selectedFiveYearPlan.projectsNumber, [ Validators.required ]],
  actualProjectsNumber : [this.selectedFiveYearPlan.actualProjectsNumber, [ Validators.required ]],
  suggestedValue : [this.selectedFiveYearPlan.suggestedValue, [ Validators.required ]],
  creditValue : [this.selectedFiveYearPlan.creditValue, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.fiveYearPlanService.update(this.fiveYearPlanForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.fiveYearPlanService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.fiveYearPlanForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
