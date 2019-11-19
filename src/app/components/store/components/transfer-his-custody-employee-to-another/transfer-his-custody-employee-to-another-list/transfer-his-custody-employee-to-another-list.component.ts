
import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { GridColumnOptions, GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { FormControlError, GridPaginatedSortedFiltered } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { TransferHisCustodyEmployeeToAnother } from 'app/shared/models/transfer-his-custody-employee-to-another';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { TransferHisCustodyEmployeeToAnotherService } from '../shared/transfer-his-custody-employee-to-another.service';
import { TransferHisCustodyEmployeeToAnotherEditComponent } from '../transfer-his-custody-employee-to-another-edit/transfer-his-custody-employee-to-another-edit.component';
import { TransferHisCustodyEmployeeToAnotherNewComponent } from '../transfer-his-custody-employee-to-another-new/transfer-his-custody-employee-to-another-new.component';
import { TransferHisCustodyEmployeeToAnotherViewComponent } from '../transfer-his-custody-employee-to-another-view/transfer-his-custody-employee-to-another-view.component';

@Component({
  selector: 'app-transfer-his-custody-employee-to-another-list',
  templateUrl: './transfer-his-custody-employee-to-another-list.component.html',
  styleUrls: ['./transfer-his-custody-employee-to-another-list.component.scss'],
  providers: []
})

export class TransferHisCustodyEmployeeToAnotherListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private itemStatusesService: LookupService;

  
itemConditionSelectOptions: MaterialSelectOptions;

  
	@ViewChild('itemCondition', { static: true }) ItemConditionSelectComponent: MaterialSelectComponent;

  
  @Input() selectedTransferHisCustodyEmployeeToAnother: TransferHisCustodyEmployeeToAnother;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم الموظف الناقل ', field: 'carrierEmployeeNumber' }),
	new GridColumnOptions({ headerName: ' رقم الموظف المستلم  ', field: 'recipientEmployeeNumber' }),
	new GridColumnOptions({ headerName: 'رقم الصنف ', field: 'itemNo' }),
	new GridColumnOptions({ headerName: 'اخر سعر ', field: 'lastPrice' }),
	new GridColumnOptions({ headerName: ' رقم المخزن ', field: 'storeNumber' }),
	new GridColumnOptions({ headerName: ' رقم اذن الصرف', field: 'exchangeAuthorizationNumber' }),
	new GridColumnOptions({ headerName: 'تاريخ الصرف ', field: 'exchangeDate' }),
	new GridColumnOptions({ headerName: 'الكمية', field: 'quantity' }),
	new GridColumnOptions({ headerName: 'تاريخ النقل', field: 'transferDate' }),
	new GridColumnOptions({ headerName: 'الكمية المنقولة', field: 'quantityTransferred' }),
	new GridColumnOptions({ headerName: 'حاله الصنف', field: 'itemCondition' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: TransferHisCustodyEmployeeToAnotherViewComponent,
    editDialogClassType: TransferHisCustodyEmployeeToAnotherEditComponent,
    newDialogClassType: TransferHisCustodyEmployeeToAnotherNewComponent,
  });
    constructor(
        injector: Injector,
        public transferHisCustodyEmployeeToAnotherService: TransferHisCustodyEmployeeToAnotherService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedTransferHisCustodyEmployeeToAnother = new TransferHisCustodyEmployeeToAnother();

    
	this.itemConditionSelectOptions = new MaterialSelectOptions({
	 data: this.itemStatusesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حاله الصنف',
	});


    this.searchForm = this.formBuilder.group({
     	carrierEmployeeNumber : [],
	recipientEmployeeNumber : [],
	itemNo : [],
	storeNumber : [],
	exchangeAuthorizationNumber : [],
	exchangeDate : [],
	transferDate : [],
	itemCondition : []
    });

     
  }

  getTransferHisCustodyEmployeeToAnotherPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<TransferHisCustodyEmployeeToAnother[]> => {
    return this.transferHisCustodyEmployeeToAnotherService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.transferHisCustodyEmployeeToAnotherService.delete(param.data.id)
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
    this.itemStatusesService = new LookupService('itemstatuses', this.http);
  }
}

