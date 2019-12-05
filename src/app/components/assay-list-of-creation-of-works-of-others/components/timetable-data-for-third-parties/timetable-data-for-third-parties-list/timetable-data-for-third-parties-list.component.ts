
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { TimetableDataForThirdParties } from 'app/shared/models/timetable-data-for-third-parties';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { TimetableDataForThirdPartiesEditComponent } from '../timetable-data-for-third-parties-edit/timetable-data-for-third-parties-edit.component';
import { TimetableDataForThirdPartiesNewComponent } from '../timetable-data-for-third-parties-new/timetable-data-for-third-parties-new.component';
import { TimetableDataForThirdPartiesViewComponent } from '../timetable-data-for-third-parties-view/timetable-data-for-third-parties-view.component';
import { TimetableDataForThirdPartiesService } from '../shared/timetable-data-for-third-parties.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-timetable-data-for-third-parties-list',
  templateUrl: './timetable-data-for-third-parties-list.component.html',
  styleUrls: ['./timetable-data-for-third-parties-list.component.scss'],
  providers: []
})

export class TimetableDataForThirdPartiesListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private constructionTypesService: LookupService;
private listTypesService: LookupService;

  
constructionTypeSelectOptions: MaterialSelectOptions;
menuTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('menuType', { static: true }) MenuTypeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedTimetableDataForThirdParties: TimetableDataForThirdParties;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود المبنى', field: 'buildingCode' }),
	new GridColumnOptions({ headerName: 'كود الملحق', field: 'extensionCode' }),
	new GridColumnOptions({ headerName: 'سنه الخطة', field: 'planYear' }),
	new GridColumnOptions({ headerName: 'كود النموذج', field: 'modelCode' }),
	new GridColumnOptions({ headerName: 'سنه التسعير', field: 'pricingYear' }),
	new GridColumnOptions({ headerName: 'جدول زمني', field: 'timetable' }),
	new GridColumnOptions({ headerName: 'مده التنفيذ', field: 'durationofexecution' }),
	new GridColumnOptions({ headerName: 'عدد الادوار', field: 'numberofFloors' }),
	new GridColumnOptions({ headerName: 'نوع الانشاء', field: 'constructionType' }),
	new GridColumnOptions({ headerName: 'نوع القامه', field: 'menuType' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: TimetableDataForThirdPartiesViewComponent,
    editDialogClassType: TimetableDataForThirdPartiesEditComponent,
    newDialogClassType: TimetableDataForThirdPartiesNewComponent,
  });
    constructor(
        injector: Injector,
        public timetableDataForThirdPartiesService: TimetableDataForThirdPartiesService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedTimetableDataForThirdParties = new TimetableDataForThirdParties();

    
	this.constructionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.constructionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الانشاء',
	});

	this.menuTypeSelectOptions = new MaterialSelectOptions({
	 data: this.listTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع القامه',
	});


    this.searchForm = this.formBuilder.group({
     	buildingCode : [],
	extensionCode : [],
	planYear : [],
	modelCode : [],
	pricingYear : [],
	timetable : [],
	durationofexecution : [],
	numberofFloors : [],
	constructionType : [],
	menuType : []
    });

     
  }

  getTimetableDataForThirdPartiesPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<TimetableDataForThirdParties[]> => {
    return this.timetableDataForThirdPartiesService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.timetableDataForThirdPartiesService.delete(param.data.id)
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
this.listTypesService = new LookupService('listtypes', this.http);
  }
}

