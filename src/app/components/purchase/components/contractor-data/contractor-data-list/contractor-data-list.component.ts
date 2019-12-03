
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { ContractorData } from 'app/shared/models/contractor-data';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ContractorDataEditComponent } from '../contractor-data-edit/contractor-data-edit.component';
import { ContractorDataNewComponent } from '../contractor-data-new/contractor-data-new.component';
import { ContractorDataViewComponent } from '../contractor-data-view/contractor-data-view.component';
import { ContractorDataService } from '../shared/contractor-data.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-contractor-data-list',
  templateUrl: './contractor-data-list.component.html',
  styleUrls: ['./contractor-data-list.component.scss'],
  providers: []
})

export class ContractorDataListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private supplierClassificationsService: LookupService;
private supplierTypesService: LookupService;
private sectionsOrCentersService: LookupService;

private supplierRecordTypesService: LookupService;

  
categorySelectOptions: MaterialSelectOptions;
resourceTypeSelectOptions: MaterialSelectOptions;
issuerSelectOptions: MaterialSelectOptions;
issuerOfTaxCardSelectOptions: MaterialSelectOptions;
recordTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('category', { static: true }) CategorySelectComponent: MaterialSelectComponent;
	@ViewChild('resourceType', { static: true }) ResourceTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('issuer', { static: true }) IssuerSelectComponent: MaterialSelectComponent;
	@ViewChild('issuerOfTaxCard', { static: true }) IssuerOfTaxCardSelectComponent: MaterialSelectComponent;
	@ViewChild('recordType', { static: true }) RecordTypeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedContractorData: ContractorData;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود المورد', field: 'supplierCode' }),
	new GridColumnOptions({ headerName: 'رقم القيد', field: 'constraintNumber' }),
	new GridColumnOptions({ headerName: 'رقم البطاقة الضريبية', field: 'taxCardNumber' }),
	new GridColumnOptions({ headerName: 'رقم بطاقة المدير المسؤول', field: 'managerCardCode' }),
	new GridColumnOptions({ headerName: 'بيان المقاولين', field: 'statement' }),
	new GridColumnOptions({ headerName: 'رقم تليفون المورد', field: 'phoneNumber' }),
	new GridColumnOptions({ headerName: 'عنوان المورد', field: 'resourceAddress' }),
	new GridColumnOptions({ headerName: 'اسم المدير المسؤول', field: 'administratorName' }),
	new GridColumnOptions({ headerName: 'اسم صاحب النشاط', field: 'ownerName' }),
	new GridColumnOptions({ headerName: 'اسم الشركة', field: 'companyName' }),
	new GridColumnOptions({ headerName: 'المنطقة', field: 'region' }),
	new GridColumnOptions({ headerName: 'قائمة سوداء', field: 'blackList' }),
	new GridColumnOptions({ headerName: 'نوع السجل', field: 'recordType' }),
	new GridColumnOptions({ headerName: 'جهة اصدار البطاقة الضريبية', field: 'issuerOfTaxCard' }),
	new GridColumnOptions({ headerName: 'جهة الاصدار', field: 'issuer' }),
	new GridColumnOptions({ headerName: 'نوع المورد', field: 'resourceType' }),
	new GridColumnOptions({ headerName: 'التصنيف', field: 'category' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: ContractorDataViewComponent,
    editDialogClassType: ContractorDataEditComponent,
    newDialogClassType: ContractorDataNewComponent,
  });
    constructor(
        injector: Injector,
        public contractorDataService: ContractorDataService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedContractorData = new ContractorData();

    
	this.categorySelectOptions = new MaterialSelectOptions({
	 data: this.supplierClassificationsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'التصنيف',
	});

	this.resourceTypeSelectOptions = new MaterialSelectOptions({
	 data: this.supplierTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع المورد',
	});

	this.issuerSelectOptions = new MaterialSelectOptions({
	 data: this.sectionsOrCentersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'جهة الاصدار',
	});

	this.issuerOfTaxCardSelectOptions = new MaterialSelectOptions({
	 data: this.sectionsOrCentersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'جهة اصدار البطاقة الضريبية',
	});

	this.recordTypeSelectOptions = new MaterialSelectOptions({
	 data: this.supplierRecordTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع السجل',
	});


    this.searchForm = this.formBuilder.group({
     	supplierCode : [],
	companyName : [],
	ownerName : [],
	administratorName : [],
	resourceAddress : [],
	region : [],
	phoneNumber : [],
	managerCardCode : [],
	taxCardNumber : [],
	constraintNumber : [],
	statement : [],
	blackList : [],
	category : [],
	resourceType : [],
	issuer : [],
	issuerOfTaxCard : [],
	recordType : []
    });

     
  }

  getContractorsDataPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<ContractorData[]> => {
    return this.contractorDataService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.contractorDataService.delete(param.data.id)
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
    this.supplierClassificationsService = new LookupService('supplierclassifications', this.http);
this.supplierTypesService = new LookupService('suppliertypes', this.http);
this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
this.supplierRecordTypesService = new LookupService('supplierrecordtypes', this.http);
  }
}

