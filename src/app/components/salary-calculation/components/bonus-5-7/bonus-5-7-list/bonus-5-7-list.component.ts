
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { Bonus57 } from 'app/shared/models/bonus-5-7';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { Bonus57EditComponent } from '../bonus-5-7-edit/bonus-5-7-edit.component';
import { Bonus57NewComponent } from '../bonus-5-7-new/bonus-5-7-new.component';
import { Bonus57ViewComponent } from '../bonus-5-7-view/bonus-5-7-view.component';
import { Bonus57Service } from '../shared/bonus-5-7.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-bonus-5-7-list',
  templateUrl: './bonus-5-7-list.component.html',
  styleUrls: ['./bonus-5-7-list.component.scss'],
  providers: []
})

export class Bonus57ListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private financialDegreesService: LookupService;

  
financialDegreeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('financialDegree', { static: true }) FinancialDegreeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedBonus57: Bonus57;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود الموظف', field: 'employeeCode' }),
	new GridColumnOptions({ headerName: 'السنة', field: 'year' }),
	new GridColumnOptions({ headerName: 'الاجر الوظيفي', field: 'employmentSalary' }),
	new GridColumnOptions({ headerName: 'نسبه العلاوه', field: 'ratio' }),
	new GridColumnOptions({ headerName: 'علاوة دورية', field: 'periodBonus' }),
	new GridColumnOptions({ headerName: 'الاجر الوظيفي بعد العلاوه', field: 'employmentSalaryWithBonus' }),
	new GridColumnOptions({ headerName: 'الدرجه الماليه', field: 'financialDegree' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: Bonus57ViewComponent,
    editDialogClassType: Bonus57EditComponent,
    newDialogClassType: Bonus57NewComponent,
  });
    constructor(
        injector: Injector,
        public bonus57Service: Bonus57Service) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedBonus57 = new Bonus57();

    
	this.financialDegreeSelectOptions = new MaterialSelectOptions({
	 data: this.financialDegreesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الدرجه الماليه',
	});


    this.searchForm = this.formBuilder.group({
     	employeeCode : [],
	year : [],
	ratio : [],
	periodBonus : [],
	financialDegree : []
    });

     
  }

  getBonus57PaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<Bonus57[]> => {
    return this.bonus57Service.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.bonus57Service.delete(param.data.id)
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
    this.financialDegreesService = new LookupService('financialdegrees', this.http);
  }
}

