
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { StructuralComponentCode } from 'app/shared/models/structural-component-code';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { StructuralComponentCodeEditComponent } from '../structural-component-code-edit/structural-component-code-edit.component';
import { StructuralComponentCodeNewComponent } from '../structural-component-code-new/structural-component-code-new.component';
import { StructuralComponentCodeViewComponent } from '../structural-component-code-view/structural-component-code-view.component';
import { StructuralComponentCodeService } from '../shared/structural-component-code.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-structural-component-code-list',
  templateUrl: './structural-component-code-list.component.html',
  styleUrls: ['./structural-component-code-list.component.scss'],
  providers: []
})

export class StructuralComponentCodeListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedStructuralComponentCode: StructuralComponentCode;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود العنصر', field: 'elementCode' }),
	new GridColumnOptions({ headerName: 'اسم العنصر الانشائي', field: 'structuralElementName' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: StructuralComponentCodeViewComponent,
    editDialogClassType: StructuralComponentCodeEditComponent,
    newDialogClassType: StructuralComponentCodeNewComponent,
  });
    constructor(
        injector: Injector,
        public structuralComponentCodeService: StructuralComponentCodeService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedStructuralComponentCode = new StructuralComponentCode();

    

    this.searchForm = this.formBuilder.group({
     	elementCode : [],
	structuralElementName : []
    });

     
  }

  getStructuralComponentCodesPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<StructuralComponentCode[]> => {
    return this.structuralComponentCodeService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.structuralComponentCodeService.delete(param.data.id)
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

