
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { AssignmentData } from 'app/shared/models/assignment-data';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { AssignmentDataEditComponent } from '../assignment-data-edit/assignment-data-edit.component';
import { AssignmentDataNewComponent } from '../assignment-data-new/assignment-data-new.component';
import { AssignmentDataViewComponent } from '../assignment-data-view/assignment-data-view.component';
import { AssignmentDataService } from '../shared/assignment-data.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-assignment-data-list',
  templateUrl: './assignment-data-list.component.html',
  styleUrls: ['./assignment-data-list.component.scss'],
  providers: []
})

export class AssignmentDataListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private offeringTypesService: LookupService;

  
offeringTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedAssignmentData: AssignmentData;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم المناقصة', field: 'bidNumber' }),
	new GridColumnOptions({ headerName: 'التقرير الفني', field: 'technicalReport' }),
	new GridColumnOptions({ headerName: 'نوع الطرح', field: 'offeringType' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: AssignmentDataViewComponent,
    editDialogClassType: AssignmentDataEditComponent,
    newDialogClassType: AssignmentDataNewComponent,
  });
    constructor(
        injector: Injector,
        public assignmentDataService: AssignmentDataService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedAssignmentData = new AssignmentData();

    
	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});


    this.searchForm = this.formBuilder.group({
     	bidNumber : [],
	technicalReport : [],
	offeringType : []
    });

     
  }

  getAssignmentsDataPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<AssignmentData[]> => {
    return this.assignmentDataService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.assignmentDataService.delete(param.data.id)
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
    this.offeringTypesService = new LookupService('offeringtypes', this.http);
  }
}

