
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { LinkItemsToObjectCodes } from 'app/shared/models/link-items-to-object-codes';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { LinkItemsToObjectCodesEditComponent } from '../link-items-to-object-codes-edit/link-items-to-object-codes-edit.component';
import { LinkItemsToObjectCodesNewComponent } from '../link-items-to-object-codes-new/link-items-to-object-codes-new.component';
import { LinkItemsToObjectCodesViewComponent } from '../link-items-to-object-codes-view/link-items-to-object-codes-view.component';
import { LinkItemsToObjectCodesService } from '../shared/link-items-to-object-codes.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-link-items-to-object-codes-list',
  templateUrl: './link-items-to-object-codes-list.component.html',
  styleUrls: ['./link-items-to-object-codes-list.component.scss'],
  providers: []
})

export class LinkItemsToObjectCodesListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private itemCodesService: LookupService;
private elementsService: LookupService;

  
itemCodeSelectOptions: MaterialSelectOptions;
elementCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('itemCode', { static: true }) ItemCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('elementCode', { static: true }) ElementCodeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedLinkItemsToObjectCodes: LinkItemsToObjectCodes;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود البند', field: 'itemCode' }),
	new GridColumnOptions({ headerName: 'كود العنصر', field: 'elementCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: LinkItemsToObjectCodesViewComponent,
    editDialogClassType: LinkItemsToObjectCodesEditComponent,
    newDialogClassType: LinkItemsToObjectCodesNewComponent,
  });
    constructor(
        injector: Injector,
        public linkItemsToObjectCodesService: LinkItemsToObjectCodesService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedLinkItemsToObjectCodes = new LinkItemsToObjectCodes();

    
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

  getLinkItemsToObjectCodesPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<LinkItemsToObjectCodes[]> => {
    return this.linkItemsToObjectCodesService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.linkItemsToObjectCodesService.delete(param.data.id)
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

