
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { BasicDataForTheYouthCenter } from 'app/shared/models/basic-data-for-the-youth-center';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { BasicDataForTheYouthCenterEditComponent } from '../basic-data-for-the-youth-center-edit/basic-data-for-the-youth-center-edit.component';
import { BasicDataForTheYouthCenterNewComponent } from '../basic-data-for-the-youth-center-new/basic-data-for-the-youth-center-new.component';
import { BasicDataForTheYouthCenterViewComponent } from '../basic-data-for-the-youth-center-view/basic-data-for-the-youth-center-view.component';
import { BasicDataForTheYouthCenterService } from '../shared/basic-data-for-the-youth-center.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-basic-data-for-the-youth-center-list',
  templateUrl: './basic-data-for-the-youth-center-list.component.html',
  styleUrls: ['./basic-data-for-the-youth-center-list.component.scss'],
  providers: []
})

export class BasicDataForTheYouthCenterListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private governoratesService: LookupService;
private regionalCenterCodesService: LookupService;
private sectionsOrCentersService: LookupService;
private villagesService: LookupService;

  
governorateSelectOptions: MaterialSelectOptions;
regionalCenterSelectOptions: MaterialSelectOptions;
sectionCenterSelectOptions: MaterialSelectOptions;
neighborhoodVillageSelectOptions: MaterialSelectOptions;

  
	@ViewChild('governorate', { static: true }) GovernorateSelectComponent: MaterialSelectComponent;
	@ViewChild('regionalCenter', { static: true }) RegionalCenterSelectComponent: MaterialSelectComponent;
	@ViewChild('sectionCenter', { static: true }) SectionCenterSelectComponent: MaterialSelectComponent;
	@ViewChild('neighborhoodVillage', { static: true }) NeighborhoodVillageSelectComponent: MaterialSelectComponent;

  
  @Input() selectedBasicDataForTheYouthCenter: BasicDataForTheYouthCenter;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'الاسم', field: 'centerName' }),
	new GridColumnOptions({ headerName: 'المحافظه', field: 'governorate' }),
	new GridColumnOptions({ headerName: 'المركز الاقليمى', field: 'regionalCenter' }),
	new GridColumnOptions({ headerName: 'القسم / المركز', field: 'sectionCenter' }),
	new GridColumnOptions({ headerName: 'الحى / القريه', field: 'neighborhoodVillage' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: BasicDataForTheYouthCenterViewComponent,
    editDialogClassType: BasicDataForTheYouthCenterEditComponent,
    newDialogClassType: BasicDataForTheYouthCenterNewComponent,
  });
    constructor(
        injector: Injector,
        public basicDataForTheYouthCenterService: BasicDataForTheYouthCenterService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedBasicDataForTheYouthCenter = new BasicDataForTheYouthCenter();

    
	this.governorateSelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المحافظه',
	});

	this.regionalCenterSelectOptions = new MaterialSelectOptions({
	 data: this.regionalCenterCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المركز الاقليمى',
	});

	this.sectionCenterSelectOptions = new MaterialSelectOptions({
	 data: this.sectionsOrCentersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'القسم / المركز',
	});

	this.neighborhoodVillageSelectOptions = new MaterialSelectOptions({
	 data: this.villagesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الحى / القريه',
	});


    this.searchForm = this.formBuilder.group({
     	centerName : [],
	governorate : [],
	regionalCenter : [],
	sectionCenter : [],
	neighborhoodVillage : []
    });

     
  }

  getBasicDataForTheYouthCenterPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<BasicDataForTheYouthCenter[]> => {
    return this.basicDataForTheYouthCenterService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.basicDataForTheYouthCenterService.delete(param.data.id)
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
this.regionalCenterCodesService = new LookupService('regionalcentercodes', this.http);
this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
this.villagesService = new LookupService('villages', this.http);
  }
}

