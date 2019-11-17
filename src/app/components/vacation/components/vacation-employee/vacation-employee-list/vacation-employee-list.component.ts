
import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { GridColumnOptions, GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { FormControlError, GridPaginatedSortedFiltered } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { VacationEmployee } from 'app/shared/models/vacation-employee';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { VacationEmployeeService } from '../shared/vacation-employee.service';
import { VacationEmployeeEditComponent } from '../vacation-employee-edit/vacation-employee-edit.component';
import { VacationEmployeeNewComponent } from '../vacation-employee-new/vacation-employee-new.component';
import { VacationEmployeeViewComponent } from '../vacation-employee-view/vacation-employee-view.component';

@Component({
  selector: 'app-vacation-employee-list',
  templateUrl: './vacation-employee-list.component.html',
  styleUrls: ['./vacation-employee-list.component.scss'],
  providers: []
})

export class VacationEmployeeListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
	{
	 errorName: 'reqired',
	 errorMessage: 'هذا الحقل مطلوب'
	}
      ];
  private centralDepartmentsService: LookupService;
private subDepartmentsService: LookupService;
private vacationTypesService: LookupService;

  
centralAdministrationSelectOptions: MaterialSelectOptions;
subAdministrationSelectOptions: MaterialSelectOptions;
vacationsTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('centralAdministration', { static: true }) CentralAdministrationSelectComponent: MaterialSelectComponent;
	@ViewChild('subAdministration', { static: true }) SubAdministrationSelectComponent: MaterialSelectComponent;
	@ViewChild('vacationsType', { static: true }) VacationsTypeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedVacationEmployee: VacationEmployee;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود الموظف', field: 'employeeCode' }),
	new GridColumnOptions({ headerName: 'اسم الموظف', field: 'employeeName' }),
	new GridColumnOptions({ headerName: 'الاداره المركزيه ', field: 'centralAdministration' }),
	new GridColumnOptions({ headerName: 'الادارة الفرعية ', field: 'subAdministration' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: VacationEmployeeViewComponent,
    editDialogClassType: VacationEmployeeEditComponent,
    newDialogClassType: VacationEmployeeNewComponent,
  });
    constructor(
        injector: Injector,
        public vacationEmployeeService: VacationEmployeeService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedVacationEmployee = new VacationEmployee();

    
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

	this.vacationsTypeSelectOptions = new MaterialSelectOptions({
	 data: this.vacationTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الاجازة',
	});


    this.searchForm = this.formBuilder.group({
     	employeeCode : [],
	employeeName : [],
	fromDate : [],
	toDate : [],
	permission : [],
	decisionNumber : [],
	decisionDate : [],
	centralAdministration : [],
	subAdministration : [],
	vacationsType : []
    });

     
  }

  getVacationEmployeePaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<VacationEmployee[]> => {
    return this.vacationEmployeeService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.vacationEmployeeService.delete(param.data.id)
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
this.vacationTypesService = new LookupService('vacationtypes', this.http);
  }
}

