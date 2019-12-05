
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { EmployeeBenefitsAfterCashingACheck } from 'app/shared/models/employee-benefits-after-cashing-a-check';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { EmployeeBenefitsAfterCashingACheckEditComponent } from '../employee-benefits-after-cashing-a-check-edit/employee-benefits-after-cashing-a-check-edit.component';
import { EmployeeBenefitsAfterCashingACheckNewComponent } from '../employee-benefits-after-cashing-a-check-new/employee-benefits-after-cashing-a-check-new.component';
import { EmployeeBenefitsAfterCashingACheckViewComponent } from '../employee-benefits-after-cashing-a-check-view/employee-benefits-after-cashing-a-check-view.component';
import { EmployeeBenefitsAfterCashingACheckService } from '../shared/employee-benefits-after-cashing-a-check.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-employee-benefits-after-cashing-a-check-list',
  templateUrl: './employee-benefits-after-cashing-a-check-list.component.html',
  styleUrls: ['./employee-benefits-after-cashing-a-check-list.component.scss'],
  providers: []
})

export class EmployeeBenefitsAfterCashingACheckListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private subsidyTypesService: LookupService;

  
subsidyTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('subsidyType', { static: true }) SubsidyTypeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedEmployeeBenefitsAfterCashingACheck: EmployeeBenefitsAfterCashingACheck;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: ' رقم الشيك ', field: 'checkNumber' }),
	new GridColumnOptions({ headerName: ' تاريخ الشيك ', field: 'checkDate' }),
	new GridColumnOptions({ headerName: ' مبلغ الشيك', field: 'checkAmount' }),
	new GridColumnOptions({ headerName: 'كود الموظف', field: 'employeeCode' }),
	new GridColumnOptions({ headerName: '  مبلغ الاعانة', field: 'subsidyAmount' }),
	new GridColumnOptions({ headerName: ' تاريخ الصرف', field: 'exchangeDate' }),
	new GridColumnOptions({ headerName: ' نوع الاعانة', field: 'subsidyType' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: EmployeeBenefitsAfterCashingACheckViewComponent,
    editDialogClassType: EmployeeBenefitsAfterCashingACheckEditComponent,
    newDialogClassType: EmployeeBenefitsAfterCashingACheckNewComponent,
  });
    constructor(
        injector: Injector,
        public employeeBenefitsAfterCashingACheckService: EmployeeBenefitsAfterCashingACheckService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedEmployeeBenefitsAfterCashingACheck = new EmployeeBenefitsAfterCashingACheck();

    
	this.subsidyTypeSelectOptions = new MaterialSelectOptions({
	 data: this.subsidyTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' نوع الاعانة',
	});


    this.searchForm = this.formBuilder.group({
     	checkNumber : [],
	employeeCode : [],
	subsidyType : []
    });

     
  }

  getEmployeeBenefitsAfterCashingACheckPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<EmployeeBenefitsAfterCashingACheck[]> => {
    return this.employeeBenefitsAfterCashingACheckService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.employeeBenefitsAfterCashingACheckService.delete(param.data.id)
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
    this.subsidyTypesService = new LookupService('subsidytypes', this.http);
  }
}

