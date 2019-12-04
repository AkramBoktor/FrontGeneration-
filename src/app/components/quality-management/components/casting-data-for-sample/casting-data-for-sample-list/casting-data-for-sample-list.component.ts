
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { CastingDataForSample } from 'app/shared/models/casting-data-for-sample';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { CastingDataForSampleEditComponent } from '../casting-data-for-sample-edit/casting-data-for-sample-edit.component';
import { CastingDataForSampleNewComponent } from '../casting-data-for-sample-new/casting-data-for-sample-new.component';
import { CastingDataForSampleViewComponent } from '../casting-data-for-sample-view/casting-data-for-sample-view.component';
import { CastingDataForSampleService } from '../shared/casting-data-for-sample.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-casting-data-for-sample-list',
  templateUrl: './casting-data-for-sample-list.component.html',
  styleUrls: ['./casting-data-for-sample-list.component.scss'],
  providers: []
})

export class CastingDataForSampleListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private constructionTypesService: LookupService;

  
constructionTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedCastingDataForSample: CastingDataForSample;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم طلب الاختبار', field: 'testOrderNumber' }),
	new GridColumnOptions({ headerName: 'كود العنصر', field: 'elementCode' }),
	new GridColumnOptions({ headerName: 'تاريخ الصب', field: 'castingHistory' }),
	new GridColumnOptions({ headerName: 'اسم العنصر الانشائي', field: 'structuralElementName' }),
	new GridColumnOptions({ headerName: 'نوع الانشاء', field: 'constructionType' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: CastingDataForSampleViewComponent,
    editDialogClassType: CastingDataForSampleEditComponent,
    newDialogClassType: CastingDataForSampleNewComponent,
  });
    constructor(
        injector: Injector,
        public castingDataForSampleService: CastingDataForSampleService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedCastingDataForSample = new CastingDataForSample();

    
	this.constructionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.constructionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الانشاء',
	});


    this.searchForm = this.formBuilder.group({
     	testOrderNumber : [],
	elementCode : [],
	constructionType : []
    });

     
  }

  getCastingDataForSamplesPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<CastingDataForSample[]> => {
    return this.castingDataForSampleService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.castingDataForSampleService.delete(param.data.id)
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
    this.constructionTypesService = new LookupService('constructiontypes', this.http);
  }
}

