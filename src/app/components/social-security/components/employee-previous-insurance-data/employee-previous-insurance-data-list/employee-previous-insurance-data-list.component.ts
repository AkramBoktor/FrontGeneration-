
import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { GridColumnOptions, GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { FormControlError, GridPaginatedSortedFiltered } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { EmployeePreviousInsuranceData } from 'app/shared/models/employee-previous-insurance-data';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { EmployeePreviousInsuranceDataEditComponent } from '../employee-previous-insurance-data-edit/employee-previous-insurance-data-edit.component';
import { EmployeePreviousInsuranceDataNewComponent } from '../employee-previous-insurance-data-new/employee-previous-insurance-data-new.component';
import { EmployeePreviousInsuranceDataViewComponent } from '../employee-previous-insurance-data-view/employee-previous-insurance-data-view.component';
import { EmployeePreviousInsuranceDataService } from '../shared/employee-previous-insurance-data.service';

@Component({
  selector: 'app-employee-previous-insurance-data-list',
  templateUrl: './employee-previous-insurance-data-list.component.html',
  styleUrls: ['./employee-previous-insurance-data-list.component.scss'],
  providers: []
})

export class EmployeePreviousInsuranceDataListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
	{
	 errorName: 'minLength',
	 errorMessage: 'لا يوجد مسلسل يساوي صفر'
	}
      ];
  private sectorCodesService: LookupService;

  
sectorSelectOptions: MaterialSelectOptions;

  
	@ViewChild('sector', { static: true }) SectorSelectComponent: MaterialSelectComponent;

  
  @Input() selectedEmployeePreviousInsuranceData: EmployeePreviousInsuranceData;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود الموظف', field: 'employeeCode' }),
	new GridColumnOptions({ headerName: 'المنشأة', field: 'organization' }),
	new GridColumnOptions({ headerName: 'To Date', field: 'fromDate' }),
	new GridColumnOptions({ headerName: ' الى', field: 'toDate' }),
	new GridColumnOptions({ headerName: 'القطاع', field: 'sector' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: EmployeePreviousInsuranceDataViewComponent,
    editDialogClassType: EmployeePreviousInsuranceDataEditComponent,
    newDialogClassType: EmployeePreviousInsuranceDataNewComponent,
  });
    constructor(
        injector: Injector,
        public employeePreviousInsuranceDataService: EmployeePreviousInsuranceDataService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedEmployeePreviousInsuranceData = new EmployeePreviousInsuranceData();

    
	this.sectorSelectOptions = new MaterialSelectOptions({
	 data: this.sectorCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'القطاع',
	});


    this.searchForm = this.formBuilder.group({
     	employeeCode : [],
	organization : [],
	fromDate : [],
	toDate : [],
	sector : []
    });

     
  }

  getEmployeesPreviousInsuranceDataPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<EmployeePreviousInsuranceData[]> => {
    return this.employeePreviousInsuranceDataService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.employeePreviousInsuranceDataService.delete(param.data.id)
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
    this.sectorCodesService = new LookupService('sectorcodes', this.http);
  }
}

