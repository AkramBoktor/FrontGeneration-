
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { TypicalIssuingASupplyOrder } from 'app/shared/models/typical-issuing-a-supply-order';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { TypicalIssuingASupplyOrderEditComponent } from '../typical-issuing-a-supply-order-edit/typical-issuing-a-supply-order-edit.component';
import { TypicalIssuingASupplyOrderNewComponent } from '../typical-issuing-a-supply-order-new/typical-issuing-a-supply-order-new.component';
import { TypicalIssuingASupplyOrderViewComponent } from '../typical-issuing-a-supply-order-view/typical-issuing-a-supply-order-view.component';
import { TypicalIssuingASupplyOrderService } from '../shared/typical-issuing-a-supply-order.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-typical-issuing-a-supply-order-list',
  templateUrl: './typical-issuing-a-supply-order-list.component.html',
  styleUrls: ['./typical-issuing-a-supply-order-list.component.scss'],
  providers: []
})

export class TypicalIssuingASupplyOrderListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private processingTypesService: LookupService;
private offeringTypesService: LookupService;
private offeringMethodsService: LookupService;
private constructionTypesService: LookupService;
private fundingTypesService: LookupService;

  
processingTypeSelectOptions: MaterialSelectOptions;
offeringTypeSelectOptions: MaterialSelectOptions;
offeringMethodSelectOptions: MaterialSelectOptions;
constructionTypeSelectOptions: MaterialSelectOptions;
typeOfFundingSelectOptions: MaterialSelectOptions;

  
	@ViewChild('processingType', { static: true }) ProcessingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('offeringMethod', { static: true }) OfferingMethodSelectComponent: MaterialSelectComponent;
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('typeOfFunding', { static: true }) TypeOfFundingSelectComponent: MaterialSelectComponent;

  
  @Input() selectedTypicalIssuingASupplyOrder: TypicalIssuingASupplyOrder;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم امر التوريد', field: 'orderNumber' }),
	new GridColumnOptions({ headerName: 'تاريخ امر التوريد', field: 'supplyOrderDate' }),
	new GridColumnOptions({ headerName: 'نوع الامر', field: 'orderType' }),
	new GridColumnOptions({ headerName: 'سنة الخطة', field: 'yearPlan' }),
	new GridColumnOptions({ headerName: 'سنة الخطة الانشائية', field: 'constructionPlanYear' }),
	new GridColumnOptions({ headerName: 'اسم المبني', field: 'buildingName' }),
	new GridColumnOptions({ headerName: 'الكمية', field: 'quantity' }),
	new GridColumnOptions({ headerName: 'اسم القائمة', field: 'listName' }),
	new GridColumnOptions({ headerName: 'اسم الشركة', field: 'companyName' }),
	new GridColumnOptions({ headerName: 'رقم المحلق', field: 'number' }),
	new GridColumnOptions({ headerName: 'رقم المناقصة', field: 'bidNumber' }),
	new GridColumnOptions({ headerName: 'نوع التجهيز', field: 'processingType' }),
	new GridColumnOptions({ headerName: 'نوع الطرح', field: 'offeringType' }),
	new GridColumnOptions({ headerName: 'طريقة الطرح', field: 'offeringMethod' }),
	new GridColumnOptions({ headerName: 'نوع الانشاء', field: 'constructionType' }),
	new GridColumnOptions({ headerName: 'نوع التمويل', field: 'typeOfFunding' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: TypicalIssuingASupplyOrderViewComponent,
    editDialogClassType: TypicalIssuingASupplyOrderEditComponent,
    newDialogClassType: TypicalIssuingASupplyOrderNewComponent,
  });
    constructor(
        injector: Injector,
        public typicalIssuingASupplyOrderService: TypicalIssuingASupplyOrderService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedTypicalIssuingASupplyOrder = new TypicalIssuingASupplyOrder();

    
	this.processingTypeSelectOptions = new MaterialSelectOptions({
	 data: this.processingTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع التجهيز',
	});

	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});

	this.offeringMethodSelectOptions = new MaterialSelectOptions({
	 data: this.offeringMethodsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'طريقة الطرح',
	});

	this.constructionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.constructionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الانشاء',
	});

	this.typeOfFundingSelectOptions = new MaterialSelectOptions({
	 data: this.fundingTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع التمويل',
	});


    this.searchForm = this.formBuilder.group({
     	orderNumber : [],
	supplyOrderDate : [],
	orderType : [],
	yearPlan : [],
	constructionPlanYear : [],
	buildingName : [],
	quantity : [],
	listName : [],
	companyName : [],
	number : [],
	bidNumber : [],
	processingType : [],
	offeringType : [],
	offeringMethod : [],
	constructionType : [],
	typeOfFunding : []
    });

     
  }

  getTypicalIssuingASupplyOrderPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<TypicalIssuingASupplyOrder[]> => {
    return this.typicalIssuingASupplyOrderService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.typicalIssuingASupplyOrderService.delete(param.data.id)
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
    this.processingTypesService = new LookupService('processingtypes', this.http);
this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.offeringMethodsService = new LookupService('offeringmethods', this.http);
this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.fundingTypesService = new LookupService('fundingtypes', this.http);
  }
}

