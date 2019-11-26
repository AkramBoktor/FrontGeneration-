
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { IndexationOpening } from 'app/shared/models/indexation-opening';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { IndexationOpeningEditComponent } from '../indexation-opening-edit/indexation-opening-edit.component';
import { IndexationOpeningNewComponent } from '../indexation-opening-new/indexation-opening-new.component';
import { IndexationOpeningViewComponent } from '../indexation-opening-view/indexation-opening-view.component';
import { IndexationOpeningService } from '../shared/indexation-opening.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-indexation-opening-list',
  templateUrl: './indexation-opening-list.component.html',
  styleUrls: ['./indexation-opening-list.component.scss'],
  providers: []
})

export class IndexationOpeningListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private modelCodesService: LookupService;
private constructionTypesService: LookupService;
private workTypesService: LookupService;

  
modelCodeSelectOptions: MaterialSelectOptions;
constructionTypeSelectOptions: MaterialSelectOptions;
jopTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('modelCode', { static: true }) ModelCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('jopType', { static: true }) JopTypeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedIndexationOpening: IndexationOpening;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود المبنى', field: 'buildingCode' }),
	new GridColumnOptions({ headerName: 'كود الملحق', field: 'extensionCode' }),
	new GridColumnOptions({ headerName: 'كود النموذج', field: 'modelCode' }),
	new GridColumnOptions({ headerName: 'سنة الخطة', field: 'planYear' }),
	new GridColumnOptions({ headerName: 'سنة التسعير', field: 'pricingYear' }),
	new GridColumnOptions({ headerName: 'كود البند', field: 'itemCode' }),
	new GridColumnOptions({ headerName: 'اسم البند', field: 'itemName' }),
	new GridColumnOptions({ headerName: 'الكمية', field: 'quantity' }),
	new GridColumnOptions({ headerName: 'السعر', field: 'price' }),
	new GridColumnOptions({ headerName: 'نوع الانشاء', field: 'constructionType' }),
	new GridColumnOptions({ headerName: 'نوع العمل', field: 'jopType' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: IndexationOpeningViewComponent,
    editDialogClassType: IndexationOpeningEditComponent,
    newDialogClassType: IndexationOpeningNewComponent,
  });
    constructor(
        injector: Injector,
        public indexationOpeningService: IndexationOpeningService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedIndexationOpening = new IndexationOpening();

    
	this.modelCodeSelectOptions = new MaterialSelectOptions({
	 data: this.modelCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود النموذج',
	});

	this.constructionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.constructionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الانشاء',
	});

	this.jopTypeSelectOptions = new MaterialSelectOptions({
	 data: this.workTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع العمل',
	});


    this.searchForm = this.formBuilder.group({
     	buildingCode : [],
	extensionCode : [],
	planYear : [],
	pricingYear : [],
	itemCode : [],
	itemName : [],
	quantity : [],
	price : [],
	modelCode : [],
	constructionType : [],
	jopType : []
    });

     
  }

  getIndexationOpeningPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<IndexationOpening[]> => {
    return this.indexationOpeningService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.indexationOpeningService.delete(param.data.id)
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
    this.modelCodesService = new LookupService('modelcodes', this.http);
this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.workTypesService = new LookupService('worktypes', this.http);
  }
}

