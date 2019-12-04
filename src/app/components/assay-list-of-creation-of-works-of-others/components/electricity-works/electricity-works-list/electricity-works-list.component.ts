
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { ElectricityWorks } from 'app/shared/models/electricity-works';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ElectricityWorksEditComponent } from '../electricity-works-edit/electricity-works-edit.component';
import { ElectricityWorksNewComponent } from '../electricity-works-new/electricity-works-new.component';
import { ElectricityWorksViewComponent } from '../electricity-works-view/electricity-works-view.component';
import { ElectricityWorksService } from '../shared/electricity-works.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-electricity-works-list',
  templateUrl: './electricity-works-list.component.html',
  styleUrls: ['./electricity-works-list.component.scss'],
  providers: []
})

export class ElectricityWorksListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private listTypesService: LookupService;
private workTypesService: LookupService;

  
menuTypeSelectOptions: MaterialSelectOptions;
employmentTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('menuType', { static: true }) MenuTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('employmentType', { static: true }) EmploymentTypeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedElectricityWorks: ElectricityWorks;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'نوع النشاط ', field: 'activityType' }),
	new GridColumnOptions({ headerName: 'سنه التسعير', field: 'pricingYear' }),
	new GridColumnOptions({ headerName: 'اسم البند', field: 'itemName' }),
	new GridColumnOptions({ headerName: 'سعر الوحدة', field: 'unitPrice' }),
	new GridColumnOptions({ headerName: 'نوع القامه', field: 'menuType' }),
	new GridColumnOptions({ headerName: 'نوع العمل ', field: 'employmentType' }),
	new GridColumnOptions({ headerName: 'كود البند', field: 'itemCode' }),
	new GridColumnOptions({ headerName: 'الوحده', field: 'unit' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: ElectricityWorksViewComponent,
    editDialogClassType: ElectricityWorksEditComponent,
    newDialogClassType: ElectricityWorksNewComponent,
  });
    constructor(
        injector: Injector,
        public electricityWorksService: ElectricityWorksService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedElectricityWorks = new ElectricityWorks();

    
	this.menuTypeSelectOptions = new MaterialSelectOptions({
	 data: this.listTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع القامه',
	});

	this.employmentTypeSelectOptions = new MaterialSelectOptions({
	 data: this.workTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع العمل ',
	});


    this.searchForm = this.formBuilder.group({
     	activityType : [],
	pricingYear : [],
	menuType : [],
	employmentType : []
    });

     
  }

  getElectricityWorksPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<ElectricityWorks[]> => {
    return this.electricityWorksService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.electricityWorksService.delete(param.data.id)
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
    this.listTypesService = new LookupService('listtypes', this.http);
this.workTypesService = new LookupService('worktypes', this.http);
  }
}

