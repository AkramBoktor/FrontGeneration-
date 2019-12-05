
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { SubscriptionAmountUnderChecksG } from 'app/shared/models/subscription-amount-under-checks-g';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { SubscriptionAmountUnderChecksGEditComponent } from '../subscription-amount-under-checks-g-edit/subscription-amount-under-checks-g-edit.component';
import { SubscriptionAmountUnderChecksGNewComponent } from '../subscription-amount-under-checks-g-new/subscription-amount-under-checks-g-new.component';
import { SubscriptionAmountUnderChecksGViewComponent } from '../subscription-amount-under-checks-g-view/subscription-amount-under-checks-g-view.component';
import { SubscriptionAmountUnderChecksGService } from '../shared/subscription-amount-under-checks-g.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-subscription-amount-under-checks-g-list',
  templateUrl: './subscription-amount-under-checks-g-list.component.html',
  styleUrls: ['./subscription-amount-under-checks-g-list.component.scss'],
  providers: []
})

export class SubscriptionAmountUnderChecksGListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private departmentsSectionsService: LookupService;
private employeeStatusesService: LookupService;

  
administrationCodeSelectOptions: MaterialSelectOptions;
employeeStatusSelectOptions: MaterialSelectOptions;

  
	@ViewChild('administrationCode', { static: true }) AdministrationCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('employeeStatus', { static: true }) EmployeeStatusSelectComponent: MaterialSelectComponent;

  
  @Input() selectedSubscriptionAmountUnderChecksG: SubscriptionAmountUnderChecksG;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود الموظف', field: 'employeeCode' }),
	new GridColumnOptions({ headerName: 'رقم العضويه', field: 'membershipNumber' }),
	new GridColumnOptions({ headerName: 'تاريخ بدايه الفتره', field: 'periodStartDate' }),
	new GridColumnOptions({ headerName: 'تاريخ نهايه الفتره', field: 'periodEndDate' }),
	new GridColumnOptions({ headerName: 'رقم الشيك', field: 'checkNumber' }),
	new GridColumnOptions({ headerName: 'تاريخ الشيك', field: 'checkDate' }),
	new GridColumnOptions({ headerName: 'قيمه المبلغ', field: 'amountValue' }),
	new GridColumnOptions({ headerName: 'تاريخ العضويه', field: 'membershipDate' }),
	new GridColumnOptions({ headerName: 'كود الادارة', field: 'administrationCode' }),
	new GridColumnOptions({ headerName: 'حالة الموظف', field: 'employeeStatus' }),
	new GridColumnOptions({ headerName: 'الجهه الصادر منها', field: 'issuer' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: SubscriptionAmountUnderChecksGViewComponent,
    editDialogClassType: SubscriptionAmountUnderChecksGEditComponent,
    newDialogClassType: SubscriptionAmountUnderChecksGNewComponent,
  });
    constructor(
        injector: Injector,
        public subscriptionAmountUnderChecksGService: SubscriptionAmountUnderChecksGService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedSubscriptionAmountUnderChecksG = new SubscriptionAmountUnderChecksG();

    
	this.administrationCodeSelectOptions = new MaterialSelectOptions({
	 data: this.departmentsSectionsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الادارة',
	});

	this.employeeStatusSelectOptions = new MaterialSelectOptions({
	 data: this.employeeStatusesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حالة الموظف',
	});


    this.searchForm = this.formBuilder.group({
     	employeeCode : [],
	membershipNumber : [],
	administrationCode : [],
	employeeStatus : []
    });

     
  }

  getSubscriptionAmountsUnderChecksPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<SubscriptionAmountUnderChecksG[]> => {
    return this.subscriptionAmountUnderChecksGService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.subscriptionAmountUnderChecksGService.delete(param.data.id)
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
    this.departmentsSectionsService = new LookupService('departmentssections', this.http);
this.employeeStatusesService = new LookupService('employeestatuses', this.http);
  }
}

