
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { SchoolsDoNotNeedInsurance } from 'app/shared/models/schools-do-not-need-insurance';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { SchoolsDoNotNeedInsuranceEditComponent } from '../schools-do-not-need-insurance-edit/schools-do-not-need-insurance-edit.component';
import { SchoolsDoNotNeedInsuranceNewComponent } from '../schools-do-not-need-insurance-new/schools-do-not-need-insurance-new.component';
import { SchoolsDoNotNeedInsuranceViewComponent } from '../schools-do-not-need-insurance-view/schools-do-not-need-insurance-view.component';
import { SchoolsDoNotNeedInsuranceService } from '../shared/schools-do-not-need-insurance.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-schools-do-not-need-insurance-list',
  templateUrl: './schools-do-not-need-insurance-list.component.html',
  styleUrls: ['./schools-do-not-need-insurance-list.component.scss'],
  providers: []
})

export class SchoolsDoNotNeedInsuranceListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedSchoolsDoNotNeedInsurance: SchoolsDoNotNeedInsurance;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم المكاتبة', field: 'theNumberOfTheLetter' }),
	new GridColumnOptions({ headerName: 'رقم المدرسة', field: 'schoolNumber' }),
	new GridColumnOptions({ headerName: 'رقم الملحق', field: 'annexNumber' }),
	new GridColumnOptions({ headerName: 'رقم النموذج', field: 'modelNumber' }),
	new GridColumnOptions({ headerName: 'عدد الادوار', field: 'numberOfFloors' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: SchoolsDoNotNeedInsuranceViewComponent,
    editDialogClassType: SchoolsDoNotNeedInsuranceEditComponent,
    newDialogClassType: SchoolsDoNotNeedInsuranceNewComponent,
  });
    constructor(
        injector: Injector,
        public schoolsDoNotNeedInsuranceService: SchoolsDoNotNeedInsuranceService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedSchoolsDoNotNeedInsurance = new SchoolsDoNotNeedInsurance();

    

    this.searchForm = this.formBuilder.group({
     	theNumberOfTheLetter : [],
	schoolNumber : [],
	annexNumber : [],
	modelNumber : [],
	numberOfFloors : []
    });

     
  }

  getSchoolsDoNotNeedInsurancePaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<SchoolsDoNotNeedInsurance[]> => {
    return this.schoolsDoNotNeedInsuranceService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.schoolsDoNotNeedInsuranceService.delete(param.data.id)
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

