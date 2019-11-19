
import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { GridColumnOptions, GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { FormControlError, GridPaginatedSortedFiltered } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { WhatHappenedInTheSession } from 'app/shared/models/what-happened-in-the-session';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { WhatHappenedInTheSessionService } from '../shared/what-happened-in-the-session.service';
import { WhatHappenedInTheSessionEditComponent } from '../what-happened-in-the-session-edit/what-happened-in-the-session-edit.component';
import { WhatHappenedInTheSessionNewComponent } from '../what-happened-in-the-session-new/what-happened-in-the-session-new.component';
import { WhatHappenedInTheSessionViewComponent } from '../what-happened-in-the-session-view/what-happened-in-the-session-view.component';

@Component({
  selector: 'app-what-happened-in-the-session-list',
  templateUrl: './what-happened-in-the-session-list.component.html',
  styleUrls: ['./what-happened-in-the-session-list.component.scss'],
  providers: []
})

export class WhatHappenedInTheSessionListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private branchCodesService: LookupService;
private entityTypeService: LookupService;
private entityCodesService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;
entityTypeSelectOptions: MaterialSelectOptions;
entityCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('entityType', { static: true }) EntityTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('entityCode', { static: true }) EntityCodeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedWhatHappenedInTheSession: WhatHappenedInTheSession;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم الملف', field: 'fileNumber' }),
	new GridColumnOptions({ headerName: 'اسم الجهة', field: 'entityName' }),
	new GridColumnOptions({ headerName: 'رقم الدعوي', field: 'lawsuitNumber' }),
	new GridColumnOptions({ headerName: 'لسنة ', field: 'year' }),
	new GridColumnOptions({ headerName: 'ما تم في الجلسة من الاحداث', field: 'sessionEvents' }),
	new GridColumnOptions({ headerName: 'كود الفرع', field: 'branchCode' }),
	new GridColumnOptions({ headerName: 'نوع الجهة', field: 'entityType' }),
	new GridColumnOptions({ headerName: 'كود الجهة', field: 'entityCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: WhatHappenedInTheSessionViewComponent,
    editDialogClassType: WhatHappenedInTheSessionEditComponent,
    newDialogClassType: WhatHappenedInTheSessionNewComponent,
  });
    constructor(
        injector: Injector,
        public whatHappenedInTheSessionService: WhatHappenedInTheSessionService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedWhatHappenedInTheSession = new WhatHappenedInTheSession();

    
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


    this.searchForm = this.formBuilder.group({
     	fileNumber : [],
	entityName : [],
	lawsuitNumber : [],
	year : [],
	sessionEvents : [],
	branchCode : [],
	entityType : [],
	entityCode : []
    });

     
  }

  getWhatHappenedInTheSessionPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<WhatHappenedInTheSession[]> => {
    return this.whatHappenedInTheSessionService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.whatHappenedInTheSessionService.delete(param.data.id)
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
  }
}

