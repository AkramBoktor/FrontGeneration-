
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { CodeOfVariousActivityOfApprovedCompanies } from 'app/shared/models/code-of-various-activity-of-approved-companies';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { CodeOfVariousActivityOfApprovedCompaniesEditComponent } from '../code-of-various-activity-of-approved-companies-edit/code-of-various-activity-of-approved-companies-edit.component';
import { CodeOfVariousActivityOfApprovedCompaniesNewComponent } from '../code-of-various-activity-of-approved-companies-new/code-of-various-activity-of-approved-companies-new.component';
import { CodeOfVariousActivityOfApprovedCompaniesViewComponent } from '../code-of-various-activity-of-approved-companies-view/code-of-various-activity-of-approved-companies-view.component';
import { CodeOfVariousActivityOfApprovedCompaniesService } from '../shared/code-of-various-activity-of-approved-companies.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-code-of-various-activity-of-approved-companies-list',
  templateUrl: './code-of-various-activity-of-approved-companies-list.component.html',
  styleUrls: ['./code-of-various-activity-of-approved-companies-list.component.scss'],
  providers: []
})

export class CodeOfVariousActivityOfApprovedCompaniesListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedCodeOfVariousActivityOfApprovedCompanies: CodeOfVariousActivityOfApprovedCompanies;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود النشاط', field: 'activityCode' }),
	new GridColumnOptions({ headerName: 'مسمي النشاط', field: 'activityName' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: CodeOfVariousActivityOfApprovedCompaniesViewComponent,
    editDialogClassType: CodeOfVariousActivityOfApprovedCompaniesEditComponent,
    newDialogClassType: CodeOfVariousActivityOfApprovedCompaniesNewComponent,
  });
    constructor(
        injector: Injector,
        public codeOfVariousActivityOfApprovedCompaniesService: CodeOfVariousActivityOfApprovedCompaniesService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedCodeOfVariousActivityOfApprovedCompanies = new CodeOfVariousActivityOfApprovedCompanies();

    

    this.searchForm = this.formBuilder.group({
     	activityCode : [],
	activityName : []
    });

     
  }

  getCodesOfVariousActivitiesOfApprovedCompaniesPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<CodeOfVariousActivityOfApprovedCompanies[]> => {
    return this.codeOfVariousActivityOfApprovedCompaniesService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.codeOfVariousActivityOfApprovedCompaniesService.delete(param.data.id)
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

