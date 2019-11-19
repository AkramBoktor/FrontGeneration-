
import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { GridColumnOptions, GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { FormControlError, GridPaginatedSortedFiltered } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { DifferentFormAddedButNotExtracted } from 'app/shared/models/different-form-added-but-not-extracted';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { DifferentFormAddedButNotExtractedEditComponent } from '../different-form-added-but-not-extracted-edit/different-form-added-but-not-extracted-edit.component';
import { DifferentFormAddedButNotExtractedNewComponent } from '../different-form-added-but-not-extracted-new/different-form-added-but-not-extracted-new.component';
import { DifferentFormAddedButNotExtractedViewComponent } from '../different-form-added-but-not-extracted-view/different-form-added-but-not-extracted-view.component';
import { DifferentFormAddedButNotExtractedService } from '../shared/different-form-added-but-not-extracted.service';

@Component({
  selector: 'app-different-form-added-but-not-extracted-list',
  templateUrl: './different-form-added-but-not-extracted-list.component.html',
  styleUrls: ['./different-form-added-but-not-extracted-list.component.scss'],
  providers: []
})

export class DifferentFormAddedButNotExtractedListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private areasService: LookupService;
private sectionsOrCentersService: LookupService;
private serialFormsService: LookupService;
private formSourcesService: LookupService;
private entityTypeService: LookupService;
private entityCodesService: LookupService;
private offeringTypesService: LookupService;
private bankCodesService: LookupService;

  
regionSelectOptions: MaterialSelectOptions;
administrationSelectOptions: MaterialSelectOptions;
serialFormSelectOptions: MaterialSelectOptions;
sourceFormSelectOptions: MaterialSelectOptions;
destinationTypeSelectOptions: MaterialSelectOptions;
destinationCodeSelectOptions: MaterialSelectOptions;
offeringTypeSelectOptions: MaterialSelectOptions;
bankCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('region', { static: true }) RegionSelectComponent: MaterialSelectComponent;
	@ViewChild('administration', { static: true }) AdministrationSelectComponent: MaterialSelectComponent;
	@ViewChild('serialForm', { static: true }) SerialFormSelectComponent: MaterialSelectComponent;
	@ViewChild('sourceForm', { static: true }) SourceFormSelectComponent: MaterialSelectComponent;
	@ViewChild('destinationType', { static: true }) DestinationTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('destinationCode', { static: true }) DestinationCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('bankCode', { static: true }) BankCodeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedDifferentFormAddedButNotExtracted: DifferentFormAddedButNotExtracted;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'تاريخ الاستماره', field: 'dateForm' }),
	new GridColumnOptions({ headerName: 'مبلغ الاستماره ', field: 'formAmount' }),
	new GridColumnOptions({ headerName: 'كود المبنى', field: 'buildingCode' }),
	new GridColumnOptions({ headerName: 'رقم المناقصه', field: 'bidNumber' }),
	new GridColumnOptions({ headerName: 'رقم الحساب', field: 'accountNumber' }),
	new GridColumnOptions({ headerName: 'البيان', field: 'statement' }),
	new GridColumnOptions({ headerName: 'المنطقه', field: 'region' }),
	new GridColumnOptions({ headerName: 'الاداره', field: 'administration' }),
	new GridColumnOptions({ headerName: 'مسلسل الاستماره', field: 'serialForm' }),
	new GridColumnOptions({ headerName: 'مصدر الاستماره', field: 'sourceForm' }),
	new GridColumnOptions({ headerName: 'نوع الجهه', field: 'destinationType' }),
	new GridColumnOptions({ headerName: 'كود الجهه', field: 'destinationCode' }),
	new GridColumnOptions({ headerName: 'نوع الطرح', field: 'offeringType' }),
	new GridColumnOptions({ headerName: 'كود البنك', field: 'bankCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: DifferentFormAddedButNotExtractedViewComponent,
    editDialogClassType: DifferentFormAddedButNotExtractedEditComponent,
    newDialogClassType: DifferentFormAddedButNotExtractedNewComponent,
  });
    constructor(
        injector: Injector,
        public differentFormAddedButNotExtractedService: DifferentFormAddedButNotExtractedService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedDifferentFormAddedButNotExtracted = new DifferentFormAddedButNotExtracted();

    
	this.regionSelectOptions = new MaterialSelectOptions({
	 data: this.areasService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المنطقه',
	});

	this.administrationSelectOptions = new MaterialSelectOptions({
	 data: this.sectionsOrCentersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الاداره',
	});

	this.serialFormSelectOptions = new MaterialSelectOptions({
	 data: this.serialFormsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'مسلسل الاستماره',
	});

	this.sourceFormSelectOptions = new MaterialSelectOptions({
	 data: this.formSourcesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'مصدر الاستماره',
	});

	this.destinationTypeSelectOptions = new MaterialSelectOptions({
	 data: this.entityTypeService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الجهه',
	});

	this.destinationCodeSelectOptions = new MaterialSelectOptions({
	 data: this.entityCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الجهه',
	});

	this.offeringTypeSelectOptions = new MaterialSelectOptions({
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
	formAmount : [],
	buildingCode : [],
	bidNumber : [],
	accountNumber : [],
	statement : [],
	region : [],
	administration : [],
	serialForm : [],
	sourceForm : [],
	destinationType : [],
	destinationCode : [],
	offeringType : [],
	bankCode : []
    });

     
  }

  getDifferentFormsAddedButNotExtractedPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<DifferentFormAddedButNotExtracted[]> => {
    return this.differentFormAddedButNotExtractedService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.differentFormAddedButNotExtractedService.delete(param.data.id)
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
this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
this.serialFormsService = new LookupService('serialforms', this.http);
this.formSourcesService = new LookupService('formsources', this.http);
this.entityTypeService = new LookupService('entitytypes', this.http);
this.entityCodesService = new LookupService('entitycodes', this.http);
this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.bankCodesService = new LookupService('bankcodes', this.http);
  }
}

