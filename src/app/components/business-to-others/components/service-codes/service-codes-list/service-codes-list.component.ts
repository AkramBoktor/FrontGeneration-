
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { ServiceCodes } from 'app/shared/models/service-codes';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ServiceCodesEditComponent } from '../service-codes-edit/service-codes-edit.component';
import { ServiceCodesNewComponent } from '../service-codes-new/service-codes-new.component';
import { ServiceCodesViewComponent } from '../service-codes-view/service-codes-view.component';
import { ServiceCodesService } from '../shared/service-codes.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-service-codes-list',
  templateUrl: './service-codes-list.component.html',
  styleUrls: ['./service-codes-list.component.scss'],
  providers: []
})

export class ServiceCodesListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedServiceCodes: ServiceCodes;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود الخدمة', field: 'serviceCode' }),
	new GridColumnOptions({ headerName: 'توصيف الخدمة', field: 'serviceConfiguration' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: ServiceCodesViewComponent,
    editDialogClassType: ServiceCodesEditComponent,
    newDialogClassType: ServiceCodesNewComponent,
  });
    constructor(
        injector: Injector,
        public serviceCodesService: ServiceCodesService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedServiceCodes = new ServiceCodes();

    

    this.searchForm = this.formBuilder.group({
     	serviceCode : [],
	serviceConfiguration : []
    });

     
  }

  getServiceCodesPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<ServiceCodes[]> => {
    return this.serviceCodesService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.serviceCodesService.delete(param.data.id)
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

