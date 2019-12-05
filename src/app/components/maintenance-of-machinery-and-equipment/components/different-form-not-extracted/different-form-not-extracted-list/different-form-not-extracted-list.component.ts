
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { DifferentFormNotExtracted } from 'app/shared/models/different-form-not-extracted';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { DifferentFormNotExtractedEditComponent } from '../different-form-not-extracted-edit/different-form-not-extracted-edit.component';
import { DifferentFormNotExtractedNewComponent } from '../different-form-not-extracted-new/different-form-not-extracted-new.component';
import { DifferentFormNotExtractedViewComponent } from '../different-form-not-extracted-view/different-form-not-extracted-view.component';
import { DifferentFormNotExtractedService } from '../shared/different-form-not-extracted.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-different-form-not-extracted-list',
  templateUrl: './different-form-not-extracted-list.component.html',
  styleUrls: ['./different-form-not-extracted-list.component.scss'],
  providers: []
})

export class DifferentFormNotExtractedListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private areasService: LookupService;
private centralDepartmentsService: LookupService;
private formSourcesService: LookupService;
private entityTypesService: LookupService;
private entityCodesService: LookupService;
private offeringTypesService: LookupService;
private bankCodesService: LookupService;

  
regionSelectOptions: MaterialSelectOptions;
administrationSelectOptions: MaterialSelectOptions;
formSourceSelectOptions: MaterialSelectOptions;
destinationTypeSelectOptions: MaterialSelectOptions;
destinationCodeSelectOptions: MaterialSelectOptions;
subtractionTypeSelectOptions: MaterialSelectOptions;
bankCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('region', { static: true }) RegionSelectComponent: MaterialSelectComponent;
	@ViewChild('administration', { static: true }) AdministrationSelectComponent: MaterialSelectComponent;
	@ViewChild('formSource', { static: true }) FormSourceSelectComponent: MaterialSelectComponent;
	@ViewChild('destinationType', { static: true }) DestinationTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('destinationCode', { static: true }) DestinationCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('subtractionType', { static: true }) SubtractionTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('bankCode', { static: true }) BankCodeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedDifferentFormNotExtracted: DifferentFormNotExtracted;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'تاريخ الاستماه', field: 'dateForm' }),
	new GridColumnOptions({ headerName: 'مسلسل الاستماره', field: 'formNumber' }),
	new GridColumnOptions({ headerName: 'مبلغ الاستماره', field: 'formPrice' }),
	new GridColumnOptions({ headerName: 'كود المبنى', field: 'buildingCode' }),
	new GridColumnOptions({ headerName: 'رقم المناقصه', field: 'bidNumber' }),
	new GridColumnOptions({ headerName: 'رقم الحساب', field: 'accountNumber' }),
	new GridColumnOptions({ headerName: 'البيان', field: 'statement' }),
	new GridColumnOptions({ headerName: 'المنطقه', field: 'region' }),
	new GridColumnOptions({ headerName: 'الاداره', field: 'administration' }),
	new GridColumnOptions({ headerName: 'مصدر الاستماره', field: 'formSource' }),
	new GridColumnOptions({ headerName: 'نوع الجهه', field: 'destinationType' }),
	new GridColumnOptions({ headerName: 'كود الجهه', field: 'destinationCode' }),
	new GridColumnOptions({ headerName: 'نوع الطرح', field: 'subtractionType' }),
	new GridColumnOptions({ headerName: 'كود البنك', field: 'bankCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: DifferentFormNotExtractedViewComponent,
    editDialogClassType: DifferentFormNotExtractedEditComponent,
    newDialogClassType: DifferentFormNotExtractedNewComponent,
  });
    constructor(
        injector: Injector,
        public differentFormNotExtractedService: DifferentFormNotExtractedService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedDifferentFormNotExtracted = new DifferentFormNotExtracted();

    
	this.regionSelectOptions = new MaterialSelectOptions({
	 data: this.areasService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المنطقه',
	});

	this.administrationSelectOptions = new MaterialSelectOptions({
	 data: this.centralDepartmentsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الاداره',
	});

	this.formSourceSelectOptions = new MaterialSelectOptions({
	 data: this.formSourcesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'مصدر الاستماره',
	});

	this.destinationTypeSelectOptions = new MaterialSelectOptions({
	 data: this.entityTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الجهه',
	});

	this.destinationCodeSelectOptions = new MaterialSelectOptions({
	 data: this.entityCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الجهه',
	});

	this.subtractionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});

	this.bankCodeSelectOptions = new MaterialSelectOptions({
	 data: this.bankCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود البنك',
	});


    this.searchForm = this.formBuilder.group({
     	dateForm : [],
	formNumber : [],
	formPrice : [],
	buildingCode : [],
	bidNumber : [],
	accountNumber : [],
	statement : [],
	region : [],
	administration : [],
	formSource : [],
	destinationType : [],
	destinationCode : [],
	subtractionType : [],
	bankCode : []
    });

     
  }

  getDifferentFormsNotExtractedPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<DifferentFormNotExtracted[]> => {
    return this.differentFormNotExtractedService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.differentFormNotExtractedService.delete(param.data.id)
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
    this.areasService = new LookupService('areas', this.http);
this.centralDepartmentsService = new LookupService('centraldepartments', this.http);
this.formSourcesService = new LookupService('formsources', this.http);
this.entityTypesService = new LookupService('entitytypes', this.http);
this.entityCodesService = new LookupService('entitycodes', this.http);
this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.bankCodesService = new LookupService('bankcodes', this.http);
  }
}

