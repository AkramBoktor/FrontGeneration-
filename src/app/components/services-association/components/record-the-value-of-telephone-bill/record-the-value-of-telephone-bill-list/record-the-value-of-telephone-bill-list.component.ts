
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { RecordTheValueOfTelephoneBill } from 'app/shared/models/record-the-value-of-telephone-bill';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { RecordTheValueOfTelephoneBillEditComponent } from '../record-the-value-of-telephone-bill-edit/record-the-value-of-telephone-bill-edit.component';
import { RecordTheValueOfTelephoneBillNewComponent } from '../record-the-value-of-telephone-bill-new/record-the-value-of-telephone-bill-new.component';
import { RecordTheValueOfTelephoneBillViewComponent } from '../record-the-value-of-telephone-bill-view/record-the-value-of-telephone-bill-view.component';
import { RecordTheValueOfTelephoneBillService } from '../shared/record-the-value-of-telephone-bill.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-record-the-value-of-telephone-bill-list',
  templateUrl: './record-the-value-of-telephone-bill-list.component.html',
  styleUrls: ['./record-the-value-of-telephone-bill-list.component.scss'],
  providers: []
})

export class RecordTheValueOfTelephoneBillListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private departmentsSectionsService: LookupService;
private employeeStatusesService: LookupService;

  
managementCodeSelectOptions: MaterialSelectOptions;
employeeStatusCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('managementCode', { static: true }) ManagementCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('employeeStatusCode', { static: true }) EmployeeStatusCodeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedRecordTheValueOfTelephoneBill: RecordTheValueOfTelephoneBill;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: ' شهر الدين', field: 'debtMonth' }),
	new GridColumnOptions({ headerName: ' فترة الحساب من ', field: 'calculationPeriodFrom' }),
	new GridColumnOptions({ headerName: ' فترة الحساب الي', field: 'calculationPeriodTo' }),
	new GridColumnOptions({ headerName: ' رقم التليفون', field: 'phoneNumber' }),
	new GridColumnOptions({ headerName: ' مسلسل الفاتورة بالشهر', field: 'invoiceSerialMonth' }),
	new GridColumnOptions({ headerName: 'كود الموظف', field: 'employeeCode' }),
	new GridColumnOptions({ headerName: ' اسم الموظف', field: 'employeeName' }),
	new GridColumnOptions({ headerName: ' اسم الادارة', field: 'administrationName' }),
	new GridColumnOptions({ headerName: ' حالة الموظف', field: 'employeeStatus' }),
	new GridColumnOptions({ headerName: ' قيمة الفاتورة', field: 'invoiceValue' }),
	new GridColumnOptions({ headerName: '  مصاريف ادارية', field: 'administrativeExpenses' }),
	new GridColumnOptions({ headerName: ' جملة الفاتورة', field: 'totalInvoice' }),
	new GridColumnOptions({ headerName: ' كود الادارة', field: 'managementCode' }),
	new GridColumnOptions({ headerName: ' كود حالة الموظف', field: 'employeeStatusCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: RecordTheValueOfTelephoneBillViewComponent,
    editDialogClassType: RecordTheValueOfTelephoneBillEditComponent,
    newDialogClassType: RecordTheValueOfTelephoneBillNewComponent,
  });
    constructor(
        injector: Injector,
        public recordTheValueOfTelephoneBillService: RecordTheValueOfTelephoneBillService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedRecordTheValueOfTelephoneBill = new RecordTheValueOfTelephoneBill();

    
	this.managementCodeSelectOptions = new MaterialSelectOptions({
	 data: this.departmentsSectionsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' كود الادارة',
	});

	this.employeeStatusCodeSelectOptions = new MaterialSelectOptions({
	 data: this.employeeStatusesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' كود حالة الموظف',
	});


    this.searchForm = this.formBuilder.group({
     	debtMonth : [],
	calculationPeriodFrom : [],
	calculationPeriodTo : [],
	phoneNumber : [],
	invoiceSerialMonth : [],
	employeeCode : [],
	employeeName : [],
	administrationName : [],
	employeeStatus : [],
	invoiceValue : [],
	administrativeExpenses : [],
	totalInvoice : [],
	managementCode : [],
	employeeStatusCode : []
    });

     
  }

  getRecordTheValueOfTelephoneBillPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<RecordTheValueOfTelephoneBill[]> => {
    return this.recordTheValueOfTelephoneBillService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.recordTheValueOfTelephoneBillService.delete(param.data.id)
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
this.employeeStatusesService = new LookupService('employeestatuses', this.http);
  }
}

