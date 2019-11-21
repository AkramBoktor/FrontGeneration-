
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { IntroducingHajjAndUmrahGrants } from 'app/shared/models/introducing-hajj-and-umrah-grants';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { IntroducingHajjAndUmrahGrantsEditComponent } from '../introducing-hajj-and-umrah-grants-edit/introducing-hajj-and-umrah-grants-edit.component';
import { IntroducingHajjAndUmrahGrantsNewComponent } from '../introducing-hajj-and-umrah-grants-new/introducing-hajj-and-umrah-grants-new.component';
import { IntroducingHajjAndUmrahGrantsViewComponent } from '../introducing-hajj-and-umrah-grants-view/introducing-hajj-and-umrah-grants-view.component';
import { IntroducingHajjAndUmrahGrantsService } from '../shared/introducing-hajj-and-umrah-grants.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-introducing-hajj-and-umrah-grants-list',
  templateUrl: './introducing-hajj-and-umrah-grants-list.component.html',
  styleUrls: ['./introducing-hajj-and-umrah-grants-list.component.scss'],
  providers: []
})

export class IntroducingHajjAndUmrahGrantsListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private statusCodesService: LookupService;
private paymentTypesService: LookupService;
private travelTypesService: LookupService;

  
statusSelectOptions: MaterialSelectOptions;
paymentTypeSelectOptions: MaterialSelectOptions;
travelTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('status', { static: true }) StatusSelectComponent: MaterialSelectComponent;
	@ViewChild('paymentType', { static: true }) PaymentTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('travelType', { static: true }) TravelTypeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedIntroducingHajjAndUmrahGrants: IntroducingHajjAndUmrahGrants;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود الموظف', field: 'employeeCode' }),
	new GridColumnOptions({ headerName: ' اسم الموظف', field: 'employeeName' }),
	new GridColumnOptions({ headerName: ' رقم العضوية', field: 'membershipNo' }),
	new GridColumnOptions({ headerName: ' تاريخ', field: 'date' }),
	new GridColumnOptions({ headerName: '   قيمة التذكره للعضو', field: 'memberTicketValue' }),
	new GridColumnOptions({ headerName: 'قيمة التذكرة للمرافق', field: 'utilitiesTicketValue' }),
	new GridColumnOptions({ headerName: ' قيمة الدعم', field: 'supportValue' }),
	new GridColumnOptions({ headerName: ' عدد الاقساط', field: 'installmentsNumber' }),
	new GridColumnOptions({ headerName: ' قيمة القسط', field: 'installmentsValue' }),
	new GridColumnOptions({ headerName: '  عدد المرافقين', field: 'companionsNumber' }),
	new GridColumnOptions({ headerName: ' اسم المرافق', field: 'utilitiesName' }),
	new GridColumnOptions({ headerName: ' الحالة', field: 'status' }),
	new GridColumnOptions({ headerName: ' نوع السداد', field: 'paymentType' }),
	new GridColumnOptions({ headerName: ' نوع السفر', field: 'travelType' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: IntroducingHajjAndUmrahGrantsViewComponent,
    editDialogClassType: IntroducingHajjAndUmrahGrantsEditComponent,
    newDialogClassType: IntroducingHajjAndUmrahGrantsNewComponent,
  });
    constructor(
        injector: Injector,
        public introducingHajjAndUmrahGrantsService: IntroducingHajjAndUmrahGrantsService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedIntroducingHajjAndUmrahGrants = new IntroducingHajjAndUmrahGrants();

    
	this.statusSelectOptions = new MaterialSelectOptions({
	 data: this.statusCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' الحالة',
	});

	this.paymentTypeSelectOptions = new MaterialSelectOptions({
	 data: this.paymentTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' نوع السداد',
	});

	this.travelTypeSelectOptions = new MaterialSelectOptions({
	 data: this.travelTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' نوع السفر',
	});


    this.searchForm = this.formBuilder.group({
     	employeeCode : [],
	employeeName : [],
	membershipNo : [],
	date : [],
	memberTicketValue : [],
	utilitiesTicketValue : [],
	supportValue : [],
	installmentsNumber : [],
	installmentsValue : [],
	companionsNumber : [],
	utilitiesName : [],
	status : [],
	paymentType : [],
	travelType : []
    });

     
  }

  getIntroducingHajjAndUmrahGrantsPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<IntroducingHajjAndUmrahGrants[]> => {
    return this.introducingHajjAndUmrahGrantsService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.introducingHajjAndUmrahGrantsService.delete(param.data.id)
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
    this.statusCodesService = new LookupService('statuscodes', this.http);
this.paymentTypesService = new LookupService('paymenttypes', this.http);
this.travelTypesService = new LookupService('traveltypes', this.http);
  }
}

