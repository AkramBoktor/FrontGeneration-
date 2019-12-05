
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { Timetable } from 'app/shared/models/timetable';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { TimetableEditComponent } from '../timetable-edit/timetable-edit.component';
import { TimetableNewComponent } from '../timetable-new/timetable-new.component';
import { TimetableViewComponent } from '../timetable-view/timetable-view.component';
import { TimetableService } from '../shared/timetable.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-timetable-list',
  templateUrl: './timetable-list.component.html',
  styleUrls: ['./timetable-list.component.scss'],
  providers: []
})

export class TimetableListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedTimetable: Timetable;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم الجدول', field: 'tableTumber' }),
	new GridColumnOptions({ headerName: 'رقم النشاط', field: 'activityNumber' }),
	new GridColumnOptions({ headerName: 'بداية الايام', field: 'beginningDays' }),
	new GridColumnOptions({ headerName: 'مدة النشاط', field: 'activityDuration' }),
	new GridColumnOptions({ headerName: 'اسم النشاط', field: 'activityName' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: TimetableViewComponent,
    editDialogClassType: TimetableEditComponent,
    newDialogClassType: TimetableNewComponent,
  });
    constructor(
        injector: Injector,
        public timetableService: TimetableService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedTimetable = new Timetable();

    

    this.searchForm = this.formBuilder.group({
     	tableTumber : [],
	activityNumber : [],
	fromDate : [],
	toDate : []
    });

     
  }

  getTimetablesPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<Timetable[]> => {
    return this.timetableService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.timetableService.delete(param.data.id)
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

