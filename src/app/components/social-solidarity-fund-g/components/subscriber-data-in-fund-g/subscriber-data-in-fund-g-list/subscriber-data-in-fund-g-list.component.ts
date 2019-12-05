
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { SubscriberDataInFundG } from 'app/shared/models/subscriber-data-in-fund-g';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { SubscriberDataInFundGEditComponent } from '../subscriber-data-in-fund-g-edit/subscriber-data-in-fund-g-edit.component';
import { SubscriberDataInFundGNewComponent } from '../subscriber-data-in-fund-g-new/subscriber-data-in-fund-g-new.component';
import { SubscriberDataInFundGViewComponent } from '../subscriber-data-in-fund-g-view/subscriber-data-in-fund-g-view.component';
import { SubscriberDataInFundGService } from '../shared/subscriber-data-in-fund-g.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-subscriber-data-in-fund-g-list',
  templateUrl: './subscriber-data-in-fund-g-list.component.html',
  styleUrls: ['./subscriber-data-in-fund-g-list.component.scss'],
  providers: []
})

export class SubscriberDataInFundGListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private relationshipTypesService: LookupService;
private employeeStatusesService: LookupService;
private departmentsSectionsService: LookupService;

  
beneficiaryCodeSelectOptions: MaterialSelectOptions;
employeeStatusSelectOptions: MaterialSelectOptions;
administrationCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('beneficiaryCode', { static: true }) BeneficiaryCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('employeeStatus', { static: true }) EmployeeStatusSelectComponent: MaterialSelectComponent;
	@ViewChild('administrationCode', { static: true }) AdministrationCodeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedSubscriberDataInFundG: SubscriberDataInFundG;
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
    viewDialogClassType: SubscriberDataInFundGViewComponent,
    editDialogClassType: SubscriberDataInFundGEditComponent,
    newDialogClassType: SubscriberDataInFundGNewComponent,
  });
    constructor(
        injector: Injector,
        public subscriberDataInFundGService: SubscriberDataInFundGService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedSubscriberDataInFundG = new SubscriberDataInFundG();

    
	this.beneficiaryCodeSelectOptions = new MaterialSelectOptions({
	 data: this.relationshipTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود مستفيد',
	});

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


    this.searchForm = this.formBuilder.group({
     	membershipNumber : [],
	employeeCode : [],
	beneficiaryCode : [],
	employeeStatus : [],
	administrationCode : []
    });

     
  }

  getSubscribersDataInFundPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<SubscriberDataInFundG[]> => {
    return this.subscriberDataInFundGService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.subscriberDataInFundGService.delete(param.data.id)
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
    this.relationshipTypesService = new LookupService('relationshiptypes', this.http);
this.employeeStatusesService = new LookupService('employeestatuses', this.http);
this.departmentsSectionsService = new LookupService('departmentssections', this.http);
  }
}

