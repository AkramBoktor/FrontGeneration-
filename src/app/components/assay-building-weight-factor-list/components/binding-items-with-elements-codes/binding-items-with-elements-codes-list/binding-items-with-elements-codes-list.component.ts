
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { BindingItemsWithElementsCodes } from 'app/shared/models/binding-items-with-elements-codes';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { BindingItemsWithElementsCodesEditComponent } from '../binding-items-with-elements-codes-edit/binding-items-with-elements-codes-edit.component';
import { BindingItemsWithElementsCodesNewComponent } from '../binding-items-with-elements-codes-new/binding-items-with-elements-codes-new.component';
import { BindingItemsWithElementsCodesViewComponent } from '../binding-items-with-elements-codes-view/binding-items-with-elements-codes-view.component';
import { BindingItemsWithElementsCodesService } from '../shared/binding-items-with-elements-codes.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-binding-items-with-elements-codes-list',
  templateUrl: './binding-items-with-elements-codes-list.component.html',
  styleUrls: ['./binding-items-with-elements-codes-list.component.scss'],
  providers: []
})

export class BindingItemsWithElementsCodesListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private itemCodesService: LookupService;
private elementsService: LookupService;

  
itemCodeSelectOptions: MaterialSelectOptions;
elementCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('itemCode', { static: true }) ItemCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('elementCode', { static: true }) ElementCodeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedBindingItemsWithElementsCodes: BindingItemsWithElementsCodes;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود البند', field: 'itemCode' }),
	new GridColumnOptions({ headerName: 'كود العنصر', field: 'elementCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: BindingItemsWithElementsCodesViewComponent,
    editDialogClassType: BindingItemsWithElementsCodesEditComponent,
    newDialogClassType: BindingItemsWithElementsCodesNewComponent,
  });
    constructor(
        injector: Injector,
        public bindingItemsWithElementsCodesService: BindingItemsWithElementsCodesService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedBindingItemsWithElementsCodes = new BindingItemsWithElementsCodes();

    
	this.itemCodeSelectOptions = new MaterialSelectOptions({
	 data: this.itemCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود البند',
	});

	this.elementCodeSelectOptions = new MaterialSelectOptions({
	 data: this.elementsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود العنصر',
	});


    this.searchForm = this.formBuilder.group({
     	itemCode : [],
	elementCode : []
    });

     
  }

  getBindingItemsWithElementsCodesPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<BindingItemsWithElementsCodes[]> => {
    return this.bindingItemsWithElementsCodesService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.bindingItemsWithElementsCodesService.delete(param.data.id)
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
    this.itemCodesService = new LookupService('itemcodes', this.http);
this.elementsService = new LookupService('elements', this.http);
  }
}

