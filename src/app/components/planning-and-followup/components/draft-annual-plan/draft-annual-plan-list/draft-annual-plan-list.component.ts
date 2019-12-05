
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { DraftAnnualPlan } from 'app/shared/models/draft-annual-plan';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { DraftAnnualPlanEditComponent } from '../draft-annual-plan-edit/draft-annual-plan-edit.component';
import { DraftAnnualPlanNewComponent } from '../draft-annual-plan-new/draft-annual-plan-new.component';
import { DraftAnnualPlanViewComponent } from '../draft-annual-plan-view/draft-annual-plan-view.component';
import { DraftAnnualPlanService } from '../shared/draft-annual-plan.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-draft-annual-plan-list',
  templateUrl: './draft-annual-plan-list.component.html',
  styleUrls: ['./draft-annual-plan-list.component.scss'],
  providers: []
})

export class DraftAnnualPlanListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedDraftAnnualPlan: DraftAnnualPlan;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: '  القيمة المقترحة', field: 'suggestedValue' }),
	new GridColumnOptions({ headerName: '  قيمة الاعتماد', field: 'creditValue' }),
	new GridColumnOptions({ headerName: ' عدد الفصول', field: 'classesNumber' }),
	new GridColumnOptions({ headerName: '  عدد المدارس', field: 'schoolsNumber' }),
	new GridColumnOptions({ headerName: '  سنة الخطة', field: 'yearPlan' }),
	new GridColumnOptions({ headerName: '  رمز مشروع خطة سنوية', field: 'annualProjectPlanCode' }),
	new GridColumnOptions({ headerName: ' رمز مشروع خطة خمسة', field: 'fivePlanProjectCode' }),
	new GridColumnOptions({ headerName: ' الاعتماد بعد التعديل', field: 'accreditationAfterAmendment' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: DraftAnnualPlanViewComponent,
    editDialogClassType: DraftAnnualPlanEditComponent,
    newDialogClassType: DraftAnnualPlanNewComponent,
  });
    constructor(
        injector: Injector,
        public draftAnnualPlanService: DraftAnnualPlanService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedDraftAnnualPlan = new DraftAnnualPlan();

    

    this.searchForm = this.formBuilder.group({
     	yearPlan : [],
	annualProjectPlanCode : [],
	fivePlanProjectCode : []
    });

     
  }

  getDraftAnnualPlanPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<DraftAnnualPlan[]> => {
    return this.draftAnnualPlanService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.draftAnnualPlanService.delete(param.data.id)
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

