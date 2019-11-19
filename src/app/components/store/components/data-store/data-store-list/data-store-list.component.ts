
import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions, GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { FormControlError, GridPaginatedSortedFiltered } from 'app/shared/models/controls/interfaces';
import { DataStore } from 'app/shared/models/data-store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { DataStoreEditComponent } from '../data-store-edit/data-store-edit.component';
import { DataStoreNewComponent } from '../data-store-new/data-store-new.component';
import { DataStoreViewComponent } from '../data-store-view/data-store-view.component';
import { DataStoreService } from '../shared/data-store.service';

@Component({
  selector: 'app-data-store-list',
  templateUrl: './data-store-list.component.html',
  styleUrls: ['./data-store-list.component.scss'],
  providers: []
})

export class DataStoreListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedDataStore: DataStore;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم المخزن   ', field: 'storeNumber' }),
	new GridColumnOptions({ headerName: 'اسم المخزن   ', field: 'storeName' }),
	new GridColumnOptions({ headerName: 'امين المخزن ', field: 'storekeeper' }),
	new GridColumnOptions({ headerName: ' عنوان المخزن', field: 'storeAddress' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: DataStoreViewComponent,
    editDialogClassType: DataStoreEditComponent,
    newDialogClassType: DataStoreNewComponent,
  });
    constructor(
        injector: Injector,
        public dataStoreService: DataStoreService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedDataStore = new DataStore();

    

    this.searchForm = this.formBuilder.group({
     	storeNumber : [],
	storeName : [],
	storekeeper : [],
	storeAddress : []
    });

     
  }

  getDataStorePaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<DataStore[]> => {
    return this.dataStoreService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.dataStoreService.delete(param.data.id)
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
    
  }
}

