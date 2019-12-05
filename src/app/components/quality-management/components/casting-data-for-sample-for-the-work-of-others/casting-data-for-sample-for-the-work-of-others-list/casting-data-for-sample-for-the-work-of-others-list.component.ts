
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { CastingDataForSampleForTheWorkOfOthers } from 'app/shared/models/casting-data-for-sample-for-the-work-of-others';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { CastingDataForSampleForTheWorkOfOthersEditComponent } from '../casting-data-for-sample-for-the-work-of-others-edit/casting-data-for-sample-for-the-work-of-others-edit.component';
import { CastingDataForSampleForTheWorkOfOthersNewComponent } from '../casting-data-for-sample-for-the-work-of-others-new/casting-data-for-sample-for-the-work-of-others-new.component';
import { CastingDataForSampleForTheWorkOfOthersViewComponent } from '../casting-data-for-sample-for-the-work-of-others-view/casting-data-for-sample-for-the-work-of-others-view.component';
import { CastingDataForSampleForTheWorkOfOthersService } from '../shared/casting-data-for-sample-for-the-work-of-others.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-casting-data-for-sample-for-the-work-of-others-list',
  templateUrl: './casting-data-for-sample-for-the-work-of-others-list.component.html',
  styleUrls: ['./casting-data-for-sample-for-the-work-of-others-list.component.scss'],
  providers: []
})

export class CastingDataForSampleForTheWorkOfOthersListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private constructionTypesService: LookupService;
private elementsService: LookupService;

  
constructionTypeSelectOptions: MaterialSelectOptions;
elementCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('elementCode', { static: true }) ElementCodeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedCastingDataForSampleForTheWorkOfOthers: CastingDataForSampleForTheWorkOfOthers;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'تاريخ الصب', field: 'castingHistory' }),
	new GridColumnOptions({ headerName: 'رقم طلب الاختبار', field: 'testOrderNumber' }),
	new GridColumnOptions({ headerName: 'اسم العنصر الانشائي', field: 'structuralElementName' }),
	new GridColumnOptions({ headerName: 'كود العنصر', field: 'elementCode' }),
	new GridColumnOptions({ headerName: 'نوع الانشاء', field: 'constructionType' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: CastingDataForSampleForTheWorkOfOthersViewComponent,
    editDialogClassType: CastingDataForSampleForTheWorkOfOthersEditComponent,
    newDialogClassType: CastingDataForSampleForTheWorkOfOthersNewComponent,
  });
    constructor(
        injector: Injector,
        public castingDataForSampleForTheWorkOfOthersService: CastingDataForSampleForTheWorkOfOthersService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedCastingDataForSampleForTheWorkOfOthers = new CastingDataForSampleForTheWorkOfOthers();

    
	this.constructionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.constructionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الانشاء',
	});

	this.elementCodeSelectOptions = new MaterialSelectOptions({
	 data: this.elementsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود العنصر',
	});


    this.searchForm = this.formBuilder.group({
     	testOrderNumber : [],
	constructionType : [],
	elementCode : []
    });

     
  }

  getCastingDataForSamplesForTheWorkOfOthersPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<CastingDataForSampleForTheWorkOfOthers[]> => {
    return this.castingDataForSampleForTheWorkOfOthersService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.castingDataForSampleForTheWorkOfOthersService.delete(param.data.id)
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
this.elementsService = new LookupService('elements', this.http);
  }
}

