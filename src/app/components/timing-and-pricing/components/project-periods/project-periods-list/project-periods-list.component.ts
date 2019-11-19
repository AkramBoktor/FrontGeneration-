
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { ProjectPeriods } from 'app/shared/models/project-periods';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ProjectPeriodsEditComponent } from '../project-periods-edit/project-periods-edit.component';
import { ProjectPeriodsNewComponent } from '../project-periods-new/project-periods-new.component';
import { ProjectPeriodsViewComponent } from '../project-periods-view/project-periods-view.component';
import { ProjectPeriodsService } from '../shared/project-periods.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-project-periods-list',
  templateUrl: './project-periods-list.component.html',
  styleUrls: ['./project-periods-list.component.scss'],
  providers: []
})

export class ProjectPeriodsListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private governoratesService: LookupService;
private offeringTypesService: LookupService;

  
governorateSelectOptions: MaterialSelectOptions;
offeringTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('governorate', { static: true }) GovernorateSelectComponent: MaterialSelectComponent;
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedProjectPeriods: ProjectPeriods;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود المبنى', field: 'buildingCode' }),
	new GridColumnOptions({ headerName: 'اسم المراجع', field: 'referencesName' }),
	new GridColumnOptions({ headerName: 'رقم المراجع', field: 'referenceNumber' }),
	new GridColumnOptions({ headerName: 'مرات التمديد', field: 'extensionTimes' }),
	new GridColumnOptions({ headerName: 'مرات التمديد', field: 'extensionTimes' }),
	new GridColumnOptions({ headerName: 'مدة التنفيذ', field: 'executionDuration' }),
	new GridColumnOptions({ headerName: 'تاريخ تسليم الموقع', field: 'siteDeliveryDate' }),
	new GridColumnOptions({ headerName: 'اسم المهندس', field: 'engineerName' }),
	new GridColumnOptions({ headerName: 'رقم المهندس', field: 'engineerCode' }),
	new GridColumnOptions({ headerName: 'اسم المقاول', field: 'contractorName' }),
	new GridColumnOptions({ headerName: 'كود المقاول', field: 'contractorCode' }),
	new GridColumnOptions({ headerName: 'رقم المناقصة', field: 'bidNumber' }),
	new GridColumnOptions({ headerName: 'اسم المبنى', field: 'buildingName' }),
	new GridColumnOptions({ headerName: 'ايام تمديد', field: 'extensionDays' }),
	new GridColumnOptions({ headerName: 'تاريخ بدأ التوقف', field: 'beganStopDate' }),
	new GridColumnOptions({ headerName: 'نوع الطرح', field: 'offeringType' }),
	new GridColumnOptions({ headerName: 'المحافظة', field: 'governorate' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: ProjectPeriodsViewComponent,
    editDialogClassType: ProjectPeriodsEditComponent,
    newDialogClassType: ProjectPeriodsNewComponent,
  });
    constructor(
        injector: Injector,
        public projectPeriodsService: ProjectPeriodsService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedProjectPeriods = new ProjectPeriods();

    
	this.governorateSelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المحافظة',
	});

	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});


    this.searchForm = this.formBuilder.group({
     	buildingCode : [],
	buildingName : [],
	bidNumber : [],
	contractorCode : [],
	contractorName : [],
	engineerCode : [],
	engineerName : [],
	siteDeliveryDate : [],
	executionDuration : [],
	extensionTimes : [],
	referenceNumber : [],
	referencesName : [],
	extensionDays : [],
	beganStopDate : [],
	governorate : [],
	offeringType : []
    });

     
  }

  getProjectPeriodsPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<ProjectPeriods[]> => {
    return this.projectPeriodsService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.projectPeriodsService.delete(param.data.id)
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
    this.governoratesService = new LookupService('governorates', this.http);
this.offeringTypesService = new LookupService('offeringtypes', this.http);
  }
}

