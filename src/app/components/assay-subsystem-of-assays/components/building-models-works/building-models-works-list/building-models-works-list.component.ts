
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { BuildingModelsWorks } from 'app/shared/models/building-models-works';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { BuildingModelsWorksEditComponent } from '../building-models-works-edit/building-models-works-edit.component';
import { BuildingModelsWorksNewComponent } from '../building-models-works-new/building-models-works-new.component';
import { BuildingModelsWorksViewComponent } from '../building-models-works-view/building-models-works-view.component';
import { BuildingModelsWorksService } from '../shared/building-models-works.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-building-models-works-list',
  templateUrl: './building-models-works-list.component.html',
  styleUrls: ['./building-models-works-list.component.scss'],
  providers: []
})

export class BuildingModelsWorksListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private workTypesService: LookupService;
private itemCodesService: LookupService;
private measurementUnitsService: LookupService;

  
workTypeSelectOptions: MaterialSelectOptions;
itemCodeSelectOptions: MaterialSelectOptions;
unitCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('workType', { static: true }) WorkTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('itemCode', { static: true }) ItemCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('unitCode', { static: true }) UnitCodeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedBuildingModelsWorks: BuildingModelsWorks;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود النموذج', field: 'modelCode' }),
	new GridColumnOptions({ headerName: 'نوع النشاط', field: 'activityType' }),
	new GridColumnOptions({ headerName: 'اسم البند', field: 'itemName' }),
	new GridColumnOptions({ headerName: 'الكمية', field: 'amount' }),
	new GridColumnOptions({ headerName: 'نوع العمل', field: 'workType' }),
	new GridColumnOptions({ headerName: 'كود البند', field: 'itemCode' }),
	new GridColumnOptions({ headerName: 'الوحدة', field: 'unitCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: BuildingModelsWorksViewComponent,
    editDialogClassType: BuildingModelsWorksEditComponent,
    newDialogClassType: BuildingModelsWorksNewComponent,
  });
    constructor(
        injector: Injector,
        public buildingModelsWorksService: BuildingModelsWorksService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedBuildingModelsWorks = new BuildingModelsWorks();

    
	this.workTypeSelectOptions = new MaterialSelectOptions({
	 data: this.workTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع العمل',
	});

	this.itemCodeSelectOptions = new MaterialSelectOptions({
	 data: this.itemCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود البند',
	});

	this.unitCodeSelectOptions = new MaterialSelectOptions({
	 data: this.measurementUnitsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الوحدة',
	});


    this.searchForm = this.formBuilder.group({
     	modelCode : [],
	activityType : [],
	itemName : [],
	amount : [],
	workType : [],
	itemCode : [],
	unitCode : []
    });

     
  }

  getBuildingModelsWorksPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<BuildingModelsWorks[]> => {
    return this.buildingModelsWorksService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.buildingModelsWorksService.delete(param.data.id)
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
    this.workTypesService = new LookupService('worktypes', this.http);
this.itemCodesService = new LookupService('itemcodes', this.http);
this.measurementUnitsService = new LookupService('measurementunits', this.http);
  }
}

