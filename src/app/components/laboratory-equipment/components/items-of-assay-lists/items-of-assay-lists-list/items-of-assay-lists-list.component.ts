
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { ItemsOfAssayLists } from 'app/shared/models/items-of-assay-lists';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ItemsOfAssayListsEditComponent } from '../items-of-assay-lists-edit/items-of-assay-lists-edit.component';
import { ItemsOfAssayListsNewComponent } from '../items-of-assay-lists-new/items-of-assay-lists-new.component';
import { ItemsOfAssayListsViewComponent } from '../items-of-assay-lists-view/items-of-assay-lists-view.component';
import { ItemsOfAssayListsService } from '../shared/items-of-assay-lists.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-items-of-assay-lists-list',
  templateUrl: './items-of-assay-lists-list.component.html',
  styleUrls: ['./items-of-assay-lists-list.component.scss'],
  providers: []
})

export class ItemsOfAssayListsListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private processingTypesService: LookupService;
private offeringMethodsService: LookupService;

  
processingTypeSelectOptions: MaterialSelectOptions;
offeringMethodSelectOptions: MaterialSelectOptions;

  
	@ViewChild('processingType', { static: true }) ProcessingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('offeringMethod', { static: true }) OfferingMethodSelectComponent: MaterialSelectComponent;

  
  @Input() selectedItemsOfAssayLists: ItemsOfAssayLists;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود البند', field: 'itemCode' }),
	new GridColumnOptions({ headerName: 'اسم البند', field: 'itemName' }),
	new GridColumnOptions({ headerName: 'كمية', field: 'quantity' }),
	new GridColumnOptions({ headerName: 'القيمة ', field: 'value' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: ItemsOfAssayListsViewComponent,
    editDialogClassType: ItemsOfAssayListsEditComponent,
    newDialogClassType: ItemsOfAssayListsNewComponent,
  });
    constructor(
        injector: Injector,
        public itemsOfAssayListsService: ItemsOfAssayListsService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedItemsOfAssayLists = new ItemsOfAssayLists();

    
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


    this.searchForm = this.formBuilder.group({
     	assayNumber : [],
	listNumber : [],
	itemNo : [],
	itemQuantity : [],
	estimatedValue : [],
	processingType : [],
	offeringMethod : []
    });

     
  }

  getItemsOfAssayListsPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<ItemsOfAssayLists[]> => {
    return this.itemsOfAssayListsService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.itemsOfAssayListsService.delete(param.data.id)
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
  }
}

