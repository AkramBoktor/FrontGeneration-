
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { NewServiceRequest } from 'app/shared/models/new-service-request';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { NewServiceRequestEditComponent } from '../new-service-request-edit/new-service-request-edit.component';
import { NewServiceRequestNewComponent } from '../new-service-request-new/new-service-request-new.component';
import { NewServiceRequestViewComponent } from '../new-service-request-view/new-service-request-view.component';
import { NewServiceRequestService } from '../shared/new-service-request.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-new-service-request-list',
  templateUrl: './new-service-request-list.component.html',
  styleUrls: ['./new-service-request-list.component.scss'],
  providers: []
})

export class NewServiceRequestListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private governoratesService: LookupService;

  
governorateSelectOptions: MaterialSelectOptions;

  
	@ViewChild('governorate', { static: true }) GovernorateSelectComponent: MaterialSelectComponent;

  
  @Input() selectedNewServiceRequest: NewServiceRequest;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'تاريخ الطلب', field: 'orderDate' }),
	new GridColumnOptions({ headerName: 'اسم الجهة', field: 'entityName' }),
	new GridColumnOptions({ headerName: 'مساحة الارض', field: 'landArea' }),
	new GridColumnOptions({ headerName: 'النسبة البنائية', field: 'structuralRatio' }),
	new GridColumnOptions({ headerName: 'عدد الادوار', field: 'floorsNumber' }),
	new GridColumnOptions({ headerName: 'اسم المدرسة', field: 'schoolName' }),
	new GridColumnOptions({ headerName: 'رقم الايصال', field: 'receiptNumber' }),
	new GridColumnOptions({ headerName: 'تاريخ الايصال', field: 'receiptDate' }),
	new GridColumnOptions({ headerName: 'المحافظة', field: 'governorate' }),
	new GridColumnOptions({ headerName: 'قسم', field: 'department' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: NewServiceRequestViewComponent,
    editDialogClassType: NewServiceRequestEditComponent,
    newDialogClassType: NewServiceRequestNewComponent,
  });
    constructor(
        injector: Injector,
        public newServiceRequestService: NewServiceRequestService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedNewServiceRequest = new NewServiceRequest();

    
	this.governorateSelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المحافظة',
	});


    this.searchForm = this.formBuilder.group({
     	orderDate : [],
	governorate : []
    });

     
  }

  getNewServiceRequestPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<NewServiceRequest[]> => {
    return this.newServiceRequestService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.newServiceRequestService.delete(param.data.id)
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
    this.governoratesService = new LookupService('governorates', this.http);
  }
}

