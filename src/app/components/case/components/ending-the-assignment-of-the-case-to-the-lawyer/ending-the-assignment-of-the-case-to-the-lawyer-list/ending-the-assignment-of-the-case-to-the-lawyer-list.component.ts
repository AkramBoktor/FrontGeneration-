
import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { GridColumnOptions, GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { FormControlError, GridPaginatedSortedFiltered } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { EndingTheAssignmentOfTheCaseToTheLawyer } from 'app/shared/models/ending-the-assignment-of-the-case-to-the-lawyer';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { EndingTheAssignmentOfTheCaseToTheLawyerEditComponent } from '../ending-the-assignment-of-the-case-to-the-lawyer-edit/ending-the-assignment-of-the-case-to-the-lawyer-edit.component';
import { EndingTheAssignmentOfTheCaseToTheLawyerNewComponent } from '../ending-the-assignment-of-the-case-to-the-lawyer-new/ending-the-assignment-of-the-case-to-the-lawyer-new.component';
import { EndingTheAssignmentOfTheCaseToTheLawyerViewComponent } from '../ending-the-assignment-of-the-case-to-the-lawyer-view/ending-the-assignment-of-the-case-to-the-lawyer-view.component';
import { EndingTheAssignmentOfTheCaseToTheLawyerService } from '../shared/ending-the-assignment-of-the-case-to-the-lawyer.service';

@Component({
  selector: 'app-ending-the-assignment-of-the-case-to-the-lawyer-list',
  templateUrl: './ending-the-assignment-of-the-case-to-the-lawyer-list.component.html',
  styleUrls: ['./ending-the-assignment-of-the-case-to-the-lawyer-list.component.scss'],
  providers: []
})

export class EndingTheAssignmentOfTheCaseToTheLawyerListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private branchCodesService: LookupService;
private entityTypeService: LookupService;
private entityCodesService: LookupService;
private issueCodeIssuesService: LookupService;
private terminationOfAttorneyAttorneyReasonsService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;
entityTypeSelectOptions: MaterialSelectOptions;
entityCodeSelectOptions: MaterialSelectOptions;
issueCodeSelectOptions: MaterialSelectOptions;
caseReasonSelectOptions: MaterialSelectOptions;

  
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('entityType', { static: true }) EntityTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('entityCode', { static: true }) EntityCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('issueCode', { static: true }) IssueCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('caseReason', { static: true }) CaseReasonSelectComponent: MaterialSelectComponent;

  
  @Input() selectedEndingTheAssignmentOfTheCaseToTheLawyer: EndingTheAssignmentOfTheCaseToTheLawyer;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم الملف', field: 'fileNumber' }),
	new GridColumnOptions({ headerName: 'رقم الدعوي', field: 'lawsuitNumber' }),
	new GridColumnOptions({ headerName: 'لسنة ', field: 'year' }),
	new GridColumnOptions({ headerName: 'تاريخ الوارد', field: 'incomingDate' }),
	new GridColumnOptions({ headerName: 'كود المحامي', field: 'employeeCode' }),
	new GridColumnOptions({ headerName: 'تاريخ احالة المدير', field: 'directorAssignmentDate' }),
	new GridColumnOptions({ headerName: 'تاريخ انهاء المحامي', field: 'lawyerExpiryDate' }),
	new GridColumnOptions({ headerName: 'كود الفرع', field: 'branchCode' }),
	new GridColumnOptions({ headerName: 'نوع الجهة', field: 'entityType' }),
	new GridColumnOptions({ headerName: 'كود الجهة', field: 'entityCode' }),
	new GridColumnOptions({ headerName: 'كود موضوع القضية', field: 'issueCode' }),
	new GridColumnOptions({ headerName: 'سبب انهاء اسناد القضية', field: 'caseReason' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: EndingTheAssignmentOfTheCaseToTheLawyerViewComponent,
    editDialogClassType: EndingTheAssignmentOfTheCaseToTheLawyerEditComponent,
    newDialogClassType: EndingTheAssignmentOfTheCaseToTheLawyerNewComponent,
  });
    constructor(
        injector: Injector,
        public endingTheAssignmentOfTheCaseToTheLawyerService: EndingTheAssignmentOfTheCaseToTheLawyerService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedEndingTheAssignmentOfTheCaseToTheLawyer = new EndingTheAssignmentOfTheCaseToTheLawyer();

    
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

	this.issueCodeSelectOptions = new MaterialSelectOptions({
	 data: this.issueCodeIssuesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود موضوع القضية',
	});

	this.caseReasonSelectOptions = new MaterialSelectOptions({
	 data: this.terminationOfAttorneyAttorneyReasonsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'سبب انهاء اسناد القضية',
	});


    this.searchForm = this.formBuilder.group({
     	fileNumber : [],
	lawsuitNumber : [],
	year : [],
	incomingDate : [],
	employeeCode : [],
	directorAssignmentDate : [],
	lawyerExpiryDate : [],
	branchCode : [],
	entityType : [],
	entityCode : [],
	issueCode : [],
	caseReason : []
    });

     
  }

  getEndingTheAssignmentOfTheCaseToTheLawyerPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<EndingTheAssignmentOfTheCaseToTheLawyer[]> => {
    return this.endingTheAssignmentOfTheCaseToTheLawyerService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.endingTheAssignmentOfTheCaseToTheLawyerService.delete(param.data.id)
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
this.issueCodeIssuesService = new LookupService('issuecodeissues', this.http);
this.terminationOfAttorneyAttorneyReasonsService = new LookupService('terminationofattorneyattorneyreasons', this.http);
  }
}

