
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { ExternalServicesCodesAndCost } from 'app/shared/models/external-services-codes-and-cost';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ExternalServicesCodesAndCostEditComponent } from '../external-services-codes-and-cost-edit/external-services-codes-and-cost-edit.component';
import { ExternalServicesCodesAndCostNewComponent } from '../external-services-codes-and-cost-new/external-services-codes-and-cost-new.component';
import { ExternalServicesCodesAndCostViewComponent } from '../external-services-codes-and-cost-view/external-services-codes-and-cost-view.component';
import { ExternalServicesCodesAndCostService } from '../shared/external-services-codes-and-cost.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-external-services-codes-and-cost-list',
  templateUrl: './external-services-codes-and-cost-list.component.html',
  styleUrls: ['./external-services-codes-and-cost-list.component.scss'],
  providers: []
})

export class ExternalServicesCodesAndCostListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedExternalServicesCodesAndCost: ExternalServicesCodesAndCost;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: ' كود الخدمة', field: 'serviceCode' }),
	new GridColumnOptions({ headerName: ' اسم الخدمة', field: 'serviceName' }),
	new GridColumnOptions({ headerName: '   نسبة تكلفة التصنيف الاول', field: 'firstClassificationCostRatio' }),
	new GridColumnOptions({ headerName: ' نسبة تكلفة التصنيف  الثاني', field: 'secondClassificationCostRatio' }),
	new GridColumnOptions({ headerName: ' نسبة تكلفة التصنيف  الثالث', field: 'thirdClassificationCostRatio' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: ExternalServicesCodesAndCostViewComponent,
    editDialogClassType: ExternalServicesCodesAndCostEditComponent,
    newDialogClassType: ExternalServicesCodesAndCostNewComponent,
  });
    constructor(
        injector: Injector,
        public externalServicesCodesAndCostService: ExternalServicesCodesAndCostService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedExternalServicesCodesAndCost = new ExternalServicesCodesAndCost();

    

    this.searchForm = this.formBuilder.group({
     	serviceCode : [],
	serviceName : [],
	firstClassificationCostRatio : [],
	secondClassificationCostRatio : [],
	thirdClassificationCostRatio : []
    });

     
  }

  getExternalServicesCodesAndCostPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<ExternalServicesCodesAndCost[]> => {
    return this.externalServicesCodesAndCostService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.externalServicesCodesAndCostService.delete(param.data.id)
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
    
  }
}

