
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { AddPlanConditioning } from 'app/shared/models/add-plan-conditioning';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { AddPlanConditioningEditComponent } from '../add-plan-conditioning-edit/add-plan-conditioning-edit.component';
import { AddPlanConditioningNewComponent } from '../add-plan-conditioning-new/add-plan-conditioning-new.component';
import { AddPlanConditioningViewComponent } from '../add-plan-conditioning-view/add-plan-conditioning-view.component';
import { AddPlanConditioningService } from '../shared/add-plan-conditioning.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-add-plan-conditioning-list',
  templateUrl: './add-plan-conditioning-list.component.html',
  styleUrls: ['./add-plan-conditioning-list.component.scss'],
  providers: []
})

export class AddPlanConditioningListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private areasService: LookupService;
private jobTypesService: LookupService;
private buildingTypesService: LookupService;

  
regionSelectOptions: MaterialSelectOptions;
maintenanceDescriptionSelectOptions: MaterialSelectOptions;
buildingTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('region', { static: true }) RegionSelectComponent: MaterialSelectComponent;
	@ViewChild('maintenanceDescription', { static: true }) MaintenanceDescriptionSelectComponent: MaterialSelectComponent;
	@ViewChild('buildingType', { static: true }) BuildingTypeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedAddPlanConditioning: AddPlanConditioning;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'الفتره', field: 'period' }),
	new GridColumnOptions({ headerName: 'القائم بالصيانه', field: 'maintainer' }),
	new GridColumnOptions({ headerName: 'المبنى', field: 'building' }),
	new GridColumnOptions({ headerName: 'عدد المبانى', field: 'buildingNumber' }),
	new GridColumnOptions({ headerName: 'تاريخ المخطط', field: 'plannedDate' }),
	new GridColumnOptions({ headerName: 'المنطقه', field: 'region' }),
	new GridColumnOptions({ headerName: 'صفه قائم الصيانه', field: 'maintenanceDescription' }),
	new GridColumnOptions({ headerName: 'نوع المبنى', field: 'buildingType' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: AddPlanConditioningViewComponent,
    editDialogClassType: AddPlanConditioningEditComponent,
    newDialogClassType: AddPlanConditioningNewComponent,
  });
    constructor(
        injector: Injector,
        public addPlanConditioningService: AddPlanConditioningService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedAddPlanConditioning = new AddPlanConditioning();

    
	this.regionSelectOptions = new MaterialSelectOptions({
	 data: this.areasService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المنطقه',
	});

	this.maintenanceDescriptionSelectOptions = new MaterialSelectOptions({
	 data: this.jobTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'صفه قائم الصيانه',
	});

	this.buildingTypeSelectOptions = new MaterialSelectOptions({
	 data: this.buildingTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع المبنى',
	});


    this.searchForm = this.formBuilder.group({
     	period : [],
	maintainer : [],
	building : [],
	buildingNumber : [],
	plannedDate : [],
	region : [],
	maintenanceDescription : [],
	buildingType : []
    });

     
  }

  getAddPlanConditioningPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<AddPlanConditioning[]> => {
    return this.addPlanConditioningService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.addPlanConditioningService.delete(param.data.id)
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
this.jobTypesService = new LookupService('jobtypes', this.http);
this.buildingTypesService = new LookupService('buildingtypes', this.http);
  }
}

