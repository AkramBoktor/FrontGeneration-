
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { DocumentsFolder } from 'app/shared/models/documents-folder';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { DocumentsFolderService } from '../shared/documents-folder.service';

@Component({
  selector: 'app-documents-folder-view',
  templateUrl: './documents-folder-view.component.html',
  styleUrls: ['./documents-folder-view.component.scss'],
  providers: []
})

export class DocumentsFolderViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedDocumentsFolder: DocumentsFolder;
  documentsFolderForm: FormGroup;

  private branchCodesService: LookupService;
private entityTypeService: LookupService;
private entityCodesService: LookupService;
private documentCodesService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;
entityTypeSelectOptions: MaterialSelectOptions;
entityCodeSelectOptions: MaterialSelectOptions;
documentCodeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedDocumentsFolderDialog: any,
    @Optional() public dialogRef: MatDialogRef<DocumentsFolderViewComponent>,
    public documentsFolderService: DocumentsFolderService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDocumentsFolder = this.selectedDocumentsFolderDialog.data || this.selectedDocumentsFolder;

    
	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الفرع',
	});

	this.entityTypeSelectOptions = new MaterialSelectOptions({
	 data: this.entityTypeService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الجهة',
	});

	this.entityCodeSelectOptions = new MaterialSelectOptions({
	 data: this.entityCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الجهة',
	});

	this.documentCodeSelectOptions = new MaterialSelectOptions({
	 data: this.documentCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المستند',
	});


    this.documentsFolderForm = this.formBuilder.group({
      
  fileNumber : [this.selectedDocumentsFolder.fileNumber],
  entityName : [this.selectedDocumentsFolder.entityName],
  lawsuitNumber : [this.selectedDocumentsFolder.lawsuitNumber],
  year : [this.selectedDocumentsFolder.year],
  documentStatement : [this.selectedDocumentsFolder.documentStatement],
  branchCode : [this.selectedDocumentsFolder.branchCode],
  entityType : [this.selectedDocumentsFolder.entityType],
  entityCode : [this.selectedDocumentsFolder.entityCode],
  documentCode : [this.selectedDocumentsFolder.documentCode]
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
    return this.documentsFolderForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.documentsFolderForm.controls)) {
      this.documentsFolderForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.entityTypeService = new LookupService('entitytypes', this.http);
this.entityCodesService = new LookupService('entitycodes', this.http);
this.documentCodesService = new LookupService('documentcodes', this.http);
  }
}

