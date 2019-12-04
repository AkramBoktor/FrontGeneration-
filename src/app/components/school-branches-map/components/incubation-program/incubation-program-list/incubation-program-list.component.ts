
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { IncubationProgram } from 'app/shared/models/incubation-program';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { IncubationProgramEditComponent } from '../incubation-program-edit/incubation-program-edit.component';
import { IncubationProgramNewComponent } from '../incubation-program-new/incubation-program-new.component';
import { IncubationProgramViewComponent } from '../incubation-program-view/incubation-program-view.component';
import { IncubationProgramService } from '../shared/incubation-program.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-incubation-program-list',
  templateUrl: './incubation-program-list.component.html',
  styleUrls: ['./incubation-program-list.component.scss'],
  providers: []
})

export class IncubationProgramListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private sectionsOrCentersService: LookupService;
private villagesService: LookupService;
private followersService: LookupService;
private landOwnershipsService: LookupService;
private buildingOwnershipsService: LookupService;
private usePositionsService: LookupService;

  
departmentSelectOptions: MaterialSelectOptions;
villageSelectOptions: MaterialSelectOptions;
followedSelectOptions: MaterialSelectOptions;
landOwnershipSelectOptions: MaterialSelectOptions;
buildingOwnershipSelectOptions: MaterialSelectOptions;
usePositionSelectOptions: MaterialSelectOptions;

  
	@ViewChild('department', { static: true }) DepartmentSelectComponent: MaterialSelectComponent;
	@ViewChild('village', { static: true }) VillageSelectComponent: MaterialSelectComponent;
	@ViewChild('followed', { static: true }) FollowedSelectComponent: MaterialSelectComponent;
	@ViewChild('landOwnership', { static: true }) LandOwnershipSelectComponent: MaterialSelectComponent;
	@ViewChild('buildingOwnership', { static: true }) BuildingOwnershipSelectComponent: MaterialSelectComponent;
	@ViewChild('usePosition', { static: true }) UsePositionSelectComponent: MaterialSelectComponent;

  
  @Input() selectedIncubationProgram: IncubationProgram;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم المبني ', field: 'buildingNumber' }),
	new GridColumnOptions({ headerName: 'اسم المبني', field: 'buildingName' }),
	new GridColumnOptions({ headerName: 'اسم الشارع', field: 'streetName' }),
	new GridColumnOptions({ headerName: 'رقم التليفون', field: 'phoneNumber' }),
	new GridColumnOptions({ headerName: 'سن القبول', field: 'admissionAge' }),
	new GridColumnOptions({ headerName: 'احداثيات ', field: 'coordinates' }),
	new GridColumnOptions({ headerName: 'مركز/قسم', field: 'department' }),
	new GridColumnOptions({ headerName: 'حي/قرية', field: 'village' }),
	new GridColumnOptions({ headerName: 'تابع/شياخة', field: 'followed' }),
	new GridColumnOptions({ headerName: 'ملكية الارض', field: 'landOwnership' }),
	new GridColumnOptions({ headerName: 'ملكية المبني', field: 'buildingOwnership' }),
	new GridColumnOptions({ headerName: 'موقف الاستخدام', field: 'usePosition' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: IncubationProgramViewComponent,
    editDialogClassType: IncubationProgramEditComponent,
    newDialogClassType: IncubationProgramNewComponent,
  });
    constructor(
        injector: Injector,
        public incubationProgramService: IncubationProgramService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedIncubationProgram = new IncubationProgram();

    
	this.departmentSelectOptions = new MaterialSelectOptions({
	 data: this.sectionsOrCentersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'مركز/قسم',
	});

	this.villageSelectOptions = new MaterialSelectOptions({
	 data: this.villagesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حي/قرية',
	});

	this.followedSelectOptions = new MaterialSelectOptions({
	 data: this.followersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'تابع/شياخة',
	});

	this.landOwnershipSelectOptions = new MaterialSelectOptions({
	 data: this.landOwnershipsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'ملكية الارض',
	});

	this.buildingOwnershipSelectOptions = new MaterialSelectOptions({
	 data: this.buildingOwnershipsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'ملكية المبني',
	});

	this.usePositionSelectOptions = new MaterialSelectOptions({
	 data: this.usePositionsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'موقف الاستخدام',
	});


    this.searchForm = this.formBuilder.group({
     	buildingNumber : [],
	phoneNumber : [],
	department : [],
	village : [],
	followed : [],
	landOwnership : [],
	buildingOwnership : [],
	usePosition : []
    });

     
  }

  getIncubationProgramPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<IncubationProgram[]> => {
    return this.incubationProgramService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.incubationProgramService.delete(param.data.id)
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
    this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
this.villagesService = new LookupService('villages', this.http);
this.followersService = new LookupService('followers', this.http);
this.landOwnershipsService = new LookupService('landownerships', this.http);
this.buildingOwnershipsService = new LookupService('buildingownerships', this.http);
this.usePositionsService = new LookupService('usepositions', this.http);
  }
}

