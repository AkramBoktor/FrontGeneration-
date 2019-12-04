
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { TypicalDeliveryDateForASupplyOrder } from 'app/shared/models/typical-delivery-date-for-a-supply-order';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { TypicalDeliveryDateForASupplyOrderEditComponent } from '../typical-delivery-date-for-a-supply-order-edit/typical-delivery-date-for-a-supply-order-edit.component';
import { TypicalDeliveryDateForASupplyOrderNewComponent } from '../typical-delivery-date-for-a-supply-order-new/typical-delivery-date-for-a-supply-order-new.component';
import { TypicalDeliveryDateForASupplyOrderViewComponent } from '../typical-delivery-date-for-a-supply-order-view/typical-delivery-date-for-a-supply-order-view.component';
import { TypicalDeliveryDateForASupplyOrderService } from '../shared/typical-delivery-date-for-a-supply-order.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-typical-delivery-date-for-a-supply-order-list',
  templateUrl: './typical-delivery-date-for-a-supply-order-list.component.html',
  styleUrls: ['./typical-delivery-date-for-a-supply-order-list.component.scss'],
  providers: []
})

export class TypicalDeliveryDateForASupplyOrderListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private constructionTypesService: LookupService;
private offeringMethodsService: LookupService;
private offeringTypesService: LookupService;
private processingTypesService: LookupService;

  
constructionTypeSelectOptions: MaterialSelectOptions;
offeringMethodSelectOptions: MaterialSelectOptions;
offeringTypeSelectOptions: MaterialSelectOptions;
processingTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('offeringMethod', { static: true }) OfferingMethodSelectComponent: MaterialSelectComponent;
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('processingType', { static: true }) ProcessingTypeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedTypicalDeliveryDateForASupplyOrder: TypicalDeliveryDateForASupplyOrder;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'تاريخ التسليم', field: 'deliveryDate' }),
	new GridColumnOptions({ headerName: 'اسم الشركة', field: 'campanyName' }),
	new GridColumnOptions({ headerName: 'رقم الملحق', field: 'annexNumber' }),
	new GridColumnOptions({ headerName: 'اسم المبني', field: 'buildingName' }),
	new GridColumnOptions({ headerName: 'سنة الخطة الانشائية', field: 'constructionPlanYear' }),
	new GridColumnOptions({ headerName: 'تاريخ امر التوريد', field: 'supplyOrderDate' }),
	new GridColumnOptions({ headerName: 'رقم امر التوريد', field: 'orderNumber' }),
	new GridColumnOptions({ headerName: 'رقم المناقصة', field: 'bidNumber' }),
	new GridColumnOptions({ headerName: 'سنة الخطة', field: 'yearPlan' }),
	new GridColumnOptions({ headerName: 'نوع الانشاء', field: 'constructionType' }),
	new GridColumnOptions({ headerName: 'طريقة الطرح', field: 'offeringMethod' }),
	new GridColumnOptions({ headerName: 'نوع الطرح', field: 'offeringType' }),
	new GridColumnOptions({ headerName: 'نوع التجهيز', field: 'processingType' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: TypicalDeliveryDateForASupplyOrderViewComponent,
    editDialogClassType: TypicalDeliveryDateForASupplyOrderEditComponent,
    newDialogClassType: TypicalDeliveryDateForASupplyOrderNewComponent,
  });
    constructor(
        injector: Injector,
        public typicalDeliveryDateForASupplyOrderService: TypicalDeliveryDateForASupplyOrderService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedTypicalDeliveryDateForASupplyOrder = new TypicalDeliveryDateForASupplyOrder();

    
	this.constructionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.constructionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الانشاء',
	});

	this.offeringMethodSelectOptions = new MaterialSelectOptions({
	 data: this.offeringMethodsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'طريقة الطرح',
	});

	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});

	this.processingTypeSelectOptions = new MaterialSelectOptions({
	 data: this.processingTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع التجهيز',
	});


    this.searchForm = this.formBuilder.group({
     	deliveryDate : [],
	campanyName : [],
	annexNumber : [],
	buildingName : [],
	constructionPlanYear : [],
	supplyOrderDate : [],
	orderNumber : [],
	bidNumber : [],
	yearPlan : [],
	constructionType : [],
	offeringMethod : [],
	offeringType : [],
	processingType : []
    });

     
  }

  getTypicalDeliveryDateForASupplyOrderPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<TypicalDeliveryDateForASupplyOrder[]> => {
    return this.typicalDeliveryDateForASupplyOrderService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.typicalDeliveryDateForASupplyOrderService.delete(param.data.id)
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
    this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.offeringMethodsService = new LookupService('offeringmethods', this.http);
this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.processingTypesService = new LookupService('processingtypes', this.http);
  }
}

