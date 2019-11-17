
import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { GridColumnOptions, GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { FormControlError, GridPaginatedSortedFiltered } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { LawsuitData } from 'app/shared/models/lawsuit-data';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { LawsuitDataEditComponent } from '../lawsuit-data-edit/lawsuit-data-edit.component';
import { LawsuitDataNewComponent } from '../lawsuit-data-new/lawsuit-data-new.component';
import { LawsuitDataViewComponent } from '../lawsuit-data-view/lawsuit-data-view.component';
import { LawsuitDataService } from '../shared/lawsuit-data.service';

@Component({
  selector: 'app-lawsuit-data-list',
  templateUrl: './lawsuit-data-list.component.html',
  styleUrls: ['./lawsuit-data-list.component.scss'],
  providers: []
})

export class LawsuitDataListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private branchCodesService: LookupService;
private litigationDegreesService: LookupService;
private circuitCodesService: LookupService;
private courtCodesService: LookupService;
private issueCodeIssuesService: LookupService;
private advocacyPositionsService: LookupService;
private bodyAttributesService: LookupService;
private entityCodesService: LookupService;
private entityTypeService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;
litigationDegreeSelectOptions: MaterialSelectOptions;
chamberTypeSelectOptions: MaterialSelectOptions;
courtCodeSelectOptions: MaterialSelectOptions;
issueCodeSelectOptions: MaterialSelectOptions;
lawsuitPositionSelectOptions: MaterialSelectOptions;
whoIsSelectOptions: MaterialSelectOptions;
entityCodeSelectOptions: MaterialSelectOptions;
entityTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('litigationDegree', { static: true }) LitigationDegreeSelectComponent: MaterialSelectComponent;
	@ViewChild('chamberType', { static: true }) ChamberTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('courtCode', { static: true }) CourtCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('issueCode', { static: true }) IssueCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('lawsuitPosition', { static: true }) LawsuitPositionSelectComponent: MaterialSelectComponent;
	@ViewChild('whoIs', { static: true }) WhoIsSelectComponent: MaterialSelectComponent;
	@ViewChild('entityCode', { static: true }) EntityCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('entityType', { static: true }) EntityTypeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedLawsuitData: LawsuitData;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'تاريخ استلام المحامي', field: 'lawyerReceiptDate' }),
	new GridColumnOptions({ headerName: 'كود المحامي', field: 'employeeCode' }),
	new GridColumnOptions({ headerName: 'تاريخ الوارد', field: 'incomingDate' }),
	new GridColumnOptions({ headerName: 'لسنة', field: 'year' }),
	new GridColumnOptions({ headerName: 'اسم الجهة', field: 'entityName' }),
	new GridColumnOptions({ headerName: 'رقم الملف', field: 'fileNumber' }),
	new GridColumnOptions({ headerName: 'رقم الدعوي', field: 'lawsuitNumber' }),
	new GridColumnOptions({ headerName: 'تارخ اول جلسة', field: 'firstSessionDate' }),
	new GridColumnOptions({ headerName: 'كود الفرع', field: 'branchCode' }),
	new GridColumnOptions({ headerName: 'درجة التقاضي', field: 'litigationDegree' }),
	new GridColumnOptions({ headerName: 'نوع الدائره', field: 'chamberType' }),
	new GridColumnOptions({ headerName: 'كود المحكمة', field: 'courtCode' }),
	new GridColumnOptions({ headerName: 'كود موضوع القضية', field: 'issueCode' }),
	new GridColumnOptions({ headerName: 'موقف الدعوي', field: 'lawsuitPosition' }),
	new GridColumnOptions({ headerName: 'صفة الهيئة', field: 'whoIs' }),
	new GridColumnOptions({ headerName: 'كود الجهة', field: 'entityCode' }),
	new GridColumnOptions({ headerName: 'نوع الجهة', field: 'entityType' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: LawsuitDataViewComponent,
    editDialogClassType: LawsuitDataEditComponent,
    newDialogClassType: LawsuitDataNewComponent,
  });
    constructor(
        injector: Injector,
        public lawsuitDataService: LawsuitDataService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedLawsuitData = new LawsuitData();

    
	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الفرع',
	});

	this.litigationDegreeSelectOptions = new MaterialSelectOptions({
	 data: this.litigationDegreesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'درجة التقاضي',
	});

	this.chamberTypeSelectOptions = new MaterialSelectOptions({
	 data: this.circuitCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الدائره',
	});

	this.courtCodeSelectOptions = new MaterialSelectOptions({
	 data: this.courtCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المحكمة',
	});

	this.issueCodeSelectOptions = new MaterialSelectOptions({
	 data: this.issueCodeIssuesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود موضوع القضية',
	});

	this.lawsuitPositionSelectOptions = new MaterialSelectOptions({
	 data: this.advocacyPositionsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'موقف الدعوي',
	});

	this.whoIsSelectOptions = new MaterialSelectOptions({
	 data: this.bodyAttributesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'صفة الهيئة',
	});

	this.entityCodeSelectOptions = new MaterialSelectOptions({
	 data: this.entityCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الجهة',
	});

	this.entityTypeSelectOptions = new MaterialSelectOptions({
	 data: this.entityTypeService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الجهة',
	});


    this.searchForm = this.formBuilder.group({
     	lawyerReceiptDate : [],
	employeeCode : [],
	incomingDate : [],
	year : [],
	entityName : [],
	fileNumber : [],
	lawsuitNumber : [],
	firstSessionDate : [],
	branchCode : [],
	litigationDegree : [],
	chamberType : [],
	courtCode : [],
	issueCode : [],
	lawsuitPosition : [],
	whoIs : [],
	entityCode : [],
	entityType : []
    });

     
  }

  getLawsuitDataPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<LawsuitData[]> => {
    return this.lawsuitDataService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.lawsuitDataService.delete(param.data.id)
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
this.litigationDegreesService = new LookupService('litigationdegrees', this.http);
this.circuitCodesService = new LookupService('circuitcodes', this.http);
this.courtCodesService = new LookupService('courtcodes', this.http);
this.issueCodeIssuesService = new LookupService('issuecodeissues', this.http);
this.advocacyPositionsService = new LookupService('advocacypositions', this.http);
this.bodyAttributesService = new LookupService('bodyattributes', this.http);
this.entityCodesService = new LookupService('entitycodes', this.http);
this.entityTypeService = new LookupService('entitytypes', this.http);
  }
}

