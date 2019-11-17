
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { ExpropriationDataAfterThePrimeMinisterDecision } from 'app/shared/models/expropriation-data-after-the-prime-minister-decision';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ExpropriationDataAfterThePrimeMinisterDecisionEditComponent } from '../expropriation-data-after-the-prime-minister-decision-edit/expropriation-data-after-the-prime-minister-decision-edit.component';
import { ExpropriationDataAfterThePrimeMinisterDecisionNewComponent } from '../expropriation-data-after-the-prime-minister-decision-new/expropriation-data-after-the-prime-minister-decision-new.component';
import { ExpropriationDataAfterThePrimeMinisterDecisionViewComponent } from '../expropriation-data-after-the-prime-minister-decision-view/expropriation-data-after-the-prime-minister-decision-view.component';
import { ExpropriationDataAfterThePrimeMinisterDecisionService } from '../shared/expropriation-data-after-the-prime-minister-decision.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-expropriation-data-after-the-prime-minister-decision-list',
  templateUrl: './expropriation-data-after-the-prime-minister-decision-list.component.html',
  styleUrls: ['./expropriation-data-after-the-prime-minister-decision-list.component.scss'],
  providers: []
})

export class ExpropriationDataAfterThePrimeMinisterDecisionListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private branchCodesService: LookupService;
private decisionNumbersService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;
resolutionNumberSelectOptions: MaterialSelectOptions;

  
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('resolutionNumber', { static: true }) ResolutionNumberSelectComponent: MaterialSelectComponent;

  
  @Input() selectedExpropriationDataAfterThePrimeMinisterDecision: ExpropriationDataAfterThePrimeMinisterDecision;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود المبنى', field: 'buildingCode' }),
	new GridColumnOptions({ headerName: 'تاريخ القرار', field: 'dateOfBecision' }),
	new GridColumnOptions({ headerName: 'عدد النشر في الجريده الرسمية', field: 'numberOfPublicationInTheOfficialGazette' }),
	new GridColumnOptions({ headerName: 'تاريخ النشر في الجريده الرسمية', field: 'dateOfPublicationInTheOfficialGazette' }),
	new GridColumnOptions({ headerName: 'مشروع تربيه وتعليم', field: 'educationProject' }),
	new GridColumnOptions({ headerName: 'عدد الملاك في كشوف العرض', field: 'theNumberOfOwnersInThePresentationStatements' }),
	new GridColumnOptions({ headerName: 'سعر المتر في كشوف العرض', field: 'thePriceOfAMeterInTheSupplyStatements' }),
	new GridColumnOptions({ headerName: 'تاريخ من في كشوف العرض ', field: 'dateFromThePresentationLists' }),
	new GridColumnOptions({ headerName: 'تاريخ الي في كشوف العرض ', field: 'dateToOfThePresentationStatements' }),
	new GridColumnOptions({ headerName: 'عدد استمارات البيع', field: 'numberOfSalesForms' }),
	new GridColumnOptions({ headerName: 'كود الفرع', field: 'branchCode' }),
	new GridColumnOptions({ headerName: 'رقم القرار', field: 'resolutionNumber' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: ExpropriationDataAfterThePrimeMinisterDecisionViewComponent,
    editDialogClassType: ExpropriationDataAfterThePrimeMinisterDecisionEditComponent,
    newDialogClassType: ExpropriationDataAfterThePrimeMinisterDecisionNewComponent,
  });
    constructor(
        injector: Injector,
        public expropriationDataAfterThePrimeMinisterDecisionService: ExpropriationDataAfterThePrimeMinisterDecisionService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedExpropriationDataAfterThePrimeMinisterDecision = new ExpropriationDataAfterThePrimeMinisterDecision();

    
	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الفرع',
	});

	this.resolutionNumberSelectOptions = new MaterialSelectOptions({
	 data: this.decisionNumbersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'رقم القرار',
	});


    this.searchForm = this.formBuilder.group({
     	buildingCode : [],
	dateOfBecision : [],
	numberOfPublicationInTheOfficialGazette : [],
	dateOfPublicationInTheOfficialGazette : [],
	educationProject : [],
	theNumberOfOwnersInThePresentationStatements : [],
	thePriceOfAMeterInTheSupplyStatements : [],
	dateFromThePresentationLists : [],
	dateToOfThePresentationStatements : [],
	numberOfSalesForms : [],
	branchCode : [],
	resolutionNumber : []
    });

     
  }

  getExpropriationDataAfterThePrimeMinisterDecisionPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<ExpropriationDataAfterThePrimeMinisterDecision[]> => {
    return this.expropriationDataAfterThePrimeMinisterDecisionService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.expropriationDataAfterThePrimeMinisterDecisionService.delete(param.data.id)
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
this.decisionNumbersService = new LookupService('decisionnumbers', this.http);
  }
}

