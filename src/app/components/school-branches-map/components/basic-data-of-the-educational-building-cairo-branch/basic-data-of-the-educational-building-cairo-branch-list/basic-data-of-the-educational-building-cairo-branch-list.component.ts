
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { BasicDataOfTheEducationalBuildingCairoBranch } from 'app/shared/models/basic-data-of-the-educational-building-cairo-branch';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { BasicDataOfTheEducationalBuildingCairoBranchEditComponent } from '../basic-data-of-the-educational-building-cairo-branch-edit/basic-data-of-the-educational-building-cairo-branch-edit.component';
import { BasicDataOfTheEducationalBuildingCairoBranchNewComponent } from '../basic-data-of-the-educational-building-cairo-branch-new/basic-data-of-the-educational-building-cairo-branch-new.component';
import { BasicDataOfTheEducationalBuildingCairoBranchViewComponent } from '../basic-data-of-the-educational-building-cairo-branch-view/basic-data-of-the-educational-building-cairo-branch-view.component';
import { BasicDataOfTheEducationalBuildingCairoBranchService } from '../shared/basic-data-of-the-educational-building-cairo-branch.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-basic-data-of-the-educational-building-cairo-branch-list',
  templateUrl: './basic-data-of-the-educational-building-cairo-branch-list.component.html',
  styleUrls: ['./basic-data-of-the-educational-building-cairo-branch-list.component.scss'],
  providers: []
})

export class BasicDataOfTheEducationalBuildingCairoBranchListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private fenceStatusCodesService: LookupService;

  
fenceCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('fenceCode', { static: true }) FenceCodeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedBasicDataOfTheEducationalBuildingCairoBranch: BasicDataOfTheEducationalBuildingCairoBranch;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود المبنى', field: 'buildingCode' }),
	new GridColumnOptions({ headerName: 'العنوان', field: 'address' }),
	new GridColumnOptions({ headerName: 'رقم التليفون', field: 'phoneNumber' }),
	new GridColumnOptions({ headerName: 'ارتفاع السور', field: 'fenceHeight' }),
	new GridColumnOptions({ headerName: 'ضلع شمال السور', field: 'fenceRibNorth' }),
	new GridColumnOptions({ headerName: 'ضلع جنوب السور', field: 'fenceRibSouth' }),
	new GridColumnOptions({ headerName: 'ضلع غرب السور', field: 'fenceRibWest' }),
	new GridColumnOptions({ headerName: 'ضلع شرق السور', field: 'fenceRibEast' }),
	new GridColumnOptions({ headerName: 'شمال شرق السور', field: 'northeastFence' }),
	new GridColumnOptions({ headerName: 'شمال غرب السور', field: 'northwestFence' }),
	new GridColumnOptions({ headerName: 'جنوب شرق السور', field: 'southeastFence' }),
	new GridColumnOptions({ headerName: 'جنوب غرب السور', field: 'southwestFence' }),
	new GridColumnOptions({ headerName: ' X  احدثيات', field: 'coordinatesX' }),
	new GridColumnOptions({ headerName: ' Yاحدثيات ', field: 'coordinatesY' }),
	new GridColumnOptions({ headerName: 'Z احدثيات ', field: 'coordinatesZ' }),
	new GridColumnOptions({ headerName: 'موقف استخدام', field: 'usePosition' }),
	new GridColumnOptions({ headerName: 'ملكيه الارض', field: 'landOwnership' }),
	new GridColumnOptions({ headerName: 'ملكيه المبني', field: 'buildingOwnership' }),
	new GridColumnOptions({ headerName: 'كود السور', field: 'fenceCode' }),
	new GridColumnOptions({ headerName: 'حاله السور', field: 'fenceState' }),
	new GridColumnOptions({ headerName: 'ماده البناء', field: 'buildingMaterial' }),
	new GridColumnOptions({ headerName: 'محطات مؤثره ايجابي ', field: 'positiveInfluentialStations' }),
	new GridColumnOptions({ headerName: 'محطات مؤثره سلبي', field: 'negativeInfluentialStations' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: BasicDataOfTheEducationalBuildingCairoBranchViewComponent,
    editDialogClassType: BasicDataOfTheEducationalBuildingCairoBranchEditComponent,
    newDialogClassType: BasicDataOfTheEducationalBuildingCairoBranchNewComponent,
  });
    constructor(
        injector: Injector,
        public basicDataOfTheEducationalBuildingCairoBranchService: BasicDataOfTheEducationalBuildingCairoBranchService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedBasicDataOfTheEducationalBuildingCairoBranch = new BasicDataOfTheEducationalBuildingCairoBranch();

    
	this.fenceCodeSelectOptions = new MaterialSelectOptions({
	 data: this.fenceStatusCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود السور',
	});


    this.searchForm = this.formBuilder.group({
     	buildingCode : [],
	fenceCode : []
    });

     
  }

  getBasicDataOfTheEducationalBuildingCairoBranchPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<BasicDataOfTheEducationalBuildingCairoBranch[]> => {
    return this.basicDataOfTheEducationalBuildingCairoBranchService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.basicDataOfTheEducationalBuildingCairoBranchService.delete(param.data.id)
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
    this.fenceStatusCodesService = new LookupService('fencestatuscodes', this.http);
  }
}

