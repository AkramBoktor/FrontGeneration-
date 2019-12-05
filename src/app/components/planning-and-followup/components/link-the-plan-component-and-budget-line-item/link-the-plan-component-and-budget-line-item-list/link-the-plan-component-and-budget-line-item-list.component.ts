
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { LinkThePlanComponentAndBudgetLineItem } from 'app/shared/models/link-the-plan-component-and-budget-line-item';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { LinkThePlanComponentAndBudgetLineItemEditComponent } from '../link-the-plan-component-and-budget-line-item-edit/link-the-plan-component-and-budget-line-item-edit.component';
import { LinkThePlanComponentAndBudgetLineItemNewComponent } from '../link-the-plan-component-and-budget-line-item-new/link-the-plan-component-and-budget-line-item-new.component';
import { LinkThePlanComponentAndBudgetLineItemViewComponent } from '../link-the-plan-component-and-budget-line-item-view/link-the-plan-component-and-budget-line-item-view.component';
import { LinkThePlanComponentAndBudgetLineItemService } from '../shared/link-the-plan-component-and-budget-line-item.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-link-the-plan-component-and-budget-line-item-list',
  templateUrl: './link-the-plan-component-and-budget-line-item-list.component.html',
  styleUrls: ['./link-the-plan-component-and-budget-line-item-list.component.scss'],
  providers: []
})

export class LinkThePlanComponentAndBudgetLineItemListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private componentCodesService: LookupService;

  
componentCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('componentCode', { static: true }) ComponentCodeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedLinkThePlanComponentAndBudgetLineItem: LinkThePlanComponentAndBudgetLineItem;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: '  سنة الخطة', field: 'yearPlan' }),
	new GridColumnOptions({ headerName: '  رقم المشروع', field: 'projectNumber' }),
	new GridColumnOptions({ headerName: ' سنة الموازنة', field: 'budgetYear' }),
	new GridColumnOptions({ headerName: ' كود بند الموازنة', field: 'budgetItemCode' }),
	new GridColumnOptions({ headerName: ' رمز المكون', field: 'componentCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: LinkThePlanComponentAndBudgetLineItemViewComponent,
    editDialogClassType: LinkThePlanComponentAndBudgetLineItemEditComponent,
    newDialogClassType: LinkThePlanComponentAndBudgetLineItemNewComponent,
  });
    constructor(
        injector: Injector,
        public linkThePlanComponentAndBudgetLineItemService: LinkThePlanComponentAndBudgetLineItemService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedLinkThePlanComponentAndBudgetLineItem = new LinkThePlanComponentAndBudgetLineItem();

    
	this.componentCodeSelectOptions = new MaterialSelectOptions({
	 data: this.componentCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' رمز المكون',
	});


    this.searchForm = this.formBuilder.group({
     	yearPlan : [],
	projectNumber : [],
	budgetYear : [],
	budgetItemCode : [],
	componentCode : []
    });

     
  }

  getLinkThePlanComponentAndBudgetLineItemPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<LinkThePlanComponentAndBudgetLineItem[]> => {
    return this.linkThePlanComponentAndBudgetLineItemService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.linkThePlanComponentAndBudgetLineItemService.delete(param.data.id)
      .pipe(take(1))
      .subscribe(() => this.grid.refreshData());
  }

  onBeginSearch(): void {
    this.grid.beginSearch(this.searchForm.value);
  }

  onCreate(): void {
    this.router.navigate(['new'], {relativeTo: this.activatedRoute});
  }

  getControls(name: string) {
    return this.searchForm.get(name);
  }

  initializeLookupServices() {
    this.componentCodesService = new LookupService('componentcodes', this.http);
  }
}

