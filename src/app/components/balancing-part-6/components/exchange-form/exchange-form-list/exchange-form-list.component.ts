
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { ExchangeForm } from 'app/shared/models/exchange-form';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ExchangeFormEditComponent } from '../exchange-form-edit/exchange-form-edit.component';
import { ExchangeFormNewComponent } from '../exchange-form-new/exchange-form-new.component';
import { ExchangeFormViewComponent } from '../exchange-form-view/exchange-form-view.component';
import { ExchangeFormService } from '../shared/exchange-form.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-exchange-form-list',
  templateUrl: './exchange-form-list.component.html',
  styleUrls: ['./exchange-form-list.component.scss'],
  providers: []
})

export class ExchangeFormListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private areasService: LookupService;

  
zipCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('zipCode', { static: true }) ZipCodeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedExchangeForm: ExchangeForm;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم الاستمارة', field: 'formNumber' }),
	new GridColumnOptions({ headerName: 'تاريخ الاستمارة', field: 'formDate' }),
	new GridColumnOptions({ headerName: 'مبلغ الاستمارة', field: 'formAmount' }),
	new GridColumnOptions({ headerName: 'بيان الاستمارة', field: 'formStatement' }),
	new GridColumnOptions({ headerName: 'رقم المدرسة', field: 'schoolNumber' }),
	new GridColumnOptions({ headerName: 'اسم المدرسة', field: 'schoolName' }),
	new GridColumnOptions({ headerName: 'مبلغ', field: 'amount' }),
	new GridColumnOptions({ headerName: 'اجمالي', field: 'total' }),
	new GridColumnOptions({ headerName: 'رقم المنطقة', field: 'zipCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: ExchangeFormViewComponent,
    editDialogClassType: ExchangeFormEditComponent,
    newDialogClassType: ExchangeFormNewComponent,
  });
    constructor(
        injector: Injector,
        public exchangeFormService: ExchangeFormService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedExchangeForm = new ExchangeForm();

    
	this.zipCodeSelectOptions = new MaterialSelectOptions({
	 data: this.areasService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'رقم المنطقة',
	});


    this.searchForm = this.formBuilder.group({
     	formNumber : [],
	formDate : [],
	formAmount : [],
	formStatement : [],
	schoolNumber : [],
	schoolName : [],
	amount : [],
	total : [],
	zipCode : []
    });

     
  }

  getExchangeFormsPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<ExchangeForm[]> => {
    return this.exchangeFormService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.exchangeFormService.delete(param.data.id)
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
    this.areasService = new LookupService('areas', this.http);
  }
}

