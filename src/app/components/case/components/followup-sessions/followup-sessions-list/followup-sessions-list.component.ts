
import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { GridColumnOptions, GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { FormControlError, GridPaginatedSortedFiltered } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { FollowupSessions } from 'app/shared/models/followup-sessions';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { FollowupSessionsEditComponent } from '../followup-sessions-edit/followup-sessions-edit.component';
import { FollowupSessionsNewComponent } from '../followup-sessions-new/followup-sessions-new.component';
import { FollowupSessionsViewComponent } from '../followup-sessions-view/followup-sessions-view.component';
import { FollowupSessionsService } from '../shared/followup-sessions.service';

@Component({
  selector: 'app-followup-sessions-list',
  templateUrl: './followup-sessions-list.component.html',
  styleUrls: ['./followup-sessions-list.component.scss'],
  providers: []
})

export class FollowupSessionsListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private branchCodesService: LookupService;
private entityTypeService: LookupService;
private entityCodesService: LookupService;
private courtCodesService: LookupService;
private circuitCodesService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;
entityTypeSelectOptions: MaterialSelectOptions;
entityCodeSelectOptions: MaterialSelectOptions;
courtCodeSelectOptions: MaterialSelectOptions;
chamberTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('entityType', { static: true }) EntityTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('entityCode', { static: true }) EntityCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('courtCode', { static: true }) CourtCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('chamberType', { static: true }) ChamberTypeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedFollowupSessions: FollowupSessions;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم الملف', field: 'fileNumber' }),
	new GridColumnOptions({ headerName: 'اسم الجهة', field: 'entityName' }),
	new GridColumnOptions({ headerName: 'رقم الدعوة', field: 'lawsuitNumber' }),
	new GridColumnOptions({ headerName: 'لسنة', field: 'year' }),
	new GridColumnOptions({ headerName: 'تاريخ الجلسة', field: 'sessionDate' }),
	new GridColumnOptions({ headerName: 'كود القرار', field: 'decisionCode' }),
	new GridColumnOptions({ headerName: 'تاريخ الجلسة القادمة', field: 'nextSessionDate' }),
	new GridColumnOptions({ headerName: 'كود الفرع', field: 'branchCode' }),
	new GridColumnOptions({ headerName: 'نوع الجهة', field: 'entityType' }),
	new GridColumnOptions({ headerName: 'كود الجهة', field: 'entityCode' }),
	new GridColumnOptions({ headerName: 'كود المحكمة ', field: 'courtCode' }),
	new GridColumnOptions({ headerName: 'نوع الدائره ', field: 'chamberType' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: FollowupSessionsViewComponent,
    editDialogClassType: FollowupSessionsEditComponent,
    newDialogClassType: FollowupSessionsNewComponent,
  });
    constructor(
        injector: Injector,
        public followupSessionsService: FollowupSessionsService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedFollowupSessions = new FollowupSessions();

    
	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الفرع',
	});

	this.entityTypeSelectOptions = new MaterialSelectOptions({
	 data: this.entityTypeService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الجهة',
	});

	this.entityCodeSelectOptions = new MaterialSelectOptions({
	 data: this.entityCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الجهة',
	});

	this.courtCodeSelectOptions = new MaterialSelectOptions({
	 data: this.courtCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المحكمة',
	});

	this.chamberTypeSelectOptions = new MaterialSelectOptions({
	 data: this.circuitCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الدائرة',
	});


    this.searchForm = this.formBuilder.group({
     	fileNumber : [],
	entityName : [],
	lawsuitNumber : [],
	year : [],
	sessionDate : [],
	decisionCode : [],
	nextSessionDate : [],
	branchCode : [],
	entityType : [],
	entityCode : [],
	courtCode : [],
	chamberType : []
    });

     
  }

  getFollowupSessionsPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<FollowupSessions[]> => {
    return this.followupSessionsService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.followupSessionsService.delete(param.data.id)
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
this.entityTypeService = new LookupService('entitytypes', this.http);
this.entityCodesService = new LookupService('entitycodes', this.http);
this.courtCodesService = new LookupService('courtcodes', this.http);
this.circuitCodesService = new LookupService('circuitcodes', this.http);
  }
}

