
import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { ChairmanVisa } from 'app/shared/models/chairman-visa';
import { GridColumnOptions, GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { FormControlError, GridPaginatedSortedFiltered } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ChairmanVisaEditComponent } from '../chairman-visa-edit/chairman-visa-edit.component';
import { ChairmanVisaNewComponent } from '../chairman-visa-new/chairman-visa-new.component';
import { ChairmanVisaViewComponent } from '../chairman-visa-view/chairman-visa-view.component';
import { ChairmanVisaService } from '../shared/chairman-visa.service';

@Component({
  selector: 'app-chairman-visa-list',
  templateUrl: './chairman-visa-list.component.html',
  styleUrls: ['./chairman-visa-list.component.scss'],
  providers: []
})

export class ChairmanVisaListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private publishingAuthoritiesService: LookupService;
private publishingPlacesService: LookupService;
private entityTypeService: LookupService;
private subDepartmentsService: LookupService;
private displayTypesService: LookupService;
private centralDepartmentsService: LookupService;
private displayResultsService: LookupService;

  
publisherCodeSelectOptions: MaterialSelectOptions;
publicationCodePlaceSelectOptions: MaterialSelectOptions;
entityTypeCodeSelectOptions: MaterialSelectOptions;
specificEntityCodeSelectOptions: MaterialSelectOptions;
displaySelectOptions: MaterialSelectOptions;
aMCodeSelectOptions: MaterialSelectOptions;
aFCodeSelectOptions: MaterialSelectOptions;
showResultSelectOptions: MaterialSelectOptions;

  
	@ViewChild('publisherCode', { static: true }) PublisherCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('publicationCodePlace', { static: true }) PublicationCodePlaceSelectComponent: MaterialSelectComponent;
	@ViewChild('entityTypeCode', { static: true }) EntityTypeCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('specificEntityCode', { static: true }) SpecificEntityCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('display', { static: true }) DisplaySelectComponent: MaterialSelectComponent;
	@ViewChild('aMCode', { static: true }) AMCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('aFCode', { static: true }) AFCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('showResult', { static: true }) ShowResultSelectComponent: MaterialSelectComponent;

  
  @Input() selectedChairmanVisa: ChairmanVisa;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم الصفحة', field: 'pageNumber' }),
	new GridColumnOptions({ headerName: 'تاريخ النشر', field: 'publicationDate' }),
	new GridColumnOptions({ headerName: 'تاريخ التاشيرة', field: 'visaDate' }),
	new GridColumnOptions({ headerName: 'مسلسل', field: 'serial' }),
	new GridColumnOptions({ headerName: 'نص التاشيرة', field: 'visaText' }),
	new GridColumnOptions({ headerName: 'كود جهة النشر', field: 'publisherCode' }),
	new GridColumnOptions({ headerName: 'كود مكان النشر', field: 'publicationCodePlace' }),
	new GridColumnOptions({ headerName: 'كود نوع الجهة', field: 'entityTypeCode' }),
	new GridColumnOptions({ headerName: 'كود الجهة المعنية', field: 'specificEntityCode' }),
	new GridColumnOptions({ headerName: 'العرض', field: 'display' }),
	new GridColumnOptions({ headerName: 'كود أ.م المؤشر لها', field: 'aMCode' }),
	new GridColumnOptions({ headerName: 'كود أ.ف المؤشر لها', field: 'aFCode' }),
	new GridColumnOptions({ headerName: 'نتيجة العرض', field: 'showResult' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: ChairmanVisaViewComponent,
    editDialogClassType: ChairmanVisaEditComponent,
    newDialogClassType: ChairmanVisaNewComponent,
  });
    constructor(
        injector: Injector,
        public chairmanVisaService: ChairmanVisaService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedChairmanVisa = new ChairmanVisa();

    
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

	this.specificEntityCodeSelectOptions = new MaterialSelectOptions({
	 data: this.subDepartmentsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الجهة المعنية',
	});

	this.displaySelectOptions = new MaterialSelectOptions({
	 data: this.displayTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'العرض',
	});

	this.aMCodeSelectOptions = new MaterialSelectOptions({
	 data: this.centralDepartmentsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود أ.م المؤشر لها',
	});

	this.aFCodeSelectOptions = new MaterialSelectOptions({
	 data: this.subDepartmentsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود أ.ف المؤشر لها',
	});

	this.showResultSelectOptions = new MaterialSelectOptions({
	 data: this.displayResultsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نتيجة العرض',
	});


    this.searchForm = this.formBuilder.group({
     	pageNumber : [],
	publicationDate : [],
	presentationDate : [],
	visaDate : [],
	serial : [],
	visaText : [],
	publisherCode : [],
	publicationCodePlace : [],
	entityTypeCode : [],
	specificEntityCode : [],
	display : [],
	aMCode : [],
	aFCode : [],
	showResult : []
    });

     
  }

  getChairmanVisaPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<ChairmanVisa[]> => {
    return this.chairmanVisaService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.chairmanVisaService.delete(param.data.id)
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
this.subDepartmentsService = new LookupService('subdepartments', this.http);
this.displayTypesService = new LookupService('displaytypes', this.http);
this.centralDepartmentsService = new LookupService('centraldepartments', this.http);
this.subDepartmentsService = new LookupService('subdepartments', this.http);
this.displayResultsService = new LookupService('displayresults', this.http);
  }
}

