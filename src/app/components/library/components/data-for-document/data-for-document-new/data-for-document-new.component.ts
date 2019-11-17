
import { Component, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { DataForDocument } from 'app/shared/models/data-for-document';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { DataForDocumentService } from '../shared/data-for-document.service';


@Component({
  selector: 'app-data-for-document-new',
  templateUrl: './data-for-document-new.component.html',
  styleUrls: ['./data-for-document-new.component.scss'],
  providers: [
    ]
})

export class DataForDocumentNewComponent extends AppBaseComponent implements OnInit {
  dataForDocumentForm: FormGroup;
  @Input() selectedDataForDocument: DataForDocument;
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

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<DataForDocumentNewComponent>,
    public dataForDocumentService: DataForDocumentService)
    {
    super(injector);
    }
    
  ngOnInit() {
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


    this.dataForDocumentForm = this.formBuilder.group({
     
  id : [0],
  bookNumber : [this.selectedDataForDocument.bookNumber, [ Validators.required ]],
  bookTitle : [this.selectedDataForDocument.bookTitle, [ Validators.required ]],
  bookDescription : [this.selectedDataForDocument.bookDescription, [ Validators.required ]],
  addtionDate : [this.selectedDataForDocument.addtionDate, [ Validators.required ]],
  priceDocument : [this.selectedDataForDocument.priceDocument, [ Validators.required ]],
  partNumber : [this.selectedDataForDocument.partNumber, [ Validators.required ]],
  documentPagesNumber : [this.selectedDataForDocument.documentPagesNumber, [ Validators.required ]],
  bookSize : [this.selectedDataForDocument.bookSize, [ Validators.required ]],
  editionStatement : [this.selectedDataForDocument.editionStatement, [ Validators.required ]],
  classificationNumber : [this.selectedDataForDocument.classificationNumber, [ Validators.required ]],
  internationalNumbering : [this.selectedDataForDocument.internationalNumbering, [ Validators.required ]],
  publicationYear : [this.selectedDataForDocument.publicationYear, [ Validators.required ]],
  authorCode : [this.selectedDataForDocument.authorCode, [ Validators.required ]],
  authorName : [this.selectedDataForDocument.authorName, [ Validators.required ]],
  subjectCode : [this.selectedDataForDocument.subjectCode, [ Validators.required ]],
  subjectName : [this.selectedDataForDocument.subjectName, [ Validators.required ]],
  libraryCode : [this.selectedDataForDocument.libraryCode, [ Validators.required ]],
  libraryName : [this.selectedDataForDocument.libraryName, [ Validators.required ]],
  bookState : [this.selectedDataForDocument.bookState, [ Validators.required ]],
  documentType : [this.selectedDataForDocument.documentType, [ Validators.required ]],
  sourceDocument : [this.selectedDataForDocument.sourceDocument, [ Validators.required ]],
  documentStatus : [this.selectedDataForDocument.documentStatus, [ Validators.required ]],
  documentLanguage : [this.selectedDataForDocument.documentLanguage, [ Validators.required ]],
  publisherCode : [this.selectedDataForDocument.publisherCode, [ Validators.required ]],
  publicationPlace : [this.selectedDataForDocument.publicationPlace, [ Validators.required ]],
  insightType : [this.selectedDataForDocument.insightType, [ Validators.required ]],
  insightCode : [this.selectedDataForDocument.insightCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.dataForDocumentService.create(this.dataForDocumentForm.value)
        .pipe(switchMap(x => {
			return this.dataForDocumentService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.dataForDocumentForm.get(name);
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
