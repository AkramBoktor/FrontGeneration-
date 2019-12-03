
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { AddTheImplementationOfAirConditioningMaintenance } from 'app/shared/models/add-the-implementation-of-air-conditioning-maintenance';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { AddTheImplementationOfAirConditioningMaintenanceEditComponent } from '../add-the-implementation-of-air-conditioning-maintenance-edit/add-the-implementation-of-air-conditioning-maintenance-edit.component';
import { AddTheImplementationOfAirConditioningMaintenanceNewComponent } from '../add-the-implementation-of-air-conditioning-maintenance-new/add-the-implementation-of-air-conditioning-maintenance-new.component';
import { AddTheImplementationOfAirConditioningMaintenanceViewComponent } from '../add-the-implementation-of-air-conditioning-maintenance-view/add-the-implementation-of-air-conditioning-maintenance-view.component';
import { AddTheImplementationOfAirConditioningMaintenanceService } from '../shared/add-the-implementation-of-air-conditioning-maintenance.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-add-the-implementation-of-air-conditioning-maintenance-list',
  templateUrl: './add-the-implementation-of-air-conditioning-maintenance-list.component.html',
  styleUrls: ['./add-the-implementation-of-air-conditioning-maintenance-list.component.scss'],
  providers: []
})

export class AddTheImplementationOfAirConditioningMaintenanceListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private areasService: LookupService;
private laboratoryTypesService: LookupService;

  
regionSelectOptions: MaterialSelectOptions;
laboratoryTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('region', { static: true }) RegionSelectComponent: MaterialSelectComponent;
	@ViewChild('laboratoryType', { static: true }) LaboratoryTypeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedAddTheImplementationOfAirConditioningMaintenance: AddTheImplementationOfAirConditioningMaintenance;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'الفتره', field: 'period' }),
	new GridColumnOptions({ headerName: 'القائم بالصيانه', field: 'maintainer' }),
	new GridColumnOptions({ headerName: 'المبنى', field: 'building' }),
	new GridColumnOptions({ headerName: 'رقمه', field: 'code' }),
	new GridColumnOptions({ headerName: 'تاريخ المخطط', field: 'plannedDate' }),
	new GridColumnOptions({ headerName: 'تاريخ فعلى', field: 'actualDate' }),
	new GridColumnOptions({ headerName: 'المنطقه', field: 'region' }),
	new GridColumnOptions({ headerName: 'نوع المعمل', field: 'laboratoryType' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: AddTheImplementationOfAirConditioningMaintenanceViewComponent,
    editDialogClassType: AddTheImplementationOfAirConditioningMaintenanceEditComponent,
    newDialogClassType: AddTheImplementationOfAirConditioningMaintenanceNewComponent,
  });
    constructor(
        injector: Injector,
        public addTheImplementationOfAirConditioningMaintenanceService: AddTheImplementationOfAirConditioningMaintenanceService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedAddTheImplementationOfAirConditioningMaintenance = new AddTheImplementationOfAirConditioningMaintenance();

    
	this.regionSelectOptions = new MaterialSelectOptions({
	 data: this.areasService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المنطقه',
	});

	this.laboratoryTypeSelectOptions = new MaterialSelectOptions({
	 data: this.laboratoryTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع المعمل',
	});


    this.searchForm = this.formBuilder.group({
     	period : [],
	maintainer : [],
	building : [],
	code : [],
	plannedDate : [],
	region : [],
	laboratoryType : []
    });

     
  }

  getAddTheImplementationOfAirConditioningMaintenancePaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<AddTheImplementationOfAirConditioningMaintenance[]> => {
    return this.addTheImplementationOfAirConditioningMaintenanceService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.addTheImplementationOfAirConditioningMaintenanceService.delete(param.data.id)
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
this.laboratoryTypesService = new LookupService('laboratorytypes', this.http);
  }
}

