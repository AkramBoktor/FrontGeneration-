
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { ThePlannedStartDateForTheSchedule } from 'app/shared/models/the-planned-start-date-for-the-schedule';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ThePlannedStartDateForTheScheduleEditComponent } from '../the-planned-start-date-for-the-schedule-edit/the-planned-start-date-for-the-schedule-edit.component';
import { ThePlannedStartDateForTheScheduleNewComponent } from '../the-planned-start-date-for-the-schedule-new/the-planned-start-date-for-the-schedule-new.component';
import { ThePlannedStartDateForTheScheduleViewComponent } from '../the-planned-start-date-for-the-schedule-view/the-planned-start-date-for-the-schedule-view.component';
import { ThePlannedStartDateForTheScheduleService } from '../shared/the-planned-start-date-for-the-schedule.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-the-planned-start-date-for-the-schedule-list',
  templateUrl: './the-planned-start-date-for-the-schedule-list.component.html',
  styleUrls: ['./the-planned-start-date-for-the-schedule-list.component.scss'],
  providers: []
})

export class ThePlannedStartDateForTheScheduleListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private offeringTypesService: LookupService;
private constructionTypesService: LookupService;
private governoratesService: LookupService;

  
subtractionTypeSelectOptions: MaterialSelectOptions;
constructionTypeSelectOptions: MaterialSelectOptions;
governorateCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('subtractionType', { static: true }) SubtractionTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('governorateCode', { static: true }) GovernorateCodeSelectComponent: MaterialSelectComponent;

  
tenderCodeIsVisible: boolean;
  @Input() selectedThePlannedStartDateForTheSchedule: ThePlannedStartDateForTheSchedule;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم المبني التعليمي', field: 'buildingNumberEducational' }),
	new GridColumnOptions({ headerName: 'كود المناقصة', field: 'tenderCode' }),
	new GridColumnOptions({ headerName: 'سنة الخطة', field: 'yearPlan' }),
	new GridColumnOptions({ headerName: 'مسلسل الملحق', field: 'serialSupplement' }),
	new GridColumnOptions({ headerName: 'نوع تاريخ بداية المخطط', field: 'typeOFStartDateForChart' }),
	new GridColumnOptions({ headerName: 'تاريخ بداية المخطط', field: 'startDateForChart' }),
	new GridColumnOptions({ headerName: 'ملاحظات', field: 'notes' }),
	new GridColumnOptions({ headerName: 'نوع الطرح', field: 'subtractionType' }),
	new GridColumnOptions({ headerName: 'نوع الانشاء', field: 'constructionType' }),
	new GridColumnOptions({ headerName: 'كود المحافظة', field: 'governorateCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: ThePlannedStartDateForTheScheduleViewComponent,
    editDialogClassType: ThePlannedStartDateForTheScheduleEditComponent,
    newDialogClassType: ThePlannedStartDateForTheScheduleNewComponent,
  });
    constructor(
        injector: Injector,
        public thePlannedStartDateForTheScheduleService: ThePlannedStartDateForTheScheduleService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedThePlannedStartDateForTheSchedule = new ThePlannedStartDateForTheSchedule();

    
	this.subtractionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});

	this.constructionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.constructionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الانشاء',
	});

	this.governorateCodeSelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المحافظة',
	});


    this.searchForm = this.formBuilder.group({
     	buildingNumberEducational : [],
	tenderCode : [],
	yearPlan : [],
	serialSupplement : [],
	typeOFStartDateForChart : [],
	startDateForChart : [],
	notes : [],
	subtractionType : [],
	constructionType : [],
	governorateCode : []
    });

     
  }

  getThePlannedStartDateForTheSchedulePaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<ThePlannedStartDateForTheSchedule[]> => {
    return this.thePlannedStartDateForTheScheduleService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.thePlannedStartDateForTheScheduleService.delete(param.data.id)
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
    this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.governoratesService = new LookupService('governorates', this.http);
  }
}

