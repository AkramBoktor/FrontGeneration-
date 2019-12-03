
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { GrantCodes } from 'app/shared/models/grant-codes';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { GrantCodesEditComponent } from '../grant-codes-edit/grant-codes-edit.component';
import { GrantCodesNewComponent } from '../grant-codes-new/grant-codes-new.component';
import { GrantCodesViewComponent } from '../grant-codes-view/grant-codes-view.component';
import { GrantCodesService } from '../shared/grant-codes.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-grant-codes-list',
  templateUrl: './grant-codes-list.component.html',
  styleUrls: ['./grant-codes-list.component.scss'],
  providers: []
})

export class GrantCodesListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedGrantCodes: GrantCodes;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: '  كود المنحة', field: 'grantCode' }),
	new GridColumnOptions({ headerName: '  اسم المنحة', field: 'grantName' }),
	new GridColumnOptions({ headerName: ' كود الجهة المانحة', field: 'entityCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: GrantCodesViewComponent,
    editDialogClassType: GrantCodesEditComponent,
    newDialogClassType: GrantCodesNewComponent,
  });
    constructor(
        injector: Injector,
        public grantCodesService: GrantCodesService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedGrantCodes = new GrantCodes();

    

    this.searchForm = this.formBuilder.group({
     	grantCode : []
    });

     
  }

  getGrantCodesPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<GrantCodes[]> => {
    return this.grantCodesService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.grantCodesService.delete(param.data.id)
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

