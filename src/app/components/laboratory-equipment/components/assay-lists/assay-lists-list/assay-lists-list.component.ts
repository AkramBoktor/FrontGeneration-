
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { AssayLists } from 'app/shared/models/assay-lists';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { AssayListsEditComponent } from '../assay-lists-edit/assay-lists-edit.component';
import { AssayListsNewComponent } from '../assay-lists-new/assay-lists-new.component';
import { AssayListsViewComponent } from '../assay-lists-view/assay-lists-view.component';
import { AssayListsService } from '../shared/assay-lists.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-assay-lists-list',
  templateUrl: './assay-lists-list.component.html',
  styleUrls: ['./assay-lists-list.component.scss'],
  providers: []
})

export class AssayListsListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private processingTypesService: LookupService;
private offeringMethodsService: LookupService;
private requiredQuantitiesService: LookupService;

  
processingTypeSelectOptions: MaterialSelectOptions;
offeringMethodSelectOptions: MaterialSelectOptions;
requiredQuantitySelectOptions: MaterialSelectOptions;

  
	@ViewChild('processingType', { static: true }) ProcessingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('offeringMethod', { static: true }) OfferingMethodSelectComponent: MaterialSelectComponent;
	@ViewChild('requiredQuantity', { static: true }) RequiredQuantitySelectComponent: MaterialSelectComponent;

  
  @Input() selectedAssayLists: AssayLists;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم المقايسة', field: 'assayNumber' }),
	new GridColumnOptions({ headerName: 'اسم القائمة', field: 'listName' }),
	new GridColumnOptions({ headerName: 'القيمة التقديرية', field: 'estimatedValue' }),
	new GridColumnOptions({ headerName: 'الكمية المطلوبة', field: 'requiredQuantity' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: AssayListsViewComponent,
    editDialogClassType: AssayListsEditComponent,
    newDialogClassType: AssayListsNewComponent,
  });
    constructor(
        injector: Injector,
        public assayListsService: AssayListsService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedAssayLists = new AssayLists();

    
	this.processingTypeSelectOptions = new MaterialSelectOptions({
	 data: this.processingTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع التجهيز',
	});

	this.offeringMethodSelectOptions = new MaterialSelectOptions({
	 data: this.offeringMethodsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'طريقة الطرح',
	});

	this.requiredQuantitySelectOptions = new MaterialSelectOptions({
	 data: this.requiredQuantitiesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الكمية المطلوبة',
	});


    this.searchForm = this.formBuilder.group({
     	assayNumber : [],
	listNumber : [],
	listName : [],
	estimatedValue : [],
	processingType : [],
	offeringMethod : [],
	requiredQuantity : []
    });

     
  }

  getAssayListsPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<AssayLists[]> => {
    return this.assayListsService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.assayListsService.delete(param.data.id)
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
this.offeringMethodsService = new LookupService('offeringmethods', this.http);
this.requiredQuantitiesService = new LookupService('requiredquantities', this.http);
  }
}

