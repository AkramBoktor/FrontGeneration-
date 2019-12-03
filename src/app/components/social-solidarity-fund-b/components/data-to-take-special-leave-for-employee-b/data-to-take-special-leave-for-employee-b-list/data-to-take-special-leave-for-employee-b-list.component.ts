
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { DataToTakeSpecialLeaveForEmployeeB } from 'app/shared/models/data-to-take-special-leave-for-employee-b';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { DataToTakeSpecialLeaveForEmployeeBEditComponent } from '../data-to-take-special-leave-for-employee-b-edit/data-to-take-special-leave-for-employee-b-edit.component';
import { DataToTakeSpecialLeaveForEmployeeBNewComponent } from '../data-to-take-special-leave-for-employee-b-new/data-to-take-special-leave-for-employee-b-new.component';
import { DataToTakeSpecialLeaveForEmployeeBViewComponent } from '../data-to-take-special-leave-for-employee-b-view/data-to-take-special-leave-for-employee-b-view.component';
import { DataToTakeSpecialLeaveForEmployeeBService } from '../shared/data-to-take-special-leave-for-employee-b.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-data-to-take-special-leave-for-employee-b-list',
  templateUrl: './data-to-take-special-leave-for-employee-b-list.component.html',
  styleUrls: ['./data-to-take-special-leave-for-employee-b-list.component.scss'],
  providers: []
})

export class DataToTakeSpecialLeaveForEmployeeBListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
	{
	 errorName: 'Less',
	 errorMessage: ''
	},
	{
	 errorName: 'Greater',
	 errorMessage: ''
	}
      ];
  private employeeStatusesService: LookupService;
private departmentsSectionsService: LookupService;
private vacationTypesService: LookupService;

  
employeeStatusSelectOptions: MaterialSelectOptions;
administrationCodeSelectOptions: MaterialSelectOptions;
vacationTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('employeeStatus', { static: true }) EmployeeStatusSelectComponent: MaterialSelectComponent;
	@ViewChild('administrationCode', { static: true }) AdministrationCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('vacationType', { static: true }) VacationTypeSelectComponent: MaterialSelectComponent;

  
benefitsAmountIsVisible: boolean;
  @Input() selectedDataToTakeSpecialLeaveForEmployeeB: DataToTakeSpecialLeaveForEmployeeB;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود الموظف', field: 'employeeCode' }),
	new GridColumnOptions({ headerName: 'المرتب', field: 'salary' }),
	new GridColumnOptions({ headerName: 'المده الى', field: 'durationTo' }),
	new GridColumnOptions({ headerName: 'ألمده من', field: 'durationFrom' }),
	new GridColumnOptions({ headerName: 'مبلغ مطلوب', field: 'requiredAmount' }),
	new GridColumnOptions({ headerName: 'علاوات', field: 'bonuses' }),
	new GridColumnOptions({ headerName: 'حالة الاشتراك', field: 'subscriptionStatus' }),
	new GridColumnOptions({ headerName: 'تاريخ الاشترك', field: 'subscriptionDate' }),
	new GridColumnOptions({ headerName: 'رقم عضويه', field: 'membershipNumber' }),
	new GridColumnOptions({ headerName: 'تاريخ بداية الاجازة', field: 'vacationStartDate' }),
	new GridColumnOptions({ headerName: 'تاريخ نهاية الاجازة', field: 'vacationEndDate' }),
	new GridColumnOptions({ headerName: 'قيمة الفوائد', field: 'benefitsAmount' }),
	new GridColumnOptions({ headerName: 'قيمة المصروف', field: 'expenseAmount' }),
	new GridColumnOptions({ headerName: 'رقم امر تنفيذي', field: 'executiveOrderNumber' }),
	new GridColumnOptions({ headerName: 'تاريخ الامر التنفيذي', field: 'executiveOrderDate' }),
	new GridColumnOptions({ headerName: 'رقم الايصال', field: 'receiptNumber' }),
	new GridColumnOptions({ headerName: 'تاريخ الايصال', field: 'receiptDate' }),
	new GridColumnOptions({ headerName: 'غرامه تاخير', field: 'delayPenalty' }),
	new GridColumnOptions({ headerName: 'القيمة الاجمالية', field: 'totalAmount' }),
	new GridColumnOptions({ headerName: 'حاله الموظف', field: 'employeeStatus' }),
	new GridColumnOptions({ headerName: 'كود الاداره', field: 'administrationCode' }),
	new GridColumnOptions({ headerName: 'نوع الاجازة', field: 'vacationType' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: DataToTakeSpecialLeaveForEmployeeBViewComponent,
    editDialogClassType: DataToTakeSpecialLeaveForEmployeeBEditComponent,
    newDialogClassType: DataToTakeSpecialLeaveForEmployeeBNewComponent,
  });
    constructor(
        injector: Injector,
        public dataToTakeSpecialLeaveForEmployeeBService: DataToTakeSpecialLeaveForEmployeeBService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedDataToTakeSpecialLeaveForEmployeeB = new DataToTakeSpecialLeaveForEmployeeB();

    
	this.employeeStatusSelectOptions = new MaterialSelectOptions({
	 data: this.employeeStatusesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حاله الموظف',
	});

	this.administrationCodeSelectOptions = new MaterialSelectOptions({
	 data: this.departmentsSectionsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الاداره',
	});

	this.vacationTypeSelectOptions = new MaterialSelectOptions({
	 data: this.vacationTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الاجازة',
	});


    this.searchForm = this.formBuilder.group({
     	requiredAmount : [],
	bonuses : [],
	subscriptionStatus : [],
	subscriptionDate : [],
	membershipNumber : [],
	vacationStartDate : [],
	vacationEndDate : [],
	benefitsAmount : [],
	expenseAmount : [],
	executiveOrderNumber : [],
	executiveOrderDate : [],
	receiptNumber : [],
	receiptDate : [],
	delayPenalty : [],
	totalAmount : [],
	durationFrom : [],
	durationTo : [],
	salary : [],
	employeeCode : [],
	employeeStatus : [],
	administrationCode : [],
	vacationType : []}, {
	 validators: [
		 ValidatorFunctions.validateLess("VacationEndDate","VacationStartDate"),
		 ValidatorFunctions.validateGreater("DurationTo","DurationFrom")]
    });

     
  }

  getDataToTakeSpecialLeaveForEmployeesPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<DataToTakeSpecialLeaveForEmployeeB[]> => {
    return this.dataToTakeSpecialLeaveForEmployeeBService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.dataToTakeSpecialLeaveForEmployeeBService.delete(param.data.id)
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
this.departmentsSectionsService = new LookupService('departmentssections', this.http);
this.vacationTypesService = new LookupService('vacationtypes', this.http);
  }
}

