
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { SampleResultForTheWorkOfOthers } from 'app/shared/models/sample-result-for-the-work-of-others';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { SampleResultForTheWorkOfOthersEditComponent } from '../sample-result-for-the-work-of-others-edit/sample-result-for-the-work-of-others-edit.component';
import { SampleResultForTheWorkOfOthersNewComponent } from '../sample-result-for-the-work-of-others-new/sample-result-for-the-work-of-others-new.component';
import { SampleResultForTheWorkOfOthersViewComponent } from '../sample-result-for-the-work-of-others-view/sample-result-for-the-work-of-others-view.component';
import { SampleResultForTheWorkOfOthersService } from '../shared/sample-result-for-the-work-of-others.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-sample-result-for-the-work-of-others-list',
  templateUrl: './sample-result-for-the-work-of-others-list.component.html',
  styleUrls: ['./sample-result-for-the-work-of-others-list.component.scss'],
  providers: []
})

export class SampleResultForTheWorkOfOthersListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedSampleResultForTheWorkOfOthers: SampleResultForTheWorkOfOthers;
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
    viewDialogClassType: SampleResultForTheWorkOfOthersViewComponent,
    editDialogClassType: SampleResultForTheWorkOfOthersEditComponent,
    newDialogClassType: SampleResultForTheWorkOfOthersNewComponent,
  });
    constructor(
        injector: Injector,
        public sampleResultForTheWorkOfOthersService: SampleResultForTheWorkOfOthersService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedSampleResultForTheWorkOfOthers = new SampleResultForTheWorkOfOthers();

    

    this.searchForm = this.formBuilder.group({
     	orderNumber : []
    });

     
  }

  getSamplesResultForTheWorkOfOthersPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<SampleResultForTheWorkOfOthers[]> => {
    return this.sampleResultForTheWorkOfOthersService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.sampleResultForTheWorkOfOthersService.delete(param.data.id)
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

