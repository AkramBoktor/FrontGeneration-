
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { FormADisbursementForm } from 'app/shared/models/form-a-disbursement-form';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormADisbursementFormEditComponent } from '../form-a-disbursement-form-edit/form-a-disbursement-form-edit.component';
import { FormADisbursementFormNewComponent } from '../form-a-disbursement-form-new/form-a-disbursement-form-new.component';
import { FormADisbursementFormViewComponent } from '../form-a-disbursement-form-view/form-a-disbursement-form-view.component';
import { FormADisbursementFormService } from '../shared/form-a-disbursement-form.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-form-a-disbursement-form-list',
  templateUrl: './form-a-disbursement-form-list.component.html',
  styleUrls: ['./form-a-disbursement-form-list.component.scss'],
  providers: []
})

export class FormADisbursementFormListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private offeringTypesService: LookupService;

  
offeringTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedFormADisbursementForm: FormADisbursementForm;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'اختيار', field: 'selection' }),
	new GridColumnOptions({ headerName: 'نوع التجهيز', field: 'processingType' }),
	new GridColumnOptions({ headerName: 'رقم امر التوريد', field: 'orderNumber' }),
	new GridColumnOptions({ headerName: 'المدرسة', field: 'school' }),
	new GridColumnOptions({ headerName: 'طريقة الطرح', field: 'offeringMethod' }),
	new GridColumnOptions({ headerName: 'رقم المدرسة', field: 'schoolNumber' }),
	new GridColumnOptions({ headerName: 'القيمة', field: 'value' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: FormADisbursementFormViewComponent,
    editDialogClassType: FormADisbursementFormEditComponent,
    newDialogClassType: FormADisbursementFormNewComponent,
  });
    constructor(
        injector: Injector,
        public formADisbursementFormService: FormADisbursementFormService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedFormADisbursementForm = new FormADisbursementForm();

    
	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});


    this.searchForm = this.formBuilder.group({
     	billNumber : [],
	invoicePagesNumber : [],
	invoiceDate : [],
	bidNumber : [],
	companyName : [],
	offeringType : []
    });

     
  }

  getFormADisbursementFormPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<FormADisbursementForm[]> => {
    return this.formADisbursementFormService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.formADisbursementFormService.delete(param.data.id)
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
    this.offeringTypesService = new LookupService('offeringtypes', this.http);
  }
}

