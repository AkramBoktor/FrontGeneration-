
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { AssignEngineerOutsideDepartment } from 'app/shared/models/assign-engineer-outside-department';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { AssignEngineerOutsideDepartmentEditComponent } from '../assign-engineer-outside-department-edit/assign-engineer-outside-department-edit.component';
import { AssignEngineerOutsideDepartmentNewComponent } from '../assign-engineer-outside-department-new/assign-engineer-outside-department-new.component';
import { AssignEngineerOutsideDepartmentViewComponent } from '../assign-engineer-outside-department-view/assign-engineer-outside-department-view.component';
import { AssignEngineerOutsideDepartmentService } from '../shared/assign-engineer-outside-department.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-assign-engineer-outside-department-list',
  templateUrl: './assign-engineer-outside-department-list.component.html',
  styleUrls: ['./assign-engineer-outside-department-list.component.scss'],
  providers: []
})

export class AssignEngineerOutsideDepartmentListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private branchCodesService: LookupService;
private constructionTypesService: LookupService;
private offeringTypesService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;
constructionTypeSelectOptions: MaterialSelectOptions;
offeringTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedAssignEngineerOutsideDepartment: AssignEngineerOutsideDepartment;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم المهندس التنفيذى', field: 'executiveEngineerNumber' }),
	new GridColumnOptions({ headerName: 'رقم المدرسه', field: 'schoolNumber' }),
	new GridColumnOptions({ headerName: 'رقم الملحق', field: 'atthchEnginnerNumber' }),
	new GridColumnOptions({ headerName: 'سنه الخطه', field: 'yearPlan' }),
	new GridColumnOptions({ headerName: 'رقم المناقصه', field: 'bidNumber' }),
	new GridColumnOptions({ headerName: 'تاريخ بدايه الاشراف', field: 'supervisionBeginningDate' }),
	new GridColumnOptions({ headerName: 'كود الفرع', field: 'branchCode' }),
	new GridColumnOptions({ headerName: 'نوع الانشاء', field: 'constructionType' }),
	new GridColumnOptions({ headerName: 'نوع الطرح', field: 'offeringType' }),
	new GridColumnOptions({ headerName: 'النوع', field: 'type' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: AssignEngineerOutsideDepartmentViewComponent,
    editDialogClassType: AssignEngineerOutsideDepartmentEditComponent,
    newDialogClassType: AssignEngineerOutsideDepartmentNewComponent,
  });
    constructor(
        injector: Injector,
        public assignEngineerOutsideDepartmentService: AssignEngineerOutsideDepartmentService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedAssignEngineerOutsideDepartment = new AssignEngineerOutsideDepartment();

    
	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الفرع',
	});

	this.constructionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.constructionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الانشاء',
	});

	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});


    this.searchForm = this.formBuilder.group({
     	executiveEngineerNumber : [],
	schoolNumber : [],
	atthchEnginnerNumber : [],
	yearPlan : [],
	bidNumber : [],
	supervisionBeginningDate : [],
	branchCode : [],
	constructionType : [],
	offeringType : []
    });

     
  }

  getAssignEngineerOutsideDepartmentsPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<AssignEngineerOutsideDepartment[]> => {
    return this.assignEngineerOutsideDepartmentService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.assignEngineerOutsideDepartmentService.delete(param.data.id)
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
this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.offeringTypesService = new LookupService('offeringtypes', this.http);
  }
}

