
import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { GridColumnOptions, GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { FormControlError, GridPaginatedSortedFiltered } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { OperativeSentence } from 'app/shared/models/operative-sentence';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { OperativeSentenceEditComponent } from '../operative-sentence-edit/operative-sentence-edit.component';
import { OperativeSentenceNewComponent } from '../operative-sentence-new/operative-sentence-new.component';
import { OperativeSentenceViewComponent } from '../operative-sentence-view/operative-sentence-view.component';
import { OperativeSentenceService } from '../shared/operative-sentence.service';

@Component({
  selector: 'app-operative-sentence-list',
  templateUrl: './operative-sentence-list.component.html',
  styleUrls: ['./operative-sentence-list.component.scss'],
  providers: []
})

export class OperativeSentenceListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private branchCodesService: LookupService;
private entityTypeService: LookupService;
private entityCodesService: LookupService;
private bodyAttributesService: LookupService;
private judgmentResultsService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;
entityTypeSelectOptions: MaterialSelectOptions;
entityCodeSelectOptions: MaterialSelectOptions;
whoIsSelectOptions: MaterialSelectOptions;
judgmentresultSelectOptions: MaterialSelectOptions;

  
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('entityType', { static: true }) EntityTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('entityCode', { static: true }) EntityCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('whoIs', { static: true }) WhoIsSelectComponent: MaterialSelectComponent;
	@ViewChild('judgmentresult', { static: true }) JudgmentresultSelectComponent: MaterialSelectComponent;

  
  @Input() selectedOperativeSentence: OperativeSentence;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم الملف', field: 'fileNumber' }),
	new GridColumnOptions({ headerName: 'اسم الجهة', field: 'entityName' }),
	new GridColumnOptions({ headerName: 'تاريخ الحكم', field: 'judgmentDate' }),
	new GridColumnOptions({ headerName: 'بيان', field: 'statement' }),
	new GridColumnOptions({ headerName: 'كود الفرع', field: 'branchCode' }),
	new GridColumnOptions({ headerName: 'نوع الجهة', field: 'entityType' }),
	new GridColumnOptions({ headerName: 'كود الجهة', field: 'entityCode' }),
	new GridColumnOptions({ headerName: 'صفة الهيئة', field: 'whoIs' }),
	new GridColumnOptions({ headerName: 'نتيجة الحكم', field: 'judgmentresult' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: OperativeSentenceViewComponent,
    editDialogClassType: OperativeSentenceEditComponent,
    newDialogClassType: OperativeSentenceNewComponent,
  });
    constructor(
        injector: Injector,
        public operativeSentenceService: OperativeSentenceService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedOperativeSentence = new OperativeSentence();

    
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

	this.whoIsSelectOptions = new MaterialSelectOptions({
	 data: this.bodyAttributesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'صفة الهيئة',
	});

	this.judgmentresultSelectOptions = new MaterialSelectOptions({
	 data: this.judgmentResultsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نتيجة الحكم',
	});


    this.searchForm = this.formBuilder.group({
     	fileNumber : [],
	entityName : [],
	judgmentDate : [],
	statement : [],
	branchCode : [],
	entityType : [],
	entityCode : [],
	whoIs : [],
	judgmentresult : []
    });

     
  }

  getOperativeSentencePaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<OperativeSentence[]> => {
    return this.operativeSentenceService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.operativeSentenceService.delete(param.data.id)
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
this.bodyAttributesService = new LookupService('bodyattributes', this.http);
this.judgmentResultsService = new LookupService('judgmentresults', this.http);
  }
}

