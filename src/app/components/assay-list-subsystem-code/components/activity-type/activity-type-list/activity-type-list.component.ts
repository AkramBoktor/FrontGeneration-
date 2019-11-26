
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { ActivityType } from 'app/shared/models/activity-type';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ActivityTypeEditComponent } from '../activity-type-edit/activity-type-edit.component';
import { ActivityTypeNewComponent } from '../activity-type-new/activity-type-new.component';
import { ActivityTypeViewComponent } from '../activity-type-view/activity-type-view.component';
import { ActivityTypeService } from '../shared/activity-type.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-activity-type-list',
  templateUrl: './activity-type-list.component.html',
  styleUrls: ['./activity-type-list.component.scss'],
  providers: []
})

export class ActivityTypeListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private workTypesService: LookupService;

  
workTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('workType', { static: true }) WorkTypeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedActivityType: ActivityType;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'الكود', field: 'code' }),
	new GridColumnOptions({ headerName: 'الاسم', field: 'name' }),
	new GridColumnOptions({ headerName: 'نوع العمل', field: 'workType' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: ActivityTypeViewComponent,
    editDialogClassType: ActivityTypeEditComponent,
    newDialogClassType: ActivityTypeNewComponent,
  });
    constructor(
        injector: Injector,
        public activityTypeService: ActivityTypeService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedActivityType = new ActivityType();

    
	this.workTypeSelectOptions = new MaterialSelectOptions({
	 data: this.workTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع العمل',
	});


    this.searchForm = this.formBuilder.group({
     	code : [],
	name : [],
	workType : []
    });

     
  }

  getActivityTypesPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<ActivityType[]> => {
    return this.activityTypeService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.activityTypeService.delete(param.data.id)
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
    this.workTypesService = new LookupService('worktypes', this.http);
  }
}

