
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { Timetable } from 'app/shared/models/timetable';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { TimetableService } from '../shared/timetable.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-timetable-new',
  templateUrl: './timetable-new.component.html',
  styleUrls: ['./timetable-new.component.scss'],
  providers: [
    ]
})

export class TimetableNewComponent extends AppBaseComponent implements OnInit {
  timetableForm: FormGroup;
  @Input() selectedTimetable: Timetable;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<TimetableNewComponent>,
    public timetableService: TimetableService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTimetable = new Timetable();

    

    this.timetableForm = this.formBuilder.group({
     
  id : [0],
  tableTumber : [this.selectedTimetable.tableTumber, [ Validators.required ]],
  activityNumber : [this.selectedTimetable.activityNumber, [ Validators.required ]],
  beginningDays : [this.selectedTimetable.beginningDays, [ Validators.required ]],
  activityDuration : [this.selectedTimetable.activityDuration, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.timetableService.create(this.timetableForm.value)
        .pipe(switchMap(x => {
			return this.timetableService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.timetableForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
