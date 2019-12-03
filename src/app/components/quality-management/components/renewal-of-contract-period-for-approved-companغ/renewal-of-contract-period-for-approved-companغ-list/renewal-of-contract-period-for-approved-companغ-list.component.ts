
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { RenewalOfContractPeriodForApprovedCompanغ } from 'app/shared/models/renewal-of-contract-period-for-approved-companغ';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { RenewalOfContractPeriodForApprovedCompanغEditComponent } from '../renewal-of-contract-period-for-approved-companغ-edit/renewal-of-contract-period-for-approved-companغ-edit.component';
import { RenewalOfContractPeriodForApprovedCompanغNewComponent } from '../renewal-of-contract-period-for-approved-companغ-new/renewal-of-contract-period-for-approved-companغ-new.component';
import { RenewalOfContractPeriodForApprovedCompanغViewComponent } from '../renewal-of-contract-period-for-approved-companغ-view/renewal-of-contract-period-for-approved-companغ-view.component';
import { RenewalOfContractPeriodForApprovedCompanغService } from '../shared/renewal-of-contract-period-for-approved-companغ.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-renewal-of-contract-period-for-approved-companغ-list',
  templateUrl: './renewal-of-contract-period-for-approved-companغ-list.component.html',
  styleUrls: ['./renewal-of-contract-period-for-approved-companغ-list.component.scss'],
  providers: []
})

export class RenewalOfContractPeriodForApprovedCompanغListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedRenewalOfContractPeriodForApprovedCompanغ: RenewalOfContractPeriodForApprovedCompanغ;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود الشركة', field: 'companyCode' }),
	new GridColumnOptions({ headerName: 'تاريخ بداية العقد', field: 'contractStartingDate' }),
	new GridColumnOptions({ headerName: 'تاريخ نهاية العقد', field: 'contractEndDate' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: RenewalOfContractPeriodForApprovedCompanغViewComponent,
    editDialogClassType: RenewalOfContractPeriodForApprovedCompanغEditComponent,
    newDialogClassType: RenewalOfContractPeriodForApprovedCompanغNewComponent,
  });
    constructor(
        injector: Injector,
        public renewalOfContractPeriodForApprovedCompanغService: RenewalOfContractPeriodForApprovedCompanغService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedRenewalOfContractPeriodForApprovedCompanغ = new RenewalOfContractPeriodForApprovedCompanغ();

    

    this.searchForm = this.formBuilder.group({
     	companyCode : []
    });

     
  }

  getRenewalOfContractPeriodForApprovedCompaniesPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<RenewalOfContractPeriodForApprovedCompanغ[]> => {
    return this.renewalOfContractPeriodForApprovedCompanغService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.renewalOfContractPeriodForApprovedCompanغService.delete(param.data.id)
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

