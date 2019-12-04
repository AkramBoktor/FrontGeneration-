
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { RecordThePositionOfNeedToBeRemoved } from 'app/shared/models/record-the-position-of-need-to-be-removed';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { RecordThePositionOfNeedToBeRemovedService } from '../shared/record-the-position-of-need-to-be-removed.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-record-the-position-of-need-to-be-removed-view',
  templateUrl: './record-the-position-of-need-to-be-removed-view.component.html',
  styleUrls: ['./record-the-position-of-need-to-be-removed-view.component.scss'],
  providers: []
})

export class RecordThePositionOfNeedToBeRemovedViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedRecordThePositionOfNeedToBeRemoved: RecordThePositionOfNeedToBeRemoved;
  recordThePositionOfNeedToBeRemovedForm: FormGroup;

  private educationalNeedAttitudesService: LookupService;
private positionAreaNeedsService: LookupService;

  
statusSelectOptions: MaterialSelectOptions;
needCodeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedRecordThePositionOfNeedToBeRemovedDialog: any,
    @Optional() public dialogRef: MatDialogRef<RecordThePositionOfNeedToBeRemovedViewComponent>,
    public recordThePositionOfNeedToBeRemovedService: RecordThePositionOfNeedToBeRemovedService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedRecordThePositionOfNeedToBeRemoved = this.selectedRecordThePositionOfNeedToBeRemovedDialog.data || this.selectedRecordThePositionOfNeedToBeRemoved;

    
	this.statusSelectOptions = new MaterialSelectOptions({
	 data: this.educationalNeedAttitudesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الموقف',
	});

	this.needCodeSelectOptions = new MaterialSelectOptions({
	 data: this.positionAreaNeedsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الاحتياج',
	});


    this.recordThePositionOfNeedToBeRemovedForm = this.formBuilder.group({
      
  schoolCode : [this.selectedRecordThePositionOfNeedToBeRemoved.schoolCode],
  extension : [this.selectedRecordThePositionOfNeedToBeRemoved.extension],
  status : [this.selectedRecordThePositionOfNeedToBeRemoved.status],
  needCode : [this.selectedRecordThePositionOfNeedToBeRemoved.needCode]
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
    return this.recordThePositionOfNeedToBeRemovedForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.recordThePositionOfNeedToBeRemovedForm.controls)) {
      this.recordThePositionOfNeedToBeRemovedForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.educationalNeedAttitudesService = new LookupService('educationalneedattitudes', this.http);
this.positionAreaNeedsService = new LookupService('positionareaneeds', this.http);
  }
}

