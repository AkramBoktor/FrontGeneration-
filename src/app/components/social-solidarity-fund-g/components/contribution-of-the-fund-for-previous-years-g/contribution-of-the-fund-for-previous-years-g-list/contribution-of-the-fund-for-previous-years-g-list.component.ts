
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { ContributionOfTheFundForPreviousYearsG } from 'app/shared/models/contribution-of-the-fund-for-previous-years-g';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ContributionOfTheFundForPreviousYearsGEditComponent } from '../contribution-of-the-fund-for-previous-years-g-edit/contribution-of-the-fund-for-previous-years-g-edit.component';
import { ContributionOfTheFundForPreviousYearsGNewComponent } from '../contribution-of-the-fund-for-previous-years-g-new/contribution-of-the-fund-for-previous-years-g-new.component';
import { ContributionOfTheFundForPreviousYearsGViewComponent } from '../contribution-of-the-fund-for-previous-years-g-view/contribution-of-the-fund-for-previous-years-g-view.component';
import { ContributionOfTheFundForPreviousYearsGService } from '../shared/contribution-of-the-fund-for-previous-years-g.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-contribution-of-the-fund-for-previous-years-g-list',
  templateUrl: './contribution-of-the-fund-for-previous-years-g-list.component.html',
  styleUrls: ['./contribution-of-the-fund-for-previous-years-g-list.component.scss'],
  providers: []
})

export class ContributionOfTheFundForPreviousYearsGListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedContributionOfTheFundForPreviousYearsG: ContributionOfTheFundForPreviousYearsG;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'قيمه الاشتراك', field: 'registrationPrice' }),
	new GridColumnOptions({ headerName: 'سنة الاشتراك', field: 'subscriptionYear' }),
	new GridColumnOptions({ headerName: 'كود الموظف', field: 'employeeCode' }),
	new GridColumnOptions({ headerName: 'حالة الاشتراك', field: 'subscriptionStatus' }),
	new GridColumnOptions({ headerName: 'تاريخ الاشتراك', field: 'joinDate' }),
	new GridColumnOptions({ headerName: 'رقم عضويه', field: 'membershipNumber' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: ContributionOfTheFundForPreviousYearsGViewComponent,
    editDialogClassType: ContributionOfTheFundForPreviousYearsGEditComponent,
    newDialogClassType: ContributionOfTheFundForPreviousYearsGNewComponent,
  });
    constructor(
        injector: Injector,
        public contributionOfTheFundForPreviousYearsGService: ContributionOfTheFundForPreviousYearsGService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedContributionOfTheFundForPreviousYearsG = new ContributionOfTheFundForPreviousYearsG();

    

    this.searchForm = this.formBuilder.group({
     	employeeCode : [],
	subscriptionStatus : [],
	membershipNumber : [],
	subscriptionYear : []
    });

     
  }

  getContributionsOfTheFundForPreviousYearsPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<ContributionOfTheFundForPreviousYearsG[]> => {
    return this.contributionOfTheFundForPreviousYearsGService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.contributionOfTheFundForPreviousYearsGService.delete(param.data.id)
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

