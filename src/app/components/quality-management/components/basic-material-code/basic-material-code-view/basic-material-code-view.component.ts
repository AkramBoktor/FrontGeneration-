
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { BasicMaterialCode } from 'app/shared/models/basic-material-code';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { BasicMaterialCodeService } from '../shared/basic-material-code.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-basic-material-code-view',
  templateUrl: './basic-material-code-view.component.html',
  styleUrls: ['./basic-material-code-view.component.scss'],
  providers: []
})

export class BasicMaterialCodeViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedBasicMaterialCode: BasicMaterialCode;
  basicMaterialCodeForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedBasicMaterialCodeDialog: any,
    @Optional() public dialogRef: MatDialogRef<BasicMaterialCodeViewComponent>,
    public basicMaterialCodeService: BasicMaterialCodeService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedBasicMaterialCode = this.selectedBasicMaterialCodeDialog.data || this.selectedBasicMaterialCode;

    

    this.basicMaterialCodeForm = this.formBuilder.group({
      
  basicMaterialCode : [this.selectedBasicMaterialCode.basicMaterialCode],
  basicMaterialName : [this.selectedBasicMaterialCode.basicMaterialName]
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
    return this.basicMaterialCodeForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.basicMaterialCodeForm.controls)) {
      this.basicMaterialCodeForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

