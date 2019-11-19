
import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions, GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { FormControlError, GridPaginatedSortedFiltered } from 'app/shared/models/controls/interfaces';
import { PeriodOfWorkForTheClinic } from 'app/shared/models/period-of-work-for-the-clinic';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { PeriodOfWorkForTheClinicEditComponent } from '../period-of-work-for-the-clinic-edit/period-of-work-for-the-clinic-edit.component';
import { PeriodOfWorkForTheClinicNewComponent } from '../period-of-work-for-the-clinic-new/period-of-work-for-the-clinic-new.component';
import { PeriodOfWorkForTheClinicViewComponent } from '../period-of-work-for-the-clinic-view/period-of-work-for-the-clinic-view.component';
import { PeriodOfWorkForTheClinicService } from '../shared/period-of-work-for-the-clinic.service';

@Component({
  selector: 'app-period-of-work-for-the-clinic-list',
  templateUrl: './period-of-work-for-the-clinic-list.component.html',
  styleUrls: ['./period-of-work-for-the-clinic-list.component.scss'],
  providers: []
})

export class PeriodOfWorkForTheClinicListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedPeriodOfWorkForTheClinic: PeriodOfWorkForTheClinic;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'اليوم', field: 'day' }),
	new GridColumnOptions({ headerName: 'من', field: 'from' }),
	new GridColumnOptions({ headerName: 'الى', field: 'to' }),
	new GridColumnOptions({ headerName: 'رقم الطبيب', field: 'employeeCode' }),
	new GridColumnOptions({ headerName: 'اسم الطبيب', field: 'employeeName' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: PeriodOfWorkForTheClinicViewComponent,
    editDialogClassType: PeriodOfWorkForTheClinicEditComponent,
    newDialogClassType: PeriodOfWorkForTheClinicNewComponent,
  });
    constructor(
        injector: Injector,
        public periodOfWorkForTheClinicService: PeriodOfWorkForTheClinicService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedPeriodOfWorkForTheClinic = new PeriodOfWorkForTheClinic();

    

    this.searchForm = this.formBuilder.group({
     	day : [],
	from : [],
	to : [],
	employeeCode : []
    });

     
  }

  getPeriodOfWorkForTheClinicPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<PeriodOfWorkForTheClinic[]> => {
    return this.periodOfWorkForTheClinicService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.periodOfWorkForTheClinicService.delete(param.data.id)
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

