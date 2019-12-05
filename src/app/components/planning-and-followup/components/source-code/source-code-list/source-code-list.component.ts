
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { SourceCode } from 'app/shared/models/source-code';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { SourceCodeEditComponent } from '../source-code-edit/source-code-edit.component';
import { SourceCodeNewComponent } from '../source-code-new/source-code-new.component';
import { SourceCodeViewComponent } from '../source-code-view/source-code-view.component';
import { SourceCodeService } from '../shared/source-code.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-source-code-list',
  templateUrl: './source-code-list.component.html',
  styleUrls: ['./source-code-list.component.scss'],
  providers: []
})

export class SourceCodeListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedSourceCode: SourceCode;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'الكود', field: 'code' }),
	new GridColumnOptions({ headerName: 'الاسم', field: 'name' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: SourceCodeViewComponent,
    editDialogClassType: SourceCodeEditComponent,
    newDialogClassType: SourceCodeNewComponent,
  });
    constructor(
        injector: Injector,
        public sourceCodeService: SourceCodeService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedSourceCode = new SourceCode();

    

    this.searchForm = this.formBuilder.group({
     	code : [],
	name : []
    });

     
  }

  getSourceCodesPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<SourceCode[]> => {
    return this.sourceCodeService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.sourceCodeService.delete(param.data.id)
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

