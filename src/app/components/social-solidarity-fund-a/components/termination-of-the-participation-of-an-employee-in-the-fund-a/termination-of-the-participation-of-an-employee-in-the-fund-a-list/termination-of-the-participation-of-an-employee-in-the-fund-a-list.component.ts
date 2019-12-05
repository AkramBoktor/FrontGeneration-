
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { TerminationOfTheParticipationOfAnEmployeeInTheFundA } from 'app/shared/models/termination-of-the-participation-of-an-employee-in-the-fund-a';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { TerminationOfTheParticipationOfAnEmployeeInTheFundAEditComponent } from '../termination-of-the-participation-of-an-employee-in-the-fund-a-edit/termination-of-the-participation-of-an-employee-in-the-fund-a-edit.component';
import { TerminationOfTheParticipationOfAnEmployeeInTheFundANewComponent } from '../termination-of-the-participation-of-an-employee-in-the-fund-a-new/termination-of-the-participation-of-an-employee-in-the-fund-a-new.component';
import { TerminationOfTheParticipationOfAnEmployeeInTheFundAViewComponent } from '../termination-of-the-participation-of-an-employee-in-the-fund-a-view/termination-of-the-participation-of-an-employee-in-the-fund-a-view.component';
import { TerminationOfTheParticipationOfAnEmployeeInTheFundAService } from '../shared/termination-of-the-participation-of-an-employee-in-the-fund-a.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-termination-of-the-participation-of-an-employee-in-the-fund-a-list',
  templateUrl: './termination-of-the-participation-of-an-employee-in-the-fund-a-list.component.html',
  styleUrls: ['./termination-of-the-participation-of-an-employee-in-the-fund-a-list.component.scss'],
  providers: []
})

export class TerminationOfTheParticipationOfAnEmployeeInTheFundAListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private terminationTypesService: LookupService;
private departmentsSectionsService: LookupService;
private subscriptionStatusService: LookupService;
private employeeStatusesService: LookupService;

  
terminationTypeSelectOptions: MaterialSelectOptions;
administrationCodeSelectOptions: MaterialSelectOptions;
subscriptionStatusSelectOptions: MaterialSelectOptions;
employeeStatusSelectOptions: MaterialSelectOptions;

  
	@ViewChild('terminationType', { static: true }) TerminationTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('administrationCode', { static: true }) AdministrationCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('subscriptionStatus', { static: true }) SubscriptionStatusSelectComponent: MaterialSelectComponent;
	@ViewChild('employeeStatus', { static: true }) EmployeeStatusSelectComponent: MaterialSelectComponent;

  
  @Input() selectedTerminationOfTheParticipationOfAnEmployeeInTheFundA: TerminationOfTheParticipationOfAnEmployeeInTheFundA;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود الموظف', field: 'employeeCode' }),
	new GridColumnOptions({ headerName: 'بيان البنك', field: 'bankStatement' }),
	new GridColumnOptions({ headerName: 'قيمه الشيك', field: 'checkAmount' }),
	new GridColumnOptions({ headerName: 'اسم المستفيد', field: 'beneficiaryName' }),
	new GridColumnOptions({ headerName: 'تاريخ الانهاء', field: 'endDate' }),
	new GridColumnOptions({ headerName: 'سبب الخصم', field: 'deductionReason' }),
	new GridColumnOptions({ headerName: 'رقم الشيك', field: 'checkNumber' }),
	new GridColumnOptions({ headerName: 'مبالغ يتم خصمها مع الميزه', field: 'deductedAmountsWithFeature' }),
	new GridColumnOptions({ headerName: 'قيم مبالغ الاشتراك', field: 'subscriptionAmounts' }),
	new GridColumnOptions({ headerName: 'اجر الاشتراك بدل المرتب الاساسي', field: 'subscriptionFeeInsteadSalary' }),
	new GridColumnOptions({ headerName: 'نوع الانهاء', field: 'terminationType' }),
	new GridColumnOptions({ headerName: 'حاله الاشتراك', field: 'subscriptionStatus' }),
	new GridColumnOptions({ headerName: 'كود العضويه', field: 'membershipCode' }),
	new GridColumnOptions({ headerName: 'المبلغ المستحق للموظف', field: 'employeeDeservedAmount' }),
	new GridColumnOptions({ headerName: 'تاريخ الشيك', field: 'checkDate' }),
	new GridColumnOptions({ headerName: 'كود البنك', field: 'bankCode' }),
	new GridColumnOptions({ headerName: 'كود المستفيد', field: 'beneficiaryCode' }),
	new GridColumnOptions({ headerName: 'كود الاداره', field: 'administrationCode' }),
	new GridColumnOptions({ headerName: 'حاله الموظف', field: 'employeeStatus' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: TerminationOfTheParticipationOfAnEmployeeInTheFundAViewComponent,
    editDialogClassType: TerminationOfTheParticipationOfAnEmployeeInTheFundAEditComponent,
    newDialogClassType: TerminationOfTheParticipationOfAnEmployeeInTheFundANewComponent,
  });
    constructor(
        injector: Injector,
        public terminationOfTheParticipationOfAnEmployeeInTheFundAService: TerminationOfTheParticipationOfAnEmployeeInTheFundAService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundA = new TerminationOfTheParticipationOfAnEmployeeInTheFundA();

    
	this.terminationTypeSelectOptions = new MaterialSelectOptions({
	 data: this.terminationTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الانهاء',
	});

	this.administrationCodeSelectOptions = new MaterialSelectOptions({
	 data: this.departmentsSectionsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الاداره',
	});

	this.subscriptionStatusSelectOptions = new MaterialSelectOptions({
	 data: this.subscriptionStatusService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حاله الاشتراك',
	});

	this.employeeStatusSelectOptions = new MaterialSelectOptions({
	 data: this.employeeStatusesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حاله الموظف',
	});


    this.searchForm = this.formBuilder.group({
     	employeeCode : [],
	membershipCode : [],
	terminationType : [],
	administrationCode : [],
	subscriptionStatus : [],
	employeeStatus : []
    });

     
  }

  getTerminationOfTheParticipationOfAnEmployeesInTheFundPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<TerminationOfTheParticipationOfAnEmployeeInTheFundA[]> => {
    return this.terminationOfTheParticipationOfAnEmployeeInTheFundAService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.terminationOfTheParticipationOfAnEmployeeInTheFundAService.delete(param.data.id)
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
    this.terminationTypesService = new LookupService('terminationtypes', this.http);
this.departmentsSectionsService = new LookupService('departmentssections', this.http);
this.subscriptionStatusService = new LookupService('subscriptionstatuses', this.http);
this.employeeStatusesService = new LookupService('employeestatuses', this.http);
  }
}

