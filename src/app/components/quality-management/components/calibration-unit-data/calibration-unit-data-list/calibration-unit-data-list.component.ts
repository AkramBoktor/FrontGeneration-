
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { CalibrationUnitData } from 'app/shared/models/calibration-unit-data';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { CalibrationUnitDataEditComponent } from '../calibration-unit-data-edit/calibration-unit-data-edit.component';
import { CalibrationUnitDataNewComponent } from '../calibration-unit-data-new/calibration-unit-data-new.component';
import { CalibrationUnitDataViewComponent } from '../calibration-unit-data-view/calibration-unit-data-view.component';
import { CalibrationUnitDataService } from '../shared/calibration-unit-data.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-calibration-unit-data-list',
  templateUrl: './calibration-unit-data-list.component.html',
  styleUrls: ['./calibration-unit-data-list.component.scss'],
  providers: []
})

export class CalibrationUnitDataListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedCalibrationUnitData: CalibrationUnitData;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود وحدة المعايرة', field: 'calibrationUnitCode' }),
	new GridColumnOptions({ headerName: 'اسم وحدة المعايرة', field: 'calibrationUnitName' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: CalibrationUnitDataViewComponent,
    editDialogClassType: CalibrationUnitDataEditComponent,
    newDialogClassType: CalibrationUnitDataNewComponent,
  });
    constructor(
        injector: Injector,
        public calibrationUnitDataService: CalibrationUnitDataService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedCalibrationUnitData = new CalibrationUnitData();

    

    this.searchForm = this.formBuilder.group({
     	calibrationUnitCode : [],
	calibrationUnitName : []
    });

     
  }

  getCalibrationUnitsDataPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<CalibrationUnitData[]> => {
    return this.calibrationUnitDataService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.calibrationUnitDataService.delete(param.data.id)
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

