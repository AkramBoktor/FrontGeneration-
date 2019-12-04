
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { AddExtensionsOnConstructionPlan } from 'app/shared/models/add-extensions-on-construction-plan';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { AddExtensionsOnConstructionPlanEditComponent } from '../add-extensions-on-construction-plan-edit/add-extensions-on-construction-plan-edit.component';
import { AddExtensionsOnConstructionPlanNewComponent } from '../add-extensions-on-construction-plan-new/add-extensions-on-construction-plan-new.component';
import { AddExtensionsOnConstructionPlanViewComponent } from '../add-extensions-on-construction-plan-view/add-extensions-on-construction-plan-view.component';
import { AddExtensionsOnConstructionPlanService } from '../shared/add-extensions-on-construction-plan.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-add-extensions-on-construction-plan-list',
  templateUrl: './add-extensions-on-construction-plan-list.component.html',
  styleUrls: ['./add-extensions-on-construction-plan-list.component.scss'],
  providers: []
})

export class AddExtensionsOnConstructionPlanListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private branchCodesService: LookupService;
private areasService: LookupService;
private constructionTypesService: LookupService;

  
branchSelectOptions: MaterialSelectOptions;
regionSelectOptions: MaterialSelectOptions;
constructionTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('branch', { static: true }) BranchSelectComponent: MaterialSelectComponent;
	@ViewChild('region', { static: true }) RegionSelectComponent: MaterialSelectComponent;
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedAddExtensionsOnConstructionPlan: AddExtensionsOnConstructionPlan;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود المبنى', field: 'buildingCode' }),
	new GridColumnOptions({ headerName: 'سنة الخطة', field: 'planYear' }),
	new GridColumnOptions({ headerName: 'مسلسل الملحق', field: 'extensionSerial' }),
	new GridColumnOptions({ headerName: 'الفرع', field: 'branch' }),
	new GridColumnOptions({ headerName: 'المنطقة', field: 'region' }),
	new GridColumnOptions({ headerName: 'نوع الإنشاء', field: 'constructionType' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: AddExtensionsOnConstructionPlanViewComponent,
    editDialogClassType: AddExtensionsOnConstructionPlanEditComponent,
    newDialogClassType: AddExtensionsOnConstructionPlanNewComponent,
  });
    constructor(
        injector: Injector,
        public addExtensionsOnConstructionPlanService: AddExtensionsOnConstructionPlanService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedAddExtensionsOnConstructionPlan = new AddExtensionsOnConstructionPlan();

    
	this.branchSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الفرع',
	});

	this.regionSelectOptions = new MaterialSelectOptions({
	 data: this.areasService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المنطقة',
	});

	this.constructionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.constructionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الإنشاء',
	});


    this.searchForm = this.formBuilder.group({
     	buildingCode : [],
	planYear : [],
	extensionSerial : [],
	branch : [],
	region : [],
	constructionType : []
    });

     
  }

  getAddExtensionsOnConstructionPlanPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<AddExtensionsOnConstructionPlan[]> => {
    return this.addExtensionsOnConstructionPlanService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.addExtensionsOnConstructionPlanService.delete(param.data.id)
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
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.areasService = new LookupService('areas', this.http);
this.constructionTypesService = new LookupService('constructiontypes', this.http);
  }
}

