
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { DataSpacesOfTheEducationalBuilding } from 'app/shared/models/data-spaces-of-the-educational-building';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { DataSpacesOfTheEducationalBuildingEditComponent } from '../data-spaces-of-the-educational-building-edit/data-spaces-of-the-educational-building-edit.component';
import { DataSpacesOfTheEducationalBuildingNewComponent } from '../data-spaces-of-the-educational-building-new/data-spaces-of-the-educational-building-new.component';
import { DataSpacesOfTheEducationalBuildingViewComponent } from '../data-spaces-of-the-educational-building-view/data-spaces-of-the-educational-building-view.component';
import { DataSpacesOfTheEducationalBuildingService } from '../shared/data-spaces-of-the-educational-building.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-data-spaces-of-the-educational-building-list',
  templateUrl: './data-spaces-of-the-educational-building-list.component.html',
  styleUrls: ['./data-spaces-of-the-educational-building-list.component.scss'],
  providers: []
})

export class DataSpacesOfTheEducationalBuildingListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private branchCodesService: LookupService;

  
codeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('code', { static: true }) CodeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedDataSpacesOfTheEducationalBuilding: DataSpacesOfTheEducationalBuilding;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود المبنى', field: 'buildingCode' }),
	new GridColumnOptions({ headerName: 'الملحق', field: 'extension' }),
	new GridColumnOptions({ headerName: 'الدور', field: 'floor' }),
	new GridColumnOptions({ headerName: 'اسم الفراغ', field: 'spaceName' }),
	new GridColumnOptions({ headerName: 'المساحه', field: 'area' }),
	new GridColumnOptions({ headerName: 'مسلسل ', field: 'series' }),
	new GridColumnOptions({ headerName: 'كود ', field: 'code' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: DataSpacesOfTheEducationalBuildingViewComponent,
    editDialogClassType: DataSpacesOfTheEducationalBuildingEditComponent,
    newDialogClassType: DataSpacesOfTheEducationalBuildingNewComponent,
  });
    constructor(
        injector: Injector,
        public dataSpacesOfTheEducationalBuildingService: DataSpacesOfTheEducationalBuildingService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedDataSpacesOfTheEducationalBuilding = new DataSpacesOfTheEducationalBuilding();

    
	this.codeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود ',
	});


    this.searchForm = this.formBuilder.group({
     	buildingCode : [],
	series : [],
	code : []
    });

     
  }

  getDataSpacesOfTheEducationalBuildingPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<DataSpacesOfTheEducationalBuilding[]> => {
    return this.dataSpacesOfTheEducationalBuildingService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.dataSpacesOfTheEducationalBuildingService.delete(param.data.id)
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
    this.branchCodesService = new LookupService('branchcodes', this.http);
  }
}

