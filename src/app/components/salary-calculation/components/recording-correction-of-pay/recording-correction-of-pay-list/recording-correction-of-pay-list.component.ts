
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { RecordingCorrectionOfPay } from 'app/shared/models/recording-correction-of-pay';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { RecordingCorrectionOfPayEditComponent } from '../recording-correction-of-pay-edit/recording-correction-of-pay-edit.component';
import { RecordingCorrectionOfPayNewComponent } from '../recording-correction-of-pay-new/recording-correction-of-pay-new.component';
import { RecordingCorrectionOfPayViewComponent } from '../recording-correction-of-pay-view/recording-correction-of-pay-view.component';
import { RecordingCorrectionOfPayService } from '../shared/recording-correction-of-pay.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-recording-correction-of-pay-list',
  templateUrl: './recording-correction-of-pay-list.component.html',
  styleUrls: ['./recording-correction-of-pay-list.component.scss'],
  providers: []
})

export class RecordingCorrectionOfPayListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private correctionTypesService: LookupService;

  
correctionCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('correctionCode', { static: true }) CorrectionCodeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedRecordingCorrectionOfPay: RecordingCorrectionOfPay;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم التصويب', field: 'correctionNumber' }),
	new GridColumnOptions({ headerName: 'كود الموظف', field: 'employeeCode' }),
	new GridColumnOptions({ headerName: 'فتره التصويب من', field: 'correctionPeriodFrom' }),
	new GridColumnOptions({ headerName: 'فتره التصويب الي', field: 'correctionPeriodTo' }),
	new GridColumnOptions({ headerName: 'الاجر المكمل', field: 'supplementaryPay' }),
	new GridColumnOptions({ headerName: 'قيمه الاضافي', field: 'extraValue' }),
	new GridColumnOptions({ headerName: 'بدلات', field: 'allowances' }),
	new GridColumnOptions({ headerName: 'بدل نقدي', field: 'cashAllowance' }),
	new GridColumnOptions({ headerName: 'بدل سياره', field: 'carAllowance' }),
	new GridColumnOptions({ headerName: 'اقساط معاشات', field: 'retirementInstallments' }),
	new GridColumnOptions({ headerName: 'اجمالي الديون', field: 'totalDebt' }),
	new GridColumnOptions({ headerName: 'الجزاءات', field: 'sanctions' }),
	new GridColumnOptions({ headerName: 'حصه حكومه ارباب عهد', field: 'governmentShare' }),
	new GridColumnOptions({ headerName: 'نوع التصويب', field: 'correctionType' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: RecordingCorrectionOfPayViewComponent,
    editDialogClassType: RecordingCorrectionOfPayEditComponent,
    newDialogClassType: RecordingCorrectionOfPayNewComponent,
  });
    constructor(
        injector: Injector,
        public recordingCorrectionOfPayService: RecordingCorrectionOfPayService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedRecordingCorrectionOfPay = new RecordingCorrectionOfPay();

    
	this.correctionCodeSelectOptions = new MaterialSelectOptions({
	 data: this.correctionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود التصويب',
	});


    this.searchForm = this.formBuilder.group({
     	correctionNumber : [],
	employeeCode : [],
	correctionCode : []
    });

     
  }

  getRecordingCorrectionOfPayPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<RecordingCorrectionOfPay[]> => {
    return this.recordingCorrectionOfPayService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.recordingCorrectionOfPayService.delete(param.data.id)
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

