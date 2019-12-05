
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { BindingItemWithScheduleActivities } from 'app/shared/models/binding-item-with-schedule-activities';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { BindingItemWithScheduleActivitiesService } from '../shared/binding-item-with-schedule-activities.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-binding-item-with-schedule-activities-view',
  templateUrl: './binding-item-with-schedule-activities-view.component.html',
  styleUrls: ['./binding-item-with-schedule-activities-view.component.scss'],
  providers: []
})

export class BindingItemWithScheduleActivitiesViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedBindingItemWithScheduleActivities: BindingItemWithScheduleActivities;
  bindingItemWithScheduleActivitiesForm: FormGroup;

  private itemCodesService: LookupService;

  
itemCodeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedBindingItemWithScheduleActivitiesDialog: any,
    @Optional() public dialogRef: MatDialogRef<BindingItemWithScheduleActivitiesViewComponent>,
    public bindingItemWithScheduleActivitiesService: BindingItemWithScheduleActivitiesService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedBindingItemWithScheduleActivities = this.selectedBindingItemWithScheduleActivitiesDialog.data || this.selectedBindingItemWithScheduleActivities;

    
	this.itemCodeSelectOptions = new MaterialSelectOptions({
	 data: this.itemCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود البند',
	});


    this.bindingItemWithScheduleActivitiesForm = this.formBuilder.group({
      
  activityCode : [this.selectedBindingItemWithScheduleActivities.activityCode],
  itemCode : [this.selectedBindingItemWithScheduleActivities.itemCode]
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
    return this.bindingItemWithScheduleActivitiesForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.bindingItemWithScheduleActivitiesForm.controls)) {
      this.bindingItemWithScheduleActivitiesForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.itemCodesService = new LookupService('itemcodes', this.http);
  }
}

