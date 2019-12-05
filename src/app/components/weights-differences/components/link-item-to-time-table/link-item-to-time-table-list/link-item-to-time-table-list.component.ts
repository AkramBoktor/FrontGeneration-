
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { LinkItemToTimeTable } from 'app/shared/models/link-item-to-time-table';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { LinkItemToTimeTableEditComponent } from '../link-item-to-time-table-edit/link-item-to-time-table-edit.component';
import { LinkItemToTimeTableNewComponent } from '../link-item-to-time-table-new/link-item-to-time-table-new.component';
import { LinkItemToTimeTableViewComponent } from '../link-item-to-time-table-view/link-item-to-time-table-view.component';
import { LinkItemToTimeTableService } from '../shared/link-item-to-time-table.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-link-item-to-time-table-list',
  templateUrl: './link-item-to-time-table-list.component.html',
  styleUrls: ['./link-item-to-time-table-list.component.scss'],
  providers: []
})

export class LinkItemToTimeTableListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private itemCodesService: LookupService;

  
itemCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('itemCode', { static: true }) ItemCodeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedLinkItemToTimeTable: LinkItemToTimeTable;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'اسم البند', field: 'itemName' }),
	new GridColumnOptions({ headerName: 'كود النشاط', field: 'activityCode' }),
	new GridColumnOptions({ headerName: 'اسم النشاط', field: 'activityName' }),
	new GridColumnOptions({ headerName: 'كود البند', field: 'itemCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: LinkItemToTimeTableViewComponent,
    editDialogClassType: LinkItemToTimeTableEditComponent,
    newDialogClassType: LinkItemToTimeTableNewComponent,
  });
    constructor(
        injector: Injector,
        public linkItemToTimeTableService: LinkItemToTimeTableService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedLinkItemToTimeTable = new LinkItemToTimeTable();

    
	this.itemCodeSelectOptions = new MaterialSelectOptions({
	 data: this.itemCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود البند',
	});


    this.searchForm = this.formBuilder.group({
     	activityCode : [],
	itemCode : []
    });

     
  }

  getLinkItemToTimeTablePaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<LinkItemToTimeTable[]> => {
    return this.linkItemToTimeTableService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.linkItemToTimeTableService.delete(param.data.id)
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

