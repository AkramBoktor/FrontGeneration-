
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { DefineANewModel } from 'app/shared/models/define-a-new-model';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { DefineANewModelEditComponent } from '../define-a-new-model-edit/define-a-new-model-edit.component';
import { DefineANewModelNewComponent } from '../define-a-new-model-new/define-a-new-model-new.component';
import { DefineANewModelViewComponent } from '../define-a-new-model-view/define-a-new-model-view.component';
import { DefineANewModelService } from '../shared/define-a-new-model.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-define-a-new-model-list',
  templateUrl: './define-a-new-model-list.component.html',
  styleUrls: ['./define-a-new-model-list.component.scss'],
  providers: []
})

export class DefineANewModelListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedDefineANewModel: DefineANewModel;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود النموذج', field: 'modelCode' }),
	new GridColumnOptions({ headerName: ' اسم النموذج ', field: 'modelName' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: DefineANewModelViewComponent,
    editDialogClassType: DefineANewModelEditComponent,
    newDialogClassType: DefineANewModelNewComponent,
  });
    constructor(
        injector: Injector,
        public defineANewModelService: DefineANewModelService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedDefineANewModel = new DefineANewModel();

    

    this.searchForm = this.formBuilder.group({
     	modelCode : [],
	modelName : []
    });

     
  }

  getDefineANewModelPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<DefineANewModel[]> => {
    return this.defineANewModelService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.defineANewModelService.delete(param.data.id)
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

