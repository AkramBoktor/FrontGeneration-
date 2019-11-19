
import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { GridColumnOptions, GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { FormControlError, GridPaginatedSortedFiltered } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { EmployeeStatus } from 'app/shared/models/employee-status';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { EmployeeStatusEditComponent } from '../employee-status-edit/employee-status-edit.component';
import { EmployeeStatusNewComponent } from '../employee-status-new/employee-status-new.component';
import { EmployeeStatusViewComponent } from '../employee-status-view/employee-status-view.component';
import { EmployeeStatusService } from '../shared/employee-status.service';

@Component({
  selector: 'app-employee-status-list',
  templateUrl: './employee-status-list.component.html',
  styleUrls: ['./employee-status-list.component.scss'],
  providers: []
})

export class EmployeeStatusListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private employeeStatusesService: LookupService;

  
statusSelectOptions: MaterialSelectOptions;

  
	@ViewChild('status', { static: true }) StatusSelectComponent: MaterialSelectComponent;

  
  @Input() selectedEmployeeStatus: EmployeeStatus;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود الموظف', field: 'employeeCode' }),
	new GridColumnOptions({ headerName: 'تاريخ بداية الحالة', field: 'statusStartDate' }),
	new GridColumnOptions({ headerName: 'الحالة', field: 'status' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: EmployeeStatusViewComponent,
    editDialogClassType: EmployeeStatusEditComponent,
    newDialogClassType: EmployeeStatusNewComponent,
  });
    constructor(
        injector: Injector,
        public employeeStatusService: EmployeeStatusService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedEmployeeStatus = new EmployeeStatus();

    
	this.statusSelectOptions = new MaterialSelectOptions({
	 data: this.employeeStatusesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الحالة',
	});


    this.searchForm = this.formBuilder.group({
     	employeeCode : [],
	statusStartDate : [],
	status : []
    });

     
  }

  getEmployeesStatusPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<EmployeeStatus[]> => {
    return this.employeeStatusService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.employeeStatusService.delete(param.data.id)
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
    this.employeeStatusesService = new LookupService('employeestatuses', this.http);
  }
}

