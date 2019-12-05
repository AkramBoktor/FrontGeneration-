
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { CashFormAllowance } from 'app/shared/models/cash-form-allowance';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { CashFormAllowanceEditComponent } from '../cash-form-allowance-edit/cash-form-allowance-edit.component';
import { CashFormAllowanceNewComponent } from '../cash-form-allowance-new/cash-form-allowance-new.component';
import { CashFormAllowanceViewComponent } from '../cash-form-allowance-view/cash-form-allowance-view.component';
import { CashFormAllowanceService } from '../shared/cash-form-allowance.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-cash-form-allowance-list',
  templateUrl: './cash-form-allowance-list.component.html',
  styleUrls: ['./cash-form-allowance-list.component.scss'],
  providers: []
})

export class CashFormAllowanceListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private areasService: LookupService;
private jobTypesService: LookupService;

  
requestingAreaSelectOptions: MaterialSelectOptions;
jobNumberSelectOptions: MaterialSelectOptions;

  
	@ViewChild('requestingArea', { static: true }) RequestingAreaSelectComponent: MaterialSelectComponent;
	@ViewChild('jobNumber', { static: true }) JobNumberSelectComponent: MaterialSelectComponent;

  
  @Input() selectedCashFormAllowance: CashFormAllowance;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'تاريخ تسجيل الاستمارة', field: 'formRegistrationDate' }),
	new GridColumnOptions({ headerName: 'مسلسل الاستمارة بالموازنة', field: 'formSerial' }),
	new GridColumnOptions({ headerName: 'كود المبنى', field: 'buildingCode' }),
	new GridColumnOptions({ headerName: 'رقم حالة الاستمارة', field: 'formStatus' }),
	new GridColumnOptions({ headerName: 'اسم حالة الاستمارة', field: 'formName' }),
	new GridColumnOptions({ headerName: 'رقم الباب', field: 'sectionNumber' }),
	new GridColumnOptions({ headerName: 'اسم الباب', field: 'sectionName' }),
	new GridColumnOptions({ headerName: 'رقم نوع العمل', field: 'workTypeNumber' }),
	new GridColumnOptions({ headerName: 'اسم نوع العمل', field: 'businessTypeName' }),
	new GridColumnOptions({ headerName: 'تاريخ حالة الاستمارة', field: 'formDate' }),
	new GridColumnOptions({ headerName: 'رقم صادر المنطقة الطالبة', field: 'numberIssuedRequestingArea' }),
	new GridColumnOptions({ headerName: 'تاريخ وارد الموازنة', field: 'budgetDate' }),
	new GridColumnOptions({ headerName: 'صافي المستخلص', field: 'netAbstract' }),
	new GridColumnOptions({ headerName: 'المنطقة الطالبة', field: 'requestingArea' }),
	new GridColumnOptions({ headerName: 'رقم الوظيفة', field: 'jobNumber' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: CashFormAllowanceViewComponent,
    editDialogClassType: CashFormAllowanceEditComponent,
    newDialogClassType: CashFormAllowanceNewComponent,
  });
    constructor(
        injector: Injector,
        public cashFormAllowanceService: CashFormAllowanceService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedCashFormAllowance = new CashFormAllowance();

    
	this.requestingAreaSelectOptions = new MaterialSelectOptions({
	 data: this.areasService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المنطقة الطالبة',
	});

	this.jobNumberSelectOptions = new MaterialSelectOptions({
	 data: this.jobTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'رقم الوظيفة',
	});


    this.searchForm = this.formBuilder.group({
     	formRegistrationDate : [],
	formSerial : [],
	buildingCode : [],
	formStatus : [],
	formName : [],
	sectionNumber : [],
	sectionName : [],
	workTypeNumber : [],
	businessTypeName : [],
	formDate : [],
	numberIssuedRequestingArea : [],
	budgetDate : [],
	
	netAbstract : [],
	requestingArea : [],
	jobNumber : []
    });

     
  }

  getCashFormAllowancePaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<CashFormAllowance[]> => {
    return this.cashFormAllowanceService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.cashFormAllowanceService.delete(param.data.id)
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
    this.areasService = new LookupService('areas', this.http);
this.jobTypesService = new LookupService('jobtypes', this.http);
  }
}

