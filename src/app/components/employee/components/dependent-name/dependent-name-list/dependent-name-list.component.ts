
import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions, GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { FormControlError, GridPaginatedSortedFiltered } from 'app/shared/models/controls/interfaces';
import { DependentName } from 'app/shared/models/dependent-name';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { DependentNameEditComponent } from '../dependent-name-edit/dependent-name-edit.component';
import { DependentNameNewComponent } from '../dependent-name-new/dependent-name-new.component';
import { DependentNameViewComponent } from '../dependent-name-view/dependent-name-view.component';
import { DependentNameService } from '../shared/dependent-name.service';

@Component({
  selector: 'app-dependent-name-list',
  templateUrl: './dependent-name-list.component.html',
  styleUrls: ['./dependent-name-list.component.scss'],
  providers: []
})

export class DependentNameListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedDependentName: DependentName;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود الموظف', field: 'employeeCode' }),
	new GridColumnOptions({ headerName: 'الاسم', field: 'name' }),
	new GridColumnOptions({ headerName: 'تاريخ الميلاد', field: 'birthDate' }),
	new GridColumnOptions({ headerName: 'نوع العلاقه', field: 'relationshipType' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: DependentNameViewComponent,
    editDialogClassType: DependentNameEditComponent,
    newDialogClassType: DependentNameNewComponent,
  });
    constructor(
        injector: Injector,
        public dependentNameService: DependentNameService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedDependentName = new DependentName();

    

    this.searchForm = this.formBuilder.group({
     	employeeCode : []
    });

     
  }

  getDependentNamesPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<DependentName[]> => {
    return this.dependentNameService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.dependentNameService.delete(param.data.id)
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

