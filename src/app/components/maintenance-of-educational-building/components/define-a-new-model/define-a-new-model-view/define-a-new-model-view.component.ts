
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { DefineANewModel } from 'app/shared/models/define-a-new-model';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { DefineANewModelService } from '../shared/define-a-new-model.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-define-a-new-model-view',
  templateUrl: './define-a-new-model-view.component.html',
  styleUrls: ['./define-a-new-model-view.component.scss'],
  providers: []
})

export class DefineANewModelViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedDefineANewModel: DefineANewModel;
  defineANewModelForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedDefineANewModelDialog: any,
    @Optional() public dialogRef: MatDialogRef<DefineANewModelViewComponent>,
    public defineANewModelService: DefineANewModelService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDefineANewModel = this.selectedDefineANewModelDialog.data || this.selectedDefineANewModel;

    

    this.defineANewModelForm = this.formBuilder.group({
      
  modelCode : [this.selectedDefineANewModel.modelCode],
  modelName : [this.selectedDefineANewModel.modelName]
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
    return this.defineANewModelForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.defineANewModelForm.controls)) {
      this.defineANewModelForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

