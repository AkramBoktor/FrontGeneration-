
import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions, GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { FormControlError, GridPaginatedSortedFiltered } from 'app/shared/models/controls/interfaces';
import { SanctionsFund } from 'app/shared/models/sanctions-fund';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { SanctionsFundEditComponent } from '../sanctions-fund-edit/sanctions-fund-edit.component';
import { SanctionsFundNewComponent } from '../sanctions-fund-new/sanctions-fund-new.component';
import { SanctionsFundViewComponent } from '../sanctions-fund-view/sanctions-fund-view.component';
import { SanctionsFundService } from '../shared/sanctions-fund.service';

@Component({
  selector: 'app-sanctions-fund-list',
  templateUrl: './sanctions-fund-list.component.html',
  styleUrls: ['./sanctions-fund-list.component.scss'],
  providers: []
})

export class SanctionsFundListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedSanctionsFund: SanctionsFund;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'تاريخ تقديم الطلب', field: 'demandDate' }),
	new GridColumnOptions({ headerName: 'اسم المنحه', field: 'deathName' }),
	new GridColumnOptions({ headerName: 'تاريخ الوفاة', field: 'deathDate' }),
	new GridColumnOptions({ headerName: 'اسم المتوفي', field: 'dietName' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: SanctionsFundViewComponent,
    editDialogClassType: SanctionsFundEditComponent,
    newDialogClassType: SanctionsFundNewComponent,
  });
    constructor(
        injector: Injector,
        public sanctionsFundService: SanctionsFundService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedSanctionsFund = new SanctionsFund();

    

    this.searchForm = this.formBuilder.group({
     	employeeCode : [],
	receiverName : []
    });

     
  }

  getSanctionsFundPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<SanctionsFund[]> => {
    return this.sanctionsFundService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.sanctionsFundService.delete(param.data.id)
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

