
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { SubscriptionAmountUnderChecksA } from 'app/shared/models/subscription-amount-under-checks-a';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { SubscriptionAmountUnderChecksAEditComponent } from '../subscription-amount-under-checks-a-edit/subscription-amount-under-checks-a-edit.component';
import { SubscriptionAmountUnderChecksANewComponent } from '../subscription-amount-under-checks-a-new/subscription-amount-under-checks-a-new.component';
import { SubscriptionAmountUnderChecksAViewComponent } from '../subscription-amount-under-checks-a-view/subscription-amount-under-checks-a-view.component';
import { SubscriptionAmountUnderChecksAService } from '../shared/subscription-amount-under-checks-a.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-subscription-amount-under-checks-a-list',
  templateUrl: './subscription-amount-under-checks-a-list.component.html',
  styleUrls: ['./subscription-amount-under-checks-a-list.component.scss'],
  providers: []
})

export class SubscriptionAmountUnderChecksAListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private employeeStatusesService: LookupService;
private subscriptionStatusService: LookupService;

  
employeeStatusSelectOptions: MaterialSelectOptions;
subscriptionStatusSelectOptions: MaterialSelectOptions;

  
	@ViewChild('employeeStatus', { static: true }) EmployeeStatusSelectComponent: MaterialSelectComponent;
	@ViewChild('subscriptionStatus', { static: true }) SubscriptionStatusSelectComponent: MaterialSelectComponent;

  
  @Input() selectedSubscriptionAmountUnderChecksA: SubscriptionAmountUnderChecksA;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود الموظف', field: 'employeeCode' }),
	new GridColumnOptions({ headerName: 'رقم العضويه', field: 'membershipNumber' }),
	new GridColumnOptions({ headerName: 'تاريخ العضويه', field: 'membershipDate' }),
	new GridColumnOptions({ headerName: 'تاريخ بدايه الفتره', field: 'periodStartDate' }),
	new GridColumnOptions({ headerName: 'تاريخ نهايه الفتره', field: 'periodEndDate' }),
	new GridColumnOptions({ headerName: 'رقم الشيك', field: 'checkNumber' }),
	new GridColumnOptions({ headerName: 'تاريخ الشيك', field: 'checkDate' }),
	new GridColumnOptions({ headerName: 'قيمه المبلغ', field: 'amountValue' }),
	new GridColumnOptions({ headerName: 'كود الادارة', field: 'administrationCode' }),
	new GridColumnOptions({ headerName: 'حالة الموظف', field: 'employeeStatus' }),
	new GridColumnOptions({ headerName: 'الجهه الصادر منها', field: 'issuer' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: SubscriptionAmountUnderChecksAViewComponent,
    editDialogClassType: SubscriptionAmountUnderChecksAEditComponent,
    newDialogClassType: SubscriptionAmountUnderChecksANewComponent,
  });
    constructor(
        injector: Injector,
        public subscriptionAmountUnderChecksAService: SubscriptionAmountUnderChecksAService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedSubscriptionAmountUnderChecksA = new SubscriptionAmountUnderChecksA();

    
	this.employeeStatusSelectOptions = new MaterialSelectOptions({
	 data: this.employeeStatusesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حاله الموظف',
	});

	this.subscriptionStatusSelectOptions = new MaterialSelectOptions({
	 data: this.subscriptionStatusService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حاله الاشتراك',
	});


    this.searchForm = this.formBuilder.group({
     	employeeCode : [],
	membershipCode : [],
	employeeStatus : [],
	subscriptionStatus : []
    });

     
  }

  getSubscriptionAmountsUnderChecksPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<SubscriptionAmountUnderChecksA[]> => {
    return this.subscriptionAmountUnderChecksAService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.subscriptionAmountUnderChecksAService.delete(param.data.id)
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
this.subscriptionStatusService = new LookupService('subscriptionstatuses', this.http);
  }
}

