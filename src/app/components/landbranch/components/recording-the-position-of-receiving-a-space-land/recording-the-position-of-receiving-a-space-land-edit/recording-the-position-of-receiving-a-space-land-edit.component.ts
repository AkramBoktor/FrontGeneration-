
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { RecordingThePositionOfReceivingASpaceLand } from 'app/shared/models/recording-the-position-of-receiving-a-space-land';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { RecordingThePositionOfReceivingASpaceLandService } from '../shared/recording-the-position-of-receiving-a-space-land.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-recording-the-position-of-receiving-a-space-land-edit',
  templateUrl: './recording-the-position-of-receiving-a-space-land-edit.component.html',
  styleUrls: ['./recording-the-position-of-receiving-a-space-land-edit.component.scss'],
  providers: []
})

export class RecordingThePositionOfReceivingASpaceLandEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedRecordingThePositionOfReceivingASpaceLand: RecordingThePositionOfReceivingASpaceLand;
  recordingThePositionOfReceivingASpaceLandForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private receivingPositionsService: LookupService;
private obstacleCodesService: LookupService;

  
receivingPositionSelectOptions: MaterialSelectOptions;
obstacleCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('receivingPosition', { static: true }) ReceivingPositionSelectComponent: MaterialSelectComponent;
	@ViewChild('obstacleCode', { static: true }) ObstacleCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedRecordingThePositionOfReceivingASpaceLandDialog: any,
    @Optional() public dialogRef: MatDialogRef<RecordingThePositionOfReceivingASpaceLandEditComponent>,
    public recordingThePositionOfReceivingASpaceLandService: RecordingThePositionOfReceivingASpaceLandService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedRecordingThePositionOfReceivingASpaceLand = new RecordingThePositionOfReceivingASpaceLand();
    this.selectedRecordingThePositionOfReceivingASpaceLand = this.selectedRecordingThePositionOfReceivingASpaceLandDialog.data || this.selectedRecordingThePositionOfReceivingASpaceLand;

    
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


    this.recordingThePositionOfReceivingASpaceLandForm = this.formBuilder.group({
      
  id : [this.selectedRecordingThePositionOfReceivingASpaceLand.id],
  landID : [this.selectedRecordingThePositionOfReceivingASpaceLand.landID, [ Validators.required ]],
  notificationDate : [this.selectedRecordingThePositionOfReceivingASpaceLand.notificationDate, [ Validators.required ]],
  materPrice : [this.selectedRecordingThePositionOfReceivingASpaceLand.materPrice, [ Validators.required ]],
  receivingPosition : [this.selectedRecordingThePositionOfReceivingASpaceLand.receivingPosition, [ Validators.required ]],
  obstacleCode : [this.selectedRecordingThePositionOfReceivingASpaceLand.obstacleCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.recordingThePositionOfReceivingASpaceLandService.update(this.recordingThePositionOfReceivingASpaceLandForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.recordingThePositionOfReceivingASpaceLandService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
	    }))
    .subscribe(
      (result) => {
          if (this.dialogRef)
          {
              this.dialogRef.close(true);
          }
    });
  }

  getControls(name: string) {
    return this.recordingThePositionOfReceivingASpaceLandForm.get(name);
  }

  initializeLookupServices() {
    this.receivingPositionsService = new LookupService('receivingpositions', this.http);
this.obstacleCodesService = new LookupService('obstaclecodes', this.http);
  }
}
