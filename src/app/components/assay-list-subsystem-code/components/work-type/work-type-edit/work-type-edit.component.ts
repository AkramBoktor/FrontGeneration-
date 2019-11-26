
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { WorkType } from 'app/shared/models/work-type';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { WorkTypeService } from '../shared/work-type.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-work-type-edit',
  templateUrl: './work-type-edit.component.html',
  styleUrls: ['./work-type-edit.component.scss'],
  providers: []
})

export class WorkTypeEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedWorkType: WorkType;
  workTypeForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedWorkTypeDialog: any,
    @Optional() public dialogRef: MatDialogRef<WorkTypeEditComponent>,
    public workTypeService: WorkTypeService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedWorkType = new WorkType();
    this.selectedWorkType = this.selectedWorkTypeDialog.data || this.selectedWorkType;

    

    this.workTypeForm = this.formBuilder.group({
      
  id : [this.selectedWorkType.id],
  code : [this.selectedWorkType.code, [ Validators.required ]],
  name : [this.selectedWorkType.name, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.workTypeService.update(this.workTypeForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.workTypeService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.workTypeForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
