
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { SupplementaryRecord } from 'app/shared/models/supplementary-record';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { SupplementaryRecordEditComponent } from '../supplementary-record-edit/supplementary-record-edit.component';
import { SupplementaryRecordNewComponent } from '../supplementary-record-new/supplementary-record-new.component';
import { SupplementaryRecordViewComponent } from '../supplementary-record-view/supplementary-record-view.component';
import { SupplementaryRecordService } from '../shared/supplementary-record.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-supplementary-record-list',
  templateUrl: './supplementary-record-list.component.html',
  styleUrls: ['./supplementary-record-list.component.scss'],
  providers: []
})

export class SupplementaryRecordListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private offeringTypesService: LookupService;
private classificationDegreesService: LookupService;
private commissionerRequirementsService: LookupService;

  
offeringTypeSelectOptions: MaterialSelectOptions;
classificationDegreeSelectOptions: MaterialSelectOptions;
contributionsAfterNegotiationSelectOptions: MaterialSelectOptions;

  
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('classificationDegree', { static: true }) ClassificationDegreeSelectComponent: MaterialSelectComponent;
	@ViewChild('contributionsAfterNegotiation', { static: true }) ContributionsAfterNegotiationSelectComponent: MaterialSelectComponent;

  
  @Input() selectedSupplementaryRecord: SupplementaryRecord;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم المحضر', field: 'recordNumber' }),
	new GridColumnOptions({ headerName: 'القيمة', field: 'value' }),
	new GridColumnOptions({ headerName: 'العلاوة', field: 'bouns' }),
	new GridColumnOptions({ headerName: 'نسبة الدفعة المقدمة', field: 'downPaymentRatio' }),
	new GridColumnOptions({ headerName: 'العلاوة التي انتهت عليها المفاوضة', field: 'negotiationEndedBouns' }),
	new GridColumnOptions({ headerName: 'المندوب المفوض', field: 'plenipotentiary' }),
	new GridColumnOptions({ headerName: 'مدة التنفيذ', field: 'durationExecution' }),
	new GridColumnOptions({ headerName: 'العلاوة التي تقدم عنها', field: 'bonusProvided' }),
	new GridColumnOptions({ headerName: 'اجمالي قيمة العطاء', field: 'tenderTotalValue' }),
	new GridColumnOptions({ headerName: 'قيمة المقايسة', field: 'assayValue' }),
	new GridColumnOptions({ headerName: 'دفعة مقدمة', field: 'advancePayment' }),
	new GridColumnOptions({ headerName: 'المدرسة', field: 'school' }),
	new GridColumnOptions({ headerName: 'اسم الشركة', field: 'companyName' }),
	new GridColumnOptions({ headerName: 'كود المقاول', field: 'contractorCode' }),
	new GridColumnOptions({ headerName: 'رقم العطاء', field: 'tenderNumber' }),
	new GridColumnOptions({ headerName: 'رقم مناقصة', field: 'bidNumber' }),
	new GridColumnOptions({ headerName: 'سبب عدم المطابقة', field: 'reason' }),
	new GridColumnOptions({ headerName: 'درجة التصنيف', field: 'classificationDegree' }),
	new GridColumnOptions({ headerName: 'نوع الطرح', field: 'offeringType' }),
	new GridColumnOptions({ headerName: 'اشتراكات بعد المفاوضة', field: 'contributionsAfterNegotiation' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: SupplementaryRecordViewComponent,
    editDialogClassType: SupplementaryRecordEditComponent,
    newDialogClassType: SupplementaryRecordNewComponent,
  });
    constructor(
        injector: Injector,
        public supplementaryRecordService: SupplementaryRecordService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedSupplementaryRecord = new SupplementaryRecord();

    
	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});

	this.classificationDegreeSelectOptions = new MaterialSelectOptions({
	 data: this.classificationDegreesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'درجة التصنيف',
	});

	this.contributionsAfterNegotiationSelectOptions = new MaterialSelectOptions({
	 data: this.commissionerRequirementsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'اشتراكات بعد المفاوضة',
	});


    this.searchForm = this.formBuilder.group({
     	recordNumber : [],
	bidNumber : [],
	tenderNumber : [],
	contractorCode : [],
	companyName : [],
	school : [],
	advancePayment : [],
	assayValue : [],
	tenderTotalValue : [],
	bonusProvided : [],
	durationExecution : [],
	plenipotentiary : [],
	negotiationEndedBouns : [],
	downPaymentRatio : [],
	bouns : [],
	value : [],
	reason : [],
	offeringType : [],
	classificationDegree : [],
	contributionsAfterNegotiation : []
    });

     
  }

  getSupplementaryRecordPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<SupplementaryRecord[]> => {
    return this.supplementaryRecordService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.supplementaryRecordService.delete(param.data.id)
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
    this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.classificationDegreesService = new LookupService('classificationdegrees', this.http);
this.commissionerRequirementsService = new LookupService('commissionerrequirements', this.http);
  }
}

