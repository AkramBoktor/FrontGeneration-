
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { InsuranceCompaniesCodes } from 'app/shared/models/insurance-companies-codes';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { InsuranceCompaniesCodesEditComponent } from '../insurance-companies-codes-edit/insurance-companies-codes-edit.component';
import { InsuranceCompaniesCodesNewComponent } from '../insurance-companies-codes-new/insurance-companies-codes-new.component';
import { InsuranceCompaniesCodesViewComponent } from '../insurance-companies-codes-view/insurance-companies-codes-view.component';
import { InsuranceCompaniesCodesService } from '../shared/insurance-companies-codes.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-insurance-companies-codes-list',
  templateUrl: './insurance-companies-codes-list.component.html',
  styleUrls: ['./insurance-companies-codes-list.component.scss'],
  providers: []
})

export class InsuranceCompaniesCodesListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedInsuranceCompaniesCodes: InsuranceCompaniesCodes;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود الشركة', field: 'companionsCode' }),
	new GridColumnOptions({ headerName: 'اسم الشركة', field: 'companionsName' }),
	new GridColumnOptions({ headerName: 'عنوان الشركة', field: 'companyAddress' }),
	new GridColumnOptions({ headerName: 'تليفون الشركة', field: 'companyPhone' }),
	new GridColumnOptions({ headerName: 'فاكس الشركة', field: 'companyFax' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: InsuranceCompaniesCodesViewComponent,
    editDialogClassType: InsuranceCompaniesCodesEditComponent,
    newDialogClassType: InsuranceCompaniesCodesNewComponent,
  });
    constructor(
        injector: Injector,
        public insuranceCompaniesCodesService: InsuranceCompaniesCodesService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedInsuranceCompaniesCodes = new InsuranceCompaniesCodes();

    

    this.searchForm = this.formBuilder.group({
     	companionsCode : [],
	companionsName : [],
	companyAddress : [],
	companyPhone : [],
	companyFax : []
    });

     
  }

  getInsuranceCompaniesCodesPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<InsuranceCompaniesCodes[]> => {
    return this.insuranceCompaniesCodesService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.insuranceCompaniesCodesService.delete(param.data.id)
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

