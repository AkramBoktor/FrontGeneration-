
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { RecordVariableCorrectionsForEmployees } from 'app/shared/models/record-variable-corrections-for-employees';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { RecordVariableCorrectionsForEmployeesEditComponent } from '../record-variable-corrections-for-employees-edit/record-variable-corrections-for-employees-edit.component';
import { RecordVariableCorrectionsForEmployeesNewComponent } from '../record-variable-corrections-for-employees-new/record-variable-corrections-for-employees-new.component';
import { RecordVariableCorrectionsForEmployeesViewComponent } from '../record-variable-corrections-for-employees-view/record-variable-corrections-for-employees-view.component';
import { RecordVariableCorrectionsForEmployeesService } from '../shared/record-variable-corrections-for-employees.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-record-variable-corrections-for-employees-list',
  templateUrl: './record-variable-corrections-for-employees-list.component.html',
  styleUrls: ['./record-variable-corrections-for-employees-list.component.scss'],
  providers: []
})

export class RecordVariableCorrectionsForEmployeesListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private financialDegreesService: LookupService;
private bonusesService: LookupService;

  
financialDegreeSelectOptions: MaterialSelectOptions;
bonusSelectOptions: MaterialSelectOptions;

  
	@ViewChild('financialDegree', { static: true }) FinancialDegreeSelectComponent: MaterialSelectComponent;
	@ViewChild('bonus', { static: true }) BonusSelectComponent: MaterialSelectComponent;

  
  @Input() selectedRecordVariableCorrectionsForEmployees: RecordVariableCorrectionsForEmployees;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم التصويب', field: 'correctionNumber' }),
	new GridColumnOptions({ headerName: 'شهر الوارد', field: 'incomingMonth' }),
	new GridColumnOptions({ headerName: 'كود الموظف', field: 'employeeCode' }),
	new GridColumnOptions({ headerName: 'شهر الاستحقاق', field: 'benefitsMonth' }),
	new GridColumnOptions({ headerName: 'عدد الملاحظات', field: 'noteNumber' }),
	new GridColumnOptions({ headerName: 'المرتب الاساسي', field: 'basicaSalary' }),
	new GridColumnOptions({ headerName: 'قيمه الجهود', field: 'valuableEfforts' }),
	new GridColumnOptions({ headerName: 'قيمه الحوافز', field: 'incentiveValue' }),
	new GridColumnOptions({ headerName: 'قيمه الاضافي', field: 'extraValue' }),
	new GridColumnOptions({ headerName: 'قيمه مكافاه', field: 'bonusValue' }),
	new GridColumnOptions({ headerName: 'كود التصويب', field: 'correctionCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: RecordVariableCorrectionsForEmployeesViewComponent,
    editDialogClassType: RecordVariableCorrectionsForEmployeesEditComponent,
    newDialogClassType: RecordVariableCorrectionsForEmployeesNewComponent,
  });
    constructor(
        injector: Injector,
        public recordVariableCorrectionsForEmployeesService: RecordVariableCorrectionsForEmployeesService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedRecordVariableCorrectionsForEmployees = new RecordVariableCorrectionsForEmployees();

    
	this.financialDegreeSelectOptions = new MaterialSelectOptions({
	 data: this.financialDegreesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الدرجه الماليه',
	});

	this.bonusSelectOptions = new MaterialSelectOptions({
	 data: this.bonusesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'العلاوه',
	});


    this.searchForm = this.formBuilder.group({
     	employeeCode : [],
	year : [],
	decisionNumber : [],
	dueDate : [],
	financialDegree : [],
	bonus : []
    });

     
  }

  getRecordVariableCorrectionsForEmployeesPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<RecordVariableCorrectionsForEmployees[]> => {
    return this.recordVariableCorrectionsForEmployeesService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.recordVariableCorrectionsForEmployeesService.delete(param.data.id)
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
    this.financialDegreesService = new LookupService('financialdegrees', this.http);
this.bonusesService = new LookupService('bonuses', this.http);
  }
}

