
import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AnnualPlan } from 'app/shared/models/annual-plan';
import { GridColumnOptions, GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { FormControlError, GridPaginatedSortedFiltered } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AnnualPlanEditComponent } from '../annual-plan-edit/annual-plan-edit.component';
import { AnnualPlanNewComponent } from '../annual-plan-new/annual-plan-new.component';
import { AnnualPlanViewComponent } from '../annual-plan-view/annual-plan-view.component';
import { AnnualPlanService } from '../shared/annual-plan.service';

@Component({
  selector: 'app-annual-plan-list',
  templateUrl: './annual-plan-list.component.html',
  styleUrls: ['./annual-plan-list.component.scss'],
  providers: []
})

export class AnnualPlanListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private majorClassificationsService: LookupService;
private subClassificationsService: LookupService;
private sessionDestinationCodesService: LookupService;
private areasService: LookupService;

  
majorClassificationSelectOptions: MaterialSelectOptions;
subcategorySelectOptions: MaterialSelectOptions;
courseDestinationCodeSelectOptions: MaterialSelectOptions;
administrationOrRegionSelectOptions: MaterialSelectOptions;

  
	@ViewChild('majorClassification', { static: true }) MajorClassificationSelectComponent: MaterialSelectComponent;
	@ViewChild('subcategory', { static: true }) SubcategorySelectComponent: MaterialSelectComponent;
	@ViewChild('courseDestinationCode', { static: true }) CourseDestinationCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('administrationOrRegion', { static: true }) AdministrationOrRegionSelectComponent: MaterialSelectComponent;

  
  @Input() selectedAnnualPlan: AnnualPlan;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'السنه التدريبيه', field: 'trainingYear' }),
	new GridColumnOptions({ headerName: 'العدد المرشح', field: 'candidatesNumber' }),
	new GridColumnOptions({ headerName: 'تصنيف رئيسى', field: 'majorClassification' }),
	new GridColumnOptions({ headerName: 'تصنيف فرعى', field: 'subcategory' }),
	new GridColumnOptions({ headerName: 'كود الدوره', field: 'courseCode' }),
	new GridColumnOptions({ headerName: 'كود جهه الدوره', field: 'courseDestinationCode' }),
	new GridColumnOptions({ headerName: 'مسلسل الدوره', field: 'serialSession' }),
	new GridColumnOptions({ headerName: 'الاداره او المنطقه', field: 'administrationOrRegion' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: AnnualPlanViewComponent,
    editDialogClassType: AnnualPlanEditComponent,
    newDialogClassType: AnnualPlanNewComponent,
  });
    constructor(
        injector: Injector,
        public annualPlanService: AnnualPlanService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedAnnualPlan = new AnnualPlan();

    
	this.majorClassificationSelectOptions = new MaterialSelectOptions({
	 data: this.majorClassificationsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'تصنيف رئيسى',
	});

	this.subcategorySelectOptions = new MaterialSelectOptions({
	 data: this.subClassificationsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'تصنيف فرعى',
	});

	this.courseDestinationCodeSelectOptions = new MaterialSelectOptions({
	 data: this.sessionDestinationCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود جهه الدوره',
	});

	this.administrationOrRegionSelectOptions = new MaterialSelectOptions({
	 data: this.areasService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الاداره او المنطقه',
	});


    this.searchForm = this.formBuilder.group({
     	trainingYear : [],
	courseCode : [],
	serialSession : [],
	candidatesNumber : [],
	majorClassification : [],
	subcategory : [],
	courseDestinationCode : [],
	administrationOrRegion : []
    });

     
  }

  getAnnualPlansPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<AnnualPlan[]> => {
    return this.annualPlanService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.annualPlanService.delete(param.data.id)
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
    this.majorClassificationsService = new LookupService('majorclassifications', this.http);
this.subClassificationsService = new LookupService('subclassifications', this.http);
this.sessionDestinationCodesService = new LookupService('sessiondestinationcodes', this.http);
this.areasService = new LookupService('areas', this.http);
  }
}

