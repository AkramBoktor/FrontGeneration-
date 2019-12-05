
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { AssayData } from 'app/shared/models/assay-data';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { AssayDataEditComponent } from '../assay-data-edit/assay-data-edit.component';
import { AssayDataNewComponent } from '../assay-data-new/assay-data-new.component';
import { AssayDataViewComponent } from '../assay-data-view/assay-data-view.component';
import { AssayDataService } from '../shared/assay-data.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-assay-data-list',
  templateUrl: './assay-data-list.component.html',
  styleUrls: ['./assay-data-list.component.scss'],
  providers: []
})

export class AssayDataListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private processingTypesService: LookupService;
private offeringMethodsService: LookupService;
private offeringTermsService: LookupService;

  
processingTypeSelectOptions: MaterialSelectOptions;
offeringMethodSelectOptions: MaterialSelectOptions;
offeringTermsSelectOptions: MaterialSelectOptions;

  
	@ViewChild('processingType', { static: true }) ProcessingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('offeringMethod', { static: true }) OfferingMethodSelectComponent: MaterialSelectComponent;
	@ViewChild('offeringTerms', { static: true }) OfferingTermsSelectComponent: MaterialSelectComponent;

  
  @Input() selectedAssayData: AssayData;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم المقايسة', field: 'assayNumber' }),
	new GridColumnOptions({ headerName: 'مده التوريد', field: 'supplyingDuration' }),
	new GridColumnOptions({ headerName: 'نوع التجهيز', field: 'processingType' }),
	new GridColumnOptions({ headerName: 'طريقة الطرح', field: 'offeringMethod' }),
	new GridColumnOptions({ headerName: 'شروط الطرح', field: 'offeringTerms' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: AssayDataViewComponent,
    editDialogClassType: AssayDataEditComponent,
    newDialogClassType: AssayDataNewComponent,
  });
    constructor(
        injector: Injector,
        public assayDataService: AssayDataService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedAssayData = new AssayData();

    
	this.processingTypeSelectOptions = new MaterialSelectOptions({
	 data: this.processingTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع التجهيز',
	});

	this.offeringMethodSelectOptions = new MaterialSelectOptions({
	 data: this.offeringMethodsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'طريقة الطرح',
	});

	this.offeringTermsSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTermsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'شروط الطرح',
	});


    this.searchForm = this.formBuilder.group({
     	assayNumber : [],
	supplyingDuration : [],
	processingType : [],
	offeringMethod : [],
	offeringTerms : []
    });

     
  }

  getAssayDataPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<AssayData[]> => {
    return this.assayDataService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.assayDataService.delete(param.data.id)
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
    this.processingTypesService = new LookupService('processingtypes', this.http);
this.offeringMethodsService = new LookupService('offeringmethods', this.http);
this.offeringTermsService = new LookupService('offeringterms', this.http);
  }
}

