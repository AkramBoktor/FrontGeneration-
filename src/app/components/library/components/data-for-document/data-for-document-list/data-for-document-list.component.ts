
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { DataForDocument } from 'app/shared/models/data-for-document';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { DataForDocumentEditComponent } from '../data-for-document-edit/data-for-document-edit.component';
import { DataForDocumentNewComponent } from '../data-for-document-new/data-for-document-new.component';
import { DataForDocumentViewComponent } from '../data-for-document-view/data-for-document-view.component';
import { DataForDocumentService } from '../shared/data-for-document.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-data-for-document-list',
  templateUrl: './data-for-document-list.component.html',
  styleUrls: ['./data-for-document-list.component.scss'],
  providers: []
})

export class DataForDocumentListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private bookStatusesService: LookupService;
private documentTypesService: LookupService;
private documentSourcesService: LookupService;
private documentStatusesService: LookupService;
private documentLanguagesService: LookupService;
private publisherCodesService: LookupService;
private publishingPlacesService: LookupService;
private insightTypesService: LookupService;
private insightCodesService: LookupService;

  
bookStateSelectOptions: MaterialSelectOptions;
documentTypeSelectOptions: MaterialSelectOptions;
sourceDocumentSelectOptions: MaterialSelectOptions;
documentStatusSelectOptions: MaterialSelectOptions;
documentLanguageSelectOptions: MaterialSelectOptions;
publisherCodeSelectOptions: MaterialSelectOptions;
publicationPlaceSelectOptions: MaterialSelectOptions;
insightTypeSelectOptions: MaterialSelectOptions;
insightCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('bookState', { static: true }) BookStateSelectComponent: MaterialSelectComponent;
	@ViewChild('documentType', { static: true }) DocumentTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('sourceDocument', { static: true }) SourceDocumentSelectComponent: MaterialSelectComponent;
	@ViewChild('documentStatus', { static: true }) DocumentStatusSelectComponent: MaterialSelectComponent;
	@ViewChild('documentLanguage', { static: true }) DocumentLanguageSelectComponent: MaterialSelectComponent;
	@ViewChild('publisherCode', { static: true }) PublisherCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('publicationPlace', { static: true }) PublicationPlaceSelectComponent: MaterialSelectComponent;
	@ViewChild('insightType', { static: true }) InsightTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('insightCode', { static: true }) InsightCodeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedDataForDocument: DataForDocument;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم الكتاب', field: 'bookNumber' }),
	new GridColumnOptions({ headerName: 'اسم المكتبه', field: 'libraryName' }),
	new GridColumnOptions({ headerName: 'كود المكتبه', field: 'libraryCode' }),
	new GridColumnOptions({ headerName: 'اسم الموضوع', field: 'subjectName' }),
	new GridColumnOptions({ headerName: 'كود الموضوع', field: 'subjectCode' }),
	new GridColumnOptions({ headerName: 'اسم المؤلف', field: 'authorName' }),
	new GridColumnOptions({ headerName: 'كود المؤلف', field: 'authorCode' }),
	new GridColumnOptions({ headerName: 'سنه النشر', field: 'publicationYear' }),
	new GridColumnOptions({ headerName: 'الترقيم الدولى', field: 'internationalNumbering' }),
	new GridColumnOptions({ headerName: 'رقم التصنيف', field: 'classificationNumber' }),
	new GridColumnOptions({ headerName: 'بيان الطابعه', field: 'editionStatement' }),
	new GridColumnOptions({ headerName: 'عدد صفحات الوثيقه', field: 'documentPagesNumber' }),
	new GridColumnOptions({ headerName: 'رقم الجزء', field: 'partNumber' }),
	new GridColumnOptions({ headerName: 'سعر الوثيقه', field: 'priceDocument' }),
	new GridColumnOptions({ headerName: 'تاريخ الاضافه', field: 'addtionDate' }),
	new GridColumnOptions({ headerName: 'وصف الكتاب', field: 'bookDescription' }),
	new GridColumnOptions({ headerName: 'عنوان الكتاب', field: 'bookTitle' }),
	new GridColumnOptions({ headerName: 'حجم الكتاب', field: 'bookSize' }),
	new GridColumnOptions({ headerName: 'مكان النشر', field: 'publicationPlace' }),
	new GridColumnOptions({ headerName: 'كود الناشر', field: 'publisherCode' }),
	new GridColumnOptions({ headerName: 'نوع التبصره', field: 'insightType' }),
	new GridColumnOptions({ headerName: 'لغه الوثيقه', field: 'documentLanguage' }),
	new GridColumnOptions({ headerName: 'حاله الوثيقه', field: 'documentStatus' }),
	new GridColumnOptions({ headerName: 'مصدر الوثيقه', field: 'sourceDocument' }),
	new GridColumnOptions({ headerName: 'نوع الوثيقه', field: 'documentType' }),
	new GridColumnOptions({ headerName: 'حاله الكتاب', field: 'bookState' }),
	new GridColumnOptions({ headerName: 'كود التبصره', field: 'insightCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: DataForDocumentViewComponent,
    editDialogClassType: DataForDocumentEditComponent,
    newDialogClassType: DataForDocumentNewComponent,
  });
    constructor(
        injector: Injector,
        public dataForDocumentService: DataForDocumentService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedDataForDocument = new DataForDocument();

    
	this.bookStateSelectOptions = new MaterialSelectOptions({
	 data: this.bookStatusesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حاله الكتاب',
	});

	this.documentTypeSelectOptions = new MaterialSelectOptions({
	 data: this.documentTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الوثيقه',
	});

	this.sourceDocumentSelectOptions = new MaterialSelectOptions({
	 data: this.documentSourcesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'مصدر الوثيقه',
	});

	this.documentStatusSelectOptions = new MaterialSelectOptions({
	 data: this.documentStatusesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حاله الوثيقه',
	});

	this.documentLanguageSelectOptions = new MaterialSelectOptions({
	 data: this.documentLanguagesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'لغه الوثيقه',
	});

	this.publisherCodeSelectOptions = new MaterialSelectOptions({
	 data: this.publisherCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الناشر',
	});

	this.publicationPlaceSelectOptions = new MaterialSelectOptions({
	 data: this.publishingPlacesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'مكان النشر',
	});

	this.insightTypeSelectOptions = new MaterialSelectOptions({
	 data: this.insightTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع التبصره',
	});

	this.insightCodeSelectOptions = new MaterialSelectOptions({
	 data: this.insightCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود التبصره',
	});


    this.searchForm = this.formBuilder.group({
     	bookNumber : [],
	bookTitle : [],
	bookDescription : [],
	addtionDate : [],
	priceDocument : [],
	partNumber : [],
	documentPagesNumber : [],
	bookSize : [],
	editionStatement : [],
	classificationNumber : [],
	internationalNumbering : [],
	publicationYear : [],
	authorCode : [],
	authorName : [],
	subjectCode : [],
	subjectName : [],
	libraryCode : [],
	libraryName : [],
	bookState : [],
	documentType : [],
	sourceDocument : [],
	documentStatus : [],
	documentLanguage : [],
	publisherCode : [],
	publicationPlace : [],
	insightType : [],
	insightCode : []
    });

     
  }

  getDataForDocumentsPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<DataForDocument[]> => {
    return this.dataForDocumentService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.dataForDocumentService.delete(param.data.id)
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
    this.bookStatusesService = new LookupService('bookstatuses', this.http);
this.documentTypesService = new LookupService('documenttypes', this.http);
this.documentSourcesService = new LookupService('documentsources', this.http);
this.documentStatusesService = new LookupService('documentstatuses', this.http);
this.documentLanguagesService = new LookupService('documentlanguages', this.http);
this.publisherCodesService = new LookupService('publishercodes', this.http);
this.publishingPlacesService = new LookupService('publishingplaces', this.http);
this.insightTypesService = new LookupService('insighttypes', this.http);
this.insightCodesService = new LookupService('insightcodes', this.http);
  }
}

