
import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { GridColumnOptions, GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { FormControlError, GridPaginatedSortedFiltered } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { SessionSubCodes } from 'app/shared/models/session-sub-codes';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { SessionSubCodesEditComponent } from '../session-sub-codes-edit/session-sub-codes-edit.component';
import { SessionSubCodesNewComponent } from '../session-sub-codes-new/session-sub-codes-new.component';
import { SessionSubCodesViewComponent } from '../session-sub-codes-view/session-sub-codes-view.component';
import { SessionSubCodesService } from '../shared/session-sub-codes.service';

@Component({
  selector: 'app-session-sub-codes-list',
  templateUrl: './session-sub-codes-list.component.html',
  styleUrls: ['./session-sub-codes-list.component.scss'],
  providers: []
})

export class SessionSubCodesListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private majorClassificationsService: LookupService;
private subClassificationsService: LookupService;

  
majorClassificationSelectOptions: MaterialSelectOptions;
subcategorySelectOptions: MaterialSelectOptions;

  
	@ViewChild('majorClassification', { static: true }) MajorClassificationSelectComponent: MaterialSelectComponent;
	@ViewChild('subcategory', { static: true }) SubcategorySelectComponent: MaterialSelectComponent;

  
  @Input() selectedSessionSubCodes: SessionSubCodes;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'اسم الدوره', field: 'courseName' }),
	new GridColumnOptions({ headerName: 'تصنيف رئيسى', field: 'majorClassification' }),
	new GridColumnOptions({ headerName: 'تصنيف فرعى', field: 'subcategory' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: SessionSubCodesViewComponent,
    editDialogClassType: SessionSubCodesEditComponent,
    newDialogClassType: SessionSubCodesNewComponent,
  });
    constructor(
        injector: Injector,
        public sessionSubCodesService: SessionSubCodesService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedSessionSubCodes = new SessionSubCodes();

    
	this.majorClassificationSelectOptions = new MaterialSelectOptions({
	 data: this.majorClassificationsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'تصنيف رئيسى',
	});

	this.subcategorySelectOptions = new MaterialSelectOptions({
	 data: this.subClassificationsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'تصنيف فرعى',
	});


    this.searchForm = this.formBuilder.group({
     	courseName : [],
	majorClassification : [],
	subcategory : []
    });

     
  }

  getSessionSubCodesPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<SessionSubCodes[]> => {
    return this.sessionSubCodesService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.sessionSubCodesService.delete(param.data.id)
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
    this.majorClassificationsService = new LookupService('majorclassifications', this.http);
this.subClassificationsService = new LookupService('subclassifications', this.http);
  }
}

