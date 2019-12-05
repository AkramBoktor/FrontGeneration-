
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { LinkThePlanComponentAndBudgetLineItem } from 'app/shared/models/link-the-plan-component-and-budget-line-item';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { LinkThePlanComponentAndBudgetLineItemService } from '../shared/link-the-plan-component-and-budget-line-item.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-link-the-plan-component-and-budget-line-item-edit',
  templateUrl: './link-the-plan-component-and-budget-line-item-edit.component.html',
  styleUrls: ['./link-the-plan-component-and-budget-line-item-edit.component.scss'],
  providers: []
})

export class LinkThePlanComponentAndBudgetLineItemEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedLinkThePlanComponentAndBudgetLineItem: LinkThePlanComponentAndBudgetLineItem;
  linkThePlanComponentAndBudgetLineItemForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private componentCodesService: LookupService;

  
componentCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('componentCode', { static: true }) ComponentCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedLinkThePlanComponentAndBudgetLineItemDialog: any,
    @Optional() public dialogRef: MatDialogRef<LinkThePlanComponentAndBudgetLineItemEditComponent>,
    public linkThePlanComponentAndBudgetLineItemService: LinkThePlanComponentAndBudgetLineItemService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedLinkThePlanComponentAndBudgetLineItem = new LinkThePlanComponentAndBudgetLineItem();
    this.selectedLinkThePlanComponentAndBudgetLineItem = this.selectedLinkThePlanComponentAndBudgetLineItemDialog.data || this.selectedLinkThePlanComponentAndBudgetLineItem;

    
	this.componentCodeSelectOptions = new MaterialSelectOptions({
	 data: this.componentCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' رمز المكون',
	});


    this.linkThePlanComponentAndBudgetLineItemForm = this.formBuilder.group({
      
  id : [this.selectedLinkThePlanComponentAndBudgetLineItem.id],
  yearPlan : [this.selectedLinkThePlanComponentAndBudgetLineItem.yearPlan, [ Validators.required ]],
  projectNumber : [this.selectedLinkThePlanComponentAndBudgetLineItem.projectNumber, [ Validators.required ]],
  budgetYear : [this.selectedLinkThePlanComponentAndBudgetLineItem.budgetYear, [ Validators.required ]],
  budgetItemCode : [this.selectedLinkThePlanComponentAndBudgetLineItem.budgetItemCode, [ Validators.required ]],
  componentCode : [this.selectedLinkThePlanComponentAndBudgetLineItem.componentCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.linkThePlanComponentAndBudgetLineItemService.update(this.linkThePlanComponentAndBudgetLineItemForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.linkThePlanComponentAndBudgetLineItemService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.linkThePlanComponentAndBudgetLineItemForm.get(name);
  }

  initializeLookupServices() {
    this.componentCodesService = new LookupService('componentcodes', this.http);
  }
}
