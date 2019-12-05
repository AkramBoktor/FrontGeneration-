
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { LinkThePlanSourceToTheBudgetSource } from 'app/shared/models/link-the-plan-source-to-the-budget-source';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { LinkThePlanSourceToTheBudgetSourceService } from '../shared/link-the-plan-source-to-the-budget-source.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-link-the-plan-source-to-the-budget-source-edit',
  templateUrl: './link-the-plan-source-to-the-budget-source-edit.component.html',
  styleUrls: ['./link-the-plan-source-to-the-budget-source-edit.component.scss'],
  providers: []
})

export class LinkThePlanSourceToTheBudgetSourceEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedLinkThePlanSourceToTheBudgetSource: LinkThePlanSourceToTheBudgetSource;
  linkThePlanSourceToTheBudgetSourceForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private planFundingSourceCodesService: LookupService;
private budgetFundingSourceCodesService: LookupService;

  
fundingSourceCodeSelectOptions: MaterialSelectOptions;
budgetSourceCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('fundingSourceCode', { static: true }) FundingSourceCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('budgetSourceCode', { static: true }) BudgetSourceCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedLinkThePlanSourceToTheBudgetSourceDialog: any,
    @Optional() public dialogRef: MatDialogRef<LinkThePlanSourceToTheBudgetSourceEditComponent>,
    public linkThePlanSourceToTheBudgetSourceService: LinkThePlanSourceToTheBudgetSourceService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedLinkThePlanSourceToTheBudgetSource = new LinkThePlanSourceToTheBudgetSource();
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
      
  id : [this.selectedLinkThePlanSourceToTheBudgetSource.id],
  yearPlan : [this.selectedLinkThePlanSourceToTheBudgetSource.yearPlan, [ Validators.required ]],
  fundingSourceCode : [this.selectedLinkThePlanSourceToTheBudgetSource.fundingSourceCode, [ Validators.required ]],
  budgetSourceCode : [this.selectedLinkThePlanSourceToTheBudgetSource.budgetSourceCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.linkThePlanSourceToTheBudgetSourceService.update(this.linkThePlanSourceToTheBudgetSourceForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.linkThePlanSourceToTheBudgetSourceService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.linkThePlanSourceToTheBudgetSourceForm.get(name);
  }

  initializeLookupServices() {
    this.planFundingSourceCodesService = new LookupService('planfundingsourcecodes', this.http);
this.budgetFundingSourceCodesService = new LookupService('budgetfundingsourcecodes', this.http);
  }
}
