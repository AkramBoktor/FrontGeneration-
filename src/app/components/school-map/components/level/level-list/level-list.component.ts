
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { Level } from 'app/shared/models/level';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { LevelEditComponent } from '../level-edit/level-edit.component';
import { LevelNewComponent } from '../level-new/level-new.component';
import { LevelViewComponent } from '../level-view/level-view.component';
import { LevelService } from '../shared/level.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-level-list',
  templateUrl: './level-list.component.html',
  styleUrls: ['./level-list.component.scss'],
  providers: []
})

export class LevelListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private regionalCenterCodesService: LookupService;
private branchCodesService: LookupService;

  
regionalCenterCodeSelectOptions: MaterialSelectOptions;
branchCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('regionalCenterCode', { static: true }) RegionalCenterCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedLevel: Level;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود المبنى', field: 'buildingCode' }),
	new GridColumnOptions({ headerName: 'رقم الملحق', field: 'extensionNumber' }),
	new GridColumnOptions({ headerName: 'منسوب الطريق الرئيسي', field: 'mainRoadLevel' }),
	new GridColumnOptions({ headerName: 'منسوب الشارع الشمالي', field: 'northernStreetLevel' }),
	new GridColumnOptions({ headerName: 'منسوب الشارع الجنوبي', field: 'southernStreetLevel' }),
	new GridColumnOptions({ headerName: 'منسوب الشارع الشرقي', field: 'easternStreetLevel' }),
	new GridColumnOptions({ headerName: 'منسوب الشارع الغربي', field: 'westernStreetLevel' }),
	new GridColumnOptions({ headerName: 'منسوب شارع الشمال الشرقي', field: 'northEastStreetLevel' }),
	new GridColumnOptions({ headerName: 'منسوب شارع الشمال الغربي', field: 'northWestStreetLevel' }),
	new GridColumnOptions({ headerName: 'منسوب شارع الجنوب الشرقي', field: 'southEastStreetLevel' }),
	new GridColumnOptions({ headerName: 'منسوب شارع الجنوب الغربي', field: 'southWestStreetLevel' }),
	new GridColumnOptions({ headerName: 'منسوب الفناء الشمالي', field: 'northernCourtyardLevel' }),
	new GridColumnOptions({ headerName: 'منسوب الفناء الجنوبي', field: 'southernCourtyardLevel' }),
	new GridColumnOptions({ headerName: 'منسوب الفناء الشرقي', field: 'easternCourtyardLevel' }),
	new GridColumnOptions({ headerName: 'منسوب الفناء الغربي', field: 'westernCourtyardLevel' }),
	new GridColumnOptions({ headerName: 'منسوب الفناء داخل الموقع', field: 'courtyardLevelWithinSite' }),
	new GridColumnOptions({ headerName: 'منسوب  أرضية الدور الارضي', field: 'groundFloorLevel' }),
	new GridColumnOptions({ headerName: 'كود المركز الاقليمي', field: 'regionalCenterCode' }),
	new GridColumnOptions({ headerName: 'كود الفرع', field: 'branchCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: LevelViewComponent,
    editDialogClassType: LevelEditComponent,
    newDialogClassType: LevelNewComponent,
  });
    constructor(
        injector: Injector,
        public levelService: LevelService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedLevel = new Level();

    
	this.regionalCenterCodeSelectOptions = new MaterialSelectOptions({
	 data: this.regionalCenterCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المركز الاقليمي',
	});

	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الفرع',
	});


    this.searchForm = this.formBuilder.group({
     	buildingCode : [],
	extensionNumber : [],
	regionalCenterCode : [],
	branchCode : []
    });

     
  }

  getLevelsPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<Level[]> => {
    return this.levelService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.levelService.delete(param.data.id)
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
    this.regionalCenterCodesService = new LookupService('regionalcentercodes', this.http);
this.branchCodesService = new LookupService('branchcodes', this.http);
  }
}

