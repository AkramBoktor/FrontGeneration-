
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { TenderData } from 'app/shared/models/tender-data';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { TenderDataEditComponent } from '../tender-data-edit/tender-data-edit.component';
import { TenderDataNewComponent } from '../tender-data-new/tender-data-new.component';
import { TenderDataViewComponent } from '../tender-data-view/tender-data-view.component';
import { TenderDataService } from '../shared/tender-data.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-tender-data-list',
  templateUrl: './tender-data-list.component.html',
  styleUrls: ['./tender-data-list.component.scss'],
  providers: []
})

export class TenderDataListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private offeringTypesService: LookupService;
private paymentMethodsService: LookupService;
private taxDescriptionsService: LookupService;
private gearStatusesService: LookupService;

  
offeringTypeSelectOptions: MaterialSelectOptions;
paymentMethodSelectOptions: MaterialSelectOptions;
taxDescriptionSelectOptions: MaterialSelectOptions;
gearStatusSelectOptions: MaterialSelectOptions;

  
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('paymentMethod', { static: true }) PaymentMethodSelectComponent: MaterialSelectComponent;
	@ViewChild('taxDescription', { static: true }) TaxDescriptionSelectComponent: MaterialSelectComponent;
	@ViewChild('gearStatus', { static: true }) GearStatusSelectComponent: MaterialSelectComponent;

  
  @Input() selectedTenderData: TenderData;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'القيمة باعلى سعر', field: 'highestPriceValue' }),
	new GridColumnOptions({ headerName: 'القيمة بعد الممارسة', field: 'valueAfterPractice' }),
	new GridColumnOptions({ headerName: 'نسبة العلاوة', field: 'bounsRate' }),
	new GridColumnOptions({ headerName: 'رقم العطاء', field: 'tenderNumber' }),
	new GridColumnOptions({ headerName: 'نسبة الدفعة', field: 'batchRatio' }),
	new GridColumnOptions({ headerName: 'قيمة الترسية', field: 'awardValue' }),
	new GridColumnOptions({ headerName: 'تاريخ تقديم العطاء', field: 'tenderDate' }),
	new GridColumnOptions({ headerName: 'مدة سريان العطاء بالشهور', field: 'tenderDurationinMonths' }),
	new GridColumnOptions({ headerName: 'اجمالي قيمة العطاء', field: 'tenderTotalValue' }),
	new GridColumnOptions({ headerName: 'قيمة المقايسة', field: 'assayValue' }),
	new GridColumnOptions({ headerName: 'رقم ايصال التامين الابتدائي', field: 'insuranceNumber' }),
	new GridColumnOptions({ headerName: 'قيمة التامين الابتدائي', field: 'insuranceValue' }),
	new GridColumnOptions({ headerName: 'الشركة', field: 'company' }),
	new GridColumnOptions({ headerName: 'المشروع', field: 'project' }),
	new GridColumnOptions({ headerName: 'رقم المناقصة', field: 'bidNumber' }),
	new GridColumnOptions({ headerName: 'القيمة باقل سعر', field: 'lowestPriceValue' }),
	new GridColumnOptions({ headerName: 'الافتراضات', field: 'assumptions' }),
	new GridColumnOptions({ headerName: 'نوع الطرح', field: 'offeringType' }),
	new GridColumnOptions({ headerName: 'حالة الترسية', field: 'gearStatus' }),
	new GridColumnOptions({ headerName: 'توصيف الضريبة', field: 'taxDescription' }),
	new GridColumnOptions({ headerName: 'طريقة السداد', field: 'paymentMethod' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: TenderDataViewComponent,
    editDialogClassType: TenderDataEditComponent,
    newDialogClassType: TenderDataNewComponent,
  });
    constructor(
        injector: Injector,
        public tenderDataService: TenderDataService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedTenderData = new TenderData();

    
	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});

	this.paymentMethodSelectOptions = new MaterialSelectOptions({
	 data: this.paymentMethodsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'طريقة السداد',
	});

	this.taxDescriptionSelectOptions = new MaterialSelectOptions({
	 data: this.taxDescriptionsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'توصيف الضريبة',
	});

	this.gearStatusSelectOptions = new MaterialSelectOptions({
	 data: this.gearStatusesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حالة الترسية',
	});


    this.searchForm = this.formBuilder.group({
     	bidNumber : [],
	project : [],
	company : [],
	insuranceValue : [],
	insuranceNumber : [],
	assayValue : [],
	tenderTotalValue : [],
	tenderDurationinMonths : [],
	tenderDate : [],
	awardValue : [],
	batchRatio : [],
	tenderNumber : [],
	bounsRate : [],
	valueAfterPractice : [],
	highestPriceValue : [],
	lowestPriceValue : [],
	assumptions : [],
	offeringType : [],
	paymentMethod : [],
	taxDescription : [],
	gearStatus : []
    });

     
  }

  getTenderDataPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<TenderData[]> => {
    return this.tenderDataService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.tenderDataService.delete(param.data.id)
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
this.paymentMethodsService = new LookupService('paymentmethods', this.http);
this.taxDescriptionsService = new LookupService('taxdescriptions', this.http);
this.gearStatusesService = new LookupService('gearstatuses', this.http);
  }
}

