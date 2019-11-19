
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { InsurancePolicyData } from 'app/shared/models/insurance-policy-data';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { InsurancePolicyDataEditComponent } from '../insurance-policy-data-edit/insurance-policy-data-edit.component';
import { InsurancePolicyDataNewComponent } from '../insurance-policy-data-new/insurance-policy-data-new.component';
import { InsurancePolicyDataViewComponent } from '../insurance-policy-data-view/insurance-policy-data-view.component';
import { InsurancePolicyDataService } from '../shared/insurance-policy-data.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-insurance-policy-data-list',
  templateUrl: './insurance-policy-data-list.component.html',
  styleUrls: ['./insurance-policy-data-list.component.scss'],
  providers: []
})

export class InsurancePolicyDataListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedInsurancePolicyData: InsurancePolicyData;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود الشركة المؤمنه', field: 'companyCode' }),
	new GridColumnOptions({ headerName: 'تاريخ وثيقة التأمين', field: 'insurancePolicyDate' }),
	new GridColumnOptions({ headerName: 'رقم وثيقة التأمين', field: 'insurancePolicyCode' }),
	new GridColumnOptions({ headerName: 'كود المبني ', field: 'buildingCode' }),
	new GridColumnOptions({ headerName: 'كود الملحق', field: 'extensionCode' }),
	new GridColumnOptions({ headerName: 'رقم النموزج', field: 'modelCode' }),
	new GridColumnOptions({ headerName: 'عدد الادوار ', field: 'floorsNumber' }),
	new GridColumnOptions({ headerName: 'عدد الفصول ', field: 'classroomNumber' }),
	new GridColumnOptions({ headerName: 'مبلغ التأمين', field: 'insuranceAmount' }),
	new GridColumnOptions({ headerName: 'قسط التامين', field: 'insuranceFee' }),
	new GridColumnOptions({ headerName: 'تاريخ التسليم', field: 'deliveryDate' }),
	new GridColumnOptions({ headerName: 'رقم ايصال السداد', field: 'paymentReceiptNumber' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: InsurancePolicyDataViewComponent,
    editDialogClassType: InsurancePolicyDataEditComponent,
    newDialogClassType: InsurancePolicyDataNewComponent,
  });
    constructor(
        injector: Injector,
        public insurancePolicyDataService: InsurancePolicyDataService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedInsurancePolicyData = new InsurancePolicyData();

    

    this.searchForm = this.formBuilder.group({
     	companyCode : [],
	insurancePolicyDate : [],
	insurancePolicyCode : [],
	buildingCode : [],
	extensionCode : [],
	modelCode : [],
	floorsNumber : [],
	classroomNumber : [],
	insuranceAmount : [],
	insuranceFee : [],
	deliveryDate : [],
	paymentReceiptNumber : []
    });

     
  }

  getInsurancePolicyDataPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<InsurancePolicyData[]> => {
    return this.insurancePolicyDataService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.insurancePolicyDataService.delete(param.data.id)
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

