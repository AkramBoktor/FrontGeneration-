
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { AssigningMaintenanceElectricityProjectToElectricalEngineer } from 'app/shared/models/assigning-maintenance-electricity-project-to-electrical-engineer';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { AssigningMaintenanceElectricityProjectToElectricalEngineerEditComponent } from '../assigning-maintenance-electricity-project-to-electrical-engineer-edit/assigning-maintenance-electricity-project-to-electrical-engineer-edit.component';
import { AssigningMaintenanceElectricityProjectToElectricalEngineerNewComponent } from '../assigning-maintenance-electricity-project-to-electrical-engineer-new/assigning-maintenance-electricity-project-to-electrical-engineer-new.component';
import { AssigningMaintenanceElectricityProjectToElectricalEngineerViewComponent } from '../assigning-maintenance-electricity-project-to-electrical-engineer-view/assigning-maintenance-electricity-project-to-electrical-engineer-view.component';
import { AssigningMaintenanceElectricityProjectToElectricalEngineerService } from '../shared/assigning-maintenance-electricity-project-to-electrical-engineer.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-assigning-maintenance-electricity-project-to-electrical-engineer-list',
  templateUrl: './assigning-maintenance-electricity-project-to-electrical-engineer-list.component.html',
  styleUrls: ['./assigning-maintenance-electricity-project-to-electrical-engineer-list.component.scss'],
  providers: []
})

export class AssigningMaintenanceElectricityProjectToElectricalEngineerListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private branchCodesService: LookupService;
private constructionTypesService: LookupService;
private offeringTypesService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;
constructionTypeSelectOptions: MaterialSelectOptions;
offeringTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedAssigningMaintenanceElectricityProjectToElectricalEngineer: AssigningMaintenanceElectricityProjectToElectricalEngineer;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم المهندس التنفيذى', field: 'executiveEngineerNumber' }),
	new GridColumnOptions({ headerName: 'رقم المدرسه', field: 'schoolNumber' }),
	new GridColumnOptions({ headerName: 'رقم الملحق', field: 'attachEngineerNumber' }),
	new GridColumnOptions({ headerName: 'سنه الخطه', field: 'yearPlan' }),
	new GridColumnOptions({ headerName: 'رقم المناقصه', field: 'bidNumber' }),
	new GridColumnOptions({ headerName: 'تاريخ بدايه الاشراف', field: 'supervisionBeginningDate' }),
	new GridColumnOptions({ headerName: 'النوع', field: 'type' }),
	new GridColumnOptions({ headerName: 'كود الفرع', field: 'branchCode' }),
	new GridColumnOptions({ headerName: 'نوع الانشاء', field: 'constructionType' }),
	new GridColumnOptions({ headerName: 'نوع الطرح', field: 'offeringType' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: AssigningMaintenanceElectricityProjectToElectricalEngineerViewComponent,
    editDialogClassType: AssigningMaintenanceElectricityProjectToElectricalEngineerEditComponent,
    newDialogClassType: AssigningMaintenanceElectricityProjectToElectricalEngineerNewComponent,
  });
    constructor(
        injector: Injector,
        public assigningMaintenanceElectricityProjectToElectricalEngineerService: AssigningMaintenanceElectricityProjectToElectricalEngineerService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedAssigningMaintenanceElectricityProjectToElectricalEngineer = new AssigningMaintenanceElectricityProjectToElectricalEngineer();

    
	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الفرع',
	});

	this.constructionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.constructionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الانشاء',
	});

	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});


    this.searchForm = this.formBuilder.group({
     	executiveEngineerNumber : [],
	schoolNumber : [],
	attachEngineerNumber : [],
	yearPlan : [],
	bidNumber : [],
	supervisionBeginningDate : [],
	type : [],
	branchCode : [],
	constructionType : [],
	offeringType : []
    });

     
  }

  getAssigningMaintenanceElectricityProjectToElectricalEngineerPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<AssigningMaintenanceElectricityProjectToElectricalEngineer[]> => {
    return this.assigningMaintenanceElectricityProjectToElectricalEngineerService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.assigningMaintenanceElectricityProjectToElectricalEngineerService.delete(param.data.id)
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
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.offeringTypesService = new LookupService('offeringtypes', this.http);
  }
}

