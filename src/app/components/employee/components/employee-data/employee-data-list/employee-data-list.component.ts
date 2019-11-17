
import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { GridColumnOptions, GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { FormControlError, GridPaginatedSortedFiltered } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { EmployeeData } from 'app/shared/models/employee-data';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { EmployeeDataEditComponent } from '../employee-data-edit/employee-data-edit.component';
import { EmployeeDataNewComponent } from '../employee-data-new/employee-data-new.component';
import { EmployeeDataViewComponent } from '../employee-data-view/employee-data-view.component';
import { EmployeeDataService } from '../shared/employee-data.service';

@Component({
  selector: 'app-employee-data-list',
  templateUrl: './employee-data-list.component.html',
  styleUrls: ['./employee-data-list.component.scss'],
  providers: []
})

export class EmployeeDataListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private governoratesService: LookupService;
private employeeStatusesService: LookupService;
private subDepartmentsService: LookupService;
private centralDepartmentsService: LookupService;
private appointmentTypesService: LookupService;
private financialDegreesService: LookupService;
private functionalGroupsService: LookupService;
private jobTypesService: LookupService;

  
governorateSelectOptions: MaterialSelectOptions;
employeeStatusSelectOptions: MaterialSelectOptions;
subAdministrationSelectOptions: MaterialSelectOptions;
centralAdministrationSelectOptions: MaterialSelectOptions;
appointmentTypeSelectOptions: MaterialSelectOptions;
financialDegreeSelectOptions: MaterialSelectOptions;
jobGroupSelectOptions: MaterialSelectOptions;
jobTitleSelectOptions: MaterialSelectOptions;

  
	@ViewChild('governorate', { static: true }) GovernorateSelectComponent: MaterialSelectComponent;
	@ViewChild('employeeStatus', { static: true }) EmployeeStatusSelectComponent: MaterialSelectComponent;
	@ViewChild('subAdministration', { static: true }) SubAdministrationSelectComponent: MaterialSelectComponent;
	@ViewChild('centralAdministration', { static: true }) CentralAdministrationSelectComponent: MaterialSelectComponent;
	@ViewChild('appointmentType', { static: true }) AppointmentTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('financialDegree', { static: true }) FinancialDegreeSelectComponent: MaterialSelectComponent;
	@ViewChild('jobGroup', { static: true }) JobGroupSelectComponent: MaterialSelectComponent;
	@ViewChild('jobTitle', { static: true }) JobTitleSelectComponent: MaterialSelectComponent;

  
  @Input() selectedEmployeeData: EmployeeData;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'اسم الموظف', field: 'employeeName' }),
	new GridColumnOptions({ headerName: 'كود الموظف', field: 'employeeCode' }),
	new GridColumnOptions({ headerName: 'تاريخ الميلاد', field: 'birthDate' }),
	new GridColumnOptions({ headerName: 'رقم البطاقه', field: 'iDNumber' }),
	new GridColumnOptions({ headerName: 'المحافظه', field: 'governorate' }),
	new GridColumnOptions({ headerName: 'حاله الموظف', field: 'employeeStatus' }),
	new GridColumnOptions({ headerName: 'الادارة الفرعية', field: 'subAdministration' }),
	new GridColumnOptions({ headerName: ' الاداره المركزيه', field: 'centralAdministration' }),
	new GridColumnOptions({ headerName: 'نوع التعين', field: 'appointmentType' }),
	new GridColumnOptions({ headerName: 'الدرجة المالية', field: 'financialDegree' }),
	new GridColumnOptions({ headerName: 'المجموعه الوظيفيه', field: 'jobGroup' }),
	new GridColumnOptions({ headerName: 'الوظيفه', field: 'jobTitle' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: EmployeeDataViewComponent,
    editDialogClassType: EmployeeDataEditComponent,
    newDialogClassType: EmployeeDataNewComponent,
  });
    constructor(
        injector: Injector,
        public employeeDataService: EmployeeDataService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedEmployeeData = new EmployeeData();

    
	this.governorateSelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المحافظه',
	});

	this.employeeStatusSelectOptions = new MaterialSelectOptions({
	 data: this.employeeStatusesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حاله الموظف',
	});

	this.subAdministrationSelectOptions = new MaterialSelectOptions({
	 data: this.subDepartmentsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الادارة الفرعية',
	});

	this.centralAdministrationSelectOptions = new MaterialSelectOptions({
	 data: this.centralDepartmentsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' الاداره المركزيه',
	});

	this.appointmentTypeSelectOptions = new MaterialSelectOptions({
	 data: this.appointmentTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع التعين',
	});

	this.financialDegreeSelectOptions = new MaterialSelectOptions({
	 data: this.financialDegreesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الدرجة المالية',
	});

	this.jobGroupSelectOptions = new MaterialSelectOptions({
	 data: this.functionalGroupsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المجموعه الوظيفيه',
	});

	this.jobTitleSelectOptions = new MaterialSelectOptions({
	 data: this.jobTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الوظيفه',
	});


    this.searchForm = this.formBuilder.group({
     	employeeName : [],
	employeeCode : [],
	birthDate : [],
	iDNumber : [],
	governorate : [],
	employeeStatus : [],
	subAdministration : [],
	centralAdministration : [],
	appointmentType : [],
	financialDegree : [],
	jobGroup : [],
	jobTitle : []
    });

     
  }

  getEmployeeDataPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<EmployeeData[]> => {
    return this.employeeDataService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.employeeDataService.delete(param.data.id)
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
    this.governoratesService = new LookupService('governorates', this.http);
this.employeeStatusesService = new LookupService('employeestatuses', this.http);
this.subDepartmentsService = new LookupService('subdepartments', this.http);
this.centralDepartmentsService = new LookupService('centraldepartments', this.http);
this.appointmentTypesService = new LookupService('appointmenttypes', this.http);
this.financialDegreesService = new LookupService('financialdegrees', this.http);
this.functionalGroupsService = new LookupService('functionalgroups', this.http);
this.jobTypesService = new LookupService('jobtypes', this.http);
  }
}

