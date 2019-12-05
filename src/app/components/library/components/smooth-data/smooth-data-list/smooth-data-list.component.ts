
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { SmoothData } from 'app/shared/models/smooth-data';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { SmoothDataEditComponent } from '../smooth-data-edit/smooth-data-edit.component';
import { SmoothDataNewComponent } from '../smooth-data-new/smooth-data-new.component';
import { SmoothDataViewComponent } from '../smooth-data-view/smooth-data-view.component';
import { SmoothDataService } from '../shared/smooth-data.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

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

