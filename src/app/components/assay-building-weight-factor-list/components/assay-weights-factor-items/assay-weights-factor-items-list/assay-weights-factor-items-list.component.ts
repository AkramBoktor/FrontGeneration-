
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { AssayWeightsFactorItems } from 'app/shared/models/assay-weights-factor-items';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { AssayWeightsFactorItemsEditComponent } from '../assay-weights-factor-items-edit/assay-weights-factor-items-edit.component';
import { AssayWeightsFactorItemsNewComponent } from '../assay-weights-factor-items-new/assay-weights-factor-items-new.component';
import { AssayWeightsFactorItemsViewComponent } from '../assay-weights-factor-items-view/assay-weights-factor-items-view.component';
import { AssayWeightsFactorItemsService } from '../shared/assay-weights-factor-items.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-assay-weights-factor-items-list',
  templateUrl: './assay-weights-factor-items-list.component.html',
  styleUrls: ['./assay-weights-factor-items-list.component.scss'],
  providers: []
})

export class AssayWeightsFactorItemsListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private constructionTypesService: LookupService;
private workTypesService: LookupService;
private itemCodesService: LookupService;

  
constructionTypeSelectOptions: MaterialSelectOptions;
jobTypeSelectOptions: MaterialSelectOptions;
itemCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('jobType', { static: true }) JobTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('itemCode', { static: true }) ItemCodeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedAssayWeightsFactorItems: AssayWeightsFactorItems;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود المبنى', field: 'buildingCode' }),
	new GridColumnOptions({ headerName: 'كود الملحق', field: 'extensionCode' }),
	new GridColumnOptions({ headerName: 'النموذج', field: 'model' }),
	new GridColumnOptions({ headerName: 'سنة الخطة', field: 'planYear' }),
	new GridColumnOptions({ headerName: 'سنة التسعير', field: 'pricingYear' }),
	new GridColumnOptions({ headerName: 'كود الاختبار', field: 'testCode' }),
	new GridColumnOptions({ headerName: 'اسم البند', field: 'itemName' }),
	new GridColumnOptions({ headerName: 'نوع الانشاء', field: 'constructionType' }),
	new GridColumnOptions({ headerName: 'نوع العمل', field: 'jobType' }),
	new GridColumnOptions({ headerName: 'كود البند', field: 'itemCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: AssayWeightsFactorItemsViewComponent,
    editDialogClassType: AssayWeightsFactorItemsEditComponent,
    newDialogClassType: AssayWeightsFactorItemsNewComponent,
  });
    constructor(
        injector: Injector,
        public assayWeightsFactorItemsService: AssayWeightsFactorItemsService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedAssayWeightsFactorItems = new AssayWeightsFactorItems();

    
	this.constructionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.constructionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الانشاء',
	});

	this.jobTypeSelectOptions = new MaterialSelectOptions({
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
	extensionCode : [],
	model : [],
	planYear : [],
	pricingYear : [],
	testCode : [],
	itemName : [],
	constructionType : [],
	jobType : [],
	itemCode : []
    });

     
  }

  getAssayWeightsFactorItemsPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<AssayWeightsFactorItems[]> => {
    return this.assayWeightsFactorItemsService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.assayWeightsFactorItemsService.delete(param.data.id)
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

