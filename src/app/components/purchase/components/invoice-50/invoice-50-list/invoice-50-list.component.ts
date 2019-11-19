
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { Invoice50 } from 'app/shared/models/invoice-50';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { Invoice50EditComponent } from '../invoice-50-edit/invoice-50-edit.component';
import { Invoice50NewComponent } from '../invoice-50-new/invoice-50-new.component';
import { Invoice50ViewComponent } from '../invoice-50-view/invoice-50-view.component';
import { Invoice50Service } from '../shared/invoice-50.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-invoice-50-list',
  templateUrl: './invoice-50-list.component.html',
  styleUrls: ['./invoice-50-list.component.scss'],
  providers: []
})

export class Invoice50ListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private offeringTypesService: LookupService;
private governoratesService: LookupService;
private extractTypesService: LookupService;

  
offeringTypeSelectOptions: MaterialSelectOptions;
governorateSelectOptions: MaterialSelectOptions;
extractTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('governorate', { static: true }) GovernorateSelectComponent: MaterialSelectComponent;
	@ViewChild('extractType', { static: true }) ExtractTypeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedInvoice50: Invoice50;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'نسبة دفعة مقدمة', field: 'paymentRate' }),
	new GridColumnOptions({ headerName: 'تاريخ تسجيل الاستمارة', field: 'registrationDate' }),
	new GridColumnOptions({ headerName: 'خصم الدفعة المقدمة', field: 'prepaymentDiscount' }),
	new GridColumnOptions({ headerName: 'صافي المستخلص', field: 'netAbstract' }),
	new GridColumnOptions({ headerName: 'قيمة المستخلص', field: 'abstractValue' }),
	new GridColumnOptions({ headerName: 'رصيد الدفعة المقدمة', field: 'advanceBalance' }),
	new GridColumnOptions({ headerName: 'ما سبق صرفه', field: 'oldSpent' }),
	new GridColumnOptions({ headerName: 'الرصيد السابق', field: 'previousBalance' }),
	new GridColumnOptions({ headerName: 'قيمة الدفعة', field: 'paymentAmount' }),
	new GridColumnOptions({ headerName: 'القيمة الاجمالية', field: 'totalValue' }),
	new GridColumnOptions({ headerName: 'نسبة الدفعة المنصرفة', field: 'disbursementRate' }),
	new GridColumnOptions({ headerName: 'قيمة الغرامة', field: 'fineValue' }),
	new GridColumnOptions({ headerName: 'رقم المنطقة الطالبة', field: 'requestingAreaNumber' }),
	new GridColumnOptions({ headerName: 'تاريخ نهاية اعمال المستخلص', field: 'abstractWorksEndDate' }),
	new GridColumnOptions({ headerName: 'تاريخ بداية اعمال المستخلص', field: 'abstractWorksStartDate' }),
	new GridColumnOptions({ headerName: 'تاريخ استلام الموقع', field: 'receiptDate' }),
	new GridColumnOptions({ headerName: 'دفعة مقدمة', field: 'advancePayment' }),
	new GridColumnOptions({ headerName: 'موقف المستخلص', field: 'abstractPosition' }),
	new GridColumnOptions({ headerName: 'مدة التنفيذ', field: 'executionDuration' }),
	new GridColumnOptions({ headerName: 'القيمة التعاقدية', field: 'contractualValue' }),
	new GridColumnOptions({ headerName: 'رقم المستخلص', field: 'abstractNumber' }),
	new GridColumnOptions({ headerName: 'كود المقاول', field: 'contractorCode' }),
	new GridColumnOptions({ headerName: 'المدرسة', field: 'school' }),
	new GridColumnOptions({ headerName: 'رقم مناقصة', field: 'bidNumber' }),
	new GridColumnOptions({ headerName: 'تاريخ استلام ابتدائي', field: 'primaryReceiptDate' }),
	new GridColumnOptions({ headerName: 'مسلسل الاستمارة', field: 'serialForm' }),
	new GridColumnOptions({ headerName: 'نوع الطرح', field: 'offeringType' }),
	new GridColumnOptions({ headerName: 'نوع المستخلص', field: 'extractType' }),
	new GridColumnOptions({ headerName: 'المحافظة', field: 'governorate' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: Invoice50ViewComponent,
    editDialogClassType: Invoice50EditComponent,
    newDialogClassType: Invoice50NewComponent,
  });
    constructor(
        injector: Injector,
        public invoice50Service: Invoice50Service) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedInvoice50 = new Invoice50();

    
	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});

	this.governorateSelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المحافظة',
	});

	this.extractTypeSelectOptions = new MaterialSelectOptions({
	 data: this.extractTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع المستخلص',
	});


    this.searchForm = this.formBuilder.group({
     	bidNumber : [],
	school : [],
	contractorCode : [],
	abstractNumber : [],
	contractualValue : [],
	executionDuration : [],
	abstractPosition : [],
	advancePayment : [],
	receiptDate : [],
	abstractWorksStartDate : [],
	primaryReceiptDate : [],
	abstractWorksEndDate : [],
	fineValue : [],
	disbursementRate : [],
	totalValue : [],
	paymentAmount : [],
	previousBalance : [],
	oldSpent : [],
	advanceBalance : [],
	abstractValue : [],
	netAbstract : [],
	prepaymentDiscount : [],
	registrationDate : [],
	paymentRate : [],
	requestingAreaNumber : [],
	serialForm : [],
	offeringType : [],
	governorate : [],
	extractType : []
    });

     
  }

  getInvoce50PaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<Invoice50[]> => {
    return this.invoice50Service.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.invoice50Service.delete(param.data.id)
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
    this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.governoratesService = new LookupService('governorates', this.http);
this.extractTypesService = new LookupService('extracttypes', this.http);
  }
}

