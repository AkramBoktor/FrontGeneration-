
import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { GridColumnOptions, GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { FormControlError, GridPaginatedSortedFiltered } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { VacationContract } from 'app/shared/models/vacation-contract';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { VacationContractService } from '../shared/vacation-contract.service';
import { VacationContractEditComponent } from '../vacation-contract-edit/vacation-contract-edit.component';
import { VacationContractNewComponent } from '../vacation-contract-new/vacation-contract-new.component';
import { VacationContractViewComponent } from '../vacation-contract-view/vacation-contract-view.component';

@Component({
  selector: 'app-vacation-contract-list',
  templateUrl: './vacation-contract-list.component.html',
  styleUrls: ['./vacation-contract-list.component.scss'],
  providers: []
})

export class VacationContractListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
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

  
  @Input() selectedVacationContract: VacationContract;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود الموظف', field: 'employeeCode' }),
	new GridColumnOptions({ headerName: 'اسم الموظف', field: 'employeeName' }),
	new GridColumnOptions({ headerName: 'الهيئة', field: 'subAdministration' }),
	new GridColumnOptions({ headerName: 'الإدارة', field: 'centralAdministration' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: VacationContractViewComponent,
    editDialogClassType: VacationContractEditComponent,
    newDialogClassType: VacationContractNewComponent,
  });
    constructor(
        injector: Injector,
        public vacationContractService: VacationContractService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedVacationContract = new VacationContract();

    
	this.centralAdministrationSelectOptions = new MaterialSelectOptions({
	 data: this.centralDepartmentsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الادارة المركزية',
	});

	this.subAdministrationSelectOptions = new MaterialSelectOptions({
	 data: this.subDepartmentsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الادارة الفرعية',
	});

	this.vacationsTypeSelectOptions = new MaterialSelectOptions({
	 data: this.vacationTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الاجازة ',
	});


    this.searchForm = this.formBuilder.group({
     	employeeCode : [],
	employeeName : [],
	fromDate : [],
	toDate : [],
	permission : [],
	centralAdministration : [],
	subAdministration : [],
	vacationsType : []
    });

     
  }

  getVacationsContractPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<VacationContract[]> => {
    return this.vacationContractService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.vacationContractService.delete(param.data.id)
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

