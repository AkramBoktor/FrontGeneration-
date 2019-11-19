
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { RegistrationOfSchoolsInTheInsuranceCompany } from 'app/shared/models/registration-of-schools-in-the-insurance-company';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { RegistrationOfSchoolsInTheInsuranceCompanyEditComponent } from '../registration-of-schools-in-the-insurance-company-edit/registration-of-schools-in-the-insurance-company-edit.component';
import { RegistrationOfSchoolsInTheInsuranceCompanyNewComponent } from '../registration-of-schools-in-the-insurance-company-new/registration-of-schools-in-the-insurance-company-new.component';
import { RegistrationOfSchoolsInTheInsuranceCompanyViewComponent } from '../registration-of-schools-in-the-insurance-company-view/registration-of-schools-in-the-insurance-company-view.component';
import { RegistrationOfSchoolsInTheInsuranceCompanyService } from '../shared/registration-of-schools-in-the-insurance-company.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-registration-of-schools-in-the-insurance-company-list',
  templateUrl: './registration-of-schools-in-the-insurance-company-list.component.html',
  styleUrls: ['./registration-of-schools-in-the-insurance-company-list.component.scss'],
  providers: []
})

export class RegistrationOfSchoolsInTheInsuranceCompanyListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedRegistrationOfSchoolsInTheInsuranceCompany: RegistrationOfSchoolsInTheInsuranceCompany;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود الشركة', field: 'companyCode' }),
	new GridColumnOptions({ headerName: 'اسم الشركة', field: 'companyname' }),
	new GridColumnOptions({ headerName: 'تاريخ التسجيل', field: 'dateOfRegistration' }),
	new GridColumnOptions({ headerName: 'مبلغ التامين', field: 'amountOfInsurance' }),
	new GridColumnOptions({ headerName: ' رقم المبني', field: 'buildingNumber' }),
	new GridColumnOptions({ headerName: 'رقم الملحق', field: 'annexNumber' }),
	new GridColumnOptions({ headerName: 'عدد الادوار ', field: 'numberOfFloors' }),
	new GridColumnOptions({ headerName: 'كود النموذج', field: 'modelCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: RegistrationOfSchoolsInTheInsuranceCompanyViewComponent,
    editDialogClassType: RegistrationOfSchoolsInTheInsuranceCompanyEditComponent,
    newDialogClassType: RegistrationOfSchoolsInTheInsuranceCompanyNewComponent,
  });
    constructor(
        injector: Injector,
        public registrationOfSchoolsInTheInsuranceCompanyService: RegistrationOfSchoolsInTheInsuranceCompanyService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedRegistrationOfSchoolsInTheInsuranceCompany = new RegistrationOfSchoolsInTheInsuranceCompany();

    

    this.searchForm = this.formBuilder.group({
     	companyCode : [],
	companyname : [],
	dateOfRegistration : [],
	amountOfInsurance : [],
	buildingNumber : [],
	annexNumber : [],
	numberOfFloors : [],
	modelCode : []
    });

     
  }

  getRegistrationOfSchoolsInTheInsuranceCompanyPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<RegistrationOfSchoolsInTheInsuranceCompany[]> => {
    return this.registrationOfSchoolsInTheInsuranceCompanyService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.registrationOfSchoolsInTheInsuranceCompanyService.delete(param.data.id)
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

