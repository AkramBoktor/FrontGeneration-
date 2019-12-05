
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { ContributionOfTheFundForPreviousYearsA } from 'app/shared/models/contribution-of-the-fund-for-previous-years-a';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ContributionOfTheFundForPreviousYearsAEditComponent } from '../contribution-of-the-fund-for-previous-years-a-edit/contribution-of-the-fund-for-previous-years-a-edit.component';
import { ContributionOfTheFundForPreviousYearsANewComponent } from '../contribution-of-the-fund-for-previous-years-a-new/contribution-of-the-fund-for-previous-years-a-new.component';
import { ContributionOfTheFundForPreviousYearsAViewComponent } from '../contribution-of-the-fund-for-previous-years-a-view/contribution-of-the-fund-for-previous-years-a-view.component';
import { ContributionOfTheFundForPreviousYearsAService } from '../shared/contribution-of-the-fund-for-previous-years-a.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-contribution-of-the-fund-for-previous-years-a-list',
  templateUrl: './contribution-of-the-fund-for-previous-years-a-list.component.html',
  styleUrls: ['./contribution-of-the-fund-for-previous-years-a-list.component.scss'],
  providers: []
})

export class ContributionOfTheFundForPreviousYearsAListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedContributionOfTheFundForPreviousYearsA: ContributionOfTheFundForPreviousYearsA;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود الموظف', field: 'employeeCode' }),
	new GridColumnOptions({ headerName: 'حالة الاشتراك', field: 'subscriptionStatus' }),
	new GridColumnOptions({ headerName: 'تاريخ الاشتراك', field: 'joinDate' }),
	new GridColumnOptions({ headerName: 'رقم عضويه', field: 'membershipNumber' }),
	new GridColumnOptions({ headerName: 'سنة الاشتراك', field: 'subscriptionYear' }),
	new GridColumnOptions({ headerName: 'قيمه الاشتراك', field: 'registrationPrice' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: ContributionOfTheFundForPreviousYearsAViewComponent,
    editDialogClassType: ContributionOfTheFundForPreviousYearsAEditComponent,
    newDialogClassType: ContributionOfTheFundForPreviousYearsANewComponent,
  });
    constructor(
        injector: Injector,
        public contributionOfTheFundForPreviousYearsAService: ContributionOfTheFundForPreviousYearsAService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedContributionOfTheFundForPreviousYearsA = new ContributionOfTheFundForPreviousYearsA();

    

    this.searchForm = this.formBuilder.group({
     	employeeCode : [],
	subscriptionStatus : [],
	membershipNumber : [],
	subscriptionYear : []
    });

     
  }

  getContributionsOfTheFundForPreviousYearsPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<ContributionOfTheFundForPreviousYearsA[]> => {
    return this.contributionOfTheFundForPreviousYearsAService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.contributionOfTheFundForPreviousYearsAService.delete(param.data.id)
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

