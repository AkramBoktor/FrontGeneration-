
import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { ContinuityDataForAuthorityEmployee } from 'app/shared/models/continuity-data-for-authority-employee';
import { GridColumnOptions, GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { FormControlError, GridPaginatedSortedFiltered } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ContinuityDataForAuthorityEmployeeEditComponent } from '../continuity-data-for-authority-employee-edit/continuity-data-for-authority-employee-edit.component';
import { ContinuityDataForAuthorityEmployeeNewComponent } from '../continuity-data-for-authority-employee-new/continuity-data-for-authority-employee-new.component';
import { ContinuityDataForAuthorityEmployeeViewComponent } from '../continuity-data-for-authority-employee-view/continuity-data-for-authority-employee-view.component';
import { ContinuityDataForAuthorityEmployeeService } from '../shared/continuity-data-for-authority-employee.service';

@Component({
  selector: 'app-continuity-data-for-authority-employee-list',
  templateUrl: './continuity-data-for-authority-employee-list.component.html',
  styleUrls: ['./continuity-data-for-authority-employee-list.component.scss'],
  providers: []
})

export class ContinuityDataForAuthorityEmployeeListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private centralDepartmentsService: LookupService;
private subDepartmentsService: LookupService;

  
centralAdministrationSelectOptions: MaterialSelectOptions;
subAdministrationSelectOptions: MaterialSelectOptions;

  
	@ViewChild('centralAdministration', { static: true }) CentralAdministrationSelectComponent: MaterialSelectComponent;
	@ViewChild('subAdministration', { static: true }) SubAdministrationSelectComponent: MaterialSelectComponent;

  
  @Input() selectedContinuityDataForAuthorityEmployee: ContinuityDataForAuthorityEmployee;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'يوم الاستمرار', field: 'continueDay' }),
	new GridColumnOptions({ headerName: 'كود الموظف', field: 'employeeCode' }),
	new GridColumnOptions({ headerName: 'الاداره المركزيه', field: 'centralAdministration' }),
	new GridColumnOptions({ headerName: 'الادارة الفرعية', field: 'subAdministration' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: ContinuityDataForAuthorityEmployeeViewComponent,
    editDialogClassType: ContinuityDataForAuthorityEmployeeEditComponent,
    newDialogClassType: ContinuityDataForAuthorityEmployeeNewComponent,
  });
    constructor(
        injector: Injector,
        public continuityDataForAuthorityEmployeeService: ContinuityDataForAuthorityEmployeeService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedContinuityDataForAuthorityEmployee = new ContinuityDataForAuthorityEmployee();

    
	this.centralAdministrationSelectOptions = new MaterialSelectOptions({
	 data: this.centralDepartmentsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الاداره المركزيه',
	});

	this.subAdministrationSelectOptions = new MaterialSelectOptions({
	 data: this.subDepartmentsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الادارة الفرعية',
	});


    this.searchForm = this.formBuilder.group({
     	continueDay : [],
	employeeCode : [],
	centralAdministration : [],
	subAdministration : []
    });

     
  }

  getContinuityDataForAuthorityEmployeesPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<ContinuityDataForAuthorityEmployee[]> => {
    return this.continuityDataForAuthorityEmployeeService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.continuityDataForAuthorityEmployeeService.delete(param.data.id)
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
    this.centralDepartmentsService = new LookupService('centraldepartments', this.http);
this.subDepartmentsService = new LookupService('subdepartments', this.http);
  }
}

