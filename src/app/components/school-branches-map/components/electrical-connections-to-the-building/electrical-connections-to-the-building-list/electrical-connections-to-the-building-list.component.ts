
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { ElectricalConnectionsToTheBuilding } from 'app/shared/models/electrical-connections-to-the-building';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ElectricalConnectionsToTheBuildingEditComponent } from '../electrical-connections-to-the-building-edit/electrical-connections-to-the-building-edit.component';
import { ElectricalConnectionsToTheBuildingNewComponent } from '../electrical-connections-to-the-building-new/electrical-connections-to-the-building-new.component';
import { ElectricalConnectionsToTheBuildingViewComponent } from '../electrical-connections-to-the-building-view/electrical-connections-to-the-building-view.component';
import { ElectricalConnectionsToTheBuildingService } from '../shared/electrical-connections-to-the-building.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-electrical-connections-to-the-building-list',
  templateUrl: './electrical-connections-to-the-building-list.component.html',
  styleUrls: ['./electrical-connections-to-the-building-list.component.scss'],
  providers: []
})

export class ElectricalConnectionsToTheBuildingListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private electricalConductivityCodesService: LookupService;

  
electricalConductivityCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('electricalConductivityCode', { static: true }) ElectricalConductivityCodeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedElectricalConnectionsToTheBuilding: ElectricalConnectionsToTheBuilding;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود المبنى', field: 'buildingCode' }),
	new GridColumnOptions({ headerName: 'قوه العداد', field: 'guoCounter' }),
	new GridColumnOptions({ headerName: 'عدد اوجه ', field: 'facetsNumber' }),
	new GridColumnOptions({ headerName: 'محاولات خاصه', field: 'specialtransformers' }),
	new GridColumnOptions({ headerName: 'قدرتها', field: 'ability' }),
	new GridColumnOptions({ headerName: 'عددها', field: 'number' }),
	new GridColumnOptions({ headerName: 'قطاع الكابل الرئيسي المغذي', field: 'feederMainCableStrip' }),
	new GridColumnOptions({ headerName: 'بعد اقرب مصدر تغذيه عن الشبكه', field: 'networkClosestSourceFeed' }),
	new GridColumnOptions({ headerName: 'مصدر التيار', field: 'powerSource' }),
	new GridColumnOptions({ headerName: 'كود التوصيل الكهربي', field: 'electricalConductivityCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: ElectricalConnectionsToTheBuildingViewComponent,
    editDialogClassType: ElectricalConnectionsToTheBuildingEditComponent,
    newDialogClassType: ElectricalConnectionsToTheBuildingNewComponent,
  });
    constructor(
        injector: Injector,
        public electricalConnectionsToTheBuildingService: ElectricalConnectionsToTheBuildingService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedElectricalConnectionsToTheBuilding = new ElectricalConnectionsToTheBuilding();

    
	this.electricalConductivityCodeSelectOptions = new MaterialSelectOptions({
	 data: this.electricalConductivityCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود التوصيل الكهربي',
	});


    this.searchForm = this.formBuilder.group({
     	buildingCode : [],
	electricalConductivityCode : []
    });

     
  }

  getElectricalConnectionsToTheBuildingPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<ElectricalConnectionsToTheBuilding[]> => {
    return this.electricalConnectionsToTheBuildingService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.electricalConnectionsToTheBuildingService.delete(param.data.id)
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
    this.electricalConductivityCodesService = new LookupService('electricalconductivitycodes', this.http);
  }
}

