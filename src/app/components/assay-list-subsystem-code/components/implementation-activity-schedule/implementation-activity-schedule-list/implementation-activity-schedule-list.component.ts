
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { ImplementationActivitySchedule } from 'app/shared/models/implementation-activity-schedule';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ImplementationActivityScheduleEditComponent } from '../implementation-activity-schedule-edit/implementation-activity-schedule-edit.component';
import { ImplementationActivityScheduleNewComponent } from '../implementation-activity-schedule-new/implementation-activity-schedule-new.component';
import { ImplementationActivityScheduleViewComponent } from '../implementation-activity-schedule-view/implementation-activity-schedule-view.component';
import { ImplementationActivityScheduleService } from '../shared/implementation-activity-schedule.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-implementation-activity-schedule-list',
  templateUrl: './implementation-activity-schedule-list.component.html',
  styleUrls: ['./implementation-activity-schedule-list.component.scss'],
  providers: []
})

export class ImplementationActivityScheduleListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedImplementationActivitySchedule: ImplementationActivitySchedule;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'اسم النشاط', field: 'activity' }),
	new GridColumnOptions({ headerName: 'بداية الايام', field: 'daysStart' }),
	new GridColumnOptions({ headerName: 'مدة النشاط', field: 'activityDuration' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: ImplementationActivityScheduleViewComponent,
    editDialogClassType: ImplementationActivityScheduleEditComponent,
    newDialogClassType: ImplementationActivityScheduleNewComponent,
  });
    constructor(
        injector: Injector,
        public implementationActivityScheduleService: ImplementationActivityScheduleService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedImplementationActivitySchedule = new ImplementationActivitySchedule();

    

    this.searchForm = this.formBuilder.group({
     	scheduleCode : [],
	activity : [],
	daysStart : [],
	activityDuration : []
    });

     
  }

  getImplementationActivitySchedulePaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<ImplementationActivitySchedule[]> => {
    return this.implementationActivityScheduleService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.implementationActivityScheduleService.delete(param.data.id)
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

