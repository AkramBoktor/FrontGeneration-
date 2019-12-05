
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { EndOfASpecialVacationForEmployeeB } from 'app/shared/models/end-of-a-special-vacation-for-employee-b';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { EndOfASpecialVacationForEmployeeBEditComponent } from '../end-of-a-special-vacation-for-employee-b-edit/end-of-a-special-vacation-for-employee-b-edit.component';
import { EndOfASpecialVacationForEmployeeBNewComponent } from '../end-of-a-special-vacation-for-employee-b-new/end-of-a-special-vacation-for-employee-b-new.component';
import { EndOfASpecialVacationForEmployeeBViewComponent } from '../end-of-a-special-vacation-for-employee-b-view/end-of-a-special-vacation-for-employee-b-view.component';
import { EndOfASpecialVacationForEmployeeBService } from '../shared/end-of-a-special-vacation-for-employee-b.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-end-of-a-special-vacation-for-employee-b-list',
  templateUrl: './end-of-a-special-vacation-for-employee-b-list.component.html',
  styleUrls: ['./end-of-a-special-vacation-for-employee-b-list.component.scss'],
  providers: []
})

export class EndOfASpecialVacationForEmployeeBListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private terminationTypesService: LookupService;

  
terminationTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('terminationType', { static: true }) TerminationTypeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedEndOfASpecialVacationForEmployeeB: EndOfASpecialVacationForEmployeeB;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'قيمة المبلغ', field: 'valueAmount' }),
	new GridColumnOptions({ headerName: 'رقم السداد', field: 'paymentNumber' }),
	new GridColumnOptions({ headerName: 'رقم الايصال', field: 'receiptNumber' }),
	new GridColumnOptions({ headerName: 'تاريخ الانهاء', field: 'endDate' }),
	new GridColumnOptions({ headerName: 'قيمه مبلغ اشتراك الاجاز', field: 'vacationSubscriptionAmount' }),
	new GridColumnOptions({ headerName: 'نهاية الاجازة', field: 'vacationEnd' }),
	new GridColumnOptions({ headerName: 'تاريخ الاشتراك', field: 'subscriptionDate' }),
	new GridColumnOptions({ headerName: 'حاله الاشتراك', field: 'subscriptionStatus' }),
	new GridColumnOptions({ headerName: 'كود العضويه', field: 'membershipCode' }),
	new GridColumnOptions({ headerName: 'كود الموظف', field: 'employeeCode' }),
	new GridColumnOptions({ headerName: 'بداية الاجازة', field: 'vacationBeginning' }),
	new GridColumnOptions({ headerName: 'نوع السداد', field: 'paymentType' }),
	new GridColumnOptions({ headerName: 'نوع الانهاء', field: 'terminationType' }),
	new GridColumnOptions({ headerName: 'كود الاداره', field: 'administrationCode' }),
	new GridColumnOptions({ headerName: 'حاله الموظف', field: 'employeeStatus' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: EndOfASpecialVacationForEmployeeBViewComponent,
    editDialogClassType: EndOfASpecialVacationForEmployeeBEditComponent,
    newDialogClassType: EndOfASpecialVacationForEmployeeBNewComponent,
  });
    constructor(
        injector: Injector,
        public endOfASpecialVacationForEmployeeBService: EndOfASpecialVacationForEmployeeBService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedEndOfASpecialVacationForEmployeeB = new EndOfASpecialVacationForEmployeeB();

    
	this.terminationTypeSelectOptions = new MaterialSelectOptions({
	 data: this.terminationTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الانهاء',
	});


    this.searchForm = this.formBuilder.group({
     	membershipCode : [],
	employeeCode : [],
	terminationType : []
    });

     
  }

  getEndOfASpecialVacationForEmployeesPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<EndOfASpecialVacationForEmployeeB[]> => {
    return this.endOfASpecialVacationForEmployeeBService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.endOfASpecialVacationForEmployeeBService.delete(param.data.id)
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
    this.terminationTypesService = new LookupService('terminationtypes', this.http);
  }
}

