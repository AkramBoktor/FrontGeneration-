
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { DeliveryWarehousesToKeepers } from 'app/shared/models/delivery-warehouses-to-keepers';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { DeliveryWarehousesToKeepersEditComponent } from '../delivery-warehouses-to-keepers-edit/delivery-warehouses-to-keepers-edit.component';
import { DeliveryWarehousesToKeepersNewComponent } from '../delivery-warehouses-to-keepers-new/delivery-warehouses-to-keepers-new.component';
import { DeliveryWarehousesToKeepersViewComponent } from '../delivery-warehouses-to-keepers-view/delivery-warehouses-to-keepers-view.component';
import { DeliveryWarehousesToKeepersService } from '../shared/delivery-warehouses-to-keepers.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-delivery-warehouses-to-keepers-list',
  templateUrl: './delivery-warehouses-to-keepers-list.component.html',
  styleUrls: ['./delivery-warehouses-to-keepers-list.component.scss'],
  providers: []
})

export class DeliveryWarehousesToKeepersListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedDeliveryWarehousesToKeepers: DeliveryWarehousesToKeepers;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم المخزن', field: 'storeNumber' }),
	new GridColumnOptions({ headerName: 'امين المخزن الحالي ', field: 'currentStorekeeper' }),
	new GridColumnOptions({ headerName: 'تاريخ الاستلام ', field: 'receivedDate' }),
	new GridColumnOptions({ headerName: 'رقم الموظف المستلم', field: 'employeeCode' }),
	new GridColumnOptions({ headerName: 'تاريخ التسليم', field: 'deliveryDate' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: DeliveryWarehousesToKeepersViewComponent,
    editDialogClassType: DeliveryWarehousesToKeepersEditComponent,
    newDialogClassType: DeliveryWarehousesToKeepersNewComponent,
  });
    constructor(
        injector: Injector,
        public deliveryWarehousesToKeepersService: DeliveryWarehousesToKeepersService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedDeliveryWarehousesToKeepers = new DeliveryWarehousesToKeepers();

    

    this.searchForm = this.formBuilder.group({
     	storeNumber : [],
	currentStorekeeper : [],
	employeeCode : [],
	deliveryDate : []
    });

     
  }

  getDeliveryWarehousesToKeepersPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<DeliveryWarehousesToKeepers[]> => {
    return this.deliveryWarehousesToKeepersService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.deliveryWarehousesToKeepersService.delete(param.data.id)
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

