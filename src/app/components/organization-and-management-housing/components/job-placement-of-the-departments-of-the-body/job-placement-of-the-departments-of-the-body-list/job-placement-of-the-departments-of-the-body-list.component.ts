
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { JobPlacementOfTheDepartmentsOfTheBody } from 'app/shared/models/job-placement-of-the-departments-of-the-body';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { JobPlacementOfTheDepartmentsOfTheBodyEditComponent } from '../job-placement-of-the-departments-of-the-body-edit/job-placement-of-the-departments-of-the-body-edit.component';
import { JobPlacementOfTheDepartmentsOfTheBodyNewComponent } from '../job-placement-of-the-departments-of-the-body-new/job-placement-of-the-departments-of-the-body-new.component';
import { JobPlacementOfTheDepartmentsOfTheBodyViewComponent } from '../job-placement-of-the-departments-of-the-body-view/job-placement-of-the-departments-of-the-body-view.component';
import { JobPlacementOfTheDepartmentsOfTheBodyService } from '../shared/job-placement-of-the-departments-of-the-body.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-job-placement-of-the-departments-of-the-body-list',
  templateUrl: './job-placement-of-the-departments-of-the-body-list.component.html',
  styleUrls: ['./job-placement-of-the-departments-of-the-body-list.component.scss'],
  providers: []
})

export class JobPlacementOfTheDepartmentsOfTheBodyListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private centralDepartmentsService: LookupService;
private subDepartmentsService: LookupService;
private jobTypesService: LookupService;

  
centralAdministrationSelectOptions: MaterialSelectOptions;
subAdministrationSelectOptions: MaterialSelectOptions;
jobDwellingonthemSelectOptions: MaterialSelectOptions;

  
	@ViewChild('centralAdministration', { static: true }) CentralAdministrationSelectComponent: MaterialSelectComponent;
	@ViewChild('subAdministration', { static: true }) SubAdministrationSelectComponent: MaterialSelectComponent;
	@ViewChild('jobDwellingonthem', { static: true }) JobDwellingonthemSelectComponent: MaterialSelectComponent;

  
  @Input() selectedJobPlacementOfTheDepartmentsOfTheBody: JobPlacementOfTheDepartmentsOfTheBody;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'الموظف التابع للاداره', field: 'departmentEmployee' }),
	new GridColumnOptions({ headerName: 'تاريخ التسكين', field: 'analgesiaDate' }),
	new GridColumnOptions({ headerName: 'الاداره المركزيه', field: 'centralAdministration' }),
	new GridColumnOptions({ headerName: 'الاداره الفرعيه', field: 'subAdministration' }),
	new GridColumnOptions({ headerName: 'الوظيفه المسكن عليها ', field: 'jobDwellingonthem' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: JobPlacementOfTheDepartmentsOfTheBodyViewComponent,
    editDialogClassType: JobPlacementOfTheDepartmentsOfTheBodyEditComponent,
    newDialogClassType: JobPlacementOfTheDepartmentsOfTheBodyNewComponent,
  });
    constructor(
        injector: Injector,
        public jobPlacementOfTheDepartmentsOfTheBodyService: JobPlacementOfTheDepartmentsOfTheBodyService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedJobPlacementOfTheDepartmentsOfTheBody = new JobPlacementOfTheDepartmentsOfTheBody();

    
	this.centralAdministrationSelectOptions = new MaterialSelectOptions({
	 data: this.centralDepartmentsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الاداره المركزيه',
	});

	this.subAdministrationSelectOptions = new MaterialSelectOptions({
	 data: this.subDepartmentsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الاداره الفرعيه',
	});

	this.jobDwellingonthemSelectOptions = new MaterialSelectOptions({
	 data: this.jobTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الوظيفه المسكن عليها ',
	});


    this.searchForm = this.formBuilder.group({
     	departmentEmployee : [],
	analgesiaDate : [],
	centralAdministration : [],
	subAdministration : [],
	jobDwellingonthem : []
    });

     
  }

  getJobPlacementOfTheDepartmentsOfTheBodyPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<JobPlacementOfTheDepartmentsOfTheBody[]> => {
    return this.jobPlacementOfTheDepartmentsOfTheBodyService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.jobPlacementOfTheDepartmentsOfTheBodyService.delete(param.data.id)
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
    this.centralDepartmentsService = new LookupService('centraldepartments', this.http);
this.subDepartmentsService = new LookupService('subdepartments', this.http);
this.jobTypesService = new LookupService('jobtypes', this.http);
  }
}

