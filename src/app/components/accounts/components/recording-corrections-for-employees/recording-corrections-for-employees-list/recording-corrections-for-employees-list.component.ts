
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { RecordingCorrectionsForEmployees } from 'app/shared/models/recording-corrections-for-employees';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { RecordingCorrectionsForEmployeesEditComponent } from '../recording-corrections-for-employees-edit/recording-corrections-for-employees-edit.component';
import { RecordingCorrectionsForEmployeesNewComponent } from '../recording-corrections-for-employees-new/recording-corrections-for-employees-new.component';
import { RecordingCorrectionsForEmployeesViewComponent } from '../recording-corrections-for-employees-view/recording-corrections-for-employees-view.component';
import { RecordingCorrectionsForEmployeesService } from '../shared/recording-corrections-for-employees.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-recording-corrections-for-employees-list',
  templateUrl: './recording-corrections-for-employees-list.component.html',
  styleUrls: ['./recording-corrections-for-employees-list.component.scss'],
  providers: []
})

export class RecordingCorrectionsForEmployeesListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private employeeStatusesService: LookupService;
private noteCodesService: LookupService;

  
employeeStatusSelectOptions: MaterialSelectOptions;
noteCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('employeeStatus', { static: true }) EmployeeStatusSelectComponent: MaterialSelectComponent;
	@ViewChild('noteCode', { static: true }) NoteCodeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedRecordingCorrectionsForEmployees: RecordingCorrectionsForEmployees;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود الموظف', field: 'employeeCode' }),
	new GridColumnOptions({ headerName: 'رقم الوارد', field: 'incomingNumber' }),
	new GridColumnOptions({ headerName: 'شهور وسنه الوارد', field: 'incomingMonthAndYear' }),
	new GridColumnOptions({ headerName: 'شهر الملاحظه', field: 'noteMonth' }),
	new GridColumnOptions({ headerName: 'القيمه', field: 'value' }),
	new GridColumnOptions({ headerName: 'حاله الموظف', field: 'employeeStatus' }),
	new GridColumnOptions({ headerName: 'كودالملاحظه', field: 'noteCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: RecordingCorrectionsForEmployeesViewComponent,
    editDialogClassType: RecordingCorrectionsForEmployeesEditComponent,
    newDialogClassType: RecordingCorrectionsForEmployeesNewComponent,
  });
    constructor(
        injector: Injector,
        public recordingCorrectionsForEmployeesService: RecordingCorrectionsForEmployeesService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedRecordingCorrectionsForEmployees = new RecordingCorrectionsForEmployees();

    
	this.employeeStatusSelectOptions = new MaterialSelectOptions({
	 data: this.employeeStatusesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حاله الموظف',
	});

	this.noteCodeSelectOptions = new MaterialSelectOptions({
	 data: this.noteCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كودالملاحظه',
	});


    this.searchForm = this.formBuilder.group({
     	employeeCode : [],
	incomingNumber : [],
	incomingMonthAndYear : [],
	noteMonth : [],
	value : [],
	employeeStatus : [],
	noteCode : []
    });

     
  }

  getRecordingCorrectionsForEmployeesPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<RecordingCorrectionsForEmployees[]> => {
    return this.recordingCorrectionsForEmployeesService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.recordingCorrectionsForEmployeesService.delete(param.data.id)
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
    this.employeeStatusesService = new LookupService('employeestatuses', this.http);
this.noteCodesService = new LookupService('notecodes', this.http);
  }
}

