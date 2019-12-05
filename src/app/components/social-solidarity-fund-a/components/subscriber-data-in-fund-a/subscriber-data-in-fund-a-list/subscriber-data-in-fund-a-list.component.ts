
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { SubscriberDataInFundA } from 'app/shared/models/subscriber-data-in-fund-a';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { SubscriberDataInFundAEditComponent } from '../subscriber-data-in-fund-a-edit/subscriber-data-in-fund-a-edit.component';
import { SubscriberDataInFundANewComponent } from '../subscriber-data-in-fund-a-new/subscriber-data-in-fund-a-new.component';
import { SubscriberDataInFundAViewComponent } from '../subscriber-data-in-fund-a-view/subscriber-data-in-fund-a-view.component';
import { SubscriberDataInFundAService } from '../shared/subscriber-data-in-fund-a.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-subscriber-data-in-fund-a-list',
  templateUrl: './subscriber-data-in-fund-a-list.component.html',
  styleUrls: ['./subscriber-data-in-fund-a-list.component.scss'],
  providers: []
})

export class SubscriberDataInFundAListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private departmentsSectionsService: LookupService;
private employeeStatusesService: LookupService;

  
administrationCodeSelectOptions: MaterialSelectOptions;
employeeStatusSelectOptions: MaterialSelectOptions;

  
	@ViewChild('administrationCode', { static: true }) AdministrationCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('employeeStatus', { static: true }) EmployeeStatusSelectComponent: MaterialSelectComponent;

  
  @Input() selectedSubscriberDataInFundA: SubscriberDataInFundA;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود الموظف', field: 'employeeCode' }),
	new GridColumnOptions({ headerName: 'تاريخ الميلاد', field: 'birthDate' }),
	new GridColumnOptions({ headerName: 'تاريخ المعاش', field: 'pensionDate' }),
	new GridColumnOptions({ headerName: 'تاريخ التعيين ', field: 'hiringDate' }),
	new GridColumnOptions({ headerName: 'تاريخ الاشترك', field: 'subscriptionDate' }),
	new GridColumnOptions({ headerName: 'قيمه الاشتراك', field: 'subscriptionAmount' }),
	new GridColumnOptions({ headerName: 'رقم عضويه', field: 'membershipNumber' }),
	new GridColumnOptions({ headerName: 'بيان مستفيد', field: 'beneficiaryStatement' }),
	new GridColumnOptions({ headerName: 'بيانات المستفيد', field: 'beneficiaryData' }),
	new GridColumnOptions({ headerName: 'نسبه الاستفاده', field: 'benefitRate' }),
	new GridColumnOptions({ headerName: 'حاله الموظف', field: 'employeeStatus' }),
	new GridColumnOptions({ headerName: 'كود الاداره', field: 'administrationCode' }),
	new GridColumnOptions({ headerName: 'كود مستفيد', field: 'beneficiaryCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: SubscriberDataInFundAViewComponent,
    editDialogClassType: SubscriberDataInFundAEditComponent,
    newDialogClassType: SubscriberDataInFundANewComponent,
  });
    constructor(
        injector: Injector,
        public subscriberDataInFundAService: SubscriberDataInFundAService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedSubscriberDataInFundA = new SubscriberDataInFundA();

    
	this.administrationCodeSelectOptions = new MaterialSelectOptions({
	 data: this.departmentsSectionsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الادارة',
	});

	this.employeeStatusSelectOptions = new MaterialSelectOptions({
	 data: this.employeeStatusesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حالة الموظف',
	});


    this.searchForm = this.formBuilder.group({
     	employeeCode : [],
	membershipNumber : [],
	administrationCode : [],
	employeeStatus : []
    });

     
  }

  getSubscribersDataInFundPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<SubscriberDataInFundA[]> => {
    return this.subscriberDataInFundAService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.subscriberDataInFundAService.delete(param.data.id)
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
    this.departmentsSectionsService = new LookupService('departmentssections', this.http);
this.employeeStatusesService = new LookupService('employeestatuses', this.http);
  }
}

