
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { CleanlinessBusinessPlan } from 'app/shared/models/cleanliness-business-plan';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { CleanlinessBusinessPlanService } from '../shared/cleanliness-business-plan.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-cleanliness-business-plan-edit',
  templateUrl: './cleanliness-business-plan-edit.component.html',
  styleUrls: ['./cleanliness-business-plan-edit.component.scss'],
  providers: []
})

export class CleanlinessBusinessPlanEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedCleanlinessBusinessPlan: CleanlinessBusinessPlan;
  cleanlinessBusinessPlanForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private branchCodesService: LookupService;

  
branchSelectOptions: MaterialSelectOptions;

  
	@ViewChild('branch', { static: true }) BranchSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedCleanlinessBusinessPlanDialog: any,
    @Optional() public dialogRef: MatDialogRef<CleanlinessBusinessPlanEditComponent>,
    public cleanlinessBusinessPlanService: CleanlinessBusinessPlanService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedCleanlinessBusinessPlan = new CleanlinessBusinessPlan();
    this.selectedCleanlinessBusinessPlan = this.selectedCleanlinessBusinessPlanDialog.data || this.selectedCleanlinessBusinessPlan;

    
	this.branchSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'فرع',
	});


    this.cleanlinessBusinessPlanForm = this.formBuilder.group({
      
  id : [this.selectedCleanlinessBusinessPlan.id],
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
    this.cleanlinessBusinessPlanService.update(this.cleanlinessBusinessPlanForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.cleanlinessBusinessPlanService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.cleanlinessBusinessPlanForm.get(name);
  }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
  }
}
