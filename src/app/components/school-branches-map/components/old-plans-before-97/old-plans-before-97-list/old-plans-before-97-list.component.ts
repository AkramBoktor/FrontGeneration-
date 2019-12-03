
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { OldPlansBefore97 } from 'app/shared/models/old-plans-before-97';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { OldPlansBefore97EditComponent } from '../old-plans-before-97-edit/old-plans-before-97-edit.component';
import { OldPlansBefore97NewComponent } from '../old-plans-before-97-new/old-plans-before-97-new.component';
import { OldPlansBefore97ViewComponent } from '../old-plans-before-97-view/old-plans-before-97-view.component';
import { OldPlansBefore97Service } from '../shared/old-plans-before-97.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-old-plans-before-97-list',
  templateUrl: './old-plans-before-97-list.component.html',
  styleUrls: ['./old-plans-before-97-list.component.scss'],
  providers: []
})

export class OldPlansBefore97ListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private governoratesService: LookupService;
private constructionTypesService: LookupService;

  
governorateSelectOptions: MaterialSelectOptions;
constructionTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('governorate', { static: true }) GovernorateSelectComponent: MaterialSelectComponent;
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedOldPlansBefore97: OldPlansBefore97;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'المدرسه', field: 'school' }),
	new GridColumnOptions({ headerName: 'الملحق', field: 'extension' }),
	new GridColumnOptions({ headerName: 'تاريخ التسليم ابتدائي', field: 'primaryDeliveryDate' }),
	new GridColumnOptions({ headerName: 'سنه الخطه', field: 'pLanYear' }),
	new GridColumnOptions({ headerName: 'المحافظة', field: 'governorate' }),
	new GridColumnOptions({ headerName: 'نوع الانشاء', field: 'constructionType' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: OldPlansBefore97ViewComponent,
    editDialogClassType: OldPlansBefore97EditComponent,
    newDialogClassType: OldPlansBefore97NewComponent,
  });
    constructor(
        injector: Injector,
        public oldPlansBefore97Service: OldPlansBefore97Service
        ) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedOldPlansBefore97 = new OldPlansBefore97();

    
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
     	school : [],
	extension : [],
	primaryDeliveryDate : [],
	pLanYear : [],
	governorate : [],
	constructionType : []
    });

     
  }

  getOldPlansBefore97PaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered):Observable<OldPlansBefore97[]> => {
    return this.oldPlansBefore97Service.getAllWithFilter(arg);
  }

 
  onDeleteClicked(param): void {
    this.oldPlansBefore97Service.delete(param.data.id)
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
