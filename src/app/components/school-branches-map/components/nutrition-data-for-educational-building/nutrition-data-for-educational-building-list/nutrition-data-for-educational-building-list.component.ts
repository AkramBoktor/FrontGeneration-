
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { NutritionDataForEducationalBuilding } from 'app/shared/models/nutrition-data-for-educational-building';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { NutritionDataForEducationalBuildingEditComponent } from '../nutrition-data-for-educational-building-edit/nutrition-data-for-educational-building-edit.component';
import { NutritionDataForEducationalBuildingNewComponent } from '../nutrition-data-for-educational-building-new/nutrition-data-for-educational-building-new.component';
import { NutritionDataForEducationalBuildingViewComponent } from '../nutrition-data-for-educational-building-view/nutrition-data-for-educational-building-view.component';
import { NutritionDataForEducationalBuildingService } from '../shared/nutrition-data-for-educational-building.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-nutrition-data-for-educational-building-list',
  templateUrl: './nutrition-data-for-educational-building-list.component.html',
  styleUrls: ['./nutrition-data-for-educational-building-list.component.scss'],
  providers: []
})

export class NutritionDataForEducationalBuildingListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private yesOrNosService: LookupService;

  
thereIsNutritionSelectOptions: MaterialSelectOptions;

  
	@ViewChild('thereIsNutrition', { static: true }) ThereIsNutritionSelectComponent: MaterialSelectComponent;

  
  @Input() selectedNutritionDataForEducationalBuilding: NutritionDataForEducationalBuilding;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود المبنى', field: 'buildingCode' }),
	new GridColumnOptions({ headerName: 'كود المبنى', field: 'buildingCode' }),
	new GridColumnOptions({ headerName: 'يوجد تغذيه', field: 'thereIsNutrition' }),
	new GridColumnOptions({ headerName: 'يوجد تغذيه', field: 'thereIsNutrition' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: NutritionDataForEducationalBuildingViewComponent,
    editDialogClassType: NutritionDataForEducationalBuildingEditComponent,
    newDialogClassType: NutritionDataForEducationalBuildingNewComponent,
  });
    constructor(
        injector: Injector,
        public nutritionDataForEducationalBuildingService: NutritionDataForEducationalBuildingService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedNutritionDataForEducationalBuilding = new NutritionDataForEducationalBuilding();

    
	this.thereIsNutritionSelectOptions = new MaterialSelectOptions({
	 data: this.yesOrNosService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'يوجد تغذيه',
	});


    this.searchForm = this.formBuilder.group({
     	buildingCode : [],
	thereIsNutrition : []
    });

     
  }

  getNutritionDataForEducationalBuildingPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<NutritionDataForEducationalBuilding[]> => {
    return this.nutritionDataForEducationalBuildingService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.nutritionDataForEducationalBuildingService.delete(param.data.id)
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
    this.yesOrNosService = new LookupService('yesornos', this.http);
  }
}

