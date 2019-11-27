
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { ImplementationDataSchedule } from 'app/shared/models/implementation-data-schedule';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ImplementationDataScheduleEditComponent } from '../implementation-data-schedule-edit/implementation-data-schedule-edit.component';
import { ImplementationDataScheduleNewComponent } from '../implementation-data-schedule-new/implementation-data-schedule-new.component';
import { ImplementationDataScheduleViewComponent } from '../implementation-data-schedule-view/implementation-data-schedule-view.component';
import { ImplementationDataScheduleService } from '../shared/implementation-data-schedule.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-implementation-data-schedule-list',
  templateUrl: './implementation-data-schedule-list.component.html',
  styleUrls: ['./implementation-data-schedule-list.component.scss'],
  providers: []
})

export class ImplementationDataScheduleListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private foundationTypesService: LookupService;

  
baseTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('baseType', { static: true }) BaseTypeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedImplementationDataSchedule: ImplementationDataSchedule;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'الكود', field: 'scheduleCode' }),
	new GridColumnOptions({ headerName: 'مدة التنفيذ', field: 'executionDuration' }),
	new GridColumnOptions({ headerName: 'عدد الأدوار', field: 'floorsNumber' }),
	new GridColumnOptions({ headerName: 'نوع الأساس', field: 'baseType' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: ImplementationDataScheduleViewComponent,
    editDialogClassType: ImplementationDataScheduleEditComponent,
    newDialogClassType: ImplementationDataScheduleNewComponent,
  });
    constructor(
        injector: Injector,
        public implementationDataScheduleService: ImplementationDataScheduleService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedImplementationDataSchedule = new ImplementationDataSchedule();

    
	this.baseTypeSelectOptions = new MaterialSelectOptions({
	 data: this.foundationTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الأساس',
	});


    this.searchForm = this.formBuilder.group({
     	scheduleCode : [],
	executionDuration : [],
	floorsNumber : [],
	baseType : []
    });

     
  }

  getImplementationDataSchedulePaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<ImplementationDataSchedule[]> => {
    return this.implementationDataScheduleService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.implementationDataScheduleService.delete(param.data.id)
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
    this.foundationTypesService = new LookupService('foundationtypes', this.http);
  }
}

