
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { RecordContractorPricesOnMaintenanceAssuranceItems } from 'app/shared/models/record-contractor-prices-on-maintenance-assurance-items';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { RecordContractorPricesOnMaintenanceAssuranceItemsEditComponent } from '../record-contractor-prices-on-maintenance-assurance-items-edit/record-contractor-prices-on-maintenance-assurance-items-edit.component';
import { RecordContractorPricesOnMaintenanceAssuranceItemsNewComponent } from '../record-contractor-prices-on-maintenance-assurance-items-new/record-contractor-prices-on-maintenance-assurance-items-new.component';
import { RecordContractorPricesOnMaintenanceAssuranceItemsViewComponent } from '../record-contractor-prices-on-maintenance-assurance-items-view/record-contractor-prices-on-maintenance-assurance-items-view.component';
import { RecordContractorPricesOnMaintenanceAssuranceItemsService } from '../shared/record-contractor-prices-on-maintenance-assurance-items.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-record-contractor-prices-on-maintenance-assurance-items-list',
  templateUrl: './record-contractor-prices-on-maintenance-assurance-items-list.component.html',
  styleUrls: ['./record-contractor-prices-on-maintenance-assurance-items-list.component.scss'],
  providers: []
})

export class RecordContractorPricesOnMaintenanceAssuranceItemsListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedRecordContractorPricesOnMaintenanceAssuranceItems: RecordContractorPricesOnMaintenanceAssuranceItems;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود المبنى', field: 'buildingCode' }),
	new GridColumnOptions({ headerName: ' سنه الخطه', field: 'yearPlan' }),
	new GridColumnOptions({ headerName: 'نوع الصيانه ', field: 'maintenanceType' }),
	new GridColumnOptions({ headerName: 'كود البند', field: 'itemCode' }),
	new GridColumnOptions({ headerName: 'اسم البند', field: 'itemName' }),
	new GridColumnOptions({ headerName: 'السعر', field: 'price' }),
	new GridColumnOptions({ headerName: 'الكمية', field: 'quantity' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: RecordContractorPricesOnMaintenanceAssuranceItemsViewComponent,
    editDialogClassType: RecordContractorPricesOnMaintenanceAssuranceItemsEditComponent,
    newDialogClassType: RecordContractorPricesOnMaintenanceAssuranceItemsNewComponent,
  });
    constructor(
        injector: Injector,
        public recordContractorPricesOnMaintenanceAssuranceItemsService: RecordContractorPricesOnMaintenanceAssuranceItemsService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedRecordContractorPricesOnMaintenanceAssuranceItems = new RecordContractorPricesOnMaintenanceAssuranceItems();

    

    this.searchForm = this.formBuilder.group({
     	buildingCode : [],
	yearPlan : [],
	maintenanceType : []
    });

     
  }

  getRecordContractorPricesOnMaintenanceAssuranceItemsPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<RecordContractorPricesOnMaintenanceAssuranceItems[]> => {
    return this.recordContractorPricesOnMaintenanceAssuranceItemsService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.recordContractorPricesOnMaintenanceAssuranceItemsService.delete(param.data.id)
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
    
  }
}

