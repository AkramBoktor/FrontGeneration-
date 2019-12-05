
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { DataForDocument } from 'app/shared/models/data-for-document';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { DataForDocumentService } from '../shared/data-for-document.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-data-for-document-view',
  templateUrl: './data-for-document-view.component.html',
  styleUrls: ['./data-for-document-view.component.scss'],
  providers: []
})

export class DataForDocumentViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedDataForDocument: DataForDocument;
  dataForDocumentForm: FormGroup;

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

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedDataForDocumentDialog: any,
    @Optional() public dialogRef: MatDialogRef<DataForDocumentViewComponent>,
    public dataForDocumentService: DataForDocumentService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDataForDocument = this.selectedDataForDocumentDialog.data || this.selectedDataForDocument;

    
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
      
  bookNumber : [this.selectedDataForDocument.bookNumber],
  bookTitle : [this.selectedDataForDocument.bookTitle],
  bookDescription : [this.selectedDataForDocument.bookDescription],
  addtionDate : [this.selectedDataForDocument.addtionDate],
  priceDocument : [this.selectedDataForDocument.priceDocument],
  partNumber : [this.selectedDataForDocument.partNumber],
  documentPagesNumber : [this.selectedDataForDocument.documentPagesNumber],
  bookSize : [this.selectedDataForDocument.bookSize],
  editionStatement : [this.selectedDataForDocument.editionStatement],
  classificationNumber : [this.selectedDataForDocument.classificationNumber],
  internationalNumbering : [this.selectedDataForDocument.internationalNumbering],
  publicationYear : [this.selectedDataForDocument.publicationYear],
  authorCode : [this.selectedDataForDocument.authorCode],
  authorName : [this.selectedDataForDocument.authorName],
  subjectCode : [this.selectedDataForDocument.subjectCode],
  subjectName : [this.selectedDataForDocument.subjectName],
  libraryCode : [this.selectedDataForDocument.libraryCode],
  libraryName : [this.selectedDataForDocument.libraryName],
  bookState : [this.selectedDataForDocument.bookState],
  documentType : [this.selectedDataForDocument.documentType],
  sourceDocument : [this.selectedDataForDocument.sourceDocument],
  documentStatus : [this.selectedDataForDocument.documentStatus],
  documentLanguage : [this.selectedDataForDocument.documentLanguage],
  publisherCode : [this.selectedDataForDocument.publisherCode],
  publicationPlace : [this.selectedDataForDocument.publicationPlace],
  insightType : [this.selectedDataForDocument.insightType],
  insightCode : [this.selectedDataForDocument.insightCode]
      });

    this.disableControls();
  }

  onConfirm() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  getErrorMessage = (formCtrl: AbstractControl) => {
    const errorMessages: FormControlError[] = [
          
        ];
    return ValidatorFunctions.getErrorMessage(formCtrl, errorMessages);
   }

  getControls(name: string) {
    return this.dataForDocumentForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.dataForDocumentForm.controls)) {
      this.dataForDocumentForm.controls[control].disable();
    }
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

