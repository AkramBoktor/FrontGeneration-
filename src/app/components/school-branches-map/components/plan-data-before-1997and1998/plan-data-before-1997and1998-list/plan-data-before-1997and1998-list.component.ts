
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { PlanDataBefore1997and1998 } from 'app/shared/models/plan-data-before-1997and1998';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { PlanDataBefore1997and1998EditComponent } from '../plan-data-before-1997and1998-edit/plan-data-before-1997and1998-edit.component';
import { PlanDataBefore1997and1998NewComponent } from '../plan-data-before-1997and1998-new/plan-data-before-1997and1998-new.component';
import { PlanDataBefore1997and1998ViewComponent } from '../plan-data-before-1997and1998-view/plan-data-before-1997and1998-view.component';
import { PlanDataBefore1997and1998Service } from '../shared/plan-data-before-1997and1998.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-plan-data-before-1997and1998-list',
  templateUrl: './plan-data-before-1997and1998-list.component.html',
  styleUrls: ['./plan-data-before-1997and1998-list.component.scss'],
  providers: []
})

export class PlanDataBefore1997and1998ListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private governoratesService: LookupService;
private constructionTypesService: LookupService;

  
governorateSelectOptions: MaterialSelectOptions;
constructionTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('governorate', { static: true }) GovernorateSelectComponent: MaterialSelectComponent;
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedPlanDataBefore1997and1998: PlanDataBefore1997and1998;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: PlanDataBefore1997and1998ViewComponent,
    editDialogClassType: PlanDataBefore1997and1998EditComponent,
    newDialogClassType: PlanDataBefore1997and1998NewComponent,
  });
    constructor(
        injector: Injector,
        public planDataBefore1997and1998Service: PlanDataBefore1997and1998Service) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedPlanDataBefore1997and1998 = new PlanDataBefore1997and1998();

    
	this.governorateSelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المحافظة',
	});

	this.constructionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.constructionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الانشاء',
	});


    this.searchForm = this.formBuilder.group({
     	schoolNumber : [],
	schoolName : [],
	extension : [],
	primaryDelivaryDate : [],
	planYear : [],
	governorate : [],
	constructionType : []
    });

     
  }

  getPlanDataBefore1997and1998PaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<PlanDataBefore1997and1998[]> => {
    return this.planDataBefore1997and1998Service.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.planDataBefore1997and1998Service.delete(param.data.id)
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
this.constructionTypesService = new LookupService('constructiontypes', this.http);
  }
}

