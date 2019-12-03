
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { AgendaExternal } from 'app/shared/models/agenda-external';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { AgendaExternalEditComponent } from '../agenda-external-edit/agenda-external-edit.component';
import { AgendaExternalNewComponent } from '../agenda-external-new/agenda-external-new.component';
import { AgendaExternalViewComponent } from '../agenda-external-view/agenda-external-view.component';
import { AgendaExternalService } from '../shared/agenda-external.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-agenda-external-list',
  templateUrl: './agenda-external-list.component.html',
  styleUrls: ['./agenda-external-list.component.scss'],
  providers: []
})

export class AgendaExternalListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedAgendaExternal: AgendaExternal;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم التليفون', field: 'phoneNumber' }),
	new GridColumnOptions({ headerName: 'البريد الالكتروني', field: 'email' }),
	new GridColumnOptions({ headerName: 'جهة جديده', field: 'newThirdParty' }),
	new GridColumnOptions({ headerName: 'وظيفة جديده', field: 'newExternalJob' }),
	new GridColumnOptions({ headerName: 'اسم موظف خارجي', field: 'externalemployeename' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: AgendaExternalViewComponent,
    editDialogClassType: AgendaExternalEditComponent,
    newDialogClassType: AgendaExternalNewComponent,
  });
    constructor(
        injector: Injector,
        public agendaExternalService: AgendaExternalService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedAgendaExternal = new AgendaExternal();

    

    this.searchForm = this.formBuilder.group({
     	phoneNumber : [],
	email : [],
	newThirdParty : [],
	newExternalJob : [],
	externalemployeename : []
    });

     
  }

  getAgendaExternalPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<AgendaExternal[]> => {
    return this.agendaExternalService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.agendaExternalService.delete(param.data.id)
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

