
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { BaseType } from 'app/shared/models/base-type';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { BaseTypeService } from '../shared/base-type.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-base-type-view',
  templateUrl: './base-type-view.component.html',
  styleUrls: ['./base-type-view.component.scss'],
  providers: []
})

export class BaseTypeViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedBaseType: BaseType;
  baseTypeForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedBaseTypeDialog: any,
    @Optional() public dialogRef: MatDialogRef<BaseTypeViewComponent>,
    public baseTypeService: BaseTypeService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedBaseType = this.selectedBaseTypeDialog.data || this.selectedBaseType;

    

    this.baseTypeForm = this.formBuilder.group({
      
  code : [this.selectedBaseType.code],
  name : [this.selectedBaseType.name]
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
    return this.baseTypeForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.baseTypeForm.controls)) {
      this.baseTypeForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

