
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { DraftFiveYearPlan } from 'app/shared/models/draft-five-year-plan';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { DraftFiveYearPlanService } from '../shared/draft-five-year-plan.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-draft-five-year-plan-new',
  templateUrl: './draft-five-year-plan-new.component.html',
  styleUrls: ['./draft-five-year-plan-new.component.scss'],
  providers: [
    ]
})

export class DraftFiveYearPlanNewComponent extends AppBaseComponent implements OnInit {
  draftFiveYearPlanForm: FormGroup;
  @Input() selectedDraftFiveYearPlan: DraftFiveYearPlan;
  errorMessages: FormControlError[] = [
        
  ];

  private projectTypesService: LookupService;
private educationalLevelsService: LookupService;

  
projectTypeSelectOptions: MaterialSelectOptions;
educationallevelSelectOptions: MaterialSelectOptions;

  
	@ViewChild('projectType', { static: true }) ProjectTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('educationallevel', { static: true }) EducationallevelSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<DraftFiveYearPlanNewComponent>,
    public draftFiveYearPlanService: DraftFiveYearPlanService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDraftFiveYearPlan = new DraftFiveYearPlan();

    
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
     
  id : [0],
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
    this.draftFiveYearPlanService.create(this.draftFiveYearPlanForm.value)
        .pipe(switchMap(x => {
			return this.draftFiveYearPlanService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.draftFiveYearPlanForm.get(name);
    }

  initializeLookupServices() {
    this.projectTypesService = new LookupService('projecttypes', this.http);
this.educationalLevelsService = new LookupService('educationallevels', this.http);
  }
 }
