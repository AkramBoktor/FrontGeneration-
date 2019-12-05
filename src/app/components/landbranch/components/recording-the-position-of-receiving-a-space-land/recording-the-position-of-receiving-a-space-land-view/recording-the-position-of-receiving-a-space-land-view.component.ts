
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { RecordingThePositionOfReceivingASpaceLand } from 'app/shared/models/recording-the-position-of-receiving-a-space-land';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { RecordingThePositionOfReceivingASpaceLandService } from '../shared/recording-the-position-of-receiving-a-space-land.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-recording-the-position-of-receiving-a-space-land-view',
  templateUrl: './recording-the-position-of-receiving-a-space-land-view.component.html',
  styleUrls: ['./recording-the-position-of-receiving-a-space-land-view.component.scss'],
  providers: []
})

export class RecordingThePositionOfReceivingASpaceLandViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedRecordingThePositionOfReceivingASpaceLand: RecordingThePositionOfReceivingASpaceLand;
  recordingThePositionOfReceivingASpaceLandForm: FormGroup;

  private receivingPositionsService: LookupService;
private obstacleCodesService: LookupService;

  
receivingPositionSelectOptions: MaterialSelectOptions;
obstacleCodeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedRecordingThePositionOfReceivingASpaceLandDialog: any,
    @Optional() public dialogRef: MatDialogRef<RecordingThePositionOfReceivingASpaceLandViewComponent>,
    public recordingThePositionOfReceivingASpaceLandService: RecordingThePositionOfReceivingASpaceLandService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
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
      
  landID : [this.selectedRecordingThePositionOfReceivingASpaceLand.landID],
  notificationDate : [this.selectedRecordingThePositionOfReceivingASpaceLand.notificationDate],
  materPrice : [this.selectedRecordingThePositionOfReceivingASpaceLand.materPrice],
  receivingPosition : [this.selectedRecordingThePositionOfReceivingASpaceLand.receivingPosition],
  obstacleCode : [this.selectedRecordingThePositionOfReceivingASpaceLand.obstacleCode]
      });

    this.disableControls();
  }

  onConfirm() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  getErrorMessage = (formCtrl: AbstractControl) => {
    const errorMessages: FormControlError[] = [
          
        ];
    return ValidatorFunctions.getErrorMessage(formCtrl, errorMessages);
   }

  getControls(name: string) {
    return this.recordingThePositionOfReceivingASpaceLandForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.recordingThePositionOfReceivingASpaceLandForm.controls)) {
      this.recordingThePositionOfReceivingASpaceLandForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.receivingPositionsService = new LookupService('receivingpositions', this.http);
this.obstacleCodesService = new LookupService('obstaclecodes', this.http);
  }
}

