
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { BusinessAssayForOthers } from 'app/shared/models/business-assay-for-others';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { BusinessAssayForOthersEditComponent } from '../business-assay-for-others-edit/business-assay-for-others-edit.component';
import { BusinessAssayForOthersNewComponent } from '../business-assay-for-others-new/business-assay-for-others-new.component';
import { BusinessAssayForOthersViewComponent } from '../business-assay-for-others-view/business-assay-for-others-view.component';
import { BusinessAssayForOthersService } from '../shared/business-assay-for-others.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-business-assay-for-others-list',
  templateUrl: './business-assay-for-others-list.component.html',
  styleUrls: ['./business-assay-for-others-list.component.scss'],
  providers: []
})

export class BusinessAssayForOthersListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private constructionTypesService: LookupService;
private workTypesService: LookupService;
private itemCodesService: LookupService;

  
constructionTypeSelectOptions: MaterialSelectOptions;
employmentTypeSelectOptions: MaterialSelectOptions;
itemCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('employmentType', { static: true }) EmploymentTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('itemCode', { static: true }) ItemCodeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedBusinessAssayForOthers: BusinessAssayForOthers;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود المبنى', field: 'buildingCode' }),
	new GridColumnOptions({ headerName: 'كود النموذج', field: 'modelCode' }),
	new GridColumnOptions({ headerName: 'سنة الخطة', field: 'planYear' }),
	new GridColumnOptions({ headerName: 'سنة التسعير', field: 'pricingYear' }),
	new GridColumnOptions({ headerName: 'اسم البند', field: 'itemName' }),
	new GridColumnOptions({ headerName: 'الكمية', field: 'quantity' }),
	new GridColumnOptions({ headerName: 'السعر', field: 'price' }),
	new GridColumnOptions({ headerName: 'نوع الانشاء', field: 'constructionType' }),
	new GridColumnOptions({ headerName: 'نوع العمل', field: 'employmentType' }),
	new GridColumnOptions({ headerName: 'كود البند', field: 'itemCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: BusinessAssayForOthersViewComponent,
    editDialogClassType: BusinessAssayForOthersEditComponent,
    newDialogClassType: BusinessAssayForOthersNewComponent,
  });
    constructor(
        injector: Injector,
        public businessAssayForOthersService: BusinessAssayForOthersService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedBusinessAssayForOthers = new BusinessAssayForOthers();

    
	this.constructionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.constructionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الانشاء',
	});

	this.employmentTypeSelectOptions = new MaterialSelectOptions({
	 data: this.workTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع العمل',
	});

	this.itemCodeSelectOptions = new MaterialSelectOptions({
	 data: this.itemCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود البند',
	});


    this.searchForm = this.formBuilder.group({
     	buildingCode : [],
	modelCode : [],
	planYear : [],
	pricingYear : [],
	itemName : [],
	quantity : [],
	price : [],
	foundationType : [],
	constructionType : [],
	employmentType : [],
	itemCode : []
    });

     
  }

  getBusinessAssayForOthersPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<BusinessAssayForOthers[]> => {
    return this.businessAssayForOthersService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.businessAssayForOthersService.delete(param.data.id)
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
this.workTypesService = new LookupService('worktypes', this.http);
this.itemCodesService = new LookupService('itemcodes', this.http);
  }
}

