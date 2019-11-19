
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { TerminationOfTheEmployee'sJobPlacement } from 'app/shared/models/termination-of-the-employee's-job-placement';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { TerminationOfTheEmployee'sJobPlacementEditComponent } from '../termination-of-the-employee's-job-placement-edit/termination-of-the-employee's-job-placement-edit.component';
import { TerminationOfTheEmployee'sJobPlacementNewComponent } from '../termination-of-the-employee's-job-placement-new/termination-of-the-employee's-job-placement-new.component';
import { TerminationOfTheEmployee'sJobPlacementViewComponent } from '../termination-of-the-employee's-job-placement-view/termination-of-the-employee's-job-placement-view.component';
import { TerminationOfTheEmployee'sJobPlacementService } from '../shared/termination-of-the-employee's-job-placement.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-termination-of-the-employee's-job-placement-list',
  templateUrl: './termination-of-the-employee's-job-placement-list.component.html',
  styleUrls: ['./termination-of-the-employee's-job-placement-list.component.scss'],
  providers: []
})

export class TerminationOfTheEmployee'sJobPlacementListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private branchCodesService: LookupService;
private sectionsOrCentersService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;
departmentSelectOptions: MaterialSelectOptions;

  
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('department', { static: true }) DepartmentSelectComponent: MaterialSelectComponent;

  
  @Input() selectedTerminationOfTheEmployee'sJobPlacement: TerminationOfTheEmployee'sJobPlacement;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم الموظف', field: 'employeeCode' }),
	new GridColumnOptions({ headerName: 'الوظيفه المسكن عليها ', field: 'jobDwellingonthem' }),
	new GridColumnOptions({ headerName: 'تاريخ التسكين', field: 'analgesiaDate' }),
	new GridColumnOptions({ headerName: 'تاريخ انهاء التسكين', field: 'endAnalgesiaDate' }),
	new GridColumnOptions({ headerName: 'كود الفرع', field: 'branchCode' }),
	new GridColumnOptions({ headerName: 'القسم', field: 'department' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: TerminationOfTheEmployee'sJobPlacementViewComponent,
    editDialogClassType: TerminationOfTheEmployee'sJobPlacementEditComponent,
    newDialogClassType: TerminationOfTheEmployee'sJobPlacementNewComponent,
  });
    constructor(
        injector: Injector,
        public terminationOfTheEmployee'sJobPlacementService: TerminationOfTheEmployee'sJobPlacementService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedTerminationOfTheEmployee'sJobPlacement = new TerminationOfTheEmployee'sJobPlacement();

    
	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الفرع',
	});

	this.departmentSelectOptions = new MaterialSelectOptions({
	 data: this.sectionsOrCentersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'القسم',
	});


    this.searchForm = this.formBuilder.group({
     	employeeCode : [],
	jobDwellingonthem : [],
	analgesiaDate : [],
	endAnalgesiaDate : [],
	branchCode : [],
	department : []
    });

     
  }

  getTerminationOfTheEmployee'sJobPlacementPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<TerminationOfTheEmployee'sJobPlacement[]> => {
    return this.terminationOfTheEmployee'sJobPlacementService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.terminationOfTheEmployee'sJobPlacementService.delete(param.data.id)
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
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
  }
}

