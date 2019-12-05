
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { EmployeeBenefitsNotLoadedOnACheck } from 'app/shared/models/employee-benefits-not-loaded-on-a-check';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { EmployeeBenefitsNotLoadedOnACheckEditComponent } from '../employee-benefits-not-loaded-on-a-check-edit/employee-benefits-not-loaded-on-a-check-edit.component';
import { EmployeeBenefitsNotLoadedOnACheckNewComponent } from '../employee-benefits-not-loaded-on-a-check-new/employee-benefits-not-loaded-on-a-check-new.component';
import { EmployeeBenefitsNotLoadedOnACheckViewComponent } from '../employee-benefits-not-loaded-on-a-check-view/employee-benefits-not-loaded-on-a-check-view.component';
import { EmployeeBenefitsNotLoadedOnACheckService } from '../shared/employee-benefits-not-loaded-on-a-check.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-employee-benefits-not-loaded-on-a-check-list',
  templateUrl: './employee-benefits-not-loaded-on-a-check-list.component.html',
  styleUrls: ['./employee-benefits-not-loaded-on-a-check-list.component.scss'],
  providers: []
})

export class EmployeeBenefitsNotLoadedOnACheckListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private subDepartmentsService: LookupService;
private subsidyTypesService: LookupService;

  
affiliateManagementSelectOptions: MaterialSelectOptions;
subsidyTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('affiliateManagement', { static: true }) AffiliateManagementSelectComponent: MaterialSelectComponent;
	@ViewChild('subsidyType', { static: true }) SubsidyTypeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedEmployeeBenefitsNotLoadedOnACheck: EmployeeBenefitsNotLoadedOnACheck;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: ' اسم الموظف', field: 'employeeName' }),
	new GridColumnOptions({ headerName: ' رقم واسم الاعانة', field: 'subsidyNo.andName' }),
	new GridColumnOptions({ headerName: ' مبلغ الاعانة', field: 'subsidyAmount' }),
	new GridColumnOptions({ headerName: ' تاريخ الصرف', field: 'exchangeDate' }),
	new GridColumnOptions({ headerName: ' الايصال', field: 'receipt' }),
	new GridColumnOptions({ headerName: ' الاداره التابع لها', field: 'affiliateManagement' }),
	new GridColumnOptions({ headerName: '  نوع الاعانه', field: 'subsidyType' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: EmployeeBenefitsNotLoadedOnACheckViewComponent,
    editDialogClassType: EmployeeBenefitsNotLoadedOnACheckEditComponent,
    newDialogClassType: EmployeeBenefitsNotLoadedOnACheckNewComponent,
  });
    constructor(
        injector: Injector,
        public employeeBenefitsNotLoadedOnACheckService: EmployeeBenefitsNotLoadedOnACheckService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedEmployeeBenefitsNotLoadedOnACheck = new EmployeeBenefitsNotLoadedOnACheck();

    
	this.affiliateManagementSelectOptions = new MaterialSelectOptions({
	 data: this.subDepartmentsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' الاداره التابع لها',
	});

	this.subsidyTypeSelectOptions = new MaterialSelectOptions({
	 data: this.subsidyTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: '  نوع الاعانه',
	});


    this.searchForm = this.formBuilder.group({
     	employeeName : [],
	subsidyNoandName : [],
	affiliateManagement : [],
	subsidyType : []
    });

     
  }

  getEmployeeBenefitsNotLoadedOnACheckPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<EmployeeBenefitsNotLoadedOnACheck[]> => {
    return this.employeeBenefitsNotLoadedOnACheckService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.employeeBenefitsNotLoadedOnACheckService.delete(param.data.id)
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
    this.subDepartmentsService = new LookupService('subdepartments', this.http);
this.subsidyTypesService = new LookupService('subsidytypes', this.http);
  }
}

