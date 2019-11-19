
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { EmployeeCardDefinition } from 'app/shared/models/employee-card-definition';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { EmployeeCardDefinitionEditComponent } from '../employee-card-definition-edit/employee-card-definition-edit.component';
import { EmployeeCardDefinitionNewComponent } from '../employee-card-definition-new/employee-card-definition-new.component';
import { EmployeeCardDefinitionViewComponent } from '../employee-card-definition-view/employee-card-definition-view.component';
import { EmployeeCardDefinitionService } from '../shared/employee-card-definition.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-employee-card-definition-list',
  templateUrl: './employee-card-definition-list.component.html',
  styleUrls: ['./employee-card-definition-list.component.scss'],
  providers: []
})

export class EmployeeCardDefinitionListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private branchCodesService: LookupService;
private cardCodesService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;
cardCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('cardCode', { static: true }) CardCodeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedEmployeeCardDefinition: EmployeeCardDefinition;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود الموظف', field: 'employeeCode' }),
	new GridColumnOptions({ headerName: 'الوظيفه', field: 'jobTitle' }),
	new GridColumnOptions({ headerName: 'تاريخ استلام العمل', field: 'receiptWorkDate' }),
	new GridColumnOptions({ headerName: 'الفرع التابع لها', field: 'branchCode' }),
	new GridColumnOptions({ headerName: 'حاله الموظف', field: 'employeeStatus' }),
	new GridColumnOptions({ headerName: 'اصدار الكارت', field: 'cardIssuing' }),
	new GridColumnOptions({ headerName: 'كود الكارت', field: 'cardCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: EmployeeCardDefinitionViewComponent,
    editDialogClassType: EmployeeCardDefinitionEditComponent,
    newDialogClassType: EmployeeCardDefinitionNewComponent,
  });
    constructor(
        injector: Injector,
        public employeeCardDefinitionService: EmployeeCardDefinitionService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedEmployeeCardDefinition = new EmployeeCardDefinition();

    
	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الفرع التابع لها',
	});

	this.cardCodeSelectOptions = new MaterialSelectOptions({
	 data: this.cardCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الكارت',
	});


    this.searchForm = this.formBuilder.group({
     	employeeCode : [],
	branchCode : [],
	cardCode : []
    });

     
  }

  getEmployeeCardDefinitionPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<EmployeeCardDefinition[]> => {
    return this.employeeCardDefinitionService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.employeeCardDefinitionService.delete(param.data.id)
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
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.cardCodesService = new LookupService('cardcodes', this.http);
  }
}

