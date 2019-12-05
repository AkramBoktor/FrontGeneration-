
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { ScheduleOnBuildingScope } from 'app/shared/models/schedule-on-building-scope';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ScheduleOnBuildingScopeEditComponent } from '../schedule-on-building-scope-edit/schedule-on-building-scope-edit.component';
import { ScheduleOnBuildingScopeNewComponent } from '../schedule-on-building-scope-new/schedule-on-building-scope-new.component';
import { ScheduleOnBuildingScopeViewComponent } from '../schedule-on-building-scope-view/schedule-on-building-scope-view.component';
import { ScheduleOnBuildingScopeService } from '../shared/schedule-on-building-scope.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-schedule-on-building-scope-list',
  templateUrl: './schedule-on-building-scope-list.component.html',
  styleUrls: ['./schedule-on-building-scope-list.component.scss'],
  providers: []
})

export class ScheduleOnBuildingScopeListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private constructionTypesService: LookupService;
private itemCodesService: LookupService;

  
constructionTypeSelectOptions: MaterialSelectOptions;
itemCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('itemCode', { static: true }) ItemCodeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedScheduleOnBuildingScope: ScheduleOnBuildingScope;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود المبنى', field: 'buildingCode' }),
	new GridColumnOptions({ headerName: 'تاريخ ', field: 'date' }),
	new GridColumnOptions({ headerName: 'كود الملحق', field: 'extensionCode' }),
	new GridColumnOptions({ headerName: 'سنة الخطة', field: 'planYear' }),
	new GridColumnOptions({ headerName: 'كود النشاط', field: 'activityCode' }),
	new GridColumnOptions({ headerName: 'كمية النشاط وفقا للبند', field: 'activityQuantityAccordingToItem' }),
	new GridColumnOptions({ headerName: 'نوع الانشاء', field: 'constructionType' }),
	new GridColumnOptions({ headerName: 'كود البند', field: 'itemCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: ScheduleOnBuildingScopeViewComponent,
    editDialogClassType: ScheduleOnBuildingScopeEditComponent,
    newDialogClassType: ScheduleOnBuildingScopeNewComponent,
  });
    constructor(
        injector: Injector,
        public scheduleOnBuildingScopeService: ScheduleOnBuildingScopeService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedScheduleOnBuildingScope = new ScheduleOnBuildingScope();

    
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
	date : [],
	extensionCode : [],
	planYear : [],
	activityCode : [],
	activityQuantityAccordingToItem : [],
	constructionType : [],
	itemCode : []
    });

     
  }

  getScheduleOnBuildingScopePaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<ScheduleOnBuildingScope[]> => {
    return this.scheduleOnBuildingScopeService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.scheduleOnBuildingScopeService.delete(param.data.id)
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

