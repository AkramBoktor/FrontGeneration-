
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { MasterFilesDepartment } from 'app/shared/models/master-files-department';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { MasterFilesDepartmentEditComponent } from '../master-files-department-edit/master-files-department-edit.component';
import { MasterFilesDepartmentNewComponent } from '../master-files-department-new/master-files-department-new.component';
import { MasterFilesDepartmentViewComponent } from '../master-files-department-view/master-files-department-view.component';
import { MasterFilesDepartmentService } from '../shared/master-files-department.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-master-files-department-list',
  templateUrl: './master-files-department-list.component.html',
  styleUrls: ['./master-files-department-list.component.scss'],
  providers: []
})

export class MasterFilesDepartmentListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private branchCodesService: LookupService;
private areasService: LookupService;
private equipmentCodesService: LookupService;
private deviceTypesService: LookupService;
private warrantyConditionsService: LookupService;

  
branchCodeorAdministrationSelectOptions: MaterialSelectOptions;
areaCodeSelectOptions: MaterialSelectOptions;
equimentTypeSelectOptions: MaterialSelectOptions;
deviceTypeSelectOptions: MaterialSelectOptions;
warrantyperiodSelectOptions: MaterialSelectOptions;

  
	@ViewChild('branchCodeorAdministration', { static: true }) BranchCodeorAdministrationSelectComponent: MaterialSelectComponent;
	@ViewChild('areaCode', { static: true }) AreaCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('equimentType', { static: true }) EquimentTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('deviceType', { static: true }) DeviceTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('warrantyperiod', { static: true }) WarrantyperiodSelectComponent: MaterialSelectComponent;

  
  @Input() selectedMasterFilesDepartment: MasterFilesDepartment;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم تليفون الغرفه', field: 'roomPhoneNumber' }),
	new GridColumnOptions({ headerName: 'رقم الجهاز', field: 'deviceNumber' }),
	new GridColumnOptions({ headerName: 'جهه الصنع', field: 'manufacturer' }),
	new GridColumnOptions({ headerName: 'تاريخ بدايه التشغيل', field: 'startDate' }),
	new GridColumnOptions({ headerName: 'الشركه المورده', field: 'supplierCompany' }),
	new GridColumnOptions({ headerName: 'كود الفرع او الاداره', field: 'branchCodeorAdministration' }),
	new GridColumnOptions({ headerName: 'كود المنطقه', field: 'areaCode' }),
	new GridColumnOptions({ headerName: 'نوع المعده', field: 'equimentType' }),
	new GridColumnOptions({ headerName: 'نوع الجهاز', field: 'deviceType' }),
	new GridColumnOptions({ headerName: 'فتره الضمان', field: 'warrantyperiod' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: MasterFilesDepartmentViewComponent,
    editDialogClassType: MasterFilesDepartmentEditComponent,
    newDialogClassType: MasterFilesDepartmentNewComponent,
  });
    constructor(
        injector: Injector,
        public masterFilesDepartmentService: MasterFilesDepartmentService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedMasterFilesDepartment = new MasterFilesDepartment();

    
	this.branchCodeorAdministrationSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الفرع او الاداره',
	});

	this.areaCodeSelectOptions = new MaterialSelectOptions({
	 data: this.areasService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المنطقه',
	});

	this.equimentTypeSelectOptions = new MaterialSelectOptions({
	 data: this.equipmentCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع المعده',
	});

	this.deviceTypeSelectOptions = new MaterialSelectOptions({
	 data: this.deviceTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الجهاز',
	});

	this.warrantyperiodSelectOptions = new MaterialSelectOptions({
	 data: this.warrantyConditionsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'فتره الضمان',
	});


    this.searchForm = this.formBuilder.group({
     	roomPhoneNumber : [],
	deviceNumber : [],
	manufacturer : [],
	startDate : [],
	supplierCompany : [],
	branchCodeorAdministration : [],
	areaCode : [],
	equimentType : [],
	deviceType : [],
	warrantyperiod : []
    });

     
  }

  getMasterFilesDepartmentPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<MasterFilesDepartment[]> => {
    return this.masterFilesDepartmentService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.masterFilesDepartmentService.delete(param.data.id)
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
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.areasService = new LookupService('areas', this.http);
this.equipmentCodesService = new LookupService('equipmentcodes', this.http);
this.deviceTypesService = new LookupService('devicetypes', this.http);
this.warrantyConditionsService = new LookupService('warrantyconditions', this.http);
  }
}

