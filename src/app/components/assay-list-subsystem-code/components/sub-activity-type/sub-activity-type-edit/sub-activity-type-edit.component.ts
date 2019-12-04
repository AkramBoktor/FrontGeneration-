
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { SubActivityType } from 'app/shared/models/sub-activity-type';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { SubActivityTypeService } from '../shared/sub-activity-type.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-sub-activity-type-edit',
  templateUrl: './sub-activity-type-edit.component.html',
  styleUrls: ['./sub-activity-type-edit.component.scss'],
  providers: []
})

export class SubActivityTypeEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedSubActivityType: SubActivityType;
  subActivityTypeForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private workTypesService: LookupService;

  
workTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('workType', { static: true }) WorkTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedSubActivityTypeDialog: any,
    @Optional() public dialogRef: MatDialogRef<SubActivityTypeEditComponent>,
    public subActivityTypeService: SubActivityTypeService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSubActivityType = new SubActivityType();
    this.selectedSubActivityType = this.selectedSubActivityTypeDialog.data || this.selectedSubActivityType;

    
	this.workTypeSelectOptions = new MaterialSelectOptions({
	 data: this.workTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع العمل',
	});


    this.subActivityTypeForm = this.formBuilder.group({
      
  id : [this.selectedSubActivityType.id],
  activityType : [this.selectedSubActivityType.activityType, [ Validators.required ]],
  code : [this.selectedSubActivityType.code, [ Validators.required ]],
  name : [this.selectedSubActivityType.name, [ Validators.required ]],
  workType : [this.selectedSubActivityType.workType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.subActivityTypeService.update(this.subActivityTypeForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.subActivityTypeService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.subActivityTypeForm.get(name);
  }

  initializeLookupServices() {
    this.workTypesService = new LookupService('worktypes', this.http);
  }
}
