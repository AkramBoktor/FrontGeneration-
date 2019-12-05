
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { BarrierDataForThePlotOfLand } from 'app/shared/models/barrier-data-for-the-plot-of-land';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { BarrierDataForThePlotOfLandEditComponent } from '../barrier-data-for-the-plot-of-land-edit/barrier-data-for-the-plot-of-land-edit.component';
import { BarrierDataForThePlotOfLandNewComponent } from '../barrier-data-for-the-plot-of-land-new/barrier-data-for-the-plot-of-land-new.component';
import { BarrierDataForThePlotOfLandViewComponent } from '../barrier-data-for-the-plot-of-land-view/barrier-data-for-the-plot-of-land-view.component';
import { BarrierDataForThePlotOfLandService } from '../shared/barrier-data-for-the-plot-of-land.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-barrier-data-for-the-plot-of-land-list',
  templateUrl: './barrier-data-for-the-plot-of-land-list.component.html',
  styleUrls: ['./barrier-data-for-the-plot-of-land-list.component.scss'],
  providers: []
})

export class BarrierDataForThePlotOfLandListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private obstacleCodesService: LookupService;

  
obstacleCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('obstacleCode', { static: true }) ObstacleCodeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedBarrierDataForThePlotOfLand: BarrierDataForThePlotOfLand;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود قطعة الارض', field: 'landID' }),
	new GridColumnOptions({ headerName: 'كود العائق', field: 'obstacleCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: BarrierDataForThePlotOfLandViewComponent,
    editDialogClassType: BarrierDataForThePlotOfLandEditComponent,
    newDialogClassType: BarrierDataForThePlotOfLandNewComponent,
  });
    constructor(
        injector: Injector,
        public barrierDataForThePlotOfLandService: BarrierDataForThePlotOfLandService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedBarrierDataForThePlotOfLand = new BarrierDataForThePlotOfLand();

    
	this.obstacleCodeSelectOptions = new MaterialSelectOptions({
	 data: this.obstacleCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود العائق',
	});


    this.searchForm = this.formBuilder.group({
     	landID : [],
	obstacleCode : []
    });

     
  }

  getBarrierDataForThePlotOfLandPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<BarrierDataForThePlotOfLand[]> => {
    return this.barrierDataForThePlotOfLandService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.barrierDataForThePlotOfLandService.delete(param.data.id)
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
    this.obstacleCodesService = new LookupService('obstaclecodes', this.http);
  }
}

