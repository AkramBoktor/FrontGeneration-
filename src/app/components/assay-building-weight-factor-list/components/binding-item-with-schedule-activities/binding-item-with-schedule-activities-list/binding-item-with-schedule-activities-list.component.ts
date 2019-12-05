
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { BindingItemWithScheduleActivities } from 'app/shared/models/binding-item-with-schedule-activities';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { BindingItemWithScheduleActivitiesEditComponent } from '../binding-item-with-schedule-activities-edit/binding-item-with-schedule-activities-edit.component';
import { BindingItemWithScheduleActivitiesNewComponent } from '../binding-item-with-schedule-activities-new/binding-item-with-schedule-activities-new.component';
import { BindingItemWithScheduleActivitiesViewComponent } from '../binding-item-with-schedule-activities-view/binding-item-with-schedule-activities-view.component';
import { BindingItemWithScheduleActivitiesService } from '../shared/binding-item-with-schedule-activities.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-binding-item-with-schedule-activities-list',
  templateUrl: './binding-item-with-schedule-activities-list.component.html',
  styleUrls: ['./binding-item-with-schedule-activities-list.component.scss'],
  providers: []
})

export class BindingItemWithScheduleActivitiesListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private itemCodesService: LookupService;

  
itemCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('itemCode', { static: true }) ItemCodeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedBindingItemWithScheduleActivities: BindingItemWithScheduleActivities;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود النشاط', field: 'activityCode' }),
	new GridColumnOptions({ headerName: 'كود البند', field: 'itemCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: BindingItemWithScheduleActivitiesViewComponent,
    editDialogClassType: BindingItemWithScheduleActivitiesEditComponent,
    newDialogClassType: BindingItemWithScheduleActivitiesNewComponent,
  });
    constructor(
        injector: Injector,
        public bindingItemWithScheduleActivitiesService: BindingItemWithScheduleActivitiesService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedBindingItemWithScheduleActivities = new BindingItemWithScheduleActivities();

    
	this.itemCodeSelectOptions = new MaterialSelectOptions({
	 data: this.itemCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود البند',
	});


    this.searchForm = this.formBuilder.group({
     	activityCode : [],
	itemCode : []
    });

     
  }

  getBindingItemWithScheduleActivitiesPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<BindingItemWithScheduleActivities[]> => {
    return this.bindingItemWithScheduleActivitiesService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.bindingItemWithScheduleActivitiesService.delete(param.data.id)
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
    this.itemCodesService = new LookupService('itemcodes', this.http);
  }
}

