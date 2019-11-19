
import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions, GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { FormControlError, GridPaginatedSortedFiltered } from 'app/shared/models/controls/interfaces';
import { PeriodOfWorkForThePharmacy } from 'app/shared/models/period-of-work-for-the-pharmacy';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { PeriodOfWorkForThePharmacyEditComponent } from '../period-of-work-for-the-pharmacy-edit/period-of-work-for-the-pharmacy-edit.component';
import { PeriodOfWorkForThePharmacyNewComponent } from '../period-of-work-for-the-pharmacy-new/period-of-work-for-the-pharmacy-new.component';
import { PeriodOfWorkForThePharmacyViewComponent } from '../period-of-work-for-the-pharmacy-view/period-of-work-for-the-pharmacy-view.component';
import { PeriodOfWorkForThePharmacyService } from '../shared/period-of-work-for-the-pharmacy.service';

@Component({
  selector: 'app-period-of-work-for-the-pharmacy-list',
  templateUrl: './period-of-work-for-the-pharmacy-list.component.html',
  styleUrls: ['./period-of-work-for-the-pharmacy-list.component.scss'],
  providers: []
})

export class PeriodOfWorkForThePharmacyListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedPeriodOfWorkForThePharmacy: PeriodOfWorkForThePharmacy;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'اليوم', field: 'day' }),
	new GridColumnOptions({ headerName: 'من', field: 'from' }),
	new GridColumnOptions({ headerName: 'الى', field: 'to' }),
	new GridColumnOptions({ headerName: 'كود الصيدلى', field: 'employeeCode' }),
	new GridColumnOptions({ headerName: 'اسم الصيدلي', field: 'employeeName' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: PeriodOfWorkForThePharmacyViewComponent,
    editDialogClassType: PeriodOfWorkForThePharmacyEditComponent,
    newDialogClassType: PeriodOfWorkForThePharmacyNewComponent,
  });
    constructor(
        injector: Injector,
        public periodOfWorkForThePharmacyService: PeriodOfWorkForThePharmacyService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedPeriodOfWorkForThePharmacy = new PeriodOfWorkForThePharmacy();

    

    this.searchForm = this.formBuilder.group({
     	day : [],
	from : [],
	to : [],
	employeeCode : [],
	employeeName : []
    });

     
  }

  getPeriodOfWorkForThePharmacyPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<PeriodOfWorkForThePharmacy[]> => {
    return this.periodOfWorkForThePharmacyService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.periodOfWorkForThePharmacyService.delete(param.data.id)
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

