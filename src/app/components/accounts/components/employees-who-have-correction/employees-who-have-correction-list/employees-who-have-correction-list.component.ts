
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { EmployeesWhoHaveCorrection } from 'app/shared/models/employees-who-have-correction';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { EmployeesWhoHaveCorrectionEditComponent } from '../employees-who-have-correction-edit/employees-who-have-correction-edit.component';
import { EmployeesWhoHaveCorrectionNewComponent } from '../employees-who-have-correction-new/employees-who-have-correction-new.component';
import { EmployeesWhoHaveCorrectionViewComponent } from '../employees-who-have-correction-view/employees-who-have-correction-view.component';
import { EmployeesWhoHaveCorrectionService } from '../shared/employees-who-have-correction.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-employees-who-have-correction-list',
  templateUrl: './employees-who-have-correction-list.component.html',
  styleUrls: ['./employees-who-have-correction-list.component.scss'],
  providers: []
})

export class EmployeesWhoHaveCorrectionListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private entryTypesService: LookupService;

  
entryTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('entryType', { static: true }) EntryTypeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedEmployeesWhoHaveCorrection: EmployeesWhoHaveCorrection;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'شهروسنه الوارد', field: 'incomingYearAndMonth' }),
	new GridColumnOptions({ headerName: 'كود الموظف', field: 'employeeCode' }),
	new GridColumnOptions({ headerName: 'بيان الموظف', field: 'employeeDate' }),
	new GridColumnOptions({ headerName: 'نوع الادخال', field: 'entryType' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: EmployeesWhoHaveCorrectionViewComponent,
    editDialogClassType: EmployeesWhoHaveCorrectionEditComponent,
    newDialogClassType: EmployeesWhoHaveCorrectionNewComponent,
  });
    constructor(
        injector: Injector,
        public employeesWhoHaveCorrectionService: EmployeesWhoHaveCorrectionService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedEmployeesWhoHaveCorrection = new EmployeesWhoHaveCorrection();

    
	this.entryTypeSelectOptions = new MaterialSelectOptions({
	 data: this.entryTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الادخال',
	});


    this.searchForm = this.formBuilder.group({
     	incomingYearAndMonth : [],
	employeeCode : [],
	employeeDate : [],
	entryType : []
    });

     
  }

  getEmployeesWhoHaveCorrectionPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<EmployeesWhoHaveCorrection[]> => {
    return this.employeesWhoHaveCorrectionService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.employeesWhoHaveCorrectionService.delete(param.data.id)
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
    this.entryTypesService = new LookupService('entrytypes', this.http);
  }
}

