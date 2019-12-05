
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { MinistryUnitData } from 'app/shared/models/ministry-unit-data';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { MinistryUnitDataEditComponent } from '../ministry-unit-data-edit/ministry-unit-data-edit.component';
import { MinistryUnitDataNewComponent } from '../ministry-unit-data-new/ministry-unit-data-new.component';
import { MinistryUnitDataViewComponent } from '../ministry-unit-data-view/ministry-unit-data-view.component';
import { MinistryUnitDataService } from '../shared/ministry-unit-data.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-ministry-unit-data-list',
  templateUrl: './ministry-unit-data-list.component.html',
  styleUrls: ['./ministry-unit-data-list.component.scss'],
  providers: []
})

export class MinistryUnitDataListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private ministriesService: LookupService;
private branchCodesService: LookupService;
private sectionsOrCentersService: LookupService;
private unitTypesService: LookupService;

  
ministryTypeSelectOptions: MaterialSelectOptions;
branchCodeSelectOptions: MaterialSelectOptions;
departmentCodeSelectOptions: MaterialSelectOptions;
unitTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('ministryType', { static: true }) MinistryTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('departmentCode', { static: true }) DepartmentCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('unitType', { static: true }) UnitTypeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedMinistryUnitData: MinistryUnitData;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم الوحدة', field: 'unitCode' }),
	new GridColumnOptions({ headerName: 'اسم الوحدة', field: 'unitName' }),
	new GridColumnOptions({ headerName: 'عنوان الوحدة', field: 'unitAddress' }),
	new GridColumnOptions({ headerName: 'المقر', field: 'headquarters' }),
	new GridColumnOptions({ headerName: 'نوع الوزارة', field: 'ministryType' }),
	new GridColumnOptions({ headerName: 'كود الفرع', field: 'branchCode' }),
	new GridColumnOptions({ headerName: 'القسم', field: 'departmentCode' }),
	new GridColumnOptions({ headerName: 'نوع الوحدة', field: 'unitType' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: MinistryUnitDataViewComponent,
    editDialogClassType: MinistryUnitDataEditComponent,
    newDialogClassType: MinistryUnitDataNewComponent,
  });
    constructor(
        injector: Injector,
        public ministryUnitDataService: MinistryUnitDataService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedMinistryUnitData = new MinistryUnitData();

    
	this.ministryTypeSelectOptions = new MaterialSelectOptions({
	 data: this.ministriesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الوزارة',
	});

	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الفرع',
	});

	this.departmentCodeSelectOptions = new MaterialSelectOptions({
	 data: this.sectionsOrCentersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'القسم',
	});

	this.unitTypeSelectOptions = new MaterialSelectOptions({
	 data: this.unitTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الوحدة',
	});


    this.searchForm = this.formBuilder.group({
     	unitCode : [],
	unitName : [],
	unitAddress : [],
	headquarters : [],
	ministryType : [],
	branchCode : [],
	departmentCode : [],
	unitType : []
    });

     
  }

  getMinistryUnitDataPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<MinistryUnitData[]> => {
    return this.ministryUnitDataService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.ministryUnitDataService.delete(param.data.id)
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
    this.ministriesService = new LookupService('ministries', this.http);
this.branchCodesService = new LookupService('branchcodes', this.http);
this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
this.unitTypesService = new LookupService('unittypes', this.http);
  }
}

