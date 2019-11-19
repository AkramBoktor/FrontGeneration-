
import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { GridColumnOptions, GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { FormControlError, GridPaginatedSortedFiltered } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { RespondToVisa } from 'app/shared/models/respond-to-visa';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { RespondToVisaEditComponent } from '../respond-to-visa-edit/respond-to-visa-edit.component';
import { RespondToVisaNewComponent } from '../respond-to-visa-new/respond-to-visa-new.component';
import { RespondToVisaViewComponent } from '../respond-to-visa-view/respond-to-visa-view.component';
import { RespondToVisaService } from '../shared/respond-to-visa.service';

@Component({
  selector: 'app-respond-to-visa-list',
  templateUrl: './respond-to-visa-list.component.html',
  styleUrls: ['./respond-to-visa-list.component.scss'],
  providers: []
})

export class RespondToVisaListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private publishingAuthoritiesService: LookupService;
private publishingPlacesService: LookupService;
private entityTypeService: LookupService;
private replyTypesService: LookupService;
private subDepartmentsService: LookupService;
private applicationsTypesService: LookupService;

  
publisherCodeSelectOptions: MaterialSelectOptions;
publicationCodePlaceSelectOptions: MaterialSelectOptions;
entityTypeCodeSelectOptions: MaterialSelectOptions;
replyCodeSelectOptions: MaterialSelectOptions;
entityReplyCodeSelectOptions: MaterialSelectOptions;
orderTypeCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('publisherCode', { static: true }) PublisherCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('publicationCodePlace', { static: true }) PublicationCodePlaceSelectComponent: MaterialSelectComponent;
	@ViewChild('entityTypeCode', { static: true }) EntityTypeCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('replyCode', { static: true }) ReplyCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('entityReplyCode', { static: true }) EntityReplyCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('orderTypeCode', { static: true }) OrderTypeCodeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedRespondToVisa: RespondToVisa;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'تاريخ النشر', field: 'publicationDate' }),
	new GridColumnOptions({ headerName: 'تاريخ الرد', field: 'replyDate' }),
	new GridColumnOptions({ headerName: 'كود القائم بالرد', field: 'replierCode' }),
	new GridColumnOptions({ headerName: 'هل توجد مرفقات', field: 'hasAttachments' }),
	new GridColumnOptions({ headerName: 'مسلسل', field: 'serial' }),
	new GridColumnOptions({ headerName: 'نص الرد', field: 'replyText' }),
	new GridColumnOptions({ headerName: 'كود جهة النشر', field: 'publisherCode' }),
	new GridColumnOptions({ headerName: 'كود مكان النشر', field: 'publicationCodePlace' }),
	new GridColumnOptions({ headerName: 'كود نوع الجهة', field: 'entityTypeCode' }),
	new GridColumnOptions({ headerName: 'كود الرد', field: 'replyCode' }),
	new GridColumnOptions({ headerName: 'كود الجهة القائمة بالرد', field: 'entityReplyCode' }),
	new GridColumnOptions({ headerName: 'كود نوع الطلب', field: 'orderTypeCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: RespondToVisaViewComponent,
    editDialogClassType: RespondToVisaEditComponent,
    newDialogClassType: RespondToVisaNewComponent,
  });
    constructor(
        injector: Injector,
        public respondToVisaService: RespondToVisaService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedRespondToVisa = new RespondToVisa();

    
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

	this.entityTypeCodeSelectOptions = new MaterialSelectOptions({
	 data: this.entityTypeService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود نوع الجهة',
	});

	this.replyCodeSelectOptions = new MaterialSelectOptions({
	 data: this.replyTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الرد',
	});

	this.entityReplyCodeSelectOptions = new MaterialSelectOptions({
	 data: this.subDepartmentsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الجهة القائمة بالرد',
	});

	this.orderTypeCodeSelectOptions = new MaterialSelectOptions({
	 data: this.applicationsTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود نوع الطلب',
	});


    this.searchForm = this.formBuilder.group({
     	publicationDate : [],
	replyDate : [],
	replierCode : [],
	hasAttachments : [],
	serial : [],
	replyText : [],
	publisherCode : [],
	publicationCodePlace : [],
	entityTypeCode : [],
	replyCode : [],
	entityReplyCode : [],
	orderTypeCode : []
    });

     
  }

  getRespondToVisaPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<RespondToVisa[]> => {
    return this.respondToVisaService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.respondToVisaService.delete(param.data.id)
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
this.entityTypeService = new LookupService('entitytypes', this.http);
this.replyTypesService = new LookupService('replytypes', this.http);
this.subDepartmentsService = new LookupService('subdepartments', this.http);
this.applicationsTypesService = new LookupService('applicationstypes', this.http);
  }
}

