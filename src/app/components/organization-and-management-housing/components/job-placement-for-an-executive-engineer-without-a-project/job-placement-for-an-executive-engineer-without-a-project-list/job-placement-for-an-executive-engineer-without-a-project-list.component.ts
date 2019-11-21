
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { JobPlacementForAnExecutiveEngineerWithoutAProject } from 'app/shared/models/job-placement-for-an-executive-engineer-without-a-project';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { JobPlacementForAnExecutiveEngineerWithoutAProjectEditComponent } from '../job-placement-for-an-executive-engineer-without-a-project-edit/job-placement-for-an-executive-engineer-without-a-project-edit.component';
import { JobPlacementForAnExecutiveEngineerWithoutAProjectNewComponent } from '../job-placement-for-an-executive-engineer-without-a-project-new/job-placement-for-an-executive-engineer-without-a-project-new.component';
import { JobPlacementForAnExecutiveEngineerWithoutAProjectViewComponent } from '../job-placement-for-an-executive-engineer-without-a-project-view/job-placement-for-an-executive-engineer-without-a-project-view.component';
import { JobPlacementForAnExecutiveEngineerWithoutAProjectService } from '../shared/job-placement-for-an-executive-engineer-without-a-project.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-job-placement-for-an-executive-engineer-without-a-project-list',
  templateUrl: './job-placement-for-an-executive-engineer-without-a-project-list.component.html',
  styleUrls: ['./job-placement-for-an-executive-engineer-without-a-project-list.component.scss'],
  providers: []
})

export class JobPlacementForAnExecutiveEngineerWithoutAProjectListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private branchCodesService: LookupService;
private sectionsOrCentersService: LookupService;
private jobTypesService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;
departmentSelectOptions: MaterialSelectOptions;
jobDwellingonThemSelectOptions: MaterialSelectOptions;

  
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('department', { static: true }) DepartmentSelectComponent: MaterialSelectComponent;
	@ViewChild('jobDwellingonThem', { static: true }) JobDwellingonThemSelectComponent: MaterialSelectComponent;

  
  @Input() selectedJobPlacementForAnExecutiveEngineerWithoutAProject: JobPlacementForAnExecutiveEngineerWithoutAProject;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم الموظف', field: 'employeeCode' }),
	new GridColumnOptions({ headerName: 'تاريخ التسكين', field: 'hiringdate' }),
	new GridColumnOptions({ headerName: 'رقم الفرع', field: 'branchCode' }),
	new GridColumnOptions({ headerName: 'القسم', field: 'department' }),
	new GridColumnOptions({ headerName: 'الوظيفه المسكن عليها ', field: 'jobDwellingonThem' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: JobPlacementForAnExecutiveEngineerWithoutAProjectViewComponent,
    editDialogClassType: JobPlacementForAnExecutiveEngineerWithoutAProjectEditComponent,
    newDialogClassType: JobPlacementForAnExecutiveEngineerWithoutAProjectNewComponent,
  });
    constructor(
        injector: Injector,
        public jobPlacementForAnExecutiveEngineerWithoutAProjectService: JobPlacementForAnExecutiveEngineerWithoutAProjectService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedJobPlacementForAnExecutiveEngineerWithoutAProject = new JobPlacementForAnExecutiveEngineerWithoutAProject();

    
	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'رقم الفرع',
	});

	this.departmentSelectOptions = new MaterialSelectOptions({
	 data: this.sectionsOrCentersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'القسم',
	});

	this.jobDwellingonThemSelectOptions = new MaterialSelectOptions({
	 data: this.jobTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الوظيفه المسكن عليها ',
	});


    this.searchForm = this.formBuilder.group({
     	employeeCode : [],
	hiringdate : [],
	branchCode : [],
	department : [],
	jobDwellingonThem : []
    });

     
  }

  getJobPlacementForAnExecutiveEngineersWithoutAProjectsPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<JobPlacementForAnExecutiveEngineerWithoutAProject[]> => {
    return this.jobPlacementForAnExecutiveEngineerWithoutAProjectService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.jobPlacementForAnExecutiveEngineerWithoutAProjectService.delete(param.data.id)
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
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
this.jobTypesService = new LookupService('jobtypes', this.http);
  }
}

