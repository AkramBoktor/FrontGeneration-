
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { AssayItem } from 'app/shared/models/assay-item';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { AssayItemEditComponent } from '../assay-item-edit/assay-item-edit.component';
import { AssayItemNewComponent } from '../assay-item-new/assay-item-new.component';
import { AssayItemViewComponent } from '../assay-item-view/assay-item-view.component';
import { AssayItemService } from '../shared/assay-item.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-assay-item-list',
  templateUrl: './assay-item-list.component.html',
  styleUrls: ['./assay-item-list.component.scss'],
  providers: []
})

export class AssayItemListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private workTypesService: LookupService;

  
workTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('workType', { static: true }) WorkTypeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedAssayItem: AssayItem;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود البند', field: 'itemCode' }),
	new GridColumnOptions({ headerName: 'اسم البند باللغة العربية', field: 'arabicItemName' }),
	new GridColumnOptions({ headerName: 'اسم البند باللغة الإنجليزية', field: 'englishItemName' }),
	new GridColumnOptions({ headerName: 'الوحدة', field: 'unitCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: AssayItemViewComponent,
    editDialogClassType: AssayItemEditComponent,
    newDialogClassType: AssayItemNewComponent,
  });
    constructor(
        injector: Injector,
        public assayItemService: AssayItemService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedAssayItem = new AssayItem();

    
	this.workTypeSelectOptions = new MaterialSelectOptions({
	 data: this.workTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع العمل',
	});


    this.searchForm = this.formBuilder.group({
     	activityType : [],
	subActivityType : [],
	workType : []
    });

     
  }

  getAssayItemsPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<AssayItem[]> => {
    return this.assayItemService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.assayItemService.delete(param.data.id)
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
    this.workTypesService = new LookupService('worktypes', this.http);
  }
}

