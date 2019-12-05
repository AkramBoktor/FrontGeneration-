
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { LinkSubitemsToTheMainItems } from 'app/shared/models/link-subitems-to-the-main-items';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { LinkSubitemsToTheMainItemsEditComponent } from '../link-subitems-to-the-main-items-edit/link-subitems-to-the-main-items-edit.component';
import { LinkSubitemsToTheMainItemsNewComponent } from '../link-subitems-to-the-main-items-new/link-subitems-to-the-main-items-new.component';
import { LinkSubitemsToTheMainItemsViewComponent } from '../link-subitems-to-the-main-items-view/link-subitems-to-the-main-items-view.component';
import { LinkSubitemsToTheMainItemsService } from '../shared/link-subitems-to-the-main-items.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-link-subitems-to-the-main-items-list',
  templateUrl: './link-subitems-to-the-main-items-list.component.html',
  styleUrls: ['./link-subitems-to-the-main-items-list.component.scss'],
  providers: []
})

export class LinkSubitemsToTheMainItemsListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private itemCodesService: LookupService;

  
mainIemNumberSelectOptions: MaterialSelectOptions;

  
	@ViewChild('mainIemNumber', { static: true }) MainIemNumberSelectComponent: MaterialSelectComponent;

  
  @Input() selectedLinkSubitemsToTheMainItems: LinkSubitemsToTheMainItems;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود البند', field: 'itemCode' }),
	new GridColumnOptions({ headerName: 'اسم البند', field: 'itemName' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: LinkSubitemsToTheMainItemsViewComponent,
    editDialogClassType: LinkSubitemsToTheMainItemsEditComponent,
    newDialogClassType: LinkSubitemsToTheMainItemsNewComponent,
  });
    constructor(
        injector: Injector,
        public linkSubitemsToTheMainItemsService: LinkSubitemsToTheMainItemsService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedLinkSubitemsToTheMainItems = new LinkSubitemsToTheMainItems();

    
	this.mainIemNumberSelectOptions = new MaterialSelectOptions({
	 data: this.itemCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'رقم البند الرئيسي',
	});


    this.searchForm = this.formBuilder.group({
     	subItemNumber : [],
	mainIemNumber : []
    });

     
  }

  getLinkSubitemsToTheMainItemsPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<LinkSubitemsToTheMainItems[]> => {
    return this.linkSubitemsToTheMainItemsService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.linkSubitemsToTheMainItemsService.delete(param.data.id)
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
  }
}

