
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { FinancingPortfoliosReceivedFromAFundingSource } from 'app/shared/models/financing-portfolios-received-from-a-funding-source';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FinancingPortfoliosReceivedFromAFundingSourceEditComponent } from '../financing-portfolios-received-from-a-funding-source-edit/financing-portfolios-received-from-a-funding-source-edit.component';
import { FinancingPortfoliosReceivedFromAFundingSourceNewComponent } from '../financing-portfolios-received-from-a-funding-source-new/financing-portfolios-received-from-a-funding-source-new.component';
import { FinancingPortfoliosReceivedFromAFundingSourceViewComponent } from '../financing-portfolios-received-from-a-funding-source-view/financing-portfolios-received-from-a-funding-source-view.component';
import { FinancingPortfoliosReceivedFromAFundingSourceService } from '../shared/financing-portfolios-received-from-a-funding-source.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-financing-portfolios-received-from-a-funding-source-list',
  templateUrl: './financing-portfolios-received-from-a-funding-source-list.component.html',
  styleUrls: ['./financing-portfolios-received-from-a-funding-source-list.component.scss'],
  providers: []
})

export class FinancingPortfoliosReceivedFromAFundingSourceListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
	{
	 errorName: 'minLength',
	 errorMessage: 'لا يوجد مسلسل يساوي صفر'
	}
      ];
  private budgetFundingSourceCodesService: LookupService;

  
fundingSourceNumberSelectOptions: MaterialSelectOptions;

  
	@ViewChild('fundingSourceNumber', { static: true }) FundingSourceNumberSelectComponent: MaterialSelectComponent;

  
  @Input() selectedFinancingPortfoliosReceivedFromAFundingSource: FinancingPortfoliosReceivedFromAFundingSource;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'سنة الموازنة', field: 'budgetYear' }),
	new GridColumnOptions({ headerName: 'مصدر التمويل اسم', field: 'fundingSourceName' }),
	new GridColumnOptions({ headerName: 'مسلسل الحافظة', field: 'clipboardSerial' }),
	new GridColumnOptions({ headerName: 'رقم حافظة التمويل', field: 'clipboardNumber' }),
	new GridColumnOptions({ headerName: 'تاريخ حافظة التمويل', field: 'financingClipboardDate' }),
	new GridColumnOptions({ headerName: 'مبلغ حافظة التمويل', field: 'clipboardAmount' }),
	new GridColumnOptions({ headerName: 'مصدر التمويل رقم', field: 'fundingSourceNumber' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: FinancingPortfoliosReceivedFromAFundingSourceViewComponent,
    editDialogClassType: FinancingPortfoliosReceivedFromAFundingSourceEditComponent,
    newDialogClassType: FinancingPortfoliosReceivedFromAFundingSourceNewComponent,
  });
    constructor(
        injector: Injector,
        public financingPortfoliosReceivedFromAFundingSourceService: FinancingPortfoliosReceivedFromAFundingSourceService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedFinancingPortfoliosReceivedFromAFundingSource = new FinancingPortfoliosReceivedFromAFundingSource();

    
	this.fundingSourceNumberSelectOptions = new MaterialSelectOptions({
	 data: this.budgetFundingSourceCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'مصدر التمويل رقم',
	});


    this.searchForm = this.formBuilder.group({
     	budgetYear : [],
	fundingSourceName : [],
	clipboardSerial : [],
	clipboardNumber : [],
	financingClipboardDate : [],
	clipboardAmount : [],
	fundingSourceNumber : []
    });

     
  }

  getFinancingPortfoliosReceivedFromAFundingSourcePaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<FinancingPortfoliosReceivedFromAFundingSource[]> => {
    return this.financingPortfoliosReceivedFromAFundingSourceService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.financingPortfoliosReceivedFromAFundingSourceService.delete(param.data.id)
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
    this.budgetFundingSourceCodesService = new LookupService('budgetfundingsourcecodes', this.http);
  }
}

