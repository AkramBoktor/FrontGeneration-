
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { SalesForms } from 'app/shared/models/sales-forms';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { SalesFormsEditComponent } from '../sales-forms-edit/sales-forms-edit.component';
import { SalesFormsNewComponent } from '../sales-forms-new/sales-forms-new.component';
import { SalesFormsViewComponent } from '../sales-forms-view/sales-forms-view.component';
import { SalesFormsService } from '../shared/sales-forms.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-sales-forms-list',
  templateUrl: './sales-forms-list.component.html',
  styleUrls: ['./sales-forms-list.component.scss'],
  providers: []
})

export class SalesFormsListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private modelTypesService: LookupService;

  
typeOfFormSelectOptions: MaterialSelectOptions;

  
	@ViewChild('typeOfForm', { static: true }) TypeOfFormSelectComponent: MaterialSelectComponent;

  
  @Input() selectedSalesForms: SalesForms;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم المدرسة', field: 'schoolNumber' }),
	new GridColumnOptions({ headerName: 'رقم الاستمارة', field: 'formNumber' }),
	new GridColumnOptions({ headerName: 'اسم صاحب الشان', field: 'nameOfTheOwner' }),
	new GridColumnOptions({ headerName: 'مشهر برقم', field: 'famousForNumber' }),
	new GridColumnOptions({ headerName: 'تاريخ', field: 'date' }),
	new GridColumnOptions({ headerName: 'المساحة', field: 'space' }),
	new GridColumnOptions({ headerName: 'القيمة', field: 'theValue' }),
	new GridColumnOptions({ headerName: 'نوع الاستمارة', field: 'typeOfForm' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: SalesFormsViewComponent,
    editDialogClassType: SalesFormsEditComponent,
    newDialogClassType: SalesFormsNewComponent,
  });
    constructor(
        injector: Injector,
        public salesFormsService: SalesFormsService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedSalesForms = new SalesForms();

    
	this.typeOfFormSelectOptions = new MaterialSelectOptions({
	 data: this.modelTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الاستمارة',
	});


    this.searchForm = this.formBuilder.group({
     	schoolNumber : [],
	formNumber : [],
	nameOfTheOwner : [],
	famousForNumber : [],
	date : [],
	space : [],
	theValue : [],
	typeOfForm : []
    });

     
  }

  getSalesFormsPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<SalesForms[]> => {
    return this.salesFormsService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.salesFormsService.delete(param.data.id)
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
    this.modelTypesService = new LookupService('modeltypes', this.http);
  }
}

