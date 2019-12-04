
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { TimetableDataWithdrawn } from 'app/shared/models/timetable-data-withdrawn';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { TimetableDataWithdrawnEditComponent } from '../timetable-data-withdrawn-edit/timetable-data-withdrawn-edit.component';
import { TimetableDataWithdrawnNewComponent } from '../timetable-data-withdrawn-new/timetable-data-withdrawn-new.component';
import { TimetableDataWithdrawnViewComponent } from '../timetable-data-withdrawn-view/timetable-data-withdrawn-view.component';
import { TimetableDataWithdrawnService } from '../shared/timetable-data-withdrawn.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-timetable-data-withdrawn-list',
  templateUrl: './timetable-data-withdrawn-list.component.html',
  styleUrls: ['./timetable-data-withdrawn-list.component.scss'],
  providers: []
})

export class TimetableDataWithdrawnListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private constructionTypesService: LookupService;
private foundationTypesService: LookupService;

  
constructionTypeSelectOptions: MaterialSelectOptions;
baseTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('baseType', { static: true }) BaseTypeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedTimetableDataWithdrawn: TimetableDataWithdrawn;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود المبنى', field: 'buildingCode' }),
	new GridColumnOptions({ headerName: 'كود الملحق', field: 'extensionCode' }),
	new GridColumnOptions({ headerName: 'سنة الخطة', field: 'planYear' }),
	new GridColumnOptions({ headerName: 'كود النموذج', field: 'modelCode' }),
	new GridColumnOptions({ headerName: 'سنة التسعير', field: 'pricingYear' }),
	new GridColumnOptions({ headerName: 'كود جدول زمني', field: 'scheduleCode' }),
	new GridColumnOptions({ headerName: 'مدة التنفيذ', field: 'executionDuration' }),
	new GridColumnOptions({ headerName: 'عدد الأدوار', field: 'floorNumber' }),
	new GridColumnOptions({ headerName: 'نوع الإنشاء', field: 'constructionType' }),
	new GridColumnOptions({ headerName: 'نوع الأساسات', field: 'baseType' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: TimetableDataWithdrawnViewComponent,
    editDialogClassType: TimetableDataWithdrawnEditComponent,
    newDialogClassType: TimetableDataWithdrawnNewComponent,
  });
    constructor(
        injector: Injector,
        public timetableDataWithdrawnService: TimetableDataWithdrawnService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedTimetableDataWithdrawn = new TimetableDataWithdrawn();

    
	this.constructionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.constructionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الإنشاء',
	});

	this.baseTypeSelectOptions = new MaterialSelectOptions({
	 data: this.foundationTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الأساسات',
	});


    this.searchForm = this.formBuilder.group({
     	buildingCode : [],
	extensionCode : [],
	planYear : [],
	modelCode : [],
	pricingYear : [],
	scheduleCode : [],
	executionDuration : [],
	floorNumber : [],
	constructionType : [],
	baseType : []
    });

     
  }

  getTimetableDataWithdrawnPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<TimetableDataWithdrawn[]> => {
    return this.timetableDataWithdrawnService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.timetableDataWithdrawnService.delete(param.data.id)
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
this.foundationTypesService = new LookupService('foundationtypes', this.http);
  }
}

