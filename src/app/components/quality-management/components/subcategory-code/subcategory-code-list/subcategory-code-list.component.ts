
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { SubcategoryCode } from 'app/shared/models/subcategory-code';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { SubcategoryCodeEditComponent } from '../subcategory-code-edit/subcategory-code-edit.component';
import { SubcategoryCodeNewComponent } from '../subcategory-code-new/subcategory-code-new.component';
import { SubcategoryCodeViewComponent } from '../subcategory-code-view/subcategory-code-view.component';
import { SubcategoryCodeService } from '../shared/subcategory-code.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-subcategory-code-list',
  templateUrl: './subcategory-code-list.component.html',
  styleUrls: ['./subcategory-code-list.component.scss'],
  providers: []
})

export class SubcategoryCodeListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedSubcategoryCode: SubcategoryCode;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود المادة الفرعية', field: 'subMaterialCode' }),
	new GridColumnOptions({ headerName: 'اسم المادة الفرعية', field: 'subMaterialName' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: SubcategoryCodeViewComponent,
    editDialogClassType: SubcategoryCodeEditComponent,
    newDialogClassType: SubcategoryCodeNewComponent,
  });
    constructor(
        injector: Injector,
        public subcategoryCodeService: SubcategoryCodeService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedSubcategoryCode = new SubcategoryCode();

    

    this.searchForm = this.formBuilder.group({
     	subMaterialCode : [],
	subMaterialName : []
    });

     
  }

  getSubcategoryCodePaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<SubcategoryCode[]> => {
    return this.subcategoryCodeService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.subcategoryCodeService.delete(param.data.id)
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

