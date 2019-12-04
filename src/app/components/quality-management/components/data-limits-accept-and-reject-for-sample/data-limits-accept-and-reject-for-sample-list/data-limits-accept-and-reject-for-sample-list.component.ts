
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { DataLimitsAcceptAndRejectForSample } from 'app/shared/models/data-limits-accept-and-reject-for-sample';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { DataLimitsAcceptAndRejectForSampleEditComponent } from '../data-limits-accept-and-reject-for-sample-edit/data-limits-accept-and-reject-for-sample-edit.component';
import { DataLimitsAcceptAndRejectForSampleNewComponent } from '../data-limits-accept-and-reject-for-sample-new/data-limits-accept-and-reject-for-sample-new.component';
import { DataLimitsAcceptAndRejectForSampleViewComponent } from '../data-limits-accept-and-reject-for-sample-view/data-limits-accept-and-reject-for-sample-view.component';
import { DataLimitsAcceptAndRejectForSampleService } from '../shared/data-limits-accept-and-reject-for-sample.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-data-limits-accept-and-reject-for-sample-list',
  templateUrl: './data-limits-accept-and-reject-for-sample-list.component.html',
  styleUrls: ['./data-limits-accept-and-reject-for-sample-list.component.scss'],
  providers: []
})

export class DataLimitsAcceptAndRejectForSampleListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedDataLimitsAcceptAndRejectForSample: DataLimitsAcceptAndRejectForSample;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود المادة الأساسية ', field: 'basicMaterialCode' }),
	new GridColumnOptions({ headerName: ' كود لمادة الفرعية', field: 'subMaterialCode' }),
	new GridColumnOptions({ headerName: 'كود الاختبار', field: 'testCode' }),
	new GridColumnOptions({ headerName: 'اسم بيان الاختبار', field: 'testStatementName' }),
	new GridColumnOptions({ headerName: 'قيمة بيان لاتزيد عن', field: 'noMoreThanStatementvalue' }),
	new GridColumnOptions({ headerName: 'قيمة بيان لاتقل عن', field: 'notLessThanStatementValue' }),
	new GridColumnOptions({ headerName: 'وحدة القياس', field: 'measruingUnitStatement' }),
	new GridColumnOptions({ headerName: 'نوع البيان', field: 'statementType' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: DataLimitsAcceptAndRejectForSampleViewComponent,
    editDialogClassType: DataLimitsAcceptAndRejectForSampleEditComponent,
    newDialogClassType: DataLimitsAcceptAndRejectForSampleNewComponent,
  });
    constructor(
        injector: Injector,
        public dataLimitsAcceptAndRejectForSampleService: DataLimitsAcceptAndRejectForSampleService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedDataLimitsAcceptAndRejectForSample = new DataLimitsAcceptAndRejectForSample();

    

    this.searchForm = this.formBuilder.group({
     	basicMaterialCode : [],
	subMaterialCode : [],
	testCode : []
    });

     
  }

  getDataLimitsAcceptAndRejectForSamplesPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<DataLimitsAcceptAndRejectForSample[]> => {
    return this.dataLimitsAcceptAndRejectForSampleService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.dataLimitsAcceptAndRejectForSampleService.delete(param.data.id)
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

