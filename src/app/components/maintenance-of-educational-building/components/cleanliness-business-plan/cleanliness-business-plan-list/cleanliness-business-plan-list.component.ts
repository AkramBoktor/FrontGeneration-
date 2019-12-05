
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { CleanlinessBusinessPlan } from 'app/shared/models/cleanliness-business-plan';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { CleanlinessBusinessPlanEditComponent } from '../cleanliness-business-plan-edit/cleanliness-business-plan-edit.component';
import { CleanlinessBusinessPlanNewComponent } from '../cleanliness-business-plan-new/cleanliness-business-plan-new.component';
import { CleanlinessBusinessPlanViewComponent } from '../cleanliness-business-plan-view/cleanliness-business-plan-view.component';
import { CleanlinessBusinessPlanService } from '../shared/cleanliness-business-plan.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-cleanliness-business-plan-list',
  templateUrl: './cleanliness-business-plan-list.component.html',
  styleUrls: ['./cleanliness-business-plan-list.component.scss'],
  providers: []
})

export class CleanlinessBusinessPlanListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private branchCodesService: LookupService;

  
branchSelectOptions: MaterialSelectOptions;

  
	@ViewChild('branch', { static: true }) BranchSelectComponent: MaterialSelectComponent;

  
  @Input() selectedCleanlinessBusinessPlan: CleanlinessBusinessPlan;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'السنه', field: 'year' }),
	new GridColumnOptions({ headerName: ' الشهر          ', field: 'month' }),
	new GridColumnOptions({ headerName: 'تاريخ بدايه الخطه ', field: 'beginningPlanDate' }),
	new GridColumnOptions({ headerName: ' تاريخ نهايه الخطه', field: 'endPlanDate' }),
	new GridColumnOptions({ headerName: 'المستهدف', field: 'target' }),
	new GridColumnOptions({ headerName: 'فرع', field: 'branch' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: CleanlinessBusinessPlanViewComponent,
    editDialogClassType: CleanlinessBusinessPlanEditComponent,
    newDialogClassType: CleanlinessBusinessPlanNewComponent,
  });
    constructor(
        injector: Injector,
        public cleanlinessBusinessPlanService: CleanlinessBusinessPlanService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedCleanlinessBusinessPlan = new CleanlinessBusinessPlan();

    
	this.branchSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'فرع',
	});


    this.searchForm = this.formBuilder.group({
     	year : [],
	month : [],
	beginningPlanDate : [],
	endPlanDate : [],
	target : [],
	branch : []
    });

     
  }

  getCleanlinessBusinessPlanPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<CleanlinessBusinessPlan[]> => {
    return this.cleanlinessBusinessPlanService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.cleanlinessBusinessPlanService.delete(param.data.id)
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
    this.branchCodesService = new LookupService('branchcodes', this.http);
  }
}

