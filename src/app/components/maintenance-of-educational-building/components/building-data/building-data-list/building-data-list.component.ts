
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { BuildingData } from 'app/shared/models/building-data';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { BuildingDataEditComponent } from '../building-data-edit/building-data-edit.component';
import { BuildingDataNewComponent } from '../building-data-new/building-data-new.component';
import { BuildingDataViewComponent } from '../building-data-view/building-data-view.component';
import { BuildingDataService } from '../shared/building-data.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-building-data-list',
  templateUrl: './building-data-list.component.html',
  styleUrls: ['./building-data-list.component.scss'],
  providers: []
})

export class BuildingDataListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedBuildingData: BuildingData;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'المهندس القائم باعمال المقايسه', field: 'actingEngineer' }),
	new GridColumnOptions({ headerName: '  رئيس القطاع', field: 'sectorHead' }),
	new GridColumnOptions({ headerName: 'رئيس قسم الصيانه', field: 'maintenanceDepartmentHead' }),
	new GridColumnOptions({ headerName: 'مدير المنطقه', field: 'areaManager' }),
	new GridColumnOptions({ headerName: 'مهندس ديوان المتابع للفرع', field: 'followerEngineerOfficeBranch' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: BuildingDataViewComponent,
    editDialogClassType: BuildingDataEditComponent,
    newDialogClassType: BuildingDataNewComponent,
  });
    constructor(
        injector: Injector,
        public buildingDataService: BuildingDataService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedBuildingData = new BuildingData();

    

    this.searchForm = this.formBuilder.group({
     	actingEngineer : [],
	sectorHead : [],
	maintenanceDepartmentHead : [],
	areaManager : [],
	followerEngineerOfficeBranch : []
    });

     
  }

  getBuildingDataPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<BuildingData[]> => {
    return this.buildingDataService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.buildingDataService.delete(param.data.id)
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

