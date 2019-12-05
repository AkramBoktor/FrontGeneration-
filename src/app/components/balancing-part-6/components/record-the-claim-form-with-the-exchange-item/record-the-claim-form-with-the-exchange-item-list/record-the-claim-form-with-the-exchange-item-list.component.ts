
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { RecordTheClaimFormWithTheExchangeItem } from 'app/shared/models/record-the-claim-form-with-the-exchange-item';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { RecordTheClaimFormWithTheExchangeItemEditComponent } from '../record-the-claim-form-with-the-exchange-item-edit/record-the-claim-form-with-the-exchange-item-edit.component';
import { RecordTheClaimFormWithTheExchangeItemNewComponent } from '../record-the-claim-form-with-the-exchange-item-new/record-the-claim-form-with-the-exchange-item-new.component';
import { RecordTheClaimFormWithTheExchangeItemViewComponent } from '../record-the-claim-form-with-the-exchange-item-view/record-the-claim-form-with-the-exchange-item-view.component';
import { RecordTheClaimFormWithTheExchangeItemService } from '../shared/record-the-claim-form-with-the-exchange-item.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-record-the-claim-form-with-the-exchange-item-list',
  templateUrl: './record-the-claim-form-with-the-exchange-item-list.component.html',
  styleUrls: ['./record-the-claim-form-with-the-exchange-item-list.component.scss'],
  providers: []
})

export class RecordTheClaimFormWithTheExchangeItemListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private areasService: LookupService;
private budgetFundingSourceCodesService: LookupService;
private budgetItemsService: LookupService;

  
requestingAreaNumberSelectOptions: MaterialSelectOptions;
fundingSourceSelectOptions: MaterialSelectOptions;
budgetItemSelectOptions: MaterialSelectOptions;

  
	@ViewChild('requestingAreaNumber', { static: true }) RequestingAreaNumberSelectComponent: MaterialSelectComponent;
	@ViewChild('fundingSource', { static: true }) FundingSourceSelectComponent: MaterialSelectComponent;
	@ViewChild('budgetItem', { static: true }) BudgetItemSelectComponent: MaterialSelectComponent;

  
  @Input() selectedRecordTheClaimFormWithTheExchangeItem: RecordTheClaimFormWithTheExchangeItem;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'تاريخ تسجيل الاستماره', field: 'registerationFormData' }),
	new GridColumnOptions({ headerName: 'مسلسل الاستماره', field: 'formSerial' }),
	new GridColumnOptions({ headerName: 'رقم المنطقه الطالبه', field: 'requestingAreaNumber' }),
	new GridColumnOptions({ headerName: 'مصدر التمويل', field: 'fundingSource' }),
	new GridColumnOptions({ headerName: 'بند الموازنة المطلوب الصرف عليه', field: 'budgetItem' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: RecordTheClaimFormWithTheExchangeItemViewComponent,
    editDialogClassType: RecordTheClaimFormWithTheExchangeItemEditComponent,
    newDialogClassType: RecordTheClaimFormWithTheExchangeItemNewComponent,
  });
    constructor(
        injector: Injector,
        public recordTheClaimFormWithTheExchangeItemService: RecordTheClaimFormWithTheExchangeItemService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedRecordTheClaimFormWithTheExchangeItem = new RecordTheClaimFormWithTheExchangeItem();

    
	this.requestingAreaNumberSelectOptions = new MaterialSelectOptions({
	 data: this.areasService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'رقم المنطقه الطالبه',
	});

	this.fundingSourceSelectOptions = new MaterialSelectOptions({
	 data: this.budgetFundingSourceCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'مصدر التمويل',
	});

	this.budgetItemSelectOptions = new MaterialSelectOptions({
	 data: this.budgetItemsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'بند الموازنة المطلوب الصرف عليه',
	});


    this.searchForm = this.formBuilder.group({
     	registerationFormData : [],
	formSerial : [],
	requestingAreaNumber : [],
	fundingSource : [],
	budgetItem : []
    });

     
  }

  getRecordTheClaimFormWithTheExchangeItemPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<RecordTheClaimFormWithTheExchangeItem[]> => {
    return this.recordTheClaimFormWithTheExchangeItemService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.recordTheClaimFormWithTheExchangeItemService.delete(param.data.id)
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
this.budgetFundingSourceCodesService = new LookupService('budgetfundingsourcecodes', this.http);
this.budgetItemsService = new LookupService('budgetitems', this.http);
  }
}

