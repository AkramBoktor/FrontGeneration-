
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { ImplementationDataSchedule } from 'app/shared/models/implementation-data-schedule';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { ImplementationDataScheduleService } from '../shared/implementation-data-schedule.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-implementation-data-schedule-edit',
  templateUrl: './implementation-data-schedule-edit.component.html',
  styleUrls: ['./implementation-data-schedule-edit.component.scss'],
  providers: []
})

export class ImplementationDataScheduleEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedImplementationDataSchedule: ImplementationDataSchedule;
  implementationDataScheduleForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private foundationTypesService: LookupService;

  
baseTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('baseType', { static: true }) BaseTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedImplementationDataScheduleDialog: any,
    @Optional() public dialogRef: MatDialogRef<ImplementationDataScheduleEditComponent>,
    public implementationDataScheduleService: ImplementationDataScheduleService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedImplementationDataSchedule = new ImplementationDataSchedule();
    this.selectedImplementationDataSchedule = this.selectedImplementationDataScheduleDialog.data || this.selectedImplementationDataSchedule;

    
	this.baseTypeSelectOptions = new MaterialSelectOptions({
	 data: this.foundationTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الأساس',
	});


    this.implementationDataScheduleForm = this.formBuilder.group({
      
  id : [this.selectedImplementationDataSchedule.id],
  scheduleCode : [this.selectedImplementationDataSchedule.scheduleCode, [ Validators.required ]],
  executionDuration : [this.selectedImplementationDataSchedule.executionDuration, [ Validators.required ]],
  floorsNumber : [this.selectedImplementationDataSchedule.floorsNumber, [ Validators.required ]],
  baseType : [this.selectedImplementationDataSchedule.baseType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.implementationDataScheduleService.update(this.implementationDataScheduleForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.implementationDataScheduleService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.implementationDataScheduleForm.get(name);
  }

  initializeLookupServices() {
    this.foundationTypesService = new LookupService('foundationtypes', this.http);
  }
}
