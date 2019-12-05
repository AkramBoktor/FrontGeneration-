
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { DataEntryForm129AtTheManagementLevel } from 'app/shared/models/data-entry-form-129-at-the-management-level';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { DataEntryForm129AtTheManagementLevelEditComponent } from '../data-entry-form-129-at-the-management-level-edit/data-entry-form-129-at-the-management-level-edit.component';
import { DataEntryForm129AtTheManagementLevelNewComponent } from '../data-entry-form-129-at-the-management-level-new/data-entry-form-129-at-the-management-level-new.component';
import { DataEntryForm129AtTheManagementLevelViewComponent } from '../data-entry-form-129-at-the-management-level-view/data-entry-form-129-at-the-management-level-view.component';
import { DataEntryForm129AtTheManagementLevelService } from '../shared/data-entry-form-129-at-the-management-level.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-data-entry-form-129-at-the-management-level-list',
  templateUrl: './data-entry-form-129-at-the-management-level-list.component.html',
  styleUrls: ['./data-entry-form-129-at-the-management-level-list.component.scss'],
  providers: []
})

export class DataEntryForm129AtTheManagementLevelListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private centralDepartmentsService: LookupService;

  
administrationOrBranchSelectOptions: MaterialSelectOptions;

  
	@ViewChild('administrationOrBranch', { static: true }) AdministrationOrBranchSelectComponent: MaterialSelectComponent;

  
  @Input() selectedDataEntryForm129AtTheManagementLevel: DataEntryForm129AtTheManagementLevel;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'شهر الوارد', field: 'incomingMonth' }),
	new GridColumnOptions({ headerName: 'رقم الوارد', field: 'incomingNumber' }),
	new GridColumnOptions({ headerName: 'الاداره/الفرع', field: 'administrationOrBranch' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: DataEntryForm129AtTheManagementLevelViewComponent,
    editDialogClassType: DataEntryForm129AtTheManagementLevelEditComponent,
    newDialogClassType: DataEntryForm129AtTheManagementLevelNewComponent,
  });
    constructor(
        injector: Injector,
        public dataEntryForm129AtTheManagementLevelService: DataEntryForm129AtTheManagementLevelService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedDataEntryForm129AtTheManagementLevel = new DataEntryForm129AtTheManagementLevel();

    
	this.administrationOrBranchSelectOptions = new MaterialSelectOptions({
	 data: this.centralDepartmentsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الاداره/الفرع',
	});


    this.searchForm = this.formBuilder.group({
     	incomingMonth : [],
	incomingNumber : [],
	administrationOrBranch : []
    });

     
  }

  getDataEntryForm129AtTheManagementLevelPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<DataEntryForm129AtTheManagementLevel[]> => {
    return this.dataEntryForm129AtTheManagementLevelService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.dataEntryForm129AtTheManagementLevelService.delete(param.data.id)
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
    this.centralDepartmentsService = new LookupService('centraldepartments', this.http);
  }
}

