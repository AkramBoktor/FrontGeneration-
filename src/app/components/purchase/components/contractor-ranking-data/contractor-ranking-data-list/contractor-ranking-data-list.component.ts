
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { ContractorRankingData } from 'app/shared/models/contractor-ranking-data';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ContractorRankingDataEditComponent } from '../contractor-ranking-data-edit/contractor-ranking-data-edit.component';
import { ContractorRankingDataNewComponent } from '../contractor-ranking-data-new/contractor-ranking-data-new.component';
import { ContractorRankingDataViewComponent } from '../contractor-ranking-data-view/contractor-ranking-data-view.component';
import { ContractorRankingDataService } from '../shared/contractor-ranking-data.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-contractor-ranking-data-list',
  templateUrl: './contractor-ranking-data-list.component.html',
  styleUrls: ['./contractor-ranking-data-list.component.scss'],
  providers: []
})

export class ContractorRankingDataListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private offeringTypesService: LookupService;
private constructionTypesService: LookupService;
private classificationFieldCodesService: LookupService;
private classificationValueCodesService: LookupService;

  
offeringTypeSelectOptions: MaterialSelectOptions;
constructionTypeSelectOptions: MaterialSelectOptions;
classificationCodeSelectOptions: MaterialSelectOptions;
classificationValueCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('classificationCode', { static: true }) ClassificationCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('classificationValueCode', { static: true }) ClassificationValueCodeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedContractorRankingData: ContractorRankingData;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم المناقصة', field: 'bidNumber' }),
	new GridColumnOptions({ headerName: 'رقم المشروع', field: 'projectNumber' }),
	new GridColumnOptions({ headerName: 'كود المقاول', field: 'contractorCode' }),
	new GridColumnOptions({ headerName: 'اجمالي قيمه الاعمال الجاريه', field: 'ongoingBusinessTotalValue' }),
	new GridColumnOptions({ headerName: 'رقم بطاقه التصنيف', field: 'classificationCardNumber' }),
	new GridColumnOptions({ headerName: 'تاريخ بطاقه التصنيف', field: 'dateCardRating' }),
	new GridColumnOptions({ headerName: 'القرار', field: 'decision' }),
	new GridColumnOptions({ headerName: 'سبب عدم المطابقه', field: 'reason' }),
	new GridColumnOptions({ headerName: 'نوع الطرح', field: 'offeringType' }),
	new GridColumnOptions({ headerName: 'نوع الانشاء', field: 'constructionType' }),
	new GridColumnOptions({ headerName: 'كود مجال التصنيف', field: 'classificationCode' }),
	new GridColumnOptions({ headerName: 'كود قيمه التصنيف', field: 'classificationValueCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: ContractorRankingDataViewComponent,
    editDialogClassType: ContractorRankingDataEditComponent,
    newDialogClassType: ContractorRankingDataNewComponent,
  });
    constructor(
        injector: Injector,
        public contractorRankingDataService: ContractorRankingDataService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedContractorRankingData = new ContractorRankingData();

    
	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});

	this.constructionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.constructionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الانشاء',
	});

	this.classificationCodeSelectOptions = new MaterialSelectOptions({
	 data: this.classificationFieldCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود مجال التصنيف',
	});

	this.classificationValueCodeSelectOptions = new MaterialSelectOptions({
	 data: this.classificationValueCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود قيمه التصنيف',
	});


    this.searchForm = this.formBuilder.group({
     	bidNumber : [],
	projectNumber : [],
	contractorCode : [],
	ongoingBusinessTotalValue : [],
	classificationCardNumber : [],
	dateCardRating : [],
	decision : [],
	reason : [],
	offeringType : [],
	constructionType : [],
	classificationCode : [],
	classificationValueCode : []
    });

     
  }

  getContractorsRankingDataPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<ContractorRankingData[]> => {
    return this.contractorRankingDataService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.contractorRankingDataService.delete(param.data.id)
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
this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.classificationFieldCodesService = new LookupService('classificationfieldcodes', this.http);
this.classificationValueCodesService = new LookupService('classificationvaluecodes', this.http);
  }
}

