
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { CoordinatesSensors } from 'app/shared/models/coordinates-sensors';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { CoordinatesSensorsEditComponent } from '../coordinates-sensors-edit/coordinates-sensors-edit.component';
import { CoordinatesSensorsNewComponent } from '../coordinates-sensors-new/coordinates-sensors-new.component';
import { CoordinatesSensorsViewComponent } from '../coordinates-sensors-view/coordinates-sensors-view.component';
import { CoordinatesSensorsService } from '../shared/coordinates-sensors.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-coordinates-sensors-list',
  templateUrl: './coordinates-sensors-list.component.html',
  styleUrls: ['./coordinates-sensors-list.component.scss'],
  providers: []
})

export class CoordinatesSensorsListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedCoordinatesSensors: CoordinatesSensors;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود المبنى', field: 'buildingCode' }),
	new GridColumnOptions({ headerName: 'رقم الجسه', field: 'sensorNumber' }),
	new GridColumnOptions({ headerName: 'الاحداثي السيني', field: 'coordinatesX' }),
	new GridColumnOptions({ headerName: 'الاحداثي الصادي', field: 'coordinatesY' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: CoordinatesSensorsViewComponent,
    editDialogClassType: CoordinatesSensorsEditComponent,
    newDialogClassType: CoordinatesSensorsNewComponent,
  });
    constructor(
        injector: Injector,
        public coordinatesSensorsService: CoordinatesSensorsService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedCoordinatesSensors = new CoordinatesSensors();

    

    this.searchForm = this.formBuilder.group({
     	buildingCode : [],
	sensorNumber : []
    });

     
  }

  getCoordinatesSensorsPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<CoordinatesSensors[]> => {
    return this.coordinatesSensorsService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.coordinatesSensorsService.delete(param.data.id)
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
    
  }
}

