
import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AdditionalMission } from 'app/shared/models/additional-mission';
import { GridColumnOptions, GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { FormControlError, GridPaginatedSortedFiltered } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AdditionalMissionEditComponent } from '../additional-mission-edit/additional-mission-edit.component';
import { AdditionalMissionNewComponent } from '../additional-mission-new/additional-mission-new.component';
import { AdditionalMissionViewComponent } from '../additional-mission-view/additional-mission-view.component';
import { AdditionalMissionService } from '../shared/additional-mission.service';

@Component({
  selector: 'app-additional-mission-list',
  templateUrl: './additional-mission-list.component.html',
  styleUrls: ['./additional-mission-list.component.scss'],
  providers: []
})

export class AdditionalMissionListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private centralDepartmentsService: LookupService;
private subDepartmentsService: LookupService;

  
centralAdministrationSelectOptions: MaterialSelectOptions;
subAdministrationSelectOptions: MaterialSelectOptions;

  
	@ViewChild('centralAdministration', { static: true }) CentralAdministrationSelectComponent: MaterialSelectComponent;
	@ViewChild('subAdministration', { static: true }) SubAdministrationSelectComponent: MaterialSelectComponent;

  
  @Input() selectedAdditionalMission: AdditionalMission;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم الموظف', field: 'employeeCode' }),
	new GridColumnOptions({ headerName: 'اجمالي اضافي الماموريات (بالدقيقة)', field: 'totalExtraWork' }),
	new GridColumnOptions({ headerName: 'اجمالي فترات العمل المسائيه (بالدقيقة)', field: 'eveningTotalWorkingHour' }),
	new GridColumnOptions({ headerName: 'الاداره المركزيه', field: 'centralAdministration' }),
	new GridColumnOptions({ headerName: 'الاداره الفرعيه', field: 'subAdministration' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: AdditionalMissionViewComponent,
    editDialogClassType: AdditionalMissionEditComponent,
    newDialogClassType: AdditionalMissionNewComponent,
  });
    constructor(
        injector: Injector,
        public additionalMissionService: AdditionalMissionService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedAdditionalMission = new AdditionalMission();

    
	this.centralAdministrationSelectOptions = new MaterialSelectOptions({
	 data: this.centralDepartmentsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الاداره المركزيه',
	});

	this.subAdministrationSelectOptions = new MaterialSelectOptions({
	 data: this.subDepartmentsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الاداره الفرعيه',
	});


    this.searchForm = this.formBuilder.group({
     	employeeCode : [],
	totalExtraWork : [],
	eveningTotalWorkingHour : [],
	centralAdministration : [],
	subAdministration : []
    });

     
  }

  getAdditionalMissionsPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<AdditionalMission[]> => {
    return this.additionalMissionService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.additionalMissionService.delete(param.data.id)
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
    this.centralDepartmentsService = new LookupService('centraldepartments', this.http);
this.subDepartmentsService = new LookupService('subdepartments', this.http);
  }
}

