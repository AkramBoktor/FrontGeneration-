
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { CleanlinessBusinessPlan } from 'app/shared/models/cleanliness-business-plan';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { CleanlinessBusinessPlanService } from '../shared/cleanliness-business-plan.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-cleanliness-business-plan-new',
  templateUrl: './cleanliness-business-plan-new.component.html',
  styleUrls: ['./cleanliness-business-plan-new.component.scss'],
  providers: [
    ]
})

export class CleanlinessBusinessPlanNewComponent extends AppBaseComponent implements OnInit {
  cleanlinessBusinessPlanForm: FormGroup;
  @Input() selectedCleanlinessBusinessPlan: CleanlinessBusinessPlan;
  errorMessages: FormControlError[] = [
        
  ];

  private branchCodesService: LookupService;

  
branchSelectOptions: MaterialSelectOptions;

  
	@ViewChild('branch', { static: true }) BranchSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<CleanlinessBusinessPlanNewComponent>,
    public cleanlinessBusinessPlanService: CleanlinessBusinessPlanService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedCleanlinessBusinessPlan = new CleanlinessBusinessPlan();

    
	this.branchSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'فرع',
	});


    this.cleanlinessBusinessPlanForm = this.formBuilder.group({
     
  id : [0],
  year : [this.selectedCleanlinessBusinessPlan.year, [ Validators.required ]],
  month : [this.selectedCleanlinessBusinessPlan.month, [ Validators.required ]],
  beginningPlanDate : [this.selectedCleanlinessBusinessPlan.beginningPlanDate, [ Validators.required ]],
  endPlanDate : [this.selectedCleanlinessBusinessPlan.endPlanDate, [ Validators.required ]],
  target : [this.selectedCleanlinessBusinessPlan.target, [ Validators.required ]],
  branch : [this.selectedCleanlinessBusinessPlan.branch, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.cleanlinessBusinessPlanService.create(this.cleanlinessBusinessPlanForm.value)
        .pipe(switchMap(x => {
			return this.cleanlinessBusinessPlanService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.cleanlinessBusinessPlanForm.get(name);
    }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
  }
 }
