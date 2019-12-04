
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { DataToTakeSpecialLeaveForEmployeeA } from 'app/shared/models/data-to-take-special-leave-for-employee-a';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { DataToTakeSpecialLeaveForEmployeeAEditComponent } from '../data-to-take-special-leave-for-employee-a-edit/data-to-take-special-leave-for-employee-a-edit.component';
import { DataToTakeSpecialLeaveForEmployeeANewComponent } from '../data-to-take-special-leave-for-employee-a-new/data-to-take-special-leave-for-employee-a-new.component';
import { DataToTakeSpecialLeaveForEmployeeAViewComponent } from '../data-to-take-special-leave-for-employee-a-view/data-to-take-special-leave-for-employee-a-view.component';
import { DataToTakeSpecialLeaveForEmployeeAService } from '../shared/data-to-take-special-leave-for-employee-a.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-data-to-take-special-leave-for-employee-a-list',
  templateUrl: './data-to-take-special-leave-for-employee-a-list.component.html',
  styleUrls: ['./data-to-take-special-leave-for-employee-a-list.component.scss'],
  providers: []
})

export class DataToTakeSpecialLeaveForEmployeeAListComponent extends AppBaseComponent implements OnInit {
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
  private vacationTypesService: LookupService;
private departmentsSectionsService: LookupService;
private employeeStatusesService: LookupService;

  
vacationTypeSelectOptions: MaterialSelectOptions;
administrationCodeSelectOptions: MaterialSelectOptions;
employeeStatusSelectOptions: MaterialSelectOptions;

  
	@ViewChild('vacationType', { static: true }) VacationTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('administrationCode', { static: true }) AdministrationCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('employeeStatus', { static: true }) EmployeeStatusSelectComponent: MaterialSelectComponent;

  
benefitsAmountIsVisible: boolean;
  @Input() selectedDataToTakeSpecialLeaveForEmployeeA: DataToTakeSpecialLeaveForEmployeeA;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود الموظف', field: 'employeeCode' }),
	new GridColumnOptions({ headerName: 'المرتب', field: 'salary' }),
	new GridColumnOptions({ headerName: 'المده الى', field: 'durationTo' }),
	new GridColumnOptions({ headerName: 'ألمده من', field: 'durationFrom' }),
	new GridColumnOptions({ headerName: 'القيمة الاجمالية', field: 'totalAmount' }),
	new GridColumnOptions({ headerName: 'غرامه تاخير', field: 'delayPenalty' }),
	new GridColumnOptions({ headerName: 'تاريخ الايصال', field: 'receiptDate' }),
	new GridColumnOptions({ headerName: 'رقم الايصال', field: 'receiptNumber' }),
	new GridColumnOptions({ headerName: 'تاريخ الامر التنفيذي', field: 'executiveOrderDate' }),
	new GridColumnOptions({ headerName: 'رقم امر تنفيذي', field: 'executiveOrderNumber' }),
	new GridColumnOptions({ headerName: 'قيمة المصروف', field: 'expenseAmount' }),
	new GridColumnOptions({ headerName: 'قيمة الفوائد', field: 'benefitsAmount' }),
	new GridColumnOptions({ headerName: 'تاريخ نهاية الاجازة', field: 'vacationEndDate' }),
	new GridColumnOptions({ headerName: 'تاريخ بداية الاجازة', field: 'vacationStartDate' }),
	new GridColumnOptions({ headerName: 'رقم عضويه', field: 'membershipNumber' }),
	new GridColumnOptions({ headerName: 'تاريخ الاشترك', field: 'subscriptionDate' }),
	new GridColumnOptions({ headerName: 'حالة الاشتراك', field: 'subscriptionStatus' }),
	new GridColumnOptions({ headerName: 'علاوات', field: 'bonuses' }),
	new GridColumnOptions({ headerName: 'مبلغ مطلوب', field: 'requiredAmount' }),
	new GridColumnOptions({ headerName: 'نوع الاجازة', field: 'vacationType' }),
	new GridColumnOptions({ headerName: 'كود الاداره', field: 'administrationCode' }),
	new GridColumnOptions({ headerName: 'حاله الموظف', field: 'employeeStatus' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: DataToTakeSpecialLeaveForEmployeeAViewComponent,
    editDialogClassType: DataToTakeSpecialLeaveForEmployeeAEditComponent,
    newDialogClassType: DataToTakeSpecialLeaveForEmployeeANewComponent,
  });
    constructor(
        injector: Injector,
        public dataToTakeSpecialLeaveForEmployeeAService: DataToTakeSpecialLeaveForEmployeeAService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedDataToTakeSpecialLeaveForEmployeeA = new DataToTakeSpecialLeaveForEmployeeA();

    
	this.vacationTypeSelectOptions = new MaterialSelectOptions({
	 data: this.vacationTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الاجازة',
	});

	this.administrationCodeSelectOptions = new MaterialSelectOptions({
	 data: this.departmentsSectionsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الاداره',
	});

	this.employeeStatusSelectOptions = new MaterialSelectOptions({
	 data: this.employeeStatusesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حاله الموظف',
	});


    this.searchForm = this.formBuilder.group({
     	employeeCode : [],
	salary : [],
	durationTo : [],
	durationFrom : [],
	totalAmount : [],
	delayPenalty : [],
	receiptDate : [],
	receiptNumber : [],
	executiveOrderDate : [],
	executiveOrderNumber : [],
	expenseAmount : [],
	benefitsAmount : [],
	vacationEndDate : [],
	vacationStartDate : [],
	membershipNumber : [],
	subscriptionDate : [],
	subscriptionStatus : [],
	bonuses : [],
	requiredAmount : [],
	vacationType : [],
	administrationCode : [],
	employeeStatus : []}, {
	 validators: [
		 ValidatorFunctions.validateLess("VacationEndDate","VacationStartDate"),
		 ValidatorFunctions.validateGreater("DurationTo","DurationFrom")]
    });

     
  }

  getDataToTakeSpecialLeaveForEmployeesPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<DataToTakeSpecialLeaveForEmployeeA[]> => {
    return this.dataToTakeSpecialLeaveForEmployeeAService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.dataToTakeSpecialLeaveForEmployeeAService.delete(param.data.id)
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
    this.vacationTypesService = new LookupService('vacationtypes', this.http);
this.departmentsSectionsService = new LookupService('departmentssections', this.http);
this.employeeStatusesService = new LookupService('employeestatuses', this.http);
  }
}

