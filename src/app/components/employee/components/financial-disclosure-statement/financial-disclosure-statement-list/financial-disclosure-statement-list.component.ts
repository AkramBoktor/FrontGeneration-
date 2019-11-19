
import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { GridColumnOptions, GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { FormControlError, GridPaginatedSortedFiltered } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { FinancialDisclosureStatement } from 'app/shared/models/financial-disclosure-statement';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { FinancialDisclosureStatementEditComponent } from '../financial-disclosure-statement-edit/financial-disclosure-statement-edit.component';
import { FinancialDisclosureStatementNewComponent } from '../financial-disclosure-statement-new/financial-disclosure-statement-new.component';
import { FinancialDisclosureStatementViewComponent } from '../financial-disclosure-statement-view/financial-disclosure-statement-view.component';
import { FinancialDisclosureStatementService } from '../shared/financial-disclosure-statement.service';

@Component({
  selector: 'app-financial-disclosure-statement-list',
  templateUrl: './financial-disclosure-statement-list.component.html',
  styleUrls: ['./financial-disclosure-statement-list.component.scss'],
  providers: []
})

export class FinancialDisclosureStatementListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private centralDepartmentsService: LookupService;
private subDepartmentsService: LookupService;
private jobTypesService: LookupService;

  
centralAdministrationSelectOptions: MaterialSelectOptions;
subAdministrationSelectOptions: MaterialSelectOptions;
jobTitleSelectOptions: MaterialSelectOptions;

  
	@ViewChild('centralAdministration', { static: true }) CentralAdministrationSelectComponent: MaterialSelectComponent;
	@ViewChild('subAdministration', { static: true }) SubAdministrationSelectComponent: MaterialSelectComponent;
	@ViewChild('jobTitle', { static: true }) JobTitleSelectComponent: MaterialSelectComponent;

  
  @Input() selectedFinancialDisclosureStatement: FinancialDisclosureStatement;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود الموظف', field: 'employeeCode' }),
	new GridColumnOptions({ headerName: 'تاريخ تسليم الملف', field: 'fileDeliveryDate' }),
	new GridColumnOptions({ headerName: 'تاريخ استلام الملف', field: 'fileReceiptDate' }),
	new GridColumnOptions({ headerName: 'اسم الموظف', field: 'employeeName' }),
	new GridColumnOptions({ headerName: 'حاله الموظف', field: 'employeeStatues' }),
	new GridColumnOptions({ headerName: 'تاريخ الميلاد', field: 'brithDate' }),
	new GridColumnOptions({ headerName: 'اسم الهيئه', field: 'centralAdministration' }),
	new GridColumnOptions({ headerName: 'اسم الاداره', field: 'subAdministration' }),
	new GridColumnOptions({ headerName: 'المسمى الوظيفى', field: 'jobTitle' }),
	new GridColumnOptions({ headerName: 'سبب  تقديم الاقرار', field: 'submissionReason' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: FinancialDisclosureStatementViewComponent,
    editDialogClassType: FinancialDisclosureStatementEditComponent,
    newDialogClassType: FinancialDisclosureStatementNewComponent,
  });
    constructor(
        injector: Injector,
        public financialDisclosureStatementService: FinancialDisclosureStatementService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedFinancialDisclosureStatement = new FinancialDisclosureStatement();

    
	this.centralAdministrationSelectOptions = new MaterialSelectOptions({
	 data: this.centralDepartmentsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'اسم الهيئه',
	});

	this.subAdministrationSelectOptions = new MaterialSelectOptions({
	 data: this.subDepartmentsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'اسم الاداره',
	});

	this.jobTitleSelectOptions = new MaterialSelectOptions({
	 data: this.jobTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المسمى الوظيفى',
	});


    this.searchForm = this.formBuilder.group({
     	employeeCode : [],
	fileDeliveryDate : [],
	fileReceiptDate : [],
	employeeName : [],
	employeeStatues : [],
	brithDate : [],
	centralAdministration : [],
	subAdministration : [],
	jobTitle : []
    });

     
  }

  getFinancialDisclosureStatementsPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<FinancialDisclosureStatement[]> => {
    return this.financialDisclosureStatementService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.financialDisclosureStatementService.delete(param.data.id)
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
this.jobTypesService = new LookupService('jobtypes', this.http);
  }
}

