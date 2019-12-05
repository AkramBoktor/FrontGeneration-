
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { TheSourceOfFundingForAnAnnualPlanProjectComponent } from 'app/shared/models/the-source-of-funding-for-an-annual-plan-project-component';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { TheSourceOfFundingForAnAnnualPlanProjectComponentService } from '../shared/the-source-of-funding-for-an-annual-plan-project-component.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-the-source-of-funding-for-an-annual-plan-project-component-view',
  templateUrl: './the-source-of-funding-for-an-annual-plan-project-component-view.component.html',
  styleUrls: ['./the-source-of-funding-for-an-annual-plan-project-component-view.component.scss'],
  providers: []
})

export class TheSourceOfFundingForAnAnnualPlanProjectComponentViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedTheSourceOfFundingForAnAnnualPlanProjectComponent: TheSourceOfFundingForAnAnnualPlanProjectComponent;
  theSourceOfFundingForAnAnnualPlanProjectComponentForm: FormGroup;

  private componentCodesService: LookupService;

  
componentCodeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedTheSourceOfFundingForAnAnnualPlanProjectComponentDialog: any,
    @Optional() public dialogRef: MatDialogRef<TheSourceOfFundingForAnAnnualPlanProjectComponentViewComponent>,
    public theSourceOfFundingForAnAnnualPlanProjectComponentService: TheSourceOfFundingForAnAnnualPlanProjectComponentService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTheSourceOfFundingForAnAnnualPlanProjectComponent = this.selectedTheSourceOfFundingForAnAnnualPlanProjectComponentDialog.data || this.selectedTheSourceOfFundingForAnAnnualPlanProjectComponent;

    
	this.componentCodeSelectOptions = new MaterialSelectOptions({
	 data: this.componentCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' رمز المكون',
	});


    this.theSourceOfFundingForAnAnnualPlanProjectComponentForm = this.formBuilder.group({
      
  suggesteValue : [this.selectedTheSourceOfFundingForAnAnnualPlanProjectComponent.suggesteValue],
  sourceCode : [this.selectedTheSourceOfFundingForAnAnnualPlanProjectComponent.sourceCode],
  yearPlan : [this.selectedTheSourceOfFundingForAnAnnualPlanProjectComponent.yearPlan],
  projectPlanCode : [this.selectedTheSourceOfFundingForAnAnnualPlanProjectComponent.projectPlanCode],
  accreditationAfterAmendment : [this.selectedTheSourceOfFundingForAnAnnualPlanProjectComponent.accreditationAfterAmendment],
  creditValue : [this.selectedTheSourceOfFundingForAnAnnualPlanProjectComponent.creditValue],
  componentCode : [this.selectedTheSourceOfFundingForAnAnnualPlanProjectComponent.componentCode]
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
    return this.theSourceOfFundingForAnAnnualPlanProjectComponentForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.theSourceOfFundingForAnAnnualPlanProjectComponentForm.controls)) {
      this.theSourceOfFundingForAnAnnualPlanProjectComponentForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.componentCodesService = new LookupService('componentcodes', this.http);
  }
}

