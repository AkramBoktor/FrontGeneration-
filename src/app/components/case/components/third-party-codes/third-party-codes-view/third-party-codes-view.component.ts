
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { ThirdPartyCodes } from 'app/shared/models/third-party-codes';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ThirdPartyCodesService } from '../shared/third-party-codes.service';

@Component({
  selector: 'app-third-party-codes-view',
  templateUrl: './third-party-codes-view.component.html',
  styleUrls: ['./third-party-codes-view.component.scss'],
  providers: []
})

export class ThirdPartyCodesViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedThirdPartyCodes: ThirdPartyCodes;
  thirdPartyCodesForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedThirdPartyCodesDialog: any,
    @Optional() public dialogRef: MatDialogRef<ThirdPartyCodesViewComponent>,
    public thirdPartyCodesService: ThirdPartyCodesService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedThirdPartyCodes = this.selectedThirdPartyCodesDialog.data || this.selectedThirdPartyCodes;

    

    this.thirdPartyCodesForm = this.formBuilder.group({
      
  code : [this.selectedThirdPartyCodes.code],
  name : [this.selectedThirdPartyCodes.name]
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
    return this.thirdPartyCodesForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.thirdPartyCodesForm.controls)) {
      this.thirdPartyCodesForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

