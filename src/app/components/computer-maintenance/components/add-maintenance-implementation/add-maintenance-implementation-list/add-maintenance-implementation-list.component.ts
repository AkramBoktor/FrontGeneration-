
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { AddMaintenanceImplementation } from 'app/shared/models/add-maintenance-implementation';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { AddMaintenanceImplementationEditComponent } from '../add-maintenance-implementation-edit/add-maintenance-implementation-edit.component';
import { AddMaintenanceImplementationNewComponent } from '../add-maintenance-implementation-new/add-maintenance-implementation-new.component';
import { AddMaintenanceImplementationViewComponent } from '../add-maintenance-implementation-view/add-maintenance-implementation-view.component';
import { AddMaintenanceImplementationService } from '../shared/add-maintenance-implementation.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-add-maintenance-implementation-list',
  templateUrl: './add-maintenance-implementation-list.component.html',
  styleUrls: ['./add-maintenance-implementation-list.component.scss'],
  providers: []
})

export class AddMaintenanceImplementationListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private areasService: LookupService;
private workTypesService: LookupService;

  
regionSelectOptions: MaterialSelectOptions;
laboratoryTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('region', { static: true }) RegionSelectComponent: MaterialSelectComponent;
	@ViewChild('laboratoryType', { static: true }) LaboratoryTypeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedAddMaintenanceImplementation: AddMaintenanceImplementation;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'الفتره', field: 'period' }),
	new GridColumnOptions({ headerName: 'القائم بالصيانه', field: 'maintainer' }),
	new GridColumnOptions({ headerName: 'المبنى', field: 'building' }),
	new GridColumnOptions({ headerName: 'رقمه', field: 'code' }),
	new GridColumnOptions({ headerName: 'تاريخ المخطط', field: 'plannedDate' }),
	new GridColumnOptions({ headerName: 'تاريخ فعلى', field: 'actualDate' }),
	new GridColumnOptions({ headerName: 'حاله', field: 'case' }),
	new GridColumnOptions({ headerName: '(ع.ت( عدم تنفيذ', field: 'doNotExecute' }),
	new GridColumnOptions({ headerName: 'المنطقه', field: 'region' }),
	new GridColumnOptions({ headerName: 'نوع المعمل', field: 'laboratoryType' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: AddMaintenanceImplementationViewComponent,
    editDialogClassType: AddMaintenanceImplementationEditComponent,
    newDialogClassType: AddMaintenanceImplementationNewComponent,
  });
    constructor(
        injector: Injector,
        public addMaintenanceImplementationService: AddMaintenanceImplementationService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedAddMaintenanceImplementation = new AddMaintenanceImplementation();

    
	this.regionSelectOptions = new MaterialSelectOptions({
	 data: this.areasService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المنطقه',
	});

	this.laboratoryTypeSelectOptions = new MaterialSelectOptions({
	 data: this.workTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع المعمل',
	});


    this.searchForm = this.formBuilder.group({
     	period : [],
	maintainer : [],
	building : [],
	code : [],
	plannedDate : [],
	region : [],
	laboratoryType : []
    });

     
  }

  getAddMaintenanceImplementationPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<AddMaintenanceImplementation[]> => {
    return this.addMaintenanceImplementationService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.addMaintenanceImplementationService.delete(param.data.id)
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
this.workTypesService = new LookupService('worktypes', this.http);
  }
}

