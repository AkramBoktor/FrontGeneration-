
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { GeneralLocationOfAnAdministrativeBuilding } from 'app/shared/models/general-location-of-an-administrative-building';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { GeneralLocationOfAnAdministrativeBuildingEditComponent } from '../general-location-of-an-administrative-building-edit/general-location-of-an-administrative-building-edit.component';
import { GeneralLocationOfAnAdministrativeBuildingNewComponent } from '../general-location-of-an-administrative-building-new/general-location-of-an-administrative-building-new.component';
import { GeneralLocationOfAnAdministrativeBuildingViewComponent } from '../general-location-of-an-administrative-building-view/general-location-of-an-administrative-building-view.component';
import { GeneralLocationOfAnAdministrativeBuildingService } from '../shared/general-location-of-an-administrative-building.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-general-location-of-an-administrative-building-list',
  templateUrl: './general-location-of-an-administrative-building-list.component.html',
  styleUrls: ['./general-location-of-an-administrative-building-list.component.scss'],
  providers: []
})

export class GeneralLocationOfAnAdministrativeBuildingListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private regionalCenterCodesService: LookupService;
private branchCodesService: LookupService;
private directionCodesService: LookupService;
private neighborStatesService: LookupService;

  
centerCodeSelectOptions: MaterialSelectOptions;
branchCodeSelectOptions: MaterialSelectOptions;
limitDirectionSelectOptions: MaterialSelectOptions;
adjacentNeighborStatusSelectOptions: MaterialSelectOptions;

  
	@ViewChild('centerCode', { static: true }) CenterCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('limitDirection', { static: true }) LimitDirectionSelectComponent: MaterialSelectComponent;
	@ViewChild('adjacentNeighborStatus', { static: true }) AdjacentNeighborStatusSelectComponent: MaterialSelectComponent;

  
  @Input() selectedGeneralLocationOfAnAdministrativeBuilding: GeneralLocationOfAnAdministrativeBuilding;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود المبنى', field: 'buildingCode' }),
	new GridColumnOptions({ headerName: 'طول الحد', field: 'lengthLimit' }),
	new GridColumnOptions({ headerName: 'زاوية ميل الحد', field: 'theAngleOfInclinationOfTheLimit' }),
	new GridColumnOptions({ headerName: 'وصف الحد', field: 'descriptionOfTheLimit' }),
	new GridColumnOptions({ headerName: 'منسوب الطريق الرئيسي', field: 'mainRoadLevel' }),
	new GridColumnOptions({ headerName: 'منسوب ارضية الدور الارضي', field: 'groundFloorLevel' }),
	new GridColumnOptions({ headerName: 'منسوب الفناء داخل الموقع', field: 'theLevelOfTheCourtyardWithinTheSite' }),
	new GridColumnOptions({ headerName: 'منسوب عن سطح البحر', field: 'seaLevel' }),
	new GridColumnOptions({ headerName: 'كود المركز', field: 'centerCode' }),
	new GridColumnOptions({ headerName: 'كود الفرع', field: 'branchCode' }),
	new GridColumnOptions({ headerName: 'اتجاه الحد', field: 'limitDirection' }),
	new GridColumnOptions({ headerName: 'حالة الجار الملاصق', field: 'adjacentNeighborStatus' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: GeneralLocationOfAnAdministrativeBuildingViewComponent,
    editDialogClassType: GeneralLocationOfAnAdministrativeBuildingEditComponent,
    newDialogClassType: GeneralLocationOfAnAdministrativeBuildingNewComponent,
  });
    constructor(
        injector: Injector,
        public generalLocationOfAnAdministrativeBuildingService: GeneralLocationOfAnAdministrativeBuildingService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedGeneralLocationOfAnAdministrativeBuilding = new GeneralLocationOfAnAdministrativeBuilding();

    
	this.centerCodeSelectOptions = new MaterialSelectOptions({
	 data: this.regionalCenterCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المركز',
	});

	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الفرع',
	});

	this.limitDirectionSelectOptions = new MaterialSelectOptions({
	 data: this.directionCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'اتجاه الحد',
	});

	this.adjacentNeighborStatusSelectOptions = new MaterialSelectOptions({
	 data: this.neighborStatesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حالة الجار الملاصق',
	});


    this.searchForm = this.formBuilder.group({
     	buildingCode : [],
	lengthLimit : [],
	theAngleOfInclinationOfTheLimit : [],
	descriptionOfTheLimit : [],
	mainRoadLevel : [],
	groundFloorLevel : [],
	theLevelOfTheCourtyardWithinTheSite : [],
	seaLevel : [],
	centerCode : [],
	branchCode : [],
	limitDirection : [],
	adjacentNeighborStatus : []
    });

     
  }

  getGeneralLocationOfAnAdministrativeBuildingPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<GeneralLocationOfAnAdministrativeBuilding[]> => {
    return this.generalLocationOfAnAdministrativeBuildingService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.generalLocationOfAnAdministrativeBuildingService.delete(param.data.id)
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
this.directionCodesService = new LookupService('directioncodes', this.http);
this.neighborStatesService = new LookupService('neighborstates', this.http);
  }
}

