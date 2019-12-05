
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { DocumentData } from 'app/shared/models/document-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { DocumentDataService } from '../shared/document-data.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-document-data-new',
  templateUrl: './document-data-new.component.html',
  styleUrls: ['./document-data-new.component.scss'],
  providers: [
    ]
})

export class DocumentDataNewComponent extends AppBaseComponent implements OnInit {
  documentDataForm: FormGroup;
  @Input() selectedDocumentData: DocumentData;
  errorMessages: FormControlError[] = [
        
  ];

  private documentCodesService: LookupService;
private documentStatusCodesService: LookupService;

  
documentCodeSelectOptions: MaterialSelectOptions;
documentStatusCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('documentCode', { static: true }) DocumentCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('documentStatusCode', { static: true }) DocumentStatusCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<DocumentDataNewComponent>,
    public documentDataService: DocumentDataService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDocumentData = new DocumentData();

    
	this.documentCodeSelectOptions = new MaterialSelectOptions({
	 data: this.documentCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المستند',
	});

	this.documentStatusCodeSelectOptions = new MaterialSelectOptions({
	 data: this.documentStatusCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود حالة المستند',
	});


    this.documentDataForm = this.formBuilder.group({
     
  id : [0],
  landID : [this.selectedDocumentData.landID, [ Validators.required ]],
  attachment : [this.selectedDocumentData.attachment, [ ]],
  documentCode : [this.selectedDocumentData.documentCode, [ Validators.required ]],
  documentStatusCode : [this.selectedDocumentData.documentStatusCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.documentDataService.create(this.documentDataForm.value)
        .pipe(switchMap(x => {
			return this.documentDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.documentDataForm.get(name);
    }

  initializeLookupServices() {
    this.documentCodesService = new LookupService('documentcodes', this.http);
this.documentStatusCodesService = new LookupService('documentstatuscodes	s', this.http);
  }
 }
