
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { ElectronicPaymentForm } from 'app/shared/models/electronic-payment-form';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ElectronicPaymentFormEditComponent } from '../electronic-payment-form-edit/electronic-payment-form-edit.component';
import { ElectronicPaymentFormNewComponent } from '../electronic-payment-form-new/electronic-payment-form-new.component';
import { ElectronicPaymentFormViewComponent } from '../electronic-payment-form-view/electronic-payment-form-view.component';
import { ElectronicPaymentFormService } from '../shared/electronic-payment-form.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-electronic-payment-form-list',
  templateUrl: './electronic-payment-form-list.component.html',
  styleUrls: ['./electronic-payment-form-list.component.scss'],
  providers: []
})

export class ElectronicPaymentFormListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private financialDegreesService: LookupService;

  
financialDegreeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('financialDegree', { static: true }) FinancialDegreeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedElectronicPaymentForm: ElectronicPaymentForm;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'تاريخ تسجيل الاستماره', field: 'form55Date' }),
	new GridColumnOptions({ headerName: 'رقم الاستماره', field: 'form55Number' }),
	new GridColumnOptions({ headerName: 'رقم المنطقه الطالبه', field: 'areaNumber' }),
	new GridColumnOptions({ headerName: 'نوع المدفوع', field: 'paidType' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: ElectronicPaymentFormViewComponent,
    editDialogClassType: ElectronicPaymentFormEditComponent,
    newDialogClassType: ElectronicPaymentFormNewComponent,
  });
    constructor(
        injector: Injector,
        public electronicPaymentFormService: ElectronicPaymentFormService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedElectronicPaymentForm = new ElectronicPaymentForm();

    
	this.financialDegreeSelectOptions = new MaterialSelectOptions({
	 data: this.financialDegreesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الدرجه الماليه',
	});


    this.searchForm = this.formBuilder.group({
     	employeeCode : [],
	year : [],
	ratio : [],
	periodBonus : [],
	financialDegree : []
    });

     
  }

  getElectronicPaymentFormsPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<ElectronicPaymentForm[]> => {
    return this.electronicPaymentFormService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.electronicPaymentFormService.delete(param.data.id)
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
    this.financialDegreesService = new LookupService('financialdegrees', this.http);
  }
}

