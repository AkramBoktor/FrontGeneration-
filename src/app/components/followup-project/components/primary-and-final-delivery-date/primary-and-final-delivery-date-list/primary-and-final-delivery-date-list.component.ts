
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { PrimaryAndFinalDeliveryDate } from 'app/shared/models/primary-and-final-delivery-date';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { PrimaryAndFinalDeliveryDateEditComponent } from '../primary-and-final-delivery-date-edit/primary-and-final-delivery-date-edit.component';
import { PrimaryAndFinalDeliveryDateNewComponent } from '../primary-and-final-delivery-date-new/primary-and-final-delivery-date-new.component';
import { PrimaryAndFinalDeliveryDateViewComponent } from '../primary-and-final-delivery-date-view/primary-and-final-delivery-date-view.component';
import { PrimaryAndFinalDeliveryDateService } from '../shared/primary-and-final-delivery-date.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-primary-and-final-delivery-date-list',
  templateUrl: './primary-and-final-delivery-date-list.component.html',
  styleUrls: ['./primary-and-final-delivery-date-list.component.scss'],
  providers: []
})

export class PrimaryAndFinalDeliveryDateListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private constructionTypesService: LookupService;
private deliveryTypesService: LookupService;

  
constructionTypeSelectOptions: MaterialSelectOptions;
deliveryTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('deliveryType', { static: true }) DeliveryTypeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedPrimaryAndFinalDeliveryDate: PrimaryAndFinalDeliveryDate;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود المشروع', field: 'projectCode' }),
	new GridColumnOptions({ headerName: 'تاريخ تسليم ابتدائي', field: 'primaryDeliveryDate' }),
	new GridColumnOptions({ headerName: 'تاريخ تسليم نهائي', field: 'finalDeliveryDate' }),
	new GridColumnOptions({ headerName: 'نوع الإنشاء', field: 'constructionType' }),
	new GridColumnOptions({ headerName: 'نوع التسليم', field: 'deliveryType' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: PrimaryAndFinalDeliveryDateViewComponent,
    editDialogClassType: PrimaryAndFinalDeliveryDateEditComponent,
    newDialogClassType: PrimaryAndFinalDeliveryDateNewComponent,
  });
    constructor(
        injector: Injector,
        public primaryAndFinalDeliveryDateService: PrimaryAndFinalDeliveryDateService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedPrimaryAndFinalDeliveryDate = new PrimaryAndFinalDeliveryDate();

    
	this.constructionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.constructionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الإنشاء',
	});

	this.deliveryTypeSelectOptions = new MaterialSelectOptions({
	 data: this.deliveryTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع التسليم',
	});


    this.searchForm = this.formBuilder.group({
     	projectCode : [],
	primaryDeliveryDate : [],
	finalDeliveryDate : [],
	constructionType : [],
	deliveryType : []
    });

     
  }

  getPrimaryAndFinalDeliveryDatesPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<PrimaryAndFinalDeliveryDate[]> => {
    return this.primaryAndFinalDeliveryDateService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.primaryAndFinalDeliveryDateService.delete(param.data.id)
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
this.deliveryTypesService = new LookupService('deliverytypes', this.http);
  }
}

