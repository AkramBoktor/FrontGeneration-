
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { NetworkBudgetData } from 'app/shared/models/network-budget-data';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { NetworkBudgetDataEditComponent } from '../network-budget-data-edit/network-budget-data-edit.component';
import { NetworkBudgetDataNewComponent } from '../network-budget-data-new/network-budget-data-new.component';
import { NetworkBudgetDataViewComponent } from '../network-budget-data-view/network-budget-data-view.component';
import { NetworkBudgetDataService } from '../shared/network-budget-data.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-network-budget-data-list',
  templateUrl: './network-budget-data-list.component.html',
  styleUrls: ['./network-budget-data-list.component.scss'],
  providers: []
})

export class NetworkBudgetDataListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private directionCodesService: LookupService;

  
directionCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('directionCode', { static: true }) DirectionCodeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedNetworkBudgetData: NetworkBudgetData;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود قطعة الارض', field: 'landID' }),
	new GridColumnOptions({ headerName: 'منسوب روبير', field: 'robertLevel' }),
	new GridColumnOptions({ headerName: 'وصف منسوب روبير للاتجاه', field: 'directionDescription' }),
	new GridColumnOptions({ headerName: ' كود الاتجاه', field: 'directionCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: NetworkBudgetDataViewComponent,
    editDialogClassType: NetworkBudgetDataEditComponent,
    newDialogClassType: NetworkBudgetDataNewComponent,
  });
    constructor(
        injector: Injector,
        public networkBudgetDataService: NetworkBudgetDataService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedNetworkBudgetData = new NetworkBudgetData();

    
	this.directionCodeSelectOptions = new MaterialSelectOptions({
	 data: this.directionCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' كود الاتجاه',
	});


    this.searchForm = this.formBuilder.group({
     	landID : [],
	robertLevel : [],
	directionDescription : [],
	directionCode : []
    });

     
  }

  getNetworkBudgetDataPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<NetworkBudgetData[]> => {
    return this.networkBudgetDataService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.networkBudgetDataService.delete(param.data.id)
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
    this.directionCodesService = new LookupService('directioncodes', this.http);
  }
}

