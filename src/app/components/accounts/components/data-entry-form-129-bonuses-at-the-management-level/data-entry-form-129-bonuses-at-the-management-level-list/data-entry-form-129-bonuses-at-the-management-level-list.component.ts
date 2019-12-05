
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { DataEntryForm129BonusesAtTheManagementLevel } from 'app/shared/models/data-entry-form-129-bonuses-at-the-management-level';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { DataEntryForm129BonusesAtTheManagementLevelEditComponent } from '../data-entry-form-129-bonuses-at-the-management-level-edit/data-entry-form-129-bonuses-at-the-management-level-edit.component';
import { DataEntryForm129BonusesAtTheManagementLevelNewComponent } from '../data-entry-form-129-bonuses-at-the-management-level-new/data-entry-form-129-bonuses-at-the-management-level-new.component';
import { DataEntryForm129BonusesAtTheManagementLevelViewComponent } from '../data-entry-form-129-bonuses-at-the-management-level-view/data-entry-form-129-bonuses-at-the-management-level-view.component';
import { DataEntryForm129BonusesAtTheManagementLevelService } from '../shared/data-entry-form-129-bonuses-at-the-management-level.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-data-entry-form-129-bonuses-at-the-management-level-list',
  templateUrl: './data-entry-form-129-bonuses-at-the-management-level-list.component.html',
  styleUrls: ['./data-entry-form-129-bonuses-at-the-management-level-list.component.scss'],
  providers: []
})

export class DataEntryForm129BonusesAtTheManagementLevelListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedDataEntryForm129BonusesAtTheManagementLevel: DataEntryForm129BonusesAtTheManagementLevel;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم الوارد', field: 'incomingNumber' }),
	new GridColumnOptions({ headerName: 'شهر', field: 'month' }),
	new GridColumnOptions({ headerName: 'كود المكافاه', field: 'bonusCode' }),
	new GridColumnOptions({ headerName: 'شهر وسنه المكافاه', field: 'monthAndYearBonus' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: DataEntryForm129BonusesAtTheManagementLevelViewComponent,
    editDialogClassType: DataEntryForm129BonusesAtTheManagementLevelEditComponent,
    newDialogClassType: DataEntryForm129BonusesAtTheManagementLevelNewComponent,
  });
    constructor(
        injector: Injector,
        public dataEntryForm129BonusesAtTheManagementLevelService: DataEntryForm129BonusesAtTheManagementLevelService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedDataEntryForm129BonusesAtTheManagementLevel = new DataEntryForm129BonusesAtTheManagementLevel();

    

    this.searchForm = this.formBuilder.group({
     	incomingNumber : [],
	month : [],
	bonusCode : [],
	monthAndYearBonus : []
    });

     
  }

  getDataEntryForm129BonusesAtTheManagementLevelPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<DataEntryForm129BonusesAtTheManagementLevel[]> => {
    return this.dataEntryForm129BonusesAtTheManagementLevelService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.dataEntryForm129BonusesAtTheManagementLevelService.delete(param.data.id)
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

