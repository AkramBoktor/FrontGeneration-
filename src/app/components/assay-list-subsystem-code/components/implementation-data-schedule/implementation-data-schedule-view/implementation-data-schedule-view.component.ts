
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { ImplementationDataSchedule } from 'app/shared/models/implementation-data-schedule';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { ImplementationDataScheduleService } from '../shared/implementation-data-schedule.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-implementation-data-schedule-view',
  templateUrl: './implementation-data-schedule-view.component.html',
  styleUrls: ['./implementation-data-schedule-view.component.scss'],
  providers: []
})

export class ImplementationDataScheduleViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedImplementationDataSchedule: ImplementationDataSchedule;
  implementationDataScheduleForm: FormGroup;

  private foundationTypesService: LookupService;

  
baseTypeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedImplementationDataScheduleDialog: any,
    @Optional() public dialogRef: MatDialogRef<ImplementationDataScheduleViewComponent>,
    public implementationDataScheduleService: ImplementationDataScheduleService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedImplementationDataSchedule = this.selectedImplementationDataScheduleDialog.data || this.selectedImplementationDataSchedule;

    
	this.baseTypeSelectOptions = new MaterialSelectOptions({
	 data: this.foundationTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الأساس',
	});


    this.implementationDataScheduleForm = this.formBuilder.group({
      
  scheduleCode : [this.selectedImplementationDataSchedule.scheduleCode],
  executionDuration : [this.selectedImplementationDataSchedule.executionDuration],
  floorsNumber : [this.selectedImplementationDataSchedule.floorsNumber],
  baseType : [this.selectedImplementationDataSchedule.baseType]
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
    return this.implementationDataScheduleForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.implementationDataScheduleForm.controls)) {
      this.implementationDataScheduleForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.foundationTypesService = new LookupService('foundationtypes', this.http);
  }
}

