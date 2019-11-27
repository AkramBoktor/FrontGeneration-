
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { ModifyThePricesOfSchoolsForPricing2018 } from 'app/shared/models/modify-the-prices-of-schools-for-pricing-2018';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ModifyThePricesOfSchoolsForPricing2018EditComponent } from '../modify-the-prices-of-schools-for-pricing-2018-edit/modify-the-prices-of-schools-for-pricing-2018-edit.component';
import { ModifyThePricesOfSchoolsForPricing2018NewComponent } from '../modify-the-prices-of-schools-for-pricing-2018-new/modify-the-prices-of-schools-for-pricing-2018-new.component';
import { ModifyThePricesOfSchoolsForPricing2018ViewComponent } from '../modify-the-prices-of-schools-for-pricing-2018-view/modify-the-prices-of-schools-for-pricing-2018-view.component';
import { ModifyThePricesOfSchoolsForPricing2018Service } from '../shared/modify-the-prices-of-schools-for-pricing-2018.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-modify-the-prices-of-schools-for-pricing-2018-list',
  templateUrl: './modify-the-prices-of-schools-for-pricing-2018-list.component.html',
  styleUrls: ['./modify-the-prices-of-schools-for-pricing-2018-list.component.scss'],
  providers: []
})

export class ModifyThePricesOfSchoolsForPricing2018ListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private constructionTypesService: LookupService;

  
constructionTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedModifyThePricesOfSchoolsForPricing2018: ModifyThePricesOfSchoolsForPricing2018;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم المدرسة', field: 'schoolNumber' }),
	new GridColumnOptions({ headerName: 'كود الملحق', field: 'extensionCode' }),
	new GridColumnOptions({ headerName: 'سنة الخطة', field: 'pLanYear' }),
	new GridColumnOptions({ headerName: 'نوع الانشاء', field: 'constructionType' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: ModifyThePricesOfSchoolsForPricing2018ViewComponent,
    editDialogClassType: ModifyThePricesOfSchoolsForPricing2018EditComponent,
    newDialogClassType: ModifyThePricesOfSchoolsForPricing2018NewComponent,
  });
    constructor(
        injector: Injector,
        public modifyThePricesOfSchoolsForPricing2018Service: ModifyThePricesOfSchoolsForPricing2018Service) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedModifyThePricesOfSchoolsForPricing2018 = new ModifyThePricesOfSchoolsForPricing2018();

    
	this.constructionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.constructionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الانشاء',
	});


    this.searchForm = this.formBuilder.group({
     	schoolNumber : [],
	extensionCode : [],
	pLanYear : [],
	constructionType : []
    });

     
  }

  getModifyThePricesOfSchoolsForPricing2018PaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<ModifyThePricesOfSchoolsForPricing2018[]> => {
    return this.modifyThePricesOfSchoolsForPricing2018Service.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.modifyThePricesOfSchoolsForPricing2018Service.delete(param.data.id)
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
    this.constructionTypesService = new LookupService('constructiontypes', this.http);
  }
}

