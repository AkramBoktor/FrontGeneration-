
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { RecordThePositionOfNeedToBeRemoved } from 'app/shared/models/record-the-position-of-need-to-be-removed';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { RecordThePositionOfNeedToBeRemovedService } from '../shared/record-the-position-of-need-to-be-removed.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-record-the-position-of-need-to-be-removed-edit',
  templateUrl: './record-the-position-of-need-to-be-removed-edit.component.html',
  styleUrls: ['./record-the-position-of-need-to-be-removed-edit.component.scss'],
  providers: []
})

export class RecordThePositionOfNeedToBeRemovedEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedRecordThePositionOfNeedToBeRemoved: RecordThePositionOfNeedToBeRemoved;
  recordThePositionOfNeedToBeRemovedForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private educationalNeedAttitudesService: LookupService;
private positionAreaNeedsService: LookupService;

  
statusSelectOptions: MaterialSelectOptions;
needCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('status', { static: true }) StatusSelectComponent: MaterialSelectComponent;
	@ViewChild('needCode', { static: true }) NeedCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedRecordThePositionOfNeedToBeRemovedDialog: any,
    @Optional() public dialogRef: MatDialogRef<RecordThePositionOfNeedToBeRemovedEditComponent>,
    public recordThePositionOfNeedToBeRemovedService: RecordThePositionOfNeedToBeRemovedService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedRecordThePositionOfNeedToBeRemoved = new RecordThePositionOfNeedToBeRemoved();
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
      
  id : [this.selectedRecordThePositionOfNeedToBeRemoved.id],
  schoolCode : [this.selectedRecordThePositionOfNeedToBeRemoved.schoolCode, [ Validators.required ]],
  extension : [this.selectedRecordThePositionOfNeedToBeRemoved.extension, [ Validators.required ]],
  status : [this.selectedRecordThePositionOfNeedToBeRemoved.status, [ Validators.required ]],
  needCode : [this.selectedRecordThePositionOfNeedToBeRemoved.needCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.recordThePositionOfNeedToBeRemovedService.update(this.recordThePositionOfNeedToBeRemovedForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.recordThePositionOfNeedToBeRemovedService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.recordThePositionOfNeedToBeRemovedForm.get(name);
  }

  initializeLookupServices() {
    this.educationalNeedAttitudesService = new LookupService('educationalneedattitudes', this.http);
this.positionAreaNeedsService = new LookupService('positionareaneeds', this.http);
  }
}
