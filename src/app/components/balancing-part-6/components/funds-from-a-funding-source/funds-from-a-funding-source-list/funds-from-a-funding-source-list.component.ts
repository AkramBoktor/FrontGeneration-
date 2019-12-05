
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { FundsFromAFundingSource } from 'app/shared/models/funds-from-a-funding-source';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FundsFromAFundingSourceEditComponent } from '../funds-from-a-funding-source-edit/funds-from-a-funding-source-edit.component';
import { FundsFromAFundingSourceNewComponent } from '../funds-from-a-funding-source-new/funds-from-a-funding-source-new.component';
import { FundsFromAFundingSourceViewComponent } from '../funds-from-a-funding-source-view/funds-from-a-funding-source-view.component';
import { FundsFromAFundingSourceService } from '../shared/funds-from-a-funding-source.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-funds-from-a-funding-source-list',
  templateUrl: './funds-from-a-funding-source-list.component.html',
  styleUrls: ['./funds-from-a-funding-source-list.component.scss'],
  providers: []
})

export class FundsFromAFundingSourceListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private budgetFundingSourceCodesService: LookupService;

  
fundingSourceNumberSelectOptions: MaterialSelectOptions;

  
	@ViewChild('fundingSourceNumber', { static: true }) FundingSourceNumberSelectComponent: MaterialSelectComponent;

  
  @Input() selectedFundsFromAFundingSource: FundsFromAFundingSource;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'سنه الموازنه', field: 'budgetYear' }),
	new GridColumnOptions({ headerName: 'مسلسل المحافظه', field: 'clipboardSerial' }),
	new GridColumnOptions({ headerName: 'رقم حافظ التمويل', field: 'fundClipboardNumber' }),
	new GridColumnOptions({ headerName: 'رقم مصدر التمويل', field: 'fundingSourceNumber' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: FundsFromAFundingSourceViewComponent,
    editDialogClassType: FundsFromAFundingSourceEditComponent,
    newDialogClassType: FundsFromAFundingSourceNewComponent,
  });
    constructor(
        injector: Injector,
        public fundsFromAFundingSourceService: FundsFromAFundingSourceService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedFundsFromAFundingSource = new FundsFromAFundingSource();

    
	this.fundingSourceNumberSelectOptions = new MaterialSelectOptions({
	 data: this.budgetFundingSourceCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'رقم مصدر التمويل',
	});


    this.searchForm = this.formBuilder.group({
     	budgetYear : [],
	clipboardSerial : [],
	fundClipboardNumber : [],
	fundingSourceNumber : []
    });

     
  }

  getFundsFromAFundingSourcePaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<FundsFromAFundingSource[]> => {
    return this.fundsFromAFundingSourceService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.fundsFromAFundingSourceService.delete(param.data.id)
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

