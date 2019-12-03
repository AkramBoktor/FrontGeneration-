
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { ImplementationActivitySchedule } from 'app/shared/models/implementation-activity-schedule';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ImplementationActivityScheduleService } from '../shared/implementation-activity-schedule.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-implementation-activity-schedule-new',
  templateUrl: './implementation-activity-schedule-new.component.html',
  styleUrls: ['./implementation-activity-schedule-new.component.scss'],
  providers: [
    ]
})

export class ImplementationActivityScheduleNewComponent extends AppBaseComponent implements OnInit {
  implementationActivityScheduleForm: FormGroup;
  @Input() selectedImplementationActivitySchedule: ImplementationActivitySchedule;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<ImplementationActivityScheduleNewComponent>,
    public implementationActivityScheduleService: ImplementationActivityScheduleService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedImplementationActivitySchedule = new ImplementationActivitySchedule();

    

    this.implementationActivityScheduleForm = this.formBuilder.group({
     
  id : [0],
  scheduleCode : [this.selectedImplementationActivitySchedule.scheduleCode, [ Validators.required ]],
  activity : [this.selectedImplementationActivitySchedule.activity, [ Validators.required ]],
  daysStart : [this.selectedImplementationActivitySchedule.daysStart, [ Validators.required ]],
  activityDuration : [this.selectedImplementationActivitySchedule.activityDuration, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.implementationActivityScheduleService.create(this.implementationActivityScheduleForm.value)
        .pipe(switchMap(x => {
			return this.implementationActivityScheduleService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.implementationActivityScheduleForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
