
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { DataUnitOfMeasurement } from 'app/shared/models/data-unit-of-measurement';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { DataUnitOfMeasurementEditComponent } from '../data-unit-of-measurement-edit/data-unit-of-measurement-edit.component';
import { DataUnitOfMeasurementNewComponent } from '../data-unit-of-measurement-new/data-unit-of-measurement-new.component';
import { DataUnitOfMeasurementViewComponent } from '../data-unit-of-measurement-view/data-unit-of-measurement-view.component';
import { DataUnitOfMeasurementService } from '../shared/data-unit-of-measurement.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-data-unit-of-measurement-list',
  templateUrl: './data-unit-of-measurement-list.component.html',
  styleUrls: ['./data-unit-of-measurement-list.component.scss'],
  providers: []
})

export class DataUnitOfMeasurementListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private calibrationsService: LookupService;
private measurementUnitsService: LookupService;

  
calibrationUnitCodeSelectOptions: MaterialSelectOptions;
measurementCodeUnitSelectOptions: MaterialSelectOptions;

  
	@ViewChild('calibrationUnitCode', { static: true }) CalibrationUnitCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('measurementCodeUnit', { static: true }) MeasurementCodeUnitSelectComponent: MaterialSelectComponent;

  
  @Input() selectedDataUnitOfMeasurement: DataUnitOfMeasurement;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'اسم وحدة القياس', field: 'measurementNameUnit' }),
	new GridColumnOptions({ headerName: 'كود وحدة المعايرة', field: 'calibrationUnitCode' }),
	new GridColumnOptions({ headerName: 'كود وحدة القياس', field: 'measurementCodeUnit' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: DataUnitOfMeasurementViewComponent,
    editDialogClassType: DataUnitOfMeasurementEditComponent,
    newDialogClassType: DataUnitOfMeasurementNewComponent,
  });
    constructor(
        injector: Injector,
        public dataUnitOfMeasurementService: DataUnitOfMeasurementService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedDataUnitOfMeasurement = new DataUnitOfMeasurement();

    
	this.calibrationUnitCodeSelectOptions = new MaterialSelectOptions({
	 data: this.calibrationsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود وحدة المعايرة',
	});

	this.measurementCodeUnitSelectOptions = new MaterialSelectOptions({
	 data: this.measurementUnitsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود وحدة القياس',
	});


    this.searchForm = this.formBuilder.group({
     	measurementNameUnit : [],
	calibrationUnitCode : [],
	measurementCodeUnit : []
    });

     
  }

  getDataUnitsOfMeasurementPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<DataUnitOfMeasurement[]> => {
    return this.dataUnitOfMeasurementService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.dataUnitOfMeasurementService.delete(param.data.id)
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
    this.calibrationsService = new LookupService('calibrations', this.http);
this.measurementUnitsService = new LookupService('measurementunits', this.http);
  }
}

