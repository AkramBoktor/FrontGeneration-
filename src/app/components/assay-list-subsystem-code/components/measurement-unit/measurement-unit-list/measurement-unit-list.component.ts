
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { MeasurementUnit } from 'app/shared/models/measurement-unit';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { MeasurementUnitEditComponent } from '../measurement-unit-edit/measurement-unit-edit.component';
import { MeasurementUnitNewComponent } from '../measurement-unit-new/measurement-unit-new.component';
import { MeasurementUnitViewComponent } from '../measurement-unit-view/measurement-unit-view.component';
import { MeasurementUnitService } from '../shared/measurement-unit.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-measurement-unit-list',
  templateUrl: './measurement-unit-list.component.html',
  styleUrls: ['./measurement-unit-list.component.scss'],
  providers: []
})

export class MeasurementUnitListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedMeasurementUnit: MeasurementUnit;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'الكود', field: 'code' }),
	new GridColumnOptions({ headerName: 'الاسم', field: 'name' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: MeasurementUnitViewComponent,
    editDialogClassType: MeasurementUnitEditComponent,
    newDialogClassType: MeasurementUnitNewComponent,
  });
    constructor(
        injector: Injector,
        public measurementUnitService: MeasurementUnitService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedMeasurementUnit = new MeasurementUnit();

    

    this.searchForm = this.formBuilder.group({
     	code : [],
	name : []
    });

     
  }

  getMeasurementUnitsPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<MeasurementUnit[]> => {
    return this.measurementUnitService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.measurementUnitService.delete(param.data.id)
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

