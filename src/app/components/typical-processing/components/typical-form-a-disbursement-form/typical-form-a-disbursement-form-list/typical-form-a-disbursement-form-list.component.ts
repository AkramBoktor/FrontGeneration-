
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { TypicalFormADisbursementForm } from 'app/shared/models/typical-form-a-disbursement-form';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { TypicalFormADisbursementFormEditComponent } from '../typical-form-a-disbursement-form-edit/typical-form-a-disbursement-form-edit.component';
import { TypicalFormADisbursementFormNewComponent } from '../typical-form-a-disbursement-form-new/typical-form-a-disbursement-form-new.component';
import { TypicalFormADisbursementFormViewComponent } from '../typical-form-a-disbursement-form-view/typical-form-a-disbursement-form-view.component';
import { TypicalFormADisbursementFormService } from '../shared/typical-form-a-disbursement-form.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-typical-form-a-disbursement-form-list',
  templateUrl: './typical-form-a-disbursement-form-list.component.html',
  styleUrls: ['./typical-form-a-disbursement-form-list.component.scss'],
  providers: []
})

export class TypicalFormADisbursementFormListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private offeringTypesService: LookupService;

  
offeringTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedTypicalFormADisbursementForm: TypicalFormADisbursementForm;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'القيمة', field: 'value' }),
	new GridColumnOptions({ headerName: 'رقم المدرسة', field: 'schoolNumber' }),
	new GridColumnOptions({ headerName: 'طريقة الطرح', field: 'offeringMethod' }),
	new GridColumnOptions({ headerName: 'المدرسة', field: 'school' }),
	new GridColumnOptions({ headerName: 'رقم امر التوريد', field: 'orderNumber' }),
	new GridColumnOptions({ headerName: 'نوع التجهيز', field: 'processingType' }),
	new GridColumnOptions({ headerName: 'اختيار', field: 'selection' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: TypicalFormADisbursementFormViewComponent,
    editDialogClassType: TypicalFormADisbursementFormEditComponent,
    newDialogClassType: TypicalFormADisbursementFormNewComponent,
  });
    constructor(
        injector: Injector,
        public typicalFormADisbursementFormService: TypicalFormADisbursementFormService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedTypicalFormADisbursementForm = new TypicalFormADisbursementForm();

    
	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});


    this.searchForm = this.formBuilder.group({
     	companyName : [],
	bidNumber : [],
	invoiceDate : [],
	invoicePagesNumber : [],
	billNumber : [],
	offeringType : []
    });

     
  }

  getTypicalFormADisbursementFormPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<TypicalFormADisbursementForm[]> => {
    return this.typicalFormADisbursementFormService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.typicalFormADisbursementFormService.delete(param.data.id)
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

