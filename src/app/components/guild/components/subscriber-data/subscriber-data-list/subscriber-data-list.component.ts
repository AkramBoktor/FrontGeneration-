
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { SubscriberData } from 'app/shared/models/subscriber-data';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { SubscriberDataEditComponent } from '../subscriber-data-edit/subscriber-data-edit.component';
import { SubscriberDataNewComponent } from '../subscriber-data-new/subscriber-data-new.component';
import { SubscriberDataViewComponent } from '../subscriber-data-view/subscriber-data-view.component';
import { SubscriberDataService } from '../shared/subscriber-data.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-subscriber-data-list',
  templateUrl: './subscriber-data-list.component.html',
  styleUrls: ['./subscriber-data-list.component.scss'],
  providers: []
})

export class SubscriberDataListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private subDepartmentsService: LookupService;

  
admistrationCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('admistrationCode', { static: true }) AdmistrationCodeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedSubscriberData: SubscriberData;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: ' كود الموظف', field: 'employeeCode' }),
	new GridColumnOptions({ headerName: ' تاريخ الميلاد', field: 'birthDate' }),
	new GridColumnOptions({ headerName: ' تاريخ التعيين', field: 'hiringDate' }),
	new GridColumnOptions({ headerName: '   تاريخ الاشتراك', field: 'subscriptionDate' }),
	new GridColumnOptions({ headerName: ' رقم العضوية', field: 'membershipNo' }),
	new GridColumnOptions({ headerName: ' كود الادارة', field: 'admistrationCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: SubscriberDataViewComponent,
    editDialogClassType: SubscriberDataEditComponent,
    newDialogClassType: SubscriberDataNewComponent,
  });
    constructor(
        injector: Injector,
        public subscriberDataService: SubscriberDataService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedSubscriberData = new SubscriberData();

    
	this.admistrationCodeSelectOptions = new MaterialSelectOptions({
	 data: this.subDepartmentsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' كود الادارة',
	});


    this.searchForm = this.formBuilder.group({
     	employeeCode : [],
	membershipNo : [],
	admistrationCode : []
    });

     
  }

  getSubscriberDataPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<SubscriberData[]> => {
    return this.subscriberDataService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.subscriberDataService.delete(param.data.id)
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
    this.subDepartmentsService = new LookupService('subdepartments', this.http);
  }
}

