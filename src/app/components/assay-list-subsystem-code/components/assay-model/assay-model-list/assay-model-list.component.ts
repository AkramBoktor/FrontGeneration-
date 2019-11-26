
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { AssayModel } from 'app/shared/models/assay-model';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { AssayModelEditComponent } from '../assay-model-edit/assay-model-edit.component';
import { AssayModelNewComponent } from '../assay-model-new/assay-model-new.component';
import { AssayModelViewComponent } from '../assay-model-view/assay-model-view.component';
import { AssayModelService } from '../shared/assay-model.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-assay-model-list',
  templateUrl: './assay-model-list.component.html',
  styleUrls: ['./assay-model-list.component.scss'],
  providers: []
})

export class AssayModelListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private formTypesService: LookupService;

  
modelTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('modelType', { static: true }) ModelTypeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedAssayModel: AssayModel;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'الكود', field: 'code' }),
	new GridColumnOptions({ headerName: 'الاسم', field: 'name' }),
	new GridColumnOptions({ headerName: 'نوع النموذج', field: 'modelType' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: AssayModelViewComponent,
    editDialogClassType: AssayModelEditComponent,
    newDialogClassType: AssayModelNewComponent,
  });
    constructor(
        injector: Injector,
        public assayModelService: AssayModelService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedAssayModel = new AssayModel();

    
	this.modelTypeSelectOptions = new MaterialSelectOptions({
	 data: this.formTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع النموذج',
	});


    this.searchForm = this.formBuilder.group({
     	code : [],
	name : [],
	modelType : []
    });

     
  }

  getAssayModelsPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<AssayModel[]> => {
    return this.assayModelService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.assayModelService.delete(param.data.id)
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
    this.formTypesService = new LookupService('formtypes', this.http);
  }
}

