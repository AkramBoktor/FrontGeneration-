
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { WeightsFactor } from 'app/shared/models/weights-factor';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { WeightsFactorEditComponent } from '../weights-factor-edit/weights-factor-edit.component';
import { WeightsFactorNewComponent } from '../weights-factor-new/weights-factor-new.component';
import { WeightsFactorViewComponent } from '../weights-factor-view/weights-factor-view.component';
import { WeightsFactorService } from '../shared/weights-factor.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-weights-factor-list',
  templateUrl: './weights-factor-list.component.html',
  styleUrls: ['./weights-factor-list.component.scss'],
  providers: []
})

export class WeightsFactorListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private offeringTypesService: LookupService;
private itemCodesService: LookupService;
private elementsService: LookupService;

  
offeringTypeSelectOptions: MaterialSelectOptions;
itemCodeSelectOptions: MaterialSelectOptions;
elementCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('itemCode', { static: true }) ItemCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('elementCode', { static: true }) ElementCodeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedWeightsFactor: WeightsFactor;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود المبنى', field: 'buildingCode' }),
	new GridColumnOptions({ headerName: 'رقم المناقصة', field: 'tenderNumber' }),
	new GridColumnOptions({ headerName: 'اسم المناقصة', field: 'tenderName' }),
	new GridColumnOptions({ headerName: 'كود المقاول', field: 'contractorCode' }),
	new GridColumnOptions({ headerName: 'مسلسل الملحق', field: 'supplementSeries' }),
	new GridColumnOptions({ headerName: 'تاريخ فتح الفني/ اسناد', field: 'dateOfOpeningTechnicalAttribution' }),
	new GridColumnOptions({ headerName: 'فئة سعر المقايسة', field: 'assayPriceCategory' }),
	new GridColumnOptions({ headerName: 'نسبة معامل الاوزان', field: 'ratioOfWeightsCoefficient' }),
	new GridColumnOptions({ headerName: 'نوع الطرح', field: 'offeringType' }),
	new GridColumnOptions({ headerName: 'كود البند', field: 'itemCode' }),
	new GridColumnOptions({ headerName: 'كود العنصر', field: 'elementCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: WeightsFactorViewComponent,
    editDialogClassType: WeightsFactorEditComponent,
    newDialogClassType: WeightsFactorNewComponent,
  });
    constructor(
        injector: Injector,
        public weightsFactorService: WeightsFactorService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedWeightsFactor = new WeightsFactor();

    
	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});

	this.itemCodeSelectOptions = new MaterialSelectOptions({
	 data: this.itemCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود البند',
	});

	this.elementCodeSelectOptions = new MaterialSelectOptions({
	 data: this.elementsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود العنصر',
	});


    this.searchForm = this.formBuilder.group({
     	buildingCode : [],
	tenderNumber : [],
	contractorCode : [],
	offeringType : [],
	itemCode : [],
	elementCode : []
    });

     
  }

  getWeightsFactorsPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<WeightsFactor[]> => {
    return this.weightsFactorService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.weightsFactorService.delete(param.data.id)
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
this.itemCodesService = new LookupService('itemcodes', this.http);
this.elementsService = new LookupService('elements', this.http);
  }
}

