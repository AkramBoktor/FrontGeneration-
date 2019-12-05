
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { RecordingThePositionOfReceivingASpaceLand } from 'app/shared/models/recording-the-position-of-receiving-a-space-land';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { RecordingThePositionOfReceivingASpaceLandService } from '../shared/recording-the-position-of-receiving-a-space-land.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-recording-the-position-of-receiving-a-space-land-new',
  templateUrl: './recording-the-position-of-receiving-a-space-land-new.component.html',
  styleUrls: ['./recording-the-position-of-receiving-a-space-land-new.component.scss'],
  providers: [
    ]
})

export class RecordingThePositionOfReceivingASpaceLandNewComponent extends AppBaseComponent implements OnInit {
  recordingThePositionOfReceivingASpaceLandForm: FormGroup;
  @Input() selectedRecordingThePositionOfReceivingASpaceLand: RecordingThePositionOfReceivingASpaceLand;
  errorMessages: FormControlError[] = [
        
  ];

  private receivingPositionsService: LookupService;
private obstacleCodesService: LookupService;

  
receivingPositionSelectOptions: MaterialSelectOptions;
obstacleCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('receivingPosition', { static: true }) ReceivingPositionSelectComponent: MaterialSelectComponent;
	@ViewChild('obstacleCode', { static: true }) ObstacleCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<RecordingThePositionOfReceivingASpaceLandNewComponent>,
    public recordingThePositionOfReceivingASpaceLandService: RecordingThePositionOfReceivingASpaceLandService)
    {
    super(injector);
    }
    
  ngOnInit() {
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


    this.recordingThePositionOfReceivingASpaceLandForm = this.formBuilder.group({
     
  id : [0],
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
    this.recordingThePositionOfReceivingASpaceLandService.create(this.recordingThePositionOfReceivingASpaceLandForm.value)
        .pipe(switchMap(x => {
			return this.recordingThePositionOfReceivingASpaceLandService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.recordingThePositionOfReceivingASpaceLandForm.get(name);
    }

  initializeLookupServices() {
    this.receivingPositionsService = new LookupService('receivingpositions', this.http);
this.obstacleCodesService = new LookupService('obstaclecodes', this.http);
  }
 }
