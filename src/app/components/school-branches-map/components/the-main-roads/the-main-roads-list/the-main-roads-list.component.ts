
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { TheMainRoads } from 'app/shared/models/the-main-roads';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { TheMainRoadsEditComponent } from '../the-main-roads-edit/the-main-roads-edit.component';
import { TheMainRoadsNewComponent } from '../the-main-roads-new/the-main-roads-new.component';
import { TheMainRoadsViewComponent } from '../the-main-roads-view/the-main-roads-view.component';
import { TheMainRoadsService } from '../shared/the-main-roads.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-the-main-roads-list',
  templateUrl: './the-main-roads-list.component.html',
  styleUrls: ['./the-main-roads-list.component.scss'],
  providers: []
})

export class TheMainRoadsListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private regionalCenterCodesService: LookupService;
private branchCodesService: LookupService;
private directionStatusCodesService: LookupService;
private directionCodesService: LookupService;

  
centerCodeSelectOptions: MaterialSelectOptions;
branchCodeSelectOptions: MaterialSelectOptions;
mainRoadStatusCodeSelectOptions: MaterialSelectOptions;
movementDirectionCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('centerCode', { static: true }) CenterCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('mainRoadStatusCode', { static: true }) MainRoadStatusCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('movementDirectionCode', { static: true }) MovementDirectionCodeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedTheMainRoads: TheMainRoads;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود المبنى', field: 'buildingCode' }),
	new GridColumnOptions({ headerName: 'رقم الطريق الرئيسي', field: 'mainRoadNumber' }),
	new GridColumnOptions({ headerName: 'عرض الطريق', field: 'roadWidth' }),
	new GridColumnOptions({ headerName: 'الاستعمال', field: 'usage' }),
	new GridColumnOptions({ headerName: 'اسم الطريق', field: 'theNameOfTheRoad' }),
	new GridColumnOptions({ headerName: 'كود المركز', field: 'centerCode' }),
	new GridColumnOptions({ headerName: 'كود الفرع', field: 'branchCode' }),
	new GridColumnOptions({ headerName: 'كود حالة الطريق الرئيسي', field: 'mainRoadStatusCode' }),
	new GridColumnOptions({ headerName: 'كود اتجاه الحركة', field: 'movementDirectionCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: TheMainRoadsViewComponent,
    editDialogClassType: TheMainRoadsEditComponent,
    newDialogClassType: TheMainRoadsNewComponent,
  });
    constructor(
        injector: Injector,
        public theMainRoadsService: TheMainRoadsService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedTheMainRoads = new TheMainRoads();

    
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

	this.mainRoadStatusCodeSelectOptions = new MaterialSelectOptions({
	 data: this.directionStatusCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود حالة الطريق الرئيسي',
	});

	this.movementDirectionCodeSelectOptions = new MaterialSelectOptions({
	 data: this.directionCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود اتجاه الحركة',
	});


    this.searchForm = this.formBuilder.group({
     	buildingCode : [],
	mainRoadNumber : [],
	roadWidth : [],
	usage : [],
	theNameOfTheRoad : [],
	centerCode : [],
	branchCode : [],
	mainRoadStatusCode : [],
	movementDirectionCode : []
    });

     
  }

  getTheMainRoadsPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<TheMainRoads[]> => {
    return this.theMainRoadsService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.theMainRoadsService.delete(param.data.id)
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
this.directionStatusCodesService = new LookupService('directionstatuscodes', this.http);
this.directionCodesService = new LookupService('directioncodes', this.http);
  }
}

