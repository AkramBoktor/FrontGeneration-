
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { TheSourceOfFundingForAnAnnualPlanProjectComponent } from 'app/shared/models/the-source-of-funding-for-an-annual-plan-project-component';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { TheSourceOfFundingForAnAnnualPlanProjectComponentEditComponent } from '../the-source-of-funding-for-an-annual-plan-project-component-edit/the-source-of-funding-for-an-annual-plan-project-component-edit.component';
import { TheSourceOfFundingForAnAnnualPlanProjectComponentNewComponent } from '../the-source-of-funding-for-an-annual-plan-project-component-new/the-source-of-funding-for-an-annual-plan-project-component-new.component';
import { TheSourceOfFundingForAnAnnualPlanProjectComponentViewComponent } from '../the-source-of-funding-for-an-annual-plan-project-component-view/the-source-of-funding-for-an-annual-plan-project-component-view.component';
import { TheSourceOfFundingForAnAnnualPlanProjectComponentService } from '../shared/the-source-of-funding-for-an-annual-plan-project-component.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-the-source-of-funding-for-an-annual-plan-project-component-list',
  templateUrl: './the-source-of-funding-for-an-annual-plan-project-component-list.component.html',
  styleUrls: ['./the-source-of-funding-for-an-annual-plan-project-component-list.component.scss'],
  providers: []
})

export class TheSourceOfFundingForAnAnnualPlanProjectComponentListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private componentCodesService: LookupService;

  
componentCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('componentCode', { static: true }) ComponentCodeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedTheSourceOfFundingForAnAnnualPlanProjectComponent: TheSourceOfFundingForAnAnnualPlanProjectComponent;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: '  القيمة المقترحة', field: 'suggesteValue' }),
	new GridColumnOptions({ headerName: 'رمز المصدر', field: 'sourceCode' }),
	new GridColumnOptions({ headerName: '  سنة الخطة', field: 'yearPlan' }),
	new GridColumnOptions({ headerName: '  رمز مشروع خطة', field: 'projectPlanCode' }),
	new GridColumnOptions({ headerName: ' الاعتماد بعد التعديل', field: 'accreditationAfterAmendment' }),
	new GridColumnOptions({ headerName: ' قيمة الاعتماد', field: 'creditValue' }),
	new GridColumnOptions({ headerName: ' رمز المكون', field: 'componentCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: TheSourceOfFundingForAnAnnualPlanProjectComponentViewComponent,
    editDialogClassType: TheSourceOfFundingForAnAnnualPlanProjectComponentEditComponent,
    newDialogClassType: TheSourceOfFundingForAnAnnualPlanProjectComponentNewComponent,
  });
    constructor(
        injector: Injector,
        public theSourceOfFundingForAnAnnualPlanProjectComponentService: TheSourceOfFundingForAnAnnualPlanProjectComponentService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedTheSourceOfFundingForAnAnnualPlanProjectComponent = new TheSourceOfFundingForAnAnnualPlanProjectComponent();

    
	this.componentCodeSelectOptions = new MaterialSelectOptions({
	 data: this.componentCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' رمز المكون',
	});


    this.searchForm = this.formBuilder.group({
     	sourceCode : [],
	yearPlan : [],
	projectPlanCode : [],
	componentCode : []
    });

     
  }

  getTheSourceOfFundingForAnAnnualPlanProjectComponentPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<TheSourceOfFundingForAnAnnualPlanProjectComponent[]> => {
    return this.theSourceOfFundingForAnAnnualPlanProjectComponentService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.theSourceOfFundingForAnAnnualPlanProjectComponentService.delete(param.data.id)
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
    this.componentCodesService = new LookupService('componentcodes', this.http);
  }
}

