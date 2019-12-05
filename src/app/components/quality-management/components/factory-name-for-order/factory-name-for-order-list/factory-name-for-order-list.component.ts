
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { FactoryNameForOrder } from 'app/shared/models/factory-name-for-order';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FactoryNameForOrderEditComponent } from '../factory-name-for-order-edit/factory-name-for-order-edit.component';
import { FactoryNameForOrderNewComponent } from '../factory-name-for-order-new/factory-name-for-order-new.component';
import { FactoryNameForOrderViewComponent } from '../factory-name-for-order-view/factory-name-for-order-view.component';
import { FactoryNameForOrderService } from '../shared/factory-name-for-order.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-factory-name-for-order-list',
  templateUrl: './factory-name-for-order-list.component.html',
  styleUrls: ['./factory-name-for-order-list.component.scss'],
  providers: []
})

export class FactoryNameForOrderListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedFactoryNameForOrder: FactoryNameForOrder;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم الطلب', field: 'orderNumber' }),
	new GridColumnOptions({ headerName: 'اسم المصنع', field: 'factoryName' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: FactoryNameForOrderViewComponent,
    editDialogClassType: FactoryNameForOrderEditComponent,
    newDialogClassType: FactoryNameForOrderNewComponent,
  });
    constructor(
        injector: Injector,
        public factoryNameForOrderService: FactoryNameForOrderService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedFactoryNameForOrder = new FactoryNameForOrder();

    

    this.searchForm = this.formBuilder.group({
     	orderNumber : [],
	factoryName : []
    });

     
  }

  getFactoryNamesForOrdersPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<FactoryNameForOrder[]> => {
    return this.factoryNameForOrderService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.factoryNameForOrderService.delete(param.data.id)
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

