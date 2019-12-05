
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { FollowUpTheSupplyOfCertainItemsAtTheLevelOfBranches } from 'app/shared/models/follow-up-the-supply-of-certain-items-at-the-level-of-branches';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FollowUpTheSupplyOfCertainItemsAtTheLevelOfBranchesEditComponent } from '../follow-up-the-supply-of-certain-items-at-the-level-of-branches-edit/follow-up-the-supply-of-certain-items-at-the-level-of-branches-edit.component';
import { FollowUpTheSupplyOfCertainItemsAtTheLevelOfBranchesNewComponent } from '../follow-up-the-supply-of-certain-items-at-the-level-of-branches-new/follow-up-the-supply-of-certain-items-at-the-level-of-branches-new.component';
import { FollowUpTheSupplyOfCertainItemsAtTheLevelOfBranchesViewComponent } from '../follow-up-the-supply-of-certain-items-at-the-level-of-branches-view/follow-up-the-supply-of-certain-items-at-the-level-of-branches-view.component';
import { FollowUpTheSupplyOfCertainItemsAtTheLevelOfBranchesService } from '../shared/follow-up-the-supply-of-certain-items-at-the-level-of-branches.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-follow-up-the-supply-of-certain-items-at-the-level-of-branches-list',
  templateUrl: './follow-up-the-supply-of-certain-items-at-the-level-of-branches-list.component.html',
  styleUrls: ['./follow-up-the-supply-of-certain-items-at-the-level-of-branches-list.component.scss'],
  providers: []
})

export class FollowUpTheSupplyOfCertainItemsAtTheLevelOfBranchesListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private processingTypesService: LookupService;
private offeringTypesService: LookupService;
private offeringMethodsService: LookupService;

  
processingTypeSelectOptions: MaterialSelectOptions;
offeringTypeSelectOptions: MaterialSelectOptions;
offeringMethodSelectOptions: MaterialSelectOptions;

  
	@ViewChild('processingType', { static: true }) ProcessingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('offeringMethod', { static: true }) OfferingMethodSelectComponent: MaterialSelectComponent;

  
  @Input() selectedFollowUpTheSupplyOfCertainItemsAtTheLevelOfBranches: FollowUpTheSupplyOfCertainItemsAtTheLevelOfBranches;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود البند', field: 'itemCode' }),
	new GridColumnOptions({ headerName: 'البند', field: 'item' }),
	new GridColumnOptions({ headerName: 'الكمية', field: 'quantity' }),
	new GridColumnOptions({ headerName: 'القيمة', field: 'value' }),
	new GridColumnOptions({ headerName: 'نسبة الخصم', field: 'discountPercentage' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: FollowUpTheSupplyOfCertainItemsAtTheLevelOfBranchesViewComponent,
    editDialogClassType: FollowUpTheSupplyOfCertainItemsAtTheLevelOfBranchesEditComponent,
    newDialogClassType: FollowUpTheSupplyOfCertainItemsAtTheLevelOfBranchesNewComponent,
  });
    constructor(
        injector: Injector,
        public followUpTheSupplyOfCertainItemsAtTheLevelOfBranchesService: FollowUpTheSupplyOfCertainItemsAtTheLevelOfBranchesService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedFollowUpTheSupplyOfCertainItemsAtTheLevelOfBranches = new FollowUpTheSupplyOfCertainItemsAtTheLevelOfBranches();

    
	this.processingTypeSelectOptions = new MaterialSelectOptions({
	 data: this.processingTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع التجهيز',
	});

	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});

	this.offeringMethodSelectOptions = new MaterialSelectOptions({
	 data: this.offeringMethodsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'طريقة الطرح',
	});


    this.searchForm = this.formBuilder.group({
     	yearPlan : [],
	bidNumber : [],
	orderNumber : [],
	supplyOrderDate : [],
	constructionPlanYear : [],
	buildingName : [],
	number : [],
	companyName : [],
	processingType : [],
	offeringType : [],
	offeringMethod : []
    });

     
  }

  getFollowUpTheSupplyOfCertainItemsAtTheLevelOfBranchesPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<FollowUpTheSupplyOfCertainItemsAtTheLevelOfBranches[]> => {
    return this.followUpTheSupplyOfCertainItemsAtTheLevelOfBranchesService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.followUpTheSupplyOfCertainItemsAtTheLevelOfBranchesService.delete(param.data.id)
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
    this.processingTypesService = new LookupService('processingtypes', this.http);
this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.offeringMethodsService = new LookupService('offeringmethods', this.http);
  }
}

