
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { MaintenanceOfEducationalBuildingsListOfReadyToilet } from 'app/shared/models/maintenance-of-educational-buildings-list-of-ready-toilet';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { MaintenanceOfEducationalBuildingsListOfReadyToiletEditComponent } from '../maintenance-of-educational-buildings-list-of-ready-toilet-edit/maintenance-of-educational-buildings-list-of-ready-toilet-edit.component';
import { MaintenanceOfEducationalBuildingsListOfReadyToiletNewComponent } from '../maintenance-of-educational-buildings-list-of-ready-toilet-new/maintenance-of-educational-buildings-list-of-ready-toilet-new.component';
import { MaintenanceOfEducationalBuildingsListOfReadyToiletViewComponent } from '../maintenance-of-educational-buildings-list-of-ready-toilet-view/maintenance-of-educational-buildings-list-of-ready-toilet-view.component';
import { MaintenanceOfEducationalBuildingsListOfReadyToiletService } from '../shared/maintenance-of-educational-buildings-list-of-ready-toilet.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-maintenance-of-educational-buildings-list-of-ready-toilet-list',
  templateUrl: './maintenance-of-educational-buildings-list-of-ready-toilet-list.component.html',
  styleUrls: ['./maintenance-of-educational-buildings-list-of-ready-toilet-list.component.scss'],
  providers: []
})

export class MaintenanceOfEducationalBuildingsListOfReadyToiletListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private governoratesService: LookupService;

  
fromGovernmentSelectOptions: MaterialSelectOptions;

  
	@ViewChild('fromGovernment', { static: true }) FromGovernmentSelectComponent: MaterialSelectComponent;

  
  @Input() selectedMaintenanceOfEducationalBuildingsListOfReadyToilet: MaintenanceOfEducationalBuildingsListOfReadyToilet;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'تاريخ الطلب', field: 'orderDate' }),
	new GridColumnOptions({ headerName: 'كود  دوره المياه', field: 'toiletCode' }),
	new GridColumnOptions({ headerName: 'المدرسه المطلوب النقل منها ', field: 'fromSchool' }),
	new GridColumnOptions({ headerName: 'المدرسه المطلوب النقل  اليها  ', field: 'toSchool' }),
	new GridColumnOptions({ headerName: 'المحافظه ', field: 'fromGovernment' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: MaintenanceOfEducationalBuildingsListOfReadyToiletViewComponent,
    editDialogClassType: MaintenanceOfEducationalBuildingsListOfReadyToiletEditComponent,
    newDialogClassType: MaintenanceOfEducationalBuildingsListOfReadyToiletNewComponent,
  });
    constructor(
        injector: Injector,
        public maintenanceOfEducationalBuildingsListOfReadyToiletService: MaintenanceOfEducationalBuildingsListOfReadyToiletService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedMaintenanceOfEducationalBuildingsListOfReadyToilet = new MaintenanceOfEducationalBuildingsListOfReadyToilet();

    
	this.fromGovernmentSelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'من محافظة',
	});


    this.searchForm = this.formBuilder.group({
     	orderDate : [],
	toiletCode : [],
	fromSchool : [],
	toSchool : [],
	fromGovernment : []
    });

     
  }

  getMaintenanceOfEducationalBuildingsListOfReadyToiletsPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<MaintenanceOfEducationalBuildingsListOfReadyToilet[]> => {
    return this.maintenanceOfEducationalBuildingsListOfReadyToiletService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.maintenanceOfEducationalBuildingsListOfReadyToiletService.delete(param.data.id)
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
  }
}

