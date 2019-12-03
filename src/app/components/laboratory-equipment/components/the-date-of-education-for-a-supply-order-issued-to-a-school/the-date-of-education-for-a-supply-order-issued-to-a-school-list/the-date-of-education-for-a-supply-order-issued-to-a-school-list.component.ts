
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { TheDateOfEducationForASupplyOrderIssuedToASchool } from 'app/shared/models/the-date-of-education-for-a-supply-order-issued-to-a-school';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { TheDateOfEducationForASupplyOrderIssuedToASchoolEditComponent } from '../the-date-of-education-for-a-supply-order-issued-to-a-school-edit/the-date-of-education-for-a-supply-order-issued-to-a-school-edit.component';
import { TheDateOfEducationForASupplyOrderIssuedToASchoolNewComponent } from '../the-date-of-education-for-a-supply-order-issued-to-a-school-new/the-date-of-education-for-a-supply-order-issued-to-a-school-new.component';
import { TheDateOfEducationForASupplyOrderIssuedToASchoolViewComponent } from '../the-date-of-education-for-a-supply-order-issued-to-a-school-view/the-date-of-education-for-a-supply-order-issued-to-a-school-view.component';
import { TheDateOfEducationForASupplyOrderIssuedToASchoolService } from '../shared/the-date-of-education-for-a-supply-order-issued-to-a-school.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-the-date-of-education-for-a-supply-order-issued-to-a-school-list',
  templateUrl: './the-date-of-education-for-a-supply-order-issued-to-a-school-list.component.html',
  styleUrls: ['./the-date-of-education-for-a-supply-order-issued-to-a-school-list.component.scss'],
  providers: []
})

export class TheDateOfEducationForASupplyOrderIssuedToASchoolListComponent extends AppBaseComponent implements OnInit {
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

  
  @Input() selectedTheDateOfEducationForASupplyOrderIssuedToASchool: TheDateOfEducationForASupplyOrderIssuedToASchool;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'سنة الخطة', field: 'yearPlan' }),
	new GridColumnOptions({ headerName: 'رقم المناقصة', field: 'bidNumber' }),
	new GridColumnOptions({ headerName: 'رقم امر التوريد', field: 'orderNumber' }),
	new GridColumnOptions({ headerName: 'تاريخ امر التوريد', field: 'supplyOrderDate' }),
	new GridColumnOptions({ headerName: 'سنة الخطة الانشائية', field: 'constructionPlanYear' }),
	new GridColumnOptions({ headerName: 'اسم المبني', field: 'buildingName' }),
	new GridColumnOptions({ headerName: 'رقم الملحق', field: 'annexNumber' }),
	new GridColumnOptions({ headerName: 'اسم الشركة', field: 'campanyName' }),
	new GridColumnOptions({ headerName: 'تاريخ التسليم', field: 'deliveryDate' }),
	new GridColumnOptions({ headerName: 'نوع التجهيز', field: 'processingType' }),
	new GridColumnOptions({ headerName: 'نوع الطرح', field: 'offeringType' }),
	new GridColumnOptions({ headerName: 'طريقة الطرح', field: 'offeringMethod' }),
	new GridColumnOptions({ headerName: 'نوع الانشاء', field: 'constructionType' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: TheDateOfEducationForASupplyOrderIssuedToASchoolViewComponent,
    editDialogClassType: TheDateOfEducationForASupplyOrderIssuedToASchoolEditComponent,
    newDialogClassType: TheDateOfEducationForASupplyOrderIssuedToASchoolNewComponent,
  });
    constructor(
        injector: Injector,
        public theDateOfEducationForASupplyOrderIssuedToASchoolService: TheDateOfEducationForASupplyOrderIssuedToASchoolService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedTheDateOfEducationForASupplyOrderIssuedToASchool = new TheDateOfEducationForASupplyOrderIssuedToASchool();

    
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
	constructionPlanYear : [],
	buildingName : [],
	annexNumber : [],
	campanyName : [],
	deliveryDate : [],
	processingType : [],
	offeringType : [],
	offeringMethod : [],
	constructionType : []
    });

     
  }

  getTheDateOfEducationForASupplyOrderIssuedToASchoolPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<TheDateOfEducationForASupplyOrderIssuedToASchool[]> => {
    return this.theDateOfEducationForASupplyOrderIssuedToASchoolService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.theDateOfEducationForASupplyOrderIssuedToASchoolService.delete(param.data.id)
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

