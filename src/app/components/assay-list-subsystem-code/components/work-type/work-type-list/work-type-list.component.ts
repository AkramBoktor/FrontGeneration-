
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { WorkType } from 'app/shared/models/work-type';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { WorkTypeEditComponent } from '../work-type-edit/work-type-edit.component';
import { WorkTypeNewComponent } from '../work-type-new/work-type-new.component';
import { WorkTypeViewComponent } from '../work-type-view/work-type-view.component';
import { WorkTypeService } from '../shared/work-type.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-work-type-list',
  templateUrl: './work-type-list.component.html',
  styleUrls: ['./work-type-list.component.scss'],
  providers: []
})

export class WorkTypeListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedWorkType: WorkType;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'الكود', field: 'code' }),
	new GridColumnOptions({ headerName: 'الاسم', field: 'name' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: WorkTypeViewComponent,
    editDialogClassType: WorkTypeEditComponent,
    newDialogClassType: WorkTypeNewComponent,
  });
    constructor(
        injector: Injector,
        public workTypeService: WorkTypeService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedWorkType = new WorkType();

    

    this.searchForm = this.formBuilder.group({
     	code : [],
	name : []
    });

     
  }

  getWorkTypesPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<WorkType[]> => {
    return this.workTypeService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.workTypeService.delete(param.data.id)
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

