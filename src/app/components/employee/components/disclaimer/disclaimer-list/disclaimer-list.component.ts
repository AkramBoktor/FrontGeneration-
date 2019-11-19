
import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions, GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { FormControlError, GridPaginatedSortedFiltered } from 'app/shared/models/controls/interfaces';
import { Disclaimer } from 'app/shared/models/disclaimer';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { DisclaimerEditComponent } from '../disclaimer-edit/disclaimer-edit.component';
import { DisclaimerNewComponent } from '../disclaimer-new/disclaimer-new.component';
import { DisclaimerViewComponent } from '../disclaimer-view/disclaimer-view.component';
import { DisclaimerService } from '../shared/disclaimer.service';

@Component({
  selector: 'app-disclaimer-list',
  templateUrl: './disclaimer-list.component.html',
  styleUrls: ['./disclaimer-list.component.scss'],
  providers: []
})

export class DisclaimerListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedDisclaimer: Disclaimer;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود الموظف', field: 'employeeCode' }),
	new GridColumnOptions({ headerName: 'تاريخ اخلاء طرف', field: 'disclaimerDate' }),
	new GridColumnOptions({ headerName: 'اسم الموظف', field: 'employeeName' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: DisclaimerViewComponent,
    editDialogClassType: DisclaimerEditComponent,
    newDialogClassType: DisclaimerNewComponent,
  });
    constructor(
        injector: Injector,
        public disclaimerService: DisclaimerService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedDisclaimer = new Disclaimer();

    

    this.searchForm = this.formBuilder.group({
     	employeeCode : [],
	disclaimerDate : [],
	employeeName : []
    });

     
  }

  getDisclaimerPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<Disclaimer[]> => {
    return this.disclaimerService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.disclaimerService.delete(param.data.id)
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

