
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { SocialSolidarityFundCodes } from 'app/shared/models/social-solidarity-fund-codes';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { SocialSolidarityFundCodesService } from '../shared/social-solidarity-fund-codes.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-social-solidarity-fund-codes-edit',
  templateUrl: './social-solidarity-fund-codes-edit.component.html',
  styleUrls: ['./social-solidarity-fund-codes-edit.component.scss'],
  providers: []
})

export class SocialSolidarityFundCodesEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedSocialSolidarityFundCodes: SocialSolidarityFundCodes;
  socialSolidarityFundCodesForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedSocialSolidarityFundCodesDialog: any,
    @Optional() public dialogRef: MatDialogRef<SocialSolidarityFundCodesEditComponent>,
    public socialSolidarityFundCodesService: SocialSolidarityFundCodesService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSocialSolidarityFundCodes = new SocialSolidarityFundCodes();
    this.selectedSocialSolidarityFundCodes = this.selectedSocialSolidarityFundCodesDialog.data || this.selectedSocialSolidarityFundCodes;

    

    this.socialSolidarityFundCodesForm = this.formBuilder.group({
      
  id : [this.selectedSocialSolidarityFundCodes.id],
  codeType : [this.selectedSocialSolidarityFundCodes.codeType, [ Validators.required ]],
  statementCode : [this.selectedSocialSolidarityFundCodes.statementCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.socialSolidarityFundCodesService.update(this.socialSolidarityFundCodesForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.socialSolidarityFundCodesService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
	    }))
    .subscribe(
      (result) => {
          if (this.dialogRef)
          {
              this.dialogRef.close(true);
          }
    });
  }

  getControls(name: string) {
    return this.socialSolidarityFundCodesForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
