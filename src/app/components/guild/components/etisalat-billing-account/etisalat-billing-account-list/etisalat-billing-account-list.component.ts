
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { EtisalatBillingAccount } from 'app/shared/models/etisalat-billing-account';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { EtisalatBillingAccountEditComponent } from '../etisalat-billing-account-edit/etisalat-billing-account-edit.component';
import { EtisalatBillingAccountNewComponent } from '../etisalat-billing-account-new/etisalat-billing-account-new.component';
import { EtisalatBillingAccountViewComponent } from '../etisalat-billing-account-view/etisalat-billing-account-view.component';
import { EtisalatBillingAccountService } from '../shared/etisalat-billing-account.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-etisalat-billing-account-list',
  templateUrl: './etisalat-billing-account-list.component.html',
  styleUrls: ['./etisalat-billing-account-list.component.scss'],
  providers: []
})

export class EtisalatBillingAccountListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedEtisalatBillingAccount: EtisalatBillingAccount;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: ' شهر الدين', field: 'monthDebt' }),
	new GridColumnOptions({ headerName: 'الفتره من ', field: 'periodOf' }),
	new GridColumnOptions({ headerName: ' الفتره الي ', field: 'periodTo' }),
	new GridColumnOptions({ headerName: 'كود الموظف', field: 'employeeCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: EtisalatBillingAccountViewComponent,
    editDialogClassType: EtisalatBillingAccountEditComponent,
    newDialogClassType: EtisalatBillingAccountNewComponent,
  });
    constructor(
        injector: Injector,
        public etisalatBillingAccountService: EtisalatBillingAccountService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedEtisalatBillingAccount = new EtisalatBillingAccount();

    

    this.searchForm = this.formBuilder.group({
     	monthDebt : [],
	periodOf : [],
	periodTo : [],
	employeeCode : []
    });

     
  }

  getEtisalatBillingAccountPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<EtisalatBillingAccount[]> => {
    return this.etisalatBillingAccountService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.etisalatBillingAccountService.delete(param.data.id)
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
    
  }
}

