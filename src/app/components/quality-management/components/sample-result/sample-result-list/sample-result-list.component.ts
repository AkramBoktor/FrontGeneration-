
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { SampleResult } from 'app/shared/models/sample-result';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { SampleResultEditComponent } from '../sample-result-edit/sample-result-edit.component';
import { SampleResultNewComponent } from '../sample-result-new/sample-result-new.component';
import { SampleResultViewComponent } from '../sample-result-view/sample-result-view.component';
import { SampleResultService } from '../shared/sample-result.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-sample-result-list',
  templateUrl: './sample-result-list.component.html',
  styleUrls: ['./sample-result-list.component.scss'],
  providers: []
})

export class SampleResultListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedSampleResult: SampleResult;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم الطلب', field: 'orderNumber' }),
	new GridColumnOptions({ headerName: 'كود توصيف العينة', field: 'sampleSpecificationCode' }),
	new GridColumnOptions({ headerName: 'المادة الأساسية', field: 'basicArticle' }),
	new GridColumnOptions({ headerName: 'المادة الفرعية', field: 'subArticle' }),
	new GridColumnOptions({ headerName: 'مسمي الاختبار', field: 'calledTesting' }),
	new GridColumnOptions({ headerName: 'مسلسل العينة', field: 'serialSample' }),
	new GridColumnOptions({ headerName: 'تاريخ اختبار العينة', field: 'sampleTestDate' }),
	new GridColumnOptions({ headerName: 'مهندس المعمل', field: 'laboratoryEngineer' }),
	new GridColumnOptions({ headerName: 'كود بيان الاختبار', field: 'testStatementCode' }),
	new GridColumnOptions({ headerName: 'اسم بيان الاختبار', field: 'statementTestName' }),
	new GridColumnOptions({ headerName: 'نتيجة البيان', field: 'statementResult' }),
	new GridColumnOptions({ headerName: 'عمرها', field: 'age' }),
	new GridColumnOptions({ headerName: 'المعمل', field: 'laboratory' }),
	new GridColumnOptions({ headerName: 'مطابقة العينة', field: 'sampleMatch' }),
	new GridColumnOptions({ headerName: 'وحدة القياس', field: 'measruingUnit' }),
	new GridColumnOptions({ headerName: 'نوع البيان', field: 'statementType' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: SampleResultViewComponent,
    editDialogClassType: SampleResultEditComponent,
    newDialogClassType: SampleResultNewComponent,
  });
    constructor(
        injector: Injector,
        public sampleResultService: SampleResultService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedSampleResult = new SampleResult();

    

    this.searchForm = this.formBuilder.group({
     	orderNumber : []
    });

     
  }

  getSamplesResultPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<SampleResult[]> => {
    return this.sampleResultService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.sampleResultService.delete(param.data.id)
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

