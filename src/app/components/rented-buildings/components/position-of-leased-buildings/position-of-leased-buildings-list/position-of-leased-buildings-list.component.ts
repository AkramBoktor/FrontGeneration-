
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { PositionOfLeasedBuildings } from 'app/shared/models/position-of-leased-buildings';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { PositionOfLeasedBuildingsEditComponent } from '../position-of-leased-buildings-edit/position-of-leased-buildings-edit.component';
import { PositionOfLeasedBuildingsNewComponent } from '../position-of-leased-buildings-new/position-of-leased-buildings-new.component';
import { PositionOfLeasedBuildingsViewComponent } from '../position-of-leased-buildings-view/position-of-leased-buildings-view.component';
import { PositionOfLeasedBuildingsService } from '../shared/position-of-leased-buildings.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-position-of-leased-buildings-list',
  templateUrl: './position-of-leased-buildings-list.component.html',
  styleUrls: ['./position-of-leased-buildings-list.component.scss'],
  providers: []
})

export class PositionOfLeasedBuildingsListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedPositionOfLeasedBuildings: PositionOfLeasedBuildings;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'الرقم التعريفي', field: 'iD' }),
	new GridColumnOptions({ headerName: 'الموقف', field: 'situation' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: PositionOfLeasedBuildingsViewComponent,
    editDialogClassType: PositionOfLeasedBuildingsEditComponent,
    newDialogClassType: PositionOfLeasedBuildingsNewComponent,
  });
    constructor(
        injector: Injector,
        public positionOfLeasedBuildingsService: PositionOfLeasedBuildingsService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedPositionOfLeasedBuildings = new PositionOfLeasedBuildings();

    

    this.searchForm = this.formBuilder.group({
     	iD : [],
	situation : []
    });

     
  }

  getPositionOfLeasedBuildingsPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<PositionOfLeasedBuildings[]> => {
    return this.positionOfLeasedBuildingsService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.positionOfLeasedBuildingsService.delete(param.data.id)
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

