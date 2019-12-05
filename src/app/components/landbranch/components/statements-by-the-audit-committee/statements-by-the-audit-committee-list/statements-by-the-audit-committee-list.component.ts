
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { StatementsByTheAuditCommittee } from 'app/shared/models/statements-by-the-audit-committee';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { StatementsByTheAuditCommitteeEditComponent } from '../statements-by-the-audit-committee-edit/statements-by-the-audit-committee-edit.component';
import { StatementsByTheAuditCommitteeNewComponent } from '../statements-by-the-audit-committee-new/statements-by-the-audit-committee-new.component';
import { StatementsByTheAuditCommitteeViewComponent } from '../statements-by-the-audit-committee-view/statements-by-the-audit-committee-view.component';
import { StatementsByTheAuditCommitteeService } from '../shared/statements-by-the-audit-committee.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-statements-by-the-audit-committee-list',
  templateUrl: './statements-by-the-audit-committee-list.component.html',
  styleUrls: ['./statements-by-the-audit-committee-list.component.scss'],
  providers: []
})

export class StatementsByTheAuditCommitteeListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedStatementsByTheAuditCommittee: StatementsByTheAuditCommittee;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود قطعة الارض', field: 'landID' }),
	new GridColumnOptions({ headerName: 'رقم اللجنة', field: 'committeeNumber' }),
	new GridColumnOptions({ headerName: 'كود ملاحظة المراجعة', field: 'reviewNoteCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: StatementsByTheAuditCommitteeViewComponent,
    editDialogClassType: StatementsByTheAuditCommitteeEditComponent,
    newDialogClassType: StatementsByTheAuditCommitteeNewComponent,
  });
    constructor(
        injector: Injector,
        public statementsByTheAuditCommitteeService: StatementsByTheAuditCommitteeService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedStatementsByTheAuditCommittee = new StatementsByTheAuditCommittee();

    

    this.searchForm = this.formBuilder.group({
     	landID : [],
	committeeNumber : [],
	reviewNoteCode : []
    });

     
  }

  getStatementsByTheAuditCommitteePaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<StatementsByTheAuditCommittee[]> => {
    return this.statementsByTheAuditCommitteeService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.statementsByTheAuditCommitteeService.delete(param.data.id)
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
    
  }
}

