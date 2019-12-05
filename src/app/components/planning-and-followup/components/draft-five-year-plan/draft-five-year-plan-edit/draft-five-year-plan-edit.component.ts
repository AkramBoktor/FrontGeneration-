
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { DraftFiveYearPlan } from 'app/shared/models/draft-five-year-plan';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { DraftFiveYearPlanService } from '../shared/draft-five-year-plan.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-draft-five-year-plan-edit',
  templateUrl: './draft-five-year-plan-edit.component.html',
  styleUrls: ['./draft-five-year-plan-edit.component.scss'],
  providers: []
})

export class DraftFiveYearPlanEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedDraftFiveYearPlan: DraftFiveYearPlan;
  draftFiveYearPlanForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private projectTypesService: LookupService;
private educationalLevelsService: LookupService;

  
projectTypeSelectOptions: MaterialSelectOptions;
educationallevelSelectOptions: MaterialSelectOptions;

  
	@ViewChild('projectType', { static: true }) ProjectTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('educationallevel', { static: true }) EducationallevelSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedDraftFiveYearPlanDialog: any,
    @Optional() public dialogRef: MatDialogRef<DraftFiveYearPlanEditComponent>,
    public draftFiveYearPlanService: DraftFiveYearPlanService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDraftFiveYearPlan = new DraftFiveYearPlan();
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
      
  id : [this.selectedDraftFiveYearPlan.id],
  fiveYearPlanNumber : [this.selectedDraftFiveYearPlan.fiveYearPlanNumber, [ Validators.required ]],
  projectNumber : [this.selectedDraftFiveYearPlan.projectNumber, [ Validators.required ]],
  planningProjectNumberMinistry : [this.selectedDraftFiveYearPlan.planningProjectNumberMinistry, [ Validators.required ]],
  projectName : [this.selectedDraftFiveYearPlan.projectName, [ Validators.required ]],
  suggestedValue : [this.selectedDraftFiveYearPlan.suggestedValue, [ Validators.required ]],
  creditValue : [this.selectedDraftFiveYearPlan.creditValue, [ Validators.required ]],
  schoolsNumber : [this.selectedDraftFiveYearPlan.schoolsNumber, [ Validators.required ]],
  classesNumber : [this.selectedDraftFiveYearPlan.classesNumber, [ Validators.required ]],
  projectType : [this.selectedDraftFiveYearPlan.projectType, [ Validators.required ]],
  educationallevel : [this.selectedDraftFiveYearPlan.educationallevel, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.draftFiveYearPlanService.update(this.draftFiveYearPlanForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.draftFiveYearPlanService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.draftFiveYearPlanForm.get(name);
  }

  initializeLookupServices() {
    this.projectTypesService = new LookupService('projecttypes', this.http);
this.educationalLevelsService = new LookupService('educationallevels', this.http);
  }
}
