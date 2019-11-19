
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { NumberOfSchoolClassesInOperation } from 'app/shared/models/number-of-school-classes-in-operation';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { NumberOfSchoolClassesInOperationEditComponent } from '../number-of-school-classes-in-operation-edit/number-of-school-classes-in-operation-edit.component';
import { NumberOfSchoolClassesInOperationNewComponent } from '../number-of-school-classes-in-operation-new/number-of-school-classes-in-operation-new.component';
import { NumberOfSchoolClassesInOperationViewComponent } from '../number-of-school-classes-in-operation-view/number-of-school-classes-in-operation-view.component';
import { NumberOfSchoolClassesInOperationService } from '../shared/number-of-school-classes-in-operation.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-number-of-school-classes-in-operation-list',
  templateUrl: './number-of-school-classes-in-operation-list.component.html',
  styleUrls: ['./number-of-school-classes-in-operation-list.component.scss'],
  providers: []
})

export class NumberOfSchoolClassesInOperationListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private branchCodesService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedNumberOfSchoolClassesInOperation: NumberOfSchoolClassesInOperation;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود المشروع', field: 'projectCode' }),
	new GridColumnOptions({ headerName: 'عدد الفصول', field: 'classesNumber' }),
	new GridColumnOptions({ headerName: 'كود الفرع', field: 'branchCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: NumberOfSchoolClassesInOperationViewComponent,
    editDialogClassType: NumberOfSchoolClassesInOperationEditComponent,
    newDialogClassType: NumberOfSchoolClassesInOperationNewComponent,
  });
    constructor(
        injector: Injector,
        public numberOfSchoolClassesInOperationService: NumberOfSchoolClassesInOperationService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedNumberOfSchoolClassesInOperation = new NumberOfSchoolClassesInOperation();

    
	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الفرع',
	});


    this.searchForm = this.formBuilder.group({
     	projectCode : [],
	classesNumber : [],
	branchCode : []
    });

     
  }

  getNumberOfSchoolClassesInOperationPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<NumberOfSchoolClassesInOperation[]> => {
    return this.numberOfSchoolClassesInOperationService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.numberOfSchoolClassesInOperationService.delete(param.data.id)
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
  }
}

