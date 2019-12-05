
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { BenefitsForTheHeirsOfAnEmployee } from 'app/shared/models/benefits-for-the-heirs-of-an-employee';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { BenefitsForTheHeirsOfAnEmployeeEditComponent } from '../benefits-for-the-heirs-of-an-employee-edit/benefits-for-the-heirs-of-an-employee-edit.component';
import { BenefitsForTheHeirsOfAnEmployeeNewComponent } from '../benefits-for-the-heirs-of-an-employee-new/benefits-for-the-heirs-of-an-employee-new.component';
import { BenefitsForTheHeirsOfAnEmployeeViewComponent } from '../benefits-for-the-heirs-of-an-employee-view/benefits-for-the-heirs-of-an-employee-view.component';
import { BenefitsForTheHeirsOfAnEmployeeService } from '../shared/benefits-for-the-heirs-of-an-employee.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-benefits-for-the-heirs-of-an-employee-list',
  templateUrl: './benefits-for-the-heirs-of-an-employee-list.component.html',
  styleUrls: ['./benefits-for-the-heirs-of-an-employee-list.component.scss'],
  providers: []
})

export class BenefitsForTheHeirsOfAnEmployeeListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private subsidyTypesService: LookupService;

  
subsidyTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('subsidyType', { static: true }) SubsidyTypeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedBenefitsForTheHeirsOfAnEmployee: BenefitsForTheHeirsOfAnEmployee;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: ' رقم الشيك ', field: 'checkNumber' }),
	new GridColumnOptions({ headerName: ' تاريخ الشيك ', field: 'checkDate' }),
	new GridColumnOptions({ headerName: ' مبلغ الشيك', field: 'checkAmount' }),
	new GridColumnOptions({ headerName: 'كود الموظف', field: 'employeeCode' }),
	new GridColumnOptions({ headerName: '  مبلغ الاعانة', field: 'subsidyAmount' }),
	new GridColumnOptions({ headerName: ' رقم شيك الوريث', field: 'heirCheckNo' }),
	new GridColumnOptions({ headerName: ' تاريخ شيك وريث', field: 'heirCheckDate' }),
	new GridColumnOptions({ headerName: ' اسم الوريث', field: 'heirName' }),
	new GridColumnOptions({ headerName: ' المبلغ', field: 'amount' }),
	new GridColumnOptions({ headerName: ' نوع الاعانة', field: 'subsidyType' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: BenefitsForTheHeirsOfAnEmployeeViewComponent,
    editDialogClassType: BenefitsForTheHeirsOfAnEmployeeEditComponent,
    newDialogClassType: BenefitsForTheHeirsOfAnEmployeeNewComponent,
  });
    constructor(
        injector: Injector,
        public benefitsForTheHeirsOfAnEmployeeService: BenefitsForTheHeirsOfAnEmployeeService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedBenefitsForTheHeirsOfAnEmployee = new BenefitsForTheHeirsOfAnEmployee();

    
	this.subsidyTypeSelectOptions = new MaterialSelectOptions({
	 data: this.subsidyTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' نوع الاعانة',
	});


    this.searchForm = this.formBuilder.group({
     	checkNumber : [],
	employeeCode : [],
	heirCheckNo : [],
	subsidyType : []
    });

     
  }

  getBenefitsForTheHeirsOfAnEmployeePaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<BenefitsForTheHeirsOfAnEmployee[]> => {
    return this.benefitsForTheHeirsOfAnEmployeeService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.benefitsForTheHeirsOfAnEmployeeService.delete(param.data.id)
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
    this.subsidyTypesService = new LookupService('subsidytypes', this.http);
  }
}

