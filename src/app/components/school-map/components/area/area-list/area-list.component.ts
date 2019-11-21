
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { Area } from 'app/shared/models/area';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { AreaEditComponent } from '../area-edit/area-edit.component';
import { AreaNewComponent } from '../area-new/area-new.component';
import { AreaViewComponent } from '../area-view/area-view.component';
import { AreaService } from '../shared/area.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-area-list',
  templateUrl: './area-list.component.html',
  styleUrls: ['./area-list.component.scss'],
  providers: []
})

export class AreaListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedArea: Area;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود المبنى', field: 'buildingCode' }),
	new GridColumnOptions({ headerName: 'مساحه مباني الدور الارضى', field: 'groundFloorArea' }),
	new GridColumnOptions({ headerName: 'مساحه الافنيه', field: 'backyardArea' }),
	new GridColumnOptions({ headerName: 'مساحه المناطق الخضراء', field: 'greenAreas' }),
	new GridColumnOptions({ headerName: 'مساحه الملاعب', field: 'playgroundArea' }),
	new GridColumnOptions({ headerName: 'مساحه الارصفه', field: 'sideWalksArea' }),
	new GridColumnOptions({ headerName: 'اجمالى مساحه الكليه للموقع', field: 'siteTotalArea' }),
	new GridColumnOptions({ headerName: 'كود المركز الاقليمي', field: 'regionalCenterCode' }),
	new GridColumnOptions({ headerName: 'كود الفرع', field: 'branchCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: AreaViewComponent,
    editDialogClassType: AreaEditComponent,
    newDialogClassType: AreaNewComponent,
  });
    constructor(
        injector: Injector,
        public areaService: AreaService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedArea = new Area();

    

    this.searchForm = this.formBuilder.group({
     	buildingCode : [],
	groundFloorArea : [],
	backyardArea : [],
	greenAreas : [],
	playgroundArea : [],
	sideWalksArea : [],
	siteTotalArea : []
    });

     
  }

  getAreasPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<Area[]> => {
    return this.areaService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.areaService.delete(param.data.id)
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

