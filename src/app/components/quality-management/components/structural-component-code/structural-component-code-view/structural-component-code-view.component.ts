
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { StructuralComponentCode } from 'app/shared/models/structural-component-code';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { StructuralComponentCodeService } from '../shared/structural-component-code.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-structural-component-code-view',
  templateUrl: './structural-component-code-view.component.html',
  styleUrls: ['./structural-component-code-view.component.scss'],
  providers: []
})

export class StructuralComponentCodeViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedStructuralComponentCode: StructuralComponentCode;
  structuralComponentCodeForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedStructuralComponentCodeDialog: any,
    @Optional() public dialogRef: MatDialogRef<StructuralComponentCodeViewComponent>,
    public structuralComponentCodeService: StructuralComponentCodeService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedStructuralComponentCode = this.selectedStructuralComponentCodeDialog.data || this.selectedStructuralComponentCode;

    

    this.structuralComponentCodeForm = this.formBuilder.group({
      
  elementCode : [this.selectedStructuralComponentCode.elementCode],
  structuralElementName : [this.selectedStructuralComponentCode.structuralElementName]
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
    return this.structuralComponentCodeForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.structuralComponentCodeForm.controls)) {
      this.structuralComponentCodeForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

