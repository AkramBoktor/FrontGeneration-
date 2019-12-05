
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { NewServicesRequests } from 'app/shared/models/new-services-requests';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { NewServicesRequestsEditComponent } from '../new-services-requests-edit/new-services-requests-edit.component';
import { NewServicesRequestsNewComponent } from '../new-services-requests-new/new-services-requests-new.component';
import { NewServicesRequestsViewComponent } from '../new-services-requests-view/new-services-requests-view.component';
import { NewServicesRequestsService } from '../shared/new-services-requests.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-new-services-requests-list',
  templateUrl: './new-services-requests-list.component.html',
  styleUrls: ['./new-services-requests-list.component.scss'],
  providers: []
})

export class NewServicesRequestsListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private entityNamesService: LookupService;
private governoratesService: LookupService;
private sectionsOrCentersService: LookupService;
private serviceTypesService: LookupService;

  
entityNameSelectOptions: MaterialSelectOptions;
governorateSelectOptions: MaterialSelectOptions;
centerOrSectionSelectOptions: MaterialSelectOptions;
serviceTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('entityName', { static: true }) EntityNameSelectComponent: MaterialSelectComponent;
	@ViewChild('governorate', { static: true }) GovernorateSelectComponent: MaterialSelectComponent;
	@ViewChild('centerOrSection', { static: true }) CenterOrSectionSelectComponent: MaterialSelectComponent;
	@ViewChild('serviceType', { static: true }) ServiceTypeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedNewServicesRequests: NewServicesRequests;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'تاريخ الطلب', field: 'applicationDate' }),
	new GridColumnOptions({ headerName: 'اسم المدرسة', field: 'schoolName' }),
	new GridColumnOptions({ headerName: 'مساحة الارض', field: 'landArea' }),
	new GridColumnOptions({ headerName: 'النسبة البنائية', field: 'structuralRatio' }),
	new GridColumnOptions({ headerName: 'عدد الادوار', field: 'floorsNumber' }),
	new GridColumnOptions({ headerName: 'رقم الايصال', field: 'receiptNumber' }),
	new GridColumnOptions({ headerName: 'تاريخ الايصال', field: 'receiptDate' }),
	new GridColumnOptions({ headerName: 'رقم المبنى', field: 'buildingCode' }),
	new GridColumnOptions({ headerName: 'رقم الطلب', field: 'orderNumber' }),
	new GridColumnOptions({ headerName: 'اسم الجهة', field: 'entityName' }),
	new GridColumnOptions({ headerName: 'المحافظة', field: 'governorate' }),
	new GridColumnOptions({ headerName: 'مركز – قسم', field: 'centerOrSection' }),
	new GridColumnOptions({ headerName: 'نوع  الخدمة', field: 'serviceType' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: NewServicesRequestsViewComponent,
    editDialogClassType: NewServicesRequestsEditComponent,
    newDialogClassType: NewServicesRequestsNewComponent,
  });
    constructor(
        injector: Injector,
        public newServicesRequestsService: NewServicesRequestsService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedNewServicesRequests = new NewServicesRequests();

    
	this.entityNameSelectOptions = new MaterialSelectOptions({
	 data: this.entityNamesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'اسم الجهة',
	});

	this.governorateSelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المحافظة',
	});

	this.centerOrSectionSelectOptions = new MaterialSelectOptions({
	 data: this.sectionsOrCentersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'مركز – قسم',
	});

	this.serviceTypeSelectOptions = new MaterialSelectOptions({
	 data: this.serviceTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع  الخدمة',
	});


    this.searchForm = this.formBuilder.group({
     	applicationDate : [],
	schoolName : [],
	landArea : [],
	structuralRatio : [],
	floorsNumber : [],
	receiptNumber : [],
	receiptDate : [],
	buildingCode : [],
	orderNumber : [],
	entityName : [],
	governorate : [],
	centerOrSection : [],
	serviceType : []
    });

     
  }

  getNewServicesRequestsPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<NewServicesRequests[]> => {
    return this.newServicesRequestsService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.newServicesRequestsService.delete(param.data.id)
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
    this.entityNamesService = new LookupService('entitynames', this.http);
this.governoratesService = new LookupService('governorates', this.http);
this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
this.serviceTypesService = new LookupService('servicetypes', this.http);
  }
}

