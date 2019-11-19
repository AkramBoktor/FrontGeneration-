
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { GroupDetailsData } from 'app/shared/models/group-details-data';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { GroupDetailsDataEditComponent } from '../group-details-data-edit/group-details-data-edit.component';
import { GroupDetailsDataNewComponent } from '../group-details-data-new/group-details-data-new.component';
import { GroupDetailsDataViewComponent } from '../group-details-data-view/group-details-data-view.component';
import { GroupDetailsDataService } from '../shared/group-details-data.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-group-details-data-list',
  templateUrl: './group-details-data-list.component.html',
  styleUrls: ['./group-details-data-list.component.scss'],
  providers: []
})

export class GroupDetailsDataListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
	{
	 errorName: 'min',
	 errorMessage: 'لا يوجد مسلسل يساوي صفر'
	}
      ];
  private buildingTypesService: LookupService;
private offeringTypesService: LookupService;
private areasService: LookupService;

  
buildingTypeSelectOptions: MaterialSelectOptions;
offeringTypeSelectOptions: MaterialSelectOptions;
educationalAdministrationSelectOptions: MaterialSelectOptions;

  
	@ViewChild('buildingType', { static: true }) BuildingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('educationalAdministration', { static: true }) EducationalAdministrationSelectComponent: MaterialSelectComponent;

  
  @Input() selectedGroupDetailsData: GroupDetailsData;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم المناقصة', field: 'bidNumber' }),
	new GridColumnOptions({ headerName: 'المشروع / المجموعة', field: 'group' }),
	new GridColumnOptions({ headerName: 'مدة التنفيذ بالشهور', field: 'durationImplementationInMonths' }),
	new GridColumnOptions({ headerName: 'نوع المبنى', field: 'buildingType' }),
	new GridColumnOptions({ headerName: 'نوع الطرح', field: 'offeringType' }),
	new GridColumnOptions({ headerName: 'الادارة التعليمية', field: 'educationalAdministration' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: GroupDetailsDataViewComponent,
    editDialogClassType: GroupDetailsDataEditComponent,
    newDialogClassType: GroupDetailsDataNewComponent,
  });
    constructor(
        injector: Injector,
        public groupDetailsDataService: GroupDetailsDataService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedGroupDetailsData = new GroupDetailsData();

    
	this.buildingTypeSelectOptions = new MaterialSelectOptions({
	 data: this.buildingTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع المبنى',
	});

	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});

	this.educationalAdministrationSelectOptions = new MaterialSelectOptions({
	 data: this.areasService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الادارة التعليمية',
	});


    this.searchForm = this.formBuilder.group({
     	bidNumber : [],
	group : [],
	durationImplementationInMonths : [],
	buildingType : [],
	offeringType : [],
	educationalAdministration : []
    });

     
  }

  getGroupsDetailsDataPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<GroupDetailsData[]> => {
    return this.groupDetailsDataService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.groupDetailsDataService.delete(param.data.id)
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
    this.buildingTypesService = new LookupService('buildingtypes', this.http);
this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.areasService = new LookupService('areas', this.http);
  }
}

