
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { ExtensionInsurancePolicyData } from 'app/shared/models/extension-insurance-policy-data';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ExtensionInsurancePolicyDataEditComponent } from '../extension-insurance-policy-data-edit/extension-insurance-policy-data-edit.component';
import { ExtensionInsurancePolicyDataNewComponent } from '../extension-insurance-policy-data-new/extension-insurance-policy-data-new.component';
import { ExtensionInsurancePolicyDataViewComponent } from '../extension-insurance-policy-data-view/extension-insurance-policy-data-view.component';
import { ExtensionInsurancePolicyDataService } from '../shared/extension-insurance-policy-data.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-extension-insurance-policy-data-list',
  templateUrl: './extension-insurance-policy-data-list.component.html',
  styleUrls: ['./extension-insurance-policy-data-list.component.scss'],
  providers: []
})

export class ExtensionInsurancePolicyDataListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedExtensionInsurancePolicyData: ExtensionInsurancePolicyData;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود المبني', field: 'buildingCode' }),
	new GridColumnOptions({ headerName: 'شركه التأمين', field: 'insuranceCompany' }),
	new GridColumnOptions({ headerName: 'رقم النموزج', field: 'modelCode' }),
	new GridColumnOptions({ headerName: 'عدد الادوار', field: 'floorsNumber' }),
	new GridColumnOptions({ headerName: 'عدد الفصول ', field: 'classroomNumber' }),
	new GridColumnOptions({ headerName: 'تاريخ الملحق', field: 'extensionDate' }),
	new GridColumnOptions({ headerName: 'رقم الملحق', field: 'extensionCode' }),
	new GridColumnOptions({ headerName: 'مبلغ الملحق', field: 'extensionAmount' }),
	new GridColumnOptions({ headerName: 'قسط التامين', field: 'insuranceFee' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: ExtensionInsurancePolicyDataViewComponent,
    editDialogClassType: ExtensionInsurancePolicyDataEditComponent,
    newDialogClassType: ExtensionInsurancePolicyDataNewComponent,
  });
    constructor(
        injector: Injector,
        public extensionInsurancePolicyDataService: ExtensionInsurancePolicyDataService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedExtensionInsurancePolicyData = new ExtensionInsurancePolicyData();

    

    this.searchForm = this.formBuilder.group({
     	buildingCode : [],
	insuranceCompany : [],
	modelCode : [],
	floorsNumber : [],
	classroomNumber : [],
	extensionDate : [],
	extensionCode : [],
	extensionAmount : [],
	insuranceFee : []
    });

     
  }

  getExtensionInsurancePolicyDataPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<ExtensionInsurancePolicyData[]> => {
    return this.extensionInsurancePolicyDataService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.extensionInsurancePolicyDataService.delete(param.data.id)
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

