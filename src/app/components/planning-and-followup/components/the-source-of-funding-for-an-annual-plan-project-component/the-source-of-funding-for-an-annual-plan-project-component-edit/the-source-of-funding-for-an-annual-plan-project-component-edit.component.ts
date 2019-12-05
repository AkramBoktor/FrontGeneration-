
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { TheSourceOfFundingForAnAnnualPlanProjectComponent } from 'app/shared/models/the-source-of-funding-for-an-annual-plan-project-component';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { TheSourceOfFundingForAnAnnualPlanProjectComponentService } from '../shared/the-source-of-funding-for-an-annual-plan-project-component.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-the-source-of-funding-for-an-annual-plan-project-component-edit',
  templateUrl: './the-source-of-funding-for-an-annual-plan-project-component-edit.component.html',
  styleUrls: ['./the-source-of-funding-for-an-annual-plan-project-component-edit.component.scss'],
  providers: []
})

export class TheSourceOfFundingForAnAnnualPlanProjectComponentEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedTheSourceOfFundingForAnAnnualPlanProjectComponent: TheSourceOfFundingForAnAnnualPlanProjectComponent;
  theSourceOfFundingForAnAnnualPlanProjectComponentForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private componentCodesService: LookupService;

  
componentCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('componentCode', { static: true }) ComponentCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedTheSourceOfFundingForAnAnnualPlanProjectComponentDialog: any,
    @Optional() public dialogRef: MatDialogRef<TheSourceOfFundingForAnAnnualPlanProjectComponentEditComponent>,
    public theSourceOfFundingForAnAnnualPlanProjectComponentService: TheSourceOfFundingForAnAnnualPlanProjectComponentService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTheSourceOfFundingForAnAnnualPlanProjectComponent = new TheSourceOfFundingForAnAnnualPlanProjectComponent();
    this.selectedTheSourceOfFundingForAnAnnualPlanProjectComponent = this.selectedTheSourceOfFundingForAnAnnualPlanProjectComponentDialog.data || this.selectedTheSourceOfFundingForAnAnnualPlanProjectComponent;

    
	this.componentCodeSelectOptions = new MaterialSelectOptions({
	 data: this.componentCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' رمز المكون',
	});


    this.theSourceOfFundingForAnAnnualPlanProjectComponentForm = this.formBuilder.group({
      
  id : [this.selectedTheSourceOfFundingForAnAnnualPlanProjectComponent.id],
  suggesteValue : [this.selectedTheSourceOfFundingForAnAnnualPlanProjectComponent.suggesteValue, [ Validators.required ]],
  sourceCode : [this.selectedTheSourceOfFundingForAnAnnualPlanProjectComponent.sourceCode, [ Validators.required ]],
  yearPlan : [this.selectedTheSourceOfFundingForAnAnnualPlanProjectComponent.yearPlan, [ Validators.required ]],
  projectPlanCode : [this.selectedTheSourceOfFundingForAnAnnualPlanProjectComponent.projectPlanCode, [ Validators.required ]],
  accreditationAfterAmendment : [this.selectedTheSourceOfFundingForAnAnnualPlanProjectComponent.accreditationAfterAmendment, [ Validators.required ]],
  creditValue : [this.selectedTheSourceOfFundingForAnAnnualPlanProjectComponent.creditValue, [ Validators.required ]],
  componentCode : [this.selectedTheSourceOfFundingForAnAnnualPlanProjectComponent.componentCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.theSourceOfFundingForAnAnnualPlanProjectComponentService.update(this.theSourceOfFundingForAnAnnualPlanProjectComponentForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.theSourceOfFundingForAnAnnualPlanProjectComponentService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.theSourceOfFundingForAnAnnualPlanProjectComponentForm.get(name);
  }

  initializeLookupServices() {
    this.componentCodesService = new LookupService('componentcodes', this.http);
  }
}
