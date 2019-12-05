
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { DocumentData } from 'app/shared/models/document-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { DocumentDataService } from '../shared/document-data.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-document-data-view',
  templateUrl: './document-data-view.component.html',
  styleUrls: ['./document-data-view.component.scss'],
  providers: []
})

export class DocumentDataViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedDocumentData: DocumentData;
  documentDataForm: FormGroup;

  private documentCodesService: LookupService;
private documentStatusCodesService: LookupService;

  
documentCodeSelectOptions: MaterialSelectOptions;
documentStatusCodeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedDocumentDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<DocumentDataViewComponent>,
    public documentDataService: DocumentDataService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
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
      
  landID : [this.selectedDocumentData.landID],
  attachment : [this.selectedDocumentData.attachment],
  documentCode : [this.selectedDocumentData.documentCode],
  documentStatusCode : [this.selectedDocumentData.documentStatusCode]
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
    return this.documentDataForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.documentDataForm.controls)) {
      this.documentDataForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.documentCodesService = new LookupService('documentcodes', this.http);
this.documentStatusCodesService = new LookupService('documentstatuscodes	s', this.http);
  }
}

