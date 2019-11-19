
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { JobData } from 'app/shared/models/job-data';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { JobDataEditComponent } from '../job-data-edit/job-data-edit.component';
import { JobDataNewComponent } from '../job-data-new/job-data-new.component';
import { JobDataViewComponent } from '../job-data-view/job-data-view.component';
import { JobDataService } from '../shared/job-data.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-job-data-list',
  templateUrl: './job-data-list.component.html',
  styleUrls: ['./job-data-list.component.scss'],
  providers: []
})

export class JobDataListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private buildingTypesService: LookupService;
private offeringTypesService: LookupService;
private areasService: LookupService;
private constructionTypesService: LookupService;

  
buildingTypeSelectOptions: MaterialSelectOptions;
offeringTypeSelectOptions: MaterialSelectOptions;
educationalAdministrationSelectOptions: MaterialSelectOptions;
constructionTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('buildingType', { static: true }) BuildingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('educationalAdministration', { static: true }) EducationalAdministrationSelectComponent: MaterialSelectComponent;
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedJobData: JobData;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم المناقصة', field: 'bidNumber' }),
	new GridColumnOptions({ headerName: 'المجموعة', field: 'group' }),
	new GridColumnOptions({ headerName: 'المدرسة', field: 'school' }),
	new GridColumnOptions({ headerName: 'رقم امر الشغل', field: 'workOrderNumber' }),
	new GridColumnOptions({ headerName: 'تاريخ امر الشغل', field: 'workOrderDate' }),
	new GridColumnOptions({ headerName: 'رقم المورد', field: 'supplierNumber' }),
	new GridColumnOptions({ headerName: 'مدة التنفيذ', field: 'executionDuration' }),
	new GridColumnOptions({ headerName: 'العلاوة', field: 'bouns' }),
	new GridColumnOptions({ headerName: 'قيمة امر الشغل', field: 'workOrderValue' }),
	new GridColumnOptions({ headerName: 'القيمة الاجمالية', field: 'totalValue' }),
	new GridColumnOptions({ headerName: 'نوع الصيانة', field: 'maintenanceType' }),
	new GridColumnOptions({ headerName: 'نوع المبنى', field: 'buildingType' }),
	new GridColumnOptions({ headerName: 'نوع الطرح', field: 'offeringType' }),
	new GridColumnOptions({ headerName: 'الادارة التعليمية', field: 'educationalAdministration' }),
	new GridColumnOptions({ headerName: 'نوع الانشاء', field: 'constructionType' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: JobDataViewComponent,
    editDialogClassType: JobDataEditComponent,
    newDialogClassType: JobDataNewComponent,
  });
    constructor(
        injector: Injector,
        public jobDataService: JobDataService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedJobData = new JobData();

    
	this.buildingTypeSelectOptions = new MaterialSelectOptions({
	 data: this.buildingTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع المبنى',
	});

	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});

	this.educationalAdministrationSelectOptions = new MaterialSelectOptions({
	 data: this.areasService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الادارة التعليمية',
	});

	this.constructionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.constructionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الانشاء',
	});


    this.searchForm = this.formBuilder.group({
     	bidNumber : [],
	group : [],
	school : [],
	workOrderNumber : [],
	workOrderDate : [],
	supplierNumber : [],
	executionDuration : [],
	bouns : [],
	workOrderValue : [],
	totalValue : [],
	maintenanceType : [],
	buildingType : [],
	offeringType : [],
	educationalAdministration : [],
	constructionType : []
    });

     
  }

  getJobDataPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<JobData[]> => {
    return this.jobDataService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.jobDataService.delete(param.data.id)
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
    this.buildingTypesService = new LookupService('buildingtypes', this.http);
this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.areasService = new LookupService('areas', this.http);
this.constructionTypesService = new LookupService('constructiontypes', this.http);
  }
}

