
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { TransferOfSupplyOrdersFromSchoolsClosure } from 'app/shared/models/transfer-of-supply-orders-from-schools-closure';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { TransferOfSupplyOrdersFromSchoolsClosureEditComponent } from '../transfer-of-supply-orders-from-schools-closure-edit/transfer-of-supply-orders-from-schools-closure-edit.component';
import { TransferOfSupplyOrdersFromSchoolsClosureNewComponent } from '../transfer-of-supply-orders-from-schools-closure-new/transfer-of-supply-orders-from-schools-closure-new.component';
import { TransferOfSupplyOrdersFromSchoolsClosureViewComponent } from '../transfer-of-supply-orders-from-schools-closure-view/transfer-of-supply-orders-from-schools-closure-view.component';
import { TransferOfSupplyOrdersFromSchoolsClosureService } from '../shared/transfer-of-supply-orders-from-schools-closure.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-transfer-of-supply-orders-from-schools-closure-list',
  templateUrl: './transfer-of-supply-orders-from-schools-closure-list.component.html',
  styleUrls: ['./transfer-of-supply-orders-from-schools-closure-list.component.scss'],
  providers: []
})

export class TransferOfSupplyOrdersFromSchoolsClosureListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private closureTypesService: LookupService;

  
closureTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('closureType', { static: true }) ClosureTypeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedTransferOfSupplyOrdersFromSchoolsClosure: TransferOfSupplyOrdersFromSchoolsClosure;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم الملحق', field: 'annexNumber' }),
	new GridColumnOptions({ headerName: 'امر توريد', field: 'orderedSupply' }),
	new GridColumnOptions({ headerName: 'سنة الخطة', field: 'yearPlan' }),
	new GridColumnOptions({ headerName: 'اسم المورد', field: 'resourceName' }),
	new GridColumnOptions({ headerName: 'نوع التجهيز', field: 'processingType' }),
	new GridColumnOptions({ headerName: 'نوع الامر', field: 'orderType' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: TransferOfSupplyOrdersFromSchoolsClosureViewComponent,
    editDialogClassType: TransferOfSupplyOrdersFromSchoolsClosureEditComponent,
    newDialogClassType: TransferOfSupplyOrdersFromSchoolsClosureNewComponent,
  });
    constructor(
        injector: Injector,
        public transferOfSupplyOrdersFromSchoolsClosureService: TransferOfSupplyOrdersFromSchoolsClosureService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedTransferOfSupplyOrdersFromSchoolsClosure = new TransferOfSupplyOrdersFromSchoolsClosure();

    
	this.closureTypeSelectOptions = new MaterialSelectOptions({
	 data: this.closureTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الاغلاق',
	});


    this.searchForm = this.formBuilder.group({
     	closedBuildingNumber : [],
	buildingNumberTransferred : [],
	annexNumber : [],
	closureType : []
    });

     
  }

  getTransferOfSupplyOrdersFromSchoolsClosurePaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<TransferOfSupplyOrdersFromSchoolsClosure[]> => {
    return this.transferOfSupplyOrdersFromSchoolsClosureService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.transferOfSupplyOrdersFromSchoolsClosureService.delete(param.data.id)
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
    this.closureTypesService = new LookupService('closuretypes', this.http);
  }
}

