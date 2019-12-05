
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { AssayItemsDueToWeightsFactor } from 'app/shared/models/assay-items-due-to-weights-factor';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { AssayItemsDueToWeightsFactorEditComponent } from '../assay-items-due-to-weights-factor-edit/assay-items-due-to-weights-factor-edit.component';
import { AssayItemsDueToWeightsFactorNewComponent } from '../assay-items-due-to-weights-factor-new/assay-items-due-to-weights-factor-new.component';
import { AssayItemsDueToWeightsFactorViewComponent } from '../assay-items-due-to-weights-factor-view/assay-items-due-to-weights-factor-view.component';
import { AssayItemsDueToWeightsFactorService } from '../shared/assay-items-due-to-weights-factor.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-assay-items-due-to-weights-factor-list',
  templateUrl: './assay-items-due-to-weights-factor-list.component.html',
  styleUrls: ['./assay-items-due-to-weights-factor-list.component.scss'],
  providers: []
})

export class AssayItemsDueToWeightsFactorListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private constructionTypesService: LookupService;

  
constructionTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedAssayItemsDueToWeightsFactor: AssayItemsDueToWeightsFactor;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود المبنى', field: 'buildingCode' }),
	new GridColumnOptions({ headerName: 'اسم المبني', field: 'buildingName' }),
	new GridColumnOptions({ headerName: 'كود الملحق', field: 'extensionCode' }),
	new GridColumnOptions({ headerName: 'سنة الخطه', field: 'yearPlan' }),
	new GridColumnOptions({ headerName: 'النموذج', field: 'sample' }),
	new GridColumnOptions({ headerName: 'سنة التسعير', field: 'pricingYear' }),
	new GridColumnOptions({ headerName: 'نوع الانشاء', field: 'constructionType' }),
	new GridColumnOptions({ headerName: 'نوع العمل', field: 'employmentType' }),
	new GridColumnOptions({ headerName: 'البند', field: 'clause' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: AssayItemsDueToWeightsFactorViewComponent,
    editDialogClassType: AssayItemsDueToWeightsFactorEditComponent,
    newDialogClassType: AssayItemsDueToWeightsFactorNewComponent,
  });
    constructor(
        injector: Injector,
        public assayItemsDueToWeightsFactorService: AssayItemsDueToWeightsFactorService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedAssayItemsDueToWeightsFactor = new AssayItemsDueToWeightsFactor();

    
	this.constructionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.constructionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الانشاء',
	});


    this.searchForm = this.formBuilder.group({
     	buildingCode : [],
	constructionType : []
    });

     
  }

  getAssayItemsDueToWeightsFactorPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<AssayItemsDueToWeightsFactor[]> => {
    return this.assayItemsDueToWeightsFactorService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.assayItemsDueToWeightsFactorService.delete(param.data.id)
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

