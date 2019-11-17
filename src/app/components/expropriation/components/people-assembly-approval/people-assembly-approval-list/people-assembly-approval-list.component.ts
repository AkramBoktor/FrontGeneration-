
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { PeopleAssemblyApproval } from 'app/shared/models/people-assembly-approval';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { PeopleAssemblyApprovalEditComponent } from '../people-assembly-approval-edit/people-assembly-approval-edit.component';
import { PeopleAssemblyApprovalNewComponent } from '../people-assembly-approval-new/people-assembly-approval-new.component';
import { PeopleAssemblyApprovalViewComponent } from '../people-assembly-approval-view/people-assembly-approval-view.component';
import { PeopleAssemblyApprovalService } from '../shared/people-assembly-approval.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-people-assembly-approval-list',
  templateUrl: './people-assembly-approval-list.component.html',
  styleUrls: ['./people-assembly-approval-list.component.scss'],
  providers: []
})

export class PeopleAssemblyApprovalListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedPeopleAssemblyApproval: PeopleAssemblyApproval;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم المدرسة', field: 'schoolNumber' }),
	new GridColumnOptions({ headerName: 'الرقم', field: 'theNumber' }),
	new GridColumnOptions({ headerName: 'التاريخ', field: 'date' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: PeopleAssemblyApprovalViewComponent,
    editDialogClassType: PeopleAssemblyApprovalEditComponent,
    newDialogClassType: PeopleAssemblyApprovalNewComponent,
  });
    constructor(
        injector: Injector,
        public peopleAssemblyApprovalService: PeopleAssemblyApprovalService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedPeopleAssemblyApproval = new PeopleAssemblyApproval();

    

    this.searchForm = this.formBuilder.group({
     	schoolNumber : [],
	theNumber : [],
	date : []
    });

     
  }

  getPeopleAssemblyApprovalPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<PeopleAssemblyApproval[]> => {
    return this.peopleAssemblyApprovalService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.peopleAssemblyApprovalService.delete(param.data.id)
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

