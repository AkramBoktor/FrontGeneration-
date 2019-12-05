
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { CancelFromTheMaintenancePlan } from 'app/shared/models/cancel-from-the-maintenance-plan';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { CancelFromTheMaintenancePlanEditComponent } from '../cancel-from-the-maintenance-plan-edit/cancel-from-the-maintenance-plan-edit.component';
import { CancelFromTheMaintenancePlanNewComponent } from '../cancel-from-the-maintenance-plan-new/cancel-from-the-maintenance-plan-new.component';
import { CancelFromTheMaintenancePlanViewComponent } from '../cancel-from-the-maintenance-plan-view/cancel-from-the-maintenance-plan-view.component';
import { CancelFromTheMaintenancePlanService } from '../shared/cancel-from-the-maintenance-plan.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-cancel-from-the-maintenance-plan-list',
  templateUrl: './cancel-from-the-maintenance-plan-list.component.html',
  styleUrls: ['./cancel-from-the-maintenance-plan-list.component.scss'],
  providers: []
})

export class CancelFromTheMaintenancePlanListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedCancelFromTheMaintenancePlan: CancelFromTheMaintenancePlan;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: ' الرقم التعريفي', field: 'buildinNumber' }),
	new GridColumnOptions({ headerName: ' سنه الخطه', field: 'planYear' }),
	new GridColumnOptions({ headerName: ' نوع الصيانه', field: 'maintenanceType' }),
	new GridColumnOptions({ headerName: 'سبب الاستبعاد', field: 'exclusionReason' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: CancelFromTheMaintenancePlanViewComponent,
    editDialogClassType: CancelFromTheMaintenancePlanEditComponent,
    newDialogClassType: CancelFromTheMaintenancePlanNewComponent,
  });
    constructor(
        injector: Injector,
        public cancelFromTheMaintenancePlanService: CancelFromTheMaintenancePlanService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedCancelFromTheMaintenancePlan = new CancelFromTheMaintenancePlan();

    

    this.searchForm = this.formBuilder.group({
     	buildinNumber : [],
	planYear : [],
	maintenanceType : [],
	exclusionReason : []
    });

     
  }

  getCancelFromTheMaintenancePlanPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<CancelFromTheMaintenancePlan[]> => {
    return this.cancelFromTheMaintenancePlanService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.cancelFromTheMaintenancePlanService.delete(param.data.id)
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

