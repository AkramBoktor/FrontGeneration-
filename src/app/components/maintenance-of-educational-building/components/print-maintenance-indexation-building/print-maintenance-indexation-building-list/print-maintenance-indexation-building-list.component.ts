
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { PrintMaintenanceIndexationBuilding } from 'app/shared/models/print-maintenance-indexation-building';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { PrintMaintenanceIndexationBuildingEditComponent } from '../print-maintenance-indexation-building-edit/print-maintenance-indexation-building-edit.component';
import { PrintMaintenanceIndexationBuildingNewComponent } from '../print-maintenance-indexation-building-new/print-maintenance-indexation-building-new.component';
import { PrintMaintenanceIndexationBuildingViewComponent } from '../print-maintenance-indexation-building-view/print-maintenance-indexation-building-view.component';
import { PrintMaintenanceIndexationBuildingService } from '../shared/print-maintenance-indexation-building.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-print-maintenance-indexation-building-list',
  templateUrl: './print-maintenance-indexation-building-list.component.html',
  styleUrls: ['./print-maintenance-indexation-building-list.component.scss'],
  providers: []
})

export class PrintMaintenanceIndexationBuildingListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedPrintMaintenanceIndexationBuilding: PrintMaintenanceIndexationBuilding;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود المبنى', field: 'buildingCode' }),
	new GridColumnOptions({ headerName: ' سنه الخطه', field: 'yearPlan' }),
	new GridColumnOptions({ headerName: ' نوع الصيانه', field: 'maintenanceType' }),
	new GridColumnOptions({ headerName: 'نوع الطباعه', field: 'printType' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: PrintMaintenanceIndexationBuildingViewComponent,
    editDialogClassType: PrintMaintenanceIndexationBuildingEditComponent,
    newDialogClassType: PrintMaintenanceIndexationBuildingNewComponent,
  });
    constructor(
        injector: Injector,
        public printMaintenanceIndexationBuildingService: PrintMaintenanceIndexationBuildingService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedPrintMaintenanceIndexationBuilding = new PrintMaintenanceIndexationBuilding();

    

    this.searchForm = this.formBuilder.group({
     	buildingCode : [],
	yearPlan : [],
	maintenanceType : [],
	printType : []
    });

     
  }

  getPrintMaintenanceIndexationBuildingPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<PrintMaintenanceIndexationBuilding[]> => {
    return this.printMaintenanceIndexationBuildingService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.printMaintenanceIndexationBuildingService.delete(param.data.id)
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

