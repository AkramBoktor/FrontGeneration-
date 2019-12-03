
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { MachineData } from 'app/shared/models/machine-data';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { MachineDataEditComponent } from '../machine-data-edit/machine-data-edit.component';
import { MachineDataNewComponent } from '../machine-data-new/machine-data-new.component';
import { MachineDataViewComponent } from '../machine-data-view/machine-data-view.component';
import { MachineDataService } from '../shared/machine-data.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-machine-data-list',
  templateUrl: './machine-data-list.component.html',
  styleUrls: ['./machine-data-list.component.scss'],
  providers: []
})

export class MachineDataListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private buildingTypesService: LookupService;
private primaryGroupsService: LookupService;
private equipmentGroupsService: LookupService;
private equipmentTypesService: LookupService;
private manufacturersService: LookupService;
private regionalCenterCodesService: LookupService;
private areasService: LookupService;
private workshopNumbersService: LookupService;

  
buildingTypeSelectOptions: MaterialSelectOptions;
primaryGroupSelectOptions: MaterialSelectOptions;
equipmentGroupSelectOptions: MaterialSelectOptions;
equipmentTypeSelectOptions: MaterialSelectOptions;
manufacturerSelectOptions: MaterialSelectOptions;
territoryCenterSelectOptions: MaterialSelectOptions;
regionSelectOptions: MaterialSelectOptions;
workshopTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('buildingType', { static: true }) BuildingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('primaryGroup', { static: true }) PrimaryGroupSelectComponent: MaterialSelectComponent;
	@ViewChild('equipmentGroup', { static: true }) EquipmentGroupSelectComponent: MaterialSelectComponent;
	@ViewChild('equipmentType', { static: true }) EquipmentTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('manufacturer', { static: true }) ManufacturerSelectComponent: MaterialSelectComponent;
	@ViewChild('territoryCenter', { static: true }) TerritoryCenterSelectComponent: MaterialSelectComponent;
	@ViewChild('region', { static: true }) RegionSelectComponent: MaterialSelectComponent;
	@ViewChild('workshopType', { static: true }) WorkshopTypeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedMachineData: MachineData;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم الدور', field: 'floorNumber' }),
	new GridColumnOptions({ headerName: 'مسلسل الملحق', field: 'extensionSerial' }),
	new GridColumnOptions({ headerName: 'كود المبنى', field: 'buildingCode' }),
	new GridColumnOptions({ headerName: 'الشركة الموردة', field: 'vendor' }),
	new GridColumnOptions({ headerName: 'فترة الضمان بالسنوات', field: 'warrantyPeriodInYears' }),
	new GridColumnOptions({ headerName: 'الطراز', field: 'equipmentModel' }),
	new GridColumnOptions({ headerName: 'رقم المعدة', field: 'equipmentNumber' }),
	new GridColumnOptions({ headerName: 'تاريخ بداية التشغيل', field: 'operationBeganingdate' }),
	new GridColumnOptions({ headerName: 'تاريخ التوريد', field: 'vendingDate' }),
	new GridColumnOptions({ headerName: 'نوع المبنى', field: 'buildingType' }),
	new GridColumnOptions({ headerName: 'المنطقة', field: 'region' }),
	new GridColumnOptions({ headerName: 'المركز الاقليمي', field: 'territoryCenter' }),
	new GridColumnOptions({ headerName: 'نوع الورشة', field: 'workshopType' }),
	new GridColumnOptions({ headerName: 'جهة الصنع', field: 'manufacturer' }),
	new GridColumnOptions({ headerName: 'نوع المعدة', field: 'equipmentType' }),
	new GridColumnOptions({ headerName: 'مجموعة المعدات', field: 'equipmentGroup' }),
	new GridColumnOptions({ headerName: 'المجموعة الرأيسية', field: 'primaryGroup' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: MachineDataViewComponent,
    editDialogClassType: MachineDataEditComponent,
    newDialogClassType: MachineDataNewComponent,
  });
    constructor(
        injector: Injector,
        public machineDataService: MachineDataService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedMachineData = new MachineData();

    
	this.buildingTypeSelectOptions = new MaterialSelectOptions({
	 data: this.buildingTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع المبنى',
	});

	this.primaryGroupSelectOptions = new MaterialSelectOptions({
	 data: this.primaryGroupsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المجموعة الرأيسية',
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

	this.manufacturerSelectOptions = new MaterialSelectOptions({
	 data: this.manufacturersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'جهة الصنع',
	});

	this.territoryCenterSelectOptions = new MaterialSelectOptions({
	 data: this.regionalCenterCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المركز الاقليمي',
	});

	this.regionSelectOptions = new MaterialSelectOptions({
	 data: this.areasService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المنطقة',
	});

	this.workshopTypeSelectOptions = new MaterialSelectOptions({
	 data: this.workshopNumbersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الورشة',
	});


    this.searchForm = this.formBuilder.group({
     	equipmentNumber : [],
	equipmentModel : [],
	operationBeganingdate : [],
	warrantyPeriodInYears : [],
	vendor : [],
	buildingCode : [],
	extensionSerial : [],
	floorNumber : [],
	vendingDate : [],
	buildingType : [],
	primaryGroup : [],
	equipmentGroup : [],
	equipmentType : [],
	manufacturer : [],
	territoryCenter : [],
	region : [],
	workshopType : []
    });

     
  }

  getMachineDataPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<MachineData[]> => {
    return this.machineDataService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.machineDataService.delete(param.data.id)
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
this.primaryGroupsService = new LookupService('primarygroups', this.http);
this.equipmentGroupsService = new LookupService('equipmentgroups', this.http);
this.equipmentTypesService = new LookupService('equipmenttypes', this.http);
this.manufacturersService = new LookupService('manufacturers', this.http);
this.regionalCenterCodesService = new LookupService('regionalcentercodes', this.http);
this.areasService = new LookupService('areas', this.http);
this.workshopNumbersService = new LookupService('workshopnumbers', this.http);
  }
}

