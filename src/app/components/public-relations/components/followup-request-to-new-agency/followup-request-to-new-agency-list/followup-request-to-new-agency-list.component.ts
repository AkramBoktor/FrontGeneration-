
import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { GridColumnOptions, GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { FormControlError, GridPaginatedSortedFiltered } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { FollowupRequestToNewAgency } from 'app/shared/models/followup-request-to-new-agency';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { FollowupRequestToNewAgencyEditComponent } from '../followup-request-to-new-agency-edit/followup-request-to-new-agency-edit.component';
import { FollowupRequestToNewAgencyNewComponent } from '../followup-request-to-new-agency-new/followup-request-to-new-agency-new.component';
import { FollowupRequestToNewAgencyViewComponent } from '../followup-request-to-new-agency-view/followup-request-to-new-agency-view.component';
import { FollowupRequestToNewAgencyService } from '../shared/followup-request-to-new-agency.service';

@Component({
  selector: 'app-followup-request-to-new-agency-list',
  templateUrl: './followup-request-to-new-agency-list.component.html',
  styleUrls: ['./followup-request-to-new-agency-list.component.scss'],
  providers: []
})

export class FollowupRequestToNewAgencyListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private publishingAuthoritiesService: LookupService;
private publishingPlacesService: LookupService;
private subDepartmentsService: LookupService;
private applicationsTypesService: LookupService;

  
publisherCodeSelectOptions: MaterialSelectOptions;
publicationCodePlaceSelectOptions: MaterialSelectOptions;
specificEntityCodeSelectOptions: MaterialSelectOptions;
requestTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('publisherCode', { static: true }) PublisherCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('publicationCodePlace', { static: true }) PublicationCodePlaceSelectComponent: MaterialSelectComponent;
	@ViewChild('specificEntityCode', { static: true }) SpecificEntityCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('requestType', { static: true }) RequestTypeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedFollowupRequestToNewAgency: FollowupRequestToNewAgency;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'تاريخ النشر', field: 'publicationDate' }),
	new GridColumnOptions({ headerName: 'رقم الصفحة', field: 'pageNumber' }),
	new GridColumnOptions({ headerName: 'تاريخ العرض', field: 'presentationDate' }),
	new GridColumnOptions({ headerName: 'تاريخ التاشيرة', field: 'visaDate' }),
	new GridColumnOptions({ headerName: 'رقم متابع الخبر', field: 'newsFollowersNo' }),
	new GridColumnOptions({ headerName: 'كود جهة النشر', field: 'publisherCode' }),
	new GridColumnOptions({ headerName: 'كود مكان النشر', field: 'publicationCodePlace' }),
	new GridColumnOptions({ headerName: 'كود الجهة المعنية', field: 'specificEntityCode' }),
	new GridColumnOptions({ headerName: 'نوع الطلب', field: 'requestType' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: FollowupRequestToNewAgencyViewComponent,
    editDialogClassType: FollowupRequestToNewAgencyEditComponent,
    newDialogClassType: FollowupRequestToNewAgencyNewComponent,
  });
    constructor(
        injector: Injector,
        public followupRequestToNewAgencyService: FollowupRequestToNewAgencyService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedFollowupRequestToNewAgency = new FollowupRequestToNewAgency();

    
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

	this.specificEntityCodeSelectOptions = new MaterialSelectOptions({
	 data: this.subDepartmentsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الجهة المعنية',
	});

	this.requestTypeSelectOptions = new MaterialSelectOptions({
	 data: this.applicationsTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطلب',
	});


    this.searchForm = this.formBuilder.group({
     	publicationDate : [],
	pageNumber : [],
	presentationDate : [],
	visaDate : [],
	newsFollowersNo : [],
	publisherCode : [],
	publicationCodePlace : [],
	specificEntityCode : [],
	requestType : []
    });

     
  }

  getFollowupRequestToNewAgencyPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<FollowupRequestToNewAgency[]> => {
    return this.followupRequestToNewAgencyService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.followupRequestToNewAgencyService.delete(param.data.id)
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
this.subDepartmentsService = new LookupService('subdepartments', this.http);
this.applicationsTypesService = new LookupService('applicationstypes', this.http);
  }
}

