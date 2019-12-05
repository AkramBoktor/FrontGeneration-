
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { DocumentData } from 'app/shared/models/document-data';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { DocumentDataEditComponent } from '../document-data-edit/document-data-edit.component';
import { DocumentDataNewComponent } from '../document-data-new/document-data-new.component';
import { DocumentDataViewComponent } from '../document-data-view/document-data-view.component';
import { DocumentDataService } from '../shared/document-data.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-document-data-list',
  templateUrl: './document-data-list.component.html',
  styleUrls: ['./document-data-list.component.scss'],
  providers: []
})

export class DocumentDataListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private documentCodesService: LookupService;
private documentStatusCodesService: LookupService;

  
documentCodeSelectOptions: MaterialSelectOptions;
documentStatusCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('documentCode', { static: true }) DocumentCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('documentStatusCode', { static: true }) DocumentStatusCodeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedDocumentData: DocumentData;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود قطعة الارض', field: 'landID' }),
	new GridColumnOptions({ headerName: 'المرفقات', field: 'attachment' }),
	new GridColumnOptions({ headerName: 'كود المستند', field: 'documentCode' }),
	new GridColumnOptions({ headerName: 'كود حالة المستند', field: 'documentStatusCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: DocumentDataViewComponent,
    editDialogClassType: DocumentDataEditComponent,
    newDialogClassType: DocumentDataNewComponent,
  });
    constructor(
        injector: Injector,
        public documentDataService: DocumentDataService) { 
        super(injector);
    }

  ngOnInit(): void {
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


    this.searchForm = this.formBuilder.group({
     	landID : [],
	attachment : [],
	documentCode : [],
	documentStatusCode : []
    });

     
  }

  getDocumentDataPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<DocumentData[]> => {
    return this.documentDataService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.documentDataService.delete(param.data.id)
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
    this.documentCodesService = new LookupService('documentcodes', this.http);
this.documentStatusCodesService = new LookupService('documentstatuscodes	s', this.http);
  }
}

