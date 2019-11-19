
import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { GridColumnOptions, GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { FormControlError, GridPaginatedSortedFiltered } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { Promotion } from 'app/shared/models/promotion';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { PromotionEditComponent } from '../promotion-edit/promotion-edit.component';
import { PromotionNewComponent } from '../promotion-new/promotion-new.component';
import { PromotionViewComponent } from '../promotion-view/promotion-view.component';
import { PromotionService } from '../shared/promotion.service';

@Component({
  selector: 'app-promotion-list',
  templateUrl: './promotion-list.component.html',
  styleUrls: ['./promotion-list.component.scss'],
  providers: []
})

export class PromotionListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private financialDegreesService: LookupService;
private jobTypesService: LookupService;

  
financialDegreeSelectOptions: MaterialSelectOptions;
jobTitleSelectOptions: MaterialSelectOptions;

  
	@ViewChild('financialDegree', { static: true }) FinancialDegreeSelectComponent: MaterialSelectComponent;
	@ViewChild('jobTitle', { static: true }) JobTitleSelectComponent: MaterialSelectComponent;

  
  @Input() selectedPromotion: Promotion;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود الموظف', field: 'employeeCode' }),
	new GridColumnOptions({ headerName: 'تاريخ الترقية', field: 'promotionDate' }),
	new GridColumnOptions({ headerName: 'تاريخ شغل الدرجة', field: 'jobDate' }),
	new GridColumnOptions({ headerName: 'الدرجة المالية', field: 'financialDegree' }),
	new GridColumnOptions({ headerName: 'الوظيفة', field: 'jobTitle' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: PromotionViewComponent,
    editDialogClassType: PromotionEditComponent,
    newDialogClassType: PromotionNewComponent,
  });
    constructor(
        injector: Injector,
        public promotionService: PromotionService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedPromotion = new Promotion();

    
	this.financialDegreeSelectOptions = new MaterialSelectOptions({
	 data: this.financialDegreesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الدرجة المالية',
	});

	this.jobTitleSelectOptions = new MaterialSelectOptions({
	 data: this.jobTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الوظيفة',
	});


    this.searchForm = this.formBuilder.group({
     	employeeCode : [],
	promotionDate : [],
	jobDate : [],
	financialDegree : [],
	jobTitle : []
    });

     
  }

  getPromotionsPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<Promotion[]> => {
    return this.promotionService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.promotionService.delete(param.data.id)
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
    this.financialDegreesService = new LookupService('financialdegrees', this.http);
this.jobTypesService = new LookupService('jobtypes', this.http);
  }
}

