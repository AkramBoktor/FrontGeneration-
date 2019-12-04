
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { Timetable } from 'app/shared/models/timetable';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { TimetableService } from '../shared/timetable.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-timetable-edit',
  templateUrl: './timetable-edit.component.html',
  styleUrls: ['./timetable-edit.component.scss'],
  providers: []
})

export class TimetableEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedTimetable: Timetable;
  timetableForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedTimetableDialog: any,
    @Optional() public dialogRef: MatDialogRef<TimetableEditComponent>,
    public timetableService: TimetableService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTimetable = new Timetable();
    this.selectedTimetable = this.selectedTimetableDialog.data || this.selectedTimetable;

    

    this.timetableForm = this.formBuilder.group({
      
  id : [this.selectedTimetable.id],
  tableTumber : [this.selectedTimetable.tableTumber, [ Validators.required ]],
  activityNumber : [this.selectedTimetable.activityNumber, [ Validators.required ]],
  beginningDays : [this.selectedTimetable.beginningDays, [ Validators.required ]],
  activityDuration : [this.selectedTimetable.activityDuration, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.timetableService.update(this.timetableForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.timetableService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.timetableForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
