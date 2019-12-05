
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { RegisterANewSubsidyCode } from 'app/shared/models/register-a-new-subsidy-code';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { RegisterANewSubsidyCodeService } from '../shared/register-a-new-subsidy-code.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-register-a-new-subsidy-code-view',
  templateUrl: './register-a-new-subsidy-code-view.component.html',
  styleUrls: ['./register-a-new-subsidy-code-view.component.scss'],
  providers: []
})

export class RegisterANewSubsidyCodeViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedRegisterANewSubsidyCode: RegisterANewSubsidyCode;
  registerANewSubsidyCodeForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedRegisterANewSubsidyCodeDialog: any,
    @Optional() public dialogRef: MatDialogRef<RegisterANewSubsidyCodeViewComponent>,
    public registerANewSubsidyCodeService: RegisterANewSubsidyCodeService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedRegisterANewSubsidyCode = this.selectedRegisterANewSubsidyCodeDialog.data || this.selectedRegisterANewSubsidyCode;

    

    this.registerANewSubsidyCodeForm = this.formBuilder.group({
      
  subsidyCode : [this.selectedRegisterANewSubsidyCode.subsidyCode],
  subsidyName : [this.selectedRegisterANewSubsidyCode.subsidyName],
  subsidyAmount : [this.selectedRegisterANewSubsidyCode.subsidyAmount]
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
    return this.registerANewSubsidyCodeForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.registerANewSubsidyCodeForm.controls)) {
      this.registerANewSubsidyCodeForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

