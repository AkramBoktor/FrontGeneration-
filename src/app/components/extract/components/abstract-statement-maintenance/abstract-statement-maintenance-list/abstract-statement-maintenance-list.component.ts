
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { AbstractStatementMaintenance } from 'app/shared/models/abstract-statement-maintenance';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { AbstractStatementMaintenanceEditComponent } from '../abstract-statement-maintenance-edit/abstract-statement-maintenance-edit.component';
import { AbstractStatementMaintenanceNewComponent } from '../abstract-statement-maintenance-new/abstract-statement-maintenance-new.component';
import { AbstractStatementMaintenanceViewComponent } from '../abstract-statement-maintenance-view/abstract-statement-maintenance-view.component';
import { AbstractStatementMaintenanceService } from '../shared/abstract-statement-maintenance.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-abstract-statement-maintenance-list',
  templateUrl: './abstract-statement-maintenance-list.component.html',
  styleUrls: ['./abstract-statement-maintenance-list.component.scss'],
  providers: []
})

export class AbstractStatementMaintenanceListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private maintenanceTypesService: LookupService;
private offeringTypesService: LookupService;

  
maintenanceTypeSelectOptions: MaterialSelectOptions;
offeringTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('maintenanceType', { static: true }) MaintenanceTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedAbstractStatementMaintenance: AbstractStatementMaintenance;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'اسم البند', field: 'itemName' }),
	new GridColumnOptions({ headerName: 'الكمية بالعقد', field: 'contractQuantity' }),
	new GridColumnOptions({ headerName: 'الكمية الاجمالية', field: 'totalQuantity' }),
	new GridColumnOptions({ headerName: 'كود البند', field: 'itemCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: AbstractStatementMaintenanceViewComponent,
    editDialogClassType: AbstractStatementMaintenanceEditComponent,
    newDialogClassType: AbstractStatementMaintenanceNewComponent,
  });
    constructor(
        injector: Injector,
        public abstractStatementMaintenanceService: AbstractStatementMaintenanceService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedAbstractStatementMaintenance = new AbstractStatementMaintenance();

    
	this.maintenanceTypeSelectOptions = new MaterialSelectOptions({
	 data: this.maintenanceTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الصيانة',
	});

	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});


    this.searchForm = this.formBuilder.group({
     	buildingCode : [],
	abstractNumber : [],
	contractorName : [],
	siteDeliveryDate : [],
	planYear : [],
	bidNumber : [],
	endPrevious : [],
	businessEnd : [],
	extensionNumber : [],
	maintenanceType : [],
	offeringType : []
    });

     
  }

  getAbstractStatementMaintenancePaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<AbstractStatementMaintenance[]> => {
    return this.abstractStatementMaintenanceService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.abstractStatementMaintenanceService.delete(param.data.id)
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
    this.maintenanceTypesService = new LookupService('maintenancetypes', this.http);
this.offeringTypesService = new LookupService('offeringtypes', this.http);
  }
}

