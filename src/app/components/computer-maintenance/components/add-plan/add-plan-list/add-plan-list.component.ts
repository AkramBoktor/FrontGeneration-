
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { AddPlan } from 'app/shared/models/add-plan';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { AddPlanEditComponent } from '../add-plan-edit/add-plan-edit.component';
import { AddPlanNewComponent } from '../add-plan-new/add-plan-new.component';
import { AddPlanViewComponent } from '../add-plan-view/add-plan-view.component';
import { AddPlanService } from '../shared/add-plan.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-add-plan-list',
  templateUrl: './add-plan-list.component.html',
  styleUrls: ['./add-plan-list.component.scss'],
  providers: []
})

export class AddPlanListComponent extends AppBaseComponent implements OnInit {
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

  
  @Input() selectedAddPlan: AddPlan;
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
    viewDialogClassType: AddPlanViewComponent,
    editDialogClassType: AddPlanEditComponent,
    newDialogClassType: AddPlanNewComponent,
  });
    constructor(
        injector: Injector,
        public addPlanService: AddPlanService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedAddPlan = new AddPlan();

    
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

  getAddPlanPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<AddPlan[]> => {
    return this.addPlanService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.addPlanService.delete(param.data.id)
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

