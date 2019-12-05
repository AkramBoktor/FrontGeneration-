
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { DeductionOfAnAmountToAnEmployeeOfTheFundG } from 'app/shared/models/deduction-of-an-amount-to-an-employee-of-the-fund-g';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { DeductionOfAnAmountToAnEmployeeOfTheFundGEditComponent } from '../deduction-of-an-amount-to-an-employee-of-the-fund-g-edit/deduction-of-an-amount-to-an-employee-of-the-fund-g-edit.component';
import { DeductionOfAnAmountToAnEmployeeOfTheFundGNewComponent } from '../deduction-of-an-amount-to-an-employee-of-the-fund-g-new/deduction-of-an-amount-to-an-employee-of-the-fund-g-new.component';
import { DeductionOfAnAmountToAnEmployeeOfTheFundGViewComponent } from '../deduction-of-an-amount-to-an-employee-of-the-fund-g-view/deduction-of-an-amount-to-an-employee-of-the-fund-g-view.component';
import { DeductionOfAnAmountToAnEmployeeOfTheFundGService } from '../shared/deduction-of-an-amount-to-an-employee-of-the-fund-g.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-deduction-of-an-amount-to-an-employee-of-the-fund-g-list',
  templateUrl: './deduction-of-an-amount-to-an-employee-of-the-fund-g-list.component.html',
  styleUrls: ['./deduction-of-an-amount-to-an-employee-of-the-fund-g-list.component.scss'],
  providers: []
})

export class DeductionOfAnAmountToAnEmployeeOfTheFundGListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private employeeStatusesService: LookupService;
private subscriptionStatusService: LookupService;

  
employeeStatusSelectOptions: MaterialSelectOptions;
subscriptionStatusSelectOptions: MaterialSelectOptions;

  
	@ViewChild('employeeStatus', { static: true }) EmployeeStatusSelectComponent: MaterialSelectComponent;
	@ViewChild('subscriptionStatus', { static: true }) SubscriptionStatusSelectComponent: MaterialSelectComponent;

  
  @Input() selectedDeductionOfAnAmountToAnEmployeeOfTheFundG: DeductionOfAnAmountToAnEmployeeOfTheFundG;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'المرتب الاساسى', field: 'basicSalary' }),
	new GridColumnOptions({ headerName: 'قيم مبالغ الاشتراك', field: 'subscriptionAmounts' }),
	new GridColumnOptions({ headerName: 'سبب خصم المبلغ', field: 'amountDeductingReason' }),
	new GridColumnOptions({ headerName: 'كود المستفيد', field: 'beneficiaryCode' }),
	new GridColumnOptions({ headerName: 'اسم المستفيد', field: 'beneficiaryName' }),
	new GridColumnOptions({ headerName: 'قيمه الشيك', field: 'checkAmount' }),
	new GridColumnOptions({ headerName: 'بيان البنك', field: 'bankStatement' }),
	new GridColumnOptions({ headerName: 'رقم الشيك', field: 'checkNumber' }),
	new GridColumnOptions({ headerName: 'تاريخ الشيك', field: 'checkDate' }),
	new GridColumnOptions({ headerName: 'كود العضويه', field: 'membershipCode' }),
	new GridColumnOptions({ headerName: 'حاله الاشتراك', field: 'subscriptionStatus' }),
	new GridColumnOptions({ headerName: 'كود الموظف', field: 'employeeCode' }),
	new GridColumnOptions({ headerName: 'كود البنك', field: 'bankCode' }),
	new GridColumnOptions({ headerName: 'حاله الموظف', field: 'employeeStatus' }),
	new GridColumnOptions({ headerName: 'كود الاداره', field: 'administrationCode' }),
	new GridColumnOptions({ headerName: 'كود الصندوق', field: 'boxCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: DeductionOfAnAmountToAnEmployeeOfTheFundGViewComponent,
    editDialogClassType: DeductionOfAnAmountToAnEmployeeOfTheFundGEditComponent,
    newDialogClassType: DeductionOfAnAmountToAnEmployeeOfTheFundGNewComponent,
  });
    constructor(
        injector: Injector,
        public deductionOfAnAmountToAnEmployeeOfTheFundGService: DeductionOfAnAmountToAnEmployeeOfTheFundGService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundG = new DeductionOfAnAmountToAnEmployeeOfTheFundG();

    
	this.employeeStatusSelectOptions = new MaterialSelectOptions({
	 data: this.employeeStatusesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حاله الموظف',
	});

	this.subscriptionStatusSelectOptions = new MaterialSelectOptions({
	 data: this.subscriptionStatusService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حاله الاشتراك',
	});


    this.searchForm = this.formBuilder.group({
     	employeeCode : [],
	membershipCode : [],
	employeeStatus : [],
	subscriptionStatus : []
    });

     
  }

  getDeductionOfAnAmountsToAnEmployeeOfTheFundPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<DeductionOfAnAmountToAnEmployeeOfTheFundG[]> => {
    return this.deductionOfAnAmountToAnEmployeeOfTheFundGService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.deductionOfAnAmountToAnEmployeeOfTheFundGService.delete(param.data.id)
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
    this.employeeStatusesService = new LookupService('employeestatuses', this.http);
this.subscriptionStatusService = new LookupService('subscriptionstatuses', this.http);
  }
}

