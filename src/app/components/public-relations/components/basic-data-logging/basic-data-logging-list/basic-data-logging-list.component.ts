
import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { BasicDataLogging } from 'app/shared/models/basic-data-logging';
import { GridColumnOptions, GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { FormControlError, GridPaginatedSortedFiltered } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { BasicDataLoggingEditComponent } from '../basic-data-logging-edit/basic-data-logging-edit.component';
import { BasicDataLoggingNewComponent } from '../basic-data-logging-new/basic-data-logging-new.component';
import { BasicDataLoggingViewComponent } from '../basic-data-logging-view/basic-data-logging-view.component';
import { BasicDataLoggingService } from '../shared/basic-data-logging.service';

@Component({
  selector: 'app-basic-data-logging-list',
  templateUrl: './basic-data-logging-list.component.html',
  styleUrls: ['./basic-data-logging-list.component.scss'],
  providers: []
})

export class BasicDataLoggingListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private publishingAuthoritiesService: LookupService;
private publishingPlacesService: LookupService;

  
publisherCodeSelectOptions: MaterialSelectOptions;
publicationCodePlaceSelectOptions: MaterialSelectOptions;

  
	@ViewChild('publisherCode', { static: true }) PublisherCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('publicationCodePlace', { static: true }) PublicationCodePlaceSelectComponent: MaterialSelectComponent;

  
  @Input() selectedBasicDataLogging: BasicDataLogging;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'تاريخ النشر', field: 'publicationDate' }),
	new GridColumnOptions({ headerName: 'رقم الصفحة', field: 'pageNumber' }),
	new GridColumnOptions({ headerName: 'اسم الكاتب', field: 'authorName' }),
	new GridColumnOptions({ headerName: 'رقم العدد', field: 'number' }),
	new GridColumnOptions({ headerName: 'كود جهة النشر', field: 'publisherCode' }),
	new GridColumnOptions({ headerName: 'كود مكان النشر', field: 'publicationCodePlace' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: BasicDataLoggingViewComponent,
    editDialogClassType: BasicDataLoggingEditComponent,
    newDialogClassType: BasicDataLoggingNewComponent,
  });
    constructor(
        injector: Injector,
        public basicDataLoggingService: BasicDataLoggingService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedBasicDataLogging = new BasicDataLogging();

    
	this.publisherCodeSelectOptions = new MaterialSelectOptions({
	 data: this.publishingAuthoritiesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود جهة النشر',
	});

	this.publicationCodePlaceSelectOptions = new MaterialSelectOptions({
	 data: this.publishingPlacesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود مكان النشر',
	});


    this.searchForm = this.formBuilder.group({
     	publicationDate : [],
	pageNumber : [],
	authorName : [],
	number : [],
	publisherCode : [],
	publicationCodePlace : []
    });

     
  }

  getBasicDataLoggingPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<BasicDataLogging[]> => {
    return this.basicDataLoggingService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.basicDataLoggingService.delete(param.data.id)
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
    this.publishingAuthoritiesService = new LookupService('publishingauthorities', this.http);
this.publishingPlacesService = new LookupService('publishingplaces', this.http);
  }
}

