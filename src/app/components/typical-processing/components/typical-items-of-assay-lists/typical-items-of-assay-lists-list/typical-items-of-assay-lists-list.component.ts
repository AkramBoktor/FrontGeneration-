
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { TypicalItemsOfAssayLists } from 'app/shared/models/typical-items-of-assay-lists';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { TypicalItemsOfAssayListsEditComponent } from '../typical-items-of-assay-lists-edit/typical-items-of-assay-lists-edit.component';
import { TypicalItemsOfAssayListsNewComponent } from '../typical-items-of-assay-lists-new/typical-items-of-assay-lists-new.component';
import { TypicalItemsOfAssayListsViewComponent } from '../typical-items-of-assay-lists-view/typical-items-of-assay-lists-view.component';
import { TypicalItemsOfAssayListsService } from '../shared/typical-items-of-assay-lists.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-typical-items-of-assay-lists-list',
  templateUrl: './typical-items-of-assay-lists-list.component.html',
  styleUrls: ['./typical-items-of-assay-lists-list.component.scss'],
  providers: []
})

export class TypicalItemsOfAssayListsListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private offeringMethodsService: LookupService;
private processingTypesService: LookupService;

  
offeringMethodSelectOptions: MaterialSelectOptions;
processingTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('offeringMethod', { static: true }) OfferingMethodSelectComponent: MaterialSelectComponent;
	@ViewChild('processingType', { static: true }) ProcessingTypeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedTypicalItemsOfAssayLists: TypicalItemsOfAssayLists;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كمية', field: 'quantity' }),
	new GridColumnOptions({ headerName: 'القيمة', field: 'value' }),
	new GridColumnOptions({ headerName: 'اسم البند', field: 'itemName' }),
	new GridColumnOptions({ headerName: 'كود البند', field: 'itemCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: TypicalItemsOfAssayListsViewComponent,
    editDialogClassType: TypicalItemsOfAssayListsEditComponent,
    newDialogClassType: TypicalItemsOfAssayListsNewComponent,
  });
    constructor(
        injector: Injector,
        public typicalItemsOfAssayListsService: TypicalItemsOfAssayListsService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedTypicalItemsOfAssayLists = new TypicalItemsOfAssayLists();

    
	this.offeringMethodSelectOptions = new MaterialSelectOptions({
	 data: this.offeringMethodsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'طريقة الطرح',
	});

	this.processingTypeSelectOptions = new MaterialSelectOptions({
	 data: this.processingTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع التجهيز',
	});


    this.searchForm = this.formBuilder.group({
     	estimatedValue : [],
	itemQuantity : [],
	listNumber : [],
	assayNumber : [],
	itemNo : [],
	offeringMethod : [],
	processingType : []
    });

     
  }

  getTypicalItemsOfAssayListsPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<TypicalItemsOfAssayLists[]> => {
    return this.typicalItemsOfAssayListsService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.typicalItemsOfAssayListsService.delete(param.data.id)
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
    this.offeringMethodsService = new LookupService('offeringmethods', this.http);
this.processingTypesService = new LookupService('processingtypes', this.http);
  }
}

