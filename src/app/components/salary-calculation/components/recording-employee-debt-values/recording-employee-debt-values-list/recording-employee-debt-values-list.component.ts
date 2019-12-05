
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { RecordingEmployeeDebtValues } from 'app/shared/models/recording-employee-debt-values';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { RecordingEmployeeDebtValuesEditComponent } from '../recording-employee-debt-values-edit/recording-employee-debt-values-edit.component';
import { RecordingEmployeeDebtValuesNewComponent } from '../recording-employee-debt-values-new/recording-employee-debt-values-new.component';
import { RecordingEmployeeDebtValuesViewComponent } from '../recording-employee-debt-values-view/recording-employee-debt-values-view.component';
import { RecordingEmployeeDebtValuesService } from '../shared/recording-employee-debt-values.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-recording-employee-debt-values-list',
  templateUrl: './recording-employee-debt-values-list.component.html',
  styleUrls: ['./recording-employee-debt-values-list.component.scss'],
  providers: []
})

export class RecordingEmployeeDebtValuesListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private correctionTypesService: LookupService;

  
correctionTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('correctionType', { static: true }) CorrectionTypeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedRecordingEmployeeDebtValues: RecordingEmployeeDebtValues;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم التصويب', field: 'correctionNumber' }),
	new GridColumnOptions({ headerName: 'كود الموظف', field: 'employeeCode' }),
	new GridColumnOptions({ headerName: 'قيمه الخصم', field: 'discountValue' }),
	new GridColumnOptions({ headerName: 'نوع الخصم', field: 'discountType' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: RecordingEmployeeDebtValuesViewComponent,
    editDialogClassType: RecordingEmployeeDebtValuesEditComponent,
    newDialogClassType: RecordingEmployeeDebtValuesNewComponent,
  });
    constructor(
        injector: Injector,
        public recordingEmployeeDebtValuesService: RecordingEmployeeDebtValuesService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedRecordingEmployeeDebtValues = new RecordingEmployeeDebtValues();

    
	this.correctionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.correctionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع التصويب',
	});


    this.searchForm = this.formBuilder.group({
     	correctionNumber : [],
	employeeCode : [],
	correctionType : []
    });

     
  }

  getRecordingEmployeeDebtValuesPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<RecordingEmployeeDebtValues[]> => {
    return this.recordingEmployeeDebtValuesService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.recordingEmployeeDebtValuesService.delete(param.data.id)
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
    this.correctionTypesService = new LookupService('correctiontypes', this.http);
  }
}

