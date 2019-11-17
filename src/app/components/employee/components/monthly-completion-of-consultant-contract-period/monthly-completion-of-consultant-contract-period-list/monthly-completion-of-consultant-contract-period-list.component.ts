
import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { GridColumnOptions, GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { FormControlError, GridPaginatedSortedFiltered } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MonthlyCompletionOfConsultantContractPeriod } from 'app/shared/models/monthly-completion-of-consultant-contract-period';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { MonthlyCompletionOfConsultantContractPeriodEditComponent } from '../monthly-completion-of-consultant-contract-period-edit/monthly-completion-of-consultant-contract-period-edit.component';
import { MonthlyCompletionOfConsultantContractPeriodNewComponent } from '../monthly-completion-of-consultant-contract-period-new/monthly-completion-of-consultant-contract-period-new.component';
import { MonthlyCompletionOfConsultantContractPeriodViewComponent } from '../monthly-completion-of-consultant-contract-period-view/monthly-completion-of-consultant-contract-period-view.component';
import { MonthlyCompletionOfConsultantContractPeriodService } from '../shared/monthly-completion-of-consultant-contract-period.service';

@Component({
  selector: 'app-monthly-completion-of-consultant-contract-period-list',
  templateUrl: './monthly-completion-of-consultant-contract-period-list.component.html',
  styleUrls: ['./monthly-completion-of-consultant-contract-period-list.component.scss'],
  providers: []
})

export class MonthlyCompletionOfConsultantContractPeriodListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private centralDepartmentsService: LookupService;
private subDepartmentsService: LookupService;
private jobTypesService: LookupService;

  
centralAdministrationSelectOptions: MaterialSelectOptions;
subAdministrationSelectOptions: MaterialSelectOptions;
jobTitleSelectOptions: MaterialSelectOptions;

  
	@ViewChild('centralAdministration', { static: true }) CentralAdministrationSelectComponent: MaterialSelectComponent;
	@ViewChild('subAdministration', { static: true }) SubAdministrationSelectComponent: MaterialSelectComponent;
	@ViewChild('jobTitle', { static: true }) JobTitleSelectComponent: MaterialSelectComponent;

  
  @Input() selectedMonthlyCompletionOfConsultantContractPeriod: MonthlyCompletionOfConsultantContractPeriod;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود الموظف', field: 'employeeCode' }),
	new GridColumnOptions({ headerName: 'عدد مرات الحضور', field: 'attendeesNumber' }),
	new GridColumnOptions({ headerName: 'فتره رقم', field: 'periodNumber' }),
	new GridColumnOptions({ headerName: 'تاريخ البدايه', field: 'startDate' }),
	new GridColumnOptions({ headerName: 'قيمة العقد', field: 'contractAmount' }),
	new GridColumnOptions({ headerName: 'تاريخ النهايه', field: 'endDate' }),
	new GridColumnOptions({ headerName: 'مده الفتره', field: 'period' }),
	new GridColumnOptions({ headerName: 'الاداره المركزيه', field: 'centralAdministration' }),
	new GridColumnOptions({ headerName: 'الاداره الفرعيه', field: 'subAdministration' }),
	new GridColumnOptions({ headerName: 'الوظيفه', field: 'jobTitle' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: MonthlyCompletionOfConsultantContractPeriodViewComponent,
    editDialogClassType: MonthlyCompletionOfConsultantContractPeriodEditComponent,
    newDialogClassType: MonthlyCompletionOfConsultantContractPeriodNewComponent,
  });
    constructor(
        injector: Injector,
        public monthlyCompletionOfConsultantContractPeriodService: MonthlyCompletionOfConsultantContractPeriodService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedMonthlyCompletionOfConsultantContractPeriod = new MonthlyCompletionOfConsultantContractPeriod();

    
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


    this.searchForm = this.formBuilder.group({
     	employeeCode : [],
	attendeesNumber : [],
	periodNumber : [],
	startDate : [],
	contractAmount : [],
	endDate : [],
	period : [],
	centralAdministration : [],
	subAdministration : [],
	jobTitle : []
    });

     
  }

  getMonthlyCompletionOfConsultantContractPeriodPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<MonthlyCompletionOfConsultantContractPeriod[]> => {
    return this.monthlyCompletionOfConsultantContractPeriodService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.monthlyCompletionOfConsultantContractPeriodService.delete(param.data.id)
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
  }
}

