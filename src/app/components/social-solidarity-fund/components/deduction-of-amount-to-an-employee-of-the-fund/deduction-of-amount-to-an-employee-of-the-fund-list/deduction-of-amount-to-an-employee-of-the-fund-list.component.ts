
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { DeductionOfAmountToAnEmployeeOfTheFund } from 'app/shared/models/deduction-of-amount-to-an-employee-of-the-fund';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { DeductionOfAmountToAnEmployeeOfTheFundEditComponent } from '../deduction-of-amount-to-an-employee-of-the-fund-edit/deduction-of-amount-to-an-employee-of-the-fund-edit.component';
import { DeductionOfAmountToAnEmployeeOfTheFundNewComponent } from '../deduction-of-amount-to-an-employee-of-the-fund-new/deduction-of-amount-to-an-employee-of-the-fund-new.component';
import { DeductionOfAmountToAnEmployeeOfTheFundViewComponent } from '../deduction-of-amount-to-an-employee-of-the-fund-view/deduction-of-amount-to-an-employee-of-the-fund-view.component';
import { DeductionOfAmountToAnEmployeeOfTheFundService } from '../shared/deduction-of-amount-to-an-employee-of-the-fund.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-deduction-of-amount-to-an-employee-of-the-fund-list',
  templateUrl: './deduction-of-amount-to-an-employee-of-the-fund-list.component.html',
  styleUrls: ['./deduction-of-amount-to-an-employee-of-the-fund-list.component.scss'],
  providers: []
})

export class DeductionOfAmountToAnEmployeeOfTheFundListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private boxCodesService: LookupService;
private departmentsSectionsService: LookupService;

  
boxCodeSelectOptions: MaterialSelectOptions;
administrationCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('boxCode', { static: true }) BoxCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('administrationCode', { static: true }) AdministrationCodeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedDeductionOfAmountToAnEmployeeOfTheFund: DeductionOfAmountToAnEmployeeOfTheFund;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود الموظف', field: 'employeeCode' }),
	new GridColumnOptions({ headerName: 'حاله الاشتراك', field: 'subscriptionStatus' }),
	new GridColumnOptions({ headerName: 'كود العضويه', field: 'membershipCode' }),
	new GridColumnOptions({ headerName: 'المرتب الاساسى', field: 'basicSalary' }),
	new GridColumnOptions({ headerName: 'قيم مبالغ الاشتراك', field: 'subscriptionAmounts' }),
	new GridColumnOptions({ headerName: 'سبب خصم المبلغ', field: 'deductingAmountReason' }),
	new GridColumnOptions({ headerName: 'كود المستفيد', field: 'beneficiaryCode' }),
	new GridColumnOptions({ headerName: 'اسم المستفيد', field: 'beneficiaryName' }),
	new GridColumnOptions({ headerName: 'قيمه الشيك', field: 'checkAmount' }),
	new GridColumnOptions({ headerName: 'بيان البنك', field: 'bankStatement' }),
	new GridColumnOptions({ headerName: 'رقم الشيك', field: 'checkNumber' }),
	new GridColumnOptions({ headerName: 'تاريخ الشيك', field: 'checkDate' }),
	new GridColumnOptions({ headerName: 'كود الصندوق', field: 'boxCode' }),
	new GridColumnOptions({ headerName: 'كود الادارة', field: 'administrationCode' }),
	new GridColumnOptions({ headerName: 'حاله الموظف', field: 'employeeStatus' }),
	new GridColumnOptions({ headerName: 'كود البنك  ', field: 'bankCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: DeductionOfAmountToAnEmployeeOfTheFundViewComponent,
    editDialogClassType: DeductionOfAmountToAnEmployeeOfTheFundEditComponent,
    newDialogClassType: DeductionOfAmountToAnEmployeeOfTheFundNewComponent,
  });
    constructor(
        injector: Injector,
        public deductionOfAmountToAnEmployeeOfTheFundService: DeductionOfAmountToAnEmployeeOfTheFundService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedDeductionOfAmountToAnEmployeeOfTheFund = new DeductionOfAmountToAnEmployeeOfTheFund();

    
	this.boxCodeSelectOptions = new MaterialSelectOptions({
	 data: this.boxCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الصندوق',
	});

	this.administrationCodeSelectOptions = new MaterialSelectOptions({
	 data: this.departmentsSectionsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الادارة',
	});


    this.searchForm = this.formBuilder.group({
     	employeeCode : [],
	boxCode : [],
	administrationCode : []
    });

     
  }

  getDeductionOfAmountsToAnEmployeeOfTheFundPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<DeductionOfAmountToAnEmployeeOfTheFund[]> => {
    return this.deductionOfAmountToAnEmployeeOfTheFundService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.deductionOfAmountToAnEmployeeOfTheFundService.delete(param.data.id)
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
    this.boxCodesService = new LookupService('boxcodes', this.http);
this.departmentsSectionsService = new LookupService('departmentssections', this.http);
  }
}

