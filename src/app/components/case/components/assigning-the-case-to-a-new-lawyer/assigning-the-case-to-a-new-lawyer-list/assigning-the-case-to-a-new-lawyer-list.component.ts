
import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AssigningTheCaseToANewLawyer } from 'app/shared/models/assigning-the-case-to-a-new-lawyer';
import { GridColumnOptions, GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { FormControlError, GridPaginatedSortedFiltered } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AssigningTheCaseToANewLawyerEditComponent } from '../assigning-the-case-to-a-new-lawyer-edit/assigning-the-case-to-a-new-lawyer-edit.component';
import { AssigningTheCaseToANewLawyerNewComponent } from '../assigning-the-case-to-a-new-lawyer-new/assigning-the-case-to-a-new-lawyer-new.component';
import { AssigningTheCaseToANewLawyerViewComponent } from '../assigning-the-case-to-a-new-lawyer-view/assigning-the-case-to-a-new-lawyer-view.component';
import { AssigningTheCaseToANewLawyerService } from '../shared/assigning-the-case-to-a-new-lawyer.service';

@Component({
  selector: 'app-assigning-the-case-to-a-new-lawyer-list',
  templateUrl: './assigning-the-case-to-a-new-lawyer-list.component.html',
  styleUrls: ['./assigning-the-case-to-a-new-lawyer-list.component.scss'],
  providers: []
})

export class AssigningTheCaseToANewLawyerListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private branchCodesService: LookupService;
private entityTypeService: LookupService;
private issueCodeIssuesService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;
entityTypeSelectOptions: MaterialSelectOptions;
issueCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('entityType', { static: true }) EntityTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('issueCode', { static: true }) IssueCodeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedAssigningTheCaseToANewLawyer: AssigningTheCaseToANewLawyer;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم الملف', field: 'fileNumber' }),
	new GridColumnOptions({ headerName: 'رقم الدعوي', field: 'lawsuitNumber' }),
	new GridColumnOptions({ headerName: 'لسنة ', field: 'year' }),
	new GridColumnOptions({ headerName: 'تاريخ الوارد', field: 'incomingDate' }),
	new GridColumnOptions({ headerName: 'رقم المحامي ', field: 'lawyerCode' }),
	new GridColumnOptions({ headerName: 'تاريخ استلام المحامي', field: 'receiptAttorneyDate' }),
	new GridColumnOptions({ headerName: 'كود الفرع', field: 'branchCode' }),
	new GridColumnOptions({ headerName: 'نوع الجهة', field: 'entityType' }),
	new GridColumnOptions({ headerName: 'كود موضوع القضية', field: 'issueCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: AssigningTheCaseToANewLawyerViewComponent,
    editDialogClassType: AssigningTheCaseToANewLawyerEditComponent,
    newDialogClassType: AssigningTheCaseToANewLawyerNewComponent,
  });
    constructor(
        injector: Injector,
        public assigningTheCaseToANewLawyerService: AssigningTheCaseToANewLawyerService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedAssigningTheCaseToANewLawyer = new AssigningTheCaseToANewLawyer();

    
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

	this.issueCodeSelectOptions = new MaterialSelectOptions({
	 data: this.issueCodeIssuesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود موضوع القضية',
	});


    this.searchForm = this.formBuilder.group({
     	fileNumber : [],
	lawsuitNumber : [],
	year : [],
	incomingDate : [],
	lawyerCode : [],
	receiptAttorneyDate : [],
	branchCode : [],
	entityType : [],
	issueCode : []
    });

     
  }

  getAssigningTheCaseToANewLawyerPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<AssigningTheCaseToANewLawyer[]> => {
    return this.assigningTheCaseToANewLawyerService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.assigningTheCaseToANewLawyerService.delete(param.data.id)
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
this.issueCodeIssuesService = new LookupService('issuecodeissues', this.http);
  }
}

