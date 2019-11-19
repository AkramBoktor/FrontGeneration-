
import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { GridColumnOptions, GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { FormControlError, GridPaginatedSortedFiltered } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { IncentiveBonus } from 'app/shared/models/incentive-bonus';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { IncentiveBonusEditComponent } from '../incentive-bonus-edit/incentive-bonus-edit.component';
import { IncentiveBonusNewComponent } from '../incentive-bonus-new/incentive-bonus-new.component';
import { IncentiveBonusViewComponent } from '../incentive-bonus-view/incentive-bonus-view.component';
import { IncentiveBonusService } from '../shared/incentive-bonus.service';

@Component({
  selector: 'app-incentive-bonus-list',
  templateUrl: './incentive-bonus-list.component.html',
  styleUrls: ['./incentive-bonus-list.component.scss'],
  providers: []
})

export class IncentiveBonusListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private functionalGroupsService: LookupService;
private jobTypesService: LookupService;
private financialDegreesService: LookupService;

  
jobGroupSelectOptions: MaterialSelectOptions;
jobTitleSelectOptions: MaterialSelectOptions;
financialDegreeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('jobGroup', { static: true }) JobGroupSelectComponent: MaterialSelectComponent;
	@ViewChild('jobTitle', { static: true }) JobTitleSelectComponent: MaterialSelectComponent;
	@ViewChild('financialDegree', { static: true }) FinancialDegreeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedIncentiveBonus: IncentiveBonus;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'سنه منح العلاوه', field: 'grantedYear' }),
	new GridColumnOptions({ headerName: 'رقم القرار', field: 'decisionNumber' }),
	new GridColumnOptions({ headerName: 'تاريخ القرار', field: 'decisionDate' }),
	new GridColumnOptions({ headerName: 'تاريخ اعتماد اللجنه', field: 'committeeAcceptedDate' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: IncentiveBonusViewComponent,
    editDialogClassType: IncentiveBonusEditComponent,
    newDialogClassType: IncentiveBonusNewComponent,
  });
    constructor(
        injector: Injector,
        public incentiveBonusService: IncentiveBonusService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedIncentiveBonus = new IncentiveBonus();

    
	this.jobGroupSelectOptions = new MaterialSelectOptions({
	 data: this.functionalGroupsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المجموعه الوظيفية',
	});

	this.jobTitleSelectOptions = new MaterialSelectOptions({
	 data: this.jobTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الوظيفه',
	});

	this.financialDegreeSelectOptions = new MaterialSelectOptions({
	 data: this.financialDegreesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الدرجه الماليه',
	});


    this.searchForm = this.formBuilder.group({
     	employeeCode : [],
	grantedYear : [],
	decisionNumber : [],
	decisionDate : [],
	committeeAcceptedDate : [],
	jobGroup : [],
	jobTitle : [],
	financialDegree : []
    });

     
  }

  getIncentiveBonusPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<IncentiveBonus[]> => {
    return this.incentiveBonusService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.incentiveBonusService.delete(param.data.id)
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
    this.functionalGroupsService = new LookupService('functionalgroups', this.http);
this.jobTypesService = new LookupService('jobtypes', this.http);
this.financialDegreesService = new LookupService('financialdegrees', this.http);
  }
}

