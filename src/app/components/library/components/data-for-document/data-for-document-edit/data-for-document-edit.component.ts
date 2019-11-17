
import { Component, Inject, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { DataForDocument } from 'app/shared/models/data-for-document';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { DataForDocumentService } from '../shared/data-for-document.service';




@Component({
  selector: 'app-data-for-document-edit',
  templateUrl: './data-for-document-edit.component.html',
  styleUrls: ['./data-for-document-edit.component.scss'],
  providers: []
})

export class DataForDocumentEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedDataForDocument: DataForDocument;
  dataForDocumentForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private publishingPlacesService: LookupService;
private publisherCodesService: LookupService;
private insightTypesService: LookupService;
private documentLanguagesService: LookupService;
private documentStatusesService: LookupService;
private documentSourcesService: LookupService;
private documentTypesService: LookupService;
private bookStatusesService: LookupService;
private insightCodesService: LookupService;

  
publicationPlaceSelectOptions: MaterialSelectOptions;
publisherCodeSelectOptions: MaterialSelectOptions;
insightTypeSelectOptions: MaterialSelectOptions;
documentLanguageSelectOptions: MaterialSelectOptions;
documentStatusSelectOptions: MaterialSelectOptions;
sourceDocumentSelectOptions: MaterialSelectOptions;
documentTypeSelectOptions: MaterialSelectOptions;
bookStateSelectOptions: MaterialSelectOptions;
insightCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('publicationPlace', { static: true }) PublicationPlaceSelectComponent: MaterialSelectComponent;
	@ViewChild('publisherCode', { static: true }) PublisherCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('insightType', { static: true }) InsightTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('documentLanguage', { static: true }) DocumentLanguageSelectComponent: MaterialSelectComponent;
	@ViewChild('documentStatus', { static: true }) DocumentStatusSelectComponent: MaterialSelectComponent;
	@ViewChild('sourceDocument', { static: true }) SourceDocumentSelectComponent: MaterialSelectComponent;
	@ViewChild('documentType', { static: true }) DocumentTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('bookState', { static: true }) BookStateSelectComponent: MaterialSelectComponent;
	@ViewChild('insightCode', { static: true }) InsightCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedDataForDocumentDialog: any,
    @Optional() public dialogRef: MatDialogRef<DataForDocumentEditComponent>,
    public dataForDocumentService: DataForDocumentService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDataForDocument = new DataForDocument();
    this.selectedDataForDocument = this.selectedDataForDocumentDialog.data || this.selectedDataForDocument;

    
	this.publicationPlaceSelectOptions = new MaterialSelectOptions({
	 data: this.publishingPlacesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'مكان النشر',
	});

	this.publisherCodeSelectOptions = new MaterialSelectOptions({
	 data: this.publisherCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الناشر',
	});

	this.insightTypeSelectOptions = new MaterialSelectOptions({
	 data: this.insightTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع التبصره',
	});

	this.documentLanguageSelectOptions = new MaterialSelectOptions({
	 data: this.documentLanguagesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'لغه الوثيقه',
	});

	this.documentStatusSelectOptions = new MaterialSelectOptions({
	 data: this.documentStatusesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حاله الوثيقه',
	});

	this.sourceDocumentSelectOptions = new MaterialSelectOptions({
	 data: this.documentSourcesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'مصدر الوثيقه',
	});

	this.documentTypeSelectOptions = new MaterialSelectOptions({
	 data: this.documentTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الوثيقه',
	});

	this.bookStateSelectOptions = new MaterialSelectOptions({
	 data: this.bookStatusesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حاله الكتاب',
	});

	this.insightCodeSelectOptions = new MaterialSelectOptions({
	 data: this.insightCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود التبصره',
	});


    this.dataForDocumentForm = this.formBuilder.group({
      
  id : [this.selectedDataForDocument.id],
  bookNumber : [this.selectedDataForDocument.bookNumber, [ Validators.required ]],
  libraryName : [this.selectedDataForDocument.libraryName, [ Validators.required ]],
  libraryCode : [this.selectedDataForDocument.libraryCode, [ Validators.required ]],
  subjectName : [this.selectedDataForDocument.subjectName, [ Validators.required ]],
  subjectCode : [this.selectedDataForDocument.subjectCode, [ Validators.required ]],
  authorName : [this.selectedDataForDocument.authorName, [ Validators.required ]],
  authorCode : [this.selectedDataForDocument.authorCode, [ Validators.required ]],
  publicationYear : [this.selectedDataForDocument.publicationYear, [ Validators.required ]],
  internationalNumbering : [this.selectedDataForDocument.internationalNumbering, [ Validators.required ]],
  classificationNumber : [this.selectedDataForDocument.classificationNumber, [ Validators.required ]],
  editionStatement : [this.selectedDataForDocument.editionStatement, [ Validators.required ]],
  documentPagesNumber : [this.selectedDataForDocument.documentPagesNumber, [ Validators.required ]],
  partNumber : [this.selectedDataForDocument.partNumber, [ Validators.required ]],
  priceDocument : [this.selectedDataForDocument.priceDocument, [ Validators.required ]],
  addtionDate : [this.selectedDataForDocument.addtionDate, [ Validators.required ]],
  bookDescription : [this.selectedDataForDocument.bookDescription, [ Validators.required ]],
  bookTitle : [this.selectedDataForDocument.bookTitle, [ Validators.required ]],
  bookSize : [this.selectedDataForDocument.bookSize, [ Validators.required ]],
  publicationPlace : [this.selectedDataForDocument.publicationPlace, [ Validators.required ]],
  publisherCode : [this.selectedDataForDocument.publisherCode, [ Validators.required ]],
  insightType : [this.selectedDataForDocument.insightType, [ Validators.required ]],
  documentLanguage : [this.selectedDataForDocument.documentLanguage, [ Validators.required ]],
  documentStatus : [this.selectedDataForDocument.documentStatus, [ Validators.required ]],
  sourceDocument : [this.selectedDataForDocument.sourceDocument, [ Validators.required ]],
  documentType : [this.selectedDataForDocument.documentType, [ Validators.required ]],
  bookState : [this.selectedDataForDocument.bookState, [ Validators.required ]],
  insightCode : [this.selectedDataForDocument.insightCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.dataForDocumentService.update(this.dataForDocumentForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.dataForDocumentService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
	    }))
    .subscribe(
      (result) => {
          if (this.dialogRef)
          {
              this.dialogRef.close(true);
          }
    });
  }

  getControls(name: string) {
    return this.dataForDocumentForm.get(name);
  }

  initializeLookupServices() {
    this.publishingPlacesService = new LookupService('publishingplaces', this.http);
this.publisherCodesService = new LookupService('publishercodes', this.http);
this.insightTypesService = new LookupService('insighttypes', this.http);
this.documentLanguagesService = new LookupService('documentlanguages', this.http);
this.documentStatusesService = new LookupService('documentstatuses', this.http);
this.documentSourcesService = new LookupService('documentsources', this.http);
this.documentTypesService = new LookupService('documenttypes', this.http);
this.bookStatusesService = new LookupService('bookstatuses', this.http);
this.insightCodesService = new LookupService('insightcodes', this.http);
  }
}
