
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { DataEntryForm129Corrections } from 'app/shared/models/data-entry-form-129-corrections';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { DataEntryForm129CorrectionsEditComponent } from '../data-entry-form-129-corrections-edit/data-entry-form-129-corrections-edit.component';
import { DataEntryForm129CorrectionsNewComponent } from '../data-entry-form-129-corrections-new/data-entry-form-129-corrections-new.component';
import { DataEntryForm129CorrectionsViewComponent } from '../data-entry-form-129-corrections-view/data-entry-form-129-corrections-view.component';
import { DataEntryForm129CorrectionsService } from '../shared/data-entry-form-129-corrections.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-data-entry-form-129-corrections-list',
  templateUrl: './data-entry-form-129-corrections-list.component.html',
  styleUrls: ['./data-entry-form-129-corrections-list.component.scss'],
  providers: []
})

export class DataEntryForm129CorrectionsListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedDataEntryForm129Corrections: DataEntryForm129Corrections;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم التصويب', field: 'correctionNumber' }),
	new GridColumnOptions({ headerName: 'شهروسنه الوارد', field: 'month' }),
	new GridColumnOptions({ headerName: 'رقم الوارد', field: 'incomingNumber' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: DataEntryForm129CorrectionsViewComponent,
    editDialogClassType: DataEntryForm129CorrectionsEditComponent,
    newDialogClassType: DataEntryForm129CorrectionsNewComponent,
  });
    constructor(
        injector: Injector,
        public dataEntryForm129CorrectionsService: DataEntryForm129CorrectionsService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedDataEntryForm129Corrections = new DataEntryForm129Corrections();

    

    this.searchForm = this.formBuilder.group({
     	correctionNumber : [],
	month : [],
	incomingNumber : []
    });

     
  }

  getDataEntryForm129CorrectionsPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<DataEntryForm129Corrections[]> => {
    return this.dataEntryForm129CorrectionsService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.dataEntryForm129CorrectionsService.delete(param.data.id)
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

