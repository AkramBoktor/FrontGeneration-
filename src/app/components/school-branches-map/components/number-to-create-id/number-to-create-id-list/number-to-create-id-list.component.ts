
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { NumberToCreateID } from 'app/shared/models/number-to-create-id';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { NumberToCreateIDEditComponent } from '../number-to-create-id-edit/number-to-create-id-edit.component';
import { NumberToCreateIDNewComponent } from '../number-to-create-id-new/number-to-create-id-new.component';
import { NumberToCreateIDViewComponent } from '../number-to-create-id-view/number-to-create-id-view.component';
import { NumberToCreateIDService } from '../shared/number-to-create-id.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-number-to-create-id-list',
  templateUrl: './number-to-create-id-list.component.html',
  styleUrls: ['./number-to-create-id-list.component.scss'],
  providers: []
})

export class NumberToCreateIDListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedNumberToCreateID: NumberToCreateID;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'الرقم', field: 'number' }),
	new GridColumnOptions({ headerName: 'تحقق الخانة', field: 'checkDigit' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: NumberToCreateIDViewComponent,
    editDialogClassType: NumberToCreateIDEditComponent,
    newDialogClassType: NumberToCreateIDNewComponent,
  });
    constructor(
        injector: Injector,
        public numberToCreateIDService: NumberToCreateIDService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedNumberToCreateID = new NumberToCreateID();

    

    this.searchForm = this.formBuilder.group({
     	number : [],
	checkDigit : []
    });

     
  }

  getNumberToCreateIDPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<NumberToCreateID[]> => {
    return this.numberToCreateIDService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.numberToCreateIDService.delete(param.data.id)
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

