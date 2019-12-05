
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { DraftFiveYearPlan } from 'app/shared/models/draft-five-year-plan';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { DraftFiveYearPlanEditComponent } from '../draft-five-year-plan-edit/draft-five-year-plan-edit.component';
import { DraftFiveYearPlanNewComponent } from '../draft-five-year-plan-new/draft-five-year-plan-new.component';
import { DraftFiveYearPlanViewComponent } from '../draft-five-year-plan-view/draft-five-year-plan-view.component';
import { DraftFiveYearPlanService } from '../shared/draft-five-year-plan.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-draft-five-year-plan-list',
  templateUrl: './draft-five-year-plan-list.component.html',
  styleUrls: ['./draft-five-year-plan-list.component.scss'],
  providers: []
})

export class DraftFiveYearPlanListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private projectTypesService: LookupService;
private educationalLevelsService: LookupService;

  
projectTypeSelectOptions: MaterialSelectOptions;
educationallevelSelectOptions: MaterialSelectOptions;

  
	@ViewChild('projectType', { static: true }) ProjectTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('educationallevel', { static: true }) EducationallevelSelectComponent: MaterialSelectComponent;

  
  @Input() selectedDraftFiveYearPlan: DraftFiveYearPlan;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: '  رقم الخطة الخمسية', field: 'fiveYearPlanNumber' }),
	new GridColumnOptions({ headerName: ' رقم المشروع', field: 'projectNumber' }),
	new GridColumnOptions({ headerName: '  رقم المشروع بوزارة التخطيط', field: 'planningProjectNumberMinistry' }),
	new GridColumnOptions({ headerName: '  اسم المشروع', field: 'projectName' }),
	new GridColumnOptions({ headerName: '  القيمة المقترحة', field: 'suggestedValue' }),
	new GridColumnOptions({ headerName: '  قيمة الاعتماد', field: 'creditValue' }),
	new GridColumnOptions({ headerName: '  عدد المدارس', field: 'schoolsNumber' }),
	new GridColumnOptions({ headerName: ' عدد الفصول', field: 'classesNumber' }),
	new GridColumnOptions({ headerName: '  نوع المشروع', field: 'projectType' }),
	new GridColumnOptions({ headerName: '  المرحلة التعليمية', field: 'educationallevel' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: DraftFiveYearPlanViewComponent,
    editDialogClassType: DraftFiveYearPlanEditComponent,
    newDialogClassType: DraftFiveYearPlanNewComponent,
  });
    constructor(
        injector: Injector,
        public draftFiveYearPlanService: DraftFiveYearPlanService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedDraftFiveYearPlan = new DraftFiveYearPlan();

    
	this.projectTypeSelectOptions = new MaterialSelectOptions({
	 data: this.projectTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: '  نوع المشروع',
	});

	this.educationallevelSelectOptions = new MaterialSelectOptions({
	 data: this.educationalLevelsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: '  المرحلة التعليمية',
	});


    this.searchForm = this.formBuilder.group({
     	fiveYearPlanNumber : [],
	projectNumber : [],
	projectType : [],
	educationallevel : []
    });

     
  }

  getDraftFiveYearPlanPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<DraftFiveYearPlan[]> => {
    return this.draftFiveYearPlanService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.draftFiveYearPlanService.delete(param.data.id)
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
    this.projectTypesService = new LookupService('projecttypes', this.http);
this.educationalLevelsService = new LookupService('educationallevels', this.http);
  }
}

