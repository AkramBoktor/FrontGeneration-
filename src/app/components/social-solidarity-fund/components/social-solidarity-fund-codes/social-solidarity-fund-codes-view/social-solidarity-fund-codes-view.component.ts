
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { SocialSolidarityFundCodes } from 'app/shared/models/social-solidarity-fund-codes';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { SocialSolidarityFundCodesService } from '../shared/social-solidarity-fund-codes.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-social-solidarity-fund-codes-view',
  templateUrl: './social-solidarity-fund-codes-view.component.html',
  styleUrls: ['./social-solidarity-fund-codes-view.component.scss'],
  providers: []
})

export class SocialSolidarityFundCodesViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedSocialSolidarityFundCodes: SocialSolidarityFundCodes;
  socialSolidarityFundCodesForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedSocialSolidarityFundCodesDialog: any,
    @Optional() public dialogRef: MatDialogRef<SocialSolidarityFundCodesViewComponent>,
    public socialSolidarityFundCodesService: SocialSolidarityFundCodesService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSocialSolidarityFundCodes = this.selectedSocialSolidarityFundCodesDialog.data || this.selectedSocialSolidarityFundCodes;

    

    this.socialSolidarityFundCodesForm = this.formBuilder.group({
      
  codeType : [this.selectedSocialSolidarityFundCodes.codeType],
  statementCode : [this.selectedSocialSolidarityFundCodes.statementCode]
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
    return this.socialSolidarityFundCodesForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.socialSolidarityFundCodesForm.controls)) {
      this.socialSolidarityFundCodesForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

