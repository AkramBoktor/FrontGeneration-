
import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AuthorityResponseToNewspaper } from 'app/shared/models/authority-response-to-newspaper';
import { GridColumnOptions, GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { FormControlError, GridPaginatedSortedFiltered } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthorityResponseToNewspaperEditComponent } from '../authority-response-to-newspaper-edit/authority-response-to-newspaper-edit.component';
import { AuthorityResponseToNewspaperNewComponent } from '../authority-response-to-newspaper-new/authority-response-to-newspaper-new.component';
import { AuthorityResponseToNewspaperViewComponent } from '../authority-response-to-newspaper-view/authority-response-to-newspaper-view.component';
import { AuthorityResponseToNewspaperService } from '../shared/authority-response-to-newspaper.service';

@Component({
  selector: 'app-authority-response-to-newspaper-list',
  templateUrl: './authority-response-to-newspaper-list.component.html',
  styleUrls: ['./authority-response-to-newspaper-list.component.scss'],
  providers: []
})

export class AuthorityResponseToNewspaperListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private publishingAuthoritiesService: LookupService;
private publishingPlacesService: LookupService;

  
publisherCodeSelectOptions: MaterialSelectOptions;
publicationCodePlaceSelectOptions: MaterialSelectOptions;

  
	@ViewChild('publisherCode', { static: true }) PublisherCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('publicationCodePlace', { static: true }) PublicationCodePlaceSelectComponent: MaterialSelectComponent;

  
  @Input() selectedAuthorityResponseToNewspaper: AuthorityResponseToNewspaper;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'تاريخ النشر', field: 'publicationDate' }),
	new GridColumnOptions({ headerName: 'رقم الصفحة', field: 'pageNumber' }),
	new GridColumnOptions({ headerName: 'عنوان الخبر', field: 'newsTitle' }),
	new GridColumnOptions({ headerName: 'تاريخ رد الهيئة', field: 'authorityrReplyDate' }),
	new GridColumnOptions({ headerName: 'كود جهة النشر', field: 'publisherCode' }),
	new GridColumnOptions({ headerName: 'كود مكان النشر', field: 'publicationCodePlace' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: AuthorityResponseToNewspaperViewComponent,
    editDialogClassType: AuthorityResponseToNewspaperEditComponent,
    newDialogClassType: AuthorityResponseToNewspaperNewComponent,
  });
    constructor(
        injector: Injector,
        public authorityResponseToNewspaperService: AuthorityResponseToNewspaperService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedAuthorityResponseToNewspaper = new AuthorityResponseToNewspaper();

    
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
	newsTitle : [],
	authorityrReplyDate : [],
	publisherCode : [],
	publicationCodePlace : []
    });

     
  }

  getAuthorityResponseToNewspaperPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<AuthorityResponseToNewspaper[]> => {
    return this.authorityResponseToNewspaperService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.authorityResponseToNewspaperService.delete(param.data.id)
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

