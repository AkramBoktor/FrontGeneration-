
import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { GridColumnOptions, GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { FormControlError, GridPaginatedSortedFiltered } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { InternalInvestigations } from 'app/shared/models/internal-investigations';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { InternalInvestigationsEditComponent } from '../internal-investigations-edit/internal-investigations-edit.component';
import { InternalInvestigationsNewComponent } from '../internal-investigations-new/internal-investigations-new.component';
import { InternalInvestigationsViewComponent } from '../internal-investigations-view/internal-investigations-view.component';
import { InternalInvestigationsService } from '../shared/internal-investigations.service';

@Component({
  selector: 'app-internal-investigations-list',
  templateUrl: './internal-investigations-list.component.html',
  styleUrls: ['./internal-investigations-list.component.scss'],
  providers: []
})

export class InternalInvestigationsListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private branchCodesService: LookupService;
private proceduresCodesService: LookupService;
private departmentsSectionsService: LookupService;
private violationsService: LookupService;
private classificationInstructionCodesService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;
actionCodeSelectOptions: MaterialSelectOptions;
referralFromSelectOptions: MaterialSelectOptions;
violationCodeSelectOptions: MaterialSelectOptions;
categorySelectOptions: MaterialSelectOptions;

  
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('actionCode', { static: true }) ActionCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('referralFrom', { static: true }) ReferralFromSelectComponent: MaterialSelectComponent;
	@ViewChild('violationCode', { static: true }) ViolationCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('category', { static: true }) CategorySelectComponent: MaterialSelectComponent;

  
  @Input() selectedInternalInvestigations: InternalInvestigations;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم ملف التحقيق', field: 'fileNumber' }),
	new GridColumnOptions({ headerName: 'تاريخ حفظ الملف', field: 'savedFileDate' }),
	new GridColumnOptions({ headerName: 'تاريخ الرد من الجهاز المركزي', field: 'centralAgencyReplyDate' }),
	new GridColumnOptions({ headerName: 'تاريخ موافاة الجهاز المركزي بالتحقيق', field: 'centralAgencyInvestigationSubmittedDate' }),
	new GridColumnOptions({ headerName: 'تاريخ موافقة السلطة المختصة', field: 'competentAuthorityDate' }),
	new GridColumnOptions({ headerName: 'تاريخ انتهاء مذكرة التحقيق', field: 'investigationDocumentExpiryDate' }),
	new GridColumnOptions({ headerName: 'تاريخ استلام المحامي للملف', field: 'attorneyReceiptDate' }),
	new GridColumnOptions({ headerName: 'تاريخ احالة المذكره لادارة التحقيقات', field: 'referralInvestigationsDate' }),
	new GridColumnOptions({ headerName: 'كود المحامي', field: 'lawyerCode' }),
	new GridColumnOptions({ headerName: 'تاريخ الاحاله للتحقيق', field: 'investigatedReferralDate' }),
	new GridColumnOptions({ headerName: 'كود الموظف', field: 'employeeCode' }),
	new GridColumnOptions({ headerName: 'اسم الموظف', field: 'employeeName' }),
	new GridColumnOptions({ headerName: 'التصنيف', field: 'category' }),
	new GridColumnOptions({ headerName: 'كود المخالفة', field: 'violationCode' }),
	new GridColumnOptions({ headerName: 'الجهة طالبة التحقيق', field: 'referralFrom' }),
	new GridColumnOptions({ headerName: 'كود الاجراء', field: 'actionCode' }),
	new GridColumnOptions({ headerName: 'كود الفرع', field: 'branchCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: InternalInvestigationsViewComponent,
    editDialogClassType: InternalInvestigationsEditComponent,
    newDialogClassType: InternalInvestigationsNewComponent,
  });
    constructor(
        injector: Injector,
        public internalInvestigationsService: InternalInvestigationsService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedInternalInvestigations = new InternalInvestigations();

    
	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الفرع',
	});

	this.actionCodeSelectOptions = new MaterialSelectOptions({
	 data: this.proceduresCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الاجراء',
	});

	this.referralFromSelectOptions = new MaterialSelectOptions({
	 data: this.departmentsSectionsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الجهة طالبة التحقيق',
	});

	this.violationCodeSelectOptions = new MaterialSelectOptions({
	 data: this.violationsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المخالفة',
	});

	this.categorySelectOptions = new MaterialSelectOptions({
	 data: this.classificationInstructionCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'التصنيف',
	});


    this.searchForm = this.formBuilder.group({
     	fileNumber : [],
	investigatedReferralDate : [],
	lawyerCode : [],
	referralInvestigationsDate : [],
	attorneyReceiptDate : [],
	investigationDocumentExpiryDate : [],
	competentAuthorityDate : [],
	centralAgencyInvestigationSubmittedDate : [],
	centralAgencyReplyDate : [],
	savedFileDate : [],
	employeeCode : [],
	branchCode : [],
	actionCode : [],
	referralFrom : [],
	violationCode : [],
	category : []
    });

     
  }

  getInternalInvestigationsPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<InternalInvestigations[]> => {
    return this.internalInvestigationsService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.internalInvestigationsService.delete(param.data.id)
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
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.proceduresCodesService = new LookupService('procedurescodes', this.http);
this.departmentsSectionsService = new LookupService('departmentssections', this.http);
this.violationsService = new LookupService('violations', this.http);
this.classificationInstructionCodesService = new LookupService('classificationinstructioncodes', this.http);
  }
}

