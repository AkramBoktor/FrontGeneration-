
import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { GridColumnOptions, GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { FormControlError, GridPaginatedSortedFiltered } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { LawsuitSessionsArbitration } from 'app/shared/models/lawsuit-sessions-arbitration';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { LawsuitSessionsArbitrationEditComponent } from '../lawsuit-sessions-arbitration-edit/lawsuit-sessions-arbitration-edit.component';
import { LawsuitSessionsArbitrationNewComponent } from '../lawsuit-sessions-arbitration-new/lawsuit-sessions-arbitration-new.component';
import { LawsuitSessionsArbitrationViewComponent } from '../lawsuit-sessions-arbitration-view/lawsuit-sessions-arbitration-view.component';
import { LawsuitSessionsArbitrationService } from '../shared/lawsuit-sessions-arbitration.service';

@Component({
  selector: 'app-lawsuit-sessions-arbitration-list',
  templateUrl: './lawsuit-sessions-arbitration-list.component.html',
  styleUrls: ['./lawsuit-sessions-arbitration-list.component.scss'],
  providers: []
})

export class LawsuitSessionsArbitrationListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private branchCodesService: LookupService;
private entityTypeService: LookupService;
private courtCodesService: LookupService;
private bodyAttributesService: LookupService;
private arbitrationClassificationsService: LookupService;
private discountTypesService: LookupService;
private discountCodesService: LookupService;
private arbitrationTopicCodesService: LookupService;
private arbitratorsService: LookupService;
private technicalMembersService: LookupService;
private legalMemberService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;
entityTypeSelectOptions: MaterialSelectOptions;
arbitrationCodeSelectOptions: MaterialSelectOptions;
whoIsSelectOptions: MaterialSelectOptions;
arbitrationClassificationSelectOptions: MaterialSelectOptions;
discountTypeSelectOptions: MaterialSelectOptions;
codeSelectOptions: MaterialSelectOptions;
arbitrationTextSelectOptions: MaterialSelectOptions;
arbitratorSelectOptions: MaterialSelectOptions;
technicalMemberSelectOptions: MaterialSelectOptions;
legalMemberSelectOptions: MaterialSelectOptions;

  
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('entityType', { static: true }) EntityTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('arbitrationCode', { static: true }) ArbitrationCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('whoIs', { static: true }) WhoIsSelectComponent: MaterialSelectComponent;
	@ViewChild('arbitrationClassification', { static: true }) ArbitrationClassificationSelectComponent: MaterialSelectComponent;
	@ViewChild('discountType', { static: true }) DiscountTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('code', { static: true }) CodeSelectComponent: MaterialSelectComponent;
	@ViewChild('arbitrationText', { static: true }) ArbitrationTextSelectComponent: MaterialSelectComponent;
	@ViewChild('arbitrator', { static: true }) ArbitratorSelectComponent: MaterialSelectComponent;
	@ViewChild('technicalMember', { static: true }) TechnicalMemberSelectComponent: MaterialSelectComponent;
	@ViewChild('legalMember', { static: true }) LegalMemberSelectComponent: MaterialSelectComponent;

  
  @Input() selectedLawsuitSessionsArbitration: LawsuitSessionsArbitration;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم الملف', field: 'fileNumber' }),
	new GridColumnOptions({ headerName: 'رقم التحكيم', field: 'arbitrationNumber' }),
	new GridColumnOptions({ headerName: 'لسنة', field: 'year' }),
	new GridColumnOptions({ headerName: 'تاريخ الجلسة', field: 'sessionDate' }),
	new GridColumnOptions({ headerName: 'كود الفرع', field: 'branchCode' }),
	new GridColumnOptions({ headerName: 'نوع الجهة', field: 'entityType' }),
	new GridColumnOptions({ headerName: 'كود جهة التحكيم', field: 'arbitrationCode' }),
	new GridColumnOptions({ headerName: 'صفة الهيئة', field: 'whoIs' }),
	new GridColumnOptions({ headerName: 'تصنيف التحكيم', field: 'arbitrationClassification' }),
	new GridColumnOptions({ headerName: 'نوع الخصم', field: 'discountType' }),
	new GridColumnOptions({ headerName: 'كود الخصم', field: 'code' }),
	new GridColumnOptions({ headerName: 'موضوع التحكيم', field: 'arbitrationText' }),
	new GridColumnOptions({ headerName: 'المحكم', field: 'arbitrator' }),
	new GridColumnOptions({ headerName: 'العضو الفني', field: 'technicalMember' }),
	new GridColumnOptions({ headerName: 'العضو القانوني', field: 'legalMember' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: LawsuitSessionsArbitrationViewComponent,
    editDialogClassType: LawsuitSessionsArbitrationEditComponent,
    newDialogClassType: LawsuitSessionsArbitrationNewComponent,
  });
    constructor(
        injector: Injector,
        public lawsuitSessionsArbitrationService: LawsuitSessionsArbitrationService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedLawsuitSessionsArbitration = new LawsuitSessionsArbitration();

    
	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الفرع',
	});

	this.entityTypeSelectOptions = new MaterialSelectOptions({
	 data: this.entityTypeService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الجهة',
	});

	this.arbitrationCodeSelectOptions = new MaterialSelectOptions({
	 data: this.courtCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود جهة التحكيم',
	});

	this.whoIsSelectOptions = new MaterialSelectOptions({
	 data: this.bodyAttributesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'صفة الهيئة',
	});

	this.arbitrationClassificationSelectOptions = new MaterialSelectOptions({
	 data: this.arbitrationClassificationsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'تصنيف التحكيم',
	});

	this.discountTypeSelectOptions = new MaterialSelectOptions({
	 data: this.discountTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الخصم',
	});

	this.codeSelectOptions = new MaterialSelectOptions({
	 data: this.discountCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الخصم',
	});

	this.arbitrationTextSelectOptions = new MaterialSelectOptions({
	 data: this.arbitrationTopicCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'موضوع التحكيم',
	});

	this.arbitratorSelectOptions = new MaterialSelectOptions({
	 data: this.arbitratorsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المحكم',
	});

	this.technicalMemberSelectOptions = new MaterialSelectOptions({
	 data: this.technicalMembersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'العضو الفني',
	});

	this.legalMemberSelectOptions = new MaterialSelectOptions({
	 data: this.legalMemberService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'العضو القانوني',
	});


    this.searchForm = this.formBuilder.group({
     	fileNumber : [],
	arbitrationNumber : [],
	year : [],
	sessionDate : [],
	branchCode : [],
	entityType : [],
	arbitrationCode : [],
	whoIs : [],
	arbitrationClassification : [],
	discountType : [],
	code : [],
	arbitrationText : [],
	arbitrator : [],
	technicalMember : [],
	legalMember : []
    });

     
  }

  getLawsuitSessionsArbitrationPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<LawsuitSessionsArbitration[]> => {
    return this.lawsuitSessionsArbitrationService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.lawsuitSessionsArbitrationService.delete(param.data.id)
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
this.entityTypeService = new LookupService('entitytypes', this.http);
this.courtCodesService = new LookupService('courtcodes', this.http);
this.bodyAttributesService = new LookupService('bodyattributes', this.http);
this.arbitrationClassificationsService = new LookupService('arbitrationclassifications', this.http);
this.discountTypesService = new LookupService('discounttypes', this.http);
this.discountCodesService = new LookupService('discountcodes', this.http);
this.arbitrationTopicCodesService = new LookupService('arbitrationtopiccodes', this.http);
this.arbitratorsService = new LookupService('arbitrators', this.http);
this.technicalMembersService = new LookupService('technicalmembers', this.http);
this.legalMemberService = new LookupService('legalmembers', this.http);
  }
}

