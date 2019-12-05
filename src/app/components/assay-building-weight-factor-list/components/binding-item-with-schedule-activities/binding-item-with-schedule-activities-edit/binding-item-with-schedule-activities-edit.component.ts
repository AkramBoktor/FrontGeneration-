
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { BindingItemWithScheduleActivities } from 'app/shared/models/binding-item-with-schedule-activities';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { BindingItemWithScheduleActivitiesService } from '../shared/binding-item-with-schedule-activities.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-binding-item-with-schedule-activities-edit',
  templateUrl: './binding-item-with-schedule-activities-edit.component.html',
  styleUrls: ['./binding-item-with-schedule-activities-edit.component.scss'],
  providers: []
})

export class BindingItemWithScheduleActivitiesEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedBindingItemWithScheduleActivities: BindingItemWithScheduleActivities;
  bindingItemWithScheduleActivitiesForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private itemCodesService: LookupService;

  
itemCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('itemCode', { static: true }) ItemCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedBindingItemWithScheduleActivitiesDialog: any,
    @Optional() public dialogRef: MatDialogRef<BindingItemWithScheduleActivitiesEditComponent>,
    public bindingItemWithScheduleActivitiesService: BindingItemWithScheduleActivitiesService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedBindingItemWithScheduleActivities = new BindingItemWithScheduleActivities();
    this.selectedBindingItemWithScheduleActivities = this.selectedBindingItemWithScheduleActivitiesDialog.data || this.selectedBindingItemWithScheduleActivities;

    
	this.itemCodeSelectOptions = new MaterialSelectOptions({
	 data: this.itemCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود البند',
	});


    this.bindingItemWithScheduleActivitiesForm = this.formBuilder.group({
      
  id : [this.selectedBindingItemWithScheduleActivities.id],
  activityCode : [this.selectedBindingItemWithScheduleActivities.activityCode, [ Validators.required ]],
  itemCode : [this.selectedBindingItemWithScheduleActivities.itemCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.bindingItemWithScheduleActivitiesService.update(this.bindingItemWithScheduleActivitiesForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.bindingItemWithScheduleActivitiesService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.bindingItemWithScheduleActivitiesForm.get(name);
  }

  initializeLookupServices() {
    this.itemCodesService = new LookupService('itemcodes', this.http);
  }
}
