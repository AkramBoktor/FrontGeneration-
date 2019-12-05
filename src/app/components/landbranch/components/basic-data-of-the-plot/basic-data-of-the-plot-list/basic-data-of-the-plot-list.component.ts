
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { BasicDataOfThePlot } from 'app/shared/models/basic-data-of-the-plot';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { BasicDataOfThePlotEditComponent } from '../basic-data-of-the-plot-edit/basic-data-of-the-plot-edit.component';
import { BasicDataOfThePlotNewComponent } from '../basic-data-of-the-plot-new/basic-data-of-the-plot-new.component';
import { BasicDataOfThePlotViewComponent } from '../basic-data-of-the-plot-view/basic-data-of-the-plot-view.component';
import { BasicDataOfThePlotService } from '../shared/basic-data-of-the-plot.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-basic-data-of-the-plot-list',
  templateUrl: './basic-data-of-the-plot-list.component.html',
  styleUrls: ['./basic-data-of-the-plot-list.component.scss'],
  providers: []
})

export class BasicDataOfThePlotListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private sectionsOrCentersService: LookupService;
private villagesService: LookupService;
private followersService: LookupService;
private landOwnershipsService: LookupService;

  
centerDepartmentSelectOptions: MaterialSelectOptions;
villageNeighborhoodSelectOptions: MaterialSelectOptions;
followVillageSelectOptions: MaterialSelectOptions;
landOwnerSelectOptions: MaterialSelectOptions;

  
	@ViewChild('centerDepartment', { static: true }) CenterDepartmentSelectComponent: MaterialSelectComponent;
	@ViewChild('villageNeighborhood', { static: true }) VillageNeighborhoodSelectComponent: MaterialSelectComponent;
	@ViewChild('followVillage', { static: true }) FollowVillageSelectComponent: MaterialSelectComponent;
	@ViewChild('landOwner', { static: true }) LandOwnerSelectComponent: MaterialSelectComponent;

  
  @Input() selectedBasicDataOfThePlot: BasicDataOfThePlot;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم القطعة', field: 'pieceNumber' }),
	new GridColumnOptions({ headerName: 'مسمى قطعة الارض', field: 'landName' }),
	new GridColumnOptions({ headerName: 'المساحة الكلية بالمتر المربع', field: 'totalArea' }),
	new GridColumnOptions({ headerName: 'المركز/القسم', field: 'centerDepartment' }),
	new GridColumnOptions({ headerName: 'قرية/حي', field: 'villageNeighborhood' }),
	new GridColumnOptions({ headerName: 'تابع قرية شياخة', field: 'followVillage' }),
	new GridColumnOptions({ headerName: 'مالك الارض', field: 'landOwner' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: BasicDataOfThePlotViewComponent,
    editDialogClassType: BasicDataOfThePlotEditComponent,
    newDialogClassType: BasicDataOfThePlotNewComponent,
  });
    constructor(
        injector: Injector,
        public basicDataOfThePlotService: BasicDataOfThePlotService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedBasicDataOfThePlot = new BasicDataOfThePlot();

    
	this.centerDepartmentSelectOptions = new MaterialSelectOptions({
	 data: this.sectionsOrCentersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المركز/القسم',
	});

	this.villageNeighborhoodSelectOptions = new MaterialSelectOptions({
	 data: this.villagesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'قرية/حي',
	});

	this.followVillageSelectOptions = new MaterialSelectOptions({
	 data: this.followersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'تابع قرية شياخة',
	});

	this.landOwnerSelectOptions = new MaterialSelectOptions({
	 data: this.landOwnershipsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'مالك الارض',
	});


    this.searchForm = this.formBuilder.group({
     	pieceNumber : [],
	landName : [],
	totalArea : [],
	centerDepartment : [],
	villageNeighborhood : [],
	followVillage : [],
	landOwner : []
    });

     
  }

  getBasicDataOfThePlotPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<BasicDataOfThePlot[]> => {
    return this.basicDataOfThePlotService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.basicDataOfThePlotService.delete(param.data.id)
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
  }
}

