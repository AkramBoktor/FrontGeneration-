
import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { GridColumnOptions, GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { FormControlError, GridPaginatedSortedFiltered } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { EmployeeEducationalQualifications } from 'app/shared/models/employee-educational-qualifications';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { EmployeeEducationalQualificationsEditComponent } from '../employee-educational-qualifications-edit/employee-educational-qualifications-edit.component';
import { EmployeeEducationalQualificationsNewComponent } from '../employee-educational-qualifications-new/employee-educational-qualifications-new.component';
import { EmployeeEducationalQualificationsViewComponent } from '../employee-educational-qualifications-view/employee-educational-qualifications-view.component';
import { EmployeeEducationalQualificationsService } from '../shared/employee-educational-qualifications.service';

@Component({
  selector: 'app-employee-educational-qualifications-list',
  templateUrl: './employee-educational-qualifications-list.component.html',
  styleUrls: ['./employee-educational-qualifications-list.component.scss'],
  providers: []
})

export class EmployeeEducationalQualificationsListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private qualificationsService: LookupService;

  
qualificationSelectOptions: MaterialSelectOptions;

  
	@ViewChild('qualification', { static: true }) QualificationSelectComponent: MaterialSelectComponent;

  
  @Input() selectedEmployeeEducationalQualifications: EmployeeEducationalQualifications;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود الموظف', field: 'employeeCode' }),
	new GridColumnOptions({ headerName: 'تاريخ الحصول عليه', field: 'qualificationDate' }),
	new GridColumnOptions({ headerName: 'المؤهل', field: 'qualification' }),
	new GridColumnOptions({ headerName: 'جهة منح المؤهل', field: 'qualificationGrantSite' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: EmployeeEducationalQualificationsViewComponent,
    editDialogClassType: EmployeeEducationalQualificationsEditComponent,
    newDialogClassType: EmployeeEducationalQualificationsNewComponent,
  });
    constructor(
        injector: Injector,
        public employeeEducationalQualificationsService: EmployeeEducationalQualificationsService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedEmployeeEducationalQualifications = new EmployeeEducationalQualifications();

    
	this.qualificationSelectOptions = new MaterialSelectOptions({
	 data: this.qualificationsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المؤهل',
	});


    this.searchForm = this.formBuilder.group({
     	employeeCode : [],
	qualification : []
    });

     
  }

  getEmployeeEducationalQualificationsPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<EmployeeEducationalQualifications[]> => {
    return this.employeeEducationalQualificationsService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.employeeEducationalQualificationsService.delete(param.data.id)
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
    this.qualificationsService = new LookupService('qualifications', this.http);
  }
}

