
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { SourceCode } from 'app/shared/models/source-code';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { SourceCodeService } from '../shared/source-code.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-source-code-view',
  templateUrl: './source-code-view.component.html',
  styleUrls: ['./source-code-view.component.scss'],
  providers: []
})

export class SourceCodeViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedSourceCode: SourceCode;
  sourceCodeForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedSourceCodeDialog: any,
    @Optional() public dialogRef: MatDialogRef<SourceCodeViewComponent>,
    public sourceCodeService: SourceCodeService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSourceCode = this.selectedSourceCodeDialog.data || this.selectedSourceCode;

    

    this.sourceCodeForm = this.formBuilder.group({
      
  code : [this.selectedSourceCode.code],
  name : [this.selectedSourceCode.name]
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
    return this.sourceCodeForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.sourceCodeForm.controls)) {
      this.sourceCodeForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

