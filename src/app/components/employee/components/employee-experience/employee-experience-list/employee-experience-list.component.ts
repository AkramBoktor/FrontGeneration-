
import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { GridColumnOptions, GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { FormControlError, GridPaginatedSortedFiltered } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { EmployeeExperience } from 'app/shared/models/employee-experience';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { EmployeeExperienceEditComponent } from '../employee-experience-edit/employee-experience-edit.component';
import { EmployeeExperienceNewComponent } from '../employee-experience-new/employee-experience-new.component';
import { EmployeeExperienceViewComponent } from '../employee-experience-view/employee-experience-view.component';
import { EmployeeExperienceService } from '../shared/employee-experience.service';

@Component({
  selector: 'app-employee-experience-list',
  templateUrl: './employee-experience-list.component.html',
  styleUrls: ['./employee-experience-list.component.scss'],
  providers: []
})

export class EmployeeExperienceListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private experiencePeriodTypesService: LookupService;
private financialDegreesService: LookupService;
private jobTypesService: LookupService;

  
experienceTypeSelectOptions: MaterialSelectOptions;
financialDegreeSelectOptions: MaterialSelectOptions;
jobTitleSelectOptions: MaterialSelectOptions;

  
	@ViewChild('experienceType', { static: true }) ExperienceTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('financialDegree', { static: true }) FinancialDegreeSelectComponent: MaterialSelectComponent;
	@ViewChild('jobTitle', { static: true }) JobTitleSelectComponent: MaterialSelectComponent;

  
  @Input() selectedEmployeeExperience: EmployeeExperience;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'تاريخ بداية الخبرة', field: 'experienceStartDate' }),
	new GridColumnOptions({ headerName: 'تاريخ نهاية الخبرة', field: 'experienceEndDate' }),
	new GridColumnOptions({ headerName: 'جهة الخبرة', field: 'experienceEntity' }),
	new GridColumnOptions({ headerName: 'كود الموظف', field: 'employeeCode' }),
	new GridColumnOptions({ headerName: 'نوع الخبرة', field: 'experienceType' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: EmployeeExperienceViewComponent,
    editDialogClassType: EmployeeExperienceEditComponent,
    newDialogClassType: EmployeeExperienceNewComponent,
  });
    constructor(
        injector: Injector,
        public employeeExperienceService: EmployeeExperienceService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedEmployeeExperience = new EmployeeExperience();

    
	this.experienceTypeSelectOptions = new MaterialSelectOptions({
	 data: this.experiencePeriodTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الخبرة',
	});

	this.financialDegreeSelectOptions = new MaterialSelectOptions({
	 data: this.financialDegreesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الدرجة المالية',
	});

	this.jobTitleSelectOptions = new MaterialSelectOptions({
	 data: this.jobTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الوظيفة',
	});


    this.searchForm = this.formBuilder.group({
     	experienceStartDate : [],
	experienceEndDate : [],
	experienceEntity : [],
	unionMembershipDate : [],
	employeeCode : [],
	experienceType : [],
	financialDegree : [],
	jobTitle : []
    });

     
  }

  getEmployeeExperiencePaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<EmployeeExperience[]> => {
    return this.employeeExperienceService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.employeeExperienceService.delete(param.data.id)
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
    this.experiencePeriodTypesService = new LookupService('experienceperiodtypes', this.http);
this.financialDegreesService = new LookupService('financialdegrees', this.http);
this.jobTypesService = new LookupService('jobtypes', this.http);
  }
}

