
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { DraftFiveYearPlan } from 'app/shared/models/draft-five-year-plan';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { DraftFiveYearPlanService } from '../shared/draft-five-year-plan.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-draft-five-year-plan-view',
  templateUrl: './draft-five-year-plan-view.component.html',
  styleUrls: ['./draft-five-year-plan-view.component.scss'],
  providers: []
})

export class DraftFiveYearPlanViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedDraftFiveYearPlan: DraftFiveYearPlan;
  draftFiveYearPlanForm: FormGroup;

  private projectTypesService: LookupService;
private educationalLevelsService: LookupService;

  
projectTypeSelectOptions: MaterialSelectOptions;
educationallevelSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedDraftFiveYearPlanDialog: any,
    @Optional() public dialogRef: MatDialogRef<DraftFiveYearPlanViewComponent>,
    public draftFiveYearPlanService: DraftFiveYearPlanService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDraftFiveYearPlan = this.selectedDraftFiveYearPlanDialog.data || this.selectedDraftFiveYearPlan;

    
	this.projectTypeSelectOptions = new MaterialSelectOptions({
	 data: this.projectTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: '  نوع المشروع',
	});

	this.educationallevelSelectOptions = new MaterialSelectOptions({
	 data: this.educationalLevelsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: '  المرحلة التعليمية',
	});


    this.draftFiveYearPlanForm = this.formBuilder.group({
      
  fiveYearPlanNumber : [this.selectedDraftFiveYearPlan.fiveYearPlanNumber],
  projectNumber : [this.selectedDraftFiveYearPlan.projectNumber],
  planningProjectNumberMinistry : [this.selectedDraftFiveYearPlan.planningProjectNumberMinistry],
  projectName : [this.selectedDraftFiveYearPlan.projectName],
  suggestedValue : [this.selectedDraftFiveYearPlan.suggestedValue],
  creditValue : [this.selectedDraftFiveYearPlan.creditValue],
  schoolsNumber : [this.selectedDraftFiveYearPlan.schoolsNumber],
  classesNumber : [this.selectedDraftFiveYearPlan.classesNumber],
  projectType : [this.selectedDraftFiveYearPlan.projectType],
  educationallevel : [this.selectedDraftFiveYearPlan.educationallevel]
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
    return this.draftFiveYearPlanForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.draftFiveYearPlanForm.controls)) {
      this.draftFiveYearPlanForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.projectTypesService = new LookupService('projecttypes', this.http);
this.educationalLevelsService = new LookupService('educationallevels', this.http);
  }
}

