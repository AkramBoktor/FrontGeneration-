
import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { GridColumnOptions, GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { FormControlError, GridPaginatedSortedFiltered } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { EmployeeInsuranceNumber } from 'app/shared/models/employee-insurance-number';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { EmployeeInsuranceNumberEditComponent } from '../employee-insurance-number-edit/employee-insurance-number-edit.component';
import { EmployeeInsuranceNumberNewComponent } from '../employee-insurance-number-new/employee-insurance-number-new.component';
import { EmployeeInsuranceNumberViewComponent } from '../employee-insurance-number-view/employee-insurance-number-view.component';
import { EmployeeInsuranceNumberService } from '../shared/employee-insurance-number.service';

@Component({
  selector: 'app-employee-insurance-number-list',
  templateUrl: './employee-insurance-number-list.component.html',
  styleUrls: ['./employee-insurance-number-list.component.scss'],
  providers: []
})

export class EmployeeInsuranceNumberListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
	{
	 errorName: 'minLength',
	 errorMessage: 'لا يوجد مسلسل يساوي صفر'
	},
	{
	 errorName: 'maxLength',
	 errorMessage: 'لا يمكن ان يزيد عن 10'
	},
	{
	 errorName: 'minLength',
	 errorMessage: 'لا يوجد مسلسل يساوي صفر'
	},
	{
	 errorName: 'max',
	 errorMessage: 'الرقم القومي 14 رقم'
	},
	{
	 errorName: 'min',
	 errorMessage: 'الرقم القومي 14 رقم'
	}
      ];
  private departmentsSectionsService: LookupService;

  
administrationSelectOptions: MaterialSelectOptions;

  
	@ViewChild('administration', { static: true }) AdministrationSelectComponent: MaterialSelectComponent;

  
  @Input() selectedEmployeeInsuranceNumber: EmployeeInsuranceNumber;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود الموظف', field: 'employeeCode' }),
	new GridColumnOptions({ headerName: 'الرقم التأميني', field: 'insuranceNumber' }),
	new GridColumnOptions({ headerName: 'الرقم القومي', field: 'iDNumber' }),
	new GridColumnOptions({ headerName: 'تاريخ الميلاد', field: 'birthdate' }),
	new GridColumnOptions({ headerName: 'الإدارة', field: 'administration' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: EmployeeInsuranceNumberViewComponent,
    editDialogClassType: EmployeeInsuranceNumberEditComponent,
    newDialogClassType: EmployeeInsuranceNumberNewComponent,
  });
    constructor(
        injector: Injector,
        public employeeInsuranceNumberService: EmployeeInsuranceNumberService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedEmployeeInsuranceNumber = new EmployeeInsuranceNumber();

    
	this.administrationSelectOptions = new MaterialSelectOptions({
	 data: this.departmentsSectionsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الإدارة',
	});


    this.searchForm = this.formBuilder.group({
     	employeeCode : [],
	insuranceNumber : [],
	iDNumber : [],
	birthdate : [],
	administration : []
    });

     
  }

  getEmployeesInsuranceNumbersPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<EmployeeInsuranceNumber[]> => {
    return this.employeeInsuranceNumberService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.employeeInsuranceNumberService.delete(param.data.id)
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
    this.departmentsSectionsService = new LookupService('departmentssections', this.http);
  }
}

