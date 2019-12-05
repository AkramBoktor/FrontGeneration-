
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { FollowUpDailyMaintenance } from 'app/shared/models/follow-up-daily-maintenance';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FollowUpDailyMaintenanceEditComponent } from '../follow-up-daily-maintenance-edit/follow-up-daily-maintenance-edit.component';
import { FollowUpDailyMaintenanceNewComponent } from '../follow-up-daily-maintenance-new/follow-up-daily-maintenance-new.component';
import { FollowUpDailyMaintenanceViewComponent } from '../follow-up-daily-maintenance-view/follow-up-daily-maintenance-view.component';
import { FollowUpDailyMaintenanceService } from '../shared/follow-up-daily-maintenance.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-follow-up-daily-maintenance-list',
  templateUrl: './follow-up-daily-maintenance-list.component.html',
  styleUrls: ['./follow-up-daily-maintenance-list.component.scss'],
  providers: []
})

export class FollowUpDailyMaintenanceListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private branchCodesService: LookupService;
private areasService: LookupService;
private constructionTypesService: LookupService;
private offeringTypesService: LookupService;

  
branchNumberSelectOptions: MaterialSelectOptions;
regionCodeSelectOptions: MaterialSelectOptions;
constructionTypeSelectOptions: MaterialSelectOptions;
offeringTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('branchNumber', { static: true }) BranchNumberSelectComponent: MaterialSelectComponent;
	@ViewChild('regionCode', { static: true }) RegionCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedFollowUpDailyMaintenance: FollowUpDailyMaintenance;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: ' رقم المبني التعليمي', field: 'buildingNumber' }),
	new GridColumnOptions({ headerName: 'سنه الخطه', field: 'yearPlan' }),
	new GridColumnOptions({ headerName: '  مده التنفيذ العمليه', field: 'implementationDuration' }),
	new GridColumnOptions({ headerName: '  تاريخ تسليم موقع مخطط', field: 'plannerDeliveryDate' }),
	new GridColumnOptions({ headerName: ' تاريخ تسليم موقع فعلي', field: 'physicaldeliveryDate' }),
	new GridColumnOptions({ headerName: ' رقم المناقصه', field: 'bidNumber' }),
	new GridColumnOptions({ headerName: 'تاريخ اخر متابعه', field: 'dateLastFollow' }),
	new GridColumnOptions({ headerName: 'المهندس المشرف', field: 'supervisingEngineer' }),
	new GridColumnOptions({ headerName: 'نسبه انجاز', field: 'completionRate' }),
	new GridColumnOptions({ headerName: 'سبب التاخير', field: 'delayReason' }),
	new GridColumnOptions({ headerName: 'تاريخ التسليم الابتدائي', field: 'primaryDeliveryDate' }),
	new GridColumnOptions({ headerName: ' تاريخ التسليم النهائي ', field: 'finalDeliveryDate' }),
	new GridColumnOptions({ headerName: 'رقم الفرع', field: 'branchNumber' }),
	new GridColumnOptions({ headerName: '  رقم المنطقه ', field: 'regionCode' }),
	new GridColumnOptions({ headerName: ' نوع  الانشاء', field: 'constructionType' }),
	new GridColumnOptions({ headerName: ' نوع الطرح', field: 'offeringType' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: FollowUpDailyMaintenanceViewComponent,
    editDialogClassType: FollowUpDailyMaintenanceEditComponent,
    newDialogClassType: FollowUpDailyMaintenanceNewComponent,
  });
    constructor(
        injector: Injector,
        public followUpDailyMaintenanceService: FollowUpDailyMaintenanceService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedFollowUpDailyMaintenance = new FollowUpDailyMaintenance();

    
	this.branchNumberSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'رقم الفرع',
	});

	this.regionCodeSelectOptions = new MaterialSelectOptions({
	 data: this.areasService.getAll(),
	 errorMessages: this.errorMessages,
	 label: '  رقم المنطقه ',
	});

	this.constructionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.constructionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' نوع  الانشاء',
	});

	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' نوع الطرح',
	});


    this.searchForm = this.formBuilder.group({
     	buildingNumber : [],
	yearPlan : [],
	implementationDuration : [],
	plannerDeliveryDate : [],
	physicaldeliveryDate : [],
	bidNumber : [],
	dateLastFollow : [],
	supervisingEngineer : [],
	completionRate : [],
	delayReason : [],
	primaryDeliveryDate : [],
	finalDeliveryDate : [],
	branchNumber : [],
	regionCode : [],
	constructionType : [],
	offeringType : []
    });

     
  }

  getFollowUpDailyMaintenancePaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<FollowUpDailyMaintenance[]> => {
    return this.followUpDailyMaintenanceService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.followUpDailyMaintenanceService.delete(param.data.id)
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
this.areasService = new LookupService('areas', this.http);
this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.offeringTypesService = new LookupService('offeringtypes', this.http);
  }
}

