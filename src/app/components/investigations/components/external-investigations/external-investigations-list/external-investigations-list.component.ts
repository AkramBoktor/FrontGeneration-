
import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { GridColumnOptions, GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { FormControlError, GridPaginatedSortedFiltered } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { ExternalInvestigations } from 'app/shared/models/external-investigations';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ExternalInvestigationsEditComponent } from '../external-investigations-edit/external-investigations-edit.component';
import { ExternalInvestigationsNewComponent } from '../external-investigations-new/external-investigations-new.component';
import { ExternalInvestigationsViewComponent } from '../external-investigations-view/external-investigations-view.component';
import { ExternalInvestigationsService } from '../shared/external-investigations.service';

@Component({
  selector: 'app-external-investigations-list',
  templateUrl: './external-investigations-list.component.html',
  styleUrls: ['./external-investigations-list.component.scss'],
  providers: []
})

export class ExternalInvestigationsListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private branchCodesService: LookupService;
private statusCodesService: LookupService;
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

  
  @Input() selectedExternalInvestigations: ExternalInvestigations;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم ملف التحقيق', field: 'fileNumber' }),
	new GridColumnOptions({ headerName: 'تارخ حفظ الملف', field: 'savedFileDate' }),
	new GridColumnOptions({ headerName: 'تاريخ الرد من الجهاز المركزي', field: 'centralAgencyReplyDate' }),
	new GridColumnOptions({ headerName: 'تاريخ موافاة الجهاز المركزي بالتحقيق', field: 'centralAgencyInvestigationSubmittedDate' }),
	new GridColumnOptions({ headerName: 'تاريخ موافقة السلطة المختصة', field: 'competentAuthorityDate' }),
	new GridColumnOptions({ headerName: 'تاريخ العرض علي المختصة', field: 'submissionCompetentDate' }),
	new GridColumnOptions({ headerName: 'كود الموظف', field: 'employeeCode' }),
	new GridColumnOptions({ headerName: 'تاريخ مراجعة مذكرة النيابة', field: 'prosecutionDocumentReviewDate' }),
	new GridColumnOptions({ headerName: 'رقم القضية', field: 'caseNumber' }),
	new GridColumnOptions({ headerName: 'كود المحامي', field: 'lawyerCode' }),
	new GridColumnOptions({ headerName: 'تاريخ الاحاله للتحقيق', field: 'investigatedReferralDate' }),
	new GridColumnOptions({ headerName: 'تاريخ استلام العضو للملف', field: 'receivedDate' }),
	new GridColumnOptions({ headerName: 'اسم الموظف', field: 'employeeName' }),
	new GridColumnOptions({ headerName: 'التصنيف', field: 'category' }),
	new GridColumnOptions({ headerName: 'كود المخالفة', field: 'violationCode' }),
	new GridColumnOptions({ headerName: 'الجهة طالبة التحقيق', field: 'referralFrom' }),
	new GridColumnOptions({ headerName: 'كود الحالة', field: 'actionCode' }),
	new GridColumnOptions({ headerName: 'كود الفرع', field: 'branchCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: ExternalInvestigationsViewComponent,
    editDialogClassType: ExternalInvestigationsEditComponent,
    newDialogClassType: ExternalInvestigationsNewComponent,
  });
    constructor(
        injector: Injector,
        public externalInvestigationsService: ExternalInvestigationsService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedExternalInvestigations = new ExternalInvestigations();

    
	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الفرع',
	});

	this.actionCodeSelectOptions = new MaterialSelectOptions({
	 data: this.statusCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الحالة',
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
	caseNumber : [],
	receivedDate : [],
	prosecutionDocumentReviewDate : [],
	submissionCompetentDate : [],
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

  getExternalInvestigationsPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<ExternalInvestigations[]> => {
    return this.externalInvestigationsService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.externalInvestigationsService.delete(param.data.id)
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
this.statusCodesService = new LookupService('statuscodes', this.http);
this.departmentsSectionsService = new LookupService('departmentssections', this.http);
this.violationsService = new LookupService('violations', this.http);
this.classificationInstructionCodesService = new LookupService('classificationinstructioncodes', this.http);
  }
}

