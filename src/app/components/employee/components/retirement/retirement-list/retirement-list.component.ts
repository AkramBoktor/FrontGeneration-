
import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions, GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { FormControlError, GridPaginatedSortedFiltered } from 'app/shared/models/controls/interfaces';
import { Retirement } from 'app/shared/models/retirement';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { RetirementEditComponent } from '../retirement-edit/retirement-edit.component';
import { RetirementNewComponent } from '../retirement-new/retirement-new.component';
import { RetirementViewComponent } from '../retirement-view/retirement-view.component';
import { RetirementService } from '../shared/retirement.service';

@Component({
  selector: 'app-retirement-list',
  templateUrl: './retirement-list.component.html',
  styleUrls: ['./retirement-list.component.scss'],
  providers: []
})

export class RetirementListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedRetirement: Retirement;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود الموظف', field: 'employeeCode' }),
	new GridColumnOptions({ headerName: 'رقم القرار', field: 'decisionCode' }),
	new GridColumnOptions({ headerName: 'تاريخ القرار', field: 'decisionDate' }),
	new GridColumnOptions({ headerName: 'سبب انهاء الخدمه', field: 'terminationReason' }),
	new GridColumnOptions({ headerName: 'تاريخ انهاء الخدمه', field: 'terminationDate' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: RetirementViewComponent,
    editDialogClassType: RetirementEditComponent,
    newDialogClassType: RetirementNewComponent,
  });
    constructor(
        injector: Injector,
        public retirementService: RetirementService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedRetirement = new Retirement();

    

    this.searchForm = this.formBuilder.group({
     	employeeCode : [],
	decisionCode : [],
	decisionDate : [],
	terminationDate : []
    });

     
  }

  getRetirementPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<Retirement[]> => {
    return this.retirementService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.retirementService.delete(param.data.id)
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

