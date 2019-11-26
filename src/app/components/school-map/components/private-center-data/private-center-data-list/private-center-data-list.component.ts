
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { PrivateCenterData } from 'app/shared/models/private-center-data';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { PrivateCenterDataEditComponent } from '../private-center-data-edit/private-center-data-edit.component';
import { PrivateCenterDataNewComponent } from '../private-center-data-new/private-center-data-new.component';
import { PrivateCenterDataViewComponent } from '../private-center-data-view/private-center-data-view.component';
import { PrivateCenterDataService } from '../shared/private-center-data.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-private-center-data-list',
  templateUrl: './private-center-data-list.component.html',
  styleUrls: ['./private-center-data-list.component.scss'],
  providers: []
})

export class PrivateCenterDataListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private governoratesService: LookupService;
private sectionsOrCentersService: LookupService;
private villagesService: LookupService;
private areasService: LookupService;

  
governmentSelectOptions: MaterialSelectOptions;
sectionCenterSelectOptions: MaterialSelectOptions;
villageSelectOptions: MaterialSelectOptions;
educationalAdminstrationSelectOptions: MaterialSelectOptions;

  
	@ViewChild('government', { static: true }) GovernmentSelectComponent: MaterialSelectComponent;
	@ViewChild('sectionCenter', { static: true }) SectionCenterSelectComponent: MaterialSelectComponent;
	@ViewChild('village', { static: true }) VillageSelectComponent: MaterialSelectComponent;
	@ViewChild('educationalAdminstration', { static: true }) EducationalAdminstrationSelectComponent: MaterialSelectComponent;

  
  @Input() selectedPrivateCenterData: PrivateCenterData;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'الرقم التعريفي للمركز', field: 'centralCode' }),
	new GridColumnOptions({ headerName: 'الاسم', field: 'name' }),
	new GridColumnOptions({ headerName: 'رقم التليفون', field: 'phoneNumber' }),
	new GridColumnOptions({ headerName: 'الحي/القرية', field: 'village' }),
	new GridColumnOptions({ headerName: 'العنوان', field: 'address' }),
	new GridColumnOptions({ headerName: 'اسم صاحب المركز', field: 'centerOwnerName' }),
	new GridColumnOptions({ headerName: 'رقم بطاقة/ جواز السفر', field: 'iDNumber' }),
	new GridColumnOptions({ headerName: 'جهة الإصدار', field: 'issuer' }),
	new GridColumnOptions({ headerName: 'اسم المدير المسؤل', field: 'responsibleManagerName' }),
	new GridColumnOptions({ headerName: 'المحافظة', field: 'government' }),
	new GridColumnOptions({ headerName: 'المركز/القسم', field: 'sectionCenter' }),
	new GridColumnOptions({ headerName: 'الإدارة التعليمية', field: 'educationalAdminstration' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: PrivateCenterDataViewComponent,
    editDialogClassType: PrivateCenterDataEditComponent,
    newDialogClassType: PrivateCenterDataNewComponent,
  });
    constructor(
        injector: Injector,
        public privateCenterDataService: PrivateCenterDataService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedPrivateCenterData = new PrivateCenterData();

    
	this.governmentSelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المحافظة',
	});

	this.sectionCenterSelectOptions = new MaterialSelectOptions({
	 data: this.sectionsOrCentersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المركز/القسم',
	});

	this.villageSelectOptions = new MaterialSelectOptions({
	 data: this.villagesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الحي/القرية',
	});

	this.educationalAdminstrationSelectOptions = new MaterialSelectOptions({
	 data: this.areasService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الإدارة التعليمية',
	});


    this.searchForm = this.formBuilder.group({
     	centralCode : [],
	name : [],
	phoneNumber : [],
	address : [],
	centerOwnerName : [],
	iDNumber : [],
	issuer : [],
	responsibleManagerName : [],
	government : [],
	sectionCenter : [],
	village : [],
	educationalAdminstration : []
    });

     
  }

  getPrivateCentersDataPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<PrivateCenterData[]> => {
    return this.privateCenterDataService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.privateCenterDataService.delete(param.data.id)
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
this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
this.villagesService = new LookupService('villages', this.http);
this.areasService = new LookupService('areas', this.http);
  }
}

