
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { ContributionOfTheFundForPreviousYearsB } from 'app/shared/models/contribution-of-the-fund-for-previous-years-b';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ContributionOfTheFundForPreviousYearsBEditComponent } from '../contribution-of-the-fund-for-previous-years-b-edit/contribution-of-the-fund-for-previous-years-b-edit.component';
import { ContributionOfTheFundForPreviousYearsBNewComponent } from '../contribution-of-the-fund-for-previous-years-b-new/contribution-of-the-fund-for-previous-years-b-new.component';
import { ContributionOfTheFundForPreviousYearsBViewComponent } from '../contribution-of-the-fund-for-previous-years-b-view/contribution-of-the-fund-for-previous-years-b-view.component';
import { ContributionOfTheFundForPreviousYearsBService } from '../shared/contribution-of-the-fund-for-previous-years-b.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-contribution-of-the-fund-for-previous-years-b-list',
  templateUrl: './contribution-of-the-fund-for-previous-years-b-list.component.html',
  styleUrls: ['./contribution-of-the-fund-for-previous-years-b-list.component.scss'],
  providers: []
})

export class ContributionOfTheFundForPreviousYearsBListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedContributionOfTheFundForPreviousYearsB: ContributionOfTheFundForPreviousYearsB;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم عضويه', field: 'membershipNumber' }),
	new GridColumnOptions({ headerName: 'تاريخ الاشتراك', field: 'joinDate' }),
	new GridColumnOptions({ headerName: 'حالة الاشتراك', field: 'subscriptionStatus' }),
	new GridColumnOptions({ headerName: 'كود الموظف', field: 'employeeCode' }),
	new GridColumnOptions({ headerName: 'سنة الاشتراك', field: 'subscriptionYear' }),
	new GridColumnOptions({ headerName: 'قيمه الاشتراك', field: 'registrationPrice' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: ContributionOfTheFundForPreviousYearsBViewComponent,
    editDialogClassType: ContributionOfTheFundForPreviousYearsBEditComponent,
    newDialogClassType: ContributionOfTheFundForPreviousYearsBNewComponent,
  });
    constructor(
        injector: Injector,
        public contributionOfTheFundForPreviousYearsBService: ContributionOfTheFundForPreviousYearsBService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedContributionOfTheFundForPreviousYearsB = new ContributionOfTheFundForPreviousYearsB();

    

    this.searchForm = this.formBuilder.group({
     	subscriptionYear : [],
	membershipNumber : [],
	subscriptionStatus : [],
	employeeCode : []
    });

     
  }

  getContributionsOfTheFundForPreviousYearsPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<ContributionOfTheFundForPreviousYearsB[]> => {
    return this.contributionOfTheFundForPreviousYearsBService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.contributionOfTheFundForPreviousYearsBService.delete(param.data.id)
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

