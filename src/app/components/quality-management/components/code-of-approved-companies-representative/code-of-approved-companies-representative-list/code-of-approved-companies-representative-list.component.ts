
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { CodeOfApprovedCompaniesRepresentative } from 'app/shared/models/code-of-approved-companies-representative';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { CodeOfApprovedCompaniesRepresentativeEditComponent } from '../code-of-approved-companies-representative-edit/code-of-approved-companies-representative-edit.component';
import { CodeOfApprovedCompaniesRepresentativeNewComponent } from '../code-of-approved-companies-representative-new/code-of-approved-companies-representative-new.component';
import { CodeOfApprovedCompaniesRepresentativeViewComponent } from '../code-of-approved-companies-representative-view/code-of-approved-companies-representative-view.component';
import { CodeOfApprovedCompaniesRepresentativeService } from '../shared/code-of-approved-companies-representative.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-code-of-approved-companies-representative-list',
  templateUrl: './code-of-approved-companies-representative-list.component.html',
  styleUrls: ['./code-of-approved-companies-representative-list.component.scss'],
  providers: []
})

export class CodeOfApprovedCompaniesRepresentativeListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedCodeOfApprovedCompaniesRepresentative: CodeOfApprovedCompaniesRepresentative;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود الصفة', field: 'objectiveCode' }),
	new GridColumnOptions({ headerName: 'اسم الصفة', field: 'objectiveName' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: CodeOfApprovedCompaniesRepresentativeViewComponent,
    editDialogClassType: CodeOfApprovedCompaniesRepresentativeEditComponent,
    newDialogClassType: CodeOfApprovedCompaniesRepresentativeNewComponent,
  });
    constructor(
        injector: Injector,
        public codeOfApprovedCompaniesRepresentativeService: CodeOfApprovedCompaniesRepresentativeService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedCodeOfApprovedCompaniesRepresentative = new CodeOfApprovedCompaniesRepresentative();

    

    this.searchForm = this.formBuilder.group({
     	objectiveCode : [],
	objectiveName : []
    });

     
  }

  getCodesOfApprovedCompaniesRepresentativesPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<CodeOfApprovedCompaniesRepresentative[]> => {
    return this.codeOfApprovedCompaniesRepresentativeService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.codeOfApprovedCompaniesRepresentativeService.delete(param.data.id)
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

