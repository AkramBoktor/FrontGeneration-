
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { CreditsForRegions } from 'app/shared/models/credits-for-regions';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { CreditsForRegionsEditComponent } from '../credits-for-regions-edit/credits-for-regions-edit.component';
import { CreditsForRegionsNewComponent } from '../credits-for-regions-new/credits-for-regions-new.component';
import { CreditsForRegionsViewComponent } from '../credits-for-regions-view/credits-for-regions-view.component';
import { CreditsForRegionsService } from '../shared/credits-for-regions.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-credits-for-regions-list',
  templateUrl: './credits-for-regions-list.component.html',
  styleUrls: ['./credits-for-regions-list.component.scss'],
  providers: []
})

export class CreditsForRegionsListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private areasService: LookupService;
private budgetItemsService: LookupService;
private budgetFundingSourceCodesService: LookupService;

  
areaCodeSelectOptions: MaterialSelectOptions;
budgetItemSelectOptions: MaterialSelectOptions;
fundingSourceNumberSelectOptions: MaterialSelectOptions;

  
	@ViewChild('areaCode', { static: true }) AreaCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('budgetItem', { static: true }) BudgetItemSelectComponent: MaterialSelectComponent;
	@ViewChild('fundingSourceNumber', { static: true }) FundingSourceNumberSelectComponent: MaterialSelectComponent;

  
  @Input() selectedCreditsForRegions: CreditsForRegions;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'سنة الموازنة', field: 'budgetYear' }),
	new GridColumnOptions({ headerName: 'مبلغ معتمد للمنطقة', field: 'regionApprovedAmount' }),
	new GridColumnOptions({ headerName: 'سنة الموازنة', field: 'budgetYear' }),
	new GridColumnOptions({ headerName: 'مبلغ معتمد للمنطقة', field: 'regionApprovedAmount' }),
	new GridColumnOptions({ headerName: 'اسم مصدر التمويل', field: 'fundingSourceName' }),
	new GridColumnOptions({ headerName: 'رصيد الاعتماد', field: 'creditBalance' }),
	new GridColumnOptions({ headerName: 'كود المنطقة', field: 'areaCode' }),
	new GridColumnOptions({ headerName: 'بند الموازنة', field: 'budgetItem' }),
	new GridColumnOptions({ headerName: 'رقم مصدر التمويل', field: 'fundingSourceNumber' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: CreditsForRegionsViewComponent,
    editDialogClassType: CreditsForRegionsEditComponent,
    newDialogClassType: CreditsForRegionsNewComponent,
  });
    constructor(
        injector: Injector,
        public creditsForRegionsService: CreditsForRegionsService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedCreditsForRegions = new CreditsForRegions();

    
	this.areaCodeSelectOptions = new MaterialSelectOptions({
	 data: this.areasService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المنطقة',
	});

	this.budgetItemSelectOptions = new MaterialSelectOptions({
	 data: this.budgetItemsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'بند الموازنة',
	});

	this.fundingSourceNumberSelectOptions = new MaterialSelectOptions({
	 data: this.budgetFundingSourceCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'رقم مصدر التمويل',
	});


    this.searchForm = this.formBuilder.group({
     	budgetYear : [],
	areaCode : [],
	budgetItem : [],
	fundingSourceNumber : []
    });

     
  }

  getCreditsForRegionsPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<CreditsForRegions[]> => {
    return this.creditsForRegionsService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.creditsForRegionsService.delete(param.data.id)
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
    this.areasService = new LookupService('areas', this.http);
this.budgetItemsService = new LookupService('budgetitems', this.http);
this.budgetFundingSourceCodesService = new LookupService('budgetfundingsourcecodes', this.http);
  }
}

