
import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { ContractTermination } from 'app/shared/models/contract-termination';
import { GridColumnOptions, GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { FormControlError, GridPaginatedSortedFiltered } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ContractTerminationEditComponent } from '../contract-termination-edit/contract-termination-edit.component';
import { ContractTerminationNewComponent } from '../contract-termination-new/contract-termination-new.component';
import { ContractTerminationViewComponent } from '../contract-termination-view/contract-termination-view.component';
import { ContractTerminationService } from '../shared/contract-termination.service';

@Component({
  selector: 'app-contract-termination-list',
  templateUrl: './contract-termination-list.component.html',
  styleUrls: ['./contract-termination-list.component.scss'],
  providers: []
})

export class ContractTerminationListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
	{
	 errorName: 'minLength',
	 errorMessage: 'Don`t enter less than 1'
	},
	{
	 errorName: 'minLength',
	 errorMessage: 'Don`t enter less than 1'
	},
	{
	 errorName: 'minLength',
	 errorMessage: 'Don`t enter less than 1'
	}
      ];
  private centralDepartmentsService: LookupService;
private subDepartmentsService: LookupService;

  
centralAdministrationSelectOptions: MaterialSelectOptions;
subAdministrationSelectOptions: MaterialSelectOptions;

  
	@ViewChild('centralAdministration', { static: true }) CentralAdministrationSelectComponent: MaterialSelectComponent;
	@ViewChild('subAdministration', { static: true }) SubAdministrationSelectComponent: MaterialSelectComponent;

  
  @Input() selectedContractTermination: ContractTermination;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود الموظف', field: 'employeeCode' }),
	new GridColumnOptions({ headerName: 'رقم الفتره', field: 'periodNumber' }),
	new GridColumnOptions({ headerName: 'تاريخ بدايه الفتره', field: 'periodStartDate' }),
	new GridColumnOptions({ headerName: 'قيمة العقد', field: 'contractAmount' }),
	new GridColumnOptions({ headerName: 'تاريخ الالتحاق بها', field: 'hiringDate' }),
	new GridColumnOptions({ headerName: 'سبب انهاء التعاقد', field: 'terminationReason' }),
	new GridColumnOptions({ headerName: 'تاريخ انهاء التعاقد', field: 'terminationDate' }),
	new GridColumnOptions({ headerName: 'ملاحظات', field: 'notes' }),
	new GridColumnOptions({ headerName: 'تاريخ نهايه الفتره', field: 'periodEndDate' }),
	new GridColumnOptions({ headerName: 'الاداره المركزيه', field: 'centralAdministration' }),
	new GridColumnOptions({ headerName: 'الاداره الفرعيه', field: 'subAdministration' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: ContractTerminationViewComponent,
    editDialogClassType: ContractTerminationEditComponent,
    newDialogClassType: ContractTerminationNewComponent,
  });
    constructor(
        injector: Injector,
        public contractTerminationService: ContractTerminationService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedContractTermination = new ContractTermination();

    
	this.centralAdministrationSelectOptions = new MaterialSelectOptions({
	 data: this.centralDepartmentsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الاداره المركزيه',
	});

	this.subAdministrationSelectOptions = new MaterialSelectOptions({
	 data: this.subDepartmentsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الاداره الفرعيه',
	});


    this.searchForm = this.formBuilder.group({
     	employeeCode : [],
	periodNumber : [],
	periodStartDate : [],
	contractAmount : [],
	hiringDate : [],
	terminationReason : [],
	terminationDate : [],
	notes : [],
	periodEndDate : [],
	centralAdministration : [],
	subAdministration : []
    });

     
  }

  getContractTerminationPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<ContractTermination[]> => {
    return this.contractTerminationService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.contractTerminationService.delete(param.data.id)
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
    this.centralDepartmentsService = new LookupService('centraldepartments', this.http);
this.subDepartmentsService = new LookupService('subdepartments', this.http);
  }
}

