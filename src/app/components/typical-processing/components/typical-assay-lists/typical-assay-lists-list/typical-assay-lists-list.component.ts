
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { TypicalAssayLists } from 'app/shared/models/typical-assay-lists';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { TypicalAssayListsEditComponent } from '../typical-assay-lists-edit/typical-assay-lists-edit.component';
import { TypicalAssayListsNewComponent } from '../typical-assay-lists-new/typical-assay-lists-new.component';
import { TypicalAssayListsViewComponent } from '../typical-assay-lists-view/typical-assay-lists-view.component';
import { TypicalAssayListsService } from '../shared/typical-assay-lists.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-typical-assay-lists-list',
  templateUrl: './typical-assay-lists-list.component.html',
  styleUrls: ['./typical-assay-lists-list.component.scss'],
  providers: []
})

export class TypicalAssayListsListComponent extends AppBaseComponent implements OnInit {
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

  
  @Input() selectedTypicalAssayLists: TypicalAssayLists;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم المقايسة', field: 'assayNumber' }),
	new GridColumnOptions({ headerName: 'اسم القائمة', field: 'listName' }),
	new GridColumnOptions({ headerName: 'القيمة التقديرية', field: 'estimatedValue' }),
	new GridColumnOptions({ headerName: 'الكمية المطلوبة', field: 'requiredQuantity' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: TypicalAssayListsViewComponent,
    editDialogClassType: TypicalAssayListsEditComponent,
    newDialogClassType: TypicalAssayListsNewComponent,
  });
    constructor(
        injector: Injector,
        public typicalAssayListsService: TypicalAssayListsService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedTypicalAssayLists = new TypicalAssayLists();

    
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

  getTypicalAssayListsPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<TypicalAssayLists[]> => {
    return this.typicalAssayListsService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.typicalAssayListsService.delete(param.data.id)
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

