
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { ImplementationActivitySchedule } from 'app/shared/models/implementation-activity-schedule';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { ImplementationActivityScheduleService } from '../shared/implementation-activity-schedule.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-implementation-activity-schedule-view',
  templateUrl: './implementation-activity-schedule-view.component.html',
  styleUrls: ['./implementation-activity-schedule-view.component.scss'],
  providers: []
})

export class ImplementationActivityScheduleViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedImplementationActivitySchedule: ImplementationActivitySchedule;
  implementationActivityScheduleForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedImplementationActivityScheduleDialog: any,
    @Optional() public dialogRef: MatDialogRef<ImplementationActivityScheduleViewComponent>,
    public implementationActivityScheduleService: ImplementationActivityScheduleService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedImplementationActivitySchedule = this.selectedImplementationActivityScheduleDialog.data || this.selectedImplementationActivitySchedule;

    

    this.implementationActivityScheduleForm = this.formBuilder.group({
      
  scheduleCode : [this.selectedImplementationActivitySchedule.scheduleCode],
  activity : [this.selectedImplementationActivitySchedule.activity],
  daysStart : [this.selectedImplementationActivitySchedule.daysStart],
  activityDuration : [this.selectedImplementationActivitySchedule.activityDuration]
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
    return this.implementationActivityScheduleForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.implementationActivityScheduleForm.controls)) {
      this.implementationActivityScheduleForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

