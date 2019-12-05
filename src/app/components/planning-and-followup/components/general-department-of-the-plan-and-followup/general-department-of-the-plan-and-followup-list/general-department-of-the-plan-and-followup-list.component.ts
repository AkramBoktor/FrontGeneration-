
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { GeneralDepartmentOfThePlanAndFollowup } from 'app/shared/models/general-department-of-the-plan-and-followup';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { GeneralDepartmentOfThePlanAndFollowupEditComponent } from '../general-department-of-the-plan-and-followup-edit/general-department-of-the-plan-and-followup-edit.component';
import { GeneralDepartmentOfThePlanAndFollowupNewComponent } from '../general-department-of-the-plan-and-followup-new/general-department-of-the-plan-and-followup-new.component';
import { GeneralDepartmentOfThePlanAndFollowupViewComponent } from '../general-department-of-the-plan-and-followup-view/general-department-of-the-plan-and-followup-view.component';
import { GeneralDepartmentOfThePlanAndFollowupService } from '../shared/general-department-of-the-plan-and-followup.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-general-department-of-the-plan-and-followup-list',
  templateUrl: './general-department-of-the-plan-and-followup-list.component.html',
  styleUrls: ['./general-department-of-the-plan-and-followup-list.component.scss'],
  providers: []
})

export class GeneralDepartmentOfThePlanAndFollowupListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private governoratesService: LookupService;
private componentCodesService: LookupService;

  
governorateCodeSelectOptions: MaterialSelectOptions;
componentCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('governorateCode', { static: true }) GovernorateCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('componentCode', { static: true }) ComponentCodeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedGeneralDepartmentOfThePlanAndFollowup: GeneralDepartmentOfThePlanAndFollowup;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'سنة الخطة', field: 'yearPlan' }),
	new GridColumnOptions({ headerName: 'رمز مشروع', field: 'projectode' }),
	new GridColumnOptions({ headerName: 'رمز المصدر', field: 'sourceCode' }),
	new GridColumnOptions({ headerName: 'قيمة الاعتماد', field: 'creditValue' }),
	new GridColumnOptions({ headerName: 'كود المحافظه', field: 'governorateCode' }),
	new GridColumnOptions({ headerName: 'رمز المكون', field: 'componentCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: GeneralDepartmentOfThePlanAndFollowupViewComponent,
    editDialogClassType: GeneralDepartmentOfThePlanAndFollowupEditComponent,
    newDialogClassType: GeneralDepartmentOfThePlanAndFollowupNewComponent,
  });
    constructor(
        injector: Injector,
        public generalDepartmentOfThePlanAndFollowupService: GeneralDepartmentOfThePlanAndFollowupService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedGeneralDepartmentOfThePlanAndFollowup = new GeneralDepartmentOfThePlanAndFollowup();

    
	this.governorateCodeSelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المحافظه',
	});

	this.componentCodeSelectOptions = new MaterialSelectOptions({
	 data: this.componentCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'رمز المكون',
	});


    this.searchForm = this.formBuilder.group({
     	yearPlan : [],
	projectode : [],
	sourceCode : [],
	governorateCode : [],
	componentCode : []
    });

     
  }

  getGeneralDepartmentOfThePlanAndFollowupPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<GeneralDepartmentOfThePlanAndFollowup[]> => {
    return this.generalDepartmentOfThePlanAndFollowupService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.generalDepartmentOfThePlanAndFollowupService.delete(param.data.id)
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
    this.governoratesService = new LookupService('governorates', this.http);
this.componentCodesService = new LookupService('componentcodes', this.http);
  }
}

