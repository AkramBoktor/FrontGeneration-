
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { ExpropriationBeforeDecision } from 'app/shared/models/expropriation-before-decision';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ExpropriationBeforeDecisionEditComponent } from '../expropriation-before-decision-edit/expropriation-before-decision-edit.component';
import { ExpropriationBeforeDecisionNewComponent } from '../expropriation-before-decision-new/expropriation-before-decision-new.component';
import { ExpropriationBeforeDecisionViewComponent } from '../expropriation-before-decision-view/expropriation-before-decision-view.component';
import { ExpropriationBeforeDecisionService } from '../shared/expropriation-before-decision.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-expropriation-before-decision-list',
  templateUrl: './expropriation-before-decision-list.component.html',
  styleUrls: ['./expropriation-before-decision-list.component.scss'],
  providers: []
})

export class ExpropriationBeforeDecisionListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private branchCodesService: LookupService;
private removalTypesService: LookupService;
private removalApplicantsService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;
typeOfRemovalSelectOptions: MaterialSelectOptions;
applicantHandRemovalSelectOptions: MaterialSelectOptions;

  
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('typeOfRemoval', { static: true }) TypeOfRemovalSelectComponent: MaterialSelectComponent;
	@ViewChild('applicantHandRemoval', { static: true }) ApplicantHandRemovalSelectComponent: MaterialSelectComponent;

  
  @Input() selectedExpropriationBeforeDecision: ExpropriationBeforeDecision;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم الشيك التعويض المبدئي', field: 'initialCompensationCheckNumber' }),
	new GridColumnOptions({ headerName: 'قيمة التعويض المبدئي', field: 'initialCompensationAmount' }),
	new GridColumnOptions({ headerName: 'سعر المتر للارض محضر الممارسة', field: 'pricePerMeterOfLandRecordOfPractice' }),
	new GridColumnOptions({ headerName: 'تاريخ محضر الممارسة', field: 'dateOfPracticeRecord' }),
	new GridColumnOptions({ headerName: 'سعر المتر للارض عقود المثل', field: 'thePricePerSquareMeterOfTheLandContracts' }),
	new GridColumnOptions({ headerName: 'تاريخ عقود المثل', field: 'historyOfParableContracts' }),
	new GridColumnOptions({ headerName: 'رقم الشهر العقاري عقود المثل', field: 'numberMortgagecontractsParagon' }),
	new GridColumnOptions({ headerName: 'الرقم التعريفي عقود المثل', field: 'idIdealContracts' }),
	new GridColumnOptions({ headerName: 'التاريخ التعويض المبدئي', field: 'initialCompensationDate' }),
	new GridColumnOptions({ headerName: 'اجمالي تقرير استشاري المساحة', field: 'totalSurveyReport' }),
	new GridColumnOptions({ headerName: 'سعر المتر للارض تقرير استشاري المساحة', field: 'pricePerSquareMeterOfLandConsultantReport' }),
	new GridColumnOptions({ headerName: 'تاريخ تقرير استشاري المساحة', field: 'dateOfTheConsultantSurveyReport' }),
	new GridColumnOptions({ headerName: 'موقف الاستخدام', field: 'usePosition' }),
	new GridColumnOptions({ headerName: 'المساحة بعد التنظيم', field: 'spaceAfterOrganization' }),
	new GridColumnOptions({ headerName: 'المساحة قبل التنظيم', field: 'spaceBeforeRegulation' }),
	new GridColumnOptions({ headerName: 'المساحة', field: 'space' }),
	new GridColumnOptions({ headerName: 'كود المبنى', field: 'buildingCode' }),
	new GridColumnOptions({ headerName: 'سعر المبني تقرير استشاري المساحة', field: 'priceOfTheBuildingConsultantReportArea' }),
	new GridColumnOptions({ headerName: 'كود الفرع', field: 'branchCode' }),
	new GridColumnOptions({ headerName: 'نوع النزع', field: 'typeOfRemoval' }),
	new GridColumnOptions({ headerName: 'جهة طالبة النزع', field: 'applicantHandRemoval' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: ExpropriationBeforeDecisionViewComponent,
    editDialogClassType: ExpropriationBeforeDecisionEditComponent,
    newDialogClassType: ExpropriationBeforeDecisionNewComponent,
  });
    constructor(
        injector: Injector,
        public expropriationBeforeDecisionService: ExpropriationBeforeDecisionService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedExpropriationBeforeDecision = new ExpropriationBeforeDecision();

    
	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الفرع',
	});

	this.typeOfRemovalSelectOptions = new MaterialSelectOptions({
	 data: this.removalTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع النزع',
	});

	this.applicantHandRemovalSelectOptions = new MaterialSelectOptions({
	 data: this.removalApplicantsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'جهة طالبة النزع',
	});


    this.searchForm = this.formBuilder.group({
     	initialCompensationCheckNumber : [],
	initialCompensationAmount : [],
	pricePerMeterOfLandRecordOfPractice : [],
	dateOfPracticeRecord : [],
	thePricePerSquareMeterOfTheLandContracts : [],
	historyOfParableContracts : [],
	numberMortgagecontractsParagon : [],
	idIdealContracts : [],
	initialCompensationDate : [],
	totalSurveyReport : [],
	pricePerSquareMeterOfLandConsultantReport : [],
	dateOfTheConsultantSurveyReport : [],
	usePosition : [],
	spaceAfterOrganization : [],
	spaceBeforeRegulation : [],
	space : [],
	buildingCode : [],
	priceOfTheBuildingConsultantReportArea : [],
	branchCode : [],
	typeOfRemoval : [],
	applicantHandRemoval : []
    });

     
  }

  getExpropriationBeforeDecisionPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<ExpropriationBeforeDecision[]> => {
    return this.expropriationBeforeDecisionService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.expropriationBeforeDecisionService.delete(param.data.id)
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
this.removalTypesService = new LookupService('removaltypes', this.http);
this.removalApplicantsService = new LookupService('removalapplicants', this.http);
  }
}

