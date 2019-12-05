
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { GrantCodes } from 'app/shared/models/grant-codes';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { GrantCodesService } from '../shared/grant-codes.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-grant-codes-view',
  templateUrl: './grant-codes-view.component.html',
  styleUrls: ['./grant-codes-view.component.scss'],
  providers: []
})

export class GrantCodesViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedGrantCodes: GrantCodes;
  grantCodesForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedGrantCodesDialog: any,
    @Optional() public dialogRef: MatDialogRef<GrantCodesViewComponent>,
    public grantCodesService: GrantCodesService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedGrantCodes = this.selectedGrantCodesDialog.data || this.selectedGrantCodes;

    

    this.grantCodesForm = this.formBuilder.group({
      
  grantCode : [this.selectedGrantCodes.grantCode],
  grantName : [this.selectedGrantCodes.grantName],
  entityCode : [this.selectedGrantCodes.entityCode]
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
    return this.grantCodesForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.grantCodesForm.controls)) {
      this.grantCodesForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

