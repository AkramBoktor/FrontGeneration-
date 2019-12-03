
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { SampleTestRequestForTheWorkOfOthers } from 'app/shared/models/sample-test-request-for-the-work-of-others';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { SampleTestRequestForTheWorkOfOthersEditComponent } from '../sample-test-request-for-the-work-of-others-edit/sample-test-request-for-the-work-of-others-edit.component';
import { SampleTestRequestForTheWorkOfOthersNewComponent } from '../sample-test-request-for-the-work-of-others-new/sample-test-request-for-the-work-of-others-new.component';
import { SampleTestRequestForTheWorkOfOthersViewComponent } from '../sample-test-request-for-the-work-of-others-view/sample-test-request-for-the-work-of-others-view.component';
import { SampleTestRequestForTheWorkOfOthersService } from '../shared/sample-test-request-for-the-work-of-others.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-sample-test-request-for-the-work-of-others-list',
  templateUrl: './sample-test-request-for-the-work-of-others-list.component.html',
  styleUrls: ['./sample-test-request-for-the-work-of-others-list.component.scss'],
  providers: []
})

export class SampleTestRequestForTheWorkOfOthersListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private laboratoriesService: LookupService;
private branchCodesService: LookupService;

  
laboratoryCodeSelectOptions: MaterialSelectOptions;
branchCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('laboratoryCode', { static: true }) LaboratoryCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedSampleTestRequestForTheWorkOfOthers: SampleTestRequestForTheWorkOfOthers;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'مسلسل طلب الاختبار', field: 'serialRequestTest' }),
	new GridColumnOptions({ headerName: 'المقاول', field: 'contractorCode' }),
	new GridColumnOptions({ headerName: 'عدد العينات', field: 'samplesNumber' }),
	new GridColumnOptions({ headerName: 'مبني تعليمي رقم', field: 'educationalBuildingNumber' }),
	new GridColumnOptions({ headerName: 'الملحق', field: 'supplement' }),
	new GridColumnOptions({ headerName: 'المبلغ المدفوع', field: 'paidAmount' }),
	new GridColumnOptions({ headerName: 'رقم الايصال او الشيك', field: 'receiptOrCheckNumber' }),
	new GridColumnOptions({ headerName: 'تاريخ الايصال او الشيك', field: 'dateOfReceiptOrCheck' }),
	new GridColumnOptions({ headerName: 'كود المشروع', field: 'projectCode' }),
	new GridColumnOptions({ headerName: 'العينة المختبرة', field: 'sampleTested' }),
	new GridColumnOptions({ headerName: 'كود المعمل', field: 'laboratoryCode' }),
	new GridColumnOptions({ headerName: 'كود الفرع', field: 'branchCode' }),
	new GridColumnOptions({ headerName: 'نوع الايصال او الشيك', field: 'typeOfReceiptOrCheck' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: SampleTestRequestForTheWorkOfOthersViewComponent,
    editDialogClassType: SampleTestRequestForTheWorkOfOthersEditComponent,
    newDialogClassType: SampleTestRequestForTheWorkOfOthersNewComponent,
  });
    constructor(
        injector: Injector,
        public sampleTestRequestForTheWorkOfOthersService: SampleTestRequestForTheWorkOfOthersService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedSampleTestRequestForTheWorkOfOthers = new SampleTestRequestForTheWorkOfOthers();

    
	this.laboratoryCodeSelectOptions = new MaterialSelectOptions({
	 data: this.laboratoriesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المعمل',
	});

	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الفرع',
	});


    this.searchForm = this.formBuilder.group({
     	serialRequestTest : [],
	contractorCode : [],
	educationalBuildingNumber : [],
	projectCode : [],
	laboratoryCode : [],
	branchCode : []
    });

     
  }

  getSamplesTestRequestForTheWorkOfOthersPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<SampleTestRequestForTheWorkOfOthers[]> => {
    return this.sampleTestRequestForTheWorkOfOthersService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.sampleTestRequestForTheWorkOfOthersService.delete(param.data.id)
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
    this.laboratoriesService = new LookupService('laboratories', this.http);
this.branchCodesService = new LookupService('branchcodes', this.http);
  }
}

