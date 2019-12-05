
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { MasterFile } from 'app/shared/models/master-file';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { MasterFileEditComponent } from '../master-file-edit/master-file-edit.component';
import { MasterFileNewComponent } from '../master-file-new/master-file-new.component';
import { MasterFileViewComponent } from '../master-file-view/master-file-view.component';
import { MasterFileService } from '../shared/master-file.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-master-file-list',
  templateUrl: './master-file-list.component.html',
  styleUrls: ['./master-file-list.component.scss'],
  providers: []
})

export class MasterFileListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private buildingTypesService: LookupService;
private warrantyConditionsService: LookupService;
private equipmentTypesService: LookupService;
private laboratoryTypesService: LookupService;
private areasService: LookupService;
private deviceTypesService: LookupService;

  
buildingTypeSelectOptions: MaterialSelectOptions;
warrantyConditionSelectOptions: MaterialSelectOptions;
equipmentTypeSelectOptions: MaterialSelectOptions;
laboratoryTypeSelectOptions: MaterialSelectOptions;
areaCodeSelectOptions: MaterialSelectOptions;
deviceTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('buildingType', { static: true }) BuildingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('warrantyCondition', { static: true }) WarrantyConditionSelectComponent: MaterialSelectComponent;
	@ViewChild('equipmentType', { static: true }) EquipmentTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('laboratoryType', { static: true }) LaboratoryTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('areaCode', { static: true }) AreaCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('deviceType', { static: true }) DeviceTypeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedMasterFile: MasterFile;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم المعمل', field: 'laboratoryNumber' }),
	new GridColumnOptions({ headerName: 'كود المبنى', field: 'buildingCode' }),
	new GridColumnOptions({ headerName: 'نوع المبني', field: 'buildingType' }),
	new GridColumnOptions({ headerName: 'حالة الضمان', field: 'warrantyCondition' }),
	new GridColumnOptions({ headerName: 'نوع  المعدة', field: 'equipmentType' }),
	new GridColumnOptions({ headerName: 'نوع المعمل', field: 'laboratoryType' }),
	new GridColumnOptions({ headerName: 'كود المنطقة', field: 'areaCode' }),
	new GridColumnOptions({ headerName: 'نوع الجهاز', field: 'deviceType' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: MasterFileViewComponent,
    editDialogClassType: MasterFileEditComponent,
    newDialogClassType: MasterFileNewComponent,
  });
    constructor(
        injector: Injector,
        public masterFileService: MasterFileService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedMasterFile = new MasterFile();

    
	this.buildingTypeSelectOptions = new MaterialSelectOptions({
	 data: this.buildingTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع المبني',
	});

	this.warrantyConditionSelectOptions = new MaterialSelectOptions({
	 data: this.warrantyConditionsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حالة الضمان',
	});

	this.equipmentTypeSelectOptions = new MaterialSelectOptions({
	 data: this.equipmentTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع  المعدة',
	});

	this.laboratoryTypeSelectOptions = new MaterialSelectOptions({
	 data: this.laboratoryTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع المعمل',
	});

	this.areaCodeSelectOptions = new MaterialSelectOptions({
	 data: this.areasService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المنطقة',
	});

	this.deviceTypeSelectOptions = new MaterialSelectOptions({
	 data: this.deviceTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الجهاز',
	});


    this.searchForm = this.formBuilder.group({
     	buildingCode : [],
	buildingType : [],
	warrantyCondition : [],
	equipmentType : [],
	laboratoryType : [],
	areaCode : [],
	deviceType : []
    });

     
  }

  getMasterFilesPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<MasterFile[]> => {
    return this.masterFileService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.masterFileService.delete(param.data.id)
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
this.warrantyConditionsService = new LookupService('warrantyconditions', this.http);
this.equipmentTypesService = new LookupService('equipmenttypes', this.http);
this.laboratoryTypesService = new LookupService('laboratorytypes', this.http);
this.areasService = new LookupService('areas', this.http);
this.deviceTypesService = new LookupService('devicetypes', this.http);
  }
}

