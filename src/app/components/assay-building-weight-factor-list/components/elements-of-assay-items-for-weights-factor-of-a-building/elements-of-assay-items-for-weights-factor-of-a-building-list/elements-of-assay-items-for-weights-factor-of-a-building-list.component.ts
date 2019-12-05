
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { ElementsOfAssayItemsForWeightsFactorOfABuilding } from 'app/shared/models/elements-of-assay-items-for-weights-factor-of-a-building';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ElementsOfAssayItemsForWeightsFactorOfABuildingEditComponent } from '../elements-of-assay-items-for-weights-factor-of-a-building-edit/elements-of-assay-items-for-weights-factor-of-a-building-edit.component';
import { ElementsOfAssayItemsForWeightsFactorOfABuildingNewComponent } from '../elements-of-assay-items-for-weights-factor-of-a-building-new/elements-of-assay-items-for-weights-factor-of-a-building-new.component';
import { ElementsOfAssayItemsForWeightsFactorOfABuildingViewComponent } from '../elements-of-assay-items-for-weights-factor-of-a-building-view/elements-of-assay-items-for-weights-factor-of-a-building-view.component';
import { ElementsOfAssayItemsForWeightsFactorOfABuildingService } from '../shared/elements-of-assay-items-for-weights-factor-of-a-building.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-elements-of-assay-items-for-weights-factor-of-a-building-list',
  templateUrl: './elements-of-assay-items-for-weights-factor-of-a-building-list.component.html',
  styleUrls: ['./elements-of-assay-items-for-weights-factor-of-a-building-list.component.scss'],
  providers: []
})

export class ElementsOfAssayItemsForWeightsFactorOfABuildingListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private constructionTypesService: LookupService;
private workTypesService: LookupService;
private itemCodesService: LookupService;
private elementsService: LookupService;

  
constructionTypeSelectOptions: MaterialSelectOptions;
jobTypeSelectOptions: MaterialSelectOptions;
itemCodeSelectOptions: MaterialSelectOptions;
elementCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('jobType', { static: true }) JobTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('itemCode', { static: true }) ItemCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('elementCode', { static: true }) ElementCodeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedElementsOfAssayItemsForWeightsFactorOfABuilding: ElementsOfAssayItemsForWeightsFactorOfABuilding;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود المبنى', field: 'buildingCode' }),
	new GridColumnOptions({ headerName: 'كود الملحق', field: 'extensionCode' }),
	new GridColumnOptions({ headerName: 'سنة الخطة', field: 'planYear' }),
	new GridColumnOptions({ headerName: 'تاريخ', field: 'date' }),
	new GridColumnOptions({ headerName: 'كود الاختبار', field: 'testCode' }),
	new GridColumnOptions({ headerName: 'اسم العنصر', field: 'elementName' }),
	new GridColumnOptions({ headerName: 'نوع الانشاء', field: 'constructionType' }),
	new GridColumnOptions({ headerName: 'نوع العمل', field: 'jobType' }),
	new GridColumnOptions({ headerName: 'كود البند', field: 'itemCode' }),
	new GridColumnOptions({ headerName: 'كود العنصر', field: 'elementCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: ElementsOfAssayItemsForWeightsFactorOfABuildingViewComponent,
    editDialogClassType: ElementsOfAssayItemsForWeightsFactorOfABuildingEditComponent,
    newDialogClassType: ElementsOfAssayItemsForWeightsFactorOfABuildingNewComponent,
  });
    constructor(
        injector: Injector,
        public elementsOfAssayItemsForWeightsFactorOfABuildingService: ElementsOfAssayItemsForWeightsFactorOfABuildingService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedElementsOfAssayItemsForWeightsFactorOfABuilding = new ElementsOfAssayItemsForWeightsFactorOfABuilding();

    
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

	this.elementCodeSelectOptions = new MaterialSelectOptions({
	 data: this.elementsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود العنصر',
	});


    this.searchForm = this.formBuilder.group({
     	buildingCode : [],
	extensionCode : [],
	planYear : [],
	date : [],
	testCode : [],
	elementName : [],
	constructionType : [],
	jobType : [],
	itemCode : [],
	elementCode : []
    });

     
  }

  getElementsOfAssayItemsForWeightsFactorOfABuildingPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<ElementsOfAssayItemsForWeightsFactorOfABuilding[]> => {
    return this.elementsOfAssayItemsForWeightsFactorOfABuildingService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.elementsOfAssayItemsForWeightsFactorOfABuildingService.delete(param.data.id)
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
this.elementsService = new LookupService('elements', this.http);
  }
}

