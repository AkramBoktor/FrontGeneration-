
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { TestCode } from 'app/shared/models/test-code';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { TestCodeEditComponent } from '../test-code-edit/test-code-edit.component';
import { TestCodeNewComponent } from '../test-code-new/test-code-new.component';
import { TestCodeViewComponent } from '../test-code-view/test-code-view.component';
import { TestCodeService } from '../shared/test-code.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-test-code-list',
  templateUrl: './test-code-list.component.html',
  styleUrls: ['./test-code-list.component.scss'],
  providers: []
})

export class TestCodeListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private yesOrNoService: LookupService;
private priceRelationshipsService: LookupService;

  
hasAgeSelectOptions: MaterialSelectOptions;
priceRelationshipSelectOptions: MaterialSelectOptions;

  
	@ViewChild('hasAge', { static: true }) HasAgeSelectComponent: MaterialSelectComponent;
	@ViewChild('priceRelationship', { static: true }) PriceRelationshipSelectComponent: MaterialSelectComponent;

  
  @Input() selectedTestCode: TestCode;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود الماده الاساسية', field: 'basicMaterialCode' }),
	new GridColumnOptions({ headerName: 'كود المادة الفرعية', field: 'subMaterialCode' }),
	new GridColumnOptions({ headerName: 'كود الاختبار', field: 'testCode' }),
	new GridColumnOptions({ headerName: 'اسم الاختبار', field: 'testName' }),
	new GridColumnOptions({ headerName: 'سعر الاختبار', field: 'testPrice' }),
	new GridColumnOptions({ headerName: 'لها عمر', field: 'hasAge' }),
	new GridColumnOptions({ headerName: 'علاقة السعر', field: 'priceRelationship' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: TestCodeViewComponent,
    editDialogClassType: TestCodeEditComponent,
    newDialogClassType: TestCodeNewComponent,
  });
    constructor(
        injector: Injector,
        public testCodeService: TestCodeService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedTestCode = new TestCode();

    
	this.hasAgeSelectOptions = new MaterialSelectOptions({
	 data: this.yesOrNoService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'لها عمر',
	});

	this.priceRelationshipSelectOptions = new MaterialSelectOptions({
	 data: this.priceRelationshipsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'علاقة السعر',
	});


    this.searchForm = this.formBuilder.group({
     	basicMaterialCode : [],
	subMaterialCode : [],
	testCode : [],
	testName : [],
	hasAge : [],
	priceRelationship : []
    });

     
  }

  getTestCodesPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<TestCode[]> => {
    return this.testCodeService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.testCodeService.delete(param.data.id)
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
    this.yesOrNoService = new LookupService('yesOrNos', this.http);
this.priceRelationshipsService = new LookupService('pricerelationships', this.http);
  }
}

