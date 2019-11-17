
import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions, GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { FormControlError, GridPaginatedSortedFiltered } from 'app/shared/models/controls/interfaces';
import { PermissionFlashbackBookToTheBodyStore } from 'app/shared/models/permission-flashback-book-to-the-body-store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { PermissionFlashbackBookToTheBodyStoreEditComponent } from '../permission-flashback-book-to-the-body-store-edit/permission-flashback-book-to-the-body-store-edit.component';
import { PermissionFlashbackBookToTheBodyStoreNewComponent } from '../permission-flashback-book-to-the-body-store-new/permission-flashback-book-to-the-body-store-new.component';
import { PermissionFlashbackBookToTheBodyStoreViewComponent } from '../permission-flashback-book-to-the-body-store-view/permission-flashback-book-to-the-body-store-view.component';
import { PermissionFlashbackBookToTheBodyStoreService } from '../shared/permission-flashback-book-to-the-body-store.service';

@Component({
  selector: 'app-permission-flashback-book-to-the-body-store-list',
  templateUrl: './permission-flashback-book-to-the-body-store-list.component.html',
  styleUrls: ['./permission-flashback-book-to-the-body-store-list.component.scss'],
  providers: []
})

export class PermissionFlashbackBookToTheBodyStoreListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedPermissionFlashbackBookToTheBodyStore: PermissionFlashbackBookToTheBodyStore;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم الكتاب', field: 'bookNumber' }),
	new GridColumnOptions({ headerName: 'رقم االكتاب بالفرع', field: 'bookNumberBranch' }),
	new GridColumnOptions({ headerName: 'تاريخ اذن الارتجاع', field: 'returnAuthorizationDate' }),
	new GridColumnOptions({ headerName: 'المكتبه المنصرف لها', field: 'outgoingLibraryRecipient' }),
	new GridColumnOptions({ headerName: 'كود الموظف المستلم', field: 'employeeCode' }),
	new GridColumnOptions({ headerName: 'الرقم الفرعى', field: 'extensionNumber' }),
	new GridColumnOptions({ headerName: 'الرقم العام', field: 'generalNumber' }),
	new GridColumnOptions({ headerName: 'عنوان الكتاب', field: 'bookTitle' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: PermissionFlashbackBookToTheBodyStoreViewComponent,
    editDialogClassType: PermissionFlashbackBookToTheBodyStoreEditComponent,
    newDialogClassType: PermissionFlashbackBookToTheBodyStoreNewComponent,
  });
    constructor(
        injector: Injector,
        public permissionFlashbackBookToTheBodyStoreService: PermissionFlashbackBookToTheBodyStoreService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedPermissionFlashbackBookToTheBodyStore = new PermissionFlashbackBookToTheBodyStore();

    

    this.searchForm = this.formBuilder.group({
     	bookNumber : [],
	bookNumberBranch : [],
	returnAuthorizationDate : [],
	outgoingLibraryRecipient : [],
	employeeCode : [],
	extensionNumber : [],
	generalNumber : [],
	bookTitle : []
    });

     
  }

  getPermissionFlashbackBooksToTheBodyStorePaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<PermissionFlashbackBookToTheBodyStore[]> => {
    return this.permissionFlashbackBookToTheBodyStoreService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.permissionFlashbackBookToTheBodyStoreService.delete(param.data.id)
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

