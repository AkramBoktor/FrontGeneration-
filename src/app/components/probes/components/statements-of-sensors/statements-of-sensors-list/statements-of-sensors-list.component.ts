
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { StatementsOfSensors } from 'app/shared/models/statements-of-sensors';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { StatementsOfSensorsEditComponent } from '../statements-of-sensors-edit/statements-of-sensors-edit.component';
import { StatementsOfSensorsNewComponent } from '../statements-of-sensors-new/statements-of-sensors-new.component';
import { StatementsOfSensorsViewComponent } from '../statements-of-sensors-view/statements-of-sensors-view.component';
import { StatementsOfSensorsService } from '../shared/statements-of-sensors.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-statements-of-sensors-list',
  templateUrl: './statements-of-sensors-list.component.html',
  styleUrls: ['./statements-of-sensors-list.component.scss'],
  providers: []
})

export class StatementsOfSensorsListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedStatementsOfSensors: StatementsOfSensors;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم المدرسه', field: 'schoolNumber' }),
	new GridColumnOptions({ headerName: 'تاريخ التسجيل', field: 'recordDate' }),
	new GridColumnOptions({ headerName: 'المسئول', field: 'administrator' }),
	new GridColumnOptions({ headerName: 'رقم البديل', field: 'alternativeNumber' }),
	new GridColumnOptions({ headerName: 'عدد الادوار', field: 'floorsNumbers' }),
	new GridColumnOptions({ headerName: 'عمود الرد', field: 'backfill' }),
	new GridColumnOptions({ headerName: 'عمق الحفر', field: 'drillingDepth' }),
	new GridColumnOptions({ headerName: 'رفرفه الحفر', field: 'flutterDrill' }),
	new GridColumnOptions({ headerName: 'نوعيه الاحلال', field: 'qualitySubstitution' }),
	new GridColumnOptions({ headerName: 'سمك الاحلال', field: 'substitutionDepth' }),
	new GridColumnOptions({ headerName: 'نوعيه الاساسات', field: 'qualityFoundations' }),
	new GridColumnOptions({ headerName: 'جهد التربه', field: 'soilEffort' }),
	new GridColumnOptions({ headerName: 'نوعيه الاسمنت', field: 'qualityCement' }),
	new GridColumnOptions({ headerName: 'ملاحظات', field: 'notes' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: StatementsOfSensorsViewComponent,
    editDialogClassType: StatementsOfSensorsEditComponent,
    newDialogClassType: StatementsOfSensorsNewComponent,
  });
    constructor(
        injector: Injector,
        public statementsOfSensorsService: StatementsOfSensorsService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedStatementsOfSensors = new StatementsOfSensors();

    

    this.searchForm = this.formBuilder.group({
     	schoolNumber : [],
	recordDate : [],
	administrator : [],
	alternativeNumber : [],
	floorsNumbers : [],
	backfill : [],
	drillingDepth : [],
	flutterDrill : [],
	qualitySubstitution : [],
	substitutionDepth : [],
	qualityFoundations : [],
	soilEffort : [],
	qualityCement : [],
	notes : []
    });

     
  }

  getStatementsOfSensorPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<StatementsOfSensors[]> => {
    return this.statementsOfSensorsService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.statementsOfSensorsService.delete(param.data.id)
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

