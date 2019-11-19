
import { Component, OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions, GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { TransferContractedEmployee } from 'app/shared/models/transfer-contracted-employee';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { TransferContractedEmployeeEditComponent } from '../transfer-contracted-employee-edit/transfer-contracted-employee-edit.component';
import { TransferContractedEmployeeNewComponent } from '../transfer-contracted-employee-new/transfer-contracted-employee-new.component';
import { TransferContractedEmployeeViewComponent } from '../transfer-contracted-employee-view/transfer-contracted-employee-view.component';
import { TransferContractedEmployeeService } from '../shared/transfer-contracted-employee.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
	selector: 'app-transfer-contracted-employee-list',
	templateUrl: './transfer-contracted-employee-list.component.html',
	styleUrls: ['./transfer-contracted-employee-list.component.scss'],
	providers: []
})

export class TransferContractedEmployeeListComponent extends AppBaseComponent implements OnInit {
	searchForm: FormGroup;
	errorMessages: FormControlError[] = [

	];
	private jobTypesService: LookupService;
	private centralDepartmentsService: LookupService;
	private subDepartmentsService: LookupService;


	jobTitleSelectOptions: MaterialSelectOptions;
	fromCentralAdministrationSelectOptions: MaterialSelectOptions;
	fromSubAdministrationSelectOptions: MaterialSelectOptions;
	toCentralAdministrationSelectOptions: MaterialSelectOptions;
	toSubAdministrationSelectOptions: MaterialSelectOptions;


	@ViewChild('jobTitle', { static: true }) JobTitleSelectComponent: MaterialSelectComponent;
	@ViewChild('fromCentralAdministration', { static: true }) FromCentralAdministrationSelectComponent: MaterialSelectComponent;
	@ViewChild('fromSubAdministration', { static: true }) FromSubAdministrationSelectComponent: MaterialSelectComponent;
	@ViewChild('toCentralAdministration', { static: true }) ToCentralAdministrationSelectComponent: MaterialSelectComponent;
	@ViewChild('toSubAdministration', { static: true }) ToSubAdministrationSelectComponent: MaterialSelectComponent;


	@Input() selectedTransferContractedEmployee: TransferContractedEmployee;
	// static: false --> very important
	@ViewChild('gridControl', { static: false }) grid: GridControlComponent;

	columnOptions = [

		new GridColumnOptions({ headerName: 'كود الموظف', field: 'employeeCode' }),
		new GridColumnOptions({ headerName: 'رقم الفتره', field: 'periodNumber' }),
		new GridColumnOptions({ headerName: 'تاريخ بدايه الفتره', field: 'periodStartDate' }),
		new GridColumnOptions({ headerName: 'تاريخ نهايه الفتره', field: 'periodEndDate' }),
		new GridColumnOptions({ headerName: 'تاريخ الالتحاق يها', field: 'hiringDate' }),
		new GridColumnOptions({ headerName: 'تاريخ النقل', field: 'transferDate' }),
		new GridColumnOptions({ headerName: 'تاريخ امر التنفيذ', field: 'executionOrderDate' }),
		new GridColumnOptions({ headerName: 'رقم امر التنفيذ', field: 'executionOrderNumber' }),
		new GridColumnOptions({ headerName: 'الوظيفه', field: 'jobTitle' }),
		new GridColumnOptions({ headerName: 'الاداره المركزيه المنقول منها', field: 'fromCentralAdministration' }),
		new GridColumnOptions({ headerName: 'الادارة الفرعية المنقول منها', field: 'fromSubAdministration' }),
		new GridColumnOptions({ headerName: 'الاداره المركزيه المنقول لها', field: 'toCentralAdministration' }),
		new GridColumnOptions({ headerName: 'الاداره الفرعيه المنقول لها', field: 'toSubAdministration' }),
	];

	gridHeaderOptions = new GridHeaderOptions({
		viewDialogClassType: TransferContractedEmployeeViewComponent,
		editDialogClassType: TransferContractedEmployeeEditComponent,
		newDialogClassType: TransferContractedEmployeeNewComponent,
	});
	constructor(
		injector: Injector,
		public transferContractedEmployeeService: TransferContractedEmployeeService) {
		super(injector);
	}

	ngOnInit(): void {
		this.initializeLookupServices();
		this.selectedTransferContractedEmployee = new TransferContractedEmployee();


		this.jobTitleSelectOptions = new MaterialSelectOptions({
			data: this.jobTypesService.getAll(),
			errorMessages: this.errorMessages,
			label: 'الوظيفه',
		});

		this.fromCentralAdministrationSelectOptions = new MaterialSelectOptions({
			data: this.centralDepartmentsService.getAll(),
			errorMessages: this.errorMessages,
			label: 'الاداره المركزيه المنقول منها',
		});

		this.fromSubAdministrationSelectOptions = new MaterialSelectOptions({
			data: this.subDepartmentsService.getAll(),
			errorMessages: this.errorMessages,
			label: 'الادارة الفرعية المنقول منها',
		});

		this.toCentralAdministrationSelectOptions = new MaterialSelectOptions({
			data: this.centralDepartmentsService.getAll(),
			errorMessages: this.errorMessages,
			label: 'الاداره المركزيه المنقول لها',
		});

		this.toSubAdministrationSelectOptions = new MaterialSelectOptions({
			data: this.subDepartmentsService.getAll(),
			errorMessages: this.errorMessages,
			label: 'الاداره الفرعيه المنقول لها',
		});


		this.searchForm = this.formBuilder.group({
			employeeCode: [],
			periodNumber: [],
			periodStartDate: [],
			periodEndDate: [],
			hiringDate: [],
			transferDate: [],
			executionOrderDate: [],
			executionOrderNumber: [],
			jobTitle: [],
			fromCentralAdministration: [],
			fromSubAdministration: [],
			toCentralAdministration: [],
			toSubAdministration: []
		});


	}

	getTransferContractedEmployeePaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<TransferContractedEmployee[]> => {
		return this.transferContractedEmployeeService.getAllWithFilter(arg);
	}

	onDeleteClicked(param): void {
		this.transferContractedEmployeeService.delete(param.data.id)
			.pipe(take(1))
			.subscribe(() => this.grid.refreshData());
	}

	onBeginSearch(): void {
		this.grid.beginSearch(this.searchForm.value);
	}

	onCreate(): void {
		this.router.navigate(['new'], { relativeTo: this.activatedRoute });
	}

	getControls(name: string) {
		return this.searchForm.get(name);
	}

	initializeLookupServices() {
		this.jobTypesService = new LookupService('jobtypes', this.http);
		this.centralDepartmentsService = new LookupService('centraldepartments', this.http);
		this.subDepartmentsService = new LookupService('subdepartments', this.http);
	}
}

