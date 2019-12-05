
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { BidPartsData } from 'app/shared/models/bid-parts-data';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { BidPartsDataEditComponent } from '../bid-parts-data-edit/bid-parts-data-edit.component';
import { BidPartsDataNewComponent } from '../bid-parts-data-new/bid-parts-data-new.component';
import { BidPartsDataViewComponent } from '../bid-parts-data-view/bid-parts-data-view.component';
import { BidPartsDataService } from '../shared/bid-parts-data.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-bid-parts-data-list',
  templateUrl: './bid-parts-data-list.component.html',
  styleUrls: ['./bid-parts-data-list.component.scss'],
  providers: []
})

export class BidPartsDataListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private buildingTypesService: LookupService;
private offeringTypesService: LookupService;
private maintenanceStatusesService: LookupService;
private constructionTypesService: LookupService;
private governoratesService: LookupService;

  
buildingTypeSelectOptions: MaterialSelectOptions;
offeringTypeSelectOptions: MaterialSelectOptions;
maintenanceStatusSelectOptions: MaterialSelectOptions;
constructionTypeSelectOptions: MaterialSelectOptions;
governorateSelectOptions: MaterialSelectOptions;

  
	@ViewChild('buildingType', { static: true }) BuildingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('maintenanceStatus', { static: true }) MaintenanceStatusSelectComponent: MaterialSelectComponent;
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('governorate', { static: true }) GovernorateSelectComponent: MaterialSelectComponent;

  
  @Input() selectedBidPartsData: BidPartsData;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'تاريخ الاستلام الابتدائي', field: 'primaryReceipDate' }),
	new GridColumnOptions({ headerName: 'حالة المشروع', field: 'projectState' }),
	new GridColumnOptions({ headerName: 'التامين النهائي', field: 'finalInsurance' }),
	new GridColumnOptions({ headerName: 'طريقة السداد', field: 'paymentMethod' }),
	new GridColumnOptions({ headerName: 'قيمة الدفعة المنصرفة', field: 'outgoingPayment' }),
	new GridColumnOptions({ headerName: 'علاوة الترسية', field: 'awardBonus' }),
	new GridColumnOptions({ headerName: 'القيمة التعاقدية', field: 'contractualValue' }),
	new GridColumnOptions({ headerName: 'قيمة المقايسة', field: 'assayValue' }),
	new GridColumnOptions({ headerName: 'توصيف الضريبة', field: 'taxDescription' }),
	new GridColumnOptions({ headerName: 'تاريخ الاستلام النهائى', field: 'finalReceiptDate' }),
	new GridColumnOptions({ headerName: 'قيمة كراسة الشروط', field: 'bidRequirementsValue' }),
	new GridColumnOptions({ headerName: 'مدة التنفيذ/التوريد', field: 'implementationDurationOrSupply' }),
	new GridColumnOptions({ headerName: 'رقم المورد', field: 'supplierNumber' }),
	new GridColumnOptions({ headerName: 'تاريخ تسليم الموقع', field: 'siteDeliveryDate' }),
	new GridColumnOptions({ headerName: 'تاريخ فتح المظاريف', field: 'openingEnvelopesDate' }),
	new GridColumnOptions({ headerName: 'تاريخ الاسناد', field: 'referenceDate' }),
	new GridColumnOptions({ headerName: 'تاريخ لجنة البت', field: 'examinationCommitteeDate' }),
	new GridColumnOptions({ headerName: 'اسم المشروع', field: 'projectName' }),
	new GridColumnOptions({ headerName: 'المشروع / المجموعة', field: 'project' }),
	new GridColumnOptions({ headerName: 'رقم المناقصة', field: 'bidNumber' }),
	new GridColumnOptions({ headerName: 'نوع المبنى', field: 'buildingType' }),
	new GridColumnOptions({ headerName: 'نوع الانشاء', field: 'constructionType' }),
	new GridColumnOptions({ headerName: 'نوع الطرح', field: 'offeringType' }),
	new GridColumnOptions({ headerName: 'حالة الصيانة', field: 'maintenanceStatus' }),
	new GridColumnOptions({ headerName: 'المحافظة', field: 'governorate' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: BidPartsDataViewComponent,
    editDialogClassType: BidPartsDataEditComponent,
    newDialogClassType: BidPartsDataNewComponent,
  });
    constructor(
        injector: Injector,
        public bidPartsDataService: BidPartsDataService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedBidPartsData = new BidPartsData();

    
	this.buildingTypeSelectOptions = new MaterialSelectOptions({
	 data: this.buildingTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع المبنى',
	});

	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});

	this.maintenanceStatusSelectOptions = new MaterialSelectOptions({
	 data: this.maintenanceStatusesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حالة الصيانة',
	});

	this.constructionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.constructionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الانشاء',
	});

	this.governorateSelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المحافظة',
	});


    this.searchForm = this.formBuilder.group({
     	bidNumber : [],
	project : [],
	projectName : [],
	examinationCommitteeDate : [],
	referenceDate : [],
	openingEnvelopesDate : [],
	siteDeliveryDate : [],
	supplierNumber : [],
	implementationDurationOrSupply : [],
	bidRequirementsValue : [],
	taxDescription : [],
	assayValue : [],
	contractualValue : [],
	awardBonus : [],
	outgoingPayment : [],
	paymentMethod : [],
	finalInsurance : [],
	projectState : [],
	primaryReceipDate : [],
	finalReceiptDate : [],
	buildingType : [],
	offeringType : [],
	maintenanceStatus : [],
	constructionType : [],
	governorate : []
    });

     
  }

  getBidsPartsDataPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<BidPartsData[]> => {
    return this.bidPartsDataService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.bidPartsDataService.delete(param.data.id)
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
    this.buildingTypesService = new LookupService('buildingtypes', this.http);
this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.maintenanceStatusesService = new LookupService('maintenancestatuses', this.http);
this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.governoratesService = new LookupService('governorates', this.http);
  }
}

