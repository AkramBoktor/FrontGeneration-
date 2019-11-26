
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { ActivityType } from 'app/shared/models/activity-type';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { ActivityTypeService } from '../shared/activity-type.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-activity-type-view',
  templateUrl: './activity-type-view.component.html',
  styleUrls: ['./activity-type-view.component.scss'],
  providers: []
})

export class ActivityTypeViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedActivityType: ActivityType;
  activityTypeForm: FormGroup;

  private workTypesService: LookupService;

  
workTypeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedActivityTypeDialog: any,
    @Optional() public dialogRef: MatDialogRef<ActivityTypeViewComponent>,
    public activityTypeService: ActivityTypeService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedActivityType = this.selectedActivityTypeDialog.data || this.selectedActivityType;

    
	this.workTypeSelectOptions = new MaterialSelectOptions({
	 data: this.workTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع العمل',
	});


    this.activityTypeForm = this.formBuilder.group({
      
  code : [this.selectedActivityType.code],
  name : [this.selectedActivityType.name],
  workType : [this.selectedActivityType.workType]
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
    return this.activityTypeForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.activityTypeForm.controls)) {
      this.activityTypeForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.workTypesService = new LookupService('worktypes', this.http);
  }
}

