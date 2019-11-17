
import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions, GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { FormControlError, GridPaginatedSortedFiltered } from 'app/shared/models/controls/interfaces';
import { DailyPrintErrorData } from 'app/shared/models/daily-print-error-data';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { DailyPrintErrorDataEditComponent } from '../daily-print-error-data-edit/daily-print-error-data-edit.component';
import { DailyPrintErrorDataNewComponent } from '../daily-print-error-data-new/daily-print-error-data-new.component';
import { DailyPrintErrorDataViewComponent } from '../daily-print-error-data-view/daily-print-error-data-view.component';
import { DailyPrintErrorDataService } from '../shared/daily-print-error-data.service';

@Component({
  selector: 'app-daily-print-error-data-list',
  templateUrl: './daily-print-error-data-list.component.html',
  styleUrls: ['./daily-print-error-data-list.component.scss'],
  providers: []
})

export class DailyPrintErrorDataListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedDailyPrintErrorData: DailyPrintErrorData;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'تاريخ اليوم ', field: 'todayDate' }),
	new GridColumnOptions({ headerName: 'كود الموظف', field: 'employeeCode' }),
	new GridColumnOptions({ headerName: 'توقيت الدخول 1', field: 'entryTime1' }),
	new GridColumnOptions({ headerName: 'توقيت الدخول 2', field: 'entryTime2' }),
	new GridColumnOptions({ headerName: 'توقيت الخروج 1', field: 'exitTime1' }),
	new GridColumnOptions({ headerName: 'توقيت الخروج 2', field: 'exitTime2' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: DailyPrintErrorDataViewComponent,
    editDialogClassType: DailyPrintErrorDataEditComponent,
    newDialogClassType: DailyPrintErrorDataNewComponent,
  });
    constructor(
        injector: Injector,
        public dailyPrintErrorDataService: DailyPrintErrorDataService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedDailyPrintErrorData = new DailyPrintErrorData();

    

    this.searchForm = this.formBuilder.group({
     	todayDate : [],
	employeeCode : [],
	entryTime1 : [],
	entryTime2 : [],
	exitTime1 : [],
	exitTime2 : []
    });

     
  }

  getDailyPrintErrorDataPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<DailyPrintErrorData[]> => {
    return this.dailyPrintErrorDataService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.dailyPrintErrorDataService.delete(param.data.id)
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

