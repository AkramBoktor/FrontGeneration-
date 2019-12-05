
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { ConformationsAndTheResultOfTheCorrespondingConcreteMixture } from 'app/shared/models/conformations-and-the-result-of-the-corresponding-concrete-mixture';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ConformationsAndTheResultOfTheCorrespondingConcreteMixtureEditComponent } from '../conformations-and-the-result-of-the-corresponding-concrete-mixture-edit/conformations-and-the-result-of-the-corresponding-concrete-mixture-edit.component';
import { ConformationsAndTheResultOfTheCorrespondingConcreteMixtureNewComponent } from '../conformations-and-the-result-of-the-corresponding-concrete-mixture-new/conformations-and-the-result-of-the-corresponding-concrete-mixture-new.component';
import { ConformationsAndTheResultOfTheCorrespondingConcreteMixtureViewComponent } from '../conformations-and-the-result-of-the-corresponding-concrete-mixture-view/conformations-and-the-result-of-the-corresponding-concrete-mixture-view.component';
import { ConformationsAndTheResultOfTheCorrespondingConcreteMixtureService } from '../shared/conformations-and-the-result-of-the-corresponding-concrete-mixture.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-conformations-and-the-result-of-the-corresponding-concrete-mixture-list',
  templateUrl: './conformations-and-the-result-of-the-corresponding-concrete-mixture-list.component.html',
  styleUrls: ['./conformations-and-the-result-of-the-corresponding-concrete-mixture-list.component.scss'],
  providers: []
})

export class ConformationsAndTheResultOfTheCorrespondingConcreteMixtureListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedConformationsAndTheResultOfTheCorrespondingConcreteMixture: ConformationsAndTheResultOfTheCorrespondingConcreteMixture;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم الطلب', field: 'orderNumber' }),
	new GridColumnOptions({ headerName: 'رقم الطلب العينة الجديد', field: 'newSampleOrderNumber' }),
	new GridColumnOptions({ headerName: 'عمرها', field: 'age' }),
	new GridColumnOptions({ headerName: 'نتيجة البيان', field: 'statementResult' }),
	new GridColumnOptions({ headerName: 'اسم بيان الاختبار', field: 'statementTestName' }),
	new GridColumnOptions({ headerName: 'القائم بالادخال', field: 'entry' }),
	new GridColumnOptions({ headerName: 'كود بيان الاختبار', field: 'testStatementCode' }),
	new GridColumnOptions({ headerName: 'مهندس المعمل', field: 'laboratoryEngineer' }),
	new GridColumnOptions({ headerName: 'تاريخ اختبار العينة', field: 'sampleTestDate' }),
	new GridColumnOptions({ headerName: 'مسلسل العينة', field: 'serialSample' }),
	new GridColumnOptions({ headerName: 'مسمي الاختبار', field: 'calledTesting' }),
	new GridColumnOptions({ headerName: 'المادة الفرعية', field: 'subArticle' }),
	new GridColumnOptions({ headerName: 'المادة الأساسية', field: 'basicArticle' }),
	new GridColumnOptions({ headerName: 'كود توصيف العينة', field: 'sampleSpecificationCode' }),
	new GridColumnOptions({ headerName: 'نتيجة الاختبار', field: 'testResult' }),
	new GridColumnOptions({ headerName: 'مطابقة العينة', field: 'sampleMatch' }),
	new GridColumnOptions({ headerName: 'نوع البيان', field: 'statementType' }),
	new GridColumnOptions({ headerName: 'وحدة القياس', field: 'measruingUnit' }),
	new GridColumnOptions({ headerName: 'المعمل', field: 'laboratory' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: ConformationsAndTheResultOfTheCorrespondingConcreteMixtureViewComponent,
    editDialogClassType: ConformationsAndTheResultOfTheCorrespondingConcreteMixtureEditComponent,
    newDialogClassType: ConformationsAndTheResultOfTheCorrespondingConcreteMixtureNewComponent,
  });
    constructor(
        injector: Injector,
        public conformationsAndTheResultOfTheCorrespondingConcreteMixtureService: ConformationsAndTheResultOfTheCorrespondingConcreteMixtureService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedConformationsAndTheResultOfTheCorrespondingConcreteMixture = new ConformationsAndTheResultOfTheCorrespondingConcreteMixture();

    

    this.searchForm = this.formBuilder.group({
     	orderNumber : []
    });

     
  }

  getConformationsAndTheResultsOfTheCorrespondingConcreteMixturePaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<ConformationsAndTheResultOfTheCorrespondingConcreteMixture[]> => {
    return this.conformationsAndTheResultOfTheCorrespondingConcreteMixtureService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.conformationsAndTheResultOfTheCorrespondingConcreteMixtureService.delete(param.data.id)
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

