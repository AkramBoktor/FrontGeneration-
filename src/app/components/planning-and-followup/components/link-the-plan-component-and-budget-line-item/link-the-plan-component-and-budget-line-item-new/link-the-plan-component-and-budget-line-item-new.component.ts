
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LinkThePlanComponentAndBudgetLineItem } from 'app/shared/models/link-the-plan-component-and-budget-line-item';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { LinkThePlanComponentAndBudgetLineItemService } from '../shared/link-the-plan-component-and-budget-line-item.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-link-the-plan-component-and-budget-line-item-new',
  templateUrl: './link-the-plan-component-and-budget-line-item-new.component.html',
  styleUrls: ['./link-the-plan-component-and-budget-line-item-new.component.scss'],
  providers: [
    ]
})

export class LinkThePlanComponentAndBudgetLineItemNewComponent extends AppBaseComponent implements OnInit {
  linkThePlanComponentAndBudgetLineItemForm: FormGroup;
  @Input() selectedLinkThePlanComponentAndBudgetLineItem: LinkThePlanComponentAndBudgetLineItem;
  errorMessages: FormControlError[] = [
        
  ];

  private componentCodesService: LookupService;

  
componentCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('componentCode', { static: true }) ComponentCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<LinkThePlanComponentAndBudgetLineItemNewComponent>,
    public linkThePlanComponentAndBudgetLineItemService: LinkThePlanComponentAndBudgetLineItemService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedLinkThePlanComponentAndBudgetLineItem = new LinkThePlanComponentAndBudgetLineItem();

    
	this.componentCodeSelectOptions = new MaterialSelectOptions({
	 data: this.componentCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' رمز المكون',
	});


    this.linkThePlanComponentAndBudgetLineItemForm = this.formBuilder.group({
     
  id : [0],
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
    this.linkThePlanComponentAndBudgetLineItemService.create(this.linkThePlanComponentAndBudgetLineItemForm.value)
        .pipe(switchMap(x => {
			return this.linkThePlanComponentAndBudgetLineItemService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.linkThePlanComponentAndBudgetLineItemForm.get(name);
    }

  initializeLookupServices() {
    this.componentCodesService = new LookupService('componentcodes', this.http);
  }
 }
