
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { TerminationOfTheParticipationOfAnEmployeeInTheFundG } from 'app/shared/models/termination-of-the-participation-of-an-employee-in-the-fund-g';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { TerminationOfTheParticipationOfAnEmployeeInTheFundGEditComponent } from '../termination-of-the-participation-of-an-employee-in-the-fund-g-edit/termination-of-the-participation-of-an-employee-in-the-fund-g-edit.component';
import { TerminationOfTheParticipationOfAnEmployeeInTheFundGNewComponent } from '../termination-of-the-participation-of-an-employee-in-the-fund-g-new/termination-of-the-participation-of-an-employee-in-the-fund-g-new.component';
import { TerminationOfTheParticipationOfAnEmployeeInTheFundGViewComponent } from '../termination-of-the-participation-of-an-employee-in-the-fund-g-view/termination-of-the-participation-of-an-employee-in-the-fund-g-view.component';
import { TerminationOfTheParticipationOfAnEmployeeInTheFundGService } from '../shared/termination-of-the-participation-of-an-employee-in-the-fund-g.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-termination-of-the-participation-of-an-employee-in-the-fund-g-list',
  templateUrl: './termination-of-the-participation-of-an-employee-in-the-fund-g-list.component.html',
  styleUrls: ['./termination-of-the-participation-of-an-employee-in-the-fund-g-list.component.scss'],
  providers: []
})

export class TerminationOfTheParticipationOfAnEmployeeInTheFundGListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private subscriptionStatusService: LookupService;
private employeeStatusesService: LookupService;
private departmentsSectionsService: LookupService;
private terminationTypesService: LookupService;

  
subscriptionStatusSelectOptions: MaterialSelectOptions;
employeeStatusSelectOptions: MaterialSelectOptions;
administrationCodeSelectOptions: MaterialSelectOptions;
terminationTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('subscriptionStatus', { static: true }) SubscriptionStatusSelectComponent: MaterialSelectComponent;
	@ViewChild('employeeStatus', { static: true }) EmployeeStatusSelectComponent: MaterialSelectComponent;
	@ViewChild('administrationCode', { static: true }) AdministrationCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('terminationType', { static: true }) TerminationTypeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedTerminationOfTheParticipationOfAnEmployeeInTheFundG: TerminationOfTheParticipationOfAnEmployeeInTheFundG;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود العضويه', field: 'membershipCode' }),
	new GridColumnOptions({ headerName: 'المبلغ المستحق للموظف', field: 'employeeDeservedAmount' }),
	new GridColumnOptions({ headerName: 'تاريخ الشيك', field: 'checkDate' }),
	new GridColumnOptions({ headerName: 'حاله الاشتراك', field: 'subscriptionStatus' }),
	new GridColumnOptions({ headerName: 'بيان البنك', field: 'bankStatement' }),
	new GridColumnOptions({ headerName: 'قيمه الشيك', field: 'checkAmount' }),
	new GridColumnOptions({ headerName: 'اسم المستفيد', field: 'beneficiaryName' }),
	new GridColumnOptions({ headerName: 'تاريخ الانهاء', field: 'endDate' }),
	new GridColumnOptions({ headerName: 'نوع الانهاء', field: 'terminationType' }),
	new GridColumnOptions({ headerName: 'سبب الخصم', field: 'deductionReason' }),
	new GridColumnOptions({ headerName: 'رقم الشيك', field: 'checkNumber' }),
	new GridColumnOptions({ headerName: 'مبالغ يتم خصمها مع الميزه', field: 'deductedAmountsWithFeature' }),
	new GridColumnOptions({ headerName: 'قيم مبالغ الاشتراك', field: 'subscriptionAmounts' }),
	new GridColumnOptions({ headerName: 'اجر الاشتراك بدل المرتب الاساسي', field: 'subscriptionFeeInsteadSalary' }),
	new GridColumnOptions({ headerName: 'كود الموظف', field: 'employeeCode' }),
	new GridColumnOptions({ headerName: 'حاله الموظف', field: 'employeeStatus' }),
	new GridColumnOptions({ headerName: 'كود الاداره', field: 'administrationCode' }),
	new GridColumnOptions({ headerName: 'كود المستفيد', field: 'beneficiaryCode' }),
	new GridColumnOptions({ headerName: 'كود البنك', field: 'bankCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: TerminationOfTheParticipationOfAnEmployeeInTheFundGViewComponent,
    editDialogClassType: TerminationOfTheParticipationOfAnEmployeeInTheFundGEditComponent,
    newDialogClassType: TerminationOfTheParticipationOfAnEmployeeInTheFundGNewComponent,
  });
    constructor(
        injector: Injector,
        public terminationOfTheParticipationOfAnEmployeeInTheFundGService: TerminationOfTheParticipationOfAnEmployeeInTheFundGService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedTerminationOfTheParticipationOfAnEmployeeInTheFundG = new TerminationOfTheParticipationOfAnEmployeeInTheFundG();

    
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

	this.administrationCodeSelectOptions = new MaterialSelectOptions({
	 data: this.departmentsSectionsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الاداره',
	});

	this.terminationTypeSelectOptions = new MaterialSelectOptions({
	 data: this.terminationTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الانهاء',
	});


    this.searchForm = this.formBuilder.group({
     	membershipCode : [],
	employeeCode : [],
	subscriptionStatus : [],
	employeeStatus : [],
	administrationCode : [],
	terminationType : []
    });

     
  }

  getTerminationOfTheParticipationOfAnEmployeesInTheFundPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<TerminationOfTheParticipationOfAnEmployeeInTheFundG[]> => {
    return this.terminationOfTheParticipationOfAnEmployeeInTheFundGService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.terminationOfTheParticipationOfAnEmployeeInTheFundGService.delete(param.data.id)
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
    this.subscriptionStatusService = new LookupService('subscriptionstatuses', this.http);
this.employeeStatusesService = new LookupService('employeestatuses', this.http);
this.departmentsSectionsService = new LookupService('departmentssections', this.http);
this.terminationTypesService = new LookupService('terminationtypes', this.http);
  }
}

