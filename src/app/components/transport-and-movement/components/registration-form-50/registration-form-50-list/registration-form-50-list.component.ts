
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { RegistrationForm50 } from 'app/shared/models/registration-form-50';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { RegistrationForm50EditComponent } from '../registration-form-50-edit/registration-form-50-edit.component';
import { RegistrationForm50NewComponent } from '../registration-form-50-new/registration-form-50-new.component';
import { RegistrationForm50ViewComponent } from '../registration-form-50-view/registration-form-50-view.component';
import { RegistrationForm50Service } from '../shared/registration-form-50.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-registration-form-50-list',
  templateUrl: './registration-form-50-list.component.html',
  styleUrls: ['./registration-form-50-list.component.scss'],
  providers: []
})

export class RegistrationForm50ListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private areasService: LookupService;
private subDepartmentsService: LookupService;
private formSourcesService: LookupService;

  
areaSelectOptions: MaterialSelectOptions;
administrationSelectOptions: MaterialSelectOptions;
formSourceSelectOptions: MaterialSelectOptions;

  
	@ViewChild('area', { static: true }) AreaSelectComponent: MaterialSelectComponent;
	@ViewChild('administration', { static: true }) AdministrationSelectComponent: MaterialSelectComponent;
	@ViewChild('formSource', { static: true }) FormSourceSelectComponent: MaterialSelectComponent;

  
  @Input() selectedRegistrationForm50: RegistrationForm50;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'سنة الموازنة', field: 'budgetYear' }),
	new GridColumnOptions({ headerName: 'تاريخ لاستمارة', field: 'formDate' }),
	new GridColumnOptions({ headerName: 'مسلسل الاستمارة', field: 'formSerial' }),
	new GridColumnOptions({ headerName: 'مبلغ الاستمارة', field: 'formAmount' }),
	new GridColumnOptions({ headerName: 'كود الموظف', field: 'employeeCode' }),
	new GridColumnOptions({ headerName: 'البيان', field: 'statement' }),
	new GridColumnOptions({ headerName: 'المنطقة ', field: 'area' }),
	new GridColumnOptions({ headerName: 'الادارة', field: 'administration' }),
	new GridColumnOptions({ headerName: 'مصدر الاستمارة', field: 'formSource' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: RegistrationForm50ViewComponent,
    editDialogClassType: RegistrationForm50EditComponent,
    newDialogClassType: RegistrationForm50NewComponent,
  });
    constructor(
        injector: Injector,
        public registrationForm50Service: RegistrationForm50Service) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedRegistrationForm50 = new RegistrationForm50();

    
	this.areaSelectOptions = new MaterialSelectOptions({
	 data: this.areasService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المنطقة ',
	});

	this.administrationSelectOptions = new MaterialSelectOptions({
	 data: this.subDepartmentsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الادارة',
	});

	this.formSourceSelectOptions = new MaterialSelectOptions({
	 data: this.formSourcesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'مصدر الاستمارة',
	});


    this.searchForm = this.formBuilder.group({
     	budgetYear : [],
	formDate : [],
	formSerial : [],
	formAmount : [],
	employeeCode : [],
	statement : [],
	area : [],
	administration : [],
	formSource : []
    });

     
  }

  getRegistrationForms50PaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<RegistrationForm50[]> => {
    return this.registrationForm50Service.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.registrationForm50Service.delete(param.data.id)
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
    this.areasService = new LookupService('areas', this.http);
this.subDepartmentsService = new LookupService('subdepartments', this.http);
this.formSourcesService = new LookupService('formsources', this.http);
  }
}

