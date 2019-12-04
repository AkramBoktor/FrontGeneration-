
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { TypicalExternalBodyEquippedForSchools } from 'app/shared/models/typical-external-body-equipped-for-schools';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { TypicalExternalBodyEquippedForSchoolsEditComponent } from '../typical-external-body-equipped-for-schools-edit/typical-external-body-equipped-for-schools-edit.component';
import { TypicalExternalBodyEquippedForSchoolsNewComponent } from '../typical-external-body-equipped-for-schools-new/typical-external-body-equipped-for-schools-new.component';
import { TypicalExternalBodyEquippedForSchoolsViewComponent } from '../typical-external-body-equipped-for-schools-view/typical-external-body-equipped-for-schools-view.component';
import { TypicalExternalBodyEquippedForSchoolsService } from '../shared/typical-external-body-equipped-for-schools.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-typical-external-body-equipped-for-schools-list',
  templateUrl: './typical-external-body-equipped-for-schools-list.component.html',
  styleUrls: ['./typical-external-body-equipped-for-schools-list.component.scss'],
  providers: []
})

export class TypicalExternalBodyEquippedForSchoolsListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedTypicalExternalBodyEquippedForSchools: TypicalExternalBodyEquippedForSchools;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود المورد', field: 'supplierCode' }),
	new GridColumnOptions({ headerName: 'اسم المورد', field: 'supplierName' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: TypicalExternalBodyEquippedForSchoolsViewComponent,
    editDialogClassType: TypicalExternalBodyEquippedForSchoolsEditComponent,
    newDialogClassType: TypicalExternalBodyEquippedForSchoolsNewComponent,
  });
    constructor(
        injector: Injector,
        public typicalExternalBodyEquippedForSchoolsService: TypicalExternalBodyEquippedForSchoolsService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedTypicalExternalBodyEquippedForSchools = new TypicalExternalBodyEquippedForSchools();

    

    this.searchForm = this.formBuilder.group({
     	supplierName : [],
	supplierCode : []
    });

     
  }

  getTypicalExternalBodiesEquippedForSchoolsPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<TypicalExternalBodyEquippedForSchools[]> => {
    return this.typicalExternalBodyEquippedForSchoolsService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.typicalExternalBodyEquippedForSchoolsService.delete(param.data.id)
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

