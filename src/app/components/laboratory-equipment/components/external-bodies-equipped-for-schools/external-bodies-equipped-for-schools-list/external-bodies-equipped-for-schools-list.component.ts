
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { ExternalBodiesEquippedForSchools } from 'app/shared/models/external-bodies-equipped-for-schools';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ExternalBodiesEquippedForSchoolsEditComponent } from '../external-bodies-equipped-for-schools-edit/external-bodies-equipped-for-schools-edit.component';
import { ExternalBodiesEquippedForSchoolsNewComponent } from '../external-bodies-equipped-for-schools-new/external-bodies-equipped-for-schools-new.component';
import { ExternalBodiesEquippedForSchoolsViewComponent } from '../external-bodies-equipped-for-schools-view/external-bodies-equipped-for-schools-view.component';
import { ExternalBodiesEquippedForSchoolsService } from '../shared/external-bodies-equipped-for-schools.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-external-bodies-equipped-for-schools-list',
  templateUrl: './external-bodies-equipped-for-schools-list.component.html',
  styleUrls: ['./external-bodies-equipped-for-schools-list.component.scss'],
  providers: []
})

export class ExternalBodiesEquippedForSchoolsListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedExternalBodiesEquippedForSchools: ExternalBodiesEquippedForSchools;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود المورد', field: 'supplierCode' }),
	new GridColumnOptions({ headerName: 'اسم المورد', field: 'supplierName' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: ExternalBodiesEquippedForSchoolsViewComponent,
    editDialogClassType: ExternalBodiesEquippedForSchoolsEditComponent,
    newDialogClassType: ExternalBodiesEquippedForSchoolsNewComponent,
  });
    constructor(
        injector: Injector,
        public externalBodiesEquippedForSchoolsService: ExternalBodiesEquippedForSchoolsService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedExternalBodiesEquippedForSchools = new ExternalBodiesEquippedForSchools();

    

    this.searchForm = this.formBuilder.group({
     	supplierCode : [],
	supplierName : []
    });

     
  }

  getPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<ExternalBodiesEquippedForSchools[]> => {
    return this.externalBodiesEquippedForSchoolsService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.externalBodiesEquippedForSchoolsService.delete(param.data.id)
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

