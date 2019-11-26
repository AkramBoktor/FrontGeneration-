
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialType } from 'app/shared/models/material-type';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialTypeService } from '../shared/material-type.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-material-type-view',
  templateUrl: './material-type-view.component.html',
  styleUrls: ['./material-type-view.component.scss'],
  providers: []
})

export class MaterialTypeViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedMaterialType: MaterialType;
  materialTypeForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedMaterialTypeDialog: any,
    @Optional() public dialogRef: MatDialogRef<MaterialTypeViewComponent>,
    public materialTypeService: MaterialTypeService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedMaterialType = this.selectedMaterialTypeDialog.data || this.selectedMaterialType;

    

    this.materialTypeForm = this.formBuilder.group({
      
  code : [this.selectedMaterialType.code],
  name : [this.selectedMaterialType.name]
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
    return this.materialTypeForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.materialTypeForm.controls)) {
      this.materialTypeForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

