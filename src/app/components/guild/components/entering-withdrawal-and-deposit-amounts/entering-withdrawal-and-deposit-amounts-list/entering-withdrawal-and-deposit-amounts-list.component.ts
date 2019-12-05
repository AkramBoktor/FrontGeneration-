
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { EnteringWithdrawalAndDepositAmounts } from 'app/shared/models/entering-withdrawal-and-deposit-amounts';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { EnteringWithdrawalAndDepositAmountsEditComponent } from '../entering-withdrawal-and-deposit-amounts-edit/entering-withdrawal-and-deposit-amounts-edit.component';
import { EnteringWithdrawalAndDepositAmountsNewComponent } from '../entering-withdrawal-and-deposit-amounts-new/entering-withdrawal-and-deposit-amounts-new.component';
import { EnteringWithdrawalAndDepositAmountsViewComponent } from '../entering-withdrawal-and-deposit-amounts-view/entering-withdrawal-and-deposit-amounts-view.component';
import { EnteringWithdrawalAndDepositAmountsService } from '../shared/entering-withdrawal-and-deposit-amounts.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-entering-withdrawal-and-deposit-amounts-list',
  templateUrl: './entering-withdrawal-and-deposit-amounts-list.component.html',
  styleUrls: ['./entering-withdrawal-and-deposit-amounts-list.component.scss'],
  providers: []
})

export class EnteringWithdrawalAndDepositAmountsListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private entityCodesService: LookupService;
private processTypesService: LookupService;

  
entityCodeSelectOptions: MaterialSelectOptions;
operationTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('entityCode', { static: true }) EntityCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('operationType', { static: true }) OperationTypeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedEnteringWithdrawalAndDepositAmounts: EnteringWithdrawalAndDepositAmounts;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: ' رقم الشيك ', field: 'checkNumber' }),
	new GridColumnOptions({ headerName: ' تاريخ الشيك ', field: 'checkDate' }),
	new GridColumnOptions({ headerName: ' مبلغ الشيك', field: 'checkAmount' }),
	new GridColumnOptions({ headerName: ' تاريخ العملية ', field: 'operationDate' }),
	new GridColumnOptions({ headerName: ' البيان  ', field: 'statement' }),
	new GridColumnOptions({ headerName: ' كود الجهة ', field: 'entityCode' }),
	new GridColumnOptions({ headerName: '  نوع العملية', field: 'operationType' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: EnteringWithdrawalAndDepositAmountsViewComponent,
    editDialogClassType: EnteringWithdrawalAndDepositAmountsEditComponent,
    newDialogClassType: EnteringWithdrawalAndDepositAmountsNewComponent,
  });
    constructor(
        injector: Injector,
        public enteringWithdrawalAndDepositAmountsService: EnteringWithdrawalAndDepositAmountsService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedEnteringWithdrawalAndDepositAmounts = new EnteringWithdrawalAndDepositAmounts();

    
	this.entityCodeSelectOptions = new MaterialSelectOptions({
	 data: this.entityCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' كود الجهة ',
	});

	this.operationTypeSelectOptions = new MaterialSelectOptions({
	 data: this.processTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: '  نوع العملية',
	});


    this.searchForm = this.formBuilder.group({
     	checkNumber : [],
	entityCode : [],
	operationType : []
    });

     
  }

  getEnteringWithdrawalAndDepositAmountsPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<EnteringWithdrawalAndDepositAmounts[]> => {
    return this.enteringWithdrawalAndDepositAmountsService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.enteringWithdrawalAndDepositAmountsService.delete(param.data.id)
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
    this.entityCodesService = new LookupService('entitycodes', this.http);
this.processTypesService = new LookupService('processtypes', this.http);
  }
}

