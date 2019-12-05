
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { IssuingASupplyOrderForASchool } from 'app/shared/models/issuing-a-supply-order-for-a-school';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { IssuingASupplyOrderForASchoolEditComponent } from '../issuing-a-supply-order-for-a-school-edit/issuing-a-supply-order-for-a-school-edit.component';
import { IssuingASupplyOrderForASchoolNewComponent } from '../issuing-a-supply-order-for-a-school-new/issuing-a-supply-order-for-a-school-new.component';
import { IssuingASupplyOrderForASchoolViewComponent } from '../issuing-a-supply-order-for-a-school-view/issuing-a-supply-order-for-a-school-view.component';
import { IssuingASupplyOrderForASchoolService } from '../shared/issuing-a-supply-order-for-a-school.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-issuing-a-supply-order-for-a-school-list',
  templateUrl: './issuing-a-supply-order-for-a-school-list.component.html',
  styleUrls: ['./issuing-a-supply-order-for-a-school-list.component.scss'],
  providers: []
})

export class IssuingASupplyOrderForASchoolListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private processingTypesService: LookupService;
private offeringTypesService: LookupService;
private offeringMethodsService: LookupService;
private constructionTypesService: LookupService;

  
processingTypeSelectOptions: MaterialSelectOptions;
offeringTypeSelectOptions: MaterialSelectOptions;
offeringMethodSelectOptions: MaterialSelectOptions;
constructionTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('processingType', { static: true }) ProcessingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('offeringMethod', { static: true }) OfferingMethodSelectComponent: MaterialSelectComponent;
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedIssuingASupplyOrderForASchool: IssuingASupplyOrderForASchool;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'سنة الخطة', field: 'yearPlan' }),
	new GridColumnOptions({ headerName: 'رقم المناقصة', field: 'bidNumber' }),
	new GridColumnOptions({ headerName: 'رقم امر التوريد', field: 'orderNumber' }),
	new GridColumnOptions({ headerName: 'تاريخ امر التوريد', field: 'supplyOrderDate' }),
	new GridColumnOptions({ headerName: 'نوع الامر', field: 'orderType' }),
	new GridColumnOptions({ headerName: 'سنة الخطة الانشائية', field: 'constructionPlanYear' }),
	new GridColumnOptions({ headerName: 'اسم المبني', field: 'buildingName' }),
	new GridColumnOptions({ headerName: 'رقم المحلق', field: 'number' }),
	new GridColumnOptions({ headerName: 'اسم الشركة', field: 'companyName' }),
	new GridColumnOptions({ headerName: 'اسم القائمة', field: 'listName' }),
	new GridColumnOptions({ headerName: 'الكمية', field: 'quantity' }),
	new GridColumnOptions({ headerName: 'نوع التجهيز', field: 'processingType' }),
	new GridColumnOptions({ headerName: 'نوع الطرح', field: 'offeringType' }),
	new GridColumnOptions({ headerName: 'طريقة الطرح', field: 'offeringMethod' }),
	new GridColumnOptions({ headerName: 'نوع الانشاء', field: 'constructionType' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: IssuingASupplyOrderForASchoolViewComponent,
    editDialogClassType: IssuingASupplyOrderForASchoolEditComponent,
    newDialogClassType: IssuingASupplyOrderForASchoolNewComponent,
  });
    constructor(
        injector: Injector,
        public issuingASupplyOrderForASchoolService: IssuingASupplyOrderForASchoolService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedIssuingASupplyOrderForASchool = new IssuingASupplyOrderForASchool();

    
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


    this.searchForm = this.formBuilder.group({
     	yearPlan : [],
	bidNumber : [],
	orderNumber : [],
	supplyOrderDate : [],
	orderType : [],
	constructionPlanYear : [],
	buildingName : [],
	number : [],
	companyName : [],
	listName : [],
	quantity : [],
	processingType : [],
	offeringType : [],
	offeringMethod : [],
	constructionType : []
    });

     
  }

  getIssuingASupplyOrderForASchoolPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<IssuingASupplyOrderForASchool[]> => {
    return this.issuingASupplyOrderForASchoolService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.issuingASupplyOrderForASchoolService.delete(param.data.id)
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
  }
}

