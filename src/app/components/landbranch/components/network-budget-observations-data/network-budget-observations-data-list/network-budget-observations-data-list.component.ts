
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { NetworkBudgetObservationsData } from 'app/shared/models/network-budget-observations-data';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { NetworkBudgetObservationsDataEditComponent } from '../network-budget-observations-data-edit/network-budget-observations-data-edit.component';
import { NetworkBudgetObservationsDataNewComponent } from '../network-budget-observations-data-new/network-budget-observations-data-new.component';
import { NetworkBudgetObservationsDataViewComponent } from '../network-budget-observations-data-view/network-budget-observations-data-view.component';
import { NetworkBudgetObservationsDataService } from '../shared/network-budget-observations-data.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-network-budget-observations-data-list',
  templateUrl: './network-budget-observations-data-list.component.html',
  styleUrls: ['./network-budget-observations-data-list.component.scss'],
  providers: []
})

export class NetworkBudgetObservationsDataListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private networkNoteTypeCodesService: LookupService;
private directionCodesService: LookupService;

  
networkNoteTypeCodeSelectOptions: MaterialSelectOptions;
borderCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('networkNoteTypeCode', { static: true }) NetworkNoteTypeCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('borderCode', { static: true }) BorderCodeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedNetworkBudgetObservationsData: NetworkBudgetObservationsData;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود قطعة الارض', field: 'landID' }),
	new GridColumnOptions({ headerName: 'متوسط قيم الارتفاع', field: 'averageHeightValues' }),
	new GridColumnOptions({ headerName: 'متوسط قيم الانخفاض', field: 'averageValuesDecline' }),
	new GridColumnOptions({ headerName: 'كود نوع ملاحظة الشبكة', field: 'networkNoteTypeCode' }),
	new GridColumnOptions({ headerName: 'كود الحد', field: 'borderCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: NetworkBudgetObservationsDataViewComponent,
    editDialogClassType: NetworkBudgetObservationsDataEditComponent,
    newDialogClassType: NetworkBudgetObservationsDataNewComponent,
  });
    constructor(
        injector: Injector,
        public networkBudgetObservationsDataService: NetworkBudgetObservationsDataService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedNetworkBudgetObservationsData = new NetworkBudgetObservationsData();

    
	this.networkNoteTypeCodeSelectOptions = new MaterialSelectOptions({
	 data: this.networkNoteTypeCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود نوع ملاحظة الشبكة',
	});

	this.borderCodeSelectOptions = new MaterialSelectOptions({
	 data: this.directionCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الحد',
	});


    this.searchForm = this.formBuilder.group({
     	landID : [],
	averageHeightValues : [],
	averageValuesDecline : [],
	networkNoteTypeCode : [],
	borderCode : []
    });

     
  }

  getNetworkBudgetObservationsDataPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<NetworkBudgetObservationsData[]> => {
    return this.networkBudgetObservationsDataService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.networkBudgetObservationsDataService.delete(param.data.id)
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
    this.networkNoteTypeCodesService = new LookupService('networknotetypecodes', this.http);
this.directionCodesService = new LookupService('directioncodes', this.http);
  }
}

