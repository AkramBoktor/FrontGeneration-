
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { SampleTestRequest } from 'app/shared/models/sample-test-request';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { SampleTestRequestEditComponent } from '../sample-test-request-edit/sample-test-request-edit.component';
import { SampleTestRequestNewComponent } from '../sample-test-request-new/sample-test-request-new.component';
import { SampleTestRequestViewComponent } from '../sample-test-request-view/sample-test-request-view.component';
import { SampleTestRequestService } from '../shared/sample-test-request.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-sample-test-request-list',
  templateUrl: './sample-test-request-list.component.html',
  styleUrls: ['./sample-test-request-list.component.scss'],
  providers: []
})

export class SampleTestRequestListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private testRequestTypesService: LookupService;
private sampleTestedsService: LookupService;
private branchCodesService: LookupService;

  
testRequestTypeSelectOptions: MaterialSelectOptions;
sampleTestedSelectOptions: MaterialSelectOptions;
branchCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('testRequestType', { static: true }) TestRequestTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('sampleTested', { static: true }) SampleTestedSelectComponent: MaterialSelectComponent;
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedSampleTestRequest: SampleTestRequest;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'مسلسل طلب الاختبار', field: 'serialRequestTest' }),
	new GridColumnOptions({ headerName: 'المورد', field: 'supplier' }),
	new GridColumnOptions({ headerName: 'عدد العينات', field: 'samplesNumber' }),
	new GridColumnOptions({ headerName: 'مبني تعليمي رقم', field: 'educationalBuildingNumber' }),
	new GridColumnOptions({ headerName: 'الملحق', field: 'supplement' }),
	new GridColumnOptions({ headerName: 'رقم المناقصة', field: 'bidNumber' }),
	new GridColumnOptions({ headerName: 'المبلغ المدفوع', field: 'paidAmount' }),
	new GridColumnOptions({ headerName: 'نوع طلب الاختبار', field: 'testRequestType' }),
	new GridColumnOptions({ headerName: 'نوع العينة المختبره', field: 'sampleTestedType' }),
	new GridColumnOptions({ headerName: 'طالب الاختبار', field: 'testdemand' }),
	new GridColumnOptions({ headerName: 'العينة المختبرة', field: 'sampleTested' }),
	new GridColumnOptions({ headerName: 'كود نوع الطرح', field: 'offeringTypeCode' }),
	new GridColumnOptions({ headerName: 'كود المعمل', field: 'laboratoryCode' }),
	new GridColumnOptions({ headerName: 'كود الفرع', field: 'branchCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: SampleTestRequestViewComponent,
    editDialogClassType: SampleTestRequestEditComponent,
    newDialogClassType: SampleTestRequestNewComponent,
  });
    constructor(
        injector: Injector,
        public sampleTestRequestService: SampleTestRequestService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedSampleTestRequest = new SampleTestRequest();

    
	this.testRequestTypeSelectOptions = new MaterialSelectOptions({
	 data: this.testRequestTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع طلب الاختبار',
	});

	this.sampleTestedSelectOptions = new MaterialSelectOptions({
	 data: this.sampleTestedsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'العينة المختبرة',
	});

	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الفرع',
	});


    this.searchForm = this.formBuilder.group({
     	serialRequestTest : [],
	testRequestType : [],
	sampleTested : [],
	branchCode : []
    });

     
  }

  getSamplesTestRequestPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<SampleTestRequest[]> => {
    return this.sampleTestRequestService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.sampleTestRequestService.delete(param.data.id)
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
    this.testRequestTypesService = new LookupService('testrequesttypes', this.http);
this.sampleTestedsService = new LookupService('sampletesteds', this.http);
this.branchCodesService = new LookupService('branchcodes', this.http);
  }
}

