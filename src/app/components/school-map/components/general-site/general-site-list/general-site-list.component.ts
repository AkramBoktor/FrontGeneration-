
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { GeneralSite } from 'app/shared/models/general-site';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { GeneralSiteEditComponent } from '../general-site-edit/general-site-edit.component';
import { GeneralSiteNewComponent } from '../general-site-new/general-site-new.component';
import { GeneralSiteViewComponent } from '../general-site-view/general-site-view.component';
import { GeneralSiteService } from '../shared/general-site.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-general-site-list',
  templateUrl: './general-site-list.component.html',
  styleUrls: ['./general-site-list.component.scss'],
  providers: []
})

export class GeneralSiteListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private regionalCenterCodesService: LookupService;
private branchCodesService: LookupService;
private mainRoadTypeCodesService: LookupService;
private directionStatusCodesService: LookupService;

  
regionalCenterCodeSelectOptions: MaterialSelectOptions;
branchCodeSelectOptions: MaterialSelectOptions;
mainRoadTypeCodeSelectOptions: MaterialSelectOptions;
directionCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('regionalCenterCode', { static: true }) RegionalCenterCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('mainRoadTypeCode', { static: true }) MainRoadTypeCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('directionCode', { static: true }) DirectionCodeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedGeneralSite: GeneralSite;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود المبنى', field: 'buildingCode' }),
	new GridColumnOptions({ headerName: 'عرض الطريق', field: 'roadWidth' }),
	new GridColumnOptions({ headerName: 'النوعية', field: 'quality' }),
	new GridColumnOptions({ headerName: 'كود المركز الاقليمي', field: 'regionalCenterCode' }),
	new GridColumnOptions({ headerName: 'كود الفرع', field: 'branchCode' }),
	new GridColumnOptions({ headerName: 'كود نوع الطريق الرئيسي', field: 'mainRoadTypeCode' }),
	new GridColumnOptions({ headerName: 'كود حالة الطريق الرئيسي', field: 'directionCode' }),
	new GridColumnOptions({ headerName: 'كود اتجاه الحركه', field: 'movementDirectionCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: GeneralSiteViewComponent,
    editDialogClassType: GeneralSiteEditComponent,
    newDialogClassType: GeneralSiteNewComponent,
  });
    constructor(
        injector: Injector,
        public generalSiteService: GeneralSiteService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedGeneralSite = new GeneralSite();

    
	this.regionalCenterCodeSelectOptions = new MaterialSelectOptions({
	 data: this.regionalCenterCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المركز الاقليمي',
	});

	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الفرع',
	});

	this.mainRoadTypeCodeSelectOptions = new MaterialSelectOptions({
	 data: this.mainRoadTypeCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود نوع الطريق الرئيسي',
	});

	this.directionCodeSelectOptions = new MaterialSelectOptions({
	 data: this.directionStatusCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود حالة الطريق الرئيسي',
	});


    this.searchForm = this.formBuilder.group({
     	buildingCode : [],
	quality : [],
	regionalCenterCode : [],
	branchCode : [],
	mainRoadTypeCode : [],
	directionCode : []
    });

     
  }

  getGeneralSitesPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<GeneralSite[]> => {
    return this.generalSiteService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.generalSiteService.delete(param.data.id)
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
    this.regionalCenterCodesService = new LookupService('regionalcentercodes', this.http);
this.branchCodesService = new LookupService('branchcodes', this.http);
this.mainRoadTypeCodesService = new LookupService('mainroadtypecodes', this.http);
this.directionStatusCodesService = new LookupService('directionstatuscodes', this.http);
  }
}

