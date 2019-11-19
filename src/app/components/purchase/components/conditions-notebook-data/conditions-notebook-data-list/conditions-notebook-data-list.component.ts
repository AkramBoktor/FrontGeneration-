
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { ConditionsNotebookData } from 'app/shared/models/conditions-notebook-data';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ConditionsNotebookDataEditComponent } from '../conditions-notebook-data-edit/conditions-notebook-data-edit.component';
import { ConditionsNotebookDataNewComponent } from '../conditions-notebook-data-new/conditions-notebook-data-new.component';
import { ConditionsNotebookDataViewComponent } from '../conditions-notebook-data-view/conditions-notebook-data-view.component';
import { ConditionsNotebookDataService } from '../shared/conditions-notebook-data.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-conditions-notebook-data-list',
  templateUrl: './conditions-notebook-data-list.component.html',
  styleUrls: ['./conditions-notebook-data-list.component.scss'],
  providers: []
})

export class ConditionsNotebookDataListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private offeringTypesService: LookupService;

  
offeringTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedConditionsNotebookData: ConditionsNotebookData;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم المناقصة', field: 'bidNumber' }),
	new GridColumnOptions({ headerName: 'المشروع', field: 'project' }),
	new GridColumnOptions({ headerName: 'المورد', field: 'supplier' }),
	new GridColumnOptions({ headerName: 'قيمة الكراسة', field: 'brochureValue' }),
	new GridColumnOptions({ headerName: 'رقم ا.ش كراسة الشروط', field: 'brochureNo' }),
	new GridColumnOptions({ headerName: 'تاريخ شراء الكراسة', field: 'brochurePurchaseDate' }),
	new GridColumnOptions({ headerName: 'نوع الطرح', field: 'offeringType' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: ConditionsNotebookDataViewComponent,
    editDialogClassType: ConditionsNotebookDataEditComponent,
    newDialogClassType: ConditionsNotebookDataNewComponent,
  });
    constructor(
        injector: Injector,
        public conditionsNotebookDataService: ConditionsNotebookDataService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedConditionsNotebookData = new ConditionsNotebookData();

    
	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});


    this.searchForm = this.formBuilder.group({
     	bidNumber : [],
	project : [],
	supplier : [],
	brochureValue : [],
	brochureNo : [],
	brochurePurchaseDate : [],
	offeringType : []
    });

     
  }

  getConditionsNotebookDataPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<ConditionsNotebookData[]> => {
    return this.conditionsNotebookDataService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.conditionsNotebookDataService.delete(param.data.id)
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

