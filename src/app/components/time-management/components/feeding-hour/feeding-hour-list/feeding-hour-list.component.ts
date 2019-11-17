
import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions, GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { FormControlError, GridPaginatedSortedFiltered } from 'app/shared/models/controls/interfaces';
import { FeedingHour } from 'app/shared/models/feeding-hour';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { FeedingHourEditComponent } from '../feeding-hour-edit/feeding-hour-edit.component';
import { FeedingHourNewComponent } from '../feeding-hour-new/feeding-hour-new.component';
import { FeedingHourViewComponent } from '../feeding-hour-view/feeding-hour-view.component';
import { FeedingHourService } from '../shared/feeding-hour.service';

@Component({
  selector: 'app-feeding-hour-list',
  templateUrl: './feeding-hour-list.component.html',
  styleUrls: ['./feeding-hour-list.component.scss'],
  providers: []
})

export class FeedingHourListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedFeedingHour: FeedingHour;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود الموظف', field: 'employeeCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: FeedingHourViewComponent,
    editDialogClassType: FeedingHourEditComponent,
    newDialogClassType: FeedingHourNewComponent,
  });
    constructor(
        injector: Injector,
        public feedingHourService: FeedingHourService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedFeedingHour = new FeedingHour();

    

    this.searchForm = this.formBuilder.group({
     	employeeCode : []
    });

     
  }

  getFeedingHoursPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<FeedingHour[]> => {
    return this.feedingHourService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.feedingHourService.delete(param.data.id)
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

