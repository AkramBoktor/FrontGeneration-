
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { SchoolPeriod } from 'app/shared/models/school-period';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { SchoolPeriodEditComponent } from '../school-period-edit/school-period-edit.component';
import { SchoolPeriodNewComponent } from '../school-period-new/school-period-new.component';
import { SchoolPeriodViewComponent } from '../school-period-view/school-period-view.component';
import { SchoolPeriodService } from '../shared/school-period.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-school-period-list',
  templateUrl: './school-period-list.component.html',
  styleUrls: ['./school-period-list.component.scss'],
  providers: []
})

export class SchoolPeriodListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private regionalCenterCodesService: LookupService;
private branchCodesService: LookupService;
private periodNumbersService: LookupService;
private pupilsTypesService: LookupService;

  
regionalCenterCodeSelectOptions: MaterialSelectOptions;
branchCodeSelectOptions: MaterialSelectOptions;
periodNumberSelectOptions: MaterialSelectOptions;
schoolPupilsTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('regionalCenterCode', { static: true }) RegionalCenterCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('periodNumber', { static: true }) PeriodNumberSelectComponent: MaterialSelectComponent;
	@ViewChild('schoolPupilsType', { static: true }) SchoolPupilsTypeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedSchoolPeriod: SchoolPeriod;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود المبنى', field: 'buildingCode' }),
	new GridColumnOptions({ headerName: 'اسم المدرسه', field: 'schoolName' }),
	new GridColumnOptions({ headerName: 'المدير المسؤل', field: 'responsibleManager' }),
	new GridColumnOptions({ headerName: 'عدد تلاميذ المدرسة بنين', field: 'schoolPupilsBoysNumber' }),
	new GridColumnOptions({ headerName: 'عدد تلاميذ المدرسة بنات', field: 'schoolPupilsGirlsNumber' }),
	new GridColumnOptions({ headerName: 'كود المركز الاقليمي', field: 'regionalCenterCode' }),
	new GridColumnOptions({ headerName: 'كود الفرع', field: 'branchCode' }),
	new GridColumnOptions({ headerName: 'رقم الفترة', field: 'periodNumber' }),
	new GridColumnOptions({ headerName: 'كود نوع تلاميذ المدرسة', field: 'schoolPupilsType' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: SchoolPeriodViewComponent,
    editDialogClassType: SchoolPeriodEditComponent,
    newDialogClassType: SchoolPeriodNewComponent,
  });
    constructor(
        injector: Injector,
        public schoolPeriodService: SchoolPeriodService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedSchoolPeriod = new SchoolPeriod();

    
	this.regionalCenterCodeSelectOptions = new MaterialSelectOptions({
	 data: this.regionalCenterCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المركز الاقليمي',
	});

	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الفرع',
	});

	this.periodNumberSelectOptions = new MaterialSelectOptions({
	 data: this.periodNumbersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'رقم الفترة',
	});

	this.schoolPupilsTypeSelectOptions = new MaterialSelectOptions({
	 data: this.pupilsTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود نوع تلاميذ المدرسة',
	});


    this.searchForm = this.formBuilder.group({
     	buildingCode : [],
	schoolName : [],
	responsibleManager : [],
	regionalCenterCode : [],
	branchCode : [],
	periodNumber : [],
	schoolPupilsType : []
    });

     
  }

  getSchoolPeriodsPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<SchoolPeriod[]> => {
    return this.schoolPeriodService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.schoolPeriodService.delete(param.data.id)
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
    this.regionalCenterCodesService = new LookupService('regionalcentercodes', this.http);
this.branchCodesService = new LookupService('branchcodes', this.http);
this.periodNumbersService = new LookupService('periodnumbers', this.http);
this.pupilsTypesService = new LookupService('pupilstypes', this.http);
  }
}

