
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { EquipmentMaintenancePlanData } from 'app/shared/models/equipment-maintenance-plan-data';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { EquipmentMaintenancePlanDataEditComponent } from '../equipment-maintenance-plan-data-edit/equipment-maintenance-plan-data-edit.component';
import { EquipmentMaintenancePlanDataNewComponent } from '../equipment-maintenance-plan-data-new/equipment-maintenance-plan-data-new.component';
import { EquipmentMaintenancePlanDataViewComponent } from '../equipment-maintenance-plan-data-view/equipment-maintenance-plan-data-view.component';
import { EquipmentMaintenancePlanDataService } from '../shared/equipment-maintenance-plan-data.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-equipment-maintenance-plan-data-list',
  templateUrl: './equipment-maintenance-plan-data-list.component.html',
  styleUrls: ['./equipment-maintenance-plan-data-list.component.scss'],
  providers: []
})

export class EquipmentMaintenancePlanDataListComponent extends AppBaseComponent implements OnInit {
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

  
  @Input() selectedEquipmentMaintenancePlanData: EquipmentMaintenancePlanData;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم المعدة', field: 'equipmentNumber' }),
	new GridColumnOptions({ headerName: 'بند الصيانة الرئيسية', field: 'mainMaintenanceItem' }),
	new GridColumnOptions({ headerName: 'مسلسل خطة صيانة معدات', field: 'equipmentMaintenancePlanSerial' }),
	new GridColumnOptions({ headerName: 'تاريخ الصيانة المخطط', field: 'plannedMaintenanceDate' }),
	new GridColumnOptions({ headerName: 'تاريخ الصيانة الفعلي', field: 'actualMaintenanceDate' }),
	new GridColumnOptions({ headerName: 'القائم بأعمال الصيانة', field: 'maintenanceIndividual' }),
	new GridColumnOptions({ headerName: 'رقم القائم بأعمال الصيانة', field: 'maintenanceIndividualNumber' }),
	new GridColumnOptions({ headerName: 'نوع المبنى', field: 'buildingType' }),
	new GridColumnOptions({ headerName: 'مجموعة المعدات', field: 'equipmentGroup' }),
	new GridColumnOptions({ headerName: 'نوع المعدة', field: 'equipmentType' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: EquipmentMaintenancePlanDataViewComponent,
    editDialogClassType: EquipmentMaintenancePlanDataEditComponent,
    newDialogClassType: EquipmentMaintenancePlanDataNewComponent,
  });
    constructor(
        injector: Injector,
        public equipmentMaintenancePlanDataService: EquipmentMaintenancePlanDataService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedEquipmentMaintenancePlanData = new EquipmentMaintenancePlanData();

    
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
	equipmentMaintenancePlanSerial : [],
	plannedMaintenanceDate : [],
	actualMaintenanceDate : [],
	maintenanceIndividual : [],
	maintenanceIndividualNumber : [],
	buildingType : [],
	equipmentGroup : [],
	equipmentType : []
    });

     
  }

  getEquipmentMaintenancePlanDataPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<EquipmentMaintenancePlanData[]> => {
    return this.equipmentMaintenancePlanDataService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.equipmentMaintenancePlanDataService.delete(param.data.id)
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

