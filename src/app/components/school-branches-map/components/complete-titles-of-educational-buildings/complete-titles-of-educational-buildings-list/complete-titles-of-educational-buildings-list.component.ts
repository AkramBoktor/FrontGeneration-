
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { CompleteTitlesOfEducationalBuildings } from 'app/shared/models/complete-titles-of-educational-buildings';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { CompleteTitlesOfEducationalBuildingsEditComponent } from '../complete-titles-of-educational-buildings-edit/complete-titles-of-educational-buildings-edit.component';
import { CompleteTitlesOfEducationalBuildingsNewComponent } from '../complete-titles-of-educational-buildings-new/complete-titles-of-educational-buildings-new.component';
import { CompleteTitlesOfEducationalBuildingsViewComponent } from '../complete-titles-of-educational-buildings-view/complete-titles-of-educational-buildings-view.component';
import { CompleteTitlesOfEducationalBuildingsService } from '../shared/complete-titles-of-educational-buildings.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-complete-titles-of-educational-buildings-list',
  templateUrl: './complete-titles-of-educational-buildings-list.component.html',
  styleUrls: ['./complete-titles-of-educational-buildings-list.component.scss'],
  providers: []
})

export class CompleteTitlesOfEducationalBuildingsListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedCompleteTitlesOfEducationalBuildings: CompleteTitlesOfEducationalBuildings;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود المبنى', field: 'buildingCode' }),
	new GridColumnOptions({ headerName: 'عنوان المدرسه', field: 'schoolAddress' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: CompleteTitlesOfEducationalBuildingsViewComponent,
    editDialogClassType: CompleteTitlesOfEducationalBuildingsEditComponent,
    newDialogClassType: CompleteTitlesOfEducationalBuildingsNewComponent,
  });
    constructor(
        injector: Injector,
        public completeTitlesOfEducationalBuildingsService: CompleteTitlesOfEducationalBuildingsService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedCompleteTitlesOfEducationalBuildings = new CompleteTitlesOfEducationalBuildings();

    

    this.searchForm = this.formBuilder.group({
     	buildingCode : [],
	schoolAddress : []
    });

     
  }

  getCompleteTitlesOfEducationalBuildingsPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<CompleteTitlesOfEducationalBuildings[]> => {
    return this.completeTitlesOfEducationalBuildingsService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.completeTitlesOfEducationalBuildingsService.delete(param.data.id)
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
    
  }
}

