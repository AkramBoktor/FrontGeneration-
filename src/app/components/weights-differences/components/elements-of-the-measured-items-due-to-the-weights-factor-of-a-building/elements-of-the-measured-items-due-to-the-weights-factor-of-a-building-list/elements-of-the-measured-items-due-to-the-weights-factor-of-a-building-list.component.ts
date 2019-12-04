
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { ElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuilding } from 'app/shared/models/elements-of-the-measured-items-due-to-the-weights-factor-of-a-building';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuildingEditComponent } from '../elements-of-the-measured-items-due-to-the-weights-factor-of-a-building-edit/elements-of-the-measured-items-due-to-the-weights-factor-of-a-building-edit.component';
import { ElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuildingNewComponent } from '../elements-of-the-measured-items-due-to-the-weights-factor-of-a-building-new/elements-of-the-measured-items-due-to-the-weights-factor-of-a-building-new.component';
import { ElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuildingViewComponent } from '../elements-of-the-measured-items-due-to-the-weights-factor-of-a-building-view/elements-of-the-measured-items-due-to-the-weights-factor-of-a-building-view.component';
import { ElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuildingService } from '../shared/elements-of-the-measured-items-due-to-the-weights-factor-of-a-building.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-elements-of-the-measured-items-due-to-the-weights-factor-of-a-building-list',
  templateUrl: './elements-of-the-measured-items-due-to-the-weights-factor-of-a-building-list.component.html',
  styleUrls: ['./elements-of-the-measured-items-due-to-the-weights-factor-of-a-building-list.component.scss'],
  providers: []
})

export class ElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuildingListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private constructionTypesService: LookupService;

  
constructionTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuilding: ElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuilding;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود المبنى', field: 'buildingCode' }),
	new GridColumnOptions({ headerName: 'النموذج', field: 'sample' }),
	new GridColumnOptions({ headerName: 'سنة الخطه', field: 'yearPlan' }),
	new GridColumnOptions({ headerName: 'كود الملحق', field: 'extensionCode' }),
	new GridColumnOptions({ headerName: 'اسم المبني', field: 'buildingName' }),
	new GridColumnOptions({ headerName: 'كود البند', field: 'itemCode' }),
	new GridColumnOptions({ headerName: 'نوع العمل', field: 'employmentType' }),
	new GridColumnOptions({ headerName: 'نوع الانشاء', field: 'constructionType' }),
	new GridColumnOptions({ headerName: 'العنصر', field: 'element' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: ElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuildingViewComponent,
    editDialogClassType: ElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuildingEditComponent,
    newDialogClassType: ElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuildingNewComponent,
  });
    constructor(
        injector: Injector,
        public elementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuildingService: ElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuildingService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuilding = new ElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuilding();

    
	this.constructionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.constructionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الانشاء',
	});


    this.searchForm = this.formBuilder.group({
     	buildingCode : [],
	constructionType : []
    });

     
  }

  getElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuildingPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<ElementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuilding[]> => {
    return this.elementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuildingService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.elementsOfTheMeasuredItemsDueToTheWeightsFactorOfABuildingService.delete(param.data.id)
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
  }
}

