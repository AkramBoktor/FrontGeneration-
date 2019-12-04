
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { Timetable } from 'app/shared/models/timetable';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { TimetableService } from '../shared/timetable.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-timetable-view',
  templateUrl: './timetable-view.component.html',
  styleUrls: ['./timetable-view.component.scss'],
  providers: []
})

export class TimetableViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedTimetable: Timetable;
  timetableForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedTimetableDialog: any,
    @Optional() public dialogRef: MatDialogRef<TimetableViewComponent>,
    public timetableService: TimetableService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTimetable = this.selectedTimetableDialog.data || this.selectedTimetable;

    

    this.timetableForm = this.formBuilder.group({
      
  tableTumber : [this.selectedTimetable.tableTumber],
  activityNumber : [this.selectedTimetable.activityNumber],
  beginningDays : [this.selectedTimetable.beginningDays],
  activityDuration : [this.selectedTimetable.activityDuration]
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
    return this.timetableForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.timetableForm.controls)) {
      this.timetableForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

