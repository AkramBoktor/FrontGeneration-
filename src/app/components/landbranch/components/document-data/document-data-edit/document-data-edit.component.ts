
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { DocumentData } from 'app/shared/models/document-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { DocumentDataService } from '../shared/document-data.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-document-data-edit',
  templateUrl: './document-data-edit.component.html',
  styleUrls: ['./document-data-edit.component.scss'],
  providers: []
})

export class DocumentDataEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedDocumentData: DocumentData;
  documentDataForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private documentCodesService: LookupService;
private documentStatusCodesService: LookupService;

  
documentCodeSelectOptions: MaterialSelectOptions;
documentStatusCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('documentCode', { static: true }) DocumentCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('documentStatusCode', { static: true }) DocumentStatusCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedDocumentDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<DocumentDataEditComponent>,
    public documentDataService: DocumentDataService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDocumentData = new DocumentData();
    this.selectedDocumentData = this.selectedDocumentDataDialog.data || this.selectedDocumentData;

    
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
      
  id : [this.selectedDocumentData.id],
  landID : [this.selectedDocumentData.landID, [ Validators.required ]],
  attachment : [this.selectedDocumentData.attachment, [ ]],
  documentCode : [this.selectedDocumentData.documentCode, [ Validators.required ]],
  documentStatusCode : [this.selectedDocumentData.documentStatusCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.documentDataService.update(this.documentDataForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.documentDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.documentDataForm.get(name);
  }

  initializeLookupServices() {
    this.documentCodesService = new LookupService('documentcodes', this.http);
this.documentStatusCodesService = new LookupService('documentstatuscodes	s', this.http);
  }
}
