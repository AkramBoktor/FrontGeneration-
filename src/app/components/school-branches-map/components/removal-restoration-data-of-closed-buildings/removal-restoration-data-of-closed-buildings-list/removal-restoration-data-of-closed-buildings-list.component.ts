
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { RemovalRestorationDataOfClosedBuildings } from 'app/shared/models/removal-restoration-data-of-closed-buildings';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { RemovalRestorationDataOfClosedBuildingsEditComponent } from '../removal-restoration-data-of-closed-buildings-edit/removal-restoration-data-of-closed-buildings-edit.component';
import { RemovalRestorationDataOfClosedBuildingsNewComponent } from '../removal-restoration-data-of-closed-buildings-new/removal-restoration-data-of-closed-buildings-new.component';
import { RemovalRestorationDataOfClosedBuildingsViewComponent } from '../removal-restoration-data-of-closed-buildings-view/removal-restoration-data-of-closed-buildings-view.component';
import { RemovalRestorationDataOfClosedBuildingsService } from '../shared/removal-restoration-data-of-closed-buildings.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-removal-restoration-data-of-closed-buildings-list',
  templateUrl: './removal-restoration-data-of-closed-buildings-list.component.html',
  styleUrls: ['./removal-restoration-data-of-closed-buildings-list.component.scss'],
  providers: []
})

export class RemovalRestorationDataOfClosedBuildingsListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private usePositionsService: LookupService;
private yesOrNosService: LookupService;

  
usageStatusSelectOptions: MaterialSelectOptions;
extensionClosingStatusSelectOptions: MaterialSelectOptions;

  
	@ViewChild('usageStatus', { static: true }) UsageStatusSelectComponent: MaterialSelectComponent;
	@ViewChild('extensionClosingStatus', { static: true }) ExtensionClosingStatusSelectComponent: MaterialSelectComponent;

  
  @Input() selectedRemovalRestorationDataOfClosedBuildings: RemovalRestorationDataOfClosedBuildings;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود المدرسة', field: 'schoolCode' }),
	new GridColumnOptions({ headerName: 'رقم الملحق', field: 'extensionNumber' }),
	new GridColumnOptions({ headerName: 'تاريخ الاغلاق', field: 'closingDate' }),
	new GridColumnOptions({ headerName: 'رقم القرار', field: 'decisionNumber' }),
	new GridColumnOptions({ headerName: 'تاريخ القرار', field: 'decisionDate' }),
	new GridColumnOptions({ headerName: 'تاريخ الازالة', field: 'removalDate' }),
	new GridColumnOptions({ headerName: 'موقف الاستخدام', field: 'usageStatus' }),
	new GridColumnOptions({ headerName: 'موقف اغلاق الملحق', field: 'extensionClosingStatus' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: RemovalRestorationDataOfClosedBuildingsViewComponent,
    editDialogClassType: RemovalRestorationDataOfClosedBuildingsEditComponent,
    newDialogClassType: RemovalRestorationDataOfClosedBuildingsNewComponent,
  });
    constructor(
        injector: Injector,
        public removalRestorationDataOfClosedBuildingsService: RemovalRestorationDataOfClosedBuildingsService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedRemovalRestorationDataOfClosedBuildings = new RemovalRestorationDataOfClosedBuildings();

    
	this.usageStatusSelectOptions = new MaterialSelectOptions({
	 data: this.usePositionsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'موقف الاستخدام',
	});

	this.extensionClosingStatusSelectOptions = new MaterialSelectOptions({
	 data: this.yesOrNosService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'موقف اغلاق الملحق',
	});


    this.searchForm = this.formBuilder.group({
     	schoolCode : [],
	extensionNumber : [],
	closingDate : [],
	decisionNumber : [],
	decisionDate : [],
	removalDate : [],
	usageStatus : [],
	extensionClosingStatus : []
    });

     
  }

  getRemovalRestorationDataOfClosedBuildingsPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<RemovalRestorationDataOfClosedBuildings[]> => {
    return this.removalRestorationDataOfClosedBuildingsService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.removalRestorationDataOfClosedBuildingsService.delete(param.data.id)
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
    this.usePositionsService = new LookupService('usepositions', this.http);
this.yesOrNosService = new LookupService('yesornos', this.http);
  }
}

