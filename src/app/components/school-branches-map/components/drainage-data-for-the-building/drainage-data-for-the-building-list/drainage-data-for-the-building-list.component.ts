
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { DrainageDataForTheBuilding } from 'app/shared/models/drainage-data-for-the-building';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { DrainageDataForTheBuildingEditComponent } from '../drainage-data-for-the-building-edit/drainage-data-for-the-building-edit.component';
import { DrainageDataForTheBuildingNewComponent } from '../drainage-data-for-the-building-new/drainage-data-for-the-building-new.component';
import { DrainageDataForTheBuildingViewComponent } from '../drainage-data-for-the-building-view/drainage-data-for-the-building-view.component';
import { DrainageDataForTheBuildingService } from '../shared/drainage-data-for-the-building.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-drainage-data-for-the-building-list',
  templateUrl: './drainage-data-for-the-building-list.component.html',
  styleUrls: ['./drainage-data-for-the-building-list.component.scss'],
  providers: []
})

export class DrainageDataForTheBuildingListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private yesOrNosService: LookupService;


  
gaysonSelectOptions: MaterialSelectOptions;
plantationSelectOptions: MaterialSelectOptions;
sanitationDitchSelectOptions: MaterialSelectOptions;
candidateSelectOptions: MaterialSelectOptions;
tankAssemblySelectOptions: MaterialSelectOptions;
tankanalysisSelectOptions: MaterialSelectOptions;
sanitationLocalSelectOptions: MaterialSelectOptions;
sanitationGeneralSelectOptions: MaterialSelectOptions;
sanitationExistsSelectOptions: MaterialSelectOptions;

  
	@ViewChild('gayson', { static: true }) GaysonSelectComponent: MaterialSelectComponent;
	@ViewChild('plantation', { static: true }) PlantationSelectComponent: MaterialSelectComponent;
	@ViewChild('sanitationDitch', { static: true }) SanitationDitchSelectComponent: MaterialSelectComponent;
	@ViewChild('candidate', { static: true }) CandidateSelectComponent: MaterialSelectComponent;
	@ViewChild('tankAssembly', { static: true }) TankAssemblySelectComponent: MaterialSelectComponent;
	@ViewChild('tankanalysis', { static: true }) TankanalysisSelectComponent: MaterialSelectComponent;
	@ViewChild('sanitationLocal', { static: true }) SanitationLocalSelectComponent: MaterialSelectComponent;
	@ViewChild('sanitationGeneral', { static: true }) SanitationGeneralSelectComponent: MaterialSelectComponent;
	@ViewChild('sanitationExists', { static: true }) SanitationExistsSelectComponent: MaterialSelectComponent;

  
lengthIsVisible: boolean;
deepIsVisible: boolean;
widthIsVisible: boolean;

