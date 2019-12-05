
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { CleanlinessBusinessPlan } from 'app/shared/models/cleanliness-business-plan';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { CleanlinessBusinessPlanService } from '../shared/cleanliness-business-plan.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-cleanliness-business-plan-view',
  templateUrl: './cleanliness-business-plan-view.component.html',
  styleUrls: ['./cleanliness-business-plan-view.component.scss'],
  providers: []
})

export class CleanlinessBusinessPlanViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedCleanlinessBusinessPlan: CleanlinessBusinessPlan;
  cleanlinessBusinessPlanForm: FormGroup;

  private branchCodesService: LookupService;

  
branchSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedCleanlinessBusinessPlanDialog: any,
    @Optional() public dialogRef: MatDialogRef<CleanlinessBusinessPlanViewComponent>,
    public cleanlinessBusinessPlanService: CleanlinessBusinessPlanService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedCleanlinessBusinessPlan = this.selectedCleanlinessBusinessPlanDialog.data || this.selectedCleanlinessBusinessPlan;

    
	this.branchSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'فرع',
	});


    this.cleanlinessBusinessPlanForm = this.formBuilder.group({
      
  year : [this.selectedCleanlinessBusinessPlan.year],
  month : [this.selectedCleanlinessBusinessPlan.month],
  beginningPlanDate : [this.selectedCleanlinessBusinessPlan.beginningPlanDate],
  endPlanDate : [this.selectedCleanlinessBusinessPlan.endPlanDate],
  target : [this.selectedCleanlinessBusinessPlan.target],
  branch : [this.selectedCleanlinessBusinessPlan.branch]
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
    return this.cleanlinessBusinessPlanForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.cleanlinessBusinessPlanForm.controls)) {
      this.cleanlinessBusinessPlanForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
  }
}

