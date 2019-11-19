
import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { GridColumnOptions, GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { FormControlError, GridPaginatedSortedFiltered } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MinistryOfSolidarityAndCommunications } from 'app/shared/models/ministry-of-solidarity-and-communications';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { MinistryOfSolidarityAndCommunicationsEditComponent } from '../ministry-of-solidarity-and-communications-edit/ministry-of-solidarity-and-communications-edit.component';
import { MinistryOfSolidarityAndCommunicationsNewComponent } from '../ministry-of-solidarity-and-communications-new/ministry-of-solidarity-and-communications-new.component';
import { MinistryOfSolidarityAndCommunicationsViewComponent } from '../ministry-of-solidarity-and-communications-view/ministry-of-solidarity-and-communications-view.component';
import { MinistryOfSolidarityAndCommunicationsService } from '../shared/ministry-of-solidarity-and-communications.service';

@Component({
  selector: 'app-ministry-of-solidarity-and-communications-list',
  templateUrl: './ministry-of-solidarity-and-communications-list.component.html',
  styleUrls: ['./ministry-of-solidarity-and-communications-list.component.scss'],
  providers: []
})

export class MinistryOfSolidarityAndCommunicationsListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private ministriesService: LookupService;
private modulesService: LookupService;
private governoratesService: LookupService;
private sectionsOrCentersService: LookupService;
private villagesService: LookupService;
private followersService: LookupService;
private headquartersTypesService: LookupService;
private officeTypesService: LookupService;

  
ministrySelectOptions: MaterialSelectOptions;
unitSelectOptions: MaterialSelectOptions;
governorateSelectOptions: MaterialSelectOptions;
centerSelectOptions: MaterialSelectOptions;
villageSelectOptions: MaterialSelectOptions;
followerSelectOptions: MaterialSelectOptions;
headquarterTypeSelectOptions: MaterialSelectOptions;
officeTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('ministry', { static: true }) MinistrySelectComponent: MaterialSelectComponent;
	@ViewChild('unit', { static: true }) UnitSelectComponent: MaterialSelectComponent;
	@ViewChild('governorate', { static: true }) GovernorateSelectComponent: MaterialSelectComponent;
	@ViewChild('center', { static: true }) CenterSelectComponent: MaterialSelectComponent;
	@ViewChild('village', { static: true }) VillageSelectComponent: MaterialSelectComponent;
	@ViewChild('follower', { static: true }) FollowerSelectComponent: MaterialSelectComponent;
	@ViewChild('headquarterType', { static: true }) HeadquarterTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('officeType', { static: true }) OfficeTypeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedMinistryOfSolidarityAndCommunications: MinistryOfSolidarityAndCommunications;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'الاسم', field: 'name' }),
	new GridColumnOptions({ headerName: 'العنوان', field: 'address' }),
	new GridColumnOptions({ headerName: 'المدير', field: 'manager' }),
	new GridColumnOptions({ headerName: 'المساحة', field: 'area' }),
	new GridColumnOptions({ headerName: 'تليفون', field: 'telephone' }),
	new GridColumnOptions({ headerName: 'الوزارة', field: 'ministry' }),
	new GridColumnOptions({ headerName: 'الوحدة', field: 'unit' }),
	new GridColumnOptions({ headerName: 'المحافظة', field: 'governorate' }),
	new GridColumnOptions({ headerName: 'المركز', field: 'center' }),
	new GridColumnOptions({ headerName: 'القرية', field: 'village' }),
	new GridColumnOptions({ headerName: 'التابع', field: 'follower' }),
	new GridColumnOptions({ headerName: 'نوع المقر', field: 'headquarterType' }),
	new GridColumnOptions({ headerName: 'نوع المكتب', field: 'officeType' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: MinistryOfSolidarityAndCommunicationsViewComponent,
    editDialogClassType: MinistryOfSolidarityAndCommunicationsEditComponent,
    newDialogClassType: MinistryOfSolidarityAndCommunicationsNewComponent,
  });
    constructor(
        injector: Injector,
        public ministryOfSolidarityAndCommunicationsService: MinistryOfSolidarityAndCommunicationsService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedMinistryOfSolidarityAndCommunications = new MinistryOfSolidarityAndCommunications();

    
	this.ministrySelectOptions = new MaterialSelectOptions({
	 data: this.ministriesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الوزارة',
	});

	this.unitSelectOptions = new MaterialSelectOptions({
	 data: this.modulesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الوحدة',
	});

	this.governorateSelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المحافظة',
	});

	this.centerSelectOptions = new MaterialSelectOptions({
	 data: this.sectionsOrCentersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المركز',
	});

	this.villageSelectOptions = new MaterialSelectOptions({
	 data: this.villagesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'القرية',
	});

	this.followerSelectOptions = new MaterialSelectOptions({
	 data: this.followersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'التابع',
	});

	this.headquarterTypeSelectOptions = new MaterialSelectOptions({
	 data: this.headquartersTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع المقر',
	});

	this.officeTypeSelectOptions = new MaterialSelectOptions({
	 data: this.officeTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع المكتب',
	});


    this.searchForm = this.formBuilder.group({
     	name : [],
	address : [],
	manager : [],
	area : [],
	telephone : [],
	ministry : [],
	unit : [],
	governorate : [],
	center : [],
	village : [],
	follower : [],
	headquarterType : [],
	officeType : []
    });

     
  }

  getMinistryOfSolidarityAndCommunicationsPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<MinistryOfSolidarityAndCommunications[]> => {
    return this.ministryOfSolidarityAndCommunicationsService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.ministryOfSolidarityAndCommunicationsService.delete(param.data.id)
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
    this.ministriesService = new LookupService('ministries', this.http);
this.modulesService = new LookupService('modules', this.http);
this.governoratesService = new LookupService('governorates', this.http);
this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
this.villagesService = new LookupService('villages', this.http);
this.followersService = new LookupService('followers', this.http);
this.headquartersTypesService = new LookupService('headquarterstypes', this.http);
this.officeTypesService = new LookupService('officetypes', this.http);
  }
}

