
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { HealthUnitData } from 'app/shared/models/health-unit-data';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { HealthUnitDataEditComponent } from '../health-unit-data-edit/health-unit-data-edit.component';
import { HealthUnitDataNewComponent } from '../health-unit-data-new/health-unit-data-new.component';
import { HealthUnitDataViewComponent } from '../health-unit-data-view/health-unit-data-view.component';
import { HealthUnitDataService } from '../shared/health-unit-data.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-health-unit-data-list',
  templateUrl: './health-unit-data-list.component.html',
  styleUrls: ['./health-unit-data-list.component.scss'],
  providers: []
})

export class HealthUnitDataListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
private sectionsOrCentersService: LookupService;
private villagesService: LookupService;
private entityNamesService: LookupService;
private governoratesService: LookupService;

  
governorateCodeSelectOptions: MaterialSelectOptions;
departmentSelectOptions: MaterialSelectOptions;
villageSelectOptions: MaterialSelectOptions;
healthDirectorateSelectOptions: MaterialSelectOptions;
healthManagementSelectOptions: MaterialSelectOptions;

  
	@ViewChild('governorateCode', { static: true }) GovernorateCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('department', { static: true }) DepartmentSelectComponent: MaterialSelectComponent;
	@ViewChild('village', { static: true }) VillageSelectComponent: MaterialSelectComponent;
	@ViewChild('healthDirectorate', { static: true }) HealthDirectorateSelectComponent: MaterialSelectComponent;
	@ViewChild('healthManagement', { static: true }) HealthManagementSelectComponent: MaterialSelectComponent;

  
  @Input() selectedHealthUnitData: HealthUnitData;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'نوع الوحدة فرعي', field: 'subUnitType' }),
	new GridColumnOptions({ headerName: 'رقم الوحدة', field: 'unitCode' }),
	new GridColumnOptions({ headerName: 'اسم الوحدة', field: 'unitName' }),
	new GridColumnOptions({ headerName: 'عنوان الوحدة', field: 'unitAddress' }),
	new GridColumnOptions({ headerName: 'هاتف الوحدة', field: 'unitPhone' }),
	new GridColumnOptions({ headerName: 'الملكية', field: 'property' }),
	new GridColumnOptions({ headerName: 'عدد الاسرة', field: 'familyNumber' }),
	new GridColumnOptions({ headerName: 'رقم المحافظة', field: 'governorateCode' }),
	new GridColumnOptions({ headerName: 'قسم', field: 'department' }),
	new GridColumnOptions({ headerName: 'القرية', field: 'village' }),
	new GridColumnOptions({ headerName: 'التابع', field: 'follower' }),
	new GridColumnOptions({ headerName: 'المديرية الصحية', field: 'healthDirectorate' }),
	new GridColumnOptions({ headerName: 'الادارة الصحية', field: 'healthManagement' }),
	new GridColumnOptions({ headerName: 'نوع الوحدة رئيسي', field: 'mainUnitType' }),
	new GridColumnOptions({ headerName: 'نوع المشروع', field: 'projectType' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: HealthUnitDataViewComponent,
    editDialogClassType: HealthUnitDataEditComponent,
    newDialogClassType: HealthUnitDataNewComponent,
  });
    constructor(
        injector: Injector,
        public healthUnitDataService: HealthUnitDataService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedHealthUnitData = new HealthUnitData();

    
	this.governorateCodeSelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'رقم المحافظة',
	});

	this.departmentSelectOptions = new MaterialSelectOptions({
	 data: this.sectionsOrCentersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'قسم',
	});

	this.villageSelectOptions = new MaterialSelectOptions({
	 data: this.villagesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'القرية',
	});

	this.healthDirectorateSelectOptions = new MaterialSelectOptions({
	 data: this.entityNamesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المديرية الصحية',
	});

	this.healthManagementSelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الادارة الصحية',
	});


    this.searchForm = this.formBuilder.group({
     	unitCode : [],
	unitName : [],
	property : [],
	governorateCode : [],
	department : [],
	village : [],
	healthDirectorate : [],
	healthManagement : []
    });

     
  }

  getHealthUnitDataPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<HealthUnitData[]> => {
    return this.healthUnitDataService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.healthUnitDataService.delete(param.data.id)
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
    this.governoratesService = new LookupService('governorates', this.http);
this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
this.villagesService = new LookupService('villages', this.http);
this.entityNamesService = new LookupService('entitynames', this.http);
this.governoratesService = new LookupService('governorates', this.http);
  }
}

