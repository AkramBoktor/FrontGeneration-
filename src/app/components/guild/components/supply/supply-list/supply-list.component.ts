
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { Supply } from 'app/shared/models/supply';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { SupplyEditComponent } from '../supply-edit/supply-edit.component';
import { SupplyNewComponent } from '../supply-new/supply-new.component';
import { SupplyViewComponent } from '../supply-view/supply-view.component';
import { SupplyService } from '../shared/supply.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-supply-list',
  templateUrl: './supply-list.component.html',
  styleUrls: ['./supply-list.component.scss'],
  providers: []
})

export class SupplyListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedSupply: Supply;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: ' رقم القيمة ', field: 'valueNumber' }),
	new GridColumnOptions({ headerName: ' تاريخ   القيمة', field: 'valueDate' }),
	new GridColumnOptions({ headerName: ' المبلغ القيمة', field: 'valueAmount' }),
	new GridColumnOptions({ headerName: ' من ', field: 'from' }),
	new GridColumnOptions({ headerName: ' الي', field: 'to' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: SupplyViewComponent,
    editDialogClassType: SupplyEditComponent,
    newDialogClassType: SupplyNewComponent,
  });
    constructor(
        injector: Injector,
        public supplyService: SupplyService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedSupply = new Supply();

    

    this.searchForm = this.formBuilder.group({
     	valueNumber : [],
	from : [],
	to : []
    });

     
  }

  getSupplyPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<Supply[]> => {
    return this.supplyService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.supplyService.delete(param.data.id)
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

