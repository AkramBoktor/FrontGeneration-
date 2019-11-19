
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { FinalClearanceCycle } from 'app/shared/models/final-clearance-cycle';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FinalClearanceCycleEditComponent } from '../final-clearance-cycle-edit/final-clearance-cycle-edit.component';
import { FinalClearanceCycleNewComponent } from '../final-clearance-cycle-new/final-clearance-cycle-new.component';
import { FinalClearanceCycleViewComponent } from '../final-clearance-cycle-view/final-clearance-cycle-view.component';
import { FinalClearanceCycleService } from '../shared/final-clearance-cycle.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-final-clearance-cycle-list',
  templateUrl: './final-clearance-cycle-list.component.html',
  styleUrls: ['./final-clearance-cycle-list.component.scss'],
  providers: []
})

export class FinalClearanceCycleListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private governoratesService: LookupService;
private offeringTypesService: LookupService;
private constructionTypesService: LookupService;
private extractTypesService: LookupService;

  
governorateSelectOptions: MaterialSelectOptions;
offeringTypeSelectOptions: MaterialSelectOptions;
constructionTypeSelectOptions: MaterialSelectOptions;
abstractPositionSelectOptions: MaterialSelectOptions;

  
	@ViewChild('governorate', { static: true }) GovernorateSelectComponent: MaterialSelectComponent;
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('abstractPosition', { static: true }) AbstractPositionSelectComponent: MaterialSelectComponent;

  
  @Input() selectedFinalClearanceCycle: FinalClearanceCycle;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود المبنى', field: 'buildingCode' }),
	new GridColumnOptions({ headerName: 'تاريخ الخروج من المكتب الفني', field: 'departureTechnicalOfficeDate' }),
	new GridColumnOptions({ headerName: 'اسم المراجع', field: 'referencesName' }),
	new GridColumnOptions({ headerName: 'رقم المراجع', field: 'referenceNumber' }),
	new GridColumnOptions({ headerName: 'عدد الموافقات', field: 'approvalsNumber' }),
	new GridColumnOptions({ headerName: 'رقم الحافظة', field: 'portfolioNumber' }),
	new GridColumnOptions({ headerName: 'عدد مرات الوارد', field: 'numberOfTimesReceived' }),
	new GridColumnOptions({ headerName: 'تاريخ الوارد', field: 'incomingDate' }),
	new GridColumnOptions({ headerName: 'تاريخ الصادر لجهات الصرف', field: 'exchangeAuthoritiesDate' }),
	new GridColumnOptions({ headerName: 'اسم المهندس', field: 'engineerName' }),
	new GridColumnOptions({ headerName: 'رقم المهندس', field: 'engineerCode' }),
	new GridColumnOptions({ headerName: 'اسم المقاول', field: 'contractorName' }),
	new GridColumnOptions({ headerName: 'كود المقاول', field: 'contractorCode' }),
	new GridColumnOptions({ headerName: 'رقم المناقصة', field: 'bidNumber' }),
	new GridColumnOptions({ headerName: 'اسم المبنى', field: 'buildingName' }),
	new GridColumnOptions({ headerName: 'تاريخ التسليم الابتدائي', field: 'primaryDeliveryDate' }),
	new GridColumnOptions({ headerName: 'رقم الصادر', field: 'outboundNumber' }),
	new GridColumnOptions({ headerName: 'موقف المستخلص', field: 'abstractPosition' }),
	new GridColumnOptions({ headerName: 'نوع الانشاء', field: 'constructionType' }),
	new GridColumnOptions({ headerName: 'نوع الطرح', field: 'offeringType' }),
	new GridColumnOptions({ headerName: 'المحافظة', field: 'governorate' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: FinalClearanceCycleViewComponent,
    editDialogClassType: FinalClearanceCycleEditComponent,
    newDialogClassType: FinalClearanceCycleNewComponent,
  });
    constructor(
        injector: Injector,
        public finalClearanceCycleService: FinalClearanceCycleService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedFinalClearanceCycle = new FinalClearanceCycle();

    
	this.governorateSelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المحافظة',
	});

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

	this.abstractPositionSelectOptions = new MaterialSelectOptions({
	 data: this.extractTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'موقف المستخلص',
	});


    this.searchForm = this.formBuilder.group({
     	buildingCode : [],
	buildingName : [],
	bidNumber : [],
	contractorCode : [],
	contractorName : [],
	engineerCode : [],
	engineerName : [],
	primaryDeliveryDate : [],
	incomingDate : [],
	numberOfTimesReceived : [],
	portfolioNumber : [],
	approvalsNumber : [],
	referenceNumber : [],
	referencesName : [],
	departureTechnicalOfficeDate : [],
	exchangeAuthoritiesDate : [],
	outboundNumber : [],
	governorate : [],
	offeringType : [],
	constructionType : [],
	abstractPosition : []
    });

     
  }

  getFinalClearanceCyclePaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<FinalClearanceCycle[]> => {
    return this.finalClearanceCycleService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.finalClearanceCycleService.delete(param.data.id)
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
    this.governoratesService = new LookupService('governorates', this.http);
this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.extractTypesService = new LookupService('extracttypes', this.http);
  }
}

