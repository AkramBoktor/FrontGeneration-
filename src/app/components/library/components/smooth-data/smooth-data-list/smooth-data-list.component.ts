
import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions, GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { FormControlError, GridPaginatedSortedFiltered } from 'app/shared/models/controls/interfaces';
import { SmoothData } from 'app/shared/models/smooth-data';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { SmoothDataService } from '../shared/smooth-data.service';
import { SmoothDataEditComponent } from '../smooth-data-edit/smooth-data-edit.component';
import { SmoothDataNewComponent } from '../smooth-data-new/smooth-data-new.component';
import { SmoothDataViewComponent } from '../smooth-data-view/smooth-data-view.component';

@Component({
  selector: 'app-smooth-data-list',
  templateUrl: './smooth-data-list.component.html',
  styleUrls: ['./smooth-data-list.component.scss'],
  providers: []
})

export class SmoothDataListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedSmoothData: SmoothData;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود السلسه', field: 'seriesCode' }),
	new GridColumnOptions({ headerName: 'عنوان السلسله', field: 'seriesTitle' }),
	new GridColumnOptions({ headerName: 'رقم الكتاب', field: 'bookNumber' }),
	new GridColumnOptions({ headerName: 'عنوان الكتاب', field: 'bookTitle' }),
	new GridColumnOptions({ headerName: 'عنوان الكتاب', field: 'bookTitle' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: SmoothDataViewComponent,
    editDialogClassType: SmoothDataEditComponent,
    newDialogClassType: SmoothDataNewComponent,
  });
    constructor(
        injector: Injector,
        public smoothDataService: SmoothDataService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedSmoothData = new SmoothData();

    

    this.searchForm = this.formBuilder.group({
     	seriesCode : [],
	seriesTitle : [],
	bookNumber : [],
	bookTitle : []
    });

     
  }

  getSmoothDataPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<SmoothData[]> => {
    return this.smoothDataService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.smoothDataService.delete(param.data.id)
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

