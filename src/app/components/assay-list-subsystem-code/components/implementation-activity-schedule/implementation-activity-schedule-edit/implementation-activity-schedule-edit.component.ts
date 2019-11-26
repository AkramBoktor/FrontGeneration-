
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { ImplementationActivitySchedule } from 'app/shared/models/implementation-activity-schedule';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { ImplementationActivityScheduleService } from '../shared/implementation-activity-schedule.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-implementation-activity-schedule-edit',
  templateUrl: './implementation-activity-schedule-edit.component.html',
  styleUrls: ['./implementation-activity-schedule-edit.component.scss'],
  providers: []
})

export class ImplementationActivityScheduleEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedImplementationActivitySchedule: ImplementationActivitySchedule;
  implementationActivityScheduleForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedImplementationActivityScheduleDialog: any,
    @Optional() public dialogRef: MatDialogRef<ImplementationActivityScheduleEditComponent>,
    public implementationActivityScheduleService: ImplementationActivityScheduleService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedImplementationActivitySchedule = new ImplementationActivitySchedule();
    this.selectedImplementationActivitySchedule = this.selectedImplementationActivityScheduleDialog.data || this.selectedImplementationActivitySchedule;

    

    this.implementationActivityScheduleForm = this.formBuilder.group({
      
  id : [this.selectedImplementationActivitySchedule.id],
  scheduleCode : [this.selectedImplementationActivitySchedule.scheduleCode, [ Validators.required ]],
  activity : [this.selectedImplementationActivitySchedule.activity, [ Validators.required ]],
  daysStart : [this.selectedImplementationActivitySchedule.daysStart, [ Validators.required ]],
  activityDuration : [this.selectedImplementationActivitySchedule.activityDuration, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.implementationActivityScheduleService.update(this.implementationActivityScheduleForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.implementationActivityScheduleService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.implementationActivityScheduleForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
