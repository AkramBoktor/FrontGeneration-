
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FiveYearPlan } from 'app/shared/models/five-year-plan';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FiveYearPlanService } from '../shared/five-year-plan.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-five-year-plan-new',
  templateUrl: './five-year-plan-new.component.html',
  styleUrls: ['./five-year-plan-new.component.scss'],
  providers: [
    ]
})

export class FiveYearPlanNewComponent extends AppBaseComponent implements OnInit {
  fiveYearPlanForm: FormGroup;
  @Input() selectedFiveYearPlan: FiveYearPlan;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<FiveYearPlanNewComponent>,
    public fiveYearPlanService: FiveYearPlanService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedFiveYearPlan = new FiveYearPlan();

    

    this.fiveYearPlanForm = this.formBuilder.group({
     
  id : [0],
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
    this.fiveYearPlanService.create(this.fiveYearPlanForm.value)
        .pipe(switchMap(x => {
			return this.fiveYearPlanService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.fiveYearPlanForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
