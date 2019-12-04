
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { CompleteTheDataOfSupervisorEngineer } from 'app/shared/models/complete-the-data-of-supervisor-engineer';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { CompleteTheDataOfSupervisorEngineerEditComponent } from '../complete-the-data-of-supervisor-engineer-edit/complete-the-data-of-supervisor-engineer-edit.component';
import { CompleteTheDataOfSupervisorEngineerNewComponent } from '../complete-the-data-of-supervisor-engineer-new/complete-the-data-of-supervisor-engineer-new.component';
import { CompleteTheDataOfSupervisorEngineerViewComponent } from '../complete-the-data-of-supervisor-engineer-view/complete-the-data-of-supervisor-engineer-view.component';
import { CompleteTheDataOfSupervisorEngineerService } from '../shared/complete-the-data-of-supervisor-engineer.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-complete-the-data-of-supervisor-engineer-list',
  templateUrl: './complete-the-data-of-supervisor-engineer-list.component.html',
  styleUrls: ['./complete-the-data-of-supervisor-engineer-list.component.scss'],
  providers: []
})

export class CompleteTheDataOfSupervisorEngineerListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedCompleteTheDataOfSupervisorEngineer: CompleteTheDataOfSupervisorEngineer;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم الموظف', field: 'employeeCode' }),
	new GridColumnOptions({ headerName: 'رقم تليفون 1', field: 'phoneNumber1' }),
	new GridColumnOptions({ headerName: 'رقم تليفون 2', field: 'phoneNumber2' }),
	new GridColumnOptions({ headerName: 'رقم تليفون 3', field: 'phoneNumber3' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: CompleteTheDataOfSupervisorEngineerViewComponent,
    editDialogClassType: CompleteTheDataOfSupervisorEngineerEditComponent,
    newDialogClassType: CompleteTheDataOfSupervisorEngineerNewComponent,
  });
    constructor(
        injector: Injector,
        public completeTheDataOfSupervisorEngineerService: CompleteTheDataOfSupervisorEngineerService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedCompleteTheDataOfSupervisorEngineer = new CompleteTheDataOfSupervisorEngineer();

    

    this.searchForm = this.formBuilder.group({
     	employeeCode : []
    });

     
  }

  getCompleteTheDataOfSupervisorEngineerPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<CompleteTheDataOfSupervisorEngineer[]> => {
    return this.completeTheDataOfSupervisorEngineerService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.completeTheDataOfSupervisorEngineerService.delete(param.data.id)
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

