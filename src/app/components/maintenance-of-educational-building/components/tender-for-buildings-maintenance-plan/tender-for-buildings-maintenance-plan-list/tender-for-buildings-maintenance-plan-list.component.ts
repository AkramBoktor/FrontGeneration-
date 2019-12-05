
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { TenderForBuildingsMaintenancePlan } from 'app/shared/models/tender-for-buildings-maintenance-plan';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { TenderForBuildingsMaintenancePlanEditComponent } from '../tender-for-buildings-maintenance-plan-edit/tender-for-buildings-maintenance-plan-edit.component';
import { TenderForBuildingsMaintenancePlanNewComponent } from '../tender-for-buildings-maintenance-plan-new/tender-for-buildings-maintenance-plan-new.component';
import { TenderForBuildingsMaintenancePlanViewComponent } from '../tender-for-buildings-maintenance-plan-view/tender-for-buildings-maintenance-plan-view.component';
import { TenderForBuildingsMaintenancePlanService } from '../shared/tender-for-buildings-maintenance-plan.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-tender-for-buildings-maintenance-plan-list',
  templateUrl: './tender-for-buildings-maintenance-plan-list.component.html',
  styleUrls: ['./tender-for-buildings-maintenance-plan-list.component.scss'],
  providers: []
})

export class TenderForBuildingsMaintenancePlanListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedTenderForBuildingsMaintenancePlan: TenderForBuildingsMaintenancePlan;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'المحافظه', field: 'governorate' }),
	new GridColumnOptions({ headerName: ' سنه الخطه', field: 'yearPlan' }),
	new GridColumnOptions({ headerName: ' نوع الصيانه', field: 'maintenanceType' }),
	new GridColumnOptions({ headerName: 'الرقم التعريفي', field: 'buildingNumber' }),
	new GridColumnOptions({ headerName: ' اسم المدرسه', field: 'schoolName' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: TenderForBuildingsMaintenancePlanViewComponent,
    editDialogClassType: TenderForBuildingsMaintenancePlanEditComponent,
    newDialogClassType: TenderForBuildingsMaintenancePlanNewComponent,
  });
    constructor(
        injector: Injector,
        public tenderForBuildingsMaintenancePlanService: TenderForBuildingsMaintenancePlanService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedTenderForBuildingsMaintenancePlan = new TenderForBuildingsMaintenancePlan();

    

    this.searchForm = this.formBuilder.group({
     	governorate : [],
	yearPlan : [],
	maintenanceType : [],
	buildingNumber : [],
	schoolName : []
    });

     
  }

  getTenderForBuildingsMaintenancePlanPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<TenderForBuildingsMaintenancePlan[]> => {
    return this.tenderForBuildingsMaintenancePlanService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.tenderForBuildingsMaintenancePlanService.delete(param.data.id)
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
    
  }
}

