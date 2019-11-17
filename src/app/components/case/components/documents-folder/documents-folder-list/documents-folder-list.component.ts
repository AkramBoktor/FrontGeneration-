
import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { GridColumnOptions, GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { FormControlError, GridPaginatedSortedFiltered } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { DocumentsFolder } from 'app/shared/models/documents-folder';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { DocumentsFolderEditComponent } from '../documents-folder-edit/documents-folder-edit.component';
import { DocumentsFolderNewComponent } from '../documents-folder-new/documents-folder-new.component';
import { DocumentsFolderViewComponent } from '../documents-folder-view/documents-folder-view.component';
import { DocumentsFolderService } from '../shared/documents-folder.service';

@Component({
  selector: 'app-documents-folder-list',
  templateUrl: './documents-folder-list.component.html',
  styleUrls: ['./documents-folder-list.component.scss'],
  providers: []
})

export class DocumentsFolderListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
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

  
  @Input() selectedDocumentsFolder: DocumentsFolder;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود الفرع', field: 'branchCode' }),
	new GridColumnOptions({ headerName: 'رقم الملف', field: 'fileNumber' }),
	new GridColumnOptions({ headerName: 'اسم الجهة', field: 'entityName' }),
	new GridColumnOptions({ headerName: 'رقم الدعوي', field: 'lawsuitNumber' }),
	new GridColumnOptions({ headerName: 'لسنة', field: 'year' }),
	new GridColumnOptions({ headerName: 'بيان المستند', field: 'documentStatement' }),
	new GridColumnOptions({ headerName: 'نوع الجهة', field: 'entityType' }),
	new GridColumnOptions({ headerName: 'كود الجهة', field: 'entityCode' }),
	new GridColumnOptions({ headerName: 'كود المستند', field: 'documentCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: DocumentsFolderViewComponent,
    editDialogClassType: DocumentsFolderEditComponent,
    newDialogClassType: DocumentsFolderNewComponent,
  });
    constructor(
        injector: Injector,
        public documentsFolderService: DocumentsFolderService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedDocumentsFolder = new DocumentsFolder();

    
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


    this.searchForm = this.formBuilder.group({
     	fileNumber : [],
	entityName : [],
	lawsuitNumber : [],
	year : [],
	documentStatement : [],
	branchCode : [],
	entityType : [],
	entityCode : [],
	documentCode : []
    });

     
  }

  getDocumentsFolderPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<DocumentsFolder[]> => {
    return this.documentsFolderService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.documentsFolderService.delete(param.data.id)
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
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.entityTypeService = new LookupService('entitytypes', this.http);
this.entityCodesService = new LookupService('entitycodes', this.http);
this.documentCodesService = new LookupService('documentcodes', this.http);
  }
}

