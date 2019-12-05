
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { AbstractSalary } from 'app/shared/models/abstract-salary';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { AbstractSalaryEditComponent } from '../abstract-salary-edit/abstract-salary-edit.component';
import { AbstractSalaryNewComponent } from '../abstract-salary-new/abstract-salary-new.component';
import { AbstractSalaryViewComponent } from '../abstract-salary-view/abstract-salary-view.component';
import { AbstractSalaryService } from '../shared/abstract-salary.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-abstract-salary-list',
  templateUrl: './abstract-salary-list.component.html',
  styleUrls: ['./abstract-salary-list.component.scss'],
  providers: []
})

export class AbstractSalaryListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private discountTypesService: LookupService;

  
discountTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('discountType', { static: true }) DiscountTypeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedAbstractSalary: AbstractSalary;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود الموظف', field: 'employeeCode' }),
	new GridColumnOptions({ headerName: 'السنه', field: 'year' }),
	new GridColumnOptions({ headerName: 'الراتب المجرد', field: 'abstractSalary' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: AbstractSalaryViewComponent,
    editDialogClassType: AbstractSalaryEditComponent,
    newDialogClassType: AbstractSalaryNewComponent,
  });
    constructor(
        injector: Injector,
        public abstractSalaryService: AbstractSalaryService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedAbstractSalary = new AbstractSalary();

    
	this.discountTypeSelectOptions = new MaterialSelectOptions({
	 data: this.discountTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الخصم',
	});


    this.searchForm = this.formBuilder.group({
     	correctionNumber : [],
	employeeCode : [],
	discountValue : [],
	discountType : []
    });

     
  }

  getAbstractSalariesPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<AbstractSalary[]> => {
    return this.abstractSalaryService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.abstractSalaryService.delete(param.data.id)
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
    this.discountTypesService = new LookupService('discounttypes', this.http);
  }
}

