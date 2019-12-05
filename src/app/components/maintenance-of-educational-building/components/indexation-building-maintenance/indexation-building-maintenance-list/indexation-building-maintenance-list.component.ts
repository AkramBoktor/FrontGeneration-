
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { IndexationBuildingMaintenance } from 'app/shared/models/indexation-building-maintenance';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { IndexationBuildingMaintenanceEditComponent } from '../indexation-building-maintenance-edit/indexation-building-maintenance-edit.component';
import { IndexationBuildingMaintenanceNewComponent } from '../indexation-building-maintenance-new/indexation-building-maintenance-new.component';
import { IndexationBuildingMaintenanceViewComponent } from '../indexation-building-maintenance-view/indexation-building-maintenance-view.component';
import { IndexationBuildingMaintenanceService } from '../shared/indexation-building-maintenance.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-indexation-building-maintenance-list',
  templateUrl: './indexation-building-maintenance-list.component.html',
  styleUrls: ['./indexation-building-maintenance-list.component.scss'],
  providers: []
})

export class IndexationBuildingMaintenanceListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedIndexationBuildingMaintenance: IndexationBuildingMaintenance;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود البند', field: 'itemCode' }),
	new GridColumnOptions({ headerName: 'اسم البند', field: 'itemName' }),
	new GridColumnOptions({ headerName: 'الكمية', field: 'quantity' }),
	new GridColumnOptions({ headerName: 'السعر', field: 'price' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: IndexationBuildingMaintenanceViewComponent,
    editDialogClassType: IndexationBuildingMaintenanceEditComponent,
    newDialogClassType: IndexationBuildingMaintenanceNewComponent,
  });
    constructor(
        injector: Injector,
        public indexationBuildingMaintenanceService: IndexationBuildingMaintenanceService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedIndexationBuildingMaintenance = new IndexationBuildingMaintenance();

    

    this.searchForm = this.formBuilder.group({
     	buildingCode : [],
	yearPlan : [],
	maintenanceType : [],
	yearPricing : [],
	employmentType : []
    });

     
  }

  getIndexationBuildingMaintenancePaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<IndexationBuildingMaintenance[]> => {
    return this.indexationBuildingMaintenanceService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.indexationBuildingMaintenanceService.delete(param.data.id)
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

