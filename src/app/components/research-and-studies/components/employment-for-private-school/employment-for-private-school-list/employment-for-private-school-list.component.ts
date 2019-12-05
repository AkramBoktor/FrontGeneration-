
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { EmploymentForPrivateSchool } from 'app/shared/models/employment-for-private-school';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { EmploymentForPrivateSchoolEditComponent } from '../employment-for-private-school-edit/employment-for-private-school-edit.component';
import { EmploymentForPrivateSchoolNewComponent } from '../employment-for-private-school-new/employment-for-private-school-new.component';
import { EmploymentForPrivateSchoolViewComponent } from '../employment-for-private-school-view/employment-for-private-school-view.component';
import { EmploymentForPrivateSchoolService } from '../shared/employment-for-private-school.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-employment-for-private-school-list',
  templateUrl: './employment-for-private-school-list.component.html',
  styleUrls: ['./employment-for-private-school-list.component.scss'],
  providers: []
})

export class EmploymentForPrivateSchoolListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedEmploymentForPrivateSchool: EmploymentForPrivateSchool;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'عدد الفصول', field: 'classesNumber' }),
	new GridColumnOptions({ headerName: 'تبعية مدرسة خ', field: 'schoolDependency' }),
	new GridColumnOptions({ headerName: 'كود المرحلة', field: 'phaseCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: EmploymentForPrivateSchoolViewComponent,
    editDialogClassType: EmploymentForPrivateSchoolEditComponent,
    newDialogClassType: EmploymentForPrivateSchoolNewComponent,
  });
    constructor(
        injector: Injector,
        public employmentForPrivateSchoolService: EmploymentForPrivateSchoolService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedEmploymentForPrivateSchool = new EmploymentForPrivateSchool();

    

    this.searchForm = this.formBuilder.group({
     	schoolCode : [],
	approvalDate : [],
	operationDate : []
    });

     
  }

  getEmploymentForPrivateSchoolsPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<EmploymentForPrivateSchool[]> => {
    return this.employmentForPrivateSchoolService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.employmentForPrivateSchoolService.delete(param.data.id)
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

