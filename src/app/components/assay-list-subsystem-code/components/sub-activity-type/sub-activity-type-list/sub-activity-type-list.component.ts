
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { SubActivityType } from 'app/shared/models/sub-activity-type';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { SubActivityTypeEditComponent } from '../sub-activity-type-edit/sub-activity-type-edit.component';
import { SubActivityTypeNewComponent } from '../sub-activity-type-new/sub-activity-type-new.component';
import { SubActivityTypeViewComponent } from '../sub-activity-type-view/sub-activity-type-view.component';
import { SubActivityTypeService } from '../shared/sub-activity-type.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-sub-activity-type-list',
  templateUrl: './sub-activity-type-list.component.html',
  styleUrls: ['./sub-activity-type-list.component.scss'],
  providers: []
})

export class SubActivityTypeListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private workTypesService: LookupService;

  
workTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('workType', { static: true }) WorkTypeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedSubActivityType: SubActivityType;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'نوع النشاط', field: 'activityType' }),
	new GridColumnOptions({ headerName: 'الكود', field: 'code' }),
	new GridColumnOptions({ headerName: 'الاسم', field: 'name' }),
	new GridColumnOptions({ headerName: 'نوع العمل', field: 'workType' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: SubActivityTypeViewComponent,
    editDialogClassType: SubActivityTypeEditComponent,
    newDialogClassType: SubActivityTypeNewComponent,
  });
    constructor(
        injector: Injector,
        public subActivityTypeService: SubActivityTypeService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedSubActivityType = new SubActivityType();

    
	this.workTypeSelectOptions = new MaterialSelectOptions({
	 data: this.workTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع العمل',
	});


    this.searchForm = this.formBuilder.group({
     	activityType : [],
	code : [],
	name : [],
	workType : []
    });

     
  }

  getSubActivityTypesPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<SubActivityType[]> => {
    return this.subActivityTypeService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.subActivityTypeService.delete(param.data.id)
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

