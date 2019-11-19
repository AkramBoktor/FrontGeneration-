
import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AgendaInternal } from 'app/shared/models/agenda-internal';
import { GridColumnOptions, GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { FormControlError, GridPaginatedSortedFiltered } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AgendaInternalEditComponent } from '../agenda-internal-edit/agenda-internal-edit.component';
import { AgendaInternalNewComponent } from '../agenda-internal-new/agenda-internal-new.component';
import { AgendaInternalViewComponent } from '../agenda-internal-view/agenda-internal-view.component';
import { AgendaInternalService } from '../shared/agenda-internal.service';

@Component({
  selector: 'app-agenda-internal-list',
  templateUrl: './agenda-internal-list.component.html',
  styleUrls: ['./agenda-internal-list.component.scss'],
  providers: []
})

export class AgendaInternalListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private jobTypesService: LookupService;
private subDepartmentsService: LookupService;

  
jobSelectOptions: MaterialSelectOptions;
entitySelectOptions: MaterialSelectOptions;

  
	@ViewChild('job', { static: true }) JobSelectComponent: MaterialSelectComponent;
	@ViewChild('entity', { static: true }) EntitySelectComponent: MaterialSelectComponent;

  
  @Input() selectedAgendaInternal: AgendaInternal;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود الموظف', field: 'employeeCode' }),
	new GridColumnOptions({ headerName: 'رقم التليفون', field: 'phoneNumber' }),
	new GridColumnOptions({ headerName: 'البريد الالكتروني', field: 'email' }),
	new GridColumnOptions({ headerName: 'اسم الموظف', field: 'employeeName' }),
	new GridColumnOptions({ headerName: 'الوظيفه', field: 'job' }),
	new GridColumnOptions({ headerName: 'جهه', field: 'entity' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: AgendaInternalViewComponent,
    editDialogClassType: AgendaInternalEditComponent,
    newDialogClassType: AgendaInternalNewComponent,
  });
    constructor(
        injector: Injector,
        public agendaInternalService: AgendaInternalService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedAgendaInternal = new AgendaInternal();

    
	this.jobSelectOptions = new MaterialSelectOptions({
	 data: this.jobTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الوظيفه',
	});

	this.entitySelectOptions = new MaterialSelectOptions({
	 data: this.subDepartmentsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'جهه',
	});


    this.searchForm = this.formBuilder.group({
     	employeeCode : [],
	phoneNumber : [],
	email : [],
	employeeName : [],
	job : [],
	entity : []
    });

     
  }

  getAgendaInternalPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<AgendaInternal[]> => {
    return this.agendaInternalService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.agendaInternalService.delete(param.data.id)
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
    this.jobTypesService = new LookupService('jobtypes', this.http);
this.subDepartmentsService = new LookupService('subdepartments', this.http);
  }
}

