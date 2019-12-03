
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { SampleTestData } from 'app/shared/models/sample-test-data';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { SampleTestDataEditComponent } from '../sample-test-data-edit/sample-test-data-edit.component';
import { SampleTestDataNewComponent } from '../sample-test-data-new/sample-test-data-new.component';
import { SampleTestDataViewComponent } from '../sample-test-data-view/sample-test-data-view.component';
import { SampleTestDataService } from '../shared/sample-test-data.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-sample-test-data-list',
  templateUrl: './sample-test-data-list.component.html',
  styleUrls: ['./sample-test-data-list.component.scss'],
  providers: []
})

export class SampleTestDataListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedSampleTestData: SampleTestData;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود المادة الأساسية ', field: 'basicMaterialCode' }),
	new GridColumnOptions({ headerName: ' كود لمادة الفرعية', field: 'subMaterialCode' }),
	new GridColumnOptions({ headerName: 'كود الاختبار', field: 'testCode' }),
	new GridColumnOptions({ headerName: 'اسم بيان الاختبار', field: 'statementTestingName' }),
	new GridColumnOptions({ headerName: 'قيمة بيان لاتزيد عن', field: 'statementValueNoMoreThan' }),
	new GridColumnOptions({ headerName: 'قيمة بيان لاتقل عن', field: 'statementValueNotLessThan' }),
	new GridColumnOptions({ headerName: 'وحدة القياس', field: 'measruingUnit' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: SampleTestDataViewComponent,
    editDialogClassType: SampleTestDataEditComponent,
    newDialogClassType: SampleTestDataNewComponent,
  });
    constructor(
        injector: Injector,
        public sampleTestDataService: SampleTestDataService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedSampleTestData = new SampleTestData();

    

    this.searchForm = this.formBuilder.group({
     	basicMaterialCode : [],
	subMaterialCode : [],
	testCode : []
    });

     
  }

  getSampleTestsDataPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<SampleTestData[]> => {
    return this.sampleTestDataService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.sampleTestDataService.delete(param.data.id)
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

