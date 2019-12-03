
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { BaseType } from 'app/shared/models/base-type';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { BaseTypeEditComponent } from '../base-type-edit/base-type-edit.component';
import { BaseTypeNewComponent } from '../base-type-new/base-type-new.component';
import { BaseTypeViewComponent } from '../base-type-view/base-type-view.component';
import { BaseTypeService } from '../shared/base-type.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-base-type-list',
  templateUrl: './base-type-list.component.html',
  styleUrls: ['./base-type-list.component.scss'],
  providers: []
})

export class BaseTypeListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedBaseType: BaseType;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'الكود', field: 'code' }),
	new GridColumnOptions({ headerName: 'الاسم', field: 'name' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: BaseTypeViewComponent,
    editDialogClassType: BaseTypeEditComponent,
    newDialogClassType: BaseTypeNewComponent,
  });
    constructor(
        injector: Injector,
        public baseTypeService: BaseTypeService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedBaseType = new BaseType();

    

    this.searchForm = this.formBuilder.group({
     	code : [],
	name : []
    });

     
  }

  getBaseTypesPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<BaseType[]> => {
    return this.baseTypeService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.baseTypeService.delete(param.data.id)
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

