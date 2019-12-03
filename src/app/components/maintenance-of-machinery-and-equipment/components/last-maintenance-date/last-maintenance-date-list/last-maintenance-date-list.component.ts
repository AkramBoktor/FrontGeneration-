
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { LastMaintenanceDate } from 'app/shared/models/last-maintenance-date';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { LastMaintenanceDateEditComponent } from '../last-maintenance-date-edit/last-maintenance-date-edit.component';
import { LastMaintenanceDateNewComponent } from '../last-maintenance-date-new/last-maintenance-date-new.component';
import { LastMaintenanceDateViewComponent } from '../last-maintenance-date-view/last-maintenance-date-view.component';
import { LastMaintenanceDateService } from '../shared/last-maintenance-date.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-last-maintenance-date-list',
  templateUrl: './last-maintenance-date-list.component.html',
  styleUrls: ['./last-maintenance-date-list.component.scss'],
  providers: []
})

export class LastMaintenanceDateListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private buildingTypesService: LookupService;
private equipmentGroupsService: LookupService;
private equipmentTypesService: LookupService;

  
buildingTypeSelectOptions: MaterialSelectOptions;
equipmentGroupSelectOptions: MaterialSelectOptions;
equipmentTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('buildingType', { static: true }) BuildingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('equipmentGroup', { static: true }) EquipmentGroupSelectComponent: MaterialSelectComponent;
	@ViewChild('equipmentType', { static: true }) EquipmentTypeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedLastMaintenanceDate: LastMaintenanceDate;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم المعدة', field: 'equipmentNumber' }),
	new GridColumnOptions({ headerName: 'بند الصيانة الرأيسية', field: 'mainMaintenanceItem' }),
	new GridColumnOptions({ headerName: 'تاريخ اخر صيانة', field: 'lastDateMaintenance' }),
	new GridColumnOptions({ headerName: 'نوع المبنى', field: 'buildingType' }),
	new GridColumnOptions({ headerName: 'مجموعة المعدات', field: 'equipmentGroup' }),
	new GridColumnOptions({ headerName: 'نوع المعدة', field: 'equipmentType' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: LastMaintenanceDateViewComponent,
    editDialogClassType: LastMaintenanceDateEditComponent,
    newDialogClassType: LastMaintenanceDateNewComponent,
  });
    constructor(
        injector: Injector,
        public lastMaintenanceDateService: LastMaintenanceDateService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedLastMaintenanceDate = new LastMaintenanceDate();

    
	this.buildingTypeSelectOptions = new MaterialSelectOptions({
	 data: this.buildingTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع المبنى',
	});

	this.equipmentGroupSelectOptions = new MaterialSelectOptions({
	 data: this.equipmentGroupsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'مجموعة المعدات',
	});

	this.equipmentTypeSelectOptions = new MaterialSelectOptions({
	 data: this.equipmentTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع المعدة',
	});


    this.searchForm = this.formBuilder.group({
     	equipmentNumber : [],
	mainMaintenanceItem : [],
	lastDateMaintenance : [],
	buildingType : [],
	equipmentGroup : [],
	equipmentType : []
    });

     
  }

  getLastMaintenanceDatePaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<LastMaintenanceDate[]> => {
    return this.lastMaintenanceDateService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.lastMaintenanceDateService.delete(param.data.id)
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
this.equipmentGroupsService = new LookupService('equipmentgroups', this.http);
this.equipmentTypesService = new LookupService('equipmenttypes', this.http);
  }
}

