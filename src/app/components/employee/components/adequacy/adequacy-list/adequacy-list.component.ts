
import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { Adequacy } from 'app/shared/models/adequacy';
import { GridColumnOptions, GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { FormControlError, GridPaginatedSortedFiltered } from 'app/shared/models/controls/interfaces';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AdequacyEditComponent } from '../adequacy-edit/adequacy-edit.component';
import { AdequacyNewComponent } from '../adequacy-new/adequacy-new.component';
import { AdequacyViewComponent } from '../adequacy-view/adequacy-view.component';
import { AdequacyService } from '../shared/adequacy.service';

@Component({
  selector: 'app-adequacy-list',
  templateUrl: './adequacy-list.component.html',
  styleUrls: ['./adequacy-list.component.scss'],
  providers: []
})

export class AdequacyListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedAdequacy: Adequacy;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: ' سنة تقرير الكفاية', field: 'adequacyYear' }),
	new GridColumnOptions({ headerName: 'الدرجة', field: 'degree' }),
	new GridColumnOptions({ headerName: 'كود الموظف', field: 'employeeCode' }),
	new GridColumnOptions({ headerName: 'اسم الموظف', field: 'employeeName' }),
	new GridColumnOptions({ headerName: 'التقدير العام', field: 'overallAppreciation' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: AdequacyViewComponent,
    editDialogClassType: AdequacyEditComponent,
    newDialogClassType: AdequacyNewComponent,
  });
    constructor(
        injector: Injector,
        public adequacyService: AdequacyService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedAdequacy = new Adequacy();

    

    this.searchForm = this.formBuilder.group({
     	employeeCode : [],
	employeeName : []
    });

     
  }

  getAdequaciesPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<Adequacy[]> => {
    return this.adequacyService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.adequacyService.delete(param.data.id)
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

