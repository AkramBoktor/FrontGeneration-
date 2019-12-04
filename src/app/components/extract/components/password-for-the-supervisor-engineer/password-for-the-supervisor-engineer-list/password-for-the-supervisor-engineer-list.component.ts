
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { PasswordForTheSupervisorEngineer } from 'app/shared/models/password-for-the-supervisor-engineer';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { PasswordForTheSupervisorEngineerEditComponent } from '../password-for-the-supervisor-engineer-edit/password-for-the-supervisor-engineer-edit.component';
import { PasswordForTheSupervisorEngineerNewComponent } from '../password-for-the-supervisor-engineer-new/password-for-the-supervisor-engineer-new.component';
import { PasswordForTheSupervisorEngineerViewComponent } from '../password-for-the-supervisor-engineer-view/password-for-the-supervisor-engineer-view.component';
import { PasswordForTheSupervisorEngineerService } from '../shared/password-for-the-supervisor-engineer.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-password-for-the-supervisor-engineer-list',
  templateUrl: './password-for-the-supervisor-engineer-list.component.html',
  styleUrls: ['./password-for-the-supervisor-engineer-list.component.scss'],
  providers: []
})

export class PasswordForTheSupervisorEngineerListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedPasswordForTheSupervisorEngineer: PasswordForTheSupervisorEngineer;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم المهندس المختص', field: 'specializedEngineerNumber' }),
	new GridColumnOptions({ headerName: 'كلمة المرور', field: 'password' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: PasswordForTheSupervisorEngineerViewComponent,
    editDialogClassType: PasswordForTheSupervisorEngineerEditComponent,
    newDialogClassType: PasswordForTheSupervisorEngineerNewComponent,
  });
    constructor(
        injector: Injector,
        public passwordForTheSupervisorEngineerService: PasswordForTheSupervisorEngineerService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedPasswordForTheSupervisorEngineer = new PasswordForTheSupervisorEngineer();

    

    this.searchForm = this.formBuilder.group({
     	specializedEngineerNumber : [],
	password : []
    });

     
  }

  getPasswordForTheSupervisorEngineersPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<PasswordForTheSupervisorEngineer[]> => {
    return this.passwordForTheSupervisorEngineerService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.passwordForTheSupervisorEngineerService.delete(param.data.id)
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

