
import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { GridColumnOptions, GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { FormControlError, GridPaginatedSortedFiltered } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { EmployeeContractRenewalData } from 'app/shared/models/employee-contract-renewal-data';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { EmployeeContractRenewalDataEditComponent } from '../employee-contract-renewal-data-edit/employee-contract-renewal-data-edit.component';
import { EmployeeContractRenewalDataNewComponent } from '../employee-contract-renewal-data-new/employee-contract-renewal-data-new.component';
import { EmployeeContractRenewalDataViewComponent } from '../employee-contract-renewal-data-view/employee-contract-renewal-data-view.component';
import { EmployeeContractRenewalDataService } from '../shared/employee-contract-renewal-data.service';

@Component({
  selector: 'app-employee-contract-renewal-data-list',
  templateUrl: './employee-contract-renewal-data-list.component.html',
  styleUrls: ['./employee-contract-renewal-data-list.component.scss'],
  providers: []
})

export class EmployeeContractRenewalDataListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private centralDepartmentsService: LookupService;
private subDepartmentsService: LookupService;
private jobTypesService: LookupService;
private financialDegreesService: LookupService;
private renewalTypesService: LookupService;

  
centralAdministrationSelectOptions: MaterialSelectOptions;
subAdministrationSelectOptions: MaterialSelectOptions;
jobTitleSelectOptions: MaterialSelectOptions;
financialDegreeSelectOptions: MaterialSelectOptions;
renewalTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('centralAdministration', { static: true }) CentralAdministrationSelectComponent: MaterialSelectComponent;
	@ViewChild('subAdministration', { static: true }) SubAdministrationSelectComponent: MaterialSelectComponent;
	@ViewChild('jobTitle', { static: true }) JobTitleSelectComponent: MaterialSelectComponent;
	@ViewChild('financialDegree', { static: true }) FinancialDegreeSelectComponent: MaterialSelectComponent;
	@ViewChild('renewalType', { static: true }) RenewalTypeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedEmployeeContractRenewalData: EmployeeContractRenewalData;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود الموظف', field: 'employeeCode' }),
	new GridColumnOptions({ headerName: 'تاريخ استلام العمل', field: 'receiptDate' }),
	new GridColumnOptions({ headerName: 'تاريخ بدايه التجديد', field: 'startRenewalDate' }),
	new GridColumnOptions({ headerName: 'مده فتره التجديد', field: 'renewalPeriod' }),
	new GridColumnOptions({ headerName: 'رقم الفترة السابقة', field: 'prePeriodNumber' }),
	new GridColumnOptions({ headerName: 'تاريخ بداية الفترة السابقة', field: 'prePeriodStartingDate' }),
	new GridColumnOptions({ headerName: 'تاريخ نهاية الفترة السابقة', field: 'prePeriodEndDate' }),
	new GridColumnOptions({ headerName: 'مدة الفترة', field: 'durationPeriod' }),
	new GridColumnOptions({ headerName: 'رقم الفترة الجديدة', field: 'newPeriodNumber' }),
	new GridColumnOptions({ headerName: 'تاريخ نهاية الفترة', field: 'periodEndDate' }),
	new GridColumnOptions({ headerName: 'قيمة العقد', field: 'contractAmount' }),
	new GridColumnOptions({ headerName: 'الاداره المركزيه', field: 'centralAdministration' }),
	new GridColumnOptions({ headerName: 'الاداره الفرعيه', field: 'subAdministration' }),
	new GridColumnOptions({ headerName: 'الوظيفه', field: 'jobTitle' }),
	new GridColumnOptions({ headerName: 'الدرجه الماليه', field: 'financialDegree' }),
	new GridColumnOptions({ headerName: 'نوع التجديد', field: 'renewalType' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: EmployeeContractRenewalDataViewComponent,
    editDialogClassType: EmployeeContractRenewalDataEditComponent,
    newDialogClassType: EmployeeContractRenewalDataNewComponent,
  });
    constructor(
        injector: Injector,
        public employeeContractRenewalDataService: EmployeeContractRenewalDataService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedEmployeeContractRenewalData = new EmployeeContractRenewalData();

    
	this.centralAdministrationSelectOptions = new MaterialSelectOptions({
	 data: this.centralDepartmentsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الاداره المركزيه',
	});

	this.subAdministrationSelectOptions = new MaterialSelectOptions({
	 data: this.subDepartmentsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الاداره الفرعيه',
	});

	this.jobTitleSelectOptions = new MaterialSelectOptions({
	 data: this.jobTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الوظيفه',
	});

	this.financialDegreeSelectOptions = new MaterialSelectOptions({
	 data: this.financialDegreesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الدرجه الماليه',
	});

	this.renewalTypeSelectOptions = new MaterialSelectOptions({
	 data: this.renewalTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع التجديد',
	});


    this.searchForm = this.formBuilder.group({
     	employeeCode : [],
	receiptDate : [],
	startRenewalDate : [],
	renewalPeriod : [],
	prePeriodNumber : [],
	prePeriodStartingDate : [],
	prePeriodEndDate : [],
	durationPeriod : [],
	newPeriodNumber : [],
	periodEndDate : [],
	contractAmount : [],
	centralAdministration : [],
	subAdministration : [],
	jobTitle : [],
	financialDegree : [],
	renewalType : []
    });

     
  }

  getEmployeeContractRenewalDataPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<EmployeeContractRenewalData[]> => {
    return this.employeeContractRenewalDataService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.employeeContractRenewalDataService.delete(param.data.id)
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
this.jobTypesService = new LookupService('jobtypes', this.http);
this.financialDegreesService = new LookupService('financialdegrees', this.http);
this.renewalTypesService = new LookupService('renewaltypes', this.http);
  }
}

