
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { SubscriptionAmountUnderChecksB } from 'app/shared/models/subscription-amount-under-checks-b';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { SubscriptionAmountUnderChecksBEditComponent } from '../subscription-amount-under-checks-b-edit/subscription-amount-under-checks-b-edit.component';
import { SubscriptionAmountUnderChecksBNewComponent } from '../subscription-amount-under-checks-b-new/subscription-amount-under-checks-b-new.component';
import { SubscriptionAmountUnderChecksBViewComponent } from '../subscription-amount-under-checks-b-view/subscription-amount-under-checks-b-view.component';
import { SubscriptionAmountUnderChecksBService } from '../shared/subscription-amount-under-checks-b.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-subscription-amount-under-checks-b-list',
  templateUrl: './subscription-amount-under-checks-b-list.component.html',
  styleUrls: ['./subscription-amount-under-checks-b-list.component.scss'],
  providers: []
})

export class SubscriptionAmountUnderChecksBListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private employeeStatusesService: LookupService;
private departmentsSectionsService: LookupService;

  
employeeStatusSelectOptions: MaterialSelectOptions;
administrationCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('employeeStatus', { static: true }) EmployeeStatusSelectComponent: MaterialSelectComponent;
	@ViewChild('administrationCode', { static: true }) AdministrationCodeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedSubscriptionAmountUnderChecksB: SubscriptionAmountUnderChecksB;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود الموظف', field: 'employeeCode' }),
	new GridColumnOptions({ headerName: 'رقم العضويه', field: 'membershipNumber' }),
	new GridColumnOptions({ headerName: 'تاريخ العضويه', field: 'membershipDate' }),
	new GridColumnOptions({ headerName: 'قيمه المبلغ', field: 'amountValue' }),
	new GridColumnOptions({ headerName: 'تاريخ الشيك', field: 'checkDate' }),
	new GridColumnOptions({ headerName: 'رقم الشيك', field: 'checkNumber' }),
	new GridColumnOptions({ headerName: 'تاريخ نهايه الفتره', field: 'periodEndDate' }),
	new GridColumnOptions({ headerName: 'تاريخ بدايه الفتره', field: 'periodStartDate' }),
	new GridColumnOptions({ headerName: 'كود الادارة', field: 'administrationCode' }),
	new GridColumnOptions({ headerName: 'حالة الموظف', field: 'employeeStatus' }),
	new GridColumnOptions({ headerName: 'الجهه الصادر منها', field: 'issuer' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: SubscriptionAmountUnderChecksBViewComponent,
    editDialogClassType: SubscriptionAmountUnderChecksBEditComponent,
    newDialogClassType: SubscriptionAmountUnderChecksBNewComponent,
  });
    constructor(
        injector: Injector,
        public subscriptionAmountUnderChecksBService: SubscriptionAmountUnderChecksBService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedSubscriptionAmountUnderChecksB = new SubscriptionAmountUnderChecksB();

    
	this.employeeStatusSelectOptions = new MaterialSelectOptions({
	 data: this.employeeStatusesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حالة الموظف',
	});

	this.administrationCodeSelectOptions = new MaterialSelectOptions({
	 data: this.departmentsSectionsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الادارة',
	});


    this.searchForm = this.formBuilder.group({
     	membershipNumber : [],
	employeeCode : [],
	employeeStatus : [],
	administrationCode : []
    });

     
  }

  getSubscriptionAmountsUnderChecksPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<SubscriptionAmountUnderChecksB[]> => {
    return this.subscriptionAmountUnderChecksBService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.subscriptionAmountUnderChecksBService.delete(param.data.id)
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
    this.employeeStatusesService = new LookupService('employeestatuses', this.http);
this.departmentsSectionsService = new LookupService('departmentssections', this.http);
  }
}

