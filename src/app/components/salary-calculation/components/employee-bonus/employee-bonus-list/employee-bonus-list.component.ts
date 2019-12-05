
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { EmployeeBonus } from 'app/shared/models/employee-bonus';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { EmployeeBonusEditComponent } from '../employee-bonus-edit/employee-bonus-edit.component';
import { EmployeeBonusNewComponent } from '../employee-bonus-new/employee-bonus-new.component';
import { EmployeeBonusViewComponent } from '../employee-bonus-view/employee-bonus-view.component';
import { EmployeeBonusService } from '../shared/employee-bonus.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-employee-bonus-list',
  templateUrl: './employee-bonus-list.component.html',
  styleUrls: ['./employee-bonus-list.component.scss'],
  providers: []
})

export class EmployeeBonusListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private areasService: LookupService;
private paidTypesService: LookupService;

  
areaNumberSelectOptions: MaterialSelectOptions;
paidTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('areaNumber', { static: true }) AreaNumberSelectComponent: MaterialSelectComponent;
	@ViewChild('paidType', { static: true }) PaidTypeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedEmployeeBonus: EmployeeBonus;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود الموظف', field: 'employeeCode' }),
	new GridColumnOptions({ headerName: 'قيمه  العلاوة', field: 'bounceAmount' }),
	new GridColumnOptions({ headerName: 'نوع العلاوة', field: 'bounceType' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: EmployeeBonusViewComponent,
    editDialogClassType: EmployeeBonusEditComponent,
    newDialogClassType: EmployeeBonusNewComponent,
  });
    constructor(
        injector: Injector,
        public employeeBonusService: EmployeeBonusService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedEmployeeBonus = new EmployeeBonus();

    
	this.areaNumberSelectOptions = new MaterialSelectOptions({
	 data: this.areasService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'رقم المنطقه الطالبه',
	});

	this.paidTypeSelectOptions = new MaterialSelectOptions({
	 data: this.paidTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع المدفوع',
	});


    this.searchForm = this.formBuilder.group({
     	form55Date : [],
	form55Number : [],
	areaNumber : [],
	paidType : []
    });

     
  }

  getEmployeeBonusesPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<EmployeeBonus[]> => {
    return this.employeeBonusService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.employeeBonusService.delete(param.data.id)
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
this.paidTypesService = new LookupService('paidtypes', this.http);
  }
}

