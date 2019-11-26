
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { ActivityType } from 'app/shared/models/activity-type';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { ActivityTypeService } from '../shared/activity-type.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-activity-type-edit',
  templateUrl: './activity-type-edit.component.html',
  styleUrls: ['./activity-type-edit.component.scss'],
  providers: []
})

export class ActivityTypeEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedActivityType: ActivityType;
  activityTypeForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private workTypesService: LookupService;

  
workTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('workType', { static: true }) WorkTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedActivityTypeDialog: any,
    @Optional() public dialogRef: MatDialogRef<ActivityTypeEditComponent>,
    public activityTypeService: ActivityTypeService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedActivityType = new ActivityType();
    this.selectedActivityType = this.selectedActivityTypeDialog.data || this.selectedActivityType;

    
	this.workTypeSelectOptions = new MaterialSelectOptions({
	 data: this.workTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع العمل',
	});


    this.activityTypeForm = this.formBuilder.group({
      
  id : [this.selectedActivityType.id],
  code : [this.selectedActivityType.code, [ Validators.required ]],
  name : [this.selectedActivityType.name, [ Validators.required ]],
  workType : [this.selectedActivityType.workType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.activityTypeService.update(this.activityTypeForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.activityTypeService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.activityTypeForm.get(name);
  }

  initializeLookupServices() {
    this.workTypesService = new LookupService('worktypes', this.http);
  }
}
