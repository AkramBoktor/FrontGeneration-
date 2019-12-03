
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { PeriodicMaintenanceData } from 'app/shared/models/periodic-maintenance-data';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { PeriodicMaintenanceDataEditComponent } from '../periodic-maintenance-data-edit/periodic-maintenance-data-edit.component';
import { PeriodicMaintenanceDataNewComponent } from '../periodic-maintenance-data-new/periodic-maintenance-data-new.component';
import { PeriodicMaintenanceDataViewComponent } from '../periodic-maintenance-data-view/periodic-maintenance-data-view.component';
import { PeriodicMaintenanceDataService } from '../shared/periodic-maintenance-data.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-periodic-maintenance-data-list',
  templateUrl: './periodic-maintenance-data-list.component.html',
  styleUrls: ['./periodic-maintenance-data-list.component.scss'],
  providers: []
})

export class PeriodicMaintenanceDataListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private buildingTypesService: LookupService;
private workshopNumbersService: LookupService;
private maintenanceStatusesService: LookupService;

  
buildingTypeSelectOptions: MaterialSelectOptions;
workshopNumberSelectOptions: MaterialSelectOptions;
maintenanceStatusSelectOptions: MaterialSelectOptions;

  
	@ViewChild('buildingType', { static: true }) BuildingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('workshopNumber', { static: true }) WorkshopNumberSelectComponent: MaterialSelectComponent;
	@ViewChild('maintenanceStatus', { static: true }) MaintenanceStatusSelectComponent: MaterialSelectComponent;

  
  @Input() selectedPeriodicMaintenanceData: PeriodicMaintenanceData;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود المبنى', field: 'buildingCode' }),
	new GridColumnOptions({ headerName: 'تاريخ مخطط الصيانه', field: 'dateofMaintenancePlan' }),
	new GridColumnOptions({ headerName: 'تاريخ فعلى الصيانه', field: 'dateofActualMaintenance' }),
	new GridColumnOptions({ headerName: 'نوع المبنى', field: 'buildingType' }),
	new GridColumnOptions({ headerName: 'رقم الورشه', field: 'workshopNumber' }),
	new GridColumnOptions({ headerName: 'حاله الصيانه', field: 'maintenanceStatus' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: PeriodicMaintenanceDataViewComponent,
    editDialogClassType: PeriodicMaintenanceDataEditComponent,
    newDialogClassType: PeriodicMaintenanceDataNewComponent,
  });
    constructor(
        injector: Injector,
        public periodicMaintenanceDataService: PeriodicMaintenanceDataService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedPeriodicMaintenanceData = new PeriodicMaintenanceData();

    
	this.buildingTypeSelectOptions = new MaterialSelectOptions({
	 data: this.buildingTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع المبنى',
	});

	this.workshopNumberSelectOptions = new MaterialSelectOptions({
	 data: this.workshopNumbersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'رقم الورشه',
	});

	this.maintenanceStatusSelectOptions = new MaterialSelectOptions({
	 data: this.maintenanceStatusesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حاله الصيانه',
	});


    this.searchForm = this.formBuilder.group({
     	buildingCode : [],
	dateofMaintenancePlan : [],
	dateofActualMaintenance : [],
	buildingType : [],
	workshopNumber : [],
	maintenanceStatus : []
    });

     
  }

  getPeriodicMaintenanceDataPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<PeriodicMaintenanceData[]> => {
    return this.periodicMaintenanceDataService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.periodicMaintenanceDataService.delete(param.data.id)
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
    this.buildingTypesService = new LookupService('buildingtypes', this.http);
this.workshopNumbersService = new LookupService('workshopnumbers', this.http);
this.maintenanceStatusesService = new LookupService('maintenancestatuses', this.http);
  }
}

