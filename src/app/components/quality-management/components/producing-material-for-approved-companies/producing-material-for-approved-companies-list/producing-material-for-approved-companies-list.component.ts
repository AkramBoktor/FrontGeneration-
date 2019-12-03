
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { ProducingMaterialForApprovedCompanies } from 'app/shared/models/producing-material-for-approved-companies';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ProducingMaterialForApprovedCompaniesEditComponent } from '../producing-material-for-approved-companies-edit/producing-material-for-approved-companies-edit.component';
import { ProducingMaterialForApprovedCompaniesNewComponent } from '../producing-material-for-approved-companies-new/producing-material-for-approved-companies-new.component';
import { ProducingMaterialForApprovedCompaniesViewComponent } from '../producing-material-for-approved-companies-view/producing-material-for-approved-companies-view.component';
import { ProducingMaterialForApprovedCompaniesService } from '../shared/producing-material-for-approved-companies.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-producing-material-for-approved-companies-list',
  templateUrl: './producing-material-for-approved-companies-list.component.html',
  styleUrls: ['./producing-material-for-approved-companies-list.component.scss'],
  providers: []
})

export class ProducingMaterialForApprovedCompaniesListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedProducingMaterialForApprovedCompanies: ProducingMaterialForApprovedCompanies;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود الشركة', field: 'companyCode' }),
	new GridColumnOptions({ headerName: 'كود المادة الاساسية', field: 'mainMaterialCode' }),
	new GridColumnOptions({ headerName: 'كود المادة الفرعية', field: 'subMaterialCode' }),
	new GridColumnOptions({ headerName: 'اسم المادة الفرعية', field: 'subMaterialName' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: ProducingMaterialForApprovedCompaniesViewComponent,
    editDialogClassType: ProducingMaterialForApprovedCompaniesEditComponent,
    newDialogClassType: ProducingMaterialForApprovedCompaniesNewComponent,
  });
    constructor(
        injector: Injector,
        public producingMaterialForApprovedCompaniesService: ProducingMaterialForApprovedCompaniesService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedProducingMaterialForApprovedCompanies = new ProducingMaterialForApprovedCompanies();

    

    this.searchForm = this.formBuilder.group({
     	companyCode : [],
	mainMaterialCode : [],
	subMaterialCode : []
    });

     
  }

  getProducingMaterialsForApprovedCompaniesPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<ProducingMaterialForApprovedCompanies[]> => {
    return this.producingMaterialForApprovedCompaniesService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.producingMaterialForApprovedCompaniesService.delete(param.data.id)
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

