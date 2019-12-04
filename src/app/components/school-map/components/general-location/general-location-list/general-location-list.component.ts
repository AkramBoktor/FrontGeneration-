
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { GeneralLocation } from 'app/shared/models/general-location';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { GeneralLocationEditComponent } from '../general-location-edit/general-location-edit.component';
import { GeneralLocationNewComponent } from '../general-location-new/general-location-new.component';
import { GeneralLocationViewComponent } from '../general-location-view/general-location-view.component';
import { GeneralLocationService } from '../shared/general-location.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-general-location-list',
  templateUrl: './general-location-list.component.html',
  styleUrls: ['./general-location-list.component.scss'],
  providers: []
})

export class GeneralLocationListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private regionalCenterCodesService: LookupService;
private branchCodesService: LookupService;
private mainRoadTypeCodesService: LookupService;

  
sectionCodeSelectOptions: MaterialSelectOptions;
branchCodeSelectOptions: MaterialSelectOptions;
mainRoadTypeCodeSelectOptions: MaterialSelectOptions;
mainRoadStatusCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('sectionCode', { static: true }) SectionCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('mainRoadTypeCode', { static: true }) MainRoadTypeCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('mainRoadStatusCode', { static: true }) MainRoadStatusCodeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedGeneralLocation: GeneralLocation;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود المبنى', field: 'buildingCode' }),
	new GridColumnOptions({ headerName: 'أسم المبنى', field: 'buildingName' }),
	new GridColumnOptions({ headerName: 'عرض الطريق', field: 'roadWidth' }),
	new GridColumnOptions({ headerName: 'النوعية', field: 'type' }),
	new GridColumnOptions({ headerName: 'كود المركز الاقليمي', field: 'sectionCode' }),
	new GridColumnOptions({ headerName: 'كود الفرع', field: 'branchCode' }),
	new GridColumnOptions({ headerName: 'كود نوع الطريق الرئيسي', field: 'mainRoadTypeCode' }),
	new GridColumnOptions({ headerName: 'كود حالة الطريق الرئيسي', field: 'mainRoadStatusCode' }),
	new GridColumnOptions({ headerName: 'كود اتجاه الحركه', field: 'roadDirectionCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: GeneralLocationViewComponent,
    editDialogClassType: GeneralLocationEditComponent,
    newDialogClassType: GeneralLocationNewComponent,
  });
    constructor(
        injector: Injector,
        public generalLocationService: GeneralLocationService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedGeneralLocation = new GeneralLocation();

    
	this.sectionCodeSelectOptions = new MaterialSelectOptions({
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

	this.mainRoadStatusCodeSelectOptions = new MaterialSelectOptions({
	 data: this.mainRoadTypeCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود حالة الطريق الرئيسي',
	});


    this.searchForm = this.formBuilder.group({
     	buildingCode : [],
	type : [],
	sectionCode : [],
	branchCode : [],
	mainRoadTypeCode : [],
	mainRoadStatusCode : []
    });

     
  }

  getGeneralLocationPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<GeneralLocation[]> => {
    return this.generalLocationService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.generalLocationService.delete(param.data.id)
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
  }
}

