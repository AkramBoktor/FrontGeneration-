
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { LinkThePlanComponentAndBudgetLineItem } from 'app/shared/models/link-the-plan-component-and-budget-line-item';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { LinkThePlanComponentAndBudgetLineItemService } from '../shared/link-the-plan-component-and-budget-line-item.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-link-the-plan-component-and-budget-line-item-view',
  templateUrl: './link-the-plan-component-and-budget-line-item-view.component.html',
  styleUrls: ['./link-the-plan-component-and-budget-line-item-view.component.scss'],
  providers: []
})

export class LinkThePlanComponentAndBudgetLineItemViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedLinkThePlanComponentAndBudgetLineItem: LinkThePlanComponentAndBudgetLineItem;
  linkThePlanComponentAndBudgetLineItemForm: FormGroup;

  private componentCodesService: LookupService;

  
componentCodeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedLinkThePlanComponentAndBudgetLineItemDialog: any,
    @Optional() public dialogRef: MatDialogRef<LinkThePlanComponentAndBudgetLineItemViewComponent>,
    public linkThePlanComponentAndBudgetLineItemService: LinkThePlanComponentAndBudgetLineItemService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedLinkThePlanComponentAndBudgetLineItem = this.selectedLinkThePlanComponentAndBudgetLineItemDialog.data || this.selectedLinkThePlanComponentAndBudgetLineItem;

    
	this.componentCodeSelectOptions = new MaterialSelectOptions({
	 data: this.componentCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' رمز المكون',
	});


    this.linkThePlanComponentAndBudgetLineItemForm = this.formBuilder.group({
      
  yearPlan : [this.selectedLinkThePlanComponentAndBudgetLineItem.yearPlan],
  projectNumber : [this.selectedLinkThePlanComponentAndBudgetLineItem.projectNumber],
  budgetYear : [this.selectedLinkThePlanComponentAndBudgetLineItem.budgetYear],
  budgetItemCode : [this.selectedLinkThePlanComponentAndBudgetLineItem.budgetItemCode],
  componentCode : [this.selectedLinkThePlanComponentAndBudgetLineItem.componentCode]
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
    return this.linkThePlanComponentAndBudgetLineItemForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.linkThePlanComponentAndBudgetLineItemForm.controls)) {
      this.linkThePlanComponentAndBudgetLineItemForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.componentCodesService = new LookupService('componentcodes', this.http);
  }
}

