
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { Malfunction } from 'app/shared/models/malfunction';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { MalfunctionEditComponent } from '../malfunction-edit/malfunction-edit.component';
import { MalfunctionNewComponent } from '../malfunction-new/malfunction-new.component';
import { MalfunctionViewComponent } from '../malfunction-view/malfunction-view.component';
import { MalfunctionService } from '../shared/malfunction.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-malfunction-list',
  templateUrl: './malfunction-list.component.html',
  styleUrls: ['./malfunction-list.component.scss'],
  providers: []
})

export class MalfunctionListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private buildingTypesService: LookupService;
private laboratoryTypesService: LookupService;
private equipmentCodesService: LookupService;
private deviceTypesService: LookupService;

  
buildingTypeSelectOptions: MaterialSelectOptions;
laboratoryTypeSelectOptions: MaterialSelectOptions;
equipmentCodeSelectOptions: MaterialSelectOptions;
deviceTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('buildingType', { static: true }) BuildingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('laboratoryType', { static: true }) LaboratoryTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('equipmentCode', { static: true }) EquipmentCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('deviceType', { static: true }) DeviceTypeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedMalfunction: Malfunction;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود المبنى', field: 'buildingCode' }),
	new GridColumnOptions({ headerName: 'رقم المعمل', field: 'laboratoryNumber' }),
	new GridColumnOptions({ headerName: 'رقم الجهاز', field: 'deviceNumber' }),
	new GridColumnOptions({ headerName: 'تاريخ العطل', field: 'malfunctionDate' }),
	new GridColumnOptions({ headerName: 'عدد لاجزاء العاطله', field: 'malfunctionPartNumber' }),
	new GridColumnOptions({ headerName: 'مسلسل الجزء العاطل', field: 'malfunctionPartSerial' }),
	new GridColumnOptions({ headerName: 'نوع المبني', field: 'buildingType' }),
	new GridColumnOptions({ headerName: 'نوع المعمل', field: 'laboratoryType' }),
	new GridColumnOptions({ headerName: 'كود المعده', field: 'equipmentCode' }),
	new GridColumnOptions({ headerName: 'نوع الجهاز', field: 'deviceType' }),
	new GridColumnOptions({ headerName: 'الجزء العاطل', field: 'malfunctionPart' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: MalfunctionViewComponent,
    editDialogClassType: MalfunctionEditComponent,
    newDialogClassType: MalfunctionNewComponent,
  });
    constructor(
        injector: Injector,
        public malfunctionService: MalfunctionService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedMalfunction = new Malfunction();

    
	this.buildingTypeSelectOptions = new MaterialSelectOptions({
	 data: this.buildingTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع المبني',
	});

	this.laboratoryTypeSelectOptions = new MaterialSelectOptions({
	 data: this.laboratoryTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع المعمل',
	});

	this.equipmentCodeSelectOptions = new MaterialSelectOptions({
	 data: this.equipmentCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المعده',
	});

	this.deviceTypeSelectOptions = new MaterialSelectOptions({
	 data: this.deviceTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الجهاز',
	});


    this.searchForm = this.formBuilder.group({
     	buildingCode : [],
	laboratoryNumber : [],
	deviceNumber : [],
	malfunctionDateFrom : [],
	malfunctionDateTo : [],
	buildingType : [],
	laboratoryType : [],
	equipmentCode : [],
	deviceType : []
    });

     
  }

  getMalfunctionsPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<Malfunction[]> => {
    return this.malfunctionService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.malfunctionService.delete(param.data.id)
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
this.laboratoryTypesService = new LookupService('laboratorytypes', this.http);
this.equipmentCodesService = new LookupService('equipmentcodes', this.http);
this.deviceTypesService = new LookupService('devicetypes', this.http);
  }
}