gaysonIsVisible: boolean;
plantationIsVisible: boolean;
sanitationDitchIsVisible: boolean;
candidateIsVisible: boolean;
tankAssemblyIsVisible: boolean;
tankanalysisIsVisible: boolean;
  @Input() selectedDrainageDataForTheBuilding: DrainageDataForTheBuilding;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود المبنى', field: 'buildingCode' }),
	new GridColumnOptions({ headerName: 'طول', field: 'length' }),
	new GridColumnOptions({ headerName: 'عمق', field: 'deep' }),
	new GridColumnOptions({ headerName: 'عرض', field: 'width' }),
	new GridColumnOptions({ headerName: 'طول', field: 'length' }),
	new GridColumnOptions({ headerName: 'عمق', field: 'deep' }),
	new GridColumnOptions({ headerName: 'عرض', field: 'width' }),
	new GridColumnOptions({ headerName: 'طول', field: 'length' }),
	new GridColumnOptions({ headerName: 'عمق', field: 'deep' }),
	new GridColumnOptions({ headerName: 'عرض', field: 'width' }),
	new GridColumnOptions({ headerName: 'طول', field: 'length' }),
	new GridColumnOptions({ headerName: 'عمق', field: 'deep' }),
	new GridColumnOptions({ headerName: 'عرض', field: 'width' }),
	new GridColumnOptions({ headerName: 'طول', field: 'length' }),
	new GridColumnOptions({ headerName: 'عمق', field: 'deep' }),
	new GridColumnOptions({ headerName: 'عرض', field: 'width' }),
	new GridColumnOptions({ headerName: 'طول', field: 'length' }),
	new GridColumnOptions({ headerName: 'عمق الشبكه', field: 'networkDepth' }),
	new GridColumnOptions({ headerName: 'قطر الشبكه', field: 'networkDiameter' }),
	new GridColumnOptions({ headerName: 'عرض', field: 'width' }),
	new GridColumnOptions({ headerName: 'عمق', field: 'deep' }),
	new GridColumnOptions({ headerName: 'قيسون', field: 'gayson' }),
	new GridColumnOptions({ headerName: 'بياره', field: 'plantation' }),
	new GridColumnOptions({ headerName: 'خندق صرف', field: 'sanitationDitch' }),
	new GridColumnOptions({ headerName: 'مرشح', field: 'candidate' }),
	new GridColumnOptions({ headerName: 'خزان تجميع', field: 'tankAssembly' }),
	new GridColumnOptions({ headerName: 'خزان تحليل', field: 'tankanalysis' }),
	new GridColumnOptions({ headerName: 'صرف محلى', field: 'sanitationLocal' }),
	new GridColumnOptions({ headerName: 'صرف عمومى ', field: 'sanitationGeneral' }),
	new GridColumnOptions({ headerName: 'يوجد صرف', field: 'sanitationExists' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: DrainageDataForTheBuildingViewComponent,
    editDialogClassType: DrainageDataForTheBuildingEditComponent,
    newDialogClassType: DrainageDataForTheBuildingNewComponent,
  });
    constructor(
        injector: Injector,
        public drainageDataForTheBuildingService: DrainageDataForTheBuildingService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedDrainageDataForTheBuilding = new DrainageDataForTheBuilding();

    
	this.gaysonSelectOptions = new MaterialSelectOptions({
	 data: this.yesOrNosService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'قيسون',
	});

	this.plantationSelectOptions = new MaterialSelectOptions({
	 data: this.yesOrNosService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'بياره',
	});

	this.sanitationDitchSelectOptions = new MaterialSelectOptions({
	 data: this.yesOrNosService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'خندق صرف',
	});

	this.candidateSelectOptions = new MaterialSelectOptions({
	 data: this.yesOrNosService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'مرشح',
	});

	this.tankAssemblySelectOptions = new MaterialSelectOptions({
	 data: this.yesOrNosService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'خزان تجميع',
	});

	this.tankanalysisSelectOptions = new MaterialSelectOptions({
	 data: this.yesOrNosService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'خزان تحليل',
	});

	this.sanitationLocalSelectOptions = new MaterialSelectOptions({
	 data: this.yesOrNosService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'صرف محلى',
	});

	this.sanitationGeneralSelectOptions = new MaterialSelectOptions({
	 data: this.yesOrNosService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'صرف عمومى ',
	});

	this.sanitationExistsSelectOptions = new MaterialSelectOptions({
	 data: this.yesOrNosService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'يوجد صرف',
	});


    this.searchForm = this.formBuilder.group({
     	buildingCode : [],
	length : [],
	deep : [],
	width : [],

	networkDepth : [],
	networkDiameter : [],

	gayson : [],
	plantation : [],
	sanitationDitch : [],
	candidate : [],
	tankAssembly : [],
	tankanalysis : [],
	sanitationLocal : [],
	sanitationGeneral : [],
	sanitationExists : []
    });

     
  }

  getDrainageDataForTheBuildingPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<DrainageDataForTheBuilding[]> => {
    return this.drainageDataForTheBuildingService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.drainageDataForTheBuildingService.delete(param.data.id)
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
    this.yesOrNosService = new LookupService('yesornos', this.http);
this.yesOrNosService = new LookupService('yesornos', this.http);
this.yesOrNosService = new LookupService('yesornos', this.http);
this.yesOrNosService = new LookupService('yesornos', this.http);
this.yesOrNosService = new LookupService('yesornos', this.http);
this.yesOrNosService = new LookupService('yesornos', this.http);
this.yesOrNosService = new LookupService('yesornos', this.http);
this.yesOrNosService = new LookupService('yesornos', this.http);
this.yesOrNosService = new LookupService('yesornos', this.http);
  }
}

