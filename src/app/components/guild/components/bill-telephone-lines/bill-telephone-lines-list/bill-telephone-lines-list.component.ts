
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { BillTelephoneLines } from 'app/shared/models/bill-telephone-lines';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { BillTelephoneLinesEditComponent } from '../bill-telephone-lines-edit/bill-telephone-lines-edit.component';
import { BillTelephoneLinesNewComponent } from '../bill-telephone-lines-new/bill-telephone-lines-new.component';
import { BillTelephoneLinesViewComponent } from '../bill-telephone-lines-view/bill-telephone-lines-view.component';
import { BillTelephoneLinesService } from '../shared/bill-telephone-lines.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-bill-telephone-lines-list',
  templateUrl: './bill-telephone-lines-list.component.html',
  styleUrls: ['./bill-telephone-lines-list.component.scss'],
  providers: []
})

export class BillTelephoneLinesListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private subDepartmentsService: LookupService;
private employeeStatusesService: LookupService;
private lineTypesService: LookupService;

  
administrationCodeSelectOptions: MaterialSelectOptions;
employeeStatusSelectOptions: MaterialSelectOptions;
lineTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('administrationCode', { static: true }) AdministrationCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('employeeStatus', { static: true }) EmployeeStatusSelectComponent: MaterialSelectComponent;
	@ViewChild('lineType', { static: true }) LineTypeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedBillTelephoneLines: BillTelephoneLines;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود الموظف', field: 'employeeCode' }),
	new GridColumnOptions({ headerName: ' رقم التليفون', field: 'phoneNumber' }),
	new GridColumnOptions({ headerName: ' قيمه الفاتورة', field: 'invoiceValue' }),
	new GridColumnOptions({ headerName: 'كود الاداره', field: 'administrationCode' }),
	new GridColumnOptions({ headerName: ' حاله الموظف', field: 'employeeStatus' }),
	new GridColumnOptions({ headerName: ' نوع الخط', field: 'lineType' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: BillTelephoneLinesViewComponent,
    editDialogClassType: BillTelephoneLinesEditComponent,
    newDialogClassType: BillTelephoneLinesNewComponent,
  });
    constructor(
        injector: Injector,
        public billTelephoneLinesService: BillTelephoneLinesService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedBillTelephoneLines = new BillTelephoneLines();

    
	this.administrationCodeSelectOptions = new MaterialSelectOptions({
	 data: this.subDepartmentsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الاداره',
	});

	this.employeeStatusSelectOptions = new MaterialSelectOptions({
	 data: this.employeeStatusesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' حاله الموظف',
	});

	this.lineTypeSelectOptions = new MaterialSelectOptions({
	 data: this.lineTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' نوع الخط',
	});


    this.searchForm = this.formBuilder.group({
     	employeeCode : [],
	phoneNumber : [],
	administrationCode : [],
	employeeStatus : [],
	lineType : []
    });

     
  }

  getBillTelephoneLinesPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<BillTelephoneLines[]> => {
    return this.billTelephoneLinesService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.billTelephoneLinesService.delete(param.data.id)
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
    this.subDepartmentsService = new LookupService('subdepartments', this.http);
this.employeeStatusesService = new LookupService('employeestatuses', this.http);
this.lineTypesService = new LookupService('linetypes', this.http);
  }
}

