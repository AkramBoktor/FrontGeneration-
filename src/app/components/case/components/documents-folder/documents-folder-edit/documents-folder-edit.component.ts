
import { Component, Inject, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { DocumentsFolder } from 'app/shared/models/documents-folder';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { DocumentsFolderService } from '../shared/documents-folder.service';




@Component({
  selector: 'app-documents-folder-edit',
  templateUrl: './documents-folder-edit.component.html',
  styleUrls: ['./documents-folder-edit.component.scss'],
  providers: []
})

export class DocumentsFolderEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedDocumentsFolder: DocumentsFolder;
  documentsFolderForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private branchCodesService: LookupService;
private entityTypeService: LookupService;
private entityCodesService: LookupService;
private documentCodesService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;
entityTypeSelectOptions: MaterialSelectOptions;
entityCodeSelectOptions: MaterialSelectOptions;
documentCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('entityType', { static: true }) EntityTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('entityCode', { static: true }) EntityCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('documentCode', { static: true }) DocumentCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedDocumentsFolderDialog: any,
    @Optional() public dialogRef: MatDialogRef<DocumentsFolderEditComponent>,
    public documentsFolderService: DocumentsFolderService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDocumentsFolder = new DocumentsFolder();
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
      
  id : [this.selectedDocumentsFolder.id],
  fileNumber : [this.selectedDocumentsFolder.fileNumber, [ ]],
  entityName : [this.selectedDocumentsFolder.entityName, [ ]],
  lawsuitNumber : [this.selectedDocumentsFolder.lawsuitNumber, [ ]],
  year : [this.selectedDocumentsFolder.year, [ ]],
  documentStatement : [this.selectedDocumentsFolder.documentStatement, [ ]],
  branchCode : [this.selectedDocumentsFolder.branchCode, [ ]],
  entityType : [this.selectedDocumentsFolder.entityType, [ ]],
  entityCode : [this.selectedDocumentsFolder.entityCode, [ ]],
  documentCode : [this.selectedDocumentsFolder.documentCode, [ ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.documentsFolderService.update(this.documentsFolderForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.documentsFolderService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.documentsFolderForm.get(name);
  }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.entityTypeService = new LookupService('entitytypes', this.http);
this.entityCodesService = new LookupService('entitycodes', this.http);
this.documentCodesService = new LookupService('documentcodes', this.http);
  }
}
