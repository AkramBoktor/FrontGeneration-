
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { SubscriberDataInFundB } from 'app/shared/models/subscriber-data-in-fund-b';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { SubscriberDataInFundBEditComponent } from '../subscriber-data-in-fund-b-edit/subscriber-data-in-fund-b-edit.component';
import { SubscriberDataInFundBNewComponent } from '../subscriber-data-in-fund-b-new/subscriber-data-in-fund-b-new.component';
import { SubscriberDataInFundBViewComponent } from '../subscriber-data-in-fund-b-view/subscriber-data-in-fund-b-view.component';
import { SubscriberDataInFundBService } from '../shared/subscriber-data-in-fund-b.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-subscriber-data-in-fund-b-list',
  templateUrl: './subscriber-data-in-fund-b-list.component.html',
  styleUrls: ['./subscriber-data-in-fund-b-list.component.scss'],
  providers: []
})

export class SubscriberDataInFundBListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private employeeStatusesService: LookupService;
private departmentsSectionsService: LookupService;
private relationshipTypesService: LookupService;

  
employeeStatusSelectOptions: MaterialSelectOptions;
administrationCodeSelectOptions: MaterialSelectOptions;
beneficiaryCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('employeeStatus', { static: true }) EmployeeStatusSelectComponent: MaterialSelectComponent;
	@ViewChild('administrationCode', { static: true }) AdministrationCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('beneficiaryCode', { static: true }) BeneficiaryCodeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedSubscriberDataInFundB: SubscriberDataInFundB;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'نسبه الاستفاده', field: 'benefitRate' }),
	new GridColumnOptions({ headerName: 'بيانات المستفيد', field: 'beneficiaryData' }),
	new GridColumnOptions({ headerName: 'بيان مستفيد', field: 'beneficiaryStatement' }),
	new GridColumnOptions({ headerName: 'رقم عضويه', field: 'membershipNumber' }),
	new GridColumnOptions({ headerName: 'قيمه الاشتراك', field: 'subscriptionAmount' }),
	new GridColumnOptions({ headerName: 'تاريخ الاشترك', field: 'subscriptionDate' }),
	new GridColumnOptions({ headerName: 'تاريخ التعيين ', field: 'hiringDate' }),
	new GridColumnOptions({ headerName: 'تاريخ المعاش', field: 'pensionDate' }),
	new GridColumnOptions({ headerName: 'تاريخ الميلاد', field: 'birthDate' }),
	new GridColumnOptions({ headerName: 'كود الموظف', field: 'employeeCode' }),
	new GridColumnOptions({ headerName: 'كود مستفيد', field: 'beneficiaryCode' }),
	new GridColumnOptions({ headerName: 'كود الاداره', field: 'administrationCode' }),
	new GridColumnOptions({ headerName: 'حاله الموظف', field: 'employeeStatus' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: SubscriberDataInFundBViewComponent,
    editDialogClassType: SubscriberDataInFundBEditComponent,
    newDialogClassType: SubscriberDataInFundBNewComponent,
  });
    constructor(
        injector: Injector,
        public subscriberDataInFundBService: SubscriberDataInFundBService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedSubscriberDataInFundB = new SubscriberDataInFundB();

    
	this.employeeStatusSelectOptions = new MaterialSelectOptions({
	 data: this.employeeStatusesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حاله الموظف',
	});

	this.administrationCodeSelectOptions = new MaterialSelectOptions({
	 data: this.departmentsSectionsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الاداره',
	});

	this.beneficiaryCodeSelectOptions = new MaterialSelectOptions({
	 data: this.relationshipTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود مستفيد',
	});


    this.searchForm = this.formBuilder.group({
     	employeeCode : [],
	membershipNumber : [],
	employeeStatus : [],
	administrationCode : [],
	beneficiaryCode : []
    });

     
  }

  getSubscribersDataInFundPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<SubscriberDataInFundB[]> => {
    return this.subscriberDataInFundBService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.subscriberDataInFundBService.delete(param.data.id)
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
    this.employeeStatusesService = new LookupService('employeestatuses', this.http);
this.departmentsSectionsService = new LookupService('departmentssections', this.http);
this.relationshipTypesService = new LookupService('relationshiptypes', this.http);
  }
}

