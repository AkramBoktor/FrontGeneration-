
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { TypicalCodesOfGeneralConditionsForAssays } from 'app/shared/models/typical-codes-of-general-conditions-for-assays';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { TypicalCodesOfGeneralConditionsForAssaysEditComponent } from '../typical-codes-of-general-conditions-for-assays-edit/typical-codes-of-general-conditions-for-assays-edit.component';
import { TypicalCodesOfGeneralConditionsForAssaysNewComponent } from '../typical-codes-of-general-conditions-for-assays-new/typical-codes-of-general-conditions-for-assays-new.component';
import { TypicalCodesOfGeneralConditionsForAssaysViewComponent } from '../typical-codes-of-general-conditions-for-assays-view/typical-codes-of-general-conditions-for-assays-view.component';
import { TypicalCodesOfGeneralConditionsForAssaysService } from '../shared/typical-codes-of-general-conditions-for-assays.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-typical-codes-of-general-conditions-for-assays-list',
  templateUrl: './typical-codes-of-general-conditions-for-assays-list.component.html',
  styleUrls: ['./typical-codes-of-general-conditions-for-assays-list.component.scss'],
  providers: []
})

export class TypicalCodesOfGeneralConditionsForAssaysListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedTypicalCodesOfGeneralConditionsForAssays: TypicalCodesOfGeneralConditionsForAssays;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود الشرط', field: 'conditionCode' }),
	new GridColumnOptions({ headerName: 'اسم الشرط', field: 'conditionName' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: TypicalCodesOfGeneralConditionsForAssaysViewComponent,
    editDialogClassType: TypicalCodesOfGeneralConditionsForAssaysEditComponent,
    newDialogClassType: TypicalCodesOfGeneralConditionsForAssaysNewComponent,
  });
    constructor(
        injector: Injector,
        public typicalCodesOfGeneralConditionsForAssaysService: TypicalCodesOfGeneralConditionsForAssaysService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedTypicalCodesOfGeneralConditionsForAssays = new TypicalCodesOfGeneralConditionsForAssays();

    

    this.searchForm = this.formBuilder.group({
     	conditionCode : []
    });

     
  }

  getTypicalCodesOfGeneralConditionsForAssaysPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<TypicalCodesOfGeneralConditionsForAssays[]> => {
    return this.typicalCodesOfGeneralConditionsForAssaysService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.typicalCodesOfGeneralConditionsForAssaysService.delete(param.data.id)
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

