
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { FundStatistics } from 'app/shared/models/fund-statistics';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FundStatisticsEditComponent } from '../fund-statistics-edit/fund-statistics-edit.component';
import { FundStatisticsNewComponent } from '../fund-statistics-new/fund-statistics-new.component';
import { FundStatisticsViewComponent } from '../fund-statistics-view/fund-statistics-view.component';
import { FundStatisticsService } from '../shared/fund-statistics.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-fund-statistics-list',
  templateUrl: './fund-statistics-list.component.html',
  styleUrls: ['./fund-statistics-list.component.scss'],
  providers: []
})

export class FundStatisticsListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private collectionTypesService: LookupService;

  
collectionTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('collectionType', { static: true }) CollectionTypeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedFundStatistics: FundStatistics;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: ' رقم التحصيل ', field: 'collectionNumber' }),
	new GridColumnOptions({ headerName: ' تاريخ  التحصيل', field: 'collectionDate' }),
	new GridColumnOptions({ headerName: 'كود الموظف', field: 'employeeCode' }),
	new GridColumnOptions({ headerName: ' من ', field: 'from' }),
	new GridColumnOptions({ headerName: ' الي', field: 'to' }),
	new GridColumnOptions({ headerName: ' المبلغ', field: 'amount' }),
	new GridColumnOptions({ headerName: ' نوع التحصيل', field: 'collectionType' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: FundStatisticsViewComponent,
    editDialogClassType: FundStatisticsEditComponent,
    newDialogClassType: FundStatisticsNewComponent,
  });
    constructor(
        injector: Injector,
        public fundStatisticsService: FundStatisticsService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedFundStatistics = new FundStatistics();

    
	this.collectionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.collectionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' نوع التحصيل',
	});


    this.searchForm = this.formBuilder.group({
     	collectionNumber : [],
	employeeCode : [],
	from : [],
	to : [],
	collectionType : []
    });

     
  }

  getFundStatisticsPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<FundStatistics[]> => {
    return this.fundStatisticsService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.fundStatisticsService.delete(param.data.id)
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
    this.collectionTypesService = new LookupService('collectiontypes', this.http);
  }
}

