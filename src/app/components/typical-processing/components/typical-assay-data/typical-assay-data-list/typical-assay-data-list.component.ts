
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { TypicalAssayData } from 'app/shared/models/typical-assay-data';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { TypicalAssayDataEditComponent } from '../typical-assay-data-edit/typical-assay-data-edit.component';
import { TypicalAssayDataNewComponent } from '../typical-assay-data-new/typical-assay-data-new.component';
import { TypicalAssayDataViewComponent } from '../typical-assay-data-view/typical-assay-data-view.component';
import { TypicalAssayDataService } from '../shared/typical-assay-data.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-typical-assay-data-list',
  templateUrl: './typical-assay-data-list.component.html',
  styleUrls: ['./typical-assay-data-list.component.scss'],
  providers: []
})

export class TypicalAssayDataListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private offeringTermsService: LookupService;
private offeringMethodsService: LookupService;
private processingTypesService: LookupService;

  
offeringTermsSelectOptions: MaterialSelectOptions;
offeringMethodSelectOptions: MaterialSelectOptions;
processingTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('offeringTerms', { static: true }) OfferingTermsSelectComponent: MaterialSelectComponent;
	@ViewChild('offeringMethod', { static: true }) OfferingMethodSelectComponent: MaterialSelectComponent;
	@ViewChild('processingType', { static: true }) ProcessingTypeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedTypicalAssayData: TypicalAssayData;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم المقايسة', field: 'assayNumber' }),
	new GridColumnOptions({ headerName: 'مده التوريد', field: 'supplyingDuration' }),
	new GridColumnOptions({ headerName: 'نوع التجهيز', field: 'processingType' }),
	new GridColumnOptions({ headerName: 'شروط الطرح', field: 'offeringTerms' }),
	new GridColumnOptions({ headerName: 'طريقة الطرح', field: 'offeringMethod' }),
	new GridColumnOptions({ headerName: 'كود الشرط', field: 'conditionCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: TypicalAssayDataViewComponent,
    editDialogClassType: TypicalAssayDataEditComponent,
    newDialogClassType: TypicalAssayDataNewComponent,
  });
    constructor(
        injector: Injector,
        public typicalAssayDataService: TypicalAssayDataService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedTypicalAssayData = new TypicalAssayData();

    
	this.offeringTermsSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTermsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'شروط الطرح',
	});

	this.offeringMethodSelectOptions = new MaterialSelectOptions({
	 data: this.offeringMethodsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'طريقة الطرح',
	});

	this.processingTypeSelectOptions = new MaterialSelectOptions({
	 data: this.processingTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع التجهيز',
	});


    this.searchForm = this.formBuilder.group({
     	supplyingDuration : [],
	assayNumber : [],
	offeringTerms : [],
	offeringMethod : [],
	processingType : []
    });

     
  }

  getTypicalAssayDataPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<TypicalAssayData[]> => {
    return this.typicalAssayDataService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.typicalAssayDataService.delete(param.data.id)
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
    this.offeringTermsService = new LookupService('offeringterms', this.http);
this.offeringMethodsService = new LookupService('offeringmethods', this.http);
this.processingTypesService = new LookupService('processingtypes', this.http);
  }
}

