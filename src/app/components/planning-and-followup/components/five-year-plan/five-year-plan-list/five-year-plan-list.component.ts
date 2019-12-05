
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { FiveYearPlan } from 'app/shared/models/five-year-plan';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FiveYearPlanEditComponent } from '../five-year-plan-edit/five-year-plan-edit.component';
import { FiveYearPlanNewComponent } from '../five-year-plan-new/five-year-plan-new.component';
import { FiveYearPlanViewComponent } from '../five-year-plan-view/five-year-plan-view.component';
import { FiveYearPlanService } from '../shared/five-year-plan.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-five-year-plan-list',
  templateUrl: './five-year-plan-list.component.html',
  styleUrls: ['./five-year-plan-list.component.scss'],
  providers: []
})

export class FiveYearPlanListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedFiveYearPlan: FiveYearPlan;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'الخطة الخمسية', field: 'fiveYearplan' }),
	new GridColumnOptions({ headerName: '  سنة البداية ', field: 'startYear' }),
	new GridColumnOptions({ headerName: 'سنة النهاية', field: 'endYear' }),
	new GridColumnOptions({ headerName: '  عدد المشاريع ', field: 'projectsNumber' }),
	new GridColumnOptions({ headerName: '  عدد المشاريع الفعلي', field: 'actualProjectsNumber' }),
	new GridColumnOptions({ headerName: ' القيمة المقترحة', field: 'suggestedValue' }),
	new GridColumnOptions({ headerName: ' قيمة الاعتماد', field: 'creditValue' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: FiveYearPlanViewComponent,
    editDialogClassType: FiveYearPlanEditComponent,
    newDialogClassType: FiveYearPlanNewComponent,
  });
    constructor(
        injector: Injector,
        public fiveYearPlanService: FiveYearPlanService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedFiveYearPlan = new FiveYearPlan();

    

    this.searchForm = this.formBuilder.group({
     	startYear : [],
	endYear : []
    });

     
  }

  getFiveYearPlanPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<FiveYearPlan[]> => {
    return this.fiveYearPlanService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.fiveYearPlanService.delete(param.data.id)
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

