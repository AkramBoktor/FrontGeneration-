
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { ScheduleAtTheBuildingLevel } from 'app/shared/models/schedule-at-the-building-level';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ScheduleAtTheBuildingLevelEditComponent } from '../schedule-at-the-building-level-edit/schedule-at-the-building-level-edit.component';
import { ScheduleAtTheBuildingLevelNewComponent } from '../schedule-at-the-building-level-new/schedule-at-the-building-level-new.component';
import { ScheduleAtTheBuildingLevelViewComponent } from '../schedule-at-the-building-level-view/schedule-at-the-building-level-view.component';
import { ScheduleAtTheBuildingLevelService } from '../shared/schedule-at-the-building-level.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-schedule-at-the-building-level-list',
  templateUrl: './schedule-at-the-building-level-list.component.html',
  styleUrls: ['./schedule-at-the-building-level-list.component.scss'],
  providers: []
})

export class ScheduleAtTheBuildingLevelListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private constructionTypesService: LookupService;
private itemCodesService: LookupService;

  
constructionTypeSelectOptions: MaterialSelectOptions;
itemCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('itemCode', { static: true }) ItemCodeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedScheduleAtTheBuildingLevel: ScheduleAtTheBuildingLevel;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود المبنى', field: 'buildingCode' }),
	new GridColumnOptions({ headerName: 'تاريخ', field: 'date' }),
	new GridColumnOptions({ headerName: 'كود الملحق', field: 'extensionCode' }),
	new GridColumnOptions({ headerName: 'سنة الخطة', field: 'yearPlan' }),
	new GridColumnOptions({ headerName: 'كود النشاط', field: 'activityCode' }),
	new GridColumnOptions({ headerName: 'كمية النشاط وفقا للبند', field: 'activityAmountAccordingToItem' }),
	new GridColumnOptions({ headerName: 'نوع الانشاء', field: 'constructionType' }),
	new GridColumnOptions({ headerName: 'كود البند', field: 'itemCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: ScheduleAtTheBuildingLevelViewComponent,
    editDialogClassType: ScheduleAtTheBuildingLevelEditComponent,
    newDialogClassType: ScheduleAtTheBuildingLevelNewComponent,
  });
    constructor(
        injector: Injector,
        public scheduleAtTheBuildingLevelService: ScheduleAtTheBuildingLevelService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedScheduleAtTheBuildingLevel = new ScheduleAtTheBuildingLevel();

    
	this.constructionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.constructionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الانشاء',
	});

	this.itemCodeSelectOptions = new MaterialSelectOptions({
	 data: this.itemCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود البند',
	});


    this.searchForm = this.formBuilder.group({
     	buildingCode : [],
	constructionType : [],
	itemCode : []
    });

     
  }

  getScheduleAtTheBuildingLevelPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<ScheduleAtTheBuildingLevel[]> => {
    return this.scheduleAtTheBuildingLevelService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.scheduleAtTheBuildingLevelService.delete(param.data.id)
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
this.itemCodesService = new LookupService('itemcodes', this.http);
  }
}

