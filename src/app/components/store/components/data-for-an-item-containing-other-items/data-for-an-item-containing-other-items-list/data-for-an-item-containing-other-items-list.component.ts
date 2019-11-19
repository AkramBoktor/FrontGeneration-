
import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions, GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { FormControlError, GridPaginatedSortedFiltered } from 'app/shared/models/controls/interfaces';
import { DataForAnItemContainingOtherItems } from 'app/shared/models/data-for-an-item-containing-other-items';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { DataForAnItemContainingOtherItemsEditComponent } from '../data-for-an-item-containing-other-items-edit/data-for-an-item-containing-other-items-edit.component';
import { DataForAnItemContainingOtherItemsNewComponent } from '../data-for-an-item-containing-other-items-new/data-for-an-item-containing-other-items-new.component';
import { DataForAnItemContainingOtherItemsViewComponent } from '../data-for-an-item-containing-other-items-view/data-for-an-item-containing-other-items-view.component';
import { DataForAnItemContainingOtherItemsService } from '../shared/data-for-an-item-containing-other-items.service';

@Component({
  selector: 'app-data-for-an-item-containing-other-items-list',
  templateUrl: './data-for-an-item-containing-other-items-list.component.html',
  styleUrls: ['./data-for-an-item-containing-other-items-list.component.scss'],
  providers: []
})

export class DataForAnItemContainingOtherItemsListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedDataForAnItemContainingOtherItems: DataForAnItemContainingOtherItems;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: ' رقم الصنف', field: 'itemNumber' }),
	new GridColumnOptions({ headerName: 'رقم الصنف النتضمن في الصنف الاساسي', field: 'basicItemNumber' }),
	new GridColumnOptions({ headerName: 'الكمية', field: 'quantity' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: DataForAnItemContainingOtherItemsViewComponent,
    editDialogClassType: DataForAnItemContainingOtherItemsEditComponent,
    newDialogClassType: DataForAnItemContainingOtherItemsNewComponent,
  });
    constructor(
        injector: Injector,
        public dataForAnItemContainingOtherItemsService: DataForAnItemContainingOtherItemsService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedDataForAnItemContainingOtherItems = new DataForAnItemContainingOtherItems();

    

    this.searchForm = this.formBuilder.group({
     	itemNumber : [],
	basicItemNumber : [],
	quantity : []
    });

     
  }

  getDataForAnItemContainingOtherItemsPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<DataForAnItemContainingOtherItems[]> => {
    return this.dataForAnItemContainingOtherItemsService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.dataForAnItemContainingOtherItemsService.delete(param.data.id)
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

