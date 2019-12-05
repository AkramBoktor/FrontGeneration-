
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { MaintenancePlan } from 'app/shared/models/maintenance-plan';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { MaintenancePlanEditComponent } from '../maintenance-plan-edit/maintenance-plan-edit.component';
import { MaintenancePlanNewComponent } from '../maintenance-plan-new/maintenance-plan-new.component';
import { MaintenancePlanViewComponent } from '../maintenance-plan-view/maintenance-plan-view.component';
import { MaintenancePlanService } from '../shared/maintenance-plan.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-maintenance-plan-list',
  templateUrl: './maintenance-plan-list.component.html',
  styleUrls: ['./maintenance-plan-list.component.scss'],
  providers: []
})

export class MaintenancePlanListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedMaintenancePlan: MaintenancePlan;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'المبني التعليمي ', field: 'buildingNumber' }),
	new GridColumnOptions({ headerName: 'الفرع ', field: 'branch' }),
	new GridColumnOptions({ headerName: 'المنطقه  ', field: 'region' }),
	new GridColumnOptions({ headerName: ' سنه الخطه', field: 'yearPlan' }),
	new GridColumnOptions({ headerName: 'نوع الانشاء', field: 'constructionType' }),
	new GridColumnOptions({ headerName: ' مده التنفيذ', field: 'executionDuration' }),
	new GridColumnOptions({ headerName: 'رقم المناقصه', field: 'bidNumber' }),
	new GridColumnOptions({ headerName: 'نوع الطرح ', field: 'offeringType' }),
	new GridColumnOptions({ headerName: 'تاريخ استلام موقع فعلي', field: 'physicalLocationreceivingDate' }),
	new GridColumnOptions({ headerName: 'تاريخ استلام موقع مخطط', field: 'plannerLocationReceivingDate' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: MaintenancePlanViewComponent,
    editDialogClassType: MaintenancePlanEditComponent,
    newDialogClassType: MaintenancePlanNewComponent,
  });
    constructor(
        injector: Injector,
        public maintenancePlanService: MaintenancePlanService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedMaintenancePlan = new MaintenancePlan();

    

    this.searchForm = this.formBuilder.group({
     	buildingNumber : [],
	branch : [],
	region : [],
	yearPlan : [],
	constructionType : [],
	executionDuration : [],
	bidNumber : [],
	offeringType : [],
	physicalLocationreceivingDate : [],
	plannerLocationReceivingDate : []
    });

     
  }

  getMaintenancePlanPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<MaintenancePlan[]> => {
    return this.maintenancePlanService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.maintenancePlanService.delete(param.data.id)
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

