
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { DeductionOfAnAmountToAnEmployeeOfTheFundA } from 'app/shared/models/deduction-of-an-amount-to-an-employee-of-the-fund-a';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { DeductionOfAnAmountToAnEmployeeOfTheFundAEditComponent } from '../deduction-of-an-amount-to-an-employee-of-the-fund-a-edit/deduction-of-an-amount-to-an-employee-of-the-fund-a-edit.component';
import { DeductionOfAnAmountToAnEmployeeOfTheFundANewComponent } from '../deduction-of-an-amount-to-an-employee-of-the-fund-a-new/deduction-of-an-amount-to-an-employee-of-the-fund-a-new.component';
import { DeductionOfAnAmountToAnEmployeeOfTheFundAViewComponent } from '../deduction-of-an-amount-to-an-employee-of-the-fund-a-view/deduction-of-an-amount-to-an-employee-of-the-fund-a-view.component';
import { DeductionOfAnAmountToAnEmployeeOfTheFundAService } from '../shared/deduction-of-an-amount-to-an-employee-of-the-fund-a.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-deduction-of-an-amount-to-an-employee-of-the-fund-a-list',
  templateUrl: './deduction-of-an-amount-to-an-employee-of-the-fund-a-list.component.html',
  styleUrls: ['./deduction-of-an-amount-to-an-employee-of-the-fund-a-list.component.scss'],
  providers: []
})

export class DeductionOfAnAmountToAnEmployeeOfTheFundAListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private departmentsSectionsService: LookupService;
private relationshipTypesService: LookupService;
private employeeStatusesService: LookupService;

  
administrationCodeSelectOptions: MaterialSelectOptions;
beneficiaryCodeSelectOptions: MaterialSelectOptions;
employeeStatusSelectOptions: MaterialSelectOptions;

  
	@ViewChild('administrationCode', { static: true }) AdministrationCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('beneficiaryCode', { static: true }) BeneficiaryCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('employeeStatus', { static: true }) EmployeeStatusSelectComponent: MaterialSelectComponent;

  
  @Input() selectedDeductionOfAnAmountToAnEmployeeOfTheFundA: DeductionOfAnAmountToAnEmployeeOfTheFundA;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود الموظف', field: 'employeeCode' }),
	new GridColumnOptions({ headerName: 'حاله الاشتراك', field: 'subscriptionStatus' }),
	new GridColumnOptions({ headerName: 'كود العضويه', field: 'membershipCode' }),
	new GridColumnOptions({ headerName: 'المرتب الاساسى', field: 'basicSalary' }),
	new GridColumnOptions({ headerName: 'قيم مبالغ الاشتراك', field: 'subscriptionAmounts' }),
	new GridColumnOptions({ headerName: 'سبب خصم المبلغ', field: 'amountDeductingReason' }),
	new GridColumnOptions({ headerName: 'كود المستفيد', field: 'beneficiaryCode' }),
	new GridColumnOptions({ headerName: 'اسم المستفيد', field: 'beneficiaryName' }),
	new GridColumnOptions({ headerName: 'قيمه الشيك', field: 'checkAmount' }),
	new GridColumnOptions({ headerName: 'بيان البنك', field: 'bankStatement' }),
	new GridColumnOptions({ headerName: 'رقم الشيك', field: 'checkNumber' }),
	new GridColumnOptions({ headerName: 'تاريخ الشيك', field: 'checkDate' }),
	new GridColumnOptions({ headerName: 'كود الصندوق', field: 'boxCode' }),
	new GridColumnOptions({ headerName: 'كود الاداره', field: 'administrationCode' }),
	new GridColumnOptions({ headerName: 'حاله الموظف', field: 'employeeStatus' }),
	new GridColumnOptions({ headerName: 'كود البنك', field: 'bankCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: DeductionOfAnAmountToAnEmployeeOfTheFundAViewComponent,
    editDialogClassType: DeductionOfAnAmountToAnEmployeeOfTheFundAEditComponent,
    newDialogClassType: DeductionOfAnAmountToAnEmployeeOfTheFundANewComponent,
  });
    constructor(
        injector: Injector,
        public deductionOfAnAmountToAnEmployeeOfTheFundAService: DeductionOfAnAmountToAnEmployeeOfTheFundAService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedDeductionOfAnAmountToAnEmployeeOfTheFundA = new DeductionOfAnAmountToAnEmployeeOfTheFundA();

    
	this.administrationCodeSelectOptions = new MaterialSelectOptions({
	 data: this.departmentsSectionsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الاداره',
	});

	this.beneficiaryCodeSelectOptions = new MaterialSelectOptions({
	 data: this.relationshipTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود مستفيد',
	});

	this.employeeStatusSelectOptions = new MaterialSelectOptions({
	 data: this.employeeStatusesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حاله الموظف',
	});


    this.searchForm = this.formBuilder.group({
     	employeeCode : [],
	membershipNumber : [],
	administrationCode : [],
	beneficiaryCode : [],
	employeeStatus : []
    });

     
  }

  getDeductionOfAnAmountsToAnEmployeeOfTheFundPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<DeductionOfAnAmountToAnEmployeeOfTheFundA[]> => {
    return this.deductionOfAnAmountToAnEmployeeOfTheFundAService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.deductionOfAnAmountToAnEmployeeOfTheFundAService.delete(param.data.id)
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
this.relationshipTypesService = new LookupService('relationshiptypes', this.http);
this.employeeStatusesService = new LookupService('employeestatuses', this.http);
  }
}

