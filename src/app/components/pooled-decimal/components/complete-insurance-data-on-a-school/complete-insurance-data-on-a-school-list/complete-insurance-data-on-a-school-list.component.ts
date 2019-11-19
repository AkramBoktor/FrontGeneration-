
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { CompleteInsuranceDataOnASchool } from 'app/shared/models/complete-insurance-data-on-a-school';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { CompleteInsuranceDataOnASchoolEditComponent } from '../complete-insurance-data-on-a-school-edit/complete-insurance-data-on-a-school-edit.component';
import { CompleteInsuranceDataOnASchoolNewComponent } from '../complete-insurance-data-on-a-school-new/complete-insurance-data-on-a-school-new.component';
import { CompleteInsuranceDataOnASchoolViewComponent } from '../complete-insurance-data-on-a-school-view/complete-insurance-data-on-a-school-view.component';
import { CompleteInsuranceDataOnASchoolService } from '../shared/complete-insurance-data-on-a-school.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-complete-insurance-data-on-a-school-list',
  templateUrl: './complete-insurance-data-on-a-school-list.component.html',
  styleUrls: ['./complete-insurance-data-on-a-school-list.component.scss'],
  providers: []
})

export class CompleteInsuranceDataOnASchoolListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedCompleteInsuranceDataOnASchool: CompleteInsuranceDataOnASchool;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود المبني', field: 'buildingCode' }),
	new GridColumnOptions({ headerName: 'رقم الملحق', field: 'extensionCode' }),
	new GridColumnOptions({ headerName: 'نوع المدرسة', field: 'schoolType' }),
	new GridColumnOptions({ headerName: 'رقم النموزج', field: 'modelNumber' }),
	new GridColumnOptions({ headerName: 'عدد الادوار', field: 'floorsNumber' }),
	new GridColumnOptions({ headerName: 'عدد الفصول ', field: 'classroomNumber' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: CompleteInsuranceDataOnASchoolViewComponent,
    editDialogClassType: CompleteInsuranceDataOnASchoolEditComponent,
    newDialogClassType: CompleteInsuranceDataOnASchoolNewComponent,
  });
    constructor(
        injector: Injector,
        public completeInsuranceDataOnASchoolService: CompleteInsuranceDataOnASchoolService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedCompleteInsuranceDataOnASchool = new CompleteInsuranceDataOnASchool();

    

    this.searchForm = this.formBuilder.group({
     	buildingCode : [],
	extensionCode : [],
	schoolType : [],
	modelNumber : [],
	floorsNumber : [],
	classroomNumber : []
    });

     
  }

  getCompleteInsuranceDataOnASchoolPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<CompleteInsuranceDataOnASchool[]> => {
    return this.completeInsuranceDataOnASchoolService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.completeInsuranceDataOnASchoolService.delete(param.data.id)
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

