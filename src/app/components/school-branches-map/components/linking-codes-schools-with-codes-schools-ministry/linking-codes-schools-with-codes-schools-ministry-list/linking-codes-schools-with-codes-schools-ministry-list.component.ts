
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { LinkingCodesSchoolsWithCodesSchoolsMinistry } from 'app/shared/models/linking-codes-schools-with-codes-schools-ministry';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { LinkingCodesSchoolsWithCodesSchoolsMinistryEditComponent } from '../linking-codes-schools-with-codes-schools-ministry-edit/linking-codes-schools-with-codes-schools-ministry-edit.component';
import { LinkingCodesSchoolsWithCodesSchoolsMinistryNewComponent } from '../linking-codes-schools-with-codes-schools-ministry-new/linking-codes-schools-with-codes-schools-ministry-new.component';
import { LinkingCodesSchoolsWithCodesSchoolsMinistryViewComponent } from '../linking-codes-schools-with-codes-schools-ministry-view/linking-codes-schools-with-codes-schools-ministry-view.component';
import { LinkingCodesSchoolsWithCodesSchoolsMinistryService } from '../shared/linking-codes-schools-with-codes-schools-ministry.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-linking-codes-schools-with-codes-schools-ministry-list',
  templateUrl: './linking-codes-schools-with-codes-schools-ministry-list.component.html',
  styleUrls: ['./linking-codes-schools-with-codes-schools-ministry-list.component.scss'],
  providers: []
})

export class LinkingCodesSchoolsWithCodesSchoolsMinistryListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private governoratesService: LookupService;
private centralDepartmentsService: LookupService;
private sectionsOrCentersService: LookupService;
private villagesService: LookupService;
private educationalLevelsService: LookupService;

  
governorateSelectOptions: MaterialSelectOptions;
administrationSelectOptions: MaterialSelectOptions;
centerDepartmentSelectOptions: MaterialSelectOptions;
villageNeighborhoodSelectOptions: MaterialSelectOptions;
stageSelectOptions: MaterialSelectOptions;

  
	@ViewChild('governorate', { static: true }) GovernorateSelectComponent: MaterialSelectComponent;
	@ViewChild('administration', { static: true }) AdministrationSelectComponent: MaterialSelectComponent;
	@ViewChild('centerDepartment', { static: true }) CenterDepartmentSelectComponent: MaterialSelectComponent;
	@ViewChild('villageNeighborhood', { static: true }) VillageNeighborhoodSelectComponent: MaterialSelectComponent;
	@ViewChild('stage', { static: true }) StageSelectComponent: MaterialSelectComponent;

  
  @Input() selectedLinkingCodesSchoolsWithCodesSchoolsMinistry: LinkingCodesSchoolsWithCodesSchoolsMinistry;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود مدرسة الهيئة', field: 'authoritySchoolCode' }),
	new GridColumnOptions({ headerName: 'عنوان مدرسة', field: 'schoolAddress' }),
	new GridColumnOptions({ headerName: 'عدد الفترات', field: 'periodsNumber' }),
	new GridColumnOptions({ headerName: 'اسم الفترة 1', field: 'periodName1' }),
	new GridColumnOptions({ headerName: 'عدد التلاميذ', field: 'pupilsCount1' }),
	new GridColumnOptions({ headerName: 'اسم الفترة 2', field: 'periodName2' }),
	new GridColumnOptions({ headerName: 'عدد التلاميذ', field: 'pupilsCount2' }),
	new GridColumnOptions({ headerName: 'مدرسة مستضافة', field: 'hostedSchool' }),
	new GridColumnOptions({ headerName: 'عدد التلاميذ', field: 'hostedSchoolPupilsCount' }),
	new GridColumnOptions({ headerName: 'كود مدرسة وزارة', field: 'ministrySchoolCode' }),
	new GridColumnOptions({ headerName: 'المحافظة', field: 'governorate' }),
	new GridColumnOptions({ headerName: 'الادارة', field: 'administration' }),
	new GridColumnOptions({ headerName: 'مركز/قسم', field: 'centerDepartment' }),
	new GridColumnOptions({ headerName: 'قرية/حي', field: 'villageNeighborhood' }),
	new GridColumnOptions({ headerName: 'المرحلة', field: 'stage' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: LinkingCodesSchoolsWithCodesSchoolsMinistryViewComponent,
    editDialogClassType: LinkingCodesSchoolsWithCodesSchoolsMinistryEditComponent,
    newDialogClassType: LinkingCodesSchoolsWithCodesSchoolsMinistryNewComponent,
  });
    constructor(
        injector: Injector,
        public linkingCodesSchoolsWithCodesSchoolsMinistryService: LinkingCodesSchoolsWithCodesSchoolsMinistryService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedLinkingCodesSchoolsWithCodesSchoolsMinistry = new LinkingCodesSchoolsWithCodesSchoolsMinistry();

    
	this.governorateSelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المحافظة',
	});

	this.administrationSelectOptions = new MaterialSelectOptions({
	 data: this.centralDepartmentsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الادارة',
	});

	this.centerDepartmentSelectOptions = new MaterialSelectOptions({
	 data: this.sectionsOrCentersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'مركز/قسم',
	});

	this.villageNeighborhoodSelectOptions = new MaterialSelectOptions({
	 data: this.villagesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'قرية/حي',
	});

	this.stageSelectOptions = new MaterialSelectOptions({
	 data: this.educationalLevelsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المرحلة',
	});


    this.searchForm = this.formBuilder.group({
     	authoritySchoolCode : [],
	ministrySchoolCode : [],
	governorate : [],
	administration : [],
	centerDepartment : [],
	villageNeighborhood : [],
	stage : []
    });

     
  }

  getLinkingCodesSchoolsWithCodesSchoolsMinistryPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<LinkingCodesSchoolsWithCodesSchoolsMinistry[]> => {
    return this.linkingCodesSchoolsWithCodesSchoolsMinistryService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.linkingCodesSchoolsWithCodesSchoolsMinistryService.delete(param.data.id)
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
this.centralDepartmentsService = new LookupService('centraldepartments', this.http);
this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
this.villagesService = new LookupService('villages', this.http);
this.educationalLevelsService = new LookupService('educationallevels', this.http);
  }
}

