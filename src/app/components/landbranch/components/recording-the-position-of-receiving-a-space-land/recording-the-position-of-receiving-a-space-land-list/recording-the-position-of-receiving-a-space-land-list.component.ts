
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { RecordingThePositionOfReceivingASpaceLand } from 'app/shared/models/recording-the-position-of-receiving-a-space-land';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { RecordingThePositionOfReceivingASpaceLandEditComponent } from '../recording-the-position-of-receiving-a-space-land-edit/recording-the-position-of-receiving-a-space-land-edit.component';
import { RecordingThePositionOfReceivingASpaceLandNewComponent } from '../recording-the-position-of-receiving-a-space-land-new/recording-the-position-of-receiving-a-space-land-new.component';
import { RecordingThePositionOfReceivingASpaceLandViewComponent } from '../recording-the-position-of-receiving-a-space-land-view/recording-the-position-of-receiving-a-space-land-view.component';
import { RecordingThePositionOfReceivingASpaceLandService } from '../shared/recording-the-position-of-receiving-a-space-land.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-recording-the-position-of-receiving-a-space-land-list',
  templateUrl: './recording-the-position-of-receiving-a-space-land-list.component.html',
  styleUrls: ['./recording-the-position-of-receiving-a-space-land-list.component.scss'],
  providers: []
})

export class RecordingThePositionOfReceivingASpaceLandListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private receivingPositionsService: LookupService;
private obstacleCodesService: LookupService;

  
receivingPositionSelectOptions: MaterialSelectOptions;
obstacleCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('receivingPosition', { static: true }) ReceivingPositionSelectComponent: MaterialSelectComponent;
	@ViewChild('obstacleCode', { static: true }) ObstacleCodeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedRecordingThePositionOfReceivingASpaceLand: RecordingThePositionOfReceivingASpaceLand;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم الارض', field: 'landID' }),
	new GridColumnOptions({ headerName: 'تاريخ الاخطار', field: 'notificationDate' }),
	new GridColumnOptions({ headerName: 'سعر المتر', field: 'materPrice' }),
	new GridColumnOptions({ headerName: 'موقف الاستلام', field: 'receivingPosition' }),
	new GridColumnOptions({ headerName: 'كود العائق', field: 'obstacleCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: RecordingThePositionOfReceivingASpaceLandViewComponent,
    editDialogClassType: RecordingThePositionOfReceivingASpaceLandEditComponent,
    newDialogClassType: RecordingThePositionOfReceivingASpaceLandNewComponent,
  });
    constructor(
        injector: Injector,
        public recordingThePositionOfReceivingASpaceLandService: RecordingThePositionOfReceivingASpaceLandService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedRecordingThePositionOfReceivingASpaceLand = new RecordingThePositionOfReceivingASpaceLand();

    
	this.receivingPositionSelectOptions = new MaterialSelectOptions({
	 data: this.receivingPositionsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'موقف الاستلام',
	});

	this.obstacleCodeSelectOptions = new MaterialSelectOptions({
	 data: this.obstacleCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود العائق',
	});


    this.searchForm = this.formBuilder.group({
     	landID : [],
	notificationDate : [],
	materPrice : [],
	receivingPosition : [],
	obstacleCode : []
    });

     
  }

  getRecordingThePositionOfReceivingASpaceLandPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<RecordingThePositionOfReceivingASpaceLand[]> => {
    return this.recordingThePositionOfReceivingASpaceLandService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.recordingThePositionOfReceivingASpaceLandService.delete(param.data.id)
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
    this.receivingPositionsService = new LookupService('receivingpositions', this.http);
this.obstacleCodesService = new LookupService('obstaclecodes', this.http);
  }
}

