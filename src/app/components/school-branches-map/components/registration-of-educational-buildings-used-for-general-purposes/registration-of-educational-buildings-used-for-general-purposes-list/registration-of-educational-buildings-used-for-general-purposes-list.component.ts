
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { RegistrationOfEducationalBuildingsUsedForGeneralPurposes } from 'app/shared/models/registration-of-educational-buildings-used-for-general-purposes';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { RegistrationOfEducationalBuildingsUsedForGeneralPurposesEditComponent } from '../registration-of-educational-buildings-used-for-general-purposes-edit/registration-of-educational-buildings-used-for-general-purposes-edit.component';
import { RegistrationOfEducationalBuildingsUsedForGeneralPurposesNewComponent } from '../registration-of-educational-buildings-used-for-general-purposes-new/registration-of-educational-buildings-used-for-general-purposes-new.component';
import { RegistrationOfEducationalBuildingsUsedForGeneralPurposesViewComponent } from '../registration-of-educational-buildings-used-for-general-purposes-view/registration-of-educational-buildings-used-for-general-purposes-view.component';
import { RegistrationOfEducationalBuildingsUsedForGeneralPurposesService } from '../shared/registration-of-educational-buildings-used-for-general-purposes.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-registration-of-educational-buildings-used-for-general-purposes-list',
  templateUrl: './registration-of-educational-buildings-used-for-general-purposes-list.component.html',
  styleUrls: ['./registration-of-educational-buildings-used-for-general-purposes-list.component.scss'],
  providers: []
})

export class RegistrationOfEducationalBuildingsUsedForGeneralPurposesListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private governoratesService: LookupService;

  
governorateSelectOptions: MaterialSelectOptions;

  
	@ViewChild('governorate', { static: true }) GovernorateSelectComponent: MaterialSelectComponent;

  
  @Input() selectedRegistrationOfEducationalBuildingsUsedForGeneralPurposes: RegistrationOfEducationalBuildingsUsedForGeneralPurposes;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود المبنى', field: 'buildingCode' }),
	new GridColumnOptions({ headerName: 'الفتره من', field: 'periodFrom' }),
	new GridColumnOptions({ headerName: 'الفتره الي', field: 'periodTo' }),
	new GridColumnOptions({ headerName: 'فتره الاستخدام', field: 'periodUsage' }),
	new GridColumnOptions({ headerName: 'عدد الفراغات', field: 'spaceNumber' }),
	new GridColumnOptions({ headerName: 'المحافظه', field: 'governorate' }),
	new GridColumnOptions({ headerName: 'كود الغرض', field: 'purposeCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: RegistrationOfEducationalBuildingsUsedForGeneralPurposesViewComponent,
    editDialogClassType: RegistrationOfEducationalBuildingsUsedForGeneralPurposesEditComponent,
    newDialogClassType: RegistrationOfEducationalBuildingsUsedForGeneralPurposesNewComponent,
  });
    constructor(
        injector: Injector,
        public registrationOfEducationalBuildingsUsedForGeneralPurposesService: RegistrationOfEducationalBuildingsUsedForGeneralPurposesService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedRegistrationOfEducationalBuildingsUsedForGeneralPurposes = new RegistrationOfEducationalBuildingsUsedForGeneralPurposes();

    
	this.governorateSelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المحافظه',
	});


    this.searchForm = this.formBuilder.group({
     	buildingCode : [],
	governorate : []
    });

     
  }

  getRegistrationOfEducationalBuildingsUsedForGeneralPurposesPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<RegistrationOfEducationalBuildingsUsedForGeneralPurposes[]> => {
    return this.registrationOfEducationalBuildingsUsedForGeneralPurposesService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.registrationOfEducationalBuildingsUsedForGeneralPurposesService.delete(param.data.id)
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
  }
}

