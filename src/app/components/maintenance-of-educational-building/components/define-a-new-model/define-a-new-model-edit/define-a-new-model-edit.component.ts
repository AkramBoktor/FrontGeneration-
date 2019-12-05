
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { DefineANewModel } from 'app/shared/models/define-a-new-model';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { DefineANewModelService } from '../shared/define-a-new-model.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-define-a-new-model-edit',
  templateUrl: './define-a-new-model-edit.component.html',
  styleUrls: ['./define-a-new-model-edit.component.scss'],
  providers: []
})

export class DefineANewModelEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedDefineANewModel: DefineANewModel;
  defineANewModelForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedDefineANewModelDialog: any,
    @Optional() public dialogRef: MatDialogRef<DefineANewModelEditComponent>,
    public defineANewModelService: DefineANewModelService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDefineANewModel = new DefineANewModel();
    this.selectedDefineANewModel = this.selectedDefineANewModelDialog.data || this.selectedDefineANewModel;

    

    this.defineANewModelForm = this.formBuilder.group({
      
  id : [this.selectedDefineANewModel.id],
  modelCode : [this.selectedDefineANewModel.modelCode, [ Validators.required ]],
  modelName : [this.selectedDefineANewModel.modelName, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.defineANewModelService.update(this.defineANewModelForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.defineANewModelService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.defineANewModelForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
