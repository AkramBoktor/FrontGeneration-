
import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { GridColumnOptions, GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { FormControlError, GridPaginatedSortedFiltered } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { Grievances } from 'app/shared/models/grievances';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { GrievancesEditComponent } from '../grievances-edit/grievances-edit.component';
import { GrievancesNewComponent } from '../grievances-new/grievances-new.component';
import { GrievancesViewComponent } from '../grievances-view/grievances-view.component';
import { GrievancesService } from '../shared/grievances.service';

@Component({
  selector: 'app-grievances-list',
  templateUrl: './grievances-list.component.html',
  styleUrls: ['./grievances-list.component.scss'],
  providers: []
})

export class GrievancesListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private departmentsSectionsService: LookupService;
private branchCodesService: LookupService;
private commissionChairmanDecisionsService: LookupService;
private sanctionsAndTheirCausesService: LookupService;

  
grievanceDestinationCodeSelectOptions: MaterialSelectOptions;
branchCodeSelectOptions: MaterialSelectOptions;
decisionChairmanCommissionSelectOptions: MaterialSelectOptions;
penaltyAfterAmendmentSelectOptions: MaterialSelectOptions;

  
	@ViewChild('grievanceDestinationCode', { static: true }) GrievanceDestinationCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('decisionChairmanCommission', { static: true }) DecisionChairmanCommissionSelectComponent: MaterialSelectComponent;
	@ViewChild('penaltyAfterAmendment', { static: true }) PenaltyAfterAmendmentSelectComponent: MaterialSelectComponent;

  
  @Input() selectedGrievances: Grievances;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم الملف', field: 'fileNumber' }),
	new GridColumnOptions({ headerName: 'تاريخ اخطار شئون العاملين في حالة تعديل الجزاء', field: 'notificationAffairsDate' }),
	new GridColumnOptions({ headerName: 'تاريخ قرار رئيس الهيئة', field: 'chairmanDecisionDate' }),
	new GridColumnOptions({ headerName: 'تاريخ العرض علي رئيس الهيئة', field: 'presentationChairmanCommissionDate' }),
	new GridColumnOptions({ headerName: 'نتيجة بحث التظلم', field: 'grievanceSearchResult' }),
	new GridColumnOptions({ headerName: 'تاريخ بحث التظلم', field: 'grievanceSearchHistory' }),
	new GridColumnOptions({ headerName: 'تاريخ الاحالة للمحامي', field: 'referralDate' }),
	new GridColumnOptions({ headerName: 'رقم المحامي', field: 'lawyerCode' }),
	new GridColumnOptions({ headerName: 'تاريخ الوارد للشئون القانونية', field: 'receivedDate' }),
	new GridColumnOptions({ headerName: 'رقم الوارد للشئون القانونية', field: 'incomingNumber' }),
	new GridColumnOptions({ headerName: 'تاريخ الورود للارشيف', field: 'containedArchiveDate' }),
	new GridColumnOptions({ headerName: 'تاريخ صدور الامر التنفيذي الجديد', field: 'executiveOrderNewDate' }),
	new GridColumnOptions({ headerName: 'رقم الامر التنفيذي الجديد', field: 'executiveOrderNewNo' }),
	new GridColumnOptions({ headerName: 'تاريخ صدور الامر التنفيذي القديم', field: 'issuanceExecutiveOrderDate' }),
	new GridColumnOptions({ headerName: ' رقم الامر التنفيذي القديم', field: 'executiveOrderNumber' }),
	new GridColumnOptions({ headerName: 'رقم ملف التحقيق', field: 'investigationFileNumber' }),
	new GridColumnOptions({ headerName: 'كود الموظف', field: 'employeeCode' }),
	new GridColumnOptions({ headerName: 'تاريخ اخطار المتظلم', field: 'complainantDateNotification' }),
	new GridColumnOptions({ headerName: 'تاريخ حفظ الموضوع', field: 'savedTopicDate' }),
	new GridColumnOptions({ headerName: 'الجزاء بعد التعديل', field: 'penaltyAfterAmendment' }),
	new GridColumnOptions({ headerName: '  قرار رئيس الهيئة', field: 'decisionChairmanCommission' }),
	new GridColumnOptions({ headerName: 'كود الفرع', field: 'branchCode' }),
	new GridColumnOptions({ headerName: 'كود جهة التظلم', field: 'grievanceDestinationCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: GrievancesViewComponent,
    editDialogClassType: GrievancesEditComponent,
    newDialogClassType: GrievancesNewComponent,
  });
    constructor(
        injector: Injector,
        public grievancesService: GrievancesService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedGrievances = new Grievances();

    
	this.grievanceDestinationCodeSelectOptions = new MaterialSelectOptions({
	 data: this.departmentsSectionsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود جهة التظلم',
	});

	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الفرع',
	});

	this.decisionChairmanCommissionSelectOptions = new MaterialSelectOptions({
	 data: this.commissionChairmanDecisionsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: '  قرار رئيس الهيئة',
	});

	this.penaltyAfterAmendmentSelectOptions = new MaterialSelectOptions({
	 data: this.sanctionsAndTheirCausesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الجزاء بعد التعديل',
	});


    this.searchForm = this.formBuilder.group({
     	fileNumber : [],
	employeeCode : [],
	investigationFileNumber : [],
	executiveOrderNumber : [],
	issuanceExecutiveOrderDate : [],
	grievanceSubject : [],
	executiveOrderNewNo : [],
	executiveOrderNewDate : [],
	containedArchiveDate : [],
	incomingNumber : [],
	receivedDate : [],
	lawyerCode : [],
	referralDate : [],
	grievanceSearchHistory : [],
	grievanceSearchResult : [],
	presentationChairmanCommissionDate : [],
	chairmanDecisionDate : [],
	notificationAffairsDate : [],
	complainantDateNotification : [],
	savedTopicDate : [],
	grievanceDestinationCode : [],
	branchCode : [],
	decisionChairmanCommission : [],
	penaltyAfterAmendment : []
    });

     
  }

  getGrievancesPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<Grievances[]> => {
    return this.grievancesService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.grievancesService.delete(param.data.id)
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
    this.departmentsSectionsService = new LookupService('departmentssections', this.http);
this.branchCodesService = new LookupService('branchcodes', this.http);
this.commissionChairmanDecisionsService = new LookupService('commissionchairmandecisions', this.http);
this.sanctionsAndTheirCausesService = new LookupService('sanctionsandtheircauses', this.http);
  }
}

