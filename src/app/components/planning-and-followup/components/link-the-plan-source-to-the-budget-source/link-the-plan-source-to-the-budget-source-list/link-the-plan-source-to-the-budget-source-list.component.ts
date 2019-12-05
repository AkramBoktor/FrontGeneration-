
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { LinkThePlanSourceToTheBudgetSource } from 'app/shared/models/link-the-plan-source-to-the-budget-source';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { LinkThePlanSourceToTheBudgetSourceEditComponent } from '../link-the-plan-source-to-the-budget-source-edit/link-the-plan-source-to-the-budget-source-edit.component';
import { LinkThePlanSourceToTheBudgetSourceNewComponent } from '../link-the-plan-source-to-the-budget-source-new/link-the-plan-source-to-the-budget-source-new.component';
import { LinkThePlanSourceToTheBudgetSourceViewComponent } from '../link-the-plan-source-to-the-budget-source-view/link-the-plan-source-to-the-budget-source-view.component';
import { LinkThePlanSourceToTheBudgetSourceService } from '../shared/link-the-plan-source-to-the-budget-source.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-link-the-plan-source-to-the-budget-source-list',
  templateUrl: './link-the-plan-source-to-the-budget-source-list.component.html',
  styleUrls: ['./link-the-plan-source-to-the-budget-source-list.component.scss'],
  providers: []
})

export class LinkThePlanSourceToTheBudgetSourceListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private planFundingSourceCodesService: LookupService;
private budgetFundingSourceCodesService: LookupService;

  
fundingSourceCodeSelectOptions: MaterialSelectOptions;
budgetSourceCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('fundingSourceCode', { static: true }) FundingSourceCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('budgetSourceCode', { static: true }) BudgetSourceCodeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedLinkThePlanSourceToTheBudgetSource: LinkThePlanSourceToTheBudgetSource;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'سنة الخطة', field: 'yearPlan' }),
	new GridColumnOptions({ headerName: ' رمز مصدر التمويل', field: 'fundingSourceCode' }),
	new GridColumnOptions({ headerName: ' رمز مصدر الموازنة', field: 'budgetSourceCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: LinkThePlanSourceToTheBudgetSourceViewComponent,
    editDialogClassType: LinkThePlanSourceToTheBudgetSourceEditComponent,
    newDialogClassType: LinkThePlanSourceToTheBudgetSourceNewComponent,
  });
    constructor(
        injector: Injector,
        public linkThePlanSourceToTheBudgetSourceService: LinkThePlanSourceToTheBudgetSourceService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedLinkThePlanSourceToTheBudgetSource = new LinkThePlanSourceToTheBudgetSource();

    
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


    this.searchForm = this.formBuilder.group({
     	yearPlan : [],
	fundingSourceCode : [],
	budgetSourceCode : []
    });

     
  }

  getLinkThePlanSourceToTheBudgetSourcePaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<LinkThePlanSourceToTheBudgetSource[]> => {
    return this.linkThePlanSourceToTheBudgetSourceService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.linkThePlanSourceToTheBudgetSourceService.delete(param.data.id)
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
    this.planFundingSourceCodesService = new LookupService('planfundingsourcecodes', this.http);
this.budgetFundingSourceCodesService = new LookupService('budgetfundingsourcecodes', this.http);
  }
}

