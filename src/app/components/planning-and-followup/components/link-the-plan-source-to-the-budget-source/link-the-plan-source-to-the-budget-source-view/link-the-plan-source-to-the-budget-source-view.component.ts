
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { LinkThePlanSourceToTheBudgetSource } from 'app/shared/models/link-the-plan-source-to-the-budget-source';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { LinkThePlanSourceToTheBudgetSourceService } from '../shared/link-the-plan-source-to-the-budget-source.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-link-the-plan-source-to-the-budget-source-view',
  templateUrl: './link-the-plan-source-to-the-budget-source-view.component.html',
  styleUrls: ['./link-the-plan-source-to-the-budget-source-view.component.scss'],
  providers: []
})

export class LinkThePlanSourceToTheBudgetSourceViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedLinkThePlanSourceToTheBudgetSource: LinkThePlanSourceToTheBudgetSource;
  linkThePlanSourceToTheBudgetSourceForm: FormGroup;

  private planFundingSourceCodesService: LookupService;
private budgetFundingSourceCodesService: LookupService;

  
fundingSourceCodeSelectOptions: MaterialSelectOptions;
budgetSourceCodeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedLinkThePlanSourceToTheBudgetSourceDialog: any,
    @Optional() public dialogRef: MatDialogRef<LinkThePlanSourceToTheBudgetSourceViewComponent>,
    public linkThePlanSourceToTheBudgetSourceService: LinkThePlanSourceToTheBudgetSourceService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedLinkThePlanSourceToTheBudgetSource = this.selectedLinkThePlanSourceToTheBudgetSourceDialog.data || this.selectedLinkThePlanSourceToTheBudgetSource;

    
	this.fundingSourceCodeSelectOptions = new MaterialSelectOptions({
	 data: this.planFundingSourceCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' رمز مصدر التمويل',
	});

	this.budgetSourceCodeSelectOptions = new MaterialSelectOptions({
	 data: this.budgetFundingSourceCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' رمز مصدر الموازنة',
	});


    this.linkThePlanSourceToTheBudgetSourceForm = this.formBuilder.group({
      
  yearPlan : [this.selectedLinkThePlanSourceToTheBudgetSource.yearPlan],
  fundingSourceCode : [this.selectedLinkThePlanSourceToTheBudgetSource.fundingSourceCode],
  budgetSourceCode : [this.selectedLinkThePlanSourceToTheBudgetSource.budgetSourceCode]
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
    return this.linkThePlanSourceToTheBudgetSourceForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.linkThePlanSourceToTheBudgetSourceForm.controls)) {
      this.linkThePlanSourceToTheBudgetSourceForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.planFundingSourceCodesService = new LookupService('planfundingsourcecodes', this.http);
this.budgetFundingSourceCodesService = new LookupService('budgetfundingsourcecodes', this.http);
  }
}

